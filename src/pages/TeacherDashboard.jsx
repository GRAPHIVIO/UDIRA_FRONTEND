import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import {
  Users, BookOpen, ClipboardCheck, GraduationCap,
  Clock, MapPin, ChevronRight,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { StatsCard, Badge, Button } from '../components/shared';
import {
  teacherDashboardStats, teacherScheduleData,
  teacherClassesData, recentSubmissions,
} from '../utils/mockData';
import { useAuth } from '../hooks/useAuth';
import { fetchClasses } from '../services/gradesService';
import { fetchDashboardStats } from '../services/dashboardService';

const COLORS = ['#2f6660', '#ACABA7', '#4d8d85', '#bfbeba'];

export default function TeacherDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState('');
  const [availableClasses, setAvailableClasses] = useState([]);
  const [stats, setStats] = useState(teacherDashboardStats);

  // Load classes and stats on mount
  useEffect(() => {
    fetchDashboardStats().then(data => {
      if (data) {
        setStats({
          ...teacherDashboardStats,
          myStudents: data.totalStudents, // Fallback for now
          myClasses: data.totalClasses,
          avgAttendance: data.attendanceToday,
        });
      }
    });

    fetchClasses()
      .then(data => {
        const list = (data.results || data);
        if (list.length > 0) {
          setAvailableClasses(list);
          if (!selectedClass) setSelectedClass(list[0].name);
        }
      })
      .catch(() => {
        setAvailableClasses(teacherClassesData);
      });
  }, []);

  const handleGoToGrades = () => {
    navigate('/grades');
  };

  return (
    <div className="px-4 lg:px-8 py-6 space-y-8 animate-in fade-in duration-500">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Teacher Dashboard</h1>
          <p className="text-gray-500 mt-1 flex items-center gap-2">
            Welcome back, <span className="font-semibold text-primary-600">{user?.name}</span>! Ready for your classes today?
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" size="sm" onClick={handleGoToGrades} id="go-to-grades-btn">
            <GraduationCap size={18} className="mr-2" />
            View Grades
          </Button>
          <Button size="sm">Attendance</Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard icon={Users} label="My Students" value={stats.myStudents} change={8} />
        <StatsCard icon={BookOpen} label="Assigned Classes" value={stats.myClasses} change={0} />
        <StatsCard icon={ClipboardCheck} label="Avg. Attendance" value={`${stats.avgAttendance}%`} change={2.5} />
        <StatsCard icon={GraduationCap} label="Pending Grades" value={stats.pendingGrades} change={-12} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="card overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Clock className="text-primary-600" size={20} /> Today's Schedule
              </h3>
              <button className="text-sm text-primary-600 font-medium hover:underline">View Full Calendar</button>
            </div>
            <div className="relative space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100">
              {teacherScheduleData.map((item, idx) => (
                <div key={idx} className="relative pl-10 flex items-center justify-between group">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[24px] h-[24px] rounded-full border-4 border-white bg-primary-600 z-10" />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900">{item.time} - {item.subject}</p>
                    <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Users size={12} /> {item.class}</span>
                      <span className="flex items-center gap-1"><MapPin size={12} /> {item.room}</span>
                      <Badge variant="primary" size="xs" className="opacity-80">{item.type}</Badge>
                    </div>
                  </div>
                  <Button variant="secondary" size="xs" className="opacity-0 group-hover:opacity-100 transition-opacity">Mark Attendance</Button>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Class Performance Overview</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={teacherClassesData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} cursor={{ fill: '#f9fafb' }} />
                  <Bar dataKey="performance" radius={[4, 4, 0, 0]}>
                    {teacherClassesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="card">
            <h3 className="text-lg font-bold text-gray-900 mb-6">My Classes</h3>
            <div className="space-y-4">
              {availableClasses.length > 0 ? availableClasses.map((cls) => (
                <div key={cls.id || cls.name} className="p-4 rounded-xl border border-gray-100 hover:border-primary-200 hover:bg-primary-50/30 transition-all group">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-gray-900">{cls.name}</p>
                      <p className="text-xs text-gray-500">{cls.subject || 'Core Subject'}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-primary-700">{cls.students || 35}</p>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider">Students</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <Button 
                      variant="secondary" 
                      size="xs" 
                      onClick={handleGoToGrades}
                      className="bg-white hover:bg-primary-600 hover:text-white transition-all border-gray-200"
                    >
                      <GraduationCap size={14} className="mr-1.5" /> Add Grades
                    </Button>
                    <ChevronRight size={16} className="text-gray-300 group-hover:text-primary-500 transition-colors" />
                  </div>
                </div>
              )) : (
                <div className="text-center py-8 text-gray-400 italic">No classes found</div>
              )}
            </div>
            <Button variant="secondary" className="w-full mt-6">View All Classes</Button>
          </div>

          <div className="card">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Submissions</h3>
            <div className="space-y-4">
              {recentSubmissions.map((sub) => (
                <div key={sub.id} className="flex items-center gap-3 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${sub.status === 'graded' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'}`}>
                    <ClipboardCheck size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{sub.student}</p>
                    <p className="text-xs text-gray-500 truncate">{sub.assignment}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={sub.status === 'graded' ? 'success' : 'warning'} size="xs">
                      {sub.status === 'graded' ? 'Graded' : 'Pending'}
                    </Badge>
                    <p className="text-[10px] text-gray-400 mt-1">{sub.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
