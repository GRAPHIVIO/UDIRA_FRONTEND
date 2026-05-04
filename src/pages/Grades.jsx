import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
  Download, Trophy, Medal, Award, TrendingUp, TrendingDown,
  Search, Filter, RefreshCw, Eye, BarChart2, X, FileText, GraduationCap, Users
} from 'lucide-react';
import { Badge, Button } from '../components/shared';
import { fetchRankedResults } from '../services/gradesService';
import { mockGrades, SUBJECTS } from '../utils/mockData';
import { generateResultsPDF, generateRankingsPDF, generateAllResultsPDF, getRemarks } from '../utils/reportUtils';
import ExamPortal from '../components/ExamPortal';
import { useAuth } from '../hooks/useAuth';

// ─── helpers ────────────────────────────────────────────────────────────────

function getGradeColor(grade) {
  return { A: 'text-emerald-600', B: 'text-blue-600', C: 'text-yellow-600', D: 'text-orange-500', F: 'text-red-600' }[grade] || 'text-gray-500';
}

function getMarkBg(mark) {
  if (mark == null) return 'bg-gray-50 text-gray-400';
  if (mark >= 80) return 'bg-emerald-50 text-emerald-700 font-semibold';
  if (mark >= 70) return 'bg-blue-50 text-blue-700 font-semibold';
  if (mark >= 60) return 'bg-yellow-50 text-yellow-700 font-semibold';
  if (mark >= 50) return 'bg-orange-50 text-orange-700 font-semibold';
  return 'bg-red-50 text-red-700 font-semibold';
}

function autoGrade(avg) {
  if (avg >= 80) return 'A';
  if (avg >= 70) return 'B';
  if (avg >= 60) return 'C';
  if (avg >= 50) return 'D';
  return 'F';
}

// Build ranked summaries from mock data (same shape as API response)
function buildRankingsFromMock(grades) {
  const map = {};
  for (const g of grades) {
    if (!map[g.studentId]) {
      map[g.studentId] = { student_id: g.studentId, student_name: g.studentName, subjects: {}, admission_number: `ADM-${String(g.studentId).padStart(3,'0')}`, class_name: '10-A' };
    }
    map[g.studentId].subjects[g.subject] = g.marks;
  }
  const list = Object.values(map).map(s => {
    const vals = Object.values(s.subjects);
    const total = vals.reduce((a, b) => a + b, 0);
    const avg = vals.length ? +(total / vals.length).toFixed(1) : 0;
    return { ...s, total_marks: total, total_possible: vals.length * 100, average_percentage: avg, overall_grade: autoGrade(avg), subjects_count: vals.length };
  });
  list.sort((a, b) => b.total_marks - a.total_marks);
  list.forEach((r, i) => { r.position = i + 1; });
  return list;
}

// ─── SubjectBar mini chart ───────────────────────────────────────────────────
function SubjectBarChart({ subjects }) {
  return (
    <div className="space-y-2 mt-4">
      {SUBJECTS.map(sub => {
        const mark = subjects[sub] ?? null;
        const pct = mark != null ? Math.round((mark / 100) * 100) : 0;
        return (
          <div key={sub} className="flex items-center gap-3">
            <span className="text-xs text-gray-500 w-32 shrink-0 truncate">{sub}</span>
            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${pct >= 80 ? 'bg-emerald-500' : pct >= 60 ? 'bg-blue-500' : pct >= 50 ? 'bg-yellow-500' : 'bg-red-400'}`}
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className={`text-xs w-8 text-right ${mark == null ? 'text-gray-400' : pct >= 80 ? 'text-emerald-600' : pct >= 50 ? 'text-blue-600' : 'text-red-500'}`}>
              {mark ?? '—'}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Detail Modal ─────────────────────────────────────────────────────────────
function DetailModal({ student, allRankings, onClose }) {
  if (!student) return null;
  const { subjects, total_marks, average_percentage, overall_grade, position, student_name, admission_number } = student;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-gray-100">
          <div>
            <p className="text-xs font-bold text-primary-500 uppercase tracking-widest mb-1">Academic Report</p>
            <h2 className="text-2xl font-bold text-gray-900">{student_name}</h2>
            <p className="text-sm text-gray-400 mt-0.5">Adm: {admission_number}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-xs text-gray-400 uppercase">Position</p>
              <p className="text-3xl font-extrabold text-primary-600">#{position}</p>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <X size={20} className="text-gray-500" />
            </button>
          </div>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-4 divide-x divide-gray-100 border-b border-gray-100">
          {[
            { label: 'Total Marks', value: total_marks, sub: `/ ${Object.keys(subjects).length * 100}` },
            { label: 'Average %', value: `${average_percentage}%`, sub: '' },
            { label: 'Overall Grade', value: overall_grade, sub: '', color: getGradeColor(overall_grade) },
            { label: 'Subjects', value: Object.keys(subjects).length, sub: '/ 11' },
          ].map(s => (
            <div key={s.label} className="p-4 text-center">
              <p className="text-xs text-gray-400 uppercase mb-1">{s.label}</p>
              <p className={`text-2xl font-extrabold ${s.color || 'text-gray-900'}`}>{s.value}<span className="text-sm font-normal text-gray-400">{s.sub}</span></p>
            </div>
          ))}
        </div>

        {/* Subject table */}
        <div className="p-6">
          <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">Subject Breakdown</h3>
          <div className="overflow-x-auto rounded-xl border border-gray-100">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Subject</th>
                  <th className="px-4 py-3 text-center text-xs font-bold text-gray-500 uppercase">Marks</th>
                  <th className="px-4 py-3 text-center text-xs font-bold text-gray-500 uppercase">Grade</th>
                  <th className="px-4 py-3 text-center text-xs font-bold text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {SUBJECTS.map(sub => {
                  const mark = subjects[sub];
                  const grade = mark != null ? autoGrade(mark) : '—';
                  const passed = mark != null && mark >= 50;
                  return (
                    <tr key={sub} className="hover:bg-gray-50/60 transition-colors">
                      <td className="px-4 py-3 font-medium text-gray-800">{sub}</td>
                      <td className={`px-4 py-3 text-center rounded-sm ${getMarkBg(mark)}`}>
                        {mark ?? <span className="text-gray-300 italic text-xs">N/A</span>}
                      </td>
                      <td className={`px-4 py-3 text-center font-bold ${getGradeColor(grade)}`}>{grade}</td>
                      <td className="px-4 py-3 text-center">
                        {mark == null ? (
                          <span className="text-xs text-gray-400 italic">Pending</span>
                        ) : passed ? (
                          <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-medium"><TrendingUp size={12} /> Pass</span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs text-red-500 font-medium"><TrendingDown size={12} /> Fail</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mini bar chart */}
          <div className="mt-6">
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-2"><BarChart2 size={14} /> Performance Chart</h3>
            <SubjectBarChart subjects={subjects} />
          </div>

          {/* Remarks */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">Official Remarks</h3>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Class Teacher</p>
                <p className="text-sm text-gray-800 italic">"{getRemarks(average_percentage).teacher}"</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Principal</p>
                <p className="text-sm text-gray-800 italic">"{getRemarks(average_percentage).principal}"</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 p-6 border-t border-gray-100">
          <Button variant="secondary" className="flex-1" onClick={onClose}>Close</Button>
          <Button className="flex-1" onClick={() => generateResultsPDF(student)}>
            <FileText size={16} className="mr-1" /> Download PDF
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Podium Card ──────────────────────────────────────────────────────────────
function PodiumCard({ student, rank }) {
  const configs = [
    { border: 'border-yellow-400', bg: 'from-yellow-50 to-amber-50', icon: <Trophy size={36} className="text-yellow-400" />, label: '🥇 1st Place', textColor: 'text-yellow-600' },
    { border: 'border-gray-300', bg: 'from-gray-50 to-slate-50', icon: <Medal size={36} className="text-gray-400" />, label: '🥈 2nd Place', textColor: 'text-gray-500' },
    { border: 'border-amber-600', bg: 'from-amber-50 to-orange-50', icon: <Award size={36} className="text-amber-600" />, label: '🥉 3rd Place', textColor: 'text-amber-700' },
  ];
  const c = configs[rank - 1];
  return (
    <div className={`card border-l-4 ${c.border} bg-gradient-to-br ${c.bg} ${rank === 1 ? 'ring-2 ring-yellow-200' : ''}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className={`text-xs font-bold uppercase tracking-widest ${c.textColor}`}>{c.label}</p>
          <h3 className="text-lg font-bold text-gray-900 mt-1">{student.student_name}</h3>
          <p className="text-xs text-gray-500 mt-0.5">{student.class_name}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-2xl font-extrabold text-primary-700">{student.total_marks}</span>
            <span className="text-xs text-gray-400">/ {student.total_possible} marks</span>
            <Badge variant={student.average_percentage >= 75 ? 'success' : 'warning'} size="sm">{student.average_percentage}%</Badge>
          </div>
        </div>
        <div className={`${rank === 1 ? 'animate-bounce' : ''}`}>{c.icon}</div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Grades() {
  const { user } = useAuth();
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTerm, setFilterTerm] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isExamPortalOpen, setIsExamPortalOpen] = useState(false);

  const canAddResults = user?.role === 'admin' || user?.role === 'teacher';

  const loadResults = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchRankedResults({ term: filterTerm, academic_year: filterYear });
      if (data && data.length > 0) {
        setRankings(data);
      } else {
        // Fallback to mock data
        setRankings(buildRankingsFromMock(mockGrades));
      }
    } catch {
      setRankings(buildRankingsFromMock(mockGrades));
    } finally {
      setLoading(false);
    }
  }, [filterTerm, filterYear]);

  useEffect(() => { loadResults(); }, [loadResults]);

  const filtered = useMemo(() =>
    rankings.filter(r => r.student_name.toLowerCase().includes(searchTerm.toLowerCase())),
    [rankings, searchTerm]
  );

  const stats = useMemo(() => {
    if (!rankings.length) return {};
    const avg = rankings.reduce((s, r) => s + r.average_percentage, 0) / rankings.length;
    const passing = rankings.filter(r => r.average_percentage >= 50).length;
    return {
      highest: rankings[0]?.total_marks ?? 0,
      classAvg: avg.toFixed(1),
      passRate: ((passing / rankings.length) * 100).toFixed(0),
    };
  }, [rankings]);

  const subjectChampions = useMemo(() => {
    if (!rankings.length) return [];
    return SUBJECTS.map(subject => {
      let topStudent = null;
      let topMark = -1;

      rankings.forEach(student => {
        const mark = student.subjects[subject];
        if (mark !== undefined && mark > topMark) {
          topMark = mark;
          topStudent = student;
        }
      });

      return {
        subject,
        studentName: topStudent ? topStudent.student_name : '—',
        mark: topMark !== -1 ? topMark : '—',
        avatar: topStudent ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(topStudent.student_name)}` : null
      };
    });
  }, [rankings]);

  const handleExport = () => {
    const header = ['Position', 'Student', 'Adm No', 'Class', ...SUBJECTS, 'Total', 'Average %', 'Grade'].join(',');
    const rows = rankings.map(r => [
      r.position, `"${r.student_name}"`, r.admission_number, r.class_name,
      ...SUBJECTS.map(s => r.subjects[s] ?? ''),
      r.total_marks, r.average_percentage, r.overall_grade
    ].join(','));
    const csv = 'data:text/csv;charset=utf-8,' + [header, ...rows].join('\n');
    const a = document.createElement('a');
    a.href = encodeURI(csv);
    a.download = `exam_results_${filterTerm || 'all'}_${filterYear || new Date().getFullYear()}.csv`;
    a.click();
  };

  return (
    <div className="px-4 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Examination Results</h1>
          <p className="text-gray-500 mt-1">11-subject analysis · Performance rankings in descending order</p>
        </div>
        <div className="flex gap-3 flex-wrap">
          {canAddResults && (
            <Button onClick={() => setIsExamPortalOpen(true)} id="open-portal-from-grades">
              <GraduationCap size={16} /> Add Results
            </Button>
          )}
          <Button variant="secondary" onClick={loadResults} id="refresh-results-btn">
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            Refresh
          </Button>
          <Button variant="secondary" onClick={handleExport} id="export-results-btn">
            <Download size={16} /> Export CSV
          </Button>
          <Button variant="secondary" onClick={() => generateAllResultsPDF(rankings, filterTerm, filterYear)} id="export-all-reports-btn">
            <FileText size={16} /> All Report Cards
          </Button>
          <Button onClick={() => generateRankingsPDF(rankings, filterTerm, filterYear)} id="export-pdf-btn">
            <FileText size={16} /> Class Rankings
          </Button>
        </div>
      </div>

      <ExamPortal 
        isOpen={isExamPortalOpen} 
        onClose={() => {
          setIsExamPortalOpen(false);
          loadResults(); // Refresh rankings after closing
        }} 
      />

      {/* Filter Bar */}
      <div className="card py-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <Filter size={16} className="text-primary-500 shrink-0" />
        <div className="flex flex-wrap gap-3 flex-1">
          <select id="filter-term" className="input h-9 py-1 w-36" value={filterTerm} onChange={e => setFilterTerm(e.target.value)}>
            <option value="">All Terms</option>
            <option value="Term 1">Term 1</option>
            <option value="Term 2">Term 2</option>
            <option value="Term 3">Term 3</option>
          </select>
          <select id="filter-year" className="input h-9 py-1 w-36" value={filterYear} onChange={e => setFilterYear(e.target.value)}>
            <option value="">All Years</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
          </select>
        </div>
        <div className="flex gap-4 text-sm">
          <span className="text-gray-400">Students: <strong className="text-gray-700">{rankings.length}</strong></span>
          <span className="text-gray-400">Pass Rate: <strong className="text-emerald-600">{stats.passRate}%</strong></span>
          <span className="text-gray-400">Class Avg: <strong className="text-primary-600">{stats.classAvg}%</strong></span>
        </div>
      </div>

      {/* Podium */}
      {rankings.length >= 3 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {rankings.slice(0, 3).map((s, i) => <PodiumCard key={s.student_id} student={s} rank={i + 1} />)}
        </div>
      )}

      {/* Subject Champions */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
          <Award size={16} className="text-primary-600" /> Subject Champions
        </h3>
        <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
          {subjectChampions.map((champ, idx) => (
            <div key={idx} className="flex-shrink-0 w-48 p-3 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow border-t-4 border-t-primary-500">
              <p className="text-[10px] font-bold text-gray-400 uppercase truncate mb-2">{champ.subject}</p>
              <div className="flex items-center gap-2">
                {champ.avatar ? (
                  <img src={champ.avatar} alt={champ.studentName} className="w-8 h-8 rounded-full border border-gray-100" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-300">
                    <Users size={14} />
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-xs font-bold text-gray-900 truncate">{champ.studentName}</p>
                  <p className="text-sm font-extrabold text-primary-600">{champ.mark}<span className="text-[10px] font-normal text-gray-400"> / 100</span></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rankings Table */}
      <div className="card">
        <div className="flex items-center gap-4 mb-5 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              id="search-students"
              type="text"
              placeholder="Search student..."
              className="input pl-9 h-10"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <p className="text-sm text-gray-500">Showing <strong>{filtered.length}</strong> of {rankings.length} students</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16 text-gray-400 gap-3">
            <RefreshCw size={20} className="animate-spin" /> Loading results...
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-100">
            <table className="w-full text-sm" id="results-table">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-3 py-3 text-left text-xs font-bold text-gray-500 uppercase sticky left-0 bg-gray-50 z-10 whitespace-nowrap">Rank</th>
                  <th className="px-3 py-3 text-left text-xs font-bold text-gray-500 uppercase sticky left-12 bg-gray-50 z-10 whitespace-nowrap min-w-[160px]">Student</th>
                  {SUBJECTS.map(s => (
                    <th key={s} className="px-2 py-3 text-center text-xs font-bold text-gray-500 uppercase whitespace-nowrap min-w-[90px]">{s.length > 8 ? s.slice(0, 7) + '…' : s}</th>
                  ))}
                  <th className="px-3 py-3 text-center text-xs font-bold text-gray-500 uppercase whitespace-nowrap">Total</th>
                  <th className="px-3 py-3 text-center text-xs font-bold text-gray-500 uppercase whitespace-nowrap">Avg %</th>
                  <th className="px-3 py-3 text-center text-xs font-bold text-gray-500 uppercase whitespace-nowrap">Grade</th>
                  <th className="px-3 py-3 text-center text-xs font-bold text-gray-500 uppercase whitespace-nowrap">Report</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((row) => (
                  <tr key={row.student_id} className="hover:bg-primary-50/30 transition-colors">
                    {/* Rank */}
                    <td className="px-3 py-3 sticky left-0 bg-white z-10">
                      {row.position === 1 ? <span className="flex items-center gap-1 text-yellow-500 font-bold"><Trophy size={14} />1</span>
                        : row.position === 2 ? <span className="flex items-center gap-1 text-gray-400 font-bold"><Medal size={14} />2</span>
                        : row.position === 3 ? <span className="flex items-center gap-1 text-amber-600 font-bold"><Award size={14} />3</span>
                        : <span className="font-semibold text-gray-600 pl-1">#{row.position}</span>}
                    </td>
                    {/* Name */}
                    <td className="px-3 py-3 sticky left-12 bg-white z-10">
                      <p className="font-semibold text-gray-900 whitespace-nowrap">{row.student_name}</p>
                      <p className="text-xs text-gray-400">{row.class_name}</p>
                    </td>
                    {/* Subject marks */}
                    {SUBJECTS.map(sub => {
                      const m = row.subjects[sub];
                      return (
                        <td key={sub} className="px-2 py-2 text-center">
                          <span className={`inline-block w-full text-center py-1 px-1 rounded text-xs ${getMarkBg(m)}`}>
                            {m ?? <span className="text-gray-300">—</span>}
                          </span>
                        </td>
                      );
                    })}
                    {/* Total */}
                    <td className="px-3 py-3 text-center font-extrabold text-primary-700 whitespace-nowrap">
                      {row.total_marks} <span className="text-xs font-normal text-gray-400">/ {row.total_possible}</span>
                    </td>
                    {/* Avg */}
                    <td className="px-3 py-3 text-center">
                      <Badge variant={row.average_percentage >= 75 ? 'success' : row.average_percentage >= 50 ? 'warning' : 'danger'} size="sm">
                        {row.average_percentage}%
                      </Badge>
                    </td>
                    {/* Grade */}
                    <td className={`px-3 py-3 text-center font-extrabold text-lg ${getGradeColor(row.overall_grade)}`}>
                      {row.overall_grade}
                    </td>
                    {/* Action */}
                    <td className="px-3 py-3 text-center">
                      <button
                        id={`view-report-${row.student_id}`}
                        onClick={() => setSelectedStudent(row)}
                        className="inline-flex items-center gap-1 text-xs text-primary-600 hover:text-primary-800 font-semibold py-1.5 px-3 rounded-lg border border-primary-200 hover:bg-primary-50 transition-all"
                      >
                        <Eye size={13} /> View
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={SUBJECTS.length + 6} className="text-center py-12 text-gray-400 italic">No results found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedStudent && (
        <DetailModal
          student={selectedStudent}
          allRankings={rankings}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </div>
  );
}
