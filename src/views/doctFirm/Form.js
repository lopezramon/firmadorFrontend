import React, { useState, useEffect } from 'react'
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
  const [users, setUsers] = useState([])
  const [{ data, loading, error }, execute] = useAxios(
    {
      url: '/organizations',
      method: 'POST',
    },
    { manual: true },
  )

  const [{ user }, executeUser] = useAxios(
    {
      url: '/users',
      method: 'GET',
    },
    { manual: true },
  )

  useEffect(() => {
    async function fetchUsers() {
      const response = await executeUser()
      setUsers(response.data.data.data)
    }
    fetchUsers()
  }, [])

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    rut: '',
    email: '',
    user_id: 1,
  })

  // const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleCancel = () => {
    navigate('/organizations')
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
      user_id: parseInt(formData.user_id),
      email: formData.email,
    }

    try {
      // const { data: response } = await execute({ data })
      const response = await execute({ data })
      if (response.status === 200) {
        navigate('/organizations')
      }
    } catch (error) {
      console.log(error)
    }
    // setIsLoading(false)
  }
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Agregar</strong> <small>Organización</small>
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
              <CCol xs={6}>
                <CFormLabel htmlFor="email">Email</CFormLabel>
                <CFormInput
                  name="email"
                  placeholder="Email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="inputState">Cliente</CFormLabel>
                <CFormSelect
                  id="inputState"
                  name="user_id" // Agrega un name para el control del formulario
                  value={formData.user_id}
                  onChange={handleInputChange}
                >
                  <option value="">Seleccionar un usuario</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol xs={12}>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <CButton type="submit" onClick={handleSave}>
                    Crear
                  </CButton>
                  <CButton type="submit" onClick={handleCancel}>
                    Cancelar
                  </CButton>
                </div>
              </CCol>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default OrganizationForm
