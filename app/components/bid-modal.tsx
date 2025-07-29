"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { DollarSign } from "lucide-react"

interface Car {
  id: number
  make: string
  model: string
  year: number
  current_bid: number
}

interface BidModalProps {
  car: Car
  isOpen: boolean
  onClose: () => void
  onBidPlaced: () => void
}

export function BidModal({ car, isOpen, onClose, onBidPlaced }: BidModalProps) {
  const [bidAmount, setBidAmount] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const amount = Number.parseFloat(bidAmount)
    if (amount <= car.current_bid) {
      toast({
        title: "Invalid Bid",
        description: "Your bid must be higher than the current bid",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/bids`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          car_id: car.id,
          bid_amount: amount,
          user_id: 1, // In production, get from auth context
        }),
      })

      if (response.ok) {
        toast({
          title: "Bid Placed Successfully!",
          description: `Your bid of $${amount.toLocaleString()} has been placed.`,
        })
        onBidPlaced()
        onClose()
        setBidAmount("")
      } else {
        throw new Error("Failed to place bid")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to place bid. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Place Bid - {car.year} {car.make} {car.model}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-center p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">Current Highest Bid</p>
            <p className="text-2xl font-bold text-primary">${car.current_bid.toLocaleString()}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="bidAmount">Your Bid Amount</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="bidAmount"
                  type="number"
                  placeholder={`Minimum: ${car.current_bid + 1}`}
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  className="pl-10"
                  min={car.current_bid + 1}
                  step="1"
                  required
                />
              </div>
            </div>

            <div className="flex space-x-2">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? "Placing Bid..." : "Place Bid"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
