import { useState } from 'react';

import Navbar from './Components/Navbar';
import HomePage from './Components/HomePage';
import Tour from './Components/Tour';
import Hotels from './Components/Hotels';
import Experience from './Components/Experience';
import Contact from './Components/Contact';
import LoginPage from './Components/LoginPage';
import Signup from './Components/Signup';

import Book from './Components/Book';
import AdminDashboard from './Components/AdminDashboard';
import User from './Components/User';

function App() {
  const [currentPage, setCurrentPage] = useState('HomePage');

  // Angalia kama aliyelogin ni Admin kupitia LocalStorage
  const checkIsAdmin = () => {
    try {
      const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
      return user && (user.role === 'ADMIN' || user.role === 'ROLE_ADMIN');
    } catch {
      return false;
    }
  };

  // Function ya kudhibiti navigation na ulinzi wa Admin Page
  const handleNavigate = (page) => {
    if ((page === 'AdminDashboard' || page === 'Admin') && !checkIsAdmin()) {
      alert('⚠️ Huruhusiwi kuingia hapa! Ingia kama Admin kwanza.');
      setCurrentPage('LoginPage');
      return;
    }
    setCurrentPage(page);
  };

  return (
    <div>
      {/* Navbar haionekani kwenye LoginPage, Signup, wala AdminDashboard */}
      {currentPage !== 'LoginPage' && 
       currentPage !== 'Signup' && 
       currentPage !== 'AdminDashboard' && (
        <Navbar onNavigate={handleNavigate} />
      )}

      {/* Public Pages */}
      {currentPage === 'HomePage' && (
        <HomePage onNavigate={handleNavigate} />
      )}

      {currentPage === 'Signup' && (
        <Signup onNavigate={handleNavigate} />
      )}

      {currentPage === 'Tour' && (
        <Tour onNavigate={handleNavigate} />
      )}

      {currentPage === 'Hotels' && (
        <Hotels onNavigate={handleNavigate} />
      )}

      {currentPage === 'Experience' && (
        <Experience onNavigate={handleNavigate} />
      )}

      {currentPage === 'Contact' && (
        <Contact onNavigate={handleNavigate} />
      )}

      {currentPage === 'LoginPage' && (
        <LoginPage onNavigate={handleNavigate} />
      )}

      {currentPage === 'Book' && (
        <Book onNavigate={handleNavigate} />
      )}

      {currentPage === 'User' && (
        <User onNavigate={handleNavigate} />
      )}

      {/* Admin Dashboard - Inaonekana TU kama mtumiaji ni Admin */}
      {currentPage === 'AdminDashboard' && checkIsAdmin() && (
        <AdminDashboard onNavigate={handleNavigate} />
      )}
    </div>
  );
}

export default App;