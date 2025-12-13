"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Shield, 
  Star,
  Dumbbell,
  CheckCircle,
  Users,
  Zap
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function AuthPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [activeTab, setActiveTab] = useState("login")
  const [isLoginLoading, setIsLoginLoading] = useState(false)
  const [isRegisterLoading, setIsRegisterLoading] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)
  const [registerError, setRegisterError] = useState<string | null>(null)
  const [registerSuccess, setRegisterSuccess] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.currentTarget as HTMLFormElement
    const formData = new FormData(form)
    const email = String(formData.get("loginEmail") || "").trim()
    const password = String(formData.get("loginPassword") || "")

    if (!email || !password) {
      setLoginError("Ingresa tu correo y contraseña")
      return
    }

    const authenticate = async () => {
      try {
        setLoginError(null)
        setIsLoginLoading(true)
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        })

        const data = await response.json()

        if (!response.ok) {
          setLoginError(data.error ?? "No se pudo iniciar sesión")
          return
        }

        // Limpiar membresías del localStorage si el usuario no tiene sesión previa
        // Esto asegura que usuarios nuevos no vean datos de pruebas anteriores
        const userSession = document.cookie.includes('user_session')
        if (!userSession) {
          localStorage.removeItem('user-memberships')
        }
        
        router.push("/profile")
        router.refresh()
      } catch (error) {
        console.error("Login error", error)
        setLoginError("No se pudo iniciar sesión")
      } finally {
        setIsLoginLoading(false)
      }
    }

    authenticate()
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.currentTarget as HTMLFormElement
    const formData = new FormData(form)
    const firstName = String(formData.get("firstName") || "").trim()
    const lastName = String(formData.get("lastName") || "").trim()
    const email = String(formData.get("registerEmail") || "").trim()
    const password = String(formData.get("registerPassword") || "")
    const confirmPassword = String(formData.get("confirmPasswordField") || "")

    if (password !== confirmPassword) {
      setRegisterError("Las contraseñas no coinciden")
      return
    }

    if (!firstName || !lastName || !email || !password) {
      setRegisterError("Todos los campos son obligatorios")
      return
    }

    const register = async () => {
      try {
        setRegisterError(null)
        setRegisterSuccess(null)
        setIsRegisterLoading(true)

        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ firstName, lastName, email, password }),
        })

        const data = await response.json()
        if (!response.ok) {
          // Mostrar errores específicos de validación si están disponibles
          if (data.details) {
            const errorMessages: string[] = []
            if (data.details.firstName) errorMessages.push(...data.details.firstName)
            if (data.details.lastName) errorMessages.push(...data.details.lastName)
            if (data.details.email) errorMessages.push(...data.details.email)
            if (data.details.password) errorMessages.push(...data.details.password)
            
            if (errorMessages.length > 0) {
              setRegisterError(errorMessages.join(". "))
            } else {
              setRegisterError(data.error ?? "No se pudo crear la cuenta")
            }
          } else {
            setRegisterError(data.error ?? "No se pudo crear la cuenta")
          }
          return
        }

        setRegisterSuccess("Cuenta creada. Iniciando sesión...")

        const loginResponse = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        })

        if (loginResponse.ok) {
          // Limpiar membresías del localStorage para usuarios nuevos
          localStorage.removeItem('user-memberships')
          localStorage.removeItem('gym-cart')
          router.push("/profile")
          router.refresh()
        } else {
          setRegisterSuccess("Cuenta creada. Inicia sesión con tu correo y contraseña.")
          setActiveTab("login")
        }
      } catch (error) {
        console.error("Register error", error)
        setRegisterError("No se pudo crear la cuenta")
      } finally {
        setIsRegisterLoading(false)
      }
    }

    register()
  }

  const handleGuestLogin = () => {
    // Lógica para entrar como guest
    console.log("Guest login")
    // Redirigir al Gym Coach desbloqueado también para guests
    router.push("/gym-coach")
  }

  const benefits = [
    {
      icon: <Dumbbell className="h-5 w-5" />,
      title: "Rutinas Personalizadas",
      description: "Accede a rutinas creadas por nuestros expertos"
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Comunidad Exclusiva",
      description: "Conecta con otros miembros y comparte tu progreso"
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Gym Coach AI",
      description: "Tu entrenador personal inteligente disponible 24/7"
    },
    {
      icon: <Star className="h-5 w-5" />,
      title: "Progreso Tracking",
      description: "Sigue tu evolución con métricas detalladas"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-primary/30" />
        <img
          src="/people-training-in-modern-gym.jpg"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Dumbbell className="h-12 w-12 text-primary" />
            <h1 className="text-5xl md:text-6xl font-bold text-balance">
              Únete a <span className="text-primary">Tessalp Gyms</span>
            </h1>
          </div>
          <p className="text-xl text-muted-foreground mb-8 text-balance">
            Accede a funcionalidades exclusivas y personaliza tu experiencia fitness
          </p>
        </div>
      </section>

      {/* Auth Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Benefits */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-4">¿Por qué crear una cuenta?</h2>
                <p className="text-muted-foreground text-lg">
                  Desbloquea funcionalidades premium y personaliza tu experiencia de entrenamiento
                </p>
              </div>

              <div className="grid gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-card/50 backdrop-blur">
                    <div className="text-primary">{benefit.icon}</div>
                    <div>
                      <h3 className="font-semibold mb-1">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Gym Coach AI Premium</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Acceso completo al entrenador personal inteligente con rutinas personalizadas
                </p>
                <Badge className="bg-primary text-primary-foreground">
                  Solo para miembros registrados
                </Badge>
              </div>
            </div>

            {/* Auth Forms */}
            <div className="space-y-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
                  <TabsTrigger value="register">Registrarse</TabsTrigger>
                </TabsList>

                {/* Login Tab */}
                <TabsContent value="login" className="space-y-4">
                  <Card className="border-border/50 bg-card/80 backdrop-blur">
                    <CardHeader>
                      <CardTitle className="text-2xl">Bienvenido de vuelta</CardTitle>
                      <p className="text-muted-foreground">
                        Inicia sesión para acceder a tu cuenta
                      </p>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="email"
                              name="loginEmail"
                              type="email"
                              placeholder="tu@email.com"
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="password">Contraseña</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="password"
                              name="loginPassword"
                              type={showPassword ? "text" : "password"}
                              placeholder="••••••••"
                              className="pl-10 pr-10"
                              required
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="remember" className="rounded" />
                            <Label htmlFor="remember" className="text-sm">Recordarme</Label>
                          </div>
                          <Link href="#" className="text-sm text-primary hover:underline">
                            ¿Olvidaste tu contraseña?
                          </Link>
                        </div>
                        {loginError && (
                          <p className="text-sm text-destructive">{loginError}</p>
                        )}
                        <Button type="submit" className="w-full gap-2" disabled={isLoginLoading}>
                          {isLoginLoading ? "Iniciando..." : "Iniciar Sesión"}
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Register Tab */}
                <TabsContent value="register" className="space-y-4">
                  <Card className="border-border/50 bg-card/80 backdrop-blur">
                    <CardHeader>
                      <CardTitle className="text-2xl">Crear cuenta</CardTitle>
                      <p className="text-muted-foreground">
                        Únete a nuestra comunidad fitness
                      </p>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleRegister} className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">Nombre</Label>
                            <div className="relative">
                              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="firstName"
                                name="firstName"
                                placeholder="Tu nombre"
                                className="pl-10"
                                required
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Apellido</Label>
                            <div className="relative">
                              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="lastName"
                                name="lastName"
                                placeholder="Tu apellido"
                                className="pl-10"
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="registerEmail">Email</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="registerEmail"
                              name="registerEmail"
                              type="email"
                              placeholder="tu@email.com"
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="registerPassword">Contraseña</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="registerPassword"
                              name="registerPassword"
                              type={showPassword ? "text" : "password"}
                              placeholder="••••••••"
                              className="pl-10 pr-10"
                              required
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="confirmPassword"
                              name="confirmPasswordField"
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="••••••••"
                              className="pl-10 pr-10"
                              required
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="terms" className="rounded" required />
                          <Label htmlFor="terms" className="text-sm">
                            Acepto los <Link href="#" className="text-primary hover:underline">términos y condiciones</Link>
                          </Label>
                        </div>
                        {registerError && (
                          <p className="text-sm text-destructive">{registerError}</p>
                        )}
                        {registerSuccess && (
                          <p className="text-sm text-green-600">{registerSuccess}</p>
                        )}
                        <Button type="submit" className="w-full gap-2" disabled={isRegisterLoading}>
                          {isRegisterLoading ? "Creando cuenta..." : "Crear Cuenta"}
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Guest Option */}
              <Card className="border-border/50 bg-card/80 backdrop-blur">
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <div className="flex items-center justify-center gap-2">
                      <User className="h-5 w-5 text-muted-foreground" />
                      <h3 className="text-lg font-semibold">¿Solo quieres explorar?</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Puedes acceder como invitado para ver el contenido básico
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={handleGuestLogin}
                      className="w-full gap-2"
                    >
                      <User className="h-4 w-4" />
                      Entrar como Invitado
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      * Acceso limitado a funcionalidades básicas
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-dashed border-primary/40 bg-card/70 backdrop-blur">
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <div className="flex items-center justify-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-semibold">¿Eres entrenador o coach?</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Crea tu perfil profesional, gestiona rutinas de tus atletas y administra tus
                      clases desde un panel dedicado.
                    </p>
                    <Link href="/coach/register">
                      <Button className="w-full gap-2">
                        <Star className="h-4 w-4" />
                        Registrarme como Coach
                      </Button>
                    </Link>
                    <p className="text-xs text-muted-foreground">
                      Revisaremos tu información y te avisaremos cuando tu cuenta esté aprobada.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Home */}
      <div className="pb-8 text-center">
        <Link href="/">
          <Button variant="ghost" className="gap-2">
            <ArrowRight className="h-4 w-4 rotate-180" />
            Volver al Inicio
          </Button>
        </Link>
      </div>
    </div>
  )
}
