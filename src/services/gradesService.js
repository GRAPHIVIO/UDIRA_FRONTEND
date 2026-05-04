const BASE_URL = 'http://127.0.0.1:8000/api';

/**
 * Fetch students ranked by total marks (descending).
 * Endpoint: GET /api/results/
 * @param {object} filters - { term, academic_year, exam_type }
 */
export async function fetchRankedResults(filters = {}) {
  const params = new URLSearchParams();
  if (filters.term) params.set('term', filters.term);
  if (filters.academic_year) params.set('academic_year', filters.academic_year);
  if (filters.exam_type) params.set('exam_type', filters.exam_type);

  const qs = params.toString();
  const url = `${BASE_URL}/results/${qs ? '?' + qs : ''}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch results');
  return response.json();
}

/**
 * Bulk upload marks for a subject.
 * Endpoint: POST /api/grades/bulk/
 * @param {Array} entries - [{ student_id, subject, marks, term, academic_year, exam_type, teacher_name }]
 */
export async function bulkUploadMarks(entries) {
  const response = await fetch(`${BASE_URL}/grades/bulk/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entries),
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(JSON.stringify(err));
  }
  return response.json();
}

/**
 * Fetch individual grade records with optional filters.
 * Endpoint: GET /api/grades/
 */
export async function fetchGrades(filters = {}) {
  const params = new URLSearchParams(filters);
  const response = await fetch(`${BASE_URL}/grades/?${params.toString()}`);
  if (!response.ok) throw new Error('Failed to fetch grades');
  return response.json();
}

/**
 * Fetch all students from the backend.
 * Endpoint: GET /api/students/
 */
export async function fetchStudents(filters = {}) {
  const params = new URLSearchParams(filters);
  const response = await fetch(`${BASE_URL}/students/?${params.toString()}`);
  if (!response.ok) throw new Error('Failed to fetch students');
  return response.json();
}

/**
 * Fetch all classes from the backend.
 */
export async function fetchClasses() {
  const response = await fetch(`http://127.0.0.1:8000/api/classes/classes/`);
  if (!response.ok) throw new Error('Failed to fetch classes');
  return response.json();
}
