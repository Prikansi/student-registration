import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { decryptStudentData } from '../utils/crypto';
import { loginStudent } from '../config/lib/api/auth';

interface LoginFormProps {
  onLogin: (student: any) => void;
  onRegisterClick?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onLogin,
  onRegisterClick
}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [showRegisterPrompt, setShowRegisterPrompt] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const loginMutation = useMutation({
    mutationFn: () => loginStudent(formData.email, formData.password),
    onSuccess: data => {
      if (data.student) {
        const decryptedStudent = decryptStudentData(data.student);
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
        onLogin(decryptedStudent);
      }
    },
    onError: (err: any) => {
      const errorMsg = err.response?.data?.message || 'Login failed';
      setError(errorMsg);
      if (errorMsg === 'Invalid credentials') {
        setShowRegisterPrompt(true);
      }
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setShowRegisterPrompt(false);
    loginMutation.mutate();
  };

  return (
    <div className="login-form">
      <h2 className="text-2xl font-bold text-gray-800 mb-5">Student Login</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group mb-4">
          <label className="block mb-2 font-semibold text-gray-700">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
          />
        </div>

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

        {error && (
          <div className="error bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {showRegisterPrompt && (
          <div className="warning bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg mb-4">
            <p className="mb-2">This email is not registered yet.</p>
            <button
              type="button"
              className="btn-link text-indigo-600 hover:text-indigo-700 underline font-semibold"
              onClick={() => {
                setShowRegisterPrompt(false);
                onRegisterClick?.();
              }}
            >
              Click here to register
            </button>
          </div>
        )}

        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {loginMutation.isPending ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;