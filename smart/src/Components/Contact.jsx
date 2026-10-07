import { useState } from 'react';
import API from '../api'; // Hakikisha path ni sahihi kulingana na api.js ilipo

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Ombi la POST kwenda Spring Boot Backend
      const response = await API.post('/contacts', formData);
      alert(response.data || 'message sent!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.contentWrapper}>
        
        {/* Title */}
        <div style={styles.titleSection}>
          <h1 style={styles.mainTitle}>Get In Touch</h1>
          <p style={styles.subTitle}>if you have any question or you need to make aa journey? Send a message to us.</p>
        </div>

        {/* Main Grid */}
        <div style={styles.gridContainer}>
          
          {/* Left: Form */}
          <div style={styles.formCard}>
            <h2 style={styles.cardTitle}>Send us a Message</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
              
              <div>
                <label style={styles.label}>Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                  placeholder="John Doe" 
                  style={styles.input} 
                />
              </div>

              <div>
                <label style={styles.label}>Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                  placeholder="example@gmail.com" 
                  style={styles.input} 
                />
              </div>

              <div>
                <label style={styles.label}>Subject</label>
                <input 
                  type="text" 
                  name="subject" 
                  value={formData.subject} 
                  onChange={handleChange} 
                  placeholder="Booking Inquiry" 
                  style={styles.input} 
                />
              </div>

              <div>
                <label style={styles.label}>Message</label>
                <textarea 
                  name="message" 
                  rows="4" 
                  value={formData.message} 
                  onChange={handleChange} 
                  required 
                  placeholder="write your message here..." 
                  style={styles.input} 
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                style={{
                  ...styles.submitBtn,
                  backgroundColor: loading ? '#6c757d' : '#007bff',
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>

            </form>
          </div>

          {/* Right: Info & Map */}
          <div style={styles.infoColumn}>
            <div style={styles.infoCard}>
              <h2 style={styles.cardTitle}>Contact Information</h2>
              <p style={styles.infoText}> <strong>Location:</strong> Mwanakwerekwe, Zanzibar, Tanzania</p>
              <p style={styles.infoText}> <strong>Phone:</strong> +255 741 910 076</p>
              <p style={styles.infoText}> <strong>Email:</strong> info@afriluxe.com</p>
              <p style={styles.infoText}> <strong>Hours:</strong> 24/6 Open (Sunday closed)</p>
            </div>

            {/* Map Box */}
            <div style={styles.mapCard}>
              <iframe
                title="Google Map"
                src="https://maps.google.com/maps?q=Mwanakwerekwe%20Zanzibar&t=&z=13&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
              ></iframe>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// Internal Style Object (Imehifadhi vipimo vyote vya CSS ulivyoweka)
const styles = {
  pageContainer: {
    minHeight: '80vh',
    backgroundColor: '#f8f9fa',
    padding: '40px 20px',
    fontFamily: 'sans-serif',
  },
  contentWrapper: {
    maxWidth: '1100px',
    margin: '0 auto',
  },
  titleSection: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  mainTitle: {
    color: '#222',
    fontSize: '2rem',
    marginBottom: '10px',
  },
  subTitle: {
    color: '#666',
  },
  gridContainer: {
    display: 'flex',
    gap: '30px',
    flexWrap: 'wrap',
  },
  formCard: {
    flex: '1',
    minWidth: '300px',
    backgroundColor: '#fff',
    padding: '25px',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  },
  cardTitle: {
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  submitBtn: {
    color: '#fff',
    padding: '12px',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    fontSize: '1rem',
    transition: 'background-color 0.2s',
  },
  infoColumn: {
    flex: '1',
    minWidth: '300px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  infoCard: {
    backgroundColor: '#fff',
    padding: '25px',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  },
  infoText: {
    margin: '12px 0',
    color: '#555',
  },
  mapCard: {
    height: '220px',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  },
};

export default ContactPage;