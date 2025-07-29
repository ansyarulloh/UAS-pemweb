"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, DollarSign } from "lucide-react"
import { BidModal } from "./bid-modal"
import Image from "next/image"

interface Car {
  id: number
  make: string
  model: string
  year: number
  description: string
  image_url: string
  starting_bid: number
  current_bid: number
  bid_end_time: string
  status: string
}

export function BiddingList() {
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCar, setSelectedCar] = useState<Car | null>(null)

  useEffect(() => {
    fetchCars()
  }, [])

  const fetchCars = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/cars`)
      const data = await response.json()
      setCars(data.cars)
    } catch (error) {
      console.error("Failed to fetch cars:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatTimeRemaining = (endTime: string) => {
    const now = new Date().getTime()
    const end = new Date(endTime).getTime()
    const diff = end - now

    if (diff <= 0) return "Ended"

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    if (days > 0) return `${days}d ${hours}h`
    if (hours > 0) return `${hours}h ${minutes}m`
    return `${minutes}m`
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <div className="h-48 bg-muted rounded-t-lg"></div>
            <CardHeader>
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-3 bg-muted rounded w-full mb-2"></div>
              <div className="h-3 bg-muted rounded w-2/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <Card key={car.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48">
              <Image
                src={car.image_url || "/placeholder.svg"}
                alt={`${car.make} ${car.model}`}
                fill
                className="object-cover"
              />
              <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
                <Clock className="h-3 w-3 mr-1" />
                {formatTimeRemaining(car.bid_end_time)}
              </Badge>
            </div>

            <CardHeader>
              <CardTitle className="text-lg">
                {car.year} {car.make} {car.model}
              </CardTitle>
              <p className="text-sm text-muted-foreground line-clamp-2">{car.description}</p>
            </CardHeader>

            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Starting Bid</span>
                  <span className="font-medium">${car.starting_bid.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Current Bid</span>
                  <span className="font-bold text-primary text-lg">${car.current_bid.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>

            <CardFooter>
              <Button
                className="w-full"
                onClick={() => setSelectedCar(car)}
                disabled={formatTimeRemaining(car.bid_end_time) === "Ended"}
              >
                <DollarSign className="h-4 w-4 mr-2" />
                Place Bid
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {selectedCar && (
        <BidModal
          car={selectedCar}
          isOpen={!!selectedCar}
          onClose={() => setSelectedCar(null)}
          onBidPlaced={fetchCars}
        />
      )}
    </>
  )
}
