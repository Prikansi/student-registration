import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'

// import { loginStudent } from '../api/auth'
import { decryptStudentData } from '../utils/crypto'
import { loginStudent } from '../config/lib/api/auth'

interface LoginFormProps {
  onLogin: (student: any) => void
  onRegisterClick?: () => void
}

const LoginForm: React.FC<LoginFormProps> = ({
  onLogin,
  onRegisterClick
}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState('')
  const [showRegisterPrompt, setShowRegisterPrompt] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // ✅ TanStack Mutation
  const loginMutation = useMutation({
    mutationFn: () =>
      loginStudent(formData.email, formData.password),

    onSuccess: data => {
      if (data.student) {
        const decryptedStudent = decryptStudentData(data.student)

        // save token if backend sends token
        if (data.token) {
          localStorage.setItem('token', data.token)
        }

        onLogin(decryptedStudent)
      }
    },

    onError: (err: any) => {
      const errorMsg =
        err.response?.data?.message || 'Login failed'

      setError(errorMsg)

      if (errorMsg === 'Invalid credentials') {
        setShowRegisterPrompt(true)
      }
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    setError('')
    setShowRegisterPrompt(false)

    loginMutation.mutate()
  }

  return (
    <div className="login-form">
      <h2>Student Login</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Password:</label>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {error && <div className="error">{error}</div>}

        {showRegisterPrompt && (
          <div className="warning">
            <p>This email is not registered yet.</p>

            <button
              type="button"
              className="btn-link cursor-pointer"
              onClick={() => {
                setShowRegisterPrompt(false)
                onRegisterClick?.()
              }}
            >
              Click here to register
            </button>
          </div>
        )}

        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="cursor-pointer"
        >
          {loginMutation.isPending
            ? 'Logging in...'
            : 'Login'}
        </button>
      </form>
    </div>
  )
}

export default LoginForm