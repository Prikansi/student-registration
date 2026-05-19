import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { registerStudent, updateStudent } from '../config/lib/api/student';

interface StudentFormProps {
  onStudentAdded: () => void;
  editingStudent?: any;
  onCancelEdit?: () => void;
  isRegistration?: boolean;
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
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const studentMutation = useMutation({
    mutationFn: async () => {
      if (editingStudent) {
        return updateStudent(editingStudent._id, formData);
      }
      return registerStudent(formData);
    },
    onSuccess: () => {
      setSuccess(
        editingStudent
          ? 'Student updated successfully!'
          : 'Registration successful! You can now login.'
      );

      setTimeout(() => {
        onStudentAdded();
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
          });
        }
      }, 1500);
    },
    onError: (err: any) => {
      setError(err.response?.data?.message || 'Operation failed');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    studentMutation.mutate();
  };

  return (
    <div className="student-form">
      <h2 className="text-2xl font-bold text-gray-800 mb-5">
        {editingStudent
          ? 'Edit Student'
          : isRegistration
          ? 'Student Registration'
          : 'Add Student'}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group mb-4">
          <label className="block mb-2 font-semibold text-gray-700">Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
          />
        </div>

        <div className="form-group mb-4">
          <label className="block mb-2 font-semibold text-gray-700">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!!editingStudent}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>

        <div className="form-group mb-4">
          <label className="block mb-2 font-semibold text-gray-700">Phone Number:</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
          />
        </div>

        <div className="form-group mb-4">
          <label className="block mb-2 font-semibold text-gray-700">Date of Birth:</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
          />
        </div>

        <div className="form-group mb-4">
          <label className="block mb-2 font-semibold text-gray-700">Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group mb-4">
          <label className="block mb-2 font-semibold text-gray-700">Address:</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all resize-vertical"
          />
        </div>

        <div className="form-group mb-4">
          <label className="block mb-2 font-semibold text-gray-700">Course Enrolled:</label>
          <input
            type="text"
            name="courseEnrolled"
            value={formData.courseEnrolled}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
          />
        </div>

        {!editingStudent && (
          <div className="form-group mb-4">
            <label className="block mb-2 font-semibold text-gray-700">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
            />
          </div>
        )}

        {error && (
          <div className="error bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="success bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
            {success}
          </div>
        )}

        <div className="form-actions flex gap-3 justify-end mt-6">
          <button
            type="submit"
            disabled={studentMutation.isPending}
            className="btn-primary bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
              className="btn-secondary bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg transition-all"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default StudentForm;