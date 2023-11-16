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
      setFirms(response.data.data.data)
    }
    fetchFirms()
  }, [])

  // const handleResponse = () => {
  //   if (!error) {
  //     setFirms(data)
  //   } else {
  //     console.log(error)
  //   }
  // }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Log Documentos Firmados</strong>
            {/* <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <CButton onClick={handleCreate}>Agregar</CButton>
            </div> */}
          </CCardHeader>
          <CCardBody>
            {loading && <p>Loading...</p>}
            {!loading && firms.length > 0 && (
              <CTable responsive>
                <CTableCaption>Listado de Logs</CTableCaption>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Organization</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Id XML</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Tipo Documento</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Fecha Firma</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {firms.map((firm) => (
                    <CTableRow key={firm.id}>
                      <CTableHeaderCell scope="row">{firm.id}</CTableHeaderCell>
                      <CTableDataCell>{firm.organization_id}</CTableDataCell>
                      <CTableDataCell>{firm.id_xml}</CTableDataCell>
                      <CTableDataCell>{firm.document_type}</CTableDataCell>
                      <CTableDataCell>{firm.date_time}</CTableDataCell>
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
            {!loading && firms.length === 0 && <p>No logs found.</p>}
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
