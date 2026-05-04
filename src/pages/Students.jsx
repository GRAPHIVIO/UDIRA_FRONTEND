import React, { useState, useMemo } from 'react';
import { Plus, Search, Download, Edit2, Trash2, Eye, UserCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Table from '../components/Table';
import Modal from '../components/Modal';
import { Button, Badge } from '../components/shared';
import { mockStudents } from '../utils/mockData';

export default function Students() {
  const navigate = useNavigate();
  const [students, setStudents] = useState(mockStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('all');
  const [selectedRows, setSelectedRows] = useState([]);
  const [isBulkAssignModalOpen, setIsBulkAssignModalOpen] = useState(false);
  const [bulkClass, setBulkClass] = useState('10-A');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    class: '10-A',
    rollNumber: '',
    phone: '',
  });

  // Filter and search logic
  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.rollNumber.includes(searchTerm);
      const matchesClass = filterClass === 'all' || student.class === filterClass;
      return matchesSearch && matchesClass;
    });
  }, [students, searchTerm, filterClass]);

  const handleAddStudent = () => {
    setFormData({ name: '', email: '', class: '10-A', rollNumber: '', phone: '' });
    setIsAddModalOpen(true);
  };

  const handleViewStudent = (student) => {
    navigate(`/students/${student.id}`);
  };

  const handleBulkAssign = (e) => {
    e.preventDefault();
    setStudents(prev => prev.map(s => selectedRows.includes(s.id) ? { ...s, class: bulkClass } : s));
    setSelectedRows([]);
    setIsBulkAssignModalOpen(false);
    alert(`${selectedRows.length} students assigned to ${bulkClass}!`);
  };

  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    setFormData(student);
    setIsEditModalOpen(true);
  };

  const handleDeleteStudent = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setStudents(prev => prev.filter(s => s.id !== id));
      alert('Student deleted successfully!');
    }
  };

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Name,Email,Class,Roll Number,Phone,GPA\n"
      + students.map(s => `${s.name},${s.email},${s.class},${s.rollNumber},${s.phone},${s.gpa}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "students_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setFilterClass('all');
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditModalOpen) {
      setStudents(prev => prev.map(s => s.id === selectedStudent.id ? { ...s, ...formData } : s));
      alert('Student updated successfully!');
    } else {
      const newStudent = {
        ...formData,
        id: Date.now(),
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=random`,
        gpa: 4.0,
        status: 'active',
        enrollmentDate: new Date().toISOString().split('T')[0]
      };
      setStudents(prev => [newStudent, ...prev]);
      alert('Student added successfully!');
    }
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setFormData({ name: '', email: '', class: '10-A', rollNumber: '', phone: '' });
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
      key: 'rollNumber',
      label: 'Roll No.',
      sortable: true,
    },
    {
      key: 'class',
      label: 'Class',
      sortable: true,
      render: (value) => <Badge variant="primary" size="sm">{value}</Badge>,
    },
    {
      key: 'phone',
      label: 'Phone',
      sortable: false,
    },
    {
      key: 'gpa',
      label: 'GPA',
      sortable: true,
      render: (value) => (
        <span className="font-medium text-gray-900">{value.toFixed(2)}</span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value) => (
        <Badge
          variant={value === 'active' ? 'success' : 'danger'}
          size="sm"
        >
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </Badge>
      ),
    },
    {
      key: 'id',
      label: 'Actions',
      sortable: false,
      render: (value, row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleViewStudent(row)}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            title="View"
          >
            <Eye size={16} className="text-gray-600" />
          </button>
          <button
            onClick={() => handleEditStudent(row)}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            title="Edit"
          >
            <Edit2 size={16} className="text-gray-600" />
          </button>
          <button
            onClick={() => handleDeleteStudent(row.id)}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            title="Delete"
          >
            <Trash2 size={16} className="text-red-600" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="px-4 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Students Management</h1>
          <p className="text-gray-600 mt-1">Manage all student information and records</p>
        </div>
        <div className="flex gap-3">
          {selectedRows.length > 0 && (
            <Button variant="secondary" onClick={() => setIsBulkAssignModalOpen(true)}>
              <UserCheck size={18} className="mr-2" />
              Assign Class ({selectedRows.length})
            </Button>
          )}
          <Button variant="secondary" size="md" onClick={handleExport}>
            <Download size={18} />
            Export
          </Button>
          <Button onClick={handleAddStudent}>
            <Plus size={18} />
            Add Student
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="label">Search</label>
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or roll number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10"
              />
            </div>
          </div>
          <div>
            <label className="label">Filter by Class</label>
            <select
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
              className="input"
            >
              <option value="all">All Classes</option>
              <option value="10-A">10-A</option>
              <option value="10-B">10-B</option>
              <option value="10-C">10-C</option>
              <option value="9-A">9-A</option>
            </select>
          </div>
          <div className="flex items-end">
            <Button variant="secondary" className="w-full" onClick={handleResetFilters}>
              Reset Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-gray-600">
        Showing {filteredStudents.length} of {students.length} students
      </div>

      {/* Table */}
      <Table 
        columns={columns} 
        data={filteredStudents} 
        selectable={true}
        selectedRows={selectedRows}
        onSelectionChange={setSelectedRows}
      />

      {/* Bulk Assign Modal */}
      <Modal
        isOpen={isBulkAssignModalOpen}
        onClose={() => setIsBulkAssignModalOpen(false)}
        title="Assign Students to Class"
        size="sm"
      >
        <form onSubmit={handleBulkAssign} className="space-y-4">
          <div>
            <label className="label">Select Target Class</label>
            <select
              value={bulkClass}
              onChange={(e) => setBulkClass(e.target.value)}
              className="input"
              required
            >
              <option value="10-A">10-A</option>
              <option value="10-B">10-B</option>
              <option value="10-C">10-C</option>
              <option value="9-A">9-A</option>
            </select>
          </div>
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <Button type="submit" variant="primary" className="flex-1">
              Assign ({selectedRows.length})
            </Button>
            <Button type="button" variant="secondary" className="flex-1" onClick={() => setIsBulkAssignModalOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isAddModalOpen || isEditModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setIsEditModalOpen(false);
        }}
        title={isEditModalOpen ? 'Edit Student' : 'Add New Student'}
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              className="input"
              required
            />
          </div>
          <div>
            <label className="label">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              className="input"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Class *</label>
              <select
                name="class"
                value={formData.class}
                onChange={handleFormChange}
                className="input"
                required
              >
                <option value="10-A">10-A</option>
                <option value="10-B">10-B</option>
                <option value="10-C">10-C</option>
                <option value="9-A">9-A</option>
              </select>
            </div>
            <div>
              <label className="label">Roll Number *</label>
              <input
                type="text"
                name="rollNumber"
                value={formData.rollNumber}
                onChange={handleFormChange}
                className="input"
                required
              />
            </div>
          </div>
          <div>
            <label className="label">Phone Number *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleFormChange}
              className="input"
              required
            />
          </div>
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <Button
              type="submit"
              variant="primary"
              className="flex-1"
            >
              {isEditModalOpen ? 'Update Student' : 'Add Student'}
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="flex-1"
              onClick={() => {
                setIsAddModalOpen(false);
                setIsEditModalOpen(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* View Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Student Details"
        size="md"
      >
        {selectedStudent && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <img
                src={selectedStudent.avatar}
                alt={selectedStudent.name}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h3 className="text-lg font-bold text-gray-900">{selectedStudent.name}</h3>
                <p className="text-sm text-gray-600">{selectedStudent.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 uppercase">Roll Number</p>
                <p className="text-sm font-medium text-gray-900">{selectedStudent.rollNumber}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Class</p>
                <p className="text-sm font-medium text-gray-900">{selectedStudent.class}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Phone</p>
                <p className="text-sm font-medium text-gray-900">{selectedStudent.phone}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">GPA</p>
                <p className="text-sm font-medium text-gray-900">{selectedStudent.gpa.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Enrollment Date</p>
                <p className="text-sm font-medium text-gray-900">{selectedStudent.enrollmentDate}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Status</p>
                <Badge variant={selectedStudent.status === 'active' ? 'success' : 'danger'} size="sm">
                  {selectedStudent.status.charAt(0).toUpperCase() + selectedStudent.status.slice(1)}
                </Badge>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <Button variant="primary" className="flex-1" onClick={() => {
                handleEditStudent(selectedStudent);
                setIsViewModalOpen(false);
              }}>
                Edit Details
              </Button>
              <Button
                variant="secondary"
                className="flex-1"
                onClick={() => setIsViewModalOpen(false)}
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
