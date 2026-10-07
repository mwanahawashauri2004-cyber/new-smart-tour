import { useState } from 'react';
import API from '../api'; // Hakikisha 'A' ni kubwa kama ilivyo kwenye jina la file 'Api.js'

const Book = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    tourDate: '',
    numberOfTourists: 1, // Tumia namba badala ya string '1'
    paymentMethod: 'Credit Card'
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'numberOfTourists' ? parseInt(value) || 1 : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Direct POST call kwenda /api/v1/book
      const response = await API.post('/book', formData);
      
      alert(response.data?.message || 'Booking imefanikiwa kikamilifu!');
      if (onNavigate) onNavigate('Tour'); 
    } catch (error) {
      console.error('Error saving booking detail:', error);
      
      // Hapa inakueleza tatizo halisi kwenye Alert popup
      if (error.response) {
        alert(`Error ${error.response.status}: ${error.response.data?.message || 'Kuna tatizo la Server'}`);
      } else {
        alert('Imeshindwa kuunganisha na Server. Hakikisha Spring Boot inarun.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <div style={styles.header}>
          <button 
            type="button"
            onClick={() => onNavigate && onNavigate('Tour')}
            style={styles.backBtn}
          >
            &larr; Back to Tours
          </button>
          <h2 style={styles.title}>Book Your Tour</h2>
          <p style={styles.subtitle}>Fill in the details below to complete your booking</p>
        </div>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <input 
              type="text" 
              name="fullName" 
              value={formData.fullName || ''} 
              placeholder="e.g. John Doe"
              onChange={handleChange} 
              required 
              style={styles.input} 
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email || ''} 
              placeholder="e.g. john@example.com"
              onChange={handleChange} 
              required 
              style={styles.input} 
            />
          </div>

          <div style={styles.rowGroup}>
            <div style={{ ...styles.inputGroup, flex: 1 }}>
              <label style={styles.label}>Tour Date</label>
              <input 
                type="date" 
                name="tourDate" 
                value={formData.tourDate || ''} 
                onChange={handleChange} 
                required 
                style={styles.input} 
              />
            </div>

            <div style={{ ...styles.inputGroup, flex: 1 }}>
              <label style={styles.label}>Tourists</label>
              <input 
                type="number" 
                name="numberOfTourists" 
                min="1"
                value={formData.numberOfTourists || 1}
                onChange={handleChange} 
                required 
                style={styles.input} 
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Payment Method</label>
            <select 
              name="paymentMethod" 
              value={formData.paymentMethod || 'Credit Card'} 
              onChange={handleChange}
              style={styles.select}
            >
              <option value="Credit Card">Credit Card / Visa</option>
              <option value="Mobile Money">Mobile Money (M-Pesa / TigoPesa)</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            style={{
              ...styles.submitBtn,
              backgroundColor: loading ? '#93c5fd' : '#2563eb',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Processing...' : 'Confirm & Pay Now \u2192'}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '90vh',
    padding: '30px 15px',
    backgroundColor: '#f4f6f9',
    fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
  card: {
    width: '100%',
    maxWidth: '480px',
    padding: '35px 30px',
    borderRadius: '16px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
    backgroundColor: '#ffffff',
    border: '1px solid #e1e8ed',
  },
  header: {
    marginBottom: '25px',
    textAlign: 'center',
  },
  backBtn: {
    border: 'none',
    background: 'none',
    color: '#2563eb',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px',
    marginBottom: '15px',
    display: 'inline-block',
  },
  title: {
    margin: '0 0 6px 0',
    fontSize: '24px',
    fontWeight: '700',
    color: '#1e293b',
  },
  subtitle: {
    margin: 0,
    fontSize: '13px',
    color: '#64748b',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  rowGroup: {
    display: 'flex',
    gap: '15px',
  },
  label: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#334155',
  },
  input: {
    padding: '11px 14px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    fontSize: '14px',
    outline: 'none',
    backgroundColor: '#f8fafc',
    transition: 'border 0.2s',
  },
  select: {
    padding: '11px 14px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    fontSize: '14px',
    outline: 'none',
    backgroundColor: '#f8fafc',
    cursor: 'pointer',
  },
  submitBtn: {
    marginTop: '10px',
    color: '#ffffff',
    padding: '13px',
    border: 'none',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: '600',
    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)',
    transition: 'background 0.2s',
  },
};

export default Book;