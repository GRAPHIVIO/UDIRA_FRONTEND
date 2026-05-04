// Mock data for the application
export const MOCK_USERS = [
  {
    email: "admin@udira.edu",
    password: "admin123",
    role: "admin",
    data: {
      id: 0,
      name: "MR. MARTIN OTIENO",
      email: "admin@udira.edu",
      role: "admin",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      phone: "0713294911",
      joinDate: "2009-01-15",
    }
  },
  {
    email: "teacher@udira.edu",
    password: "teacher123",
    role: "teacher",
    data: {
      id: 1,
      name: "MR. ERICK OPONDO",
      email: "teacher@udira.edu",
      role: "teacher",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      phone: "0717294521",
      joinDate: "2017-08-01",
    }
  }
];

export const mockUser = MOCK_USERS[1].data; // Default for other parts if needed


export const teacherDashboardStats = {
  myStudents: 125,
  myClasses: 4,
  avgAttendance: 94.2,
  pendingGrades: 18,
};

export const teacherScheduleData = [
  { time: "09:00 AM", subject: "Mathematics", class: "10-A", room: "101", type: "Lecture" },
  { time: "11:00 AM", subject: "Advanced Algebra", class: "12-B", room: "305", type: "Lab" },
  { time: "01:30 PM", subject: "Mathematics", class: "10-C", room: "103", type: "Lecture" },
  { time: "03:00 PM", subject: "Staff Meeting", class: "Conference Room", room: "Main Hall", type: "Meeting" },
];

export const teacherClassesData = [
  { id: 1, name: "10-A", students: 35, subject: "Mathematics", performance: 88 },
  { id: 2, name: "12-B", students: 28, subject: "Advanced Algebra", performance: 92 },
  { id: 3, name: "10-C", students: 32, subject: "Mathematics", performance: 85 },
  { id: 4, name: "11-A", students: 30, subject: "Trigonometry", performance: 89 },
];

export const recentSubmissions = [
  { id: 1, student: "Alice Chen", assignment: "Midterm Algebra Quiz", status: "graded", date: "Today" },
  { id: 2, student: "Bob Martinez", assignment: "Calculus Homework", status: "pending", date: "2 hours ago" },
  { id: 3, student: "Carol Williams", assignment: "Calculus Homework", status: "pending", date: "4 hours ago" },
  { id: 4, student: "David Lee", assignment: "Trigonometry Project", status: "graded", date: "Yesterday" },
];


export const mockStudents = [
  {
    id: 1,
    name: "Alice Chen",
    email: "alice.chen@school.edu",
    class: "10-A",
    rollNumber: "001",
    phone: "+1 (555) 001-1111",
    enrollmentDate: "2023-06-15",
    status: "active",
    gpa: 3.9,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
  },
  {
    id: 2,
    name: "Bob Martinez",
    email: "bob.martinez@school.edu",
    class: "10-A",
    rollNumber: "002",
    phone: "+1 (555) 001-2222",
    enrollmentDate: "2023-06-15",
    status: "active",
    gpa: 3.7,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
  },
  {
    id: 3,
    name: "Carol Williams",
    email: "carol.williams@school.edu",
    class: "10-B",
    rollNumber: "003",
    phone: "+1 (555) 001-3333",
    enrollmentDate: "2023-06-15",
    status: "active",
    gpa: 3.8,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carol",
  },
  {
    id: 4,
    name: "David Lee",
    email: "david.lee@school.edu",
    class: "10-B",
    rollNumber: "004",
    phone: "+1 (555) 001-4444",
    enrollmentDate: "2023-06-15",
    status: "active",
    gpa: 3.6,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
  },
  {
    id: 5,
    name: "Emma Taylor",
    email: "emma.taylor@school.edu",
    class: "10-C",
    rollNumber: "005",
    phone: "+1 (555) 001-5555",
    enrollmentDate: "2023-06-15",
    status: "active",
    gpa: 3.95,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
  },
];

export const mockTeachers = [
  {
    id: 1,
    name: "Prof. Sarah Anderson",
    email: "sarah.anderson@school.edu",
    subject: "Mathematics",
    phone: "+1 (555) 201-1111",
    joinDate: "2019-08-01",
    qualification: "M.Sc. Mathematics",
    experience: "8 years",
    status: "active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    id: 2,
    name: "Prof. James Wilson",
    email: "james.wilson@school.edu",
    subject: "English",
    phone: "+1 (555) 201-2222",
    joinDate: "2020-06-15",
    qualification: "M.A. English Literature",
    experience: "6 years",
    status: "active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
  },
  {
    id: 3,
    name: "Prof. Priya Kumar",
    email: "priya.kumar@school.edu",
    subject: "Science",
    phone: "+1 (555) 201-3333",
    joinDate: "2021-01-10",
    qualification: "M.Sc. Physics",
    experience: "5 years",
    status: "active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
  },
  {
    id: 4,
    name: "Prof. Robert Brown",
    email: "robert.brown@school.edu",
    subject: "History",
    phone: "+1 (555) 201-4444",
    joinDate: "2018-09-01",
    qualification: "M.A. History",
    experience: "10 years",
    status: "active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
  },
];

export const mockClasses = [
  {
    id: 1,
    name: "10-A",
    section: "A",
    grade: "10",
    classTeacher: "Prof. Sarah Anderson",
    totalStudents: 35,
    room: "101",
    timings: "09:00 AM - 03:30 PM",
  },
  {
    id: 2,
    name: "10-B",
    section: "B",
    grade: "10",
    classTeacher: "Prof. James Wilson",
    totalStudents: 32,
    room: "102",
    timings: "09:00 AM - 03:30 PM",
  },
  {
    id: 3,
    name: "10-C",
    section: "C",
    grade: "10",
    classTeacher: "Prof. Priya Kumar",
    totalStudents: 30,
    room: "103",
    timings: "09:00 AM - 03:30 PM",
  },
  {
    id: 4,
    name: "9-A",
    section: "A",
    grade: "9",
    classTeacher: "Prof. Robert Brown",
    totalStudents: 38,
    room: "201",
    timings: "09:00 AM - 03:30 PM",
  },
];

export const mockAttendance = [
  {
    id: 1,
    studentName: "Alice Chen",
    studentId: 1,
    date: "2024-01-15",
    status: "present",
    rollNumber: "001",
  },
  {
    id: 2,
    studentName: "Bob Martinez",
    studentId: 2,
    date: "2024-01-15",
    status: "present",
    rollNumber: "002",
  },
  {
    id: 3,
    studentName: "Carol Williams",
    studentId: 3,
    date: "2024-01-15",
    status: "absent",
    rollNumber: "003",
  },
  {
    id: 4,
    studentName: "David Lee",
    studentId: 4,
    date: "2024-01-15",
    status: "leave",
    rollNumber: "004",
  },
  {
    id: 5,
    studentName: "Emma Taylor",
    studentId: 5,
    date: "2024-01-15",
    status: "present",
    rollNumber: "005",
  },
];

export const SUBJECTS = [
  "Mathematics",
  "English",
  "Kiswahili",
  "Chemistry",
  "Physics",
  "Biology",
  "History",
  "Geography",
  "CRE",
  "Computer Studies",
  "Business Studies"
];

export const mockGrades = [
  // Alice Chen
  { id: 1, studentName: "Alice Chen", studentId: 1, subject: "Mathematics", marks: 95, totalMarks: 100, grade: "A", percentage: 95 },
  { id: 2, studentName: "Alice Chen", studentId: 1, subject: "English", marks: 88, totalMarks: 100, grade: "A", percentage: 88 },
  { id: 3, studentName: "Alice Chen", studentId: 1, subject: "Kiswahili", marks: 85, totalMarks: 100, grade: "A", percentage: 85 },
  { id: 4, studentName: "Alice Chen", studentId: 1, subject: "Chemistry", marks: 92, totalMarks: 100, grade: "A", percentage: 92 },
  { id: 5, studentName: "Alice Chen", studentId: 1, subject: "Physics", marks: 90, totalMarks: 100, grade: "A", percentage: 90 },
  { id: 6, studentName: "Alice Chen", studentId: 1, subject: "Biology", marks: 94, totalMarks: 100, grade: "A", percentage: 94 },
  { id: 7, studentName: "Alice Chen", studentId: 1, subject: "History", marks: 89, totalMarks: 100, grade: "A", percentage: 89 },
  { id: 8, studentName: "Alice Chen", studentId: 1, subject: "Geography", marks: 87, totalMarks: 100, grade: "A", percentage: 87 },
  { id: 9, studentName: "Alice Chen", studentId: 1, subject: "CRE", marks: 96, totalMarks: 100, grade: "A", percentage: 96 },
  { id: 10, studentName: "Alice Chen", studentId: 1, subject: "Computer Studies", marks: 98, totalMarks: 100, grade: "A", percentage: 98 },
  { id: 11, studentName: "Alice Chen", studentId: 1, subject: "Business Studies", marks: 91, totalMarks: 100, grade: "A", percentage: 91 },

  // Bob Martinez
  { id: 12, studentName: "Bob Martinez", studentId: 2, subject: "Mathematics", marks: 75, totalMarks: 100, grade: "B", percentage: 75 },
  { id: 13, studentName: "Bob Martinez", studentId: 2, subject: "English", marks: 72, totalMarks: 100, grade: "B", percentage: 72 },
  { id: 14, studentName: "Bob Martinez", studentId: 2, subject: "Kiswahili", marks: 70, totalMarks: 100, grade: "B", percentage: 70 },
  { id: 15, studentName: "Bob Martinez", studentId: 2, subject: "Chemistry", marks: 68, totalMarks: 100, grade: "C", percentage: 68 },
  { id: 16, studentName: "Bob Martinez", studentId: 2, subject: "Physics", marks: 65, totalMarks: 100, grade: "C", percentage: 65 },
  { id: 17, studentName: "Bob Martinez", studentId: 2, subject: "Biology", marks: 74, totalMarks: 100, grade: "B", percentage: 74 },
  { id: 18, studentName: "Bob Martinez", studentId: 2, subject: "History", marks: 80, totalMarks: 100, grade: "B", percentage: 80 },
  { id: 19, studentName: "Bob Martinez", studentId: 2, subject: "Geography", marks: 78, totalMarks: 100, grade: "B", percentage: 78 },
  { id: 20, studentName: "Bob Martinez", studentId: 2, subject: "CRE", marks: 85, totalMarks: 100, grade: "A", percentage: 85 },
  { id: 21, studentName: "Bob Martinez", studentId: 2, subject: "Computer Studies", marks: 82, totalMarks: 100, grade: "B", percentage: 82 },
  { id: 22, studentName: "Bob Martinez", studentId: 2, subject: "Business Studies", marks: 77, totalMarks: 100, grade: "B", percentage: 77 },

  // Carol Williams
  { id: 23, studentName: "Carol Williams", studentId: 3, subject: "Mathematics", marks: 88, totalMarks: 100, grade: "A", percentage: 88 },
  { id: 24, studentName: "Carol Williams", studentId: 3, subject: "English", marks: 92, totalMarks: 100, grade: "A", percentage: 92 },
  { id: 25, studentName: "Carol Williams", studentId: 3, subject: "Kiswahili", marks: 90, totalMarks: 100, grade: "A", percentage: 90 },
  { id: 26, studentName: "Carol Williams", studentId: 3, subject: "Chemistry", marks: 85, totalMarks: 100, grade: "A", percentage: 85 },
  { id: 27, studentName: "Carol Williams", studentId: 3, subject: "Physics", marks: 82, totalMarks: 100, grade: "A", percentage: 82 },
  { id: 28, studentName: "Carol Williams", studentId: 3, subject: "Biology", marks: 89, totalMarks: 100, grade: "A", percentage: 89 },
  { id: 29, studentName: "Carol Williams", studentId: 3, subject: "History", marks: 95, totalMarks: 100, grade: "A", percentage: 95 },
  { id: 30, studentName: "Carol Williams", studentId: 3, subject: "Geography", marks: 93, totalMarks: 100, grade: "A", percentage: 93 },
  { id: 31, studentName: "Carol Williams", studentId: 3, subject: "CRE", marks: 97, totalMarks: 100, grade: "A", percentage: 97 },
  { id: 32, studentName: "Carol Williams", studentId: 3, subject: "Computer Studies", marks: 94, totalMarks: 100, grade: "A", percentage: 94 },
  { id: 33, studentName: "Carol Williams", studentId: 3, subject: "Business Studies", marks: 91, totalMarks: 100, grade: "A", percentage: 91 },

  // David Lee
  { id: 34, studentName: "David Lee", studentId: 4, subject: "Mathematics", marks: 65, totalMarks: 100, grade: "C", percentage: 65 },
  { id: 35, studentName: "David Lee", studentId: 4, subject: "English", marks: 70, totalMarks: 100, grade: "B", percentage: 70 },
  { id: 36, studentName: "David Lee", studentId: 4, subject: "Kiswahili", marks: 68, totalMarks: 100, grade: "C", percentage: 68 },
  { id: 37, studentName: "David Lee", studentId: 4, subject: "Chemistry", marks: 62, totalMarks: 100, grade: "C", percentage: 62 },
  { id: 38, studentName: "David Lee", studentId: 4, subject: "Physics", marks: 60, totalMarks: 100, grade: "C", percentage: 60 },
  { id: 39, studentName: "David Lee", studentId: 4, subject: "Biology", marks: 72, totalMarks: 100, grade: "B", percentage: 72 },
  { id: 40, studentName: "David Lee", studentId: 4, subject: "History", marks: 75, totalMarks: 100, grade: "B", percentage: 75 },
  { id: 41, studentName: "David Lee", studentId: 4, subject: "Geography", marks: 73, totalMarks: 100, grade: "B", percentage: 73 },
  { id: 42, studentName: "David Lee", studentId: 4, subject: "CRE", marks: 80, totalMarks: 100, grade: "B", percentage: 80 },
  { id: 43, studentName: "David Lee", studentId: 4, subject: "Computer Studies", marks: 78, totalMarks: 100, grade: "B", percentage: 78 },
  { id: 44, studentName: "David Lee", studentId: 4, subject: "Business Studies", marks: 71, totalMarks: 100, grade: "B", percentage: 71 },

  // Emma Taylor
  { id: 45, studentName: "Emma Taylor", studentId: 5, subject: "Mathematics", marks: 98, totalMarks: 100, grade: "A", percentage: 98 },
  { id: 46, studentName: "Emma Taylor", studentId: 5, subject: "English", marks: 96, totalMarks: 100, grade: "A", percentage: 96 },
  { id: 47, studentName: "Emma Taylor", studentId: 5, subject: "Kiswahili", marks: 95, totalMarks: 100, grade: "A", percentage: 95 },
  { id: 48, studentName: "Emma Taylor", studentId: 5, subject: "Chemistry", marks: 97, totalMarks: 100, grade: "A", percentage: 97 },
  { id: 49, studentName: "Emma Taylor", studentId: 5, subject: "Physics", marks: 99, totalMarks: 100, grade: "A", percentage: 99 },
  { id: 50, studentName: "Emma Taylor", studentId: 5, subject: "Biology", marks: 98, totalMarks: 100, grade: "A", percentage: 98 },
  { id: 51, studentName: "Emma Taylor", studentId: 5, subject: "History", marks: 94, totalMarks: 100, grade: "A", percentage: 94 },
  { id: 52, studentName: "Emma Taylor", studentId: 5, subject: "Geography", marks: 96, totalMarks: 100, grade: "A", percentage: 96 },
  { id: 53, studentName: "Emma Taylor", studentId: 5, subject: "CRE", marks: 100, totalMarks: 100, grade: "A", percentage: 100 },
  { id: 54, studentName: "Emma Taylor", studentId: 5, subject: "Computer Studies", marks: 99, totalMarks: 100, grade: "A", percentage: 99 },
  { id: 55, studentName: "Emma Taylor", studentId: 5, subject: "Business Studies", marks: 97, totalMarks: 100, grade: "A", percentage: 97 },
];

export const mockPayments = [
  {
    id: 1,
    studentName: "Alice Chen",
    studentId: 1,
    type: "Tuition Fee",
    amount: 5000,
    status: "paid",
    date: "2024-01-10",
    receipt: "REC-001",
  },
  {
    id: 2,
    studentName: "Bob Martinez",
    studentId: 2,
    type: "Tuition Fee",
    amount: 5000,
    status: "paid",
    date: "2024-01-10",
    receipt: "REC-002",
  },
  {
    id: 3,
    studentName: "Carol Williams",
    studentId: 3,
    type: "Sports Fee",
    amount: 1500,
    status: "pending",
    date: "2024-01-15",
    receipt: null,
  },
  {
    id: 4,
    studentName: "David Lee",
    studentId: 4,
    type: "Tuition Fee",
    amount: 5000,
    status: "paid",
    date: "2024-01-08",
    receipt: "REC-004",
  },
  {
    id: 5,
    studentName: "Emma Taylor",
    studentId: 5,
    type: "Tuition Fee",
    amount: 5000,
    status: "paid",
    date: "2024-01-09",
    receipt: "REC-005",
  },
];

// Dashboard statistics
export const mockDashboardStats = {
  totalStudents: 347,
  totalTeachers: 42,
  totalClasses: 15,
  totalStaff: 52,
  attendanceToday: 92.5,
  feesPending: 45000,
};

// Chart data
export const studentPerformanceData = [
  { name: "Alice Chen", math: 95, english: 88, science: 92, average: 91.67 },
  { name: "Bob Martinez", math: 82, english: 75, science: 88, average: 81.67 },
  { name: "Carol Williams", math: 88, english: 92, science: 85, average: 88.33 },
  { name: "David Lee", math: 76, english: 80, science: 78, average: 78 },
  { name: "Emma Taylor", math: 98, english: 95, science: 96, average: 96.33 },
];

export const attendanceTrendData = [
  { date: "Mon", present: 320, absent: 27 },
  { date: "Tue", present: 315, absent: 32 },
  { date: "Wed", present: 328, absent: 19 },
  { date: "Thu", present: 312, absent: 35 },
  { date: "Fri", present: 335, absent: 12 },
];

export const classDistributionData = [
  { name: "Grade 9", value: 100 },
  { name: "Grade 10", value: 97 },
  { name: "Grade 11", value: 80 },
  { name: "Grade 12", value: 70 },
];

export const mockBOMMembers = [
  {
    id: 1,
    name: "DR. SAMUEL OKELLO",
    role: "Chairman",
    description: "Former Director of Education with over 30 years of experience in academic governance.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Samuel",
    phone: "0722000111",
    email: "chairman@udira.edu",
    since: "2015"
  },
  {
    id: 2,
    name: "MRS. JANE MUSA",
    role: "Secretary",
    description: "Lead consultant in organizational management and community development.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    phone: "0722000222",
    email: "secretary@udira.edu",
    since: "2018"
  },
  {
    id: 3,
    name: "MR. ISAAC WAMUA",
    role: "Treasurer",
    description: "Certified Public Accountant (CPA-K) ensuring financial transparency and sustainability.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Isaac",
    phone: "0722000333",
    email: "treasurer@udira.edu",
    since: "2016"
  },
  {
    id: 4,
    name: "REV. SISTER MARY",
    role: "Religious Representative",
    description: "Advocate for value-based education and character formation in schools.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mary",
    phone: "0722000444",
    email: "mary@udira.edu",
    since: "2020"
  },
  {
    id: 5,
    name: "ENG. PETER MAINA",
    role: "Infrastructure Lead",
    description: "Supervising school expansion projects and maintenance of modern facilities.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Peter",
    phone: "0722000555",
    email: "peter@udira.edu",
    since: "2019"
  }
];
