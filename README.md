# UDIRA School Management System (SMS) - Frontend

A modern, responsive, production-ready School Management System dashboard built with React, Vite, and Tailwind CSS.

## Features

### 🎯 Core Features
- **Role-Based Access Control**: Admin, Teacher, and Student roles with different UI views
- **Responsive Design**: Fully responsive for desktop, tablet, and mobile devices
- **Modern UI**: Clean, minimal, and professional SaaS-style design
- **Dark Sidebar Navigation**: Fixed sidebar with icon navigation
- **Top Navigation Bar**: User profile, notifications, and search
- **Mock Data**: Pre-populated with realistic data for demonstration

### 📊 Dashboard
- **Statistics Cards**: Total students, teachers, classes, attendance rate
- **Charts & Graphs**:
  - Attendance trend (bar chart)
  - Class distribution (pie chart)
  - Student performance (line chart)
- **Quick Actions**: New admissions, pending fees, attendance alerts
- **Recent Activities**: Timeline of system activities

### 👥 Students Management
- Full student list with search and filter
- View detailed student information
- Add/Edit/Delete student records
- Export student data
- Sortable table with pagination
- Status tracking (Active/Inactive)

### 👨‍🏫 Teachers Management
- Teacher directory with search
- View teacher details (qualification, experience, subject)
- Add/Edit/Delete teacher records
- Subject allocation tracking

### 📚 Classes & Subjects
- Class management with class cards
- Display class information (students count, teacher, room, timings)
- Class creation and management

### 📝 Attendance Tracking
- Mark attendance for entire class
- Quick status indicators (Present/Absent/Leave)
- Date-based attendance marking
- Attendance statistics (present, absent, leave counts)
- Attendance rate calculation

### 📊 Grades & Results
- View student grades by subject
- Grade summary table with sorting
- Student performance metrics
- Grade distribution and analysis

### 💰 Fees & Payments
- Fee collection tracking
- Payment status monitoring
- Fees statistics (collected, pending, collection rate)
- Payment receipt tracking

### 👤 User Profile
- View and edit user information
- Account settings
- Security settings
- Password management

## Tech Stack

- **Framework**: React 18.2.0
- **Build Tool**: Vite 5.0.0
- **Styling**: Tailwind CSS 3.3.0
- **Charts**: Recharts 2.10.3
- **Icons**: Lucide React 0.308.0
- **Routing**: React Router DOM 6.20.0
- **HTTP Client**: Axios 1.6.0
- **Utilities**: clsx 2.0.0

## Project Structure

```
UDIRA_FRONTEND/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Sidebar.jsx      # Left navigation sidebar
│   │   ├── Navbar.jsx       # Top navigation bar
│   │   ├── Table.jsx        # Reusable table component
│   │   ├── Modal.jsx        # Modal dialog component
│   │   └── shared.jsx       # Shared UI components (Badge, Button, StatsCard)
│   ├── pages/               # Page components
│   │   ├── Dashboard.jsx    # Main dashboard
│   │   ├── Students.jsx     # Student management
│   │   ├── Teachers.jsx     # Teacher management
│   │   ├── Classes.jsx      # Classes management
│   │   ├── Attendance.jsx   # Attendance tracking
│   │   ├── Grades.jsx       # Grades & results
│   │   ├── Payments.jsx     # Fees & payments
│   │   └── Profile.jsx      # User profile
│   ├── layouts/
│   │   └── Layout.jsx       # Main layout wrapper
│   ├── hooks/
│   │   └── useAuth.js       # Authentication context hook
│   ├── utils/
│   │   └── mockData.js      # Mock data for all modules
│   ├── services/
│   │   └── api.js           # API service (ready for backend integration)
│   ├── App.jsx              # Main app component with routing
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles with Tailwind
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
├── vite.config.js           # Vite configuration
├── index.html               # HTML template
├── package.json             # Dependencies
└── README.md                # This file
```

## Installation & Setup

### Prerequisites
- Node.js 16+ or higher
- npm or yarn package manager

### Step 1: Install Dependencies

```bash
cd UDIRA_FRONTEND
npm install
```

### Step 2: Run Development Server

```bash
npm run dev
```

The application will open automatically at `http://localhost:3000`

### Step 3: Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Step 4: Preview Production Build

```bash
npm run preview
```

## Environment Setup

### API Integration
The application is configured to work with a Django backend at `http://127.0.0.1:8000` (see `vite.config.js`).

Currently using mock data for demonstration. To integrate with the backend:

1. Update API calls in `src/services/api.js`
2. Replace mock data with API calls in page components
3. Implement authentication endpoints

Example API service in `src/services/api.js`:
```javascript
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

export const getStudents = () => API.get('/students/');
export const createStudent = (data) => API.post('/students/', data);
export const updateStudent = (id, data) => API.put(`/students/${id}/`, data);
export const deleteStudent = (id) => API.delete(`/students/${id}/`);
```

## Color Scheme

### Primary Colors
- **Primary Blue**: `#3b82f6` (used for buttons, highlights, active states)
- **Success Green**: `#10b981` (for positive indicators)
- **Warning Yellow**: `#f59e0b` (for warnings)
- **Danger Red**: `#ef4444` (for errors/deletions)

### Neutral Colors
- Dark: `#1f2937` to `#111827` (for text and backgrounds)
- Light: `#f9fafb` to `#f3f4f6` (for backgrounds)

## Key Components

### Sidebar Navigation
- Fixed position on desktop (left side)
- Collapsible hamburger menu on mobile
- Role-based menu items (Admin sees all, Teacher/Student sees limited options)
- Active state indicators

### Data Table
- Sortable columns (click column header)
- Pagination with page numbers
- Search and filter capabilities
- Custom cell renderers
- Responsive design with horizontal scroll on small screens

### Modal Dialog
- Reusable modal component
- Customizable size (sm, md, lg, xl)
- Backdrop overlay with click-to-close
- Form support for add/edit operations

### Stats Cards
- Icon-based statistics display
- Change percentage indicators
- Color-coded variants
- Responsive grid layout

## Mock Data

The application includes comprehensive mock data in `src/utils/mockData.js`:
- **Students**: 5 sample students with full profiles
- **Teachers**: 4 sample teachers with qualifications
- **Classes**: 4 sample classes with allocations
- **Attendance**: Sample attendance records
- **Grades**: Sample grades for students
- **Payments**: Sample payment records

## Features by User Role

### Admin
✅ Dashboard overview  
✅ Full student management  
✅ Teacher management  
✅ Class management  
✅ Attendance tracking  
✅ Grades management  
✅ Payment tracking  
✅ User profile  

### Teacher
✅ Dashboard overview  
✅ View/Search students  
✅ Mark attendance  
✅ View/Manage grades  
✅ View profile  

### Student
✅ Dashboard overview  
✅ View own attendance  
✅ View own grades  
✅ Payment status  
✅ View profile  

## Responsive Design

The dashboard is fully responsive:
- **Desktop** (1024px+): Full layout with sidebar and main content
- **Tablet** (768px-1023px): Collapsible sidebar, adjusted spacing
- **Mobile** (< 768px): Hamburger menu, single column layout, touch-optimized

## Available Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Future Enhancements

- [ ] Backend API integration
- [ ] Authentication/Login page
- [ ] Real-time notifications
- [ ] Advanced reporting and analytics
- [ ] Bulk import/export (CSV, Excel)
- [ ] Audit logs and activity tracking
- [ ] Email notifications
- [ ] Mobile app version
- [ ] Dark mode support
- [ ] Internationalization (i18n)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Optimized with Vite for fast development
- Code splitting for faster initial load
- Optimized chart rendering with Recharts
- Efficient state management with React hooks
- CSS-in-JS with Tailwind for minimal bundle size

## Troubleshooting

### Port 3000 already in use
```bash
# Change port in vite.config.js or use:
npm run dev -- --port 3001
```

### Styling not applied
- Ensure Tailwind CSS is properly installed: `npm install -D tailwindcss`
- Clear browser cache
- Rebuild: `npm run build`

### API connection errors
- Check if Django backend is running on `http://127.0.0.1:8000`
- Verify API endpoints in `src/services/api.js`
- Check CORS configuration in Django settings

## Contributing

When adding new features:
1. Create components in `src/components/`
2. Create pages in `src/pages/`
3. Add mock data to `src/utils/mockData.js`
4. Update routing in `src/App.jsx`
5. Follow existing code style and naming conventions

## License

© 2024 UDIRA School Management System. All rights reserved.

## Support

For issues, bug reports, or feature requests, please contact the development team.

---

**Made with ❤️ for Education**
