import React, { useState } from 'react';
import LoginForm from './LoginForm';
import StudentForm from './StudentForm';
import './Dashboard.css';

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
    <div className="dashboard">
      <div className="dashboard-container">
        <div className="dashboard-content">
          <h1>Student Management System</h1>
          <p>Welcome to the Student Management Portal</p>
          
          <div className="button-group">
            <button 
              className="btn btn-primary btn-large"
              onClick={() => setShowLoginModal(true)}
            >
              Login
            </button>
            <button 
              className="btn btn-secondary btn-large"
              onClick={() => setShowRegisterModal(true)}
            >
              Register
            </button>
          </div>
        </div>
      </div>

      {showLoginModal && (
        <div className="modal-overlay" onClick={handleBackClick}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <button className="modal-back" onClick={handleBackClick}>← Back</button>
              <button className="modal-close" onClick={handleBackClick}>×</button>
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

      {showRegisterModal && (
        <div className="modal-overlay" onClick={handleBackClick}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <button className="modal-back" onClick={handleBackClick}>← Back</button>
              <button className="modal-close" onClick={handleBackClick}>×</button>
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