import { useState, useEffect } from 'react';
import API from '../api'; // Hakikisha path ya Api.js ni sahihi

const HomePage = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await API.get('/tours');
        setTours(response.data);
      } catch (error) {
        console.error('Error fetching tours from backend:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  return (
    <div>
      {/* Hero Banner Section */}
      <div style={styles.heroBanner}>
        <div style={styles.overlay}>
          
          {/* Logo & Brand Name & Tagline */}
          <div style={styles.brandHeader}>
            <div style={styles.logoTitleRow}>
              <img 
                src="/logo1.png" 
                alt="Smart Zanzibar Tour Logo" 
                style={styles.heroLogo} 
              />
              <h2 style={styles.brandTitle}>Smart Tour Management System</h2>
            </div>
            
            <p style={styles.tagline}>
              D i s c o v e r . &nbsp; E x p l o r e . &nbsp; E x p e r i e n c e .
            </p>
          </div>

          {/* Explore Zanzibar Headline */}
          <div style={styles.mainContent}>
            <h1 style={styles.exploreText}>Explore</h1>
            <h1 style={styles.zanzibarText}>Tanzania</h1>
            
            <p style={styles.description}>
              Get the unforgettable experience for <br />
              attractive and <br />
              experience found in Zanzibar and <br />
              Tanzania Mainland....
            </p>

            {/* Optional indicator kama backend loaded */}
            {!loading && tours.length > 0 && (
              <p style={styles.loadedBadge}>
                {tours.length} Tour Packages Available!
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

const styles = {
  heroBanner: {
    backgroundImage: `url('/home.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: 'calc(100vh - 65px)',
    position: 'relative',
    fontFamily: '"Times New Roman", Times, serif',
  },
  overlay: {
    backgroundColor: 'rgba(0, 35, 75, 0.35)',
    minHeight: 'calc(100vh - 65px)',
    padding: '40px 60px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
  },
  brandHeader: {
    marginTop: '10px',
  },
  logoTitleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  heroLogo: {
    width: '65px',
    height: '65px',
    objectFit: 'contain',
  },
  brandTitle: {
    color: '#ffffff',
    fontSize: '28px',
    fontWeight: 'bold',
    margin: 0,
    fontFamily: '"Times New Roman", Times, serif',
  },
  tagline: {
    color: '#ffffff',
    fontSize: '15px',
    margin: '12px 0 0 0',
    fontStyle: 'italic',
    letterSpacing: '2px',
  },
  mainContent: {
    marginBottom: '40px',
    maxWidth: '550px',
  },
  exploreText: {
    color: '#ff9900',
    fontSize: '56px',
    fontWeight: 'bold',
    margin: 0,
    lineHeight: '1',
  },
  zanzibarText: {
    color: '#ffffff',
    fontSize: '64px',
    fontWeight: 'bold',
    margin: '0 0 15px 0',
    lineHeight: '1',
  },
  description: {
    color: '#ffffff',
    fontSize: '20px',
    lineHeight: '1.35',
    margin: 0,
    fontWeight: 'normal',
  },
  loadedBadge: {
    marginTop: '15px',
    color: '#ff9900',
    fontSize: '14px',
    fontWeight: 'bold',
    letterSpacing: '1px',
  },
};

export default HomePage;