"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Car, User, LogOut } from "lucide-react"
import { useState } from "react"

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState<"admin" | "user" | null>(null)

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserRole(null)
    // In production, call logout API
  }

  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Car className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">
              Car<span className="text-primary">Bid</span>
            </span>
          </Link>

          <nav className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost">Auctions</Button>
            </Link>

            {isLoggedIn ? (
              <>
                {userRole === "admin" && (
                  <Link href="/admin">
                    <Button variant="ghost">Dashboard</Button>
                  </Link>
                )}
                <Button variant="ghost" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <Link href="/login">
                <Button variant="default">
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
