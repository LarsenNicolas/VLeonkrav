import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, DollarSign, ShoppingCart, Users, Package } from "lucide-react"

// Mock data
const monthlyStats = {
  revenue: 45678.9,
  revenueChange: 22.5,
  orders: 89,
  ordersChange: 8.2,
  customers: 234,
  customersChange: 15.3,
  products: 156,
  productsChange: 12.1,
}

const salesData = [
  { month: "Enero", revenue: 32450, orders: 67 },
  { month: "Febrero", revenue: 38920, orders: 78 },
  { month: "Marzo", revenue: 45678, orders: 89 },
]

const topCategories = [
  { name: "Cocina", sales: 45, percentage: 35 },
  { name: "Baño", sales: 38, percentage: 30 },
  { name: "Ducha", sales: 28, percentage: 22 },
  { name: "Accesorios", sales: 17, percentage: 13 },
]

const topCustomers = [
  { name: "Juan Pérez", orders: 8, total: 2340.5 },
  { name: "María García", orders: 6, total: 1890.75 },
  { name: "Carlos López", orders: 5, total: 1650.25 },
  { name: "Ana Martín", orders: 4, total: 1420.8 },
]

export default function StatsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Estadísticas</h1>
        <p className="text-gray-600">Análisis detallado del rendimiento de tu tienda</p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos del Mes</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{monthlyStats.revenue.toLocaleString()}</div>
            <div className="flex items-center space-x-1 text-xs">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-green-600">+{monthlyStats.revenueChange}%</span>
              <span className="text-muted-foreground">vs mes anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pedidos del Mes</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{monthlyStats.orders}</div>
            <div className="flex items-center space-x-1 text-xs">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-green-600">+{monthlyStats.ordersChange}%</span>
              <span className="text-muted-foreground">vs mes anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nuevos Clientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{monthlyStats.customers}</div>
            <div className="flex items-center space-x-1 text-xs">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-green-600">+{monthlyStats.customersChange}%</span>
              <span className="text-muted-foreground">vs mes anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Productos Activos</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{monthlyStats.products}</div>
            <div className="flex items-center space-x-1 text-xs">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-green-600">+{monthlyStats.productsChange}%</span>
              <span className="text-muted-foreground">vs mes anterior</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Tendencia de Ventas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {salesData.map((data, index) => (
                <div key={data.month} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{data.month}</p>
                    <p className="text-sm text-gray-600">{data.orders} pedidos</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">€{data.revenue.toLocaleString()}</p>
                    <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="bg-gold-600 h-2 rounded-full"
                        style={{ width: `${(data.revenue / 50000) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Categorías Más Vendidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCategories.map((category) => (
                <div key={category.name} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{category.name}</p>
                    <p className="text-sm text-gray-600">{category.sales} ventas</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary">{category.percentage}%</Badge>
                    <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                      <div className="bg-black h-2 rounded-full" style={{ width: `${category.percentage}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Customers */}
      <Card>
        <CardHeader>
          <CardTitle>Mejores Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {topCustomers.map((customer, index) => (
              <div key={customer.name} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-8 h-8 bg-gold-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-gold-800">#{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm">{customer.name}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{customer.orders} pedidos</p>
                <p className="font-bold">€{customer.total.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
