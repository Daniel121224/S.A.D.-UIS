"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { EvaluationCard } from "@/components/evaluation-card"
import { CreateEvaluationDialog } from "@/components/create-evaluation-dialog"
import { TeacherComparisonChart } from "@/components/teacher-comparison-chart"
import { PerformanceAlertsList } from "@/components/performance-alerts-list"
import { evaluations as initialEvaluations, teachers, subjects, semesters, areas } from "@/lib/mock-data"
import type { Evaluation } from "@/types"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { FileText, Users, AlertTriangle, Filter } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentEvaluations, setCurrentEvaluations] = useState<Evaluation[]>(initialEvaluations)
  const [selectedEvaluationDetails, setSelectedEvaluationDetails] = useState<Evaluation | null>(null)

  // Filtros
  const [filterArea, setFilterArea] = useState<string>("")
  const [filterTeacher, setFilterTeacher] = useState<string>("")
  const [filterSemester, setFilterSemester] = useState<string>("")

  useEffect(() => {
    // Simular carga de datos
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const handleCreateEvaluation = (newEvaluationData: Evaluation) => {
    setCurrentEvaluations((prev) => [newEvaluationData, ...prev])
  }

  const handleViewDetails = (evaluationId: string) => {
    const evaluation = currentEvaluations.find((ev) => ev.id === evaluationId)
    setSelectedEvaluationDetails(evaluation || null)
  }

  const filteredEvaluations = currentEvaluations.filter((ev) => {
    return (
      (filterArea ? ev.teacherArea === filterArea : true) &&
      (filterTeacher ? ev.teacherId === filterTeacher : true) &&
      (filterSemester ? ev.evaluationPeriod === semesters.find((s) => s.id === filterSemester)?.name : true)
    )
  })

  const resetFilters = () => {
    setFilterArea("")
    setFilterTeacher("")
    setFilterSemester("")
  }

  const FilterPanel = () => (
    <div className="space-y-4 p-4 bg-card rounded-lg shadow">
      <h3 className="text-lg font-semibold">Filtrar Evaluaciones</h3>
      <Select value={filterArea} onValueChange={setFilterArea}>
        <SelectTrigger>
          <SelectValue placeholder="Filtrar por Área" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas las Áreas</SelectItem>
          {areas.map((area) => (
            <SelectItem key={area} value={area}>
              {area}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={filterTeacher} onValueChange={setFilterTeacher}>
        <SelectTrigger>
          <SelectValue placeholder="Filtrar por Docente" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos los Docentes</SelectItem>
          {teachers.map((teacher) => (
            <SelectItem key={teacher.id} value={teacher.id}>
              {teacher.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={filterSemester} onValueChange={setFilterSemester}>
        <SelectTrigger>
          <SelectValue placeholder="Filtrar por Semestre" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos los Semestres</SelectItem>
          {semesters.map((semester) => (
            <SelectItem key={semester.id} value={semester.id}>
              {semester.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button onClick={resetFilters} variant="outline" className="w-full">
        Limpiar Filtros
      </Button>
    </div>
  )

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="grid gap-6">
          <div className="flex justify-between items-center">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-10 w-32" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-64 w-full rounded-lg" />
            ))}
          </div>
          <Skeleton className="h-80 w-full rounded-lg" />
          <Skeleton className="h-48 w-full rounded-lg" />
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Sección de Acciones Rápidas y Filtros */}
        <section id="overview" className="scroll-mt-20">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold tracking-tight">Resumen General</h2>
            <div className="flex gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="hover:bg-accent transition-colors">
                    <Filter className="mr-2 h-4 w-4" /> Filtros
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Opciones de Filtro</SheetTitle>
                    <SheetDescription>Aplica filtros para refinar las evaluaciones mostradas.</SheetDescription>
                  </SheetHeader>
                  <FilterPanel />
                </SheetContent>
              </Sheet>
              <CreateEvaluationDialog
                teachers={teachers}
                subjects={subjects}
                semesters={semesters}
                onCreate={handleCreateEvaluation}
              />
            </div>
          </div>
        </section>

        {/* Sección de Evaluaciones */}
        <section id="evaluations" className="scroll-mt-20">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="h-6 w-6 text-primary" />
            <h3 className="text-xl font-semibold">Evaluaciones Recientes</h3>
          </div>
          {filteredEvaluations.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredEvaluations.map((ev) => (
                <EvaluationCard key={ev.id} evaluation={ev} onViewDetails={handleViewDetails} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">
              No se encontraron evaluaciones con los filtros aplicados.
            </p>
          )}
        </section>

        {/* Sección de Comparativa */}
        <section id="comparison" className="scroll-mt-20">
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-6 w-6 text-primary" />
            <h3 className="text-xl font-semibold">Comparativa de Docentes</h3>
          </div>
          <TeacherComparisonChart evaluations={currentEvaluations} areas={areas} />
        </section>

        {/* Sección de Alertas */}
        <section id="alerts" className="scroll-mt-20">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-6 w-6 text-destructive" />
            <h3 className="text-xl font-semibold">Alertas de Rendimiento</h3>
          </div>
          <PerformanceAlertsList evaluations={currentEvaluations} />
        </section>
      </div>

      {/* Modal para ver detalles de la evaluación */}
      <Sheet open={!!selectedEvaluationDetails} onOpenChange={(open) => !open && setSelectedEvaluationDetails(null)}>
        <SheetContent className="sm:max-w-lg w-[90vw] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Detalles de la Evaluación</SheetTitle>
            <SheetDescription>
              Información completa de la evaluación para {selectedEvaluationDetails?.teacherName}.
            </SheetDescription>
          </SheetHeader>
          {selectedEvaluationDetails && (
            <div className="py-4 space-y-4">
              <p>
                <strong>Docente:</strong> {selectedEvaluationDetails.teacherName}
              </p>
              <p>
                <strong>Área:</strong> {selectedEvaluationDetails.teacherArea}
              </p>
              <p>
                <strong>Periodo:</strong> {selectedEvaluationDetails.evaluationPeriod}
              </p>
              <p>
                <strong>Fecha Creación Formulario:</strong> {selectedEvaluationDetails.formCreationDate}
              </p>
              <p>
                <strong>Respuestas de Estudiantes:</strong> {selectedEvaluationDetails.totalStudentResponses}
              </p>
              <p>
                <strong>Calificación Global:</strong>{" "}
                <span
                  className={`font-bold ${selectedEvaluationDetails.overallScore < 70 ? "text-red-500" : "text-green-600"}`}
                >
                  {selectedEvaluationDetails.overallScore.toFixed(1)} / 100
                </span>
              </p>

              <h4 className="font-semibold mt-2">Asignaturas Evaluadas:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {selectedEvaluationDetails.evaluatedSubjects.map((s) => (
                  <li key={s.code}>
                    {s.name} ({s.code}): {s.evaluationValue.toFixed(1)} ({s.numEvaluations} evaluaciones)
                  </li>
                ))}
              </ul>

              {selectedEvaluationDetails.analysisResults && (
                <div>
                  <h4 className="font-semibold mt-2">Análisis de Resultados:</h4>
                  <p className="text-sm bg-muted p-2 rounded">{selectedEvaluationDetails.analysisResults}</p>
                </div>
              )}
              {selectedEvaluationDetails.improvementActions && (
                <div>
                  <h4 className="font-semibold mt-2">Acciones de Mejoramiento:</h4>
                  <p className="text-sm bg-muted p-2 rounded">{selectedEvaluationDetails.improvementActions}</p>
                </div>
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>
    </DashboardLayout>
  )
}
