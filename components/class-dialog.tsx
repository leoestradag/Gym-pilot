"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

interface ClassDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddClass?: (classData: {
    name: string
    instructor: string
    day: string
    time: string
    duration: string
    capacity: string
  }) => void
}

export function ClassDialog({ open, onOpenChange, onAddClass }: ClassDialogProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    instructor: "",
    day: "",
    time: "",
    duration: "",
    capacity: "",
    description: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate required fields
    if (!formData.name || !formData.instructor || !formData.day || !formData.time || !formData.duration || !formData.capacity) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos obligatorios.",
        variant: "destructive",
      })
      return
    }

    // Call the callback to add the class
    if (onAddClass) {
      onAddClass({
        name: formData.name,
        instructor: formData.instructor,
        day: formData.day,
        time: formData.time,
        duration: formData.duration,
        capacity: formData.capacity,
      })
    }

    toast({
      title: "Clase creada",
      description: `La clase "${formData.name}" ha sido creada exitosamente.`,
    })
    
    onOpenChange(false)
    setFormData({
      name: "",
      instructor: "",
      day: "",
      time: "",
      duration: "",
      capacity: "",
      description: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nueva Clase</DialogTitle>
          <DialogDescription>Crea una nueva clase grupal para el gimnasio</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre de la Clase</Label>
            <Input
              id="name"
              placeholder="Yoga Matutino"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="instructor">Instructor</Label>
            <Select
              value={formData.instructor}
              onValueChange={(value) => setFormData({ ...formData, instructor: value })}
              required
            >
              <SelectTrigger id="instructor">
                <SelectValue placeholder="Selecciona instructor" />
              </SelectTrigger>
              <SelectContent className="bg-white text-foreground">
                <SelectItem value="ana" className="text-foreground">Ana López</SelectItem>
                <SelectItem value="carlos" className="text-foreground">Carlos Mendoza</SelectItem>
                <SelectItem value="maria" className="text-foreground">María González</SelectItem>
                <SelectItem value="pedro" className="text-foreground">Pedro Sánchez</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="day">Día de la Semana</Label>
              <Select value={formData.day} onValueChange={(value) => setFormData({ ...formData, day: value })} required>
                <SelectTrigger id="day">
                  <SelectValue placeholder="Selecciona día" />
                </SelectTrigger>
                <SelectContent className="bg-white text-foreground">
                  <SelectItem value="lunes" className="text-foreground">Lunes</SelectItem>
                  <SelectItem value="martes" className="text-foreground">Martes</SelectItem>
                  <SelectItem value="miercoles" className="text-foreground">Miércoles</SelectItem>
                  <SelectItem value="jueves" className="text-foreground">Jueves</SelectItem>
                  <SelectItem value="viernes" className="text-foreground">Viernes</SelectItem>
                  <SelectItem value="sabado" className="text-foreground">Sábado</SelectItem>
                  <SelectItem value="domingo" className="text-foreground">Domingo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Hora</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration">Duración (minutos)</Label>
              <Input
                id="duration"
                type="number"
                placeholder="60"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="capacity">Capacidad</Label>
              <Input
                id="capacity"
                type="number"
                placeholder="20"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              placeholder="Describe la clase..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 bg-transparent"
            >
              Cancelar
            </Button>
            <Button type="submit" className="flex-1">
              Crear Clase
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
