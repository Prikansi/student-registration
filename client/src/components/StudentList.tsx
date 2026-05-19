import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import StudentForm from './StudentForm';
import { deleteStudent, getStudents } from '../config/lib/api/student';

interface Student {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  courseEnrolled: string;
  createdAt: string;
  updatedAt: string;
}

interface StudentListProps {
  onBack?: () => void;
}

const StudentList: React.FC<StudentListProps> = ({ onBack }) => {
  const queryClient = useQueryClient();
  const [error, setError] = useState('');
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const { data: students = [], isLoading } = useQuery({
    queryKey: ['students'],
    queryFn: getStudents
  });

  const deleteMutation = useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      toast.success('Student deleted successfully');
    },
    onError: () => {
      setError('Failed to delete student');
      toast.error('Failed to delete student');
    }
  });

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    setShowForm(true);
  };

  const handleCancelEdit = () => {
    setEditingStudent(null);
    setShowForm(false);
  };

  const handleStudentAdded = () => {
    queryClient.invalidateQueries({ queryKey: ['students'] });
    toast.success('Student saved successfully');
    setShowForm(false);
    setEditingStudent(null);
  };

  const filteredStudents = students.filter(
    (student: Student) =>
      student.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="loading flex justify-center items-center py-10">
        <div className="text-gray-600 text-lg">Loading students...</div>
      </div>
    );
  }

  return (
    <div className="student-list-container bg-white rounded-xl p-6 shadow-lg">
      <div className="list-header flex justify-between items-center mb-6 pb-4 border-b-2 border-gray-100">
        {!showForm && (
          <button
            className="btn btn-primary bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-all"
            onClick={() => {
              setEditingStudent(null);
              setShowForm(true);
            }}
          >
            + Add New Student
          </button>
        )}
      </div>

      {error && (
        <div className="error bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {showForm ? (
        <div className="form-section bg-gray-50 p-5 rounded-lg mb-6 border-l-4 border-indigo-600">
          <StudentForm
            onStudentAdded={handleStudentAdded}
            editingStudent={editingStudent}
            onCancelEdit={handleCancelEdit}
          />
        </div>
      ) : (
        <>
          <div className="search-box mb-5">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
            />
          </div>

          <div className="table-responsive overflow-x-auto">
            <table className="students-table w-full border-collapse">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 text-sm">Full Name</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 text-sm">Email</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 text-sm">Phone Number</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 text-sm">Gender</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 text-sm">Date of Birth</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 text-sm">Course</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 text-sm">Address</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-8 text-gray-500 italic">
                      No students found
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student: Student) => (
                    <tr key={student._id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-gray-800 text-sm">{student.fullName || '-'}</td>
                      <td className="px-4 py-3 text-gray-800 text-sm">{student.email || '-'}</td>
                      <td className="px-4 py-3 text-gray-800 text-sm">{student.phoneNumber || '-'}</td>
                      <td className="px-4 py-3 text-gray-800 text-sm">{student.gender || '-'}</td>
                      <td className="px-4 py-3 text-gray-800 text-sm">
                        {student.dateOfBirth
                          ? new Date(student.dateOfBirth).toLocaleDateString()
                          : '-'}
                      </td>
                      <td className="px-4 py-3 text-gray-800 text-sm">{student.courseEnrolled || '-'}</td>
                      <td className="px-4 py-3 text-gray-800 text-sm">{student.address || '-'}</td>
                      <td className="actions-cell px-4 py-3">
                        <div className="flex gap-2 flex-col sm:flex-row">
                          <button
                            className="btn btn-edit bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm transition-all"
                            onClick={() => handleEdit(student)}
                            title="Edit"
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-delete bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() => handleDelete(student._id)}
                            title="Delete"
                            disabled={deleteMutation.isPending}
                          >
                            {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default StudentList;