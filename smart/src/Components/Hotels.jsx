import { useState, useEffect } from 'react';
import API from '../api';

const HotelPage = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/hotels')
      .then((response) => {
        setHotels(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('API haionekani, inatumia data za ndani:', err);
        setHotels([
          { id: 1, name: 'Nungwi beach Hotel', image: 'Nungwi beach hotel copy.jpg' },
          { id: 2, name: 'Ston Town botique', image: 'Stonetown .jpg' },
          { id: 3, name: 'kigamboni Hotel', image: 'Kigamboni.jpg' },
        ]);
        setLoading(false);
      });
  }, []);

  

  const styles = {
    // Body yote inakaa KATIKATI
    pageContainer: {
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      fontFamily: 'sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', // Kila kitu kinakaa katikati (Center)
      justifyContent: 'flex-start',
    },
    // Banner ya katikati
    heroBanner: {
      width: '100%',
      height: '240px',
      backgroundImage: 'url("/images/sky-banner.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: '20px 40px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center', // Banner content zote katikati
      textAlign: 'center',
    },
    topHeaderSection: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', // Title na Logo katikati
      justifyContent: 'center',
    },
    brandSection: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '15px',
    },
    bannerLogo: {
      width: '45px',
      height: '45px',
      objectFit: 'contain',
    },
    bannerTitle: {
      margin: 0,
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#000000',
      fontFamily: "'Times New Roman', Times, serif",
    },
    bannerSubtitle: {
      margin: '6px 0 0 0',
      fontSize: '14px',
      fontStyle: 'italic',
      letterSpacing: '2px',
      color: '#000000',
      fontFamily: "'Times New Roman', Times, serif",
    },
    // Search form katikati
    searchForm: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      marginBottom: '15px',
      width: '100%',
    },
    searchInput: {
      width: '380px',
      padding: '9px 18px',
      borderRadius: '20px',
      border: '1px solid #ccc',
      fontSize: '14px',
      outline: 'none',
      boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
    },
    searchButton: {
      padding: '8px 18px',
      borderRadius: '15px',
      border: '1px solid #ccc',
      backgroundColor: '#ffffff',
      cursor: 'pointer',
      fontSize: '13px',
      fontWeight: 'bold',
      boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
    },
    // Kadi za Hoteli nazo zipo katikati
    hotelsContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '35px',
      padding: '50px 20px',
      flexWrap: 'wrap',
      maxWidth: '1200px',
      width: '100%',
    },
    card: {
      width: '280px',
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      border: '1px solid #d1d5db',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    imageContainer: {
      width: '100%',
      height: '180px',
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block',
    },
    cardTitleContainer: {
      padding: '14px 10px',
      textAlign: 'center',
      width: '100%',
    },
    cardTitle: {
      margin: 0,
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#000000',
      fontFamily: "'Times New Roman', Times, serif",
    },
  };

  return (
    <div style={styles.pageContainer}>
      {/* Banner / Hero Section */}
      <div style={styles.heroBanner}>
        <div style={styles.topHeaderSection}>
          <div style={styles.brandSection}>
            <img src="logo1.png" alt="Logo1" style={styles.bannerLogo} />
            <h1 style={styles.bannerTitle}>Smart  tour</h1>
          </div>
          <p style={styles.bannerSubtitle}>D i s c o v e r . E x p l o r e . E x p e r i e n c e</p>
        </div>
      </div>

      {/* Hotel Cards Grid Katikati */}
      <div style={styles.hotelsContainer}>
        {loading ? (
          <div>Inapakia hoteli...</div>
        ) : (
          hotels.map((hotel) => (
            <div key={hotel.id} style={styles.card}>
              <div style={styles.imageContainer}>
                <img src={hotel.image} alt={hotel.name} style={styles.image} />
              </div>
              <div style={styles.cardTitleContainer}>
                <h3 style={styles.cardTitle}>{hotel.name}</h3>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HotelPage;