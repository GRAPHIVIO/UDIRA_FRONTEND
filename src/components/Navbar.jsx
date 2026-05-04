import React, { useState } from 'react';
import { Bell, Search, User, ChevronDown } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import clsx from 'clsx';

export default function Navbar() {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user } = useAuth();

  const notifications = [
    { id: 1, message: 'New attendance record for class 10-A', time: '5 minutes ago' },
    { id: 2, message: 'Fees payment pending for 15 students', time: '1 hour ago' },
    { id: 3, message: 'New admission request submitted', time: '2 hours ago' },
  ];

  return (
    <nav className="fixed top-0 right-0 left-0 lg:left-64 h-16 bg-white border-b border-gray-200 z-30 flex items-center justify-between px-4 lg:px-8">
      {/* Search bar */}
      <div className="hidden md:flex items-center gap-3 flex-1 max-w-md">
        <Search size={20} className="text-gray-400" />
        <input
          type="text"
          placeholder="Search students, teachers, classes..."
          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4 lg:gap-6">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map(notif => (
                  <div
                    key={notif.id}
                    className="px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <p className="text-sm text-gray-900">{notif.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-gray-200 text-center">
                <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                  View all
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-8 bg-gray-200" />

        {/* Profile menu */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-8 h-8 rounded-full"
            />
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
            <ChevronDown size={18} className="text-gray-600" />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              <div className="p-4 border-b border-gray-200">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <div className="py-2">
                <button className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors">
                  <User size={16} />
                  View Profile
                </button>
              </div>
              <div className="p-2 border-t border-gray-200">
                <p className="text-xs text-gray-500 px-4 py-2">© 2026 UDIRA SMS</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
