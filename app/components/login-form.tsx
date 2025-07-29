"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { User, Shield } from "lucide-react"

export function LoginForm() {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleLogin = async (e: React.FormEvent, role: "admin" | "user") => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.target as HTMLFormElement)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role }),
      })

      if (response.ok) {
        const data = await response.json()
        toast({
          title: "Login Successful",
          description: `Welcome back, ${data.user.name}!`,
        })

        // Redirect based on role
        if (role === "admin") {
          window.location.href = "/admin"
        } else {
          window.location.href = "/"
        }
      } else {
        throw new Error("Invalid credentials")
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Choose Login Type</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="user" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="user" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              User
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Admin
            </TabsTrigger>
          </TabsList>

          <TabsContent value="user">
            <form onSubmit={(e) => handleLogin(e, "user")} className="space-y-4">
              <div>
                <Label htmlFor="user-email">Email</Label>
                <Input id="user-email" name="email" type="email" placeholder="user@carbid.com" required />
              </div>
              <div>
                <Label htmlFor="user-password">Password</Label>
                <Input id="user-password" name="password" type="password" placeholder="user123" required />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing In..." : "Sign In as User"}
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-4 text-center">Demo: user@carbid.com / user123</p>
          </TabsContent>

          <TabsContent value="admin">
            <form onSubmit={(e) => handleLogin(e, "admin")} className="space-y-4">
              <div>
                <Label htmlFor="admin-email">Email</Label>
                <Input id="admin-email" name="email" type="email" placeholder="admin@carbid.com" required />
              </div>
              <div>
                <Label htmlFor="admin-password">Password</Label>
                <Input id="admin-password" name="password" type="password" placeholder="admin123" required />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing In..." : "Sign In as Admin"}
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-4 text-center">Demo: admin@carbid.com / admin123</p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
