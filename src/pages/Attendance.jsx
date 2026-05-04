import React, { useState, useMemo } from 'react';
import { Calendar, Download, CheckCircle, XCircle, Clock } from 'lucide-react';
import Table from '../components/Table';
import { Button, Badge } from '../components/shared';
import { mockAttendance, mockStudents } from '../utils/mockData';

const STATUS_OPTIONS = [
  { value: 'present', label: 'Present', icon: CheckCircle, color: 'text-green-600' },
  { value: 'absent', label: 'Absent', icon: XCircle, color: 'text-red-600' },
  { value: 'leave', label: 'Leave', icon: Clock, color: 'text-yellow-600' },
];

export default function Attendance() {
  const [selectedClass, setSelectedClass] = useState('10-A');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceData, setAttendanceData] = useState(
    mockStudents
      .filter(s => s.class === selectedClass)
      .map(s => ({
        id: s.id,
        studentName: s.name,
        studentId: s.id,
        rollNumber: s.rollNumber,
        status: 'present',
      }))
  );

  const handleStatusChange = (studentId, newStatus) => {
    setAttendanceData(prev =>
      prev.map(record =>
        record.studentId === studentId
          ? { ...record, status: newStatus }
          : record
      )
    );
  };

  const handleClassChange = (newClass) => {
    setSelectedClass(newClass);
    setAttendanceData(
      mockStudents
        .filter(s => s.class === newClass)
        .map(s => ({
          id: s.id,
          studentName: s.name,
          studentId: s.id,
          rollNumber: s.rollNumber,
          status: 'present',
        }))
    );
  };

  const stats = useMemo(() => {
    const total = attendanceData.length;
    const present = attendanceData.filter(r => r.status === 'present').length;
    const absent = attendanceData.filter(r => r.status === 'absent').length;
    const leave = attendanceData.filter(r => r.status === 'leave').length;

    return { total, present, absent, leave, percentage: total > 0 ? ((present / total) * 100).toFixed(1) : 0 };
  }, [attendanceData]);

  const columns = [
    {
      key: 'rollNumber',
      label: 'Roll No.',
      sortable: true,
    },
    {
      key: 'studentName',
      label: 'Student Name',
      sortable: true,
    },
    {
      key: 'status',
      label: 'Attendance Status',
      sortable: false,
      render: (value, row) => (
        <div className="flex gap-2">
          {STATUS_OPTIONS.map(option => {
            const Icon = option.icon;
            return (
              <button
                key={option.value}
                onClick={() => handleStatusChange(row.studentId, option.value)}
                className={`p-2 rounded-lg transition-colors ${
                  value === option.value
                    ? 'bg-gray-200'
                    : 'hover:bg-gray-100'
                }`}
                title={option.label}
              >
                <Icon size={18} className={option.color} />
              </button>
            );
          })}
        </div>
      ),
    },
  ];

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Roll No,Student Name,Status\n"
      + attendanceData.map(r => `${r.rollNumber},${r.studentName},${r.status}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `attendance_${selectedClass}_${selectedDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
      handleClassChange(selectedClass);
    }
  };

  const handleSubmit = () => {
    alert(`Attendance marked for ${selectedClass} on ${selectedDate}`);
    console.log('Attendance data:', attendanceData);
  };

  return (
    <div className="px-4 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Attendance Tracking</h1>
          <p className="text-gray-600 mt-1">Mark and manage student attendance</p>
        </div>
        <Button variant="secondary" onClick={handleExport}>
          <Download size={18} />
          Download Report
        </Button>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="label">Select Class</label>
            <select
              value={selectedClass}
              onChange={(e) => handleClassChange(e.target.value)}
              className="input"
            >
              <option value="10-A">Class 10-A</option>
              <option value="10-B">Class 10-B</option>
              <option value="10-C">Class 10-C</option>
              <option value="9-A">Class 9-A</option>
            </select>
          </div>
          <div>
            <label className="label">Select Date</label>
            <div className="relative">
              <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="input pl-10"
              />
            </div>
          </div>
          <div className="flex items-end">
            <Button className="w-full" onClick={handleSubmit}>
              Save Attendance
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="card">
          <p className="text-xs text-gray-600 uppercase">Total Students</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="card">
          <p className="text-xs text-gray-600 uppercase">Present</p>
          <div className="flex items-end gap-2">
            <p className="text-2xl font-bold text-green-600">{stats.present}</p>
            <Badge variant="success" size="sm">{stats.percentage}%</Badge>
          </div>
        </div>
        <div className="card">
          <p className="text-xs text-gray-600 uppercase">Absent</p>
          <p className="text-2xl font-bold text-red-600">{stats.absent}</p>
        </div>
        <div className="card">
          <p className="text-xs text-gray-600 uppercase">Leave</p>
          <p className="text-2xl font-bold text-yellow-600">{stats.leave}</p>
        </div>
        <div className="card">
          <p className="text-xs text-gray-600 uppercase">Attendance Rate</p>
          <div className="flex items-end gap-2">
            <p className="text-2xl font-bold text-primary-600">{stats.percentage}%</p>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          <strong>How to use:</strong> Click the icons next to each student to mark attendance.
          <CheckCircle size={16} className="inline text-green-600 ml-2" /> Present
          <XCircle size={16} className="inline text-red-600 ml-2" /> Absent
          <Clock size={16} className="inline text-yellow-600 ml-2" /> Leave
        </p>
      </div>

      {/* Table */}
      <Table columns={columns} data={attendanceData} />

      {/* Submit Button */}
      <div className="flex gap-3 justify-end">
        <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save & Submit Attendance
        </Button>
      </div>
    </div>
  );
}
