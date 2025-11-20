"use client"

import { useState } from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DollarSign, TrendingUp, TrendingDown, CreditCard, Download } from "lucide-react"
import * as XLSX from "xlsx-js-style"
import { useToast } from "@/hooks/use-toast"
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
  const { toast } = useToast()

  const handleExport = () => {
    try {
      const workbook = XLSX.utils.book_new()
      const gymName = "Tessalp Smart Gyms"
      const currentDate = new Date().toLocaleDateString("es-MX", { 
        year: "numeric", 
        month: "long", 
        day: "numeric" 
      })
      const reportDate = new Date().toISOString().split("T")[0]

      // Estilos reutilizables
      const headerStyle = {
        font: { bold: true, size: 16, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "1E40AF" } },
        alignment: { horizontal: "center", vertical: "center" },
        border: {
          top: { style: "thin", color: { rgb: "000000" } },
          bottom: { style: "thin", color: { rgb: "000000" } },
          left: { style: "thin", color: { rgb: "000000" } },
          right: { style: "thin", color: { rgb: "000000" } },
        },
      }

      const titleStyle = {
        font: { bold: true, size: 14, color: { rgb: "1E3A8A" } },
        fill: { fgColor: { rgb: "DBEAFE" } },
        alignment: { horizontal: "center", vertical: "center" },
        border: {
          top: { style: "thin", color: { rgb: "000000" } },
          bottom: { style: "thin", color: { rgb: "000000" } },
          left: { style: "thin", color: { rgb: "000000" } },
          right: { style: "thin", color: { rgb: "000000" } },
        },
      }

      const subheaderStyle = {
        font: { bold: true, size: 11 },
        fill: { fgColor: { rgb: "F3F4F6" } },
        alignment: { horizontal: "left", vertical: "center" },
        border: {
          top: { style: "thin", color: { rgb: "000000" } },
          bottom: { style: "thin", color: { rgb: "000000" } },
          left: { style: "thin", color: { rgb: "000000" } },
          right: { style: "thin", color: { rgb: "000000" } },
        },
      }

      const numberStyle = {
        alignment: { horizontal: "right", vertical: "center" },
        numFmt: "#,##0",
        border: {
          top: { style: "thin", color: { rgb: "CCCCCC" } },
          bottom: { style: "thin", color: { rgb: "CCCCCC" } },
          left: { style: "thin", color: { rgb: "CCCCCC" } },
          right: { style: "thin", color: { rgb: "CCCCCC" } },
        },
      }

      const currencyStyle = {
        alignment: { horizontal: "right", vertical: "center" },
        numFmt: '"$"#,##0',
        border: {
          top: { style: "thin", color: { rgb: "CCCCCC" } },
          bottom: { style: "thin", color: { rgb: "CCCCCC" } },
          left: { style: "thin", color: { rgb: "CCCCCC" } },
          right: { style: "thin", color: { rgb: "CCCCCC" } },
        },
      }

      const percentStyle = {
        alignment: { horizontal: "right", vertical: "center" },
        numFmt: "0.00%",
        border: {
          top: { style: "thin", color: { rgb: "CCCCCC" } },
          bottom: { style: "thin", color: { rgb: "CCCCCC" } },
          left: { style: "thin", color: { rgb: "CCCCCC" } },
          right: { style: "thin", color: { rgb: "CCCCCC" } },
        },
      }

      const positiveStyle = {
        ...currencyStyle,
        font: { color: { rgb: "16A34A" } },
      }

      const negativeStyle = {
        ...currencyStyle,
        font: { color: { rgb: "DC2626" } },
      }

      // Función helper para crear hoja con formato
      const createFormattedSheet = (data: any[], sheetName: string, headers: string[], headerRowIndex: number) => {
        const ws = XLSX.utils.aoa_to_sheet(data)
        
        // Aplicar estilos a todas las celdas
        const range = XLSX.utils.decode_range(ws["!ref"] || "A1")
        
        for (let R = range.s.r; R <= range.e.r; ++R) {
          for (let C = range.s.c; C <= range.e.c; ++C) {
            const cellAddress = XLSX.utils.encode_cell({ c: C, r: R })
            if (!ws[cellAddress]) continue
            
            const cellValue = data[R]?.[C]
            const isHeaderRow = R === headerRowIndex
            const isTitleRow = R === 0 || (R === 1 && data[0]?.[0]?.includes("Tessalp"))
            const isSubtitleRow = R === 1 || R === 2
            const isNumber = typeof cellValue === "number" && !isNaN(cellValue)
            
            // Estilo para título del gimnasio (fila 0)
            if (R === 0 && C === 0 && cellValue && typeof cellValue === "string" && cellValue.includes("Tessalp")) {
              ws[cellAddress].s = {
                font: { bold: true, size: 18, color: { rgb: "1E40AF" } },
                alignment: { horizontal: "center", vertical: "center" },
              }
              // Merge cells for title - solo una vez
              if (!ws["!merges"]) ws["!merges"] = []
              const hasTitleMerge = ws["!merges"].some((m: any) => m.s.r === 0 && m.s.c === 0)
              if (!hasTitleMerge) {
                ws["!merges"].push({ s: { r: 0, c: 0 }, e: { r: 0, c: Math.max(headers.length - 1, 3) } })
              }
            }
            // Estilo para subtítulo de fecha (fila 1)
            else if (R === 1 && C === 0 && cellValue && typeof cellValue === "string" && cellValue.includes("Análisis")) {
              ws[cellAddress].s = {
                font: { bold: true, size: 12, color: { rgb: "4B5563" } },
                alignment: { horizontal: "center", vertical: "center" },
              }
              if (!ws["!merges"]) ws["!merges"] = []
              const hasSubtitleMerge = ws["!merges"].some((m: any) => m.s.r === 1 && m.s.c === 0)
              if (!hasSubtitleMerge) {
                ws["!merges"].push({ s: { r: 1, c: 0 }, e: { r: 1, c: Math.max(headers.length - 1, 3) } })
              }
            }
            // Estilo para secciones (filas con texto en negrita como "RESUMEN EJECUTIVO")
            else if (cellValue && typeof cellValue === "string" && cellValue === cellValue.toUpperCase() && cellValue.length > 5 && R < headerRowIndex) {
              ws[cellAddress].s = {
                font: { bold: true, size: 12, color: { rgb: "1E3A8A" } },
                fill: { fgColor: { rgb: "DBEAFE" } },
                alignment: { horizontal: "left", vertical: "center" },
              }
              // Merge section headers
              if (!ws["!merges"]) ws["!merges"] = []
              const hasSectionMerge = ws["!merges"].some((m: any) => m.s.r === R && m.s.c === 0)
              if (!hasSectionMerge && C === 0) {
                ws["!merges"].push({ s: { r: R, c: 0 }, e: { r: R, c: Math.max(headers.length - 1, 1) } })
              }
            }
            // Estilo para headers de columnas
            else if (isHeaderRow) {
              ws[cellAddress].s = headerStyle
            }
            // Estilo para filas de datos
            else if (R > headerRowIndex && data[R]) {
              const headerName = headers[C] || ""
              const isCurrency = headerName.toLowerCase().includes("ingreso") || 
                                headerName.toLowerCase().includes("gasto") || 
                                headerName.toLowerCase().includes("monto") ||
                                headerName.toLowerCase().includes("ganancia") ||
                                headerName.toLowerCase().includes("valor") ||
                                headerName.toLowerCase().includes("total")
              const isPercent = headerName.includes("%") || headerName.includes("Margen") || headerName.includes("Var.")
              
              if (isCurrency && isNumber) {
                ws[cellAddress].s = cellValue >= 0 ? positiveStyle : negativeStyle
              } else if (isPercent && isNumber) {
                ws[cellAddress].s = percentStyle
              } else if (isNumber) {
                ws[cellAddress].s = numberStyle
              } else {
                ws[cellAddress].s = {
                  alignment: { horizontal: "left", vertical: "center" },
                  border: {
                    top: { style: "thin", color: { rgb: "CCCCCC" } },
                    bottom: { style: "thin", color: { rgb: "CCCCCC" } },
                    left: { style: "thin", color: { rgb: "CCCCCC" } },
                    right: { style: "thin", color: { rgb: "CCCCCC" } },
                  },
                }
              }
            }
          }
        }

        // Ajustar ancho de columnas
        const colWidths = headers.map((_, idx) => {
          if (idx === 0) return { wch: 20 }
          if (idx === 1) return { wch: 25 }
          return { wch: 18 }
        })
        ws["!cols"] = colWidths
        
        return ws
      }

      // HOJA 1: Resumen Ejecutivo
      const totalIncome = monthlyRevenue[monthlyRevenue.length - 1].ingresos
      const totalExpenses = monthlyRevenue[monthlyRevenue.length - 1].gastos
      const netProfit = monthlyRevenue[monthlyRevenue.length - 1].neto
      const profitMargin = (netProfit / totalIncome) * 100
      const avgMonthlyIncome = monthlyRevenue.reduce((acc, curr) => acc + curr.ingresos, 0) / monthlyRevenue.length
      const avgMonthlyExpenses = monthlyRevenue.reduce((acc, curr) => acc + curr.gastos, 0) / monthlyRevenue.length
      const avgMonthlyProfit = monthlyRevenue.reduce((acc, curr) => acc + curr.neto, 0) / monthlyRevenue.length
      const totalIncome6Months = monthlyRevenue.reduce((acc, curr) => acc + curr.ingresos, 0)
      const totalExpenses6Months = monthlyRevenue.reduce((acc, curr) => acc + curr.gastos, 0)
      const totalProfit6Months = monthlyRevenue.reduce((acc, curr) => acc + curr.neto, 0)
      
      // Calcular tendencias
      const incomeGrowth = monthlyRevenue.length >= 2 
        ? ((monthlyRevenue[monthlyRevenue.length - 1].ingresos - monthlyRevenue[monthlyRevenue.length - 2].ingresos) / monthlyRevenue[monthlyRevenue.length - 2].ingresos) * 100
        : 0
      const expenseGrowth = monthlyRevenue.length >= 2
        ? ((monthlyRevenue[monthlyRevenue.length - 1].gastos - monthlyRevenue[monthlyRevenue.length - 2].gastos) / monthlyRevenue[monthlyRevenue.length - 2].gastos) * 100
        : 0
      const profitGrowth = monthlyRevenue.length >= 2
        ? ((monthlyRevenue[monthlyRevenue.length - 1].neto - monthlyRevenue[monthlyRevenue.length - 2].neto) / monthlyRevenue[monthlyRevenue.length - 2].neto) * 100
        : 0

      const executiveData = [
        [gymName],
        [`Análisis Financiero - ${currentDate}`],
        [""],
        ["RESUMEN EJECUTIVO", ""],
        ["Métrica", "Valor"],
        ["Ingresos del Mes Actual", totalIncome],
        ["Gastos del Mes Actual", totalExpenses],
        ["Ganancia Neta del Mes", netProfit],
        ["Margen de Ganancia (%)", profitMargin / 100],
        ["", ""],
        ["PROMEDIOS MENSUALES (6 meses)", ""],
        ["Ingresos Promedio Mensual", avgMonthlyIncome],
        ["Gastos Promedio Mensual", avgMonthlyExpenses],
        ["Ganancia Promedio Mensual", avgMonthlyProfit],
        ["", ""],
        ["TOTALES ACUMULADOS (6 meses)", ""],
        ["Total Ingresos", totalIncome6Months],
        ["Total Gastos", totalExpenses6Months],
        ["Total Ganancia Neta", totalProfit6Months],
        ["", ""],
        ["TENDENCIAS vs MES ANTERIOR", ""],
        ["Crecimiento de Ingresos (%)", incomeGrowth / 100],
        ["Crecimiento de Gastos (%)", expenseGrowth / 100],
        ["Crecimiento de Ganancia (%)", profitGrowth / 100],
        ["", ""],
        ["ANÁLISIS DE TRANSACCIONES", ""],
        ["Total de Transacciones", recentTransactions.length],
        ["Transacciones de Ingreso", recentTransactions.filter((t) => t.type === "ingreso").length],
        ["Transacciones de Gasto", recentTransactions.filter((t) => t.type === "gasto").length],
        ["Ingresos Totales (Transacciones)", recentTransactions.filter((t) => t.type === "ingreso").reduce((acc, curr) => acc + Math.abs(curr.amount), 0)],
        ["Gastos Totales (Transacciones)", Math.abs(recentTransactions.filter((t) => t.type === "gasto").reduce((acc, curr) => acc + curr.amount, 0))],
      ]

      const executiveSheet = createFormattedSheet(executiveData, "Resumen Ejecutivo", ["Métrica", "Valor"], 3)
      XLSX.utils.book_append_sheet(workbook, executiveSheet, "Resumen Ejecutivo")

      // HOJA 2: Resumen Mensual con análisis
      const monthOrder = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
      const sortedRevenue = [...monthlyRevenue].sort((a, b) => 
        monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
      )

      const summaryData = [
        [gymName],
        [`Análisis Financiero Mensual - ${currentDate}`],
        [""],
        ["Mes", "Ingresos", "Gastos", "Ganancia Neta", "Margen %", "Var. Ingresos", "Var. Gastos", "Var. Ganancia"],
        ...sortedRevenue.map((item, idx) => {
          const margin = (item.neto / item.ingresos) * 100
          const prevMonth = idx > 0 ? sortedRevenue[idx - 1] : null
          const incomeVar = prevMonth ? ((item.ingresos - prevMonth.ingresos) / prevMonth.ingresos) * 100 : 0
          const expenseVar = prevMonth ? ((item.gastos - prevMonth.gastos) / prevMonth.gastos) * 100 : 0
          const profitVar = prevMonth ? ((item.neto - prevMonth.neto) / prevMonth.neto) * 100 : 0
          
          return [
            item.month,
            item.ingresos,
            item.gastos,
            item.neto,
            margin / 100,
            incomeVar / 100,
            expenseVar / 100,
            profitVar / 100,
          ]
        }),
        ["TOTALES", 
          sortedRevenue.reduce((acc, curr) => acc + curr.ingresos, 0),
          sortedRevenue.reduce((acc, curr) => acc + curr.gastos, 0),
          sortedRevenue.reduce((acc, curr) => acc + curr.neto, 0),
          (sortedRevenue.reduce((acc, curr) => acc + curr.neto, 0) / sortedRevenue.reduce((acc, curr) => acc + curr.ingresos, 0)) * 100 / 100,
          "",
          "",
          "",
        ],
      ]

      const summarySheet = createFormattedSheet(summaryData, "Resumen Mensual", 
        ["Mes", "Ingresos", "Gastos", "Ganancia Neta", "Margen %", "Var. Ingresos", "Var. Gastos", "Var. Ganancia"], 3)
      XLSX.utils.book_append_sheet(workbook, summarySheet, "Resumen Mensual")

      // HOJA 3: Transacciones Detalladas
      const transactionsData = [
        [gymName],
        [`Registro de Transacciones - ${currentDate}`],
        [""],
        ["Fecha", "Tipo", "Descripción", "Monto", "Categoría"],
        ...recentTransactions
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .map((transaction) => {
            const category = transaction.type === "ingreso" 
              ? (transaction.description.includes("Membresía") ? "Membresías" :
                 transaction.description.includes("Clase") ? "Clases Grupales" :
                 transaction.description.includes("Entrenamiento") ? "Entrenamiento Personal" : "Otros")
              : (transaction.description.includes("Salario") ? "Salarios" :
                 transaction.description.includes("Mantenimiento") ? "Equipamiento" : "Otros")
            
            return [
              transaction.date,
              transaction.type === "ingreso" ? "Ingreso" : "Gasto",
              transaction.description,
              transaction.amount,
              category,
            ]
          }),
        ["TOTALES", "", "", 
          recentTransactions.reduce((acc, curr) => acc + curr.amount, 0),
          "",
        ],
      ]

      const transactionsSheet = createFormattedSheet(transactionsData, "Transacciones",
        ["Fecha", "Tipo", "Descripción", "Monto", "Categoría"], 3)
      XLSX.utils.book_append_sheet(workbook, transactionsSheet, "Transacciones")

      // HOJA 4: Ingresos por Fuente con análisis
      const totalRevenue = revenueBySource.reduce((acc, curr) => acc + curr.value, 0)
      const incomeData = [
        [gymName],
        [`Análisis de Ingresos por Fuente - ${currentDate}`],
        [""],
        ["Fuente de Ingreso", "Monto", "Porcentaje %", "Tendencia"],
        ...revenueBySource.map((source) => {
          const percentage = (source.value / totalRevenue) * 100
          const trend = source.value >= totalRevenue / revenueBySource.length ? "Alta" : "Media"
          return [source.name, source.value, percentage / 100, trend]
        }),
        ["TOTAL", totalRevenue, 1, ""],
      ]

      const incomeSheet = createFormattedSheet(incomeData, "Ingresos por Fuente",
        ["Fuente de Ingreso", "Monto", "Porcentaje %", "Tendencia"], 3)
      XLSX.utils.book_append_sheet(workbook, incomeSheet, "Ingresos por Fuente")

      // HOJA 5: Gastos por Categoría con análisis
      const totalExpensesAmount = expenses.reduce((acc, curr) => acc + curr.amount, 0)
      const expensesData = [
        [gymName],
        [`Análisis de Gastos por Categoría - ${currentDate}`],
        [""],
        ["Categoría", "Monto", "Porcentaje %", "Observaciones"],
        ...expenses
          .sort((a, b) => b.amount - a.amount)
          .map((expense) => {
            const observation = expense.percentage > 50 ? "Alto - Revisar" : 
                               expense.percentage > 25 ? "Moderado" : "Bajo"
            return [expense.category, expense.amount, expense.percentage / 100, observation]
          }),
        ["TOTAL", totalExpensesAmount, 100 / 100, ""],
      ]

      const expensesSheet = createFormattedSheet(expensesData, "Gastos por Categoría",
        ["Categoría", "Monto", "Porcentaje %", "Observaciones"], 3)
      XLSX.utils.book_append_sheet(workbook, expensesSheet, "Gastos por Categoría")

      // HOJA 6: Análisis de Ratios y KPIs
      const ratiosData = [
        [gymName],
        [`Análisis de Ratios Financieros - ${currentDate}`],
        [""],
        ["Indicador", "Valor", "Interpretación"],
        ["Margen de Ganancia Bruta", profitMargin / 100, profitMargin > 40 ? "Excelente" : profitMargin > 25 ? "Bueno" : "Mejorar"],
        ["Ratio Ingresos/Gastos", totalIncome / totalExpenses, totalIncome / totalExpenses > 2 ? "Excelente" : totalIncome / totalExpenses > 1.5 ? "Bueno" : "Revisar"],
        ["Crecimiento de Ingresos (Mensual)", incomeGrowth / 100, incomeGrowth > 10 ? "Alto crecimiento" : incomeGrowth > 0 ? "Crecimiento positivo" : "Revisar"],
        ["Eficiencia Operativa", (netProfit / totalIncome) * 100 / 100, (netProfit / totalIncome) > 0.4 ? "Alta eficiencia" : "Mejorar eficiencia"],
        ["Ingresos por Transacción Promedio", 
          recentTransactions.filter((t) => t.type === "ingreso").length > 0 
            ? recentTransactions.filter((t) => t.type === "ingreso").reduce((acc, curr) => acc + Math.abs(curr.amount), 0) / recentTransactions.filter((t) => t.type === "ingreso").length
            : 0,
          "Ticket promedio"
        ],
        ["Gastos por Transacción Promedio",
          recentTransactions.filter((t) => t.type === "gasto").length > 0
            ? Math.abs(recentTransactions.filter((t) => t.type === "gasto").reduce((acc, curr) => acc + curr.amount, 0)) / recentTransactions.filter((t) => t.type === "gasto").length
            : 0,
          "Costo promedio"
        ],
      ]

      const ratiosSheet = createFormattedSheet(ratiosData, "Ratios y KPIs",
        ["Indicador", "Valor", "Interpretación"], 3)
      XLSX.utils.book_append_sheet(workbook, ratiosSheet, "Ratios y KPIs")

      // Generar el archivo
      const fileName = `Analisis_Financiero_${gymName.replace(/\s+/g, "_")}_${reportDate}.xlsx`
      XLSX.writeFile(workbook, fileName)

      toast({
        title: "Exportación exitosa",
        description: `Análisis financiero ${fileName} descargado correctamente`,
      })
    } catch (error) {
      console.error("Error al exportar:", error)
      toast({
        title: "Error al exportar",
        description: "No se pudo generar el archivo de exportación",
        variant: "destructive",
      })
    }
  }

  return (
    <>
      <div className="border-b border-border/50 bg-card/30 backdrop-blur">
        <div className="flex h-16 items-center gap-4 px-6">
          <SidebarTrigger />
          <h1 className="text-xl font-semibold text-foreground">Finanzas</h1>
          <div className="ml-auto flex gap-2">
            <Button size="sm" onClick={handleExport}>
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
