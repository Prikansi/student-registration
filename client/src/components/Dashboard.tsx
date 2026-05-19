import React, { useState } from 'react';
import LoginForm from './LoginForm';
import StudentForm from './StudentForm';

interface DashboardProps {
  onLogin: (student: any) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogin }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleBackClick = () => {
    setShowLoginModal(false);
    setShowRegisterModal(false);
  };

  return (
    <div className="dashboard min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 p-5">
      <div className="dashboard-container max-w-lg w-full">
        <div className="dashboard-content text-center bg-white p-12 rounded-xl shadow-2xl">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Student Management System
          </h1>
          <p className="text-gray-600 text-lg mb-10">
            Welcome to the Student Management Portal
          </p>

          <div className="button-group flex gap-5 justify-center flex-col sm:flex-row">
            <button
              className="btn btn-primary btn-large bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all transform hover:scale-105"
              onClick={() => setShowLoginModal(true)}
            >
              Login
            </button>
            <button
              className="btn btn-secondary btn-large bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all transform hover:scale-105"
              onClick={() => setShowRegisterModal(true)}
            >
              Register
            </button>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div
          className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-5"
          onClick={handleBackClick}
        >
          <div
            className="modal-content bg-white rounded-xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header flex justify-between items-center mb-5 pb-4 border-b border-gray-200">
              <button
                className="modal-back bg-none border-none text-indigo-600 cursor-pointer font-semibold hover:text-indigo-700 transition-colors"
                onClick={handleBackClick}
              >
                ← Back
              </button>
              <button
                className="modal-close absolute top-4 right-4 bg-none border-none text-3xl cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
                onClick={handleBackClick}
              >
                ×
              </button>
            </div>
            <LoginForm
              onLogin={(student) => {
                setShowLoginModal(false);
                onLogin(student);
              }}
              onRegisterClick={() => {
                setShowLoginModal(false);
                setShowRegisterModal(true);
              }}
            />
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegisterModal && (
        <div
          className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-5"
          onClick={handleBackClick}
        >
          <div
            className="modal-content bg-white rounded-xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header flex justify-between items-center mb-5 pb-4 border-b border-gray-200">
              <button
                className="modal-back bg-none border-none text-indigo-600 cursor-pointer font-semibold hover:text-indigo-700 transition-colors"
                onClick={handleBackClick}
              >
                ← Back
              </button>
              <button
                className="modal-close absolute top-4 right-4 bg-none border-none text-3xl cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
                onClick={handleBackClick}
              >
                ×
              </button>
            </div>
            <StudentForm
              onStudentAdded={() => {
                setShowRegisterModal(false);
              }}
              isRegistration={true}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;