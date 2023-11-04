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
  const [firms, setFirms] = useState([])
  const [firm, setFirm] = useState({})
  const [{ data, loading, error }, execute] = useAxios(
    {
      url: '/firms?include=firm',
      method: 'GET',
    },
    { manual: true },
  )

  const navigate = useNavigate()

  useEffect(() => {
    async function fetchFirms() {
      const response = await execute()
      setFirms(response.data.data.data)
    }
    fetchFirms()
  }, [])

  const handleResponse = () => {
    if (!error) {
      setFirms(data)
    } else {
      console.log(error)
    }
  }

  const handleCreate = () => {
    navigate('/firms/new')
    const newFirm = {
      name: '',
      description: '',
    }
    setFirm(newFirm)
  }

  const handleEdit = (firm) => {
    setFirm(firm)
  }

  const handleSave = async () => {
    const newFirm = {
      ...firm,
    }
    const response = await execute({
      url: '/firms',
      method: firm.id ? 'PUT' : 'POST',
      data: newFirm,
    })
    handleResponse()
  }

  const handleDelete = async (id) => {
    try {
      const response = await execute({
        url: `/firms/${id}`,
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
            {!loading && firms.length > 0 && (
              <CTable responsive>
                <CTableCaption>List of firms</CTableCaption>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Organización</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Sistema</CTableHeaderCell>
                    <CTableHeaderCell scope="col">status</CTableHeaderCell>
                    <CTableHeaderCell scope="col">count</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {firms.map((firm) => (
                    <CTableRow key={firm.id}>
                      <CTableHeaderCell scope="row">{firm.id}</CTableHeaderCell>
                      <CTableDataCell>{firm.user.name}</CTableDataCell>
                      <CTableDataCell>{firm.sistem}</CTableDataCell>
                      <CTableDataCell>{firm.status}</CTableDataCell>
                      <CTableDataCell>{firm.count}</CTableDataCell>
                      <CTableDataCell>
                        <div className="d-grid gap-2 d-md-flex">
                          <CButton color="primary" size="sm" onClick={() => handleEdit(firm)}>
                            {/* <CIcon icon={cilPencil} customClassName="nav-icon" size={'sm'} /> */}
                            Edit
                          </CButton>
                          <CButton
                            color="secondary"
                            size="sm"
                            onClick={() => handleDelete(firm.id)}
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
            {!loading && firms.length === 0 && <p>No firms found.</p>}
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
