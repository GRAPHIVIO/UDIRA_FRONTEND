import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, BookOpen, Clock, Calendar, CheckCircle } from 'lucide-react';
import { Button, Badge } from '../components/shared';
import { mockTeachers, teacherClassesData } from '../utils/mockData';

export default function TeacherProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find teacher or show placeholder
  const teacher = mockTeachers.find(t => t.id.toString() === id) || {
    name: 'Teacher Not Found',
    email: 'N/A',
    subject: 'N/A',
    qualification: 'N/A',
    experience: 'N/A',
    status: 'inactive',
    avatar: 'https://via.placeholder.com/150'
  };

  return (
    <div className="px-4 lg:px-8 py-6 space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Teacher Profile</h1>
          <p className="text-gray-500 mt-1">Detailed view of teacher records and assignments</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <div className="card text-center items-center flex flex-col">
            <img src={teacher.avatar} alt={teacher.name} className="w-32 h-32 rounded-full border-4 border-primary-100 shadow-sm mb-4" />
            <h2 className="text-2xl font-bold text-gray-900">{teacher.name}</h2>
            <p className="text-primary-600 font-medium mb-4">{teacher.subject} Dept</p>
            <Badge variant={teacher.status === 'active' ? 'success' : 'danger'} size="lg">
              {teacher.status.charAt(0).toUpperCase() + teacher.status.slice(1)}
            </Badge>

            <div className="w-full mt-6 space-y-3 text-left">
              <div className="flex items-center gap-3 text-sm text-gray-600 p-3 bg-gray-50 rounded-lg">
                <Mail size={16} className="text-primary-500" /> {teacher.email}
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600 p-3 bg-gray-50 rounded-lg">
                <CheckCircle size={16} className="text-primary-500" /> {teacher.qualification}
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600 p-3 bg-gray-50 rounded-lg">
                <Clock size={16} className="text-primary-500" /> {teacher.experience}
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="card">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen size={20} className="text-primary-600" /> Assigned Classes
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {teacherClassesData.map((cls, idx) => (
                <div key={idx} className="p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-bold text-gray-900">{cls.name}</p>
                    <Badge variant="primary" size="xs">Active</Badge>
                  </div>
                  <p className="text-xs text-gray-500">{teacher.subject}</p>
                  <p className="text-sm font-medium text-gray-700 mt-2">{cls.students} Students</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar size={20} className="text-primary-600" /> Schedule Highlights
            </h3>
            <div className="p-12 text-center text-gray-500 border-2 border-dashed border-gray-200 rounded-xl">
              <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="font-medium text-gray-700">Detailed schedule view coming soon.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
