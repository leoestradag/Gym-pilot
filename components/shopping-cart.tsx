"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, X, Trash2, CreditCard } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface CartItem {
  id: string
  name: string
  price: number
  type: "membership"
  plan: string
  gymId: string
  gymName: string
}

interface ShoppingCartProps {
  items: CartItem[]
  onRemoveItem: (id: string) => void
  onClearCart: () => void
}

export function ShoppingCart({ items, onRemoveItem, onClearCart }: ShoppingCartProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const totalPrice = items.reduce((sum, item) => sum + item.price, 0)
    setTotal(totalPrice)
  }, [items])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(price)
  }

  return (
    <div className="fixed top-6 right-6 z-50">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="relative bg-background/80 backdrop-blur border-border/50 hover:bg-background/90"
          >
            <ShoppingCart className="h-4 w-4" />
            {items.length > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {items.length}
              </Badge>
            )}
          </Button>
        </DialogTrigger>
        
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Carrito de Compras
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Tu carrito está vacío</p>
                <p className="text-sm text-muted-foreground">Agrega un plan de membresía para comenzar</p>
              </div>
            ) : (
              <>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <Card key={item.id} className="border border-border/50">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm">{item.name}</h4>
                            <p className="text-xs text-muted-foreground">{item.gymName}</p>
                            <p className="text-xs text-muted-foreground capitalize">{item.plan}</p>
                            <p className="font-bold text-primary mt-1">{formatPrice(item.price)}/mes</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onRemoveItem(item.id)}
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="border-t border-border/50 pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-semibold">Total:</span>
                    <span className="font-bold text-lg text-primary">{formatPrice(total)}/mes</span>
                  </div>
                  
                  <div className="space-y-2">
                    <Button className="w-full" size="lg">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Proceder al Pago
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={onClearCart}
                      className="w-full"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Vaciar Carrito
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
