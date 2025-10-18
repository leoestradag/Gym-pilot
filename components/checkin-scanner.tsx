"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { QrCode, Upload, CheckCircle, XCircle } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export function CheckInScanner() {
  const { toast } = useToast()
  const [scanStatus, setScanStatus] = useState<"idle" | "success" | "error">("idle")
  const [scannedMember, setScannedMember] = useState<string | null>(null)

  const handleScan = () => {
    // Simulate QR scan
    setTimeout(() => {
      const success = Math.random() > 0.2 // 80% success rate
      if (success) {
        const memberName = "Carlos Rodríguez"
        setScannedMember(memberName)
        setScanStatus("success")
        toast({
          title: "Check-in exitoso",
          description: `${memberName} ha sido registrado correctamente.`,
        })
      } else {
        setScanStatus("error")
        toast({
          title: "Error en check-in",
          description: "Código QR inválido o membresía vencida.",
          variant: "destructive",
        })
      }

      // Reset after 3 seconds
      setTimeout(() => {
        setScanStatus("idle")
        setScannedMember(null)
      }, 3000)
    }, 1000)
  }

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-foreground">Escáner QR</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Scanner Display */}
          <div
            className={`relative aspect-square max-w-md mx-auto rounded-lg border-2 border-dashed overflow-hidden transition-colors ${
              scanStatus === "idle"
                ? "border-border bg-muted/20"
                : scanStatus === "success"
                  ? "border-primary bg-primary/5"
                  : "border-destructive bg-destructive/5"
            }`}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {scanStatus === "idle" && (
                <div className="text-center space-y-4">
                  <QrCode className="h-24 w-24 text-muted-foreground mx-auto" />
                  <p className="text-sm text-muted-foreground">Esperando código QR...</p>
                </div>
              )}

              {scanStatus === "success" && (
                <div className="text-center space-y-4">
                  <CheckCircle className="h-24 w-24 text-primary mx-auto" />
                  <div>
                    <p className="text-lg font-semibold text-foreground">{scannedMember}</p>
                    <p className="text-sm text-primary">Check-in exitoso</p>
                  </div>
                </div>
              )}

              {scanStatus === "error" && (
                <div className="text-center space-y-4">
                  <XCircle className="h-24 w-24 text-destructive mx-auto" />
                  <div>
                    <p className="text-lg font-semibold text-foreground">Error</p>
                    <p className="text-sm text-destructive">Código inválido</p>
                  </div>
                </div>
              )}
            </div>

            {/* Scanning Animation */}
            {scanStatus === "idle" && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="absolute inset-8 border-2 border-primary/20 rounded-lg" />
                <div className="absolute top-8 left-8 h-4 w-4 border-t-2 border-l-2 border-primary" />
                <div className="absolute top-8 right-8 h-4 w-4 border-t-2 border-r-2 border-primary" />
                <div className="absolute bottom-8 left-8 h-4 w-4 border-b-2 border-l-2 border-primary" />
                <div className="absolute bottom-8 right-8 h-4 w-4 border-b-2 border-r-2 border-primary" />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 max-w-md mx-auto">
            <Button onClick={handleScan} disabled={scanStatus !== "idle"} className="flex-1 gap-2">
              <QrCode className="h-4 w-4" />
              {scanStatus === "idle" ? "Simular Escaneo" : "Procesando..."}
            </Button>
            <Button variant="outline" disabled={scanStatus !== "idle"} className="gap-2 bg-transparent">
              <Upload className="h-4 w-4" />
              Subir Imagen
            </Button>
          </div>

          {/* Info */}
          <div className="max-w-md mx-auto p-4 rounded-lg bg-muted/20 border border-border/50">
            <p className="text-sm text-muted-foreground text-center">
              Los miembros pueden generar su código QR desde la app móvil de Tessalp Gyms
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
