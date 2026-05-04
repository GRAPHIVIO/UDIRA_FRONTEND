import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, BookOpen, Clock, Award } from 'lucide-react';
import { Button, Badge } from '../components/shared';
import { mockStudents } from '../utils/mockData';

export default function StudentProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find student or show placeholder
  const student = mockStudents.find(s => s.id.toString() === id) || {
    name: 'Student Not Found',
    email: 'N/A',
    class: 'N/A',
    rollNumber: 'N/A',
    phone: 'N/A',
    gpa: 0,
    status: 'inactive',
    avatar: 'https://via.placeholder.com/150',
    enrollmentDate: 'N/A'
  };

  return (
    <div className="px-4 lg:px-8 py-6 space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Student Profile</h1>
          <p className="text-gray-500 mt-1">Detailed view of student records</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <div className="card text-center items-center flex flex-col">
            <img src={student.avatar} alt={student.name} className="w-32 h-32 rounded-full border-4 border-primary-100 shadow-sm mb-4" />
            <h2 className="text-2xl font-bold text-gray-900">{student.name}</h2>
            <p className="text-gray-500 mb-4">{student.rollNumber} • {student.class}</p>
            <Badge variant={student.status === 'active' ? 'success' : 'danger'} size="lg">
              {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
            </Badge>

            <div className="w-full mt-6 space-y-3 text-left">
              <div className="flex items-center gap-3 text-sm text-gray-600 p-3 bg-gray-50 rounded-lg">
                <Mail size={16} className="text-primary-500" /> {student.email}
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600 p-3 bg-gray-50 rounded-lg">
                <Phone size={16} className="text-primary-500" /> {student.phone}
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600 p-3 bg-gray-50 rounded-lg">
                <Clock size={16} className="text-primary-500" /> Enrolled: {student.enrollmentDate || '2023-09-01'}
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="card border-l-4 border-l-primary-500">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Current Class</p>
              <h3 className="text-2xl font-extrabold text-gray-900">{student.class}</h3>
            </div>
            <div className="card border-l-4 border-l-emerald-500">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Current GPA</p>
              <h3 className="text-2xl font-extrabold text-gray-900">{student.gpa.toFixed(2)}</h3>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen size={20} className="text-primary-600" /> Academic Performance
            </h3>
            <div className="p-12 text-center text-gray-500 border-2 border-dashed border-gray-200 rounded-xl">
              <Award size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="font-medium text-gray-700">Detailed grades are available in the Exam Portal.</p>
              <Button className="mt-4" onClick={() => navigate('/grades')}>Go to Grades</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
