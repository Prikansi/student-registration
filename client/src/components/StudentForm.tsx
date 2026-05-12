'use client'

import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { registerStudent, updateStudent } from '../config/lib/api/student'

// import {
//   registerStudent,
//   updateStudent
// } from '../api/student'

interface StudentFormProps {
  onStudentAdded: () => void
  editingStudent?: any
  onCancelEdit?: () => void
  isRegistration?: boolean
}

const StudentForm: React.FC<StudentFormProps> = ({
  onStudentAdded,
  editingStudent,
  onCancelEdit,
  isRegistration = false
}) => {
  const [formData, setFormData] = useState({
    fullName: editingStudent?.fullName || '',
    email: editingStudent?.email || '',
    phoneNumber: editingStudent?.phoneNumber || '',
    dateOfBirth: editingStudent?.dateOfBirth || '',
    gender: editingStudent?.gender || '',
    address: editingStudent?.address || '',
    courseEnrolled: editingStudent?.courseEnrolled || '',
    password: ''
  })

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  /* ---------------------------------------------
     TANSTACK MUTATION
  --------------------------------------------- */
  const studentMutation = useMutation({
    mutationFn: async () => {
      if (editingStudent) {
        return updateStudent(
          editingStudent._id,
          formData
        )
      }

      return registerStudent(formData)
    },

    onSuccess: () => {
      setSuccess(
        editingStudent
          ? 'Student updated successfully!'
          : 'Registration successful! You can now login.'
      )

      setTimeout(() => {
        onStudentAdded()

        if (!editingStudent) {
          setFormData({
            fullName: '',
            email: '',
            phoneNumber: '',
            dateOfBirth: '',
            gender: '',
            address: '',
            courseEnrolled: '',
            password: ''
          })
        }
      }, 1500)
    },

    onError: (err: any) => {
      setError(
        err.response?.data?.message ||
          'Operation failed'
      )
    }
  })

  /* ---------------------------------------------
     FORM SUBMIT
  --------------------------------------------- */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    setError('')
    setSuccess('')

    studentMutation.mutate()
  }

  return (
    <div className="student-form">

        <div className="header-left">
  <button
    type="button"
    className="btn-back"
    onClick={() => {
      if (onCancelEdit) {
        onCancelEdit()
      }
    }}
    title="Go back"
  >
    ← Back
  </button>

  {/* <h2>Student Management</h2> */}
</div>
      <h2>
        {editingStudent
          ? 'Edit Student'
          : isRegistration
          ? 'Student Registration'
          : 'Add Student'}
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Full Name */}
        <div className="form-group">
          <label>Full Name:</label>

          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div className="form-group">
          <label>Email:</label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!!editingStudent}
            required
          />
        </div>

        {/* Phone */}
        <div className="form-group">
          <label>Phone Number:</label>

          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>

        {/* DOB */}
        <div className="form-group">
          <label>Date of Birth:</label>

          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>

        {/* Gender */}
        <div className="form-group">
          <label>Gender:</label>

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>

            <option value="Male">Male</option>

            <option value="Female">Female</option>

            <option value="Other">Other</option>
          </select>
        </div>

        {/* Address */}
        <div className="form-group">
          <label>Address:</label>

          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        {/* Course */}
        <div className="form-group">
          <label>Course Enrolled:</label>

          <input
            type="text"
            name="courseEnrolled"
            value={formData.courseEnrolled}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        {!editingStudent && (
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
        )}

        {/* Error */}
        {error && (
          <div className="error">{error}</div>
        )}

        {/* Success */}
        {success && (
          <div className="success">{success}</div>
        )}

        {/* Buttons */}
        <div className="form-actions">
          <button
            type="submit"
            disabled={studentMutation.isPending}
            className="btn-primary"
          >
            {studentMutation.isPending
              ? 'Saving...'
              : editingStudent
              ? 'Update'
              : 'Register'}
          </button>

          {editingStudent && onCancelEdit && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="btn-secondary"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default StudentForm