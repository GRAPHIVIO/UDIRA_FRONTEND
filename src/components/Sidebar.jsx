import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  BookOpen,
  Calendar,
  FileText,
  DollarSign,
  Settings,
  LogOut,
  Shield,
  Box,
  Beaker,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import clsx from 'clsx';

const MENU_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/', roles: ['admin', 'teacher', 'student'] },
  { icon: Users, label: 'Students', path: '/students', roles: ['admin', 'teacher'] },
  { icon: Users, label: 'Teachers', path: '/teachers', roles: ['admin'] },
  { icon: BookOpen, label: 'Classes', path: '/classes', roles: ['admin', 'teacher'] },
  { icon: Calendar, label: 'Attendance', path: '/attendance', roles: ['admin', 'teacher', 'student'] },
  { icon: FileText, label: 'Grades', path: '/grades', roles: ['admin', 'teacher', 'student'] },
  { icon: DollarSign, label: 'Payments', path: '/payments', roles: ['admin', 'student'] },
  { icon: Shield, label: 'BOM', path: '/bom', roles: ['admin'] },
  { icon: Box, label: 'Assets', path: '/assets', roles: ['admin'] },
  { icon: Beaker, label: 'Laboratory', path: '/labs', roles: ['admin', 'teacher'] },
  { icon: Settings, label: 'Profile', path: '/profile', roles: ['admin', 'teacher', 'student'] },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const filteredMenuItems = MENU_ITEMS.filter(item => item.roles.includes(user?.role));

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-40 p-2 rounded-lg bg-primary-600 text-white lg:hidden hover:bg-primary-700 transition-colors"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar overlay on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          'fixed left-0 top-0 h-screen w-64 bg-dark-900 text-white z-40 transition-transform duration-300 flex flex-col lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-dark-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary-600 flex items-center justify-center">
              <BookOpen size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold">UDIRA</h1>
              <p className="text-xs text-dark-400">School Management</p>
            </div>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={clsx(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200',
                  isActive
                    ? 'bg-primary-600 text-white'
                    : 'text-dark-300 hover:bg-dark-800 hover:text-white'
                )}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User info and logout */}
        <div className="p-4 border-t border-dark-700 space-y-4">
          <div className="px-4 py-3 bg-dark-800 rounded-lg">
            <p className="text-xs text-dark-400 mb-1">Logged in as</p>
            <p className="text-sm font-medium truncate">{user?.name}</p>
            <p className="text-xs text-dark-400 capitalize">{user?.role}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors duration-200 font-medium"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content spacing */}
      <div className="lg:ml-64" />
    </>
  );
}
