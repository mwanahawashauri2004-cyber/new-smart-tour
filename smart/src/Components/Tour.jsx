import { useState, useEffect } from 'react';
import API from '../api'; // Njia sahihi ya API

const Tour = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  // Kuleta data kutoka Backend
  useEffect(() => {
    API.get('/tours') // Tumia API badala ya axios
      .then((response) => {
        setTours(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('API haionekani, inatumia data za ndani:', err);
        // Data za ndani zitaonekana kama backend haipo tayari
        setTours([
          { 
            id: 1,
            title: 'Serengeti',
            location: 'Mara Region',
            image: 'Serengeti.jpg'
          },
          { 
            id: 2,
            title: 'Nungwi',
            location: 'Northern Unguja', 
            image: 'Nungwi.jpg'
          },
          { 
            id: 3,
            title: 'Mafia Island',
            location: 'Pwani Region', 
            image: 'Mafia.png'
          },
          { 
            id: 4,
            title: 'Northern Pemba', 
            location: 'Pemba', 
            image: 'pemba.jpg'
          },
          { 
            id: 5,
            title: 'Mount Kilimanjaro', 
            location: 'Northern Kilimanjaro Region',
            image: 'kilimanjaro.jpg' 
          },
        ]);
        setLoading(false);
      });
  }, []);

  const styles = {
    pageContainer: {
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      margin: 0,
      padding: '40px 20px',
      boxSizing: 'border-box',
      fontFamily: 'sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', // Kukiweka kila kitu katikati kabisa
      justifyContent: 'flex-start',
    },
    // Header Section iliyo katikati
    headerSection: {
      marginBottom: '30px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    },
    brandSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      marginBottom: '10px',
    },
    bannerLogo: {
      width: '45px',
      height: '45px',
      objectFit: 'contain',
    },
    bannerTitle: {
      margin: 0,
      fontSize: '26px',
      fontWeight: 'bold',
      color: '#000000',
      fontFamily: "'Times New Roman', Times, serif",
    },
    tagline: {
      fontSize: '14px',
      fontStyle: 'italic',
      letterSpacing: '2px',
      color: '#000000',
      margin: '10px 0 20px 0',
      fontFamily: "'Times New Roman', Times, serif",
    },
    // Grid ya Cards zilizowekwa katikati
    tourGrid: {
      display: 'flex',
      gap: '20px',
      flexWrap: 'wrap',
      justifyContent: 'center', // Kadi zote zikae katikati
      maxWidth: '1200px',
      width: '100%',
    },
    card: {
      width: '220px',
      backgroundColor: '#ffffff',
      borderRadius: '14px',
      border: '1px solid #d1d5db',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    },
    imageContainer: {
      width: '100%',
      height: '150px',
      overflow: 'hidden',
    },
    cardImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    cardContent: {
      padding: '12px',
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
    },
    tourTitle: {
      margin: '0',
      fontSize: '18px',
      fontWeight: 'bold',
      fontFamily: "'Times New Roman', Times, serif",
      color: '#000',
    },
    locationText: {
      margin: '0',
      fontSize: '12px',
      color: '#555',
    },
    durationText: {
      margin: '4px 0 0 0',
      fontSize: '12px',
      color: '#000',
    },
    statusText: {
      fontSize: '16px',
      color: '#666',
      marginTop: '20px',
    },
  };

  return (
    <div style={styles.pageContainer}>
      {/* Header Info Katikati */}
      <div style={styles.headerSection}>
        <div style={styles.brandSection}>
          <h1 style={styles.bannerTitle}>Smart tour</h1>
        </div>
        <p style={styles.tagline}>D i s c o v e r . E x p l o r e . E x p e r i e n c e</p>
      </div>

      {/* Tour Cards Grid Katikati */}
      <div style={styles.tourGrid}>
        {loading ? (
          <div style={styles.statusText}>Inapakia tours...</div>
        ) : tours.length > 0 ? (
          tours.map((tour) => (
            <div key={tour.id} style={styles.card}>
              <div style={styles.imageContainer}>
                <img
                  src={tour.image || tour.imageUrl || 'serengeti.jpg'}
                  alt={tour.title || tour.name}
                  style={styles.cardImage}
                />
              </div>

              <div style={styles.cardContent}>
                <h3 style={styles.tourTitle}>{tour.title || tour.name}</h3>
                <p style={styles.locationText}>
                  <span style={{ color: '#e11d48', marginRight: '3px' }}></span>
                  {tour.location || tour.region}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div style={styles.statusText}>Hakuna tour iliyopatikana.</div>
        )}
      </div>
    </div>
  );
};

export default Tour;