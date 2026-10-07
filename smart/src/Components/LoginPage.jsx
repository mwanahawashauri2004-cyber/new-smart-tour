import { useState } from 'react';
import { authAPI } from '../api';

function LoginPage({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const isValidEmail = (emailStr) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailStr);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      setErrorMessage('Tafadhali jaza Email na Password!');
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMessage('Ingiza Email yenye muundo sahihi!');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      // 1. Jaribu ku-login kupitia Spring Boot Backend API
      const response = await authAPI.login({
        email: email.trim(),
        password: password,
      });

      const userData = response.data; // Mfano: { email: '...', role: 'ADMIN' }

      // Hifadhi Taarifa za User Kwenye LocalStorage
      localStorage.setItem('currentUser', JSON.stringify(userData));

      alert('Login imefanikiwa!');

      // Angalia kama ni Admin au User wa kawaida
      if (userData && (userData.role === 'ADMIN' || userData.role === 'ROLE_ADMIN')) {
        if (onNavigate) onNavigate('AdminDashboard');
      } else {
        if (onNavigate) onNavigate('HomePage');
      }

    } catch (error) {
      console.error('Backend Login Error:', error);

      // 2. Offline Fallback (LocalStorage Check)
      const registeredUsers = JSON.parse(
        localStorage.getItem('registeredUsers') || '[]'
      );

      const foundUser = registeredUsers.find(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
      );

      if (foundUser) {
        localStorage.setItem('currentUser', JSON.stringify(foundUser));
        alert('Login imefanikiwa (Offline Mode)!');

        if (foundUser.role === 'ADMIN' || foundUser.role === 'ROLE_ADMIN') {
          if (onNavigate) onNavigate('AdminDashboard');
        } else {
          if (onNavigate) onNavigate('HomePage');
        }
      } else {
        setErrorMessage('Email au Password siyo sahihi!');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.outerContainer}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome Back</h1>
        <p style={styles.subtitle}>Sign in to your account</p>

        {errorMessage && (
          <div style={styles.errorAlert}>
            ⚠️ {errorMessage}
          </div>
        )}

        <form onSubmit={handleSignIn} noValidate>
          <div style={styles.formGroup}>
            <label style={styles.label}>✉️ Email</label>
            <input
              type="email"
              placeholder="Enter Email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrorMessage('');
              }}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>🔒 Password</label>
            <div style={styles.passwordWrapper}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMessage('');
                }}
                style={{ ...styles.input, paddingRight: '60px' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.toggleBtn}
              >
                {showPassword ? '🙈 Hide' : '👁️ Show'}
              </button>
            </div>
          </div>

          <button type="submit" style={styles.signInBtn} disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div style={styles.navSection}>
          <span>Don't have an account? </span>
          <button
            type="button"
            onClick={() => onNavigate && onNavigate('Signup')}
            style={styles.linkBtn}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  outerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#7a7a7a',
    padding: '20px',
    fontFamily: 'serif, Times New Roman, sans-serif',
  },
  card: {
    backgroundColor: '#d9d9d9',
    width: '100%',
    maxWidth: '380px',
    padding: '30px 25px',
    borderRadius: '25px',
    boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
    textAlign: 'center',
    border: '1px solid #b0b0b0',
  },
  title: { margin: '0', fontSize: '28px', fontWeight: 'bold', color: '#000' },
  subtitle: { margin: '5px 0 20px 0', fontSize: '14px', color: '#333' },
  errorAlert: {
    backgroundColor: '#fef2f2',
    color: '#dc2626',
    border: '1px solid #fecaca',
    padding: '10px 12px',
    borderRadius: '10px',
    fontSize: '13px',
    fontWeight: 'bold',
    marginBottom: '15px',
  },
  formGroup: { marginBottom: '15px', textAlign: 'center' },
  label: { display: 'block', fontSize: '16px', fontWeight: 'bold', marginBottom: '6px', color: '#000' },
  input: {
    width: '100%',
    padding: '10px 15px',
    borderRadius: '15px',
    border: '1px solid #444',
    backgroundColor: '#e6e6e6',
    fontSize: '14px',
    boxSizing: 'border-box',
    outline: 'none',
  },
  passwordWrapper: { position: 'relative', display: 'flex', alignItems: 'center' },
  toggleBtn: {
    position: 'absolute',
    right: '10px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#333',
  },
  signInBtn: {
    width: '80%',
    padding: '12px',
    borderRadius: '20px',
    border: 'none',
    backgroundColor: '#1b10b5',
    color: '#fff',
    fontSize: '15px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '10px',
    marginBottom: '15px',
  },
  navSection: { fontSize: '14px', fontWeight: 'bold', color: '#000' },
  linkBtn: {
    background: 'none',
    border: 'none',
    color: '#0000d1',
    fontWeight: 'bold',
    fontSize: '14px',
    cursor: 'pointer',
    marginLeft: '5px',
  },
};

export default LoginPage;