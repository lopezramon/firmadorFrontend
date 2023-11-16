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
import CIcon from '@coreui/icons-react'
import { cilPencil, cilDelete } from '@coreui/icons'

const Tables = () => {
  const [users, setOrganizations] = useState([])
  const [user, setOrganization] = useState({})
  const [{ data, loading, error }, execute] = useAxios(
    {
      url: '/users',
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
    navigate('/users/new')
    const newOrganization = {
      name: '',
      description: '',
    }
    setOrganization(newOrganization)
  }

  const handleEdit = (user) => {
    setOrganization(user)
  }

  const handleSave = async () => {
    const newOrganization = {
      ...user,
    }
    const response = await execute({
      url: '/users',
      method: user.id ? 'PUT' : 'POST',
      data: newOrganization,
    })
    handleResponse()
  }

  const handleDelete = async (id) => {
    try {
      const response = await execute({
        url: `/users/${id}`,
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
            <strong>Usuarios</strong>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <CButton onClick={handleCreate}>Agregar</CButton>
            </div>
          </CCardHeader>
          <CCardBody>
            {loading && <p>Loading...</p>}
            {!loading && users.length > 0 && (
              <CTable responsive>
                <CTableCaption>Listado de Usuarios</CTableCaption>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Rol</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {users.map((user) => (
                    <CTableRow key={user.id}>
                      <CTableHeaderCell scope="row">{user.id}</CTableHeaderCell>
                      <CTableDataCell>{user.name}</CTableDataCell>
                      <CTableDataCell>{user.email}</CTableDataCell>
                      <CTableDataCell></CTableDataCell>
                      <CTableDataCell>
                        <div className="d-grid gap-2 d-md-flex">
                          <CButton color="primary" size="sm" onClick={() => handleEdit(user)}>
                            {/* <CIcon icon={cilPencil} customClassName="nav-icon" size={'sm'} /> */}
                            Edit
                          </CButton>
                          <CButton
                            color="secondary"
                            size="sm"
                            onClick={() => handleDelete(user.id)}
                          >
                            {/* <CIcon icon={cilDelete} customClassName="nav-icon" size={'sm'} /> */}
                            Delete
                          </CButton>
                        </div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            )}
            {!loading && users.length === 0 && <p>No users found.</p>}
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
