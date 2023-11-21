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
  CPagination,
  CPaginationItem,
} from '@coreui/react'

const Tables = () => {
  const [organizations, setOrganizations] = useState([])
  // const [organization, setOrganization] = useState({})
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
    // setOrganization(newOrganization)
  }

  const handleEdit = (organization) => {
    // setOrganization(organization)
  }

  // const handleSave = async () => {
  //   const newOrganization = {
  //     ...organization,
  //   }
  //   const response = await execute({
  //     url: '/organizations',
  //     method: organization.id ? 'PUT' : 'POST',
  //     data: newOrganization,
  //   })
  //   handleResponse()
  // }

  const isActive = (value) => {
    return value ? 'Activo' : 'Inactivo'
  }

  const isUser = (value) => {
    return value ? value : 'No User'
  }

  const handleDelete = async (id) => {
    try {
      const response = await execute({
        url: `/organizations/${id}`,
        method: 'DELETE',
      })
      handleResponse()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Organización</strong>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <CButton onClick={handleCreate}>Agregar</CButton>
            </div>
          </CCardHeader>
          <CCardBody>
            {loading && <p>Loading...</p>}
            {!loading && organizations.length > 0 && (
              <CTable responsive>
                <CTableCaption>Listado de Organización</CTableCaption>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Rut</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Sistem</CTableHeaderCell>
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
                      <CTableDataCell>{isActive(organization.status)}</CTableDataCell>
                      <CTableDataCell>{organization.sistem}</CTableDataCell>
                      <CTableDataCell>{isUser(organization.user?.name)}</CTableDataCell>
                      <CTableDataCell>
                        <div className="d-grid gap-2 d-md-flex">
                          <CButton
                            color="primary"
                            size="sm"
                            onClick={() => handleEdit(organization.id)}
                          >
                            Edit
                          </CButton>
                          <CButton
                            color="secondary"
                            size="sm"
                            onClick={() => handleDelete(organization.id)}
                          >
                            Delete
                          </CButton>
                        </div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            )}
            {!loading && organizations.length === 0 && <p>No organizations found.</p>}
            <CPagination align="end" aria-label="Page navigation example">
              <CPaginationItem disabled>Previous</CPaginationItem>
              <CPaginationItem>1</CPaginationItem>
              <CPaginationItem>2</CPaginationItem>
              <CPaginationItem>3</CPaginationItem>
              <CPaginationItem>Next</CPaginationItem>
            </CPagination>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Tables
