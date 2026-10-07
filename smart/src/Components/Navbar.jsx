import { useState } from 'react';

const Navbar = ({ onNavigate }) => {
  // useState inatunza jina la ukurasa uliofunguliwa
  const [activePage, setActivePage] = useState('HomePage');

  const handleNavClick = (pageName) => {
    setActivePage(pageName);
    if (onNavigate) {
      onNavigate(pageName);
    }
  };

  return (
    <div style={styles.navbarContainer}>
      {/* Brand / Logo Section */}
      <div style={styles.logoGroup} onClick={() => handleNavClick('HomePage')}>
        <img src="/logo1.png" alt="Logo" style={styles.logo} />
        <span style={styles.brandName}>Smart Tour Management System</span>
      </div>

      {/* Center Navigation Links */}
      <div style={styles.navLinks}>
    <span style={styles.navItem} onClick={() => handleNavClick('HomePage')}>
      Home
    </span>
    <span style={styles.navItem} onClick={() => handleNavClick('Tour')}>
       Tour
    </span>
    <span style={styles.navItem} onClick={() => handleNavClick('Hotels')}>
      Hotel
    </span>
    <span style={styles.navItem} onClick={() => handleNavClick('Experience')}>
      Experience
    </span>
    <span style={styles.navItem} onClick={() => handleNavClick('Book')}>
      Book
    </span>
    <span style={styles.navItem} onClick={() => handleNavClick('Contact')}>
      Contact
    </span>
      
    </div>
   

      {/* Right Action Button (Login) */}
      <div>
        <button 
          style={styles.loginBtn} 
          onClick={() => handleNavClick('LoginPage')}
        >
          Login
        </button>
      </div>
    </div>
  );
};

const styles = {
  navbarContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 50px',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e0e0e0',
    fontFamily: '"Times New Roman", Times, serif',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  },
  logoGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
  },
  logo: {
    width: '40px',
    height: '40px',
    objectFit: 'contain',
  },
  brandName: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#00234b',
  },
  navLinks: {
    display: 'flex',
    gap: '35px',
    alignItems: 'center',
  },
  navItem: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#333333',
    cursor: 'pointer',
  },
  loginBtn: {
    backgroundColor: '#00234b',
    color: '#ffffff',
    border: 'none',
    padding: '8px 22px',
    borderRadius: '6px',
    fontSize: '15px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};

export default Navbar;