import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react'
import { CSpinner } from '@coreui/react'
import useAxios from 'axios-hooks'

const OrganizationForm = () => {
  const [{ data, loading, error }, execute] = useAxios(
    {
      url: '/organizations',
      method: 'POST',
    },
    { manual: true },
  )

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: 'Jumperr',
    rut: 'V18651634',
    user_id: 1,
    email: 'elopez@jumperr.com',
  })

  // const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSave = async () => {
    // setIsLoading(true)

    if (!formData.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      console.log('error de email')
      return
    }
    // Prepare the data for the POST request
    const data = {
      name: formData.name,
      rut: formData.rut,
      user_id: 1,
      email: formData.email,
    }

    try {
      const { data: response } = await execute({ data })
      navigate('/organizations')
    } catch (error) {
      console.log(error)
    }
    // setIsLoading(false)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Layout</strong> <small>Gutters</small>
          </CCardHeader>
          <CCardBody>
            {/* {isLoading && <CSpinner color="primary" />} */}
            <CForm className="row g-3">
              <CCol md={6}>
                <CFormLabel htmlFor="name">Nombre de Empresa</CFormLabel>
                <CFormInput
                  name="name"
                  placeholder="Nombre de Empresa"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="rut">RUT</CFormLabel>
                <CFormInput
                  name="rut"
                  placeholder="RUT"
                  autoComplete="rut"
                  value={formData.rut}
                  onChange={handleInputChange}
                />
              </CCol>
              <CCol xs={12}>
                <CFormLabel htmlFor="email">Email</CFormLabel>
                <CFormInput
                  name="email"
                  placeholder="Email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="inputState">Cliente</CFormLabel>
                <CFormSelect id="inputState">
                  <option>Choose...</option>
                  <option>...</option>
                </CFormSelect>
              </CCol>
              <CCol xs={12}>
                <CButton type="submit" onClick={handleSave}>
                  Crear
                </CButton>
              </CCol>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default OrganizationForm
