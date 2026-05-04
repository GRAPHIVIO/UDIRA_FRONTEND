import React, { useState } from 'react';
import { Plus, Users, Clock, BookOpen, Edit2, Trash2 } from 'lucide-react';
import { Button, Badge } from '../components/shared';
import { mockClasses } from '../utils/mockData';

export default function Classes() {
  const [classes, setClasses] = useState(mockClasses);

  const handleDeleteClass = (id) => {
    if (window.confirm('Are you sure you want to delete this class? All associated student records will need to be reallocated. Continue?')) {
      setClasses(prev => prev.filter(c => c.id !== id));
      alert('Class removed successfully!');
    }
  };

  return (
    <div className="px-4 lg:px-8 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Classes & Subjects</h1>
          <p className="text-gray-600 mt-1">Manage classes and subject allocations</p>
        </div>
        <Button onClick={() => alert('Add class functionality')}>
          <Plus size={18} />
          Add Class
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map(cls => (
          <div key={cls.id} className="card">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{cls.name}</h3>
                <p className="text-sm text-gray-600">Grade {cls.grade}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => alert('Edit class functionality')} className="p-2 hover:bg-gray-100 rounded-lg" title="Edit">
                  <Edit2 size={16} className="text-gray-600" />
                </button>
                <button onClick={() => handleDeleteClass(cls.id)} className="p-2 hover:bg-gray-100 rounded-lg" title="Delete">
                  <Trash2 size={16} className="text-red-600" />
                </button>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Users size={16} className="text-primary-600" />
                <span><strong>{cls.totalStudents}</strong> Students</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <BookOpen size={16} className="text-primary-600" />
                <span>Class Teacher: <strong>{cls.classTeacher}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Clock size={16} className="text-primary-600" />
                <span>{cls.timings}</span>
              </div>
              <div className="pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-600">Room {cls.room}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
