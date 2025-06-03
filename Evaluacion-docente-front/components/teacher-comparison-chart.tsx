"use client"

import type { Evaluation } from "@/types"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useMemo } from "react"

interface TeacherComparisonChartProps {
  evaluations: Evaluation[]
  areas: string[]
}

export function TeacherComparisonChart({ evaluations, areas }: TeacherComparisonChartProps) {
  const [selectedArea, setSelectedArea] = useState<string>(areas[0] || "")

  const filteredEvaluations = useMemo(() => {
    return evaluations.filter((ev) => ev.teacherArea === selectedArea).sort((a, b) => b.overallScore - a.overallScore) // Sort by score descending
  }, [evaluations, selectedArea])

  const chartData = useMemo(() => {
    return filteredEvaluations.map((ev) => ({
      name: ev.teacherName.split(" ").slice(1).join(" "), // Shorten name for chart
      score: ev.overallScore,
    }))
  }, [filteredEvaluations])

  return (
    <Card className="transition-all duration-300 ease-in-out">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <CardTitle>Comparativa de Docentes por Área</CardTitle>
            <CardDescription>Rendimiento de docentes en el área seleccionada.</CardDescription>
          </div>
          <Select onValueChange={setSelectedArea} defaultValue={selectedArea}>
            <SelectTrigger className="w-full sm:w-[200px] hover:border-primary transition-colors">
              <SelectValue placeholder="Seleccione un área" />
            </SelectTrigger>
            <SelectContent>
              {areas.map((area) => (
                <SelectItem key={area} value={area}>
                  {area}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-30} textAnchor="end" height={70} interval={0} />
              <YAxis domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
                itemStyle={{ color: "hsl(var(--foreground))" }}
                cursor={{ fill: "hsl(var(--muted))", fillOpacity: 0.5 }}
              />
              <Legend />
              <Bar
                dataKey="score"
                name="Calificación Global"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
                barSize={30}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center text-muted-foreground py-8">
            No hay datos de evaluación para el área seleccionada o no hay docentes en esta área.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
