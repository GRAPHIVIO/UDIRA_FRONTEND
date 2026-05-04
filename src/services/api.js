import axios from 'axios'

const API = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests if available
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Student endpoints
export const studentAPI = {
  getAll: () => API.get('/students/'),
  get: (id) => API.get(`/students/${id}/`),
  create: (data) => API.post('/students/', data),
  update: (id, data) => API.put(`/students/${id}/`, data),
  delete: (id) => API.delete(`/students/${id}/`),
}

// Teacher endpoints
export const teacherAPI = {
  getAll: () => API.get('/teachers/'),
  get: (id) => API.get(`/teachers/${id}/`),
  create: (data) => API.post('/teachers/', data),
  update: (id, data) => API.put(`/teachers/${id}/`, data),
  delete: (id) => API.delete(`/teachers/${id}/`),
}

// Class endpoints
export const classAPI = {
  getAll: () => API.get('/classes/'),
  get: (id) => API.get(`/classes/${id}/`),
  create: (data) => API.post('/classes/', data),
  update: (id, data) => API.put(`/classes/${id}/`, data),
  delete: (id) => API.delete(`/classes/${id}/`),
}

// Attendance endpoints
export const attendanceAPI = {
  getAll: () => API.get('/attendance/'),
  getByDate: (date) => API.get(`/attendance/?date=${date}`),
  create: (data) => API.post('/attendance/', data),
  update: (id, data) => API.put(`/attendance/${id}/`, data),
}

// Grade endpoints
export const gradeAPI = {
  getAll: () => API.get('/grades/'),
  getByStudent: (studentId) => API.get(`/grades/?student=${studentId}`),
  create: (data) => API.post('/grades/', data),
  update: (id, data) => API.put(`/grades/${id}/`, data),
}

// Payment endpoints
export const paymentAPI = {
  getAll: () => API.get('/payments/'),
  get: (id) => API.get(`/payments/${id}/`),
  create: (data) => API.post('/payments/', data),
  update: (id, data) => API.put(`/payments/${id}/`, data),
}

// Authentication endpoints
export const authAPI = {
  login: (email, password) => API.post('/auth/login/', { email, password }),
  logout: () => API.post('/auth/logout/'),
  getCurrentUser: () => API.get('/auth/me/'),
  updateProfile: (data) => API.put('/auth/me/', data),
}

export default API
