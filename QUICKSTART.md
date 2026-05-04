# 🚀 UDIRA SMS - Quick Start Guide

## Get Started in 3 Steps

### 1️⃣ Install Dependencies
```bash
cd UDIRA_FRONTEND
npm install
```

### 2️⃣ Start Development Server
```bash
npm run dev
```

The app opens automatically at **http://localhost:3000** 🎉

### 3️⃣ Explore the Dashboard

**Login with default user:**
- Role: Admin
- All features unlocked and visible

## 📦 Default Credentials

The app comes pre-configured with a default admin user:
```
Name: Dr. Michael Johnson
Email: michael.johnson@school.edu
Role: Admin
```

*Note: This is a demo setup. Change roles in `/src/utils/mockData.js` to test different user roles.*

## 🎨 Key Features to Try

### Dashboard
- View statistics cards with real data
- Interactive charts (attendance, performance, class distribution)
- Quick action alerts

### Students Management
- 📋 Search and filter students
- 👁️ View detailed student profiles
- ➕ Add/Edit/Delete students
- 📥 Export data

### Attendance
- Mark attendance with quick status buttons
- See attendance statistics
- Filter by class and date

### Grades
- View student performance
- Analyze grades by subject
- Calculate GPA and percentages

### Other Modules
- Teachers management
- Classes & subjects
- Payments & fees
- User profile settings

## 🔧 Customization

### Change User Role
Edit `/src/utils/mockData.js`:
```javascript
export const mockUser = {
  // ...
  role: "admin", // Change to "teacher" or "student"
  // ...
};
```

### Change Color Scheme
Edit `/tailwind.config.js`:
```javascript
colors: {
  primary: {
    // Modify primary color palette
  }
}
```

### Add Mock Data
Edit `/src/utils/mockData.js` to add your own data for students, teachers, classes, etc.

## 📱 Responsive Testing

Test on different screen sizes:
- **Desktop**: Full layout with sidebar (1024px+)
- **Tablet**: Collapsible menu (768px-1023px)
- **Mobile**: Hamburger menu (< 768px)

Use browser DevTools (F12) to simulate different devices.

## 🔗 Sidebar Navigation

The sidebar automatically shows/hides menu items based on user role:
- **Admin**: Sees all modules
- **Teacher**: Sees Dashboard, Students, Classes, Attendance, Grades, Profile
- **Student**: Sees Dashboard, Attendance, Grades, Payments, Profile

## 📊 Working with Data

### Mock Data Location
All sample data is in: `/src/utils/mockData.js`

### Available Data:
- 5 sample students
- 4 sample teachers
- 4 sample classes
- Attendance records
- Grade records
- Payment records

## 🛠️ Development Tips

### Hot Reload
The app automatically reloads when you save files (thanks to Vite).

### Console Debugging
Open browser DevTools (F12) to see console logs and debug.

### Component Reusability
Key reusable components:
- `<Table />` - Sortable, paginated tables
- `<Modal />` - Dialogs for forms
- `<Button />` - Styled buttons
- `<Badge />` - Status badges
- `<StatsCard />` - Statistics display

## 🚀 Build for Production

```bash
npm run build
```

Creates optimized build in `/dist` folder.

To preview:
```bash
npm run preview
```

## 📚 File Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Page components
├── layouts/        # Layout wrappers
├── hooks/          # Custom React hooks
├── utils/          # Utilities & mock data
├── services/       # API services (when ready)
└── App.jsx         # Main router setup
```

## 🐛 Common Issues

### Issue: Port 3000 already in use
**Solution:**
```bash
npm run dev -- --port 3001
```

### Issue: Styles not loading
**Solution:**
- Clear cache: Ctrl+Shift+Delete (or Cmd+Shift+Delete on Mac)
- Hard refresh: Ctrl+F5 (or Cmd+Shift+R on Mac)

### Issue: Changes not updating
**Solution:** Restart dev server (Ctrl+C and run `npm run dev` again)

## ✅ Next Steps

1. ✨ Explore all pages and features
2. 🎨 Customize the design if needed
3. 🔗 Connect to your Django backend
4. 📝 Update mock data with real data
5. 🚀 Deploy to production

## 📖 Full Documentation

For detailed documentation, see [README.md](./README.md)

## 💡 Tips

- The design uses **Tailwind CSS** - no CSS files needed for styling
- All UI components are in `/src/components/`
- Mock data is completely separate - easy to replace with API calls
- The app is fully responsive - test on mobile!

## 🎯 Have Fun!

This is a fully functional demo dashboard. Explore the features, make changes, and build on top of it! 🚀

---

**Questions?** Check the main README.md or explore the source code.
