import { configure } from 'axios-hooks'
import Axios from 'axios'

const axios = Axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

axios.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers = {
        authorization: `Bearer ${token}`,
      }
    }

    return config
  },
  (error) => Promise.reject(error),
)

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config

    if (error.response.status === 401 && !config._retry) {
      // we use this flag to avoid retrying indefinitely if
      // getting a refresh token fails for any reason
      config._retry = true
      // Delete invalid token
      localStorage.setItem('token', null)
      // Redirect to login
      window.location.href = '/login'
    }

    return Promise.reject(error)
  },
)

const cache = false

configure({ axios, cache })
