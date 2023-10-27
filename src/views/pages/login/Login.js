import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import useAxios from 'axios-hooks'

const Login = () => {
  const [{ data, loading, error }, execute] = useAxios(
    {
      url: '/login',
      method: 'POST',
    },
    { manual: true },
  )

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: 'elopez@team.com',
    password: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleLogin = async () => {
    // Prepare the data for the POST request
    const data = {
      email: formData.email,
      password: formData.password,
    }

    try {
      const { data: response } = await execute({ data })
      localStorage.setItem('token', response.data.token)
      navigate('/dashboard')
    } catch (error) {
      console.log(error)
    }

    /*
    // Make a POST request to your API
    fetch('http://localhost/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          // La solicitud fue exitosa
          response.json().then((data) => {
            console.log(data)
          })
        } else {
          // La solicitud falló
          switch (response.status) {
            case 401:
              // El usuario no está autenticado
              console.log('El usuario no está autenticado')
              break
            case 500:
              // Error interno del servidor
              console.log('Error interno del servidor')
              break
            case 422:
              // Error interno del servidor
              console.log('Error interno del credencial')
              break
            default:
              // Otro error
              console.log('Error desconocido')
          }
        }
      })
      .catch((error) => {
        // Se produjo un error de red
        console.log('Error de peticion')
      })
      */
  }

  if (error) return <p>Error!</p>

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        name="email"
                        placeholder="Email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        name="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={handleLogin}>
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
