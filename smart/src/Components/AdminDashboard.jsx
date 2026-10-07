import { useEffect, useState } from 'react';
import API from '../api';
import UserPage from './User';

function AdminDashboard() {
  const [stats, setStats] = useState({ totalAdmins: 0, totalUsers: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [adminsRes, usersRes] = await Promise.allSettled([
          API.get('/admins'),
          API.get('/users')
        ]);

        const adminsCount = adminsRes.status === 'fulfilled' && Array.isArray(adminsRes.value.data) 
          ? adminsRes.value.data.length 
          : 0;

        const usersCount = usersRes.status === 'fulfilled' && Array.isArray(usersRes.value.data) 
          ? usersRes.value.data.length 
          : 0;

        setStats({
          totalAdmins: adminsCount,
          totalUsers: usersCount
        });
      } catch (error) {
        console.error('Hitilafu ya kuleta stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="loading-state">Inapakia Dashboard...</div>;
  }

  return (
    <>
      {/* INTERNAL CSS */}
      <style>{`
        .dashboard-container {
          padding: 30px;
          max-width: 1100px;
          margin: 0 auto;
          font-family: sans-serif;
        }
        .dashboard-subtitle {
          color: #666;
          margin-top: -10px;
        }
        .stats-grid {
          display: flex;
          gap: 20px;
          margin-bottom: 30px;
        }
        .stat-card-admin {
          padding: 20px;
          background-color: #e3f2fd;
          border-radius: 8px;
          flex: 1;
        }
        .stat-card-admin h3 {
          margin: 0;
          font-size: 16px;
          color: #0d47a1;
        }
        .stat-number-admin {
          font-size: 32px;
          font-weight: bold;
          margin: 10px 0 0 0;
          color: #1565c0;
        }
        .stat-card-user {
          padding: 20px;
          background-color: #e8f5e9;
          border-radius: 8px;
          flex: 1;
        }
        .stat-card-user h3 {
          margin: 0;
          font-size: 16px;
          color: #1b5e20;
        }
        .stat-number-user {
          font-size: 32px;
          font-weight: bold;
          margin: 10px 0 0 0;
          color: #2e7d32;
        }
        .user-section {
          border-top: 2px solid #e0e0e0;
          padding-top: 20px;
        }
        .loading-state {
          text-align: center;
          padding: 50px;
        }
      `}</style>

      <div className="dashboard-container">
        <h1>Admin Dashboard</h1>
        <p className="dashboard-subtitle">Smart Tour Management System</p>

        {/* Summary Cards */}
        <div className="stats-grid">
          <div className="stat-card-admin">
            <h3>Jumla ya Ma-Admin</h3>
            <p className="stat-number-admin">{stats.totalAdmins}</p>
          </div>
          <div className="stat-card-user">
            <h3>Jumla ya Watumiaji (Users)</h3>
            <p className="stat-number-user">{stats.totalUsers}</p>
          </div>
        </div>

        {/* User CRUD Section */}
        <div className="user-section">
          <UserPage />
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;