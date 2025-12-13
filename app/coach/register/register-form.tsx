"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

const coachRoles = [
  { value: "STAFF", label: "Staff del gimnasio" },
  { value: "PERSONAL_TRAINER", label: "Entrenador personal" },
  { value: "SPINNING", label: "Coach de Spinning" },
  { value: "PILATES", label: "Instructor de Pilates" },
  { value: "YOGA", label: "Instructor de Yoga" },
  { value: "CROSSFIT", label: "Entrenador de Crossfit" },
  { value: "NUTRITION", label: "Coach de Nutrición" },
] as const

const formSchema = z
  .object({
    name: z.string().min(3, "Ingresa tu nombre completo"),
    email: z.string().email("Ingresa un correo válido"),
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .regex(/^(?=.*[A-Za-z])(?=.*\d).+$/, {
        message: "Debe contener letras y números",
      }),
    confirmPassword: z.string(),
    role: z.enum(coachRoles.map((role) => role.value) as [string, ...string[]]),
    gymId: z.string().optional(),
    bio: z.string().max(600).optional(),
    certifications: z.string().max(400).optional(),
    specialties: z.string().max(400).optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Las contraseñas no coinciden",
  })

type FormValues = z.infer<typeof formSchema>

interface CoachRegisterFormProps {
  gyms: Array<{ id: number; name: string }>
}

export function CoachRegisterForm({ gyms }: CoachRegisterFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [responseMessage, setResponseMessage] = useState<string | null>(null)
  const [responseStatus, setResponseStatus] = useState<"success" | "error" | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "PERSONAL_TRAINER",
      bio: "",
      certifications: "",
      specialties: "",
      gymId: gyms.length ? String(gyms[0].id) : undefined,
    },
  })

  const selectedRole = form.watch("role")

  const roleHighlights = useMemo(() => {
    switch (selectedRole) {
      case "STAFF":
        return [
          "Gestiona operaciones internas y soporte a usuarios",
          "Control de accesos y seguimiento general",
        ]
      case "SPINNING":
        return [
          "Crea y administra tu calendario de clases",
          "Visualiza asistentes y confirma su participación",
        ]
      case "PILATES":
        return [
          "Planifica sesiones y rutinas específicas",
          "Comparte notas de progreso con los alumnos",
        ]
      case "YOGA":
        return [
          "Diseña sesiones temáticas y secuencias",
          "Envía recomendaciones de respiración y mindfulness",
        ]
      case "CROSSFIT":
        return [
          "Administra WODs personalizados",
          "Seguimiento de PRs y métricas de rendimiento",
        ]
      case "NUTRITION":
        return [
          "Accede a dietas personalizadas y registra ajustes",
          "Comparte recomendaciones de hábitos saludables",
        ]
      default:
        return [
          "Crea rutinas personalizadas para tus atletas",
          "Comparte notas y seguimiento de objetivos",
        ]
    }
  }, [selectedRole])

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true)
    setResponseMessage(null)
    setResponseStatus(null)

    try {
      const response = await fetch("/api/coach/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim().toLowerCase(),
          password: values.password,
          role: values.role,
          gymId: values.gymId ? Number(values.gymId) : undefined,
          bio: values.bio?.trim() || undefined,
          certifications: values.certifications?.trim() || undefined,
          specialties: values.specialties
            ? values.specialties
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean)
            : undefined,
        }),
      })

      const result = await response.json()

      if (response.ok) {
        setResponseMessage(
          "¡Listo! Recibimos tu solicitud. En cuanto un administrador la apruebe podrás acceder a tu panel de coach."
        )
        setResponseStatus("success")
        form.reset()
        router.prefetch("/gym-coach")
      } else {
        setResponseMessage(result.error ?? "Ocurrió un error inesperado")
        setResponseStatus("error")
      }
    } catch (error) {
      console.error("Error submitting coach registration", error)
      setResponseMessage("No pudimos enviar la solicitud. Inténtalo de nuevo más tarde.")
      setResponseStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="border-2 border-border/70 bg-card/90 backdrop-blur">
      <CardHeader>
        <CardTitle>Formulario de Registro para Coaches</CardTitle>
        <CardDescription>
          Completa la información para solicitar acceso como entrenador. El equipo de Tessalp
          revisará tus datos antes de aprobar tu cuenta.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre completo</Label>
              <Input id="name" placeholder="Ej. Ana García" {...form.register("name")} />
              {form.formState.errors.name && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="coach@tugym.com"
                {...form.register("email")}
              />
              {form.formState.errors.email && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" type="password" {...form.register("password")} />
              {form.formState.errors.password && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
              <Input id="confirmPassword" type="password" {...form.register("confirmPassword")} />
              {form.formState.errors.confirmPassword && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Rol principal</Label>
              <Select
                defaultValue={form.getValues("role")}
                onValueChange={(value) => form.setValue("role", value as FormValues["role"])}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un rol" />
                </SelectTrigger>
                <SelectContent>
                  {coachRoles.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.role && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.role.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Gimnasio afiliado (opcional)</Label>
              <Select
                value={form.watch("gymId") ?? ""}
                onValueChange={(value) =>
                  form.setValue("gymId", value === "" ? undefined : value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un gimnasio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Sin afiliación</SelectItem>
                  {gyms.map((gym) => (
                    <SelectItem key={gym.id} value={String(gym.id)}>
                      {gym.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="bio">Biografía (opcional)</Label>
              <Textarea
                id="bio"
                rows={5}
                placeholder="Comparte tu experiencia y enfoque de entrenamiento"
                {...form.register("bio")}
              />
              {form.formState.errors.bio && (
                <p className="text-xs text-destructive">{form.formState.errors.bio.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="certifications">Certificaciones (opcional)</Label>
              <Textarea
                id="certifications"
                rows={5}
                placeholder="Menciona certificaciones relevantes"
                {...form.register("certifications")}
              />
              {form.formState.errors.certifications && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.certifications.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialties">Especialidades (opcional)</Label>
            <Input
              id="specialties"
              placeholder="Ej. hipertrofia, rehabilitación, nutrición deportiva"
              {...form.register("specialties")}
            />
            <p className="text-xs text-muted-foreground">
              Separa cada especialidad con una coma para que aparezcan como tags en tu perfil.
            </p>
          </div>

          <div className="space-y-3">
            <span className="text-sm font-medium">¿Qué podrás hacer con este rol?</span>
            <div className="flex flex-wrap gap-2">
              {roleHighlights.map((highlight) => (
                <Badge key={highlight} variant="outline" className="text-xs">
                  {highlight}
                </Badge>
              ))}
            </div>
          </div>

          {responseMessage && (
            <div
              className={cn(
                "rounded-lg border px-4 py-3 text-sm",
                responseStatus === "success"
                  ? "border-green-500/40 bg-green-500/10 text-green-500"
                  : "border-destructive/40 bg-destructive/10 text-destructive"
              )}
            >
              {responseMessage}
            </div>
          )}

          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <p className="text-xs text-muted-foreground">
              Al enviar la solicitud aceptas que Tessalp revise tu información antes de otorgar
              acceso completo al panel de entrenador.
            </p>
            <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
              {isSubmitting ? "Enviando..." : "Enviar solicitud"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}



