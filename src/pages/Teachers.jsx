import React, { useState } from 'react';
import { Plus, Search, Download, Edit2, Trash2, Eye, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Table from '../components/Table';
import Modal from '../components/Modal';
import { Button, Badge } from '../components/shared';
import { mockTeachers } from '../utils/mockData';

export default function Teachers() {
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState(mockTeachers);
  const [searchTerm, setSearchTerm] = useState('');
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [assignForm, setAssignForm] = useState({ class: '10-A', subject: 'Mathematics' });
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  
  const [newTeacher, setNewTeacher] = useState({
    name: '',
    email: '',
    subject: '',
    qualification: '',
    experience: '',
    status: 'active'
  });

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewTeacher = (teacher) => {
    navigate(`/teachers/${teacher.id}`);
  };

  const handleOpenAssign = (teacher) => {
    setSelectedTeacher(teacher);
    setIsAssignModalOpen(true);
  };

  const handleAssignTeacher = (e) => {
    e.preventDefault();
    // Here we'd normally make an API call to assign the teacher
    alert(`Assigned ${selectedTeacher.name} to ${assignForm.class} for ${assignForm.subject}`);
    setIsAssignModalOpen(false);
  };

  const handleAddTeacher = (e) => {
    e.preventDefault();
    const newId = (teachers.length > 0 ? Math.max(...teachers.map(t => parseInt(t.id, 10))) + 1 : 1).toString();
    const teacherToAdd = {
      ...newTeacher,
      id: newId,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(newTeacher.name)}`
    };
    setTeachers(prev => [teacherToAdd, ...prev]);
    setIsAddModalOpen(false);
    setNewTeacher({ name: '', email: '', subject: '', qualification: '', experience: '', status: 'active' });
    alert('Teacher added successfully!');
  };

  const handleDeleteTeacher = (id) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      setTeachers(prev => prev.filter(t => t.id !== id));
      alert('Teacher deleted successfully!');
    }
  };

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Name,Email,Subject,Qualification,Experience,Status\n"
      + teachers.map(t => `${t.name},${t.email},${t.subject},${t.qualification},${t.experience},${t.status}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "teachers_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const columns = [
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <img src={row.avatar} alt={value} className="w-8 h-8 rounded-full" />
          <div>
            <p className="font-medium text-gray-900">{value}</p>
            <p className="text-xs text-gray-500">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'subject',
      label: 'Subject',
      sortable: true,
      render: (value) => <Badge variant="primary" size="sm">{value}</Badge>,
    },
    {
      key: 'qualification',
      label: 'Qualification',
      sortable: true,
    },
    {
      key: 'experience',
      label: 'Experience',
      sortable: true,
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value) => <Badge variant={value === 'active' ? 'success' : 'danger'} size="sm">{value.charAt(0).toUpperCase() + value.slice(1)}</Badge>,
    },
    {
      key: 'id',
      label: 'Actions',
      render: (value, row) => (
        <div className="flex items-center gap-2">
          <button onClick={() => handleViewTeacher(row)} className="p-1.5 hover:bg-gray-100 rounded-lg" title="View">
            <Eye size={16} className="text-gray-600" />
          </button>
          <button onClick={() => handleOpenAssign(row)} className="p-1.5 hover:bg-gray-100 rounded-lg" title="Assign Class/Subject">
            <BookOpen size={16} className="text-primary-600" />
          </button>
          <button onClick={() => alert('Edit teacher functionality')} className="p-1.5 hover:bg-gray-100 rounded-lg" title="Edit">
            <Edit2 size={16} className="text-gray-600" />
          </button>
          <button onClick={() => handleDeleteTeacher(row.id)} className="p-1.5 hover:bg-gray-100 rounded-lg" title="Delete">
            <Trash2 size={16} className="text-red-600" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="px-4 lg:px-8 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Teachers Management</h1>
          <p className="text-gray-600 mt-1">Manage teacher information and assignments</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={handleExport}>
            <Download size={18} />
            Export
          </Button>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus size={18} />
            Add Teacher
          </Button>
        </div>
      </div>

      <div className="card">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="label">Search</label>
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="text-sm text-gray-600">
        Showing {filteredTeachers.length} of {teachers.length} teachers
      </div>

      <Table columns={columns} data={filteredTeachers} />

      <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} title="Teacher Details">
        {selectedTeacher && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <img src={selectedTeacher.avatar} alt={selectedTeacher.name} className="w-16 h-16 rounded-full" />
              <div>
                <h3 className="text-lg font-bold text-gray-900">{selectedTeacher.name}</h3>
                <p className="text-sm text-gray-600">{selectedTeacher.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 uppercase">Subject</p>
                <p className="text-sm font-medium text-gray-900">{selectedTeacher.subject}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Qualification</p>
                <p className="text-sm font-medium text-gray-900">{selectedTeacher.qualification}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Experience</p>
                <p className="text-sm font-medium text-gray-900">{selectedTeacher.experience}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Status</p>
                <Badge variant={selectedTeacher.status === 'active' ? 'success' : 'danger'} size="sm">
                  {selectedTeacher.status.charAt(0).toUpperCase() + selectedTeacher.status.slice(1)}
                </Badge>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Teacher">
        <form onSubmit={handleAddTeacher} className="space-y-4">
          <div>
            <label className="label">Full Name</label>
            <input 
              type="text" 
              required 
              className="input" 
              value={newTeacher.name} 
              onChange={e => setNewTeacher({...newTeacher, name: e.target.value})} 
              placeholder="e.g. John Doe" 
            />
          </div>
          <div>
            <label className="label">Email Address</label>
            <input 
              type="email" 
              required 
              className="input" 
              value={newTeacher.email} 
              onChange={e => setNewTeacher({...newTeacher, email: e.target.value})} 
              placeholder="e.g. john@example.com" 
            />
          </div>
          <div>
            <label className="label">Subject</label>
            <input 
              type="text" 
              required 
              className="input" 
              value={newTeacher.subject} 
              onChange={e => setNewTeacher({...newTeacher, subject: e.target.value})} 
              placeholder="e.g. Mathematics" 
            />
          </div>
          <div>
            <label className="label">Qualification</label>
            <input 
              type="text" 
              required 
              className="input" 
              value={newTeacher.qualification} 
              onChange={e => setNewTeacher({...newTeacher, qualification: e.target.value})} 
              placeholder="e.g. M.Sc. Mathematics" 
            />
          </div>
          <div>
            <label className="label">Experience</label>
            <input 
              type="text" 
              required 
              className="input" 
              value={newTeacher.experience} 
              onChange={e => setNewTeacher({...newTeacher, experience: e.target.value})} 
              placeholder="e.g. 5 Years" 
            />
          </div>
          <div>
            <label className="label">Status</label>
            <select 
              className="input" 
              value={newTeacher.status} 
              onChange={e => setNewTeacher({...newTeacher, status: e.target.value})}
            >
              <option value="active">Active</option>
              <option value="on_leave">On Leave</option>
            </select>
          </div>
          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <Button type="button" variant="secondary" className="flex-1" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button type="submit" className="flex-1">Add Teacher</Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isAssignModalOpen} onClose={() => setIsAssignModalOpen(false)} title={`Assign ${selectedTeacher?.name || 'Teacher'}`}>
        <form onSubmit={handleAssignTeacher} className="space-y-4">
          <div>
            <label className="label">Select Class</label>
            <select 
              className="input" 
              value={assignForm.class} 
              onChange={e => setAssignForm({...assignForm, class: e.target.value})}
            >
              <option value="10-A">10-A</option>
              <option value="10-B">10-B</option>
              <option value="10-C">10-C</option>
              <option value="9-A">9-A</option>
            </select>
          </div>
          <div>
            <label className="label">Select Subject</label>
            <select 
              className="input" 
              value={assignForm.subject} 
              onChange={e => setAssignForm({...assignForm, subject: e.target.value})}
            >
              <option value="Mathematics">Mathematics</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Biology">Biology</option>
              <option value="English">English</option>
            </select>
          </div>
          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <Button type="button" variant="secondary" className="flex-1" onClick={() => setIsAssignModalOpen(false)}>Cancel</Button>
            <Button type="submit" className="flex-1">Save Assignment</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
