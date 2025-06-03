export interface SubjectEvaluationDetail {
  code: string
  name: string
  numEvaluations: number // N° de respuestas de estudiantes para esta asignatura
  evaluationValue: number // Puntuación de esta asignatura específica
}

export interface Evaluation {
  id: string
  teacherId: string
  teacherName: string // Para fácil acceso
  teacherArea: string // Para fácil acceso
  evaluationPeriod: string // Ej: "2024-2"
  formCreationDate: string // Fecha de creación del formulario/análisis Ej: "30/05/2025"
  totalStudentResponses: number // N° EVALUACIONES (Global)
  overallScore: number // CALIFICACIÓN GLOBAL (0-100)
  evaluatedSubjects: SubjectEvaluationDetail[]
  analysisResults?: string
  improvementActions?: string
}

export interface Teacher {
  id: string
  name: string
  area: string // Ej: "Ingeniería de Software", "Ciencias Básicas"
}

export interface Subject {
  id: string
  name: string
  code: string
  area: string // Para asociar materias a áreas
}

export interface Semester {
  id: string
  name: string // Ej: "2024-1", "2024-2"
}

// Para el formulario de creación
export interface NewEvaluationForm {
  teacherId: string
  subjectId: string
  semesterId: string
  // Otros campos que se llenarán en el formulario
  overallScore?: number
  evaluatedSubjects?: SubjectEvaluationDetail[]
  analysisResults?: string
  improvementActions?: string
  totalStudentResponses?: number
}
