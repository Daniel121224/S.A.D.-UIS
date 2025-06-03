import type { Teacher, Subject, Semester, Evaluation } from "@/types"

export const teachers: Teacher[] = [
  { id: "t1", name: "Dr. Ana Pérez", area: "Ingeniería de Software" },
  { id: "t2", name: "Ing. Carlos López", area: "Ingeniería de Software" },
  { id: "t3", name: "MSc. Laura Gómez", area: "Ciencias Básicas" },
  { id: "t4", name: "Dr. Juan Rodríguez", area: "Redes y Telecomunicaciones" },
  { id: "t5", name: "Ing. Sofía Méndez", area: "Ciencias Básicas" },
]

export const subjects: Subject[] = [
  { id: "s1", name: "Programación Orientada a Objetos", code: "CS101", area: "Ingeniería de Software" },
  { id: "s2", name: "Bases de Datos", code: "CS102", area: "Ingeniería de Software" },
  { id: "s3", name: "Cálculo Diferencial", code: "MA101", area: "Ciencias Básicas" },
  { id: "s4", name: "Redes de Computadoras", code: "TC101", area: "Redes y Telecomunicaciones" },
  { id: "s5", name: "Física Mecánica", code: "PH101", area: "Ciencias Básicas" },
]

export const semesters: Semester[] = [
  { id: "sem1", name: "2024-1" },
  { id: "sem2", name: "2024-2" },
  { id: "sem3", name: "2025-1" },
]

export const evaluations: Evaluation[] = [
  {
    id: "eval1",
    teacherId: "t1",
    teacherName: "Dr. Ana Pérez",
    teacherArea: "Ingeniería de Software",
    evaluationPeriod: "2024-2",
    formCreationDate: "15/12/2024",
    totalStudentResponses: 45,
    overallScore: 92.5,
    evaluatedSubjects: [
      { code: "CS101", name: "Programación Orientada a Objetos", numEvaluations: 25, evaluationValue: 95 },
      { code: "CS102", name: "Bases de Datos", numEvaluations: 20, evaluationValue: 90 },
    ],
    analysisResults: "Excelente desempeño en claridad y material de apoyo.",
    improvementActions: "Fomentar más participación en discusiones de clase.",
  },
  {
    id: "eval2",
    teacherId: "t2",
    teacherName: "Ing. Carlos López",
    teacherArea: "Ingeniería de Software",
    evaluationPeriod: "2024-2",
    formCreationDate: "16/12/2024",
    totalStudentResponses: 38,
    overallScore: 68.0,
    evaluatedSubjects: [
      { code: "CS101", name: "Programación Orientada a Objetos", numEvaluations: 38, evaluationValue: 68 },
    ],
    analysisResults: "Dificultades reportadas en la resolución de dudas.",
    improvementActions: "Ofrecer tutorías adicionales y revisar métodos de explicación.",
  },
  {
    id: "eval3",
    teacherId: "t3",
    teacherName: "MSc. Laura Gómez",
    teacherArea: "Ciencias Básicas",
    evaluationPeriod: "2024-2",
    formCreationDate: "17/12/2024",
    totalStudentResponses: 55,
    overallScore: 85.0,
    evaluatedSubjects: [{ code: "MA101", name: "Cálculo Diferencial", numEvaluations: 55, evaluationValue: 85 }],
  },
  {
    id: "eval4",
    teacherId: "t5",
    teacherName: "Ing. Sofía Méndez",
    teacherArea: "Ciencias Básicas",
    evaluationPeriod: "2024-2",
    formCreationDate: "18/12/2024",
    totalStudentResponses: 30,
    overallScore: 65.0,
    evaluatedSubjects: [{ code: "PH101", name: "Física Mecánica", numEvaluations: 30, evaluationValue: 65 }],
    analysisResults: "Puntualidad y organización pueden mejorar.",
    improvementActions: "Utilizar plataforma virtual para organizar material con anticipación.",
  },
]

export const areas = Array.from(new Set(teachers.map((t) => t.area)))
