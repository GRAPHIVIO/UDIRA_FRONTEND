import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout'
import Dashboard from './pages/Dashboard'
import TeacherDashboard from './pages/TeacherDashboard'
import Students from './pages/Students'
import Teachers from './pages/Teachers'
import Classes from './pages/Classes'
import Attendance from './pages/Attendance'
import Grades from './pages/Grades'
import Payments from './pages/Payments'
import BOM from './pages/BOM'
import Profile from './pages/Profile'
import StudentProfile from './pages/StudentProfile'
import TeacherProfile from './pages/TeacherProfile'
import Login from './pages/Login'
import { useAuth } from './hooks/useAuth'

function App() {
  const { user } = useAuth()

  if (!user) {
    return (
      <Router>
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    )
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route 
            index 
            element={user?.role === 'teacher' ? <TeacherDashboard /> : <Dashboard />} 
          />


          <Route path="students" element={<Students />} />
          <Route path="students/:id" element={<StudentProfile />} />
          <Route path="teachers" element={<Teachers />} />
          <Route path="teachers/:id" element={<TeacherProfile />} />
          <Route path="classes" element={<Classes />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="grades" element={<Grades />} />
          <Route path="payments" element={<Payments />} />
          {user?.role === 'admin' && <Route path="bom" element={<BOM />} />}
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
