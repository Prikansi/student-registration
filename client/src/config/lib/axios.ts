'use client'

import axios from 'axios'

// ✅ Create instance
const API = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_BASEURL,
baseURL: import.meta.env.VITE_BASEURL,
  headers: {
    'Content-Type': 'application/json'
  }
})

/* ---------------------------------------------------
   REQUEST INTERCEPTOR – ATTACH TOKEN
--------------------------------------------------- */
API.interceptors.request.use(
  config => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token')

      const isAuthApi = config.url?.includes('/login') || config.url?.includes('/forgot-password')

      if (token && !isAuthApi) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }

    return config
  },
  error => Promise.reject(error)
)

/* ---------------------------------------------------
   RESPONSE INTERCEPTOR – HANDLE ERRORS
--------------------------------------------------- */
API.interceptors.response.use(
  response => response,
  error => {
    if (typeof window !== 'undefined') {
      const status = error.response?.status

      if (status === 401) {
        // 🔥 Token expired / invalid
        localStorage.removeItem('token')

        // redirect to login
        window.location.href = '/login'
      }

      if (status === 404) {
        console.error('API not found')
      }
    }

    return Promise.reject(error)
  }
)

export default API
