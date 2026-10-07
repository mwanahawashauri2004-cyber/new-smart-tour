import { useState } from 'react';
import { authAPI } from '../api'; // Hakikisha path ya api.js ni sahihi

function Signup({ onNavigate }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const isValidEmail = (emailStr) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailStr);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage('');
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
      setErrorMessage('Tafadhali jaza sehemu zote!');
      return;
    }

    if (!isValidEmail(formData.email)) {
      setErrorMessage('Ingiza email yenye muundo sahihi!');
      return;
    }

    if (formData.password.length < 6) {
      setErrorMessage('Password lazima iwe na angalau herufi 6!');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Password hazifanani!');
      return;
    }

    setLoading(true);

    try {
      // Kutuma data Backend
      await authAPI.register({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });

      alert('Usajili umefanikiwa! Sasa unaweza kuingia.');
      if (onNavigate) onNavigate('LoginPage');

    } catch (error) {
      console.error('Signup Error:', error);

      // Fallback ya LocalStorage kama backend iko down
      const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const userExists = existingUsers.some((u) => u.email.toLowerCase() === formData.email.toLowerCase());

      if (userExists) {
        setErrorMessage('Barua pepe hii tayari imeshasajiliwa!');
      } else {
        const newUser = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        };
        existingUsers.push(newUser);
        localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));

        alert('Usajili umefanikiwa (Offline Mode)!');
        if (onNavigate) onNavigate('LoginPage');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.outerContainer}>
      <div style={styles.card}>
        <h1 style={styles.title}>Create Account</h1>
        <p style={styles.subtitle}>sign up to get started</p>

        {errorMessage && <div style={styles.errorAlert}>⚠️ {errorMessage}</div>}

        <form onSubmit={handleSignUp} noValidate>
          <div style={styles.formGroup}>
            <label style={styles.label}>👤 Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter Full Name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>✉️ Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email address"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>🔒 Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create Password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>🔒 Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.signUpBtn} disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign up'}
          </button>
        </form>

        <div style={styles.loginSection}>
          <span>Already have an account? </span>
          <button
            type="button"
            onClick={() => onNavigate && onNavigate('LoginPage')}
            style={styles.loginLinkBtn}
          >
            Sign in
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
  signUpBtn: {
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
  loginSection: { fontSize: '15px', fontWeight: 'bold', color: '#000' },
  loginLinkBtn: {
    background: 'none',
    border: 'none',
    color: '#0000d1',
    fontWeight: 'bold',
    fontSize: '15px',
    cursor: 'pointer',
    marginLeft: '5px',
  },
};

export default Signup;