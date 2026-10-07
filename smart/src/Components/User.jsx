import { useEffect, useState } from 'react';
import API from '../api';

function UserPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    id: null,
    fullName: '',
    email: '',
    phone: '',
    role: 'USER'
  });

  const [isEditing, setIsEditing] = useState(false);

  const currentUserRole = localStorage.getItem('userRole') || 'ADMIN'; 
  const isAdmin = currentUserRole === 'ADMIN';

  // 1. Function ya Fetch Data
  const fetchUsers = async () => {
    try {
      const response = await API.get('/users');
      if (Array.isArray(response.data)) {
        setUsers(response.data);
      } else if (response.data && Array.isArray(response.data.content)) {
        setUsers(response.data.content);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error('Hitilafu ya kuleta watumiaji:', error);
      setErrorMessage('Imeshindikana kuunganisha na server. Angalia backend na MySQL.');
    } finally {
      setLoading(false);
    }
  };

  // 2. useEffect iliyowekwa sawa ili kuzuia ESLint error
  useEffect(() => {
    const loadUsers = async () => {
      await fetchUsers();
    };

    loadUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. CREATE & UPDATE (Admin Only)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAdmin) {
      alert('Huna ruhusa ya kufanya kitendo hiki! Ni Admin tu.');
      return;
    }

    try {
      if (isEditing) {
        await API.put(`/users/${formData.id}`, formData);
        alert('Mtumiaji ameboreshwa kikamilifu!');
      } else {
        await API.post('/users', formData);
        alert('Mtumiaji ameongezwa kikamilifu!');
      }

      setFormData({ id: null, fullName: '', email: '', phone: '', role: 'USER' });
      setIsEditing(false);
      await fetchUsers();
    } catch (error) {
      console.error('Hitilafu ya kuhifadhi mtumiaji:', error);
      alert('Imeshindikana kuhifadhi mtumiaji!');
    }
  };

  const handleEdit = (user) => {
    setFormData({
      id: user.id,
      fullName: user.fullName || user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      role: user.role || 'USER'
    });
    setIsEditing(true);
  };

  // 4. DELETE (Admin Only)
  const handleDelete = async (userId) => {
    if (!isAdmin) {
      alert('Huna ruhusa ya kufuta! Ni Admin tu.');
      return;
    }

    if (window.confirm('Je, una uhakika unataka kumfuta mtumiaji huyu?')) {
      try {
        await API.delete(`/users/${userId}`);
        alert('Mtumiaji amefutwa kikamilifu!');
        await fetchUsers();
      } catch (error) {
        console.error('Hitilafu ya kumfuta mtumiaji:', error);
        alert('Imeshindikana kumfuta mtumiaji!');
      }
    }
  };

  const handleCancelEdit = () => {
    setFormData({ id: null, fullName: '', email: '', phone: '', role: 'USER' });
    setIsEditing(false);
  };

  if (loading) {
    return <div className="loading-state">Inapakia orodha ya watumiaji...</div>;
  }

  return (
    <>
      {/* INTERNAL CSS */}
      <style>{`
        .user-container {
          padding: 20px;
          max-width: 1100px;
          margin: 0 auto;
          font-family: sans-serif;
        }
        .user-subtitle {
          color: #666;
        }
        .status-admin {
          color: #28a745;
          font-weight: bold;
        }
        .status-view {
          color: #dc3545;
          font-weight: bold;
        }
        .card-box {
          background: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          margin-bottom: 30px;
        }
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .form-input {
          padding: 10px;
          border-radius: 4px;
          border: 1px solid #ccc;
          font-size: 14px;
        }
        .btn-group {
          grid-column: 1 / -1;
          display: flex;
          gap: 10px;
        }
        .save-btn {
          flex: 1;
          padding: 12px;
          background-color: #28a745;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
        }
        .cancel-btn {
          padding: 12px 20px;
          background-color: #6c757d;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .alert-error {
          padding: 15px;
          background-color: #f8d7da;
          color: #721c24;
          border-radius: 6px;
          margin-bottom: 20px;
          border: 1px solid #f5c6cb;
        }
        .alert-notice {
          padding: 15px;
          background-color: #fff3cd;
          color: #856404;
          border-radius: 6px;
          margin-bottom: 20px;
          border: 1px solid #ffeeba;
        }
        .table-section {
          margin-top: 20px;
        }
        .user-table {
          width: 100%;
          border-collapse: collapse;
          border: 1px solid #e0e0e0;
          background-color: #fff;
        }
        .user-table th {
          padding: 12px;
          border-bottom: 2px solid #e0e0e0;
          text-align: left;
          background-color: #f8f9fa;
        }
        .user-table td {
          padding: 12px;
          border-bottom: 1px solid #e0e0e0;
        }
        .edit-btn {
          background-color: #ffc107;
          color: #000;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
          margin-right: 8px;
          font-weight: bold;
        }
        .delete-btn {
          background-color: #dc3545;
          color: #fff;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
        }
        .badge-admin {
          background-color: #007bff;
          color: #fff;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: bold;
        }
        .badge-user {
          background-color: #6c757d;
          color: #fff;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
        }
        .empty-row {
          text-align: center;
          padding: 20px;
          color: #888;
        }
        .loading-state {
          text-align: center;
          padding: 50px;
        }
      `}</style>

      <div className="user-container">
        <h2>Usimamizi wa Watumiaji (User Management)</h2>
        <p className="user-subtitle">
          Status: {isAdmin ? <span className="status-admin">Admin Mode</span> : <span className="status-view">View Only Mode</span>}
        </p>

        {errorMessage && (
          <div className="alert-error">
            ⚠️ <strong>Error:</strong> {errorMessage}
          </div>
        )}

        {isAdmin ? (
          <div className="card-box">
            <h3>{isEditing ? 'Rekebisha Taarifa za Mtumiaji' : 'Ongeza Mtumiaji Mpya'}</h3>
            <form onSubmit={handleSubmit} className="form-grid">
              <input
                type="text"
                name="fullName"
                placeholder="Jina Kamili"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="form-input"
              />
              <input
                type="email"
                name="email"
                placeholder="Barua Pepe (Email)"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
              />
              <input
                type="text"
                name="phone"
                placeholder="Namba ya Simu"
                value={formData.phone}
                onChange={handleChange}
                required
                className="form-input"
              />
              <select name="role" value={formData.role} onChange={handleChange} className="form-input">
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>

              <div className="btn-group">
                <button type="submit" className="save-btn">
                  {isEditing ? 'Hifadhi Mabadiliko' : '+ Ongeza Mtumiaji'}
                </button>
                {isEditing && (
                  <button type="button" onClick={handleCancelEdit} className="cancel-btn">
                    Ghairi (Cancel)
                  </button>
                )}
              </div>
            </form>
          </div>
        ) : (
          <div className="alert-notice">
            ⚠️ Utendaji wa CRUD umezuiliwa. Ni lazima uwe na akaunti ya <strong>ADMIN</strong> kuweza kuongeza, kuedit, au kufuta watumiaji.
          </div>
        )}

        <div className="table-section">
          <h3>Orodha ya Watumiaji ({users.length})</h3>
          <table className="user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Jina Kamili</th>
                <th>Email</th>
                <th>Simu</th>
                <th>Role</th>
                {isAdmin && <th>Kitendo (Actions)</th>}
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>#{user.id}</td>
                    <td>{user.fullName || user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone || 'N/A'}</td>
                    <td>
                      <span className={user.role === 'ADMIN' ? 'badge-admin' : 'badge-user'}>
                        {user.role || 'USER'}
                      </span>
                    </td>
                    {isAdmin && (
                      <td>
                        <button onClick={() => handleEdit(user)} className="edit-btn">
                          Edit
                        </button>
                        <button onClick={() => handleDelete(user.id)} className="delete-btn">
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={isAdmin ? "6" : "5"} className="empty-row">
                    Hakuna watumiaji waliopatikana.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default UserPage;