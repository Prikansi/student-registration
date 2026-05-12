'use client'

import React, { useState } from 'react'

import {
    useQuery,
    useMutation,
    useQueryClient
} from '@tanstack/react-query'

import toast from 'react-hot-toast'

import StudentForm from './StudentForm'

import {
    deleteStudent,
    getStudents
} from '../config/lib/api/student'

interface Student {
    _id: string
    fullName: string
    email: string
    phoneNumber: string
    dateOfBirth: string
    gender: string
    address: string
    courseEnrolled: string
    createdAt: string
    updatedAt: string
}

interface StudentListProps {
    onBack?: () => void
}

const StudentList: React.FC<StudentListProps> = ({
    onBack
}) => {
    const queryClient = useQueryClient()

    const [error, setError] = useState('')

    const [editingStudent, setEditingStudent] =
        useState<Student | null>(null)

    const [showForm, setShowForm] = useState(false)

    const [searchTerm, setSearchTerm] = useState('')

    /* ---------------------------------------------
       FETCH STUDENTS
    --------------------------------------------- */
    const {
        data: students = [],
        isLoading
    } = useQuery({
        queryKey: ['students'],
        queryFn: getStudents
    })

    /* ---------------------------------------------
       DELETE STUDENT
    --------------------------------------------- */
    const deleteMutation = useMutation({
        mutationFn: deleteStudent,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['students']
            })

            toast.success('Student deleted successfully')
        },

        onError: () => {
            setError('Failed to delete student')

            toast.error('Failed to delete student')
        }
    })

    /* ---------------------------------------------
       DELETE HANDLER
    --------------------------------------------- */
    const handleDelete = (id: string) => {
        if (
            window.confirm(
                'Are you sure you want to delete this student?'
            )
        ) {
            deleteMutation.mutate(id)
        }
    }

    /* ---------------------------------------------
       EDIT HANDLER
    --------------------------------------------- */
    const handleEdit = (student: Student) => {
        setEditingStudent(student)
        setShowForm(true)
    }

    /* ---------------------------------------------
       CANCEL EDIT
    --------------------------------------------- */
    const handleCancelEdit = () => {
        setEditingStudent(null)
        setShowForm(false)
    }

    /* ---------------------------------------------
       AFTER SAVE
    --------------------------------------------- */
    const handleStudentAdded = () => {
        queryClient.invalidateQueries({
            queryKey: ['students']
        })

        toast.success('Student saved successfully')

        setShowForm(false)

        setEditingStudent(null)
    }

    /* ---------------------------------------------
       FILTER STUDENTS
    --------------------------------------------- */
    const filteredStudents = students.filter(
        (student: Student) =>
            student.fullName
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            student.email
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase())
    )

    /* ---------------------------------------------
       LOADING
    --------------------------------------------- */
    if (isLoading) {
        return (
            <div className="loading">
                Loading students...
            </div>
        )
    }

    return (
        <div className="student-list-container">
            {/* Header */}
            <div className="list-header">
                

                {!showForm && (
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            setEditingStudent(null)
                            setShowForm(true)
                        }}
                    >
                        + Add New Student
                    </button>
                )}
            </div>

            {/* Error */}
            {error && (
                <div className="error">{error}</div>
            )}

            {/* Form */}
            {showForm ? (
                <div className="form-section">
                    <StudentForm
                        onStudentAdded={handleStudentAdded}
                        editingStudent={editingStudent}
                        onCancelEdit={handleCancelEdit}
                    />
                </div>
            ) : (
                <>
                    {/* Search */}
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchTerm}
                            onChange={e =>
                                setSearchTerm(e.target.value)
                            }
                        />
                    </div>

                    {/* Table */}
                    <div className="table-responsive">
                        <table className="students-table">
                            <thead>
                                <tr>
                                    <th>Full Name</th>
                                    <th>Email</th>
                                    <th>Phone Number</th>
                                    <th>Gender</th>
                                    <th>Date of Birth</th>
                                    <th>Course</th>
                                    <th>Address</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredStudents.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={8}
                                            className="text-center"
                                        >
                                            No students found
                                        </td>
                                    </tr>
                                ) : (
                                    filteredStudents.map(
                                        (student: Student) => (
                                            <tr key={student._id}>
                                                <td>
                                                    {student.fullName || '-'}
                                                </td>

                                                <td>
                                                    {student.email || '-'}
                                                </td>

                                                <td>
                                                    {student.phoneNumber || '-'}
                                                </td>

                                                <td>
                                                    {student.gender || '-'}
                                                </td>

                                                <td>
                                                    {student.dateOfBirth
                                                        ? new Date(
                                                            student.dateOfBirth
                                                        ).toLocaleDateString()
                                                        : '-'}
                                                </td>

                                                <td>
                                                    {student.courseEnrolled ||
                                                        '-'}
                                                </td>

                                                <td>
                                                    {student.address || '-'}
                                                </td>

                                                <td className="actions-cell">
                                                    <button
                                                        className="btn btn-edit"
                                                        onClick={() =>
                                                            handleEdit(student)
                                                        }
                                                        title="Edit"
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        className="btn btn-delete"
                                                        onClick={() =>
                                                            handleDelete(
                                                                student._id
                                                            )
                                                        }
                                                        title="Delete"
                                                        disabled={
                                                            deleteMutation.isPending
                                                        }
                                                    >
                                                        {deleteMutation.isPending
                                                            ? 'Deleting...'
                                                            : 'Delete'}
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    )
}

export default StudentList