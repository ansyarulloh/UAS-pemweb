"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Car, DollarSign, Users, TrendingUp } from "lucide-react"
import { AddCarModal } from "./add-car-modal"

export function AdminDashboard() {
  const [showAddCar, setShowAddCar] = useState(false)
  const [stats, setStats] = useState({
    totalCars: 0,
    activeBids: 0,
    totalUsers: 0,
    revenue: 0,
  })

  useEffect(() => {
    // Mock stats - replace with real API calls
    setStats({
      totalCars: 12,
      activeBids: 45,
      totalUsers: 128,
      revenue: 2450000,
    })
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your car auction platform</p>
        </div>
        <Button onClick={() => setShowAddCar(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Car
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cars</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCars}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Bids</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeBids}</div>
            <p className="text-xs text-muted-foreground">+12% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">+8 new this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.revenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Management Tabs */}
      <Tabs defaultValue="cars" className="space-y-4">
        <TabsList>
          <TabsTrigger value="cars">Manage Cars</TabsTrigger>
          <TabsTrigger value="bids">View Bids</TabsTrigger>
          <TabsTrigger value="users">Manage Users</TabsTrigger>
        </TabsList>

        <TabsContent value="cars" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Car Listings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Mock car listings */}
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">2022 BMW M3</h3>
                    <p className="text-sm text-muted-foreground">Current bid: $52,000</p>
                  </div>
                  <Badge variant="default">Active</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">2023 Mercedes AMG GT</h3>
                    <p className="text-sm text-muted-foreground">Current bid: $89,000</p>
                  </div>
                  <Badge variant="default">Active</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bids" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Bids</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">John Doe</h3>
                    <p className="text-sm text-muted-foreground">Bid $52,000 on BMW M3</p>
                  </div>
                  <span className="text-sm text-muted-foreground">2 min ago</span>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">Jane Smith</h3>
                    <p className="text-sm text-muted-foreground">Bid $89,000 on Mercedes AMG GT</p>
                  </div>
                  <span className="text-sm text-muted-foreground">5 min ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">John Doe</h3>
                    <p className="text-sm text-muted-foreground">john@example.com</p>
                  </div>
                  <Badge variant="outline">User</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">Jane Smith</h3>
                    <p className="text-sm text-muted-foreground">jane@example.com</p>
                  </div>
                  <Badge variant="outline">User</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {showAddCar && <AddCarModal isOpen={showAddCar} onClose={() => setShowAddCar(false)} />}
    </div>
  )
}
