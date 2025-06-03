"use client"

import type { Evaluation } from "@/types"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface PerformanceAlertsListProps {
  evaluations: Evaluation[]
}

export function PerformanceAlertsList({ evaluations }: PerformanceAlertsListProps) {
  const lowPerformanceEvaluations = evaluations
    .filter((ev) => ev.overallScore < 70)
    .sort((a, b) => a.overallScore - b.overallScore) // Sort by lowest score first

  return (
    <Card className="transition-all duration-300 ease-in-out">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-destructive" />
          Alertas de Rendimiento
        </CardTitle>
        <CardDescription>Docentes con calificación global inferior a 70/100.</CardDescription>
      </CardHeader>
      <CardContent>
        {lowPerformanceEvaluations.length > 0 ? (
          <div className="space-y-3">
            {lowPerformanceEvaluations.map((ev) => (
              <Alert key={ev.id} variant="destructive" className="hover:shadow-md transition-shadow duration-200">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle className="font-semibold">
                  {ev.teacherName} - {ev.teacherArea}
                </AlertTitle>
                <AlertDescription>
                  Calificación: <span className="font-bold">{ev.overallScore.toFixed(1)}</span> en el periodo{" "}
                  {ev.evaluationPeriod}. Se recomienda revisar y tomar acciones de mejora.
                </AlertDescription>
              </Alert>
            ))}
          </div>
        ) : (
          <Alert className="border-dashed">
            <Info className="h-4 w-4" />
            <AlertTitle>¡Todo en orden!</AlertTitle>
            <AlertDescription>
              No hay docentes con rendimiento por debajo del umbral de alerta (70/100).
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}
