import { BiddingList } from "@/components/bidding-list"
import { Header } from "@/components/header"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Live Car Auctions</h1>
          <p className="text-muted-foreground">Bid on premium cars from verified sellers</p>
        </div>
        <BiddingList />
      </main>
    </div>
  )
}
