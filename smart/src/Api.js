// URL kuu ya Spring Boot Backend
const API_BASE_URL = 'http://localhost:8080/api/v1';

// Helper function ya kutuma maombi kwa kutumia fetch badala ya Axios
const customFetch = async (endpoint, options = {}) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Hakikisha endpoint inaanza na '/'
  const formattedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  const response = await fetch(`${API_BASE_URL}${formattedEndpoint}`, config);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }
  return null;
};

// ==========================================
// API SERVICES ZA MFUMO WOTE (CENTRAL HUB)
// ==========================================

// 1. Admin Module
export const adminAPI = {
  getAll: () => customFetch('/admin'),
  getById: (id) => customFetch(`/admin/${id}`),
  create: (data) => customFetch('/admin', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => customFetch(`/admin/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => customFetch(`/admin/${id}`, { method: 'DELETE' }),
};

// 2. Authentication Module (Login / Register)
export const authAPI = {
  login: (credentials) => customFetch('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  register: (userData) => customFetch('/auth/register', { method: 'POST', body: JSON.stringify(userData) }),
  logout: () => customFetch('/auth/logout', { method: 'POST' }),
};

// 3. Bookings Module
export const bookingAPI = {
  getAll: () => customFetch('/book'),
  getById: (id) => customFetch(`/book/${id}`),
  create: (data) => customFetch('/book', { method: 'POST', body: JSON.stringify(data) }),
  delete: (id) => customFetch(`/book/${id}`, { method: 'DELETE' }),
};

// 4. Tours Module
export const tourAPI = {
  getAll: () => customFetch('/tour'),
  getById: (id) => customFetch(`/tour/${id}`),
  create: (data) => customFetch('/tour', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => customFetch(`/tour/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => customFetch(`/tour/${id}`, { method: 'DELETE' }),
};

// 5. Hotels Module
export const hotelAPI = {
  getAll: () => customFetch('/hotels'),
  getById: (id) => customFetch(`/hotels/${id}`),
  create: (data) => customFetch('/hotels', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => customFetch(`/hotels/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => customFetch(`/hotels/${id}`, { method: 'DELETE' }),
};

// 6. Experiences Module
export const experienceAPI = {
  getAll: () => customFetch('/experience'),
  getById: (id) => customFetch(`/experience/${id}`),
  create: (data) => customFetch('/experience', { method: 'POST', body: JSON.stringify(data) }),
  delete: (id) => customFetch(`/experience/${id}`, { method: 'DELETE' }),
};

// 7. Users Module
export const userAPI = {
  getAll: () => customFetch('/user'),
  getById: (id) => customFetch(`/user/${id}`),
  create: (data) => customFetch('/user', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => customFetch(`/user/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => customFetch(`/user/${id}`, { method: 'DELETE' }),
};

// Default object ya kutumia API moja kwa moja (mfano: API.post('/book', data))
const API = {
  get: (endpoint) => customFetch(endpoint),
  post: (endpoint, data) => customFetch(endpoint, { method: 'POST', body: JSON.stringify(data) }),
  put: (endpoint, data) => customFetch(endpoint, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (endpoint) => customFetch(endpoint, { method: 'DELETE' }),
};

export default API;