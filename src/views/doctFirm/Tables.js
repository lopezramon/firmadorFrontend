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
      url: '/firms?include=organization',
      method: 'GET',
    },
    { manual: true },
  )

  const navigate = useNavigate()

  useEffect(() => {
    async function fetchFirms() {
      const response = await execute()
      console.log(response.data.data.data)
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

  // const handleCreate = () => {
  //   navigate('/firms/new')
  //   const newFirm = {
  //     name: '',
  //     description: '',
  //   }
  //   setFirm(newFirm)
  // }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Documentos Firmados</strong>
            {/* <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <CButton onClick={handleCreate}>Agregar</CButton>
            </div> */}
          </CCardHeader>
          <CCardBody>
            {loading && <p>Loading...</p>}
            {!loading && firms.length > 0 && (
              <CTable responsive>
                <CTableCaption>Listado de Documentos Firmados</CTableCaption>
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
                      <CTableDataCell>{firm.organization.name}</CTableDataCell>
                      <CTableDataCell>{firm.sistem}</CTableDataCell>
                      <CTableDataCell>{firm.status}</CTableDataCell>
                      <CTableDataCell>{firm.count}</CTableDataCell>
                      <CTableDataCell>
                        <div className="d-grid gap-2 d-md-flex">
                          <CButton color="primary" size="sm">
                            {/* <CIcon icon={cilPencil} customClassName="nav-icon" size={'sm'} /> */}
                            show
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
