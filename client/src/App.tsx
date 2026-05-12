import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import StudentList from './components/StudentList';
import './App.css';

function App() {
  const [loggedInStudent, setLoggedInStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Load student from localStorage on mount
  useEffect(() => {
    const savedStudent = localStorage.getItem('loggedInStudent');
    if (savedStudent) {
      try {
        setLoggedInStudent(JSON.parse(savedStudent));
      } catch (err) {
        console.error('Error parsing saved student:', err);
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = (student: any) => {
    setLoggedInStudent(student);
    localStorage.setItem('loggedInStudent', JSON.stringify(student));
  };

  const handleLogout = () => {
    setLoggedInStudent(null);
    localStorage.removeItem('loggedInStudent');
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="App">
      {!loggedInStudent ? (
        <Dashboard onLogin={handleLogin} />
      ) : (
        <div className="main-container">
          <header className="app-header">
            <div className="header-content">
              <h1>Student Management System</h1>
              <div className="user-info">
                <span>Welcome, <strong>{loggedInStudent.fullName}</strong></span>
                <button onClick={handleLogout} className="btn btn-logout">Logout</button>
              </div>
            </div>
          </header>
          <main className="main-content">
            <StudentList />
          </main>
        </div>
      )}
    </div>
  );
}

export default App;