import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, ShoppingCart, Users, TrendingUp, DollarSign, Eye } from "lucide-react"

// Mock data
const stats = {
  totalProducts: 156,
  totalOrders: 89,
  totalUsers: 234,
  revenue: 45678.9,
  pendingOrders: 12,
  completedOrders: 77,
}

const recentOrders = [
  { id: "ORD-001", customer: "Juan Pérez", total: 299.99, status: "PENDING" },
  { id: "ORD-002", customer: "María García", total: 189.99, status: "COMPLETED" },
  { id: "ORD-003", customer: "Carlos López", total: 459.99, status: "PENDING" },
  { id: "ORD-004", customer: "Ana Martín", total: 329.99, status: "COMPLETED" },
]

const topProducts = [
  { name: "Grifo Monomando Premium", sales: 45, revenue: 8549.55 },
  { name: "Columna de Ducha Luxury", sales: 32, revenue: 9599.68 },
  { name: "Grifo Lavabo Dorado", sales: 28, revenue: 4479.72 },
  { name: "Grifo Cocina Negro Mate", sales: 24, revenue: 4559.76 },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Resumen general de tu tienda Leonkrav</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Productos</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
            <p className="text-xs text-muted-foreground">+12% desde el mes pasado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pedidos Totales</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
            <p className="text-xs text-muted-foreground">+8% desde el mes pasado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">+15% desde el mes pasado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{stats.revenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+22% desde el mes pasado</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Pedidos Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-gray-600">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">€{order.total}</p>
                    <Badge
                      variant={order.status === "COMPLETED" ? "default" : "secondary"}
                      className={order.status === "COMPLETED" ? "bg-green-100 text-green-800" : ""}
                    >
                      {order.status === "PENDING" ? "Pendiente" : "Completado"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Productos Más Vendidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gold-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-gold-800">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.sales} ventas</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">€{product.revenue.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <Package className="w-8 h-8 text-gold-600 mb-2" />
              <h3 className="font-medium">Agregar Producto</h3>
              <p className="text-sm text-gray-600">Añadir nuevo producto al catálogo</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <Eye className="w-8 h-8 text-gold-600 mb-2" />
              <h3 className="font-medium">Ver Pedidos</h3>
              <p className="text-sm text-gray-600">Gestionar pedidos pendientes</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <TrendingUp className="w-8 h-8 text-gold-600 mb-2" />
              <h3 className="font-medium">Ver Estadísticas</h3>
              <p className="text-sm text-gray-600">Analizar rendimiento de ventas</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
