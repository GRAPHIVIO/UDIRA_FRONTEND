import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Users, BookOpen, Briefcase, TrendingUp, GraduationCap } from 'lucide-react';
import { StatsCard, Badge, Button } from '../components/shared';
import ExamPortal from '../components/ExamPortal';
import { useAuth } from '../hooks/useAuth';
import {
  mockDashboardStats,
  studentPerformanceData,
  attendanceTrendData,
  classDistributionData,
} from '../utils/mockData';
import { generateExcelReport, generatePDFReport } from '../utils/reportUtils';
import { fetchRankedResults } from '../services/gradesService';
import { fetchDashboardStats } from '../services/dashboardService';

const COLORS = ['#2f6660', '#ACABA7', '#4d8d85', '#bfbeba'];

function Dashboard() {
  const { user } = useAuth();
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [stats, setStats] = useState(mockDashboardStats);
  const [topStudents, setTopStudents] = useState([
    { name: 'Emma Taylor', marks: '1069', rank: 1, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma', class_name: '10-A' },
    { name: 'Alice Chen',  marks: '1005', rank: 2, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice', class_name: '10-A' },
    { name: 'Carol Williams', marks: '996', rank: 3, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carol', class_name: '10-A' },
  ]);
  const [isExamPortalOpen, setIsExamPortalOpen] = useState(false);

  useEffect(() => {
    fetchDashboardStats().then(data => {
      if (data) setStats(data);
    });

    fetchRankedResults()
      .then(data => {
        if (data && data.length > 0) {
          const top3 = data.slice(0, 3).map((s, i) => ({
            name: s.student_name,
            marks: s.total_marks.toString(),
            rank: i + 1,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(s.student_name)}`,
            class_name: s.class_name,
          }));
          setTopStudents(top3);
        }
      })
      .catch(() => { /* keep default mock top 3 */ });
  }, []);

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    try {
      const data = {
        stats: mockDashboardStats,
        attendance: attendanceTrendData,
        performance: studentPerformanceData,
        classes: classDistributionData,
        user: user
      };
      
      // Generate both formats
      generateExcelReport(data);
      generatePDFReport(data);
    } catch (error) {
      console.error("Report generation failed:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="px-4 lg:px-8 py-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back, {user?.name}!</p>
        </div>
        <Button 
          onClick={handleGenerateReport} 
          disabled={isGenerating}
          className={isGenerating ? 'opacity-70 cursor-not-allowed' : ''}
        >
          {isGenerating ? 'Generating...' : 'Generate Report'}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          icon={Users}
          label="Total Students"
          value={stats.totalStudents}
          change={12}
        />
        <StatsCard
          icon={BookOpen}
          label="Total Teachers"
          value={stats.totalTeachers}
          change={5}
        />
        <StatsCard
          icon={Briefcase}
          label="Total Classes"
          value={stats.totalClasses}
          change={2}
        />
        <StatsCard
          icon={TrendingUp}
          label="Attendance Today"
          value={`${stats.attendanceToday}%`}
          change={3}
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Trend */}
        <div className="lg:col-span-2 card">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Attendance Trend (This Week)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={attendanceTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="present" fill="#2f6660" name="Present" />
              <Bar dataKey="absent" fill="#ef4444" name="Absent" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Class Distribution */}
        <div className="card">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Class Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={classDistributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {classDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Student Performance */}
        <div className="card">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Student Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={studentPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="math" stroke="#2f6660" name="Math" />
              <Line type="monotone" dataKey="english" stroke="#4d8d85" name="English" />
              <Line type="monotone" dataKey="science" stroke="#acaba7" name="Science" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Actions / Results Entry */}
        <div className="card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">Academic Leaderboard</h3>
            <Button size="xs" onClick={() => setIsExamPortalOpen(true)} className="bg-primary-50 text-primary-700 border-primary-100 hover:bg-primary-100">
              <GraduationCap size={14} className="mr-1" /> Add Results
            </Button>
          </div>
          <div className="space-y-4">
            {topStudents.map((student, idx) => (
              <div key={idx} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="relative">
                  <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full border border-gray-200" />
                  <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white ${student.rank === 1 ? 'bg-yellow-500' : student.rank === 2 ? 'bg-gray-400' : 'bg-amber-600'}`}>
                    {student.rank}
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-900">{student.name}</p>
                  <p className="text-xs text-gray-500">Total: {student.marks} marks · {student.class_name}</p>
                </div>
                <Badge variant="success" size="xs">Top</Badge>
              </div>
            ))}
            {user?.role === 'admin' && (
              <>
                <hr className="border-gray-100" />
                <div className="p-4 bg-primary-600 rounded-xl text-white shadow-lg shadow-primary-900/20">
                  <p className="text-xs font-bold uppercase tracking-widest opacity-80">School Oversight</p>
                  <h4 className="text-lg font-bold mt-1">Board of Management</h4>
                  <p className="text-xs opacity-90 mt-2 mb-4">View the latest BOM resolutions and strategic school governance notices.</p>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="w-full bg-white text-primary-700 border-none hover:bg-primary-50"
                    onClick={() => window.location.hash = '/bom'}
                  >
                    Go to BOM Portal
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="card">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Activities</h3>
        <div className="space-y-4">
          {[
            { time: '2 hours ago', action: 'New admission request from John Doe', status: 'pending' },
            { time: '4 hours ago', action: 'Attendance marked for class 10-A', status: 'completed' },
            { time: 'Yesterday', action: 'Grades uploaded for Midterm Exam', status: 'completed' },
            { time: '2 days ago', action: 'New fee payment received from Emma Taylor', status: 'completed' },
          ].map((activity, idx) => (
            <div key={idx} className="flex items-start gap-4 pb-4 border-b border-gray-200 last:border-0">
              <div className="w-2 h-2 rounded-full bg-primary-600 mt-2 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
              {activity.status === 'completed' ? (
                <Badge variant="success" size="sm">Done</Badge>
              ) : (
                <Badge variant="warning" size="sm">Pending</Badge>
              )}
            </div>
          ))}
        </div>
      </div>

      <ExamPortal 
        isOpen={isExamPortalOpen} 
        onClose={() => {
          setIsExamPortalOpen(false);
          // Optionally refresh dashboard stats here if needed
        }} 
      />
    </div>
  );
}

export default Dashboard;
