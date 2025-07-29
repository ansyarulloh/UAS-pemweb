import { AdminDashboard } from "@/components/admin-dashboard"
import { Header } from "@/components/header"

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <AdminDashboard />
      </main>
    </div>
  )
}
