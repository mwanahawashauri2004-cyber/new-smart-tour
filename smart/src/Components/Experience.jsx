import { useState, useEffect } from 'react';
import API from '../api'; // Hakikisha path ya api.js ni sahihi

const Experience = () => {
  // Video zako 6 zile zile kama za mwanzo
  const defaultExperiences = [
    {
      id: 1,
      title: 'Lion Safari Experience',
      videoUrl: '/safari 1.mp4'
    },
    {
      id: 2,
      title: 'Maasai Cultural Dance',
      videoUrl: '/massai.mp4'
    },
    {
      id: 3,
      title: 'Dolphin & Ocean Safari',
      videoUrl: '/dolfin.mp4'
    },
    {
      id: 4,
      title: 'Crocodile & Nature Tour',
      videoUrl: '/kasa island.mp4'
    },
    {
      id: 5,
      title: 'Local Community Visit',
      videoUrl: '/old fort.mp4'
    },
    {
      id: 6,
      title: 'Wildlife Buffalo Safari',
      videoUrl: '/bush view 1.mp4'
    }
  ];

  const [experiences, setExperiences] = useState(defaultExperiences);

  // KUUUNGANISHA NA BACKEND (SPRING BOOT)
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await API.get('/experiences');
        // Kama Backend ina data, inabadilisha; kama haina au ipo empty, inabaki na za mwanzo
        if (response.data && response.data.length > 0) {
          setExperiences(response.data);
        }
      } catch (error) {
        console.log('Backend haipatikani, inatumia video za local:', error);
      }
    };

    fetchExperiences();
  }, []);

  return (
    <>
      {/* CSS STYLES - ZILE ZILE ZAKO BILA KUBADILISHWA */}
      <style>{`
        .experience-page-container {
          background-color: #f8fafc;
          min-height: 100vh;
          padding: 40px 20px;
          font-family: system-ui, -apple-system, sans-serif;
        }

        .experience-wrapper {
          max-width: 1200px;
          margin: 0 auto;
        }

        .experience-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 25px;
        }

        .video-card {
          border-radius: 16px;
          overflow: hidden;
          background-color: #000000;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .video-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 25px rgba(0, 0, 0, 0.25);
        }

        .video-element {
          width: 100%;
          height: 240px;
          object-fit: cover;
          display: block;
        }

        .video-title {
          padding: 12px 16px;
          margin: 0;
          color: #ffffff;
          font-size: 0.95rem;
          font-weight: 600;
          background-color: #1e293b;
          text-align: center;
        }
      `}</style>

      {/* STRUCTURE YAKO ILE ILE */}
      <div className="experience-page-container">
        <div className="experience-wrapper">
          <div className="experience-grid">
            {experiences.map((item) => (
              <div key={item.id} className="video-card">
                <video 
                  src={item.videoUrl || item.url} 
                  controls 
                  preload="metadata"
                  className="video-element"
                >
                  Browser yako haisomi video hii.
                </video>
                <p className="video-title">{item.title || item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Experience;