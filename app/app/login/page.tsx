import { LoginForm } from "@/components/login-form"
import { Header } from "@/components/header"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">Sign In</h1>
            <p className="text-muted-foreground">Access your account to start bidding</p>
          </div>
          <LoginForm />
        </div>
      </main>
    </div>
  )
}
