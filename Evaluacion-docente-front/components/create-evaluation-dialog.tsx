"use client"

import type React from "react"
import { useState } from "react"
import type { Teacher, Subject, Semester, NewEvaluationForm, Evaluation } from "@/types"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle } from "lucide-react"

interface CreateEvaluationDialogProps {
  teachers: Teacher[]
  subjects: Subject[]
  semesters: Semester[]
  onCreate: (newEvaluationData: Evaluation) => void
  triggerButton?: React.ReactNode
}

export function CreateEvaluationDialog({
  teachers,
  subjects,
  semesters,
  onCreate,
  triggerButton,
}: CreateEvaluationDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState<Partial<NewEvaluationForm>>({})
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null)
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null)

  const handleTeacherChange = (teacherId: string) => {
    const teacher = teachers.find((t) => t.id === teacherId) || null
    setSelectedTeacher(teacher)
    setFormData((prev) => ({ ...prev, teacherId }))
  }

  const handleSubjectChange = (subjectId: string) => {
    const subject = subjects.find((s) => s.id === subjectId) || null
    setSelectedSubject(subject)
    setFormData((prev) => ({ ...prev, subjectId }))
  }

  const handleSubmit = () => {
    if (!formData.teacherId || !formData.subjectId || !formData.semesterId) {
      alert("Por favor, complete los campos de Docente, Materia y Semestre.")
      return
    }

    const teacher = teachers.find((t) => t.id === formData.teacherId)
    const subject = subjects.find((s) => s.id === formData.subjectId)

    // Simulación de creación de una nueva evaluación
    const newEvaluation: Evaluation = {
      id: `eval-${Date.now()}`,
      teacherId: formData.teacherId,
      teacherName: teacher?.name || "N/A",
      teacherArea: teacher?.area || "N/A",
      evaluationPeriod: semesters.find((s) => s.id === formData.semesterId)?.name || "N/A",
      formCreationDate: new Date().toLocaleDateString("es-ES"),
      totalStudentResponses: formData.totalStudentResponses || 0,
      overallScore: formData.overallScore || 0,
      evaluatedSubjects: subject
        ? [
            {
              code: subject.code,
              name: subject.name,
              numEvaluations: formData.totalStudentResponses || 0, // Asumimos que todas las respuestas son para esta materia
              evaluationValue: formData.overallScore || 0, // Asumimos que el score global es para esta materia
            },
          ]
        : [],
      analysisResults: formData.analysisResults || "",
      improvementActions: formData.improvementActions || "",
    }
    onCreate(newEvaluation)
    setIsOpen(false)
    setFormData({}) // Reset form
    setSelectedTeacher(null)
    setSelectedSubject(null)
  }

  const filteredSubjects = selectedTeacher ? subjects.filter((s) => s.area === selectedTeacher.area) : subjects

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {triggerButton ? (
          triggerButton
        ) : (
          <Button className="hover:bg-primary/90 transition-colors duration-200 transform hover:scale-105">
            <PlusCircle className="mr-2 h-4 w-4" /> Crear Formulario
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Formulario de Evaluación</DialogTitle>
          <DialogDescription>
            Complete los detalles para la nueva evaluación docente. Los campos predeterminados se cargarán según la
            selección.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="teacher" className="text-right">
              Docente
            </Label>
            <Select onValueChange={handleTeacherChange} value={formData.teacherId}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Seleccione un docente" />
              </SelectTrigger>
              <SelectContent>
                {teachers.map((teacher) => (
                  <SelectItem key={teacher.id} value={teacher.id}>
                    {teacher.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="subject" className="text-right">
              Materia
            </Label>
            <Select onValueChange={handleSubjectChange} value={formData.subjectId} disabled={!selectedTeacher}>
              <SelectTrigger className="col-span-3">
                <SelectValue
                  placeholder={selectedTeacher ? "Seleccione una materia" : "Seleccione un docente primero"}
                />
              </SelectTrigger>
              <SelectContent>
                {filteredSubjects.map((subject) => (
                  <SelectItem key={subject.id} value={subject.id}>
                    {subject.name} ({subject.code})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="semester" className="text-right">
              Semestre
            </Label>
            <Select
              onValueChange={(value) => setFormData((prev) => ({ ...prev, semesterId: value }))}
              value={formData.semesterId}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Seleccione un semestre" />
              </SelectTrigger>
              <SelectContent>
                {semesters.map((semester) => (
                  <SelectItem key={semester.id} value={semester.id}>
                    {semester.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="overallScore" className="text-right">
              Calificación Global
            </Label>
            <Input
              id="overallScore"
              type="number"
              min="0"
              max="100"
              className="col-span-3"
              value={formData.overallScore || ""}
              onChange={(e) => setFormData((prev) => ({ ...prev, overallScore: Number.parseFloat(e.target.value) }))}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="totalStudentResponses" className="text-right">
              Respuestas Estudiantes
            </Label>
            <Input
              id="totalStudentResponses"
              type="number"
              min="0"
              className="col-span-3"
              value={formData.totalStudentResponses || ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, totalStudentResponses: Number.parseInt(e.target.value) }))
              }
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="analysisResults" className="text-right pt-2">
              Análisis Resultados
            </Label>
            <Textarea
              id="analysisResults"
              className="col-span-3 min-h-[80px]"
              value={formData.analysisResults || ""}
              onChange={(e) => setFormData((prev) => ({ ...prev, analysisResults: e.target.value }))}
              placeholder="Análisis de los resultados de la evaluación..."
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="improvementActions" className="text-right pt-2">
              Acciones Mejora
            </Label>
            <Textarea
              id="improvementActions"
              className="col-span-3 min-h-[80px]"
              value={formData.improvementActions || ""}
              onChange={(e) => setFormData((prev) => ({ ...prev, improvementActions: e.target.value }))}
              placeholder="Acciones de mejoramiento propuestas..."
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
          <Button type="submit" onClick={handleSubmit} className="hover:bg-primary/90 transition-colors">
            Guardar Evaluación
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
