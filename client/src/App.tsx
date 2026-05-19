import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import StudentList from './components/StudentList';

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
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-gray-600 text-lg animate-pulse">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {!loggedInStudent ? (
        <Dashboard onLogin={handleLogin} />
      ) : (
        <div className="flex flex-col min-h-screen">
          <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold">
                Student Management System
              </h1>
              
              <div className="flex items-center gap-4">
                <span className="text-sm">
                  Welcome,{' '}
                  <strong className="font-semibold">
                    {loggedInStudent.fullName}
                  </strong>
                </span>
                
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm font-medium transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  Logout
                </button>
              </div>
            </div>
          </header>
          
          <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
            <StudentList />
          </main>
        </div>
      )}
    </div>
  );
}

export default App;