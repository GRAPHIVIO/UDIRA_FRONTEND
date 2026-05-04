import React, { useState, useEffect } from 'react';
import {
  GraduationCap, Save, CheckCircle2, AlertCircle, Loader2, X, BookOpen, Users, MapPin
} from 'lucide-react';
import { Badge, Button } from './shared';
import Modal from './Modal';
import { bulkUploadMarks, fetchStudents, fetchClasses } from '../services/gradesService';
import { mockStudents, SUBJECTS, teacherClassesData } from '../utils/mockData';
import { useAuth } from '../hooks/useAuth';

const TERMS = ['Term 1', 'Term 2', 'Term 3'];
const YEARS = ['2024', '2025', '2026'];
const EXAM_TYPES = [
  { value: 'end_term', label: 'End Term' },
  { value: 'mid_term', label: 'Mid Term' },
  { value: 'opener', label: 'Opener' },
];

export default function ExamPortal({ isOpen, onClose, initialClass = '' }) {
  const { user } = useAuth();
  const [selectedClass, setSelectedClass] = useState(initialClass || '10-A');
  const [selectedSubject, setSelectedSubject] = useState(SUBJECTS[0]);
  const [selectedTerm, setSelectedTerm] = useState('Term 1');
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedExamType, setSelectedExamType] = useState('end_term');

  const [studentList, setStudentList] = useState([]);
  const [availableClasses, setAvailableClasses] = useState([]);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [saveMessage, setSaveMessage] = useState('');

  // Update selected class when initialClass changes
  useEffect(() => {
    if (initialClass) setSelectedClass(initialClass);
  }, [initialClass]);

  // Load classes
  useEffect(() => {
    fetchClasses()
      .then(data => {
        const list = (data.results || data);
        if (list.length > 0) setAvailableClasses(list);
      })
      .catch(() => setAvailableClasses(teacherClassesData));
  }, []);

  // Fetch students
  useEffect(() => {
    if (isOpen) {
      fetchStudents({ class_name: selectedClass })
        .then(data => {
          const list = (data.results || data).map(s => ({
            id: s.id,
            name: `${s.first_name} ${s.last_name}`,
            marks: '',
          }));
          setStudentList(list);
        })
        .catch(() => {
          setStudentList(mockStudents.map(s => ({ id: s.id, name: s.name, marks: '' })));
        });
    }
  }, [selectedClass, isOpen]);

  const handleMarksChange = (id, value) => {
    setStudentList(prev =>
      prev.map(m => m.id === id ? { ...m, marks: value } : m)
    );
  };

  const handleSaveMarks = async () => {
    setSaving(true);
    setSaveStatus(null);
    const entries = studentList
      .filter(s => s.marks !== '' && s.marks !== null)
      .map(s => ({
        student_id: s.id,
        subject: selectedSubject,
        marks: parseFloat(s.marks),
        total_marks: 100,
        term: selectedTerm,
        academic_year: selectedYear,
        exam_type: selectedExamType,
        teacher_name: user?.name || '',
      }));

    if (entries.length === 0) {
      setSaveStatus('error');
      setSaveMessage('Please enter at least one student mark.');
      setSaving(false);
      return;
    }

    try {
      const result = await bulkUploadMarks(entries);
      setSaveStatus('success');
      setSaveMessage(result.message || `${entries.length} mark(s) saved!`);
      setStudentList(prev => prev.map(s => ({ ...s, marks: '' })));
    } catch (err) {
      setSaveStatus('error');
      setSaveMessage('Failed to save marks.');
    } finally {
      setSaving(false);
    }
  };

  const filledCount = studentList.filter(s => s.marks !== '').length;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Enter Examination Marks" size="lg">
      <div className="space-y-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
          <div>
            <label className="label text-xs">Subject</label>
            <select className="input h-10 py-1" value={selectedSubject} onChange={e => setSelectedSubject(e.target.value)}>
              {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="label text-xs">Class</label>
            <select className="input h-10 py-1" value={selectedClass} onChange={e => setSelectedClass(e.target.value)}>
              {availableClasses.map(c => <option key={c.id || c.name} value={c.name}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="label text-xs">Term</label>
            <select className="input h-10 py-1" value={selectedTerm} onChange={e => setSelectedTerm(e.target.value)}>
              {TERMS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="label text-xs">Academic Year</label>
            <select className="input h-10 py-1" value={selectedYear} onChange={e => setSelectedYear(e.target.value)}>
              {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          {EXAM_TYPES.map(et => (
            <button
              key={et.value}
              onClick={() => setSelectedExamType(et.value)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${selectedExamType === et.value ? 'bg-primary-600 text-white border-primary-600' : 'border-gray-200 text-gray-600 hover:border-primary-300'}`}
            >
              {et.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 text-xs text-gray-500 bg-blue-50 px-4 py-2.5 rounded-lg">
          <span>📘 <strong>{selectedSubject}</strong></span>
          <span>🏫 Class <strong>{selectedClass}</strong></span>
          <span className="ml-auto text-blue-600 font-medium">{filledCount}/{studentList.length} marks entered</span>
        </div>

        <div className="max-h-[360px] overflow-y-auto rounded-xl border border-gray-200">
          <table className="w-full">
            <thead className="sticky top-0 bg-white z-10 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">#</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Student Name</th>
                <th className="px-4 py-3 text-center text-xs font-bold text-gray-500 uppercase w-28">Marks / 100</th>
                <th className="px-4 py-3 text-center text-xs font-bold text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {studentList.map((student, idx) => (
                <tr key={student.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="px-4 py-3 text-sm text-gray-400">{idx + 1}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900">{student.name}</td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      max="100" min="0"
                      className="input h-10 text-center font-bold text-primary-700 w-full"
                      value={student.marks}
                      onChange={e => handleMarksChange(student.id, e.target.value)}
                    />
                  </td>
                  <td className="px-4 py-3 text-center">
                    {student.marks !== '' ? (
                      parseFloat(student.marks) >= 50 ? (
                        <Badge variant="success" size="xs">Pass</Badge>
                      ) : (
                        <Badge variant="danger" size="xs">Fail</Badge>
                      )
                    ) : <span className="text-xs text-gray-300 italic">—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {saveStatus && (
          <div className={`flex items-center gap-3 p-3 rounded-lg text-sm font-medium ${saveStatus === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>
            {saveStatus === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            {saveMessage}
          </div>
        )}

        <div className="flex gap-3 pt-2 border-t border-gray-100">
          <Button variant="secondary" className="flex-1" onClick={onClose}><X size={16} className="mr-1" /> Close</Button>
          <Button className="flex-1" onClick={handleSaveMarks} disabled={saving}>
            {saving ? <><Loader2 size={16} className="mr-2 animate-spin" /> Saving…</> : <><Save size={16} className="mr-2" /> Upload to Database</>}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
