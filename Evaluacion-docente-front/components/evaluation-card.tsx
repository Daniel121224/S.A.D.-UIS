"use client"

import type { Evaluation } from "@/types"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Edit3, Trash2, AlertCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface EvaluationCardProps {
  evaluation: Evaluation
  onViewDetails: (evaluationId: string) => void
}

export function EvaluationCard({ evaluation, onViewDetails }: EvaluationCardProps) {
  const scoreColor =
    evaluation.overallScore < 70 ? "bg-red-500" : evaluation.overallScore < 85 ? "bg-yellow-500" : "bg-green-500"
  const isLowPerformance = evaluation.overallScore < 70

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:-translate-y-1">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{evaluation.teacherName}</CardTitle>
            <CardDescription>
              {evaluation.teacherArea} - Periodo: {evaluation.evaluationPeriod}
            </CardDescription>
          </div>
          {isLowPerformance && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <AlertCircle className="h-6 w-6 text-red-500 animate-pulse" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Bajo rendimiento detectado</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Calificación Global:</span>
          <Badge variant={isLowPerformance ? "destructive" : "default"} className="text-base">
            {evaluation.overallScore.toFixed(1)} / 100
          </Badge>
        </div>
        <Progress
          value={evaluation.overallScore}
          className="h-3 [&>div]:bg-gradient-to-r [&>div]:from-primary/70 [&>div]:to-primary"
        />
        <div className="text-xs text-muted-foreground">
          {evaluation.totalStudentResponses} respuestas de estudiantes.
        </div>
        <div className="mt-2">
          <h4 className="text-sm font-semibold mb-1">Asignaturas Evaluadas:</h4>
          <ul className="list-disc list-inside text-xs space-y-0.5">
            {evaluation.evaluatedSubjects.slice(0, 2).map((subj) => (
              <li key={subj.code}>
                {subj.name} ({subj.evaluationValue.toFixed(1)})
              </li>
            ))}
            {evaluation.evaluatedSubjects.length > 2 && <li>...y {evaluation.evaluatedSubjects.length - 2} más</li>}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => onViewDetails(evaluation.id)}
                className="hover:bg-accent transition-colors"
              >
                <Eye className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Ver Detalles</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors"
              >
                <Edit3 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Editar</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="hover:bg-red-100 dark:hover:bg-red-800 transition-colors"
              >
                <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Eliminar</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  )
}
