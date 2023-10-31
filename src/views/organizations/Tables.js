import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAxios from 'axios-hooks'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
} from '@coreui/react'

const Tables = () => {
  const [organizations, setOrganizations] = useState([])
  const [organization, setOrganization] = useState({})
  const [{ data, loading, error }, execute] = useAxios(
    {
      url: '/organizations?include=user',
      method: 'GET',
    },
    { manual: true },
  )

  const navigate = useNavigate()

  useEffect(() => {
    async function fetchOrganizations() {
      const response = await execute()
      console.log(response.data.data.data)
      setOrganizations(response.data.data.data)
    }
    fetchOrganizations()
  }, [])

  const handleResponse = () => {
    if (!error) {
      setOrganizations(data)
    } else {
      console.log(error)
    }
  }

  const handleCreate = () => {
    navigate('/organizations/new')
    const newOrganization = {
      name: '',
      description: '',
    }
    setOrganization(newOrganization)
  }

  const handleEdit = (organization) => {
    setOrganization(organization)
  }

  const handleSave = async () => {
    const newOrganization = {
      ...organization,
    }
    const response = await execute({
      url: '/organizations',
      method: organization.id ? 'PUT' : 'POST',
      data: newOrganization,
    })
    handleResponse()
  }

  const handleDelete = async (id) => {
    const response = await execute({
      url: `/organizations/${id}`,
      method: 'DELETE',
    })
    handleResponse()
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Organización</strong>
            <CButton onClick={handleCreate}>Agregar</CButton>
          </CCardHeader>
          <CCardBody>
            {loading && <p>Loading...</p>}
            {!loading && organizations.length > 0 && (
              <CTable>
                <CTableCaption>List of organizations</CTableCaption>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Rut</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                    <CTableHeaderCell scope="col">User</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {organizations.map((organization) => (
                    <CTableRow key={organization.id}>
                      <CTableHeaderCell scope="row">{organization.id}</CTableHeaderCell>
                      <CTableDataCell>{organization.name}</CTableDataCell>
                      <CTableDataCell>{organization.rut}</CTableDataCell>
                      <CTableDataCell>{organization.email}</CTableDataCell>
                      <CTableDataCell>{organization.user.name}</CTableDataCell>
                      <CTableDataCell>
                        {/* <CButton color="light" onClick={() => handleEdit(organization)}>
                          Edit
                        </CButton>
                        <CButton color="light" onClick={() => handleDelete(organization.id)}>
                          Delete
                        </CButton> */}
                        {/* <button type="button" class="btn btn-light">Light</button> */}
                        {/* <button type="button" class="btn btn-light">Light</button> */}
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            )}
            {!loading && organizations.length === 0 && <p>No organizations found.</p>}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Tables
