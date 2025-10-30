"use client"

import { useState } from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DollarSign, TrendingUp, TrendingDown, CreditCard, Download, Filter } from "lucide-react"
import { StatsCard } from "@/components/stats-card"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const monthlyRevenue = [
  { month: "Ene", ingresos: 45000, gastos: 28000, neto: 17000 },
  { month: "Feb", ingresos: 52000, gastos: 30000, neto: 22000 },
  { month: "Mar", ingresos: 48000, gastos: 29000, neto: 19000 },
  { month: "Abr", ingresos: 61000, gastos: 32000, neto: 29000 },
  { month: "May", ingresos: 55000, gastos: 31000, neto: 24000 },
  { month: "Jun", ingresos: 67000, gastos: 33000, neto: 34000 },
]

const revenueBySource = [
  { name: "Membresías", value: 45000, color: "#22c55e" },
  { name: "Clases Grupales", value: 15000, color: "#3b82f6" },
  { name: "Entrenamiento Personal", value: 12000, color: "#a855f7" },
  { name: "Tienda", value: 8000, color: "#f59e0b" },
]

const expenses = [
  { category: "Salarios", amount: 18000, percentage: 56 },
  { category: "Renta", amount: 8000, percentage: 25 },
  { category: "Equipamiento", amount: 3000, percentage: 9 },
  { category: "Marketing", amount: 2000, percentage: 6 },
  { category: "Servicios", amount: 1000, percentage: 3 },
]

const recentTransactions = [
  { id: 1, type: "ingreso", description: "Membresía Premium - Juan Pérez", amount: 1200, date: "2025-01-15" },
  { id: 2, type: "ingreso", description: "Clase Grupal - María García", amount: 300, date: "2025-01-15" },
  { id: 3, type: "gasto", description: "Mantenimiento Equipos", amount: -450, date: "2025-01-14" },
  { id: 4, type: "ingreso", description: "Membresía Básica - Carlos López", amount: 600, date: "2025-01-14" },
  { id: 5, type: "gasto", description: "Salario Instructor", amount: -3000, date: "2025-01-13" },
  { id: 6, type: "ingreso", description: "Entrenamiento Personal", amount: 800, date: "2025-01-13" },
]

export default function FinanzasPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("mes")

  return (
    <>
      <div className="border-b border-border/50 bg-card/30 backdrop-blur">
        <div className="flex h-16 items-center gap-4 px-6">
          <SidebarTrigger />
          <h1 className="text-xl font-semibold text-foreground">Finanzas</h1>
          <div className="ml-auto flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filtrar
            </Button>
            <Button size="sm">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard title="Ingresos del Mes" value="$67,000" trend={{ value: 12.5, isPositive: true }} icon={DollarSign} />
          <StatsCard title="Gastos del Mes" value="$33,000" trend={{ value: 3.2, isPositive: true }} icon={TrendingDown} />
          <StatsCard title="Ganancia Neta" value="$34,000" trend={{ value: 41.7, isPositive: true }} icon={TrendingUp} />
          <StatsCard title="Margen de Ganancia" value="50.7%" trend={{ value: 8.3, isPositive: true }} icon={CreditCard} />
        </div>

        <Tabs defaultValue="resumen" className="space-y-4">
          <TabsList>
            <TabsTrigger value="resumen">Resumen</TabsTrigger>
            <TabsTrigger value="ingresos">Ingresos</TabsTrigger>
            <TabsTrigger value="gastos">Gastos</TabsTrigger>
            <TabsTrigger value="transacciones">Transacciones</TabsTrigger>
          </TabsList>

          <TabsContent value="resumen" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Ingresos vs Gastos</CardTitle>
                  <CardDescription>Últimos 6 meses</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyRevenue}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend />
                      <Bar dataKey="ingresos" fill="#22c55e" name="Ingresos" />
                      <Bar dataKey="gastos" fill="#ef4444" name="Gastos" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Ganancia Neta</CardTitle>
                  <CardDescription>Tendencia mensual</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyRevenue}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="neto" stroke="#22c55e" strokeWidth={3} name="Ganancia Neta" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="ingresos" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Ingresos por Fuente</CardTitle>
                  <CardDescription>Distribución del mes actual</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={revenueBySource}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {revenueBySource.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Desglose de Ingresos</CardTitle>
                  <CardDescription>Junio 2025</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {revenueBySource.map((source) => (
                      <div key={source.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-3 w-3 rounded-full" style={{ backgroundColor: source.color }} />
                          <span className="text-sm font-medium">{source.name}</span>
                        </div>
                        <span className="text-sm font-bold">${source.value.toLocaleString()}</span>
                      </div>
                    ))}
                    <div className="border-t pt-4 mt-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold">Total</span>
                        <span className="text-lg font-bold text-primary">
                          ${revenueBySource.reduce((acc, curr) => acc + curr.value, 0).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="gastos" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Gastos por Categoría</CardTitle>
                <CardDescription>Junio 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {expenses.map((expense) => (
                    <div key={expense.category} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{expense.category}</span>
                        <span className="text-sm font-bold">${expense.amount.toLocaleString()}</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-primary transition-all" style={{ width: `${expense.percentage}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground">{expense.percentage}% del total</span>
                    </div>
                  ))}
                  <div className="border-t pt-4 mt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold">Total Gastos</span>
                      <span className="text-lg font-bold text-destructive">
                        ${expenses.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transacciones" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Transacciones Recientes</CardTitle>
                <CardDescription>Últimas operaciones registradas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg ${
                            transaction.type === "ingreso"
                              ? "bg-primary/10 text-primary"
                              : "bg-destructive/10 text-destructive"
                          }`}
                        >
                          {transaction.type === "ingreso" ? (
                            <TrendingUp className="h-4 w-4" />
                          ) : (
                            <TrendingDown className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{transaction.description}</p>
                          <p className="text-xs text-muted-foreground">{transaction.date}</p>
                        </div>
                      </div>
                      <Badge variant={transaction.type === "ingreso" ? "default" : "destructive"} className="font-bold">
                        {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toLocaleString()}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
