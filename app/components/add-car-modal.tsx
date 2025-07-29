"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

interface AddCarModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddCarModal({ isOpen, onClose }: AddCarModalProps) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.target as HTMLFormElement)
    const carData = {
      make: formData.get("make") as string,
      model: formData.get("model") as string,
      year: Number.parseInt(formData.get("year") as string),
      description: formData.get("description") as string,
      starting_bid: Number.parseFloat(formData.get("starting_bid") as string),
      bid_end_time: new Date(formData.get("bid_end_time") as string).toISOString(),
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/cars`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(carData),
      })

      if (response.ok) {
        toast({
          title: "Car Added Successfully!",
          description: "The new car listing has been created.",
        })
        onClose()
      } else {
        throw new Error("Failed to add car")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add car. Please try again.",
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
          <DialogTitle>Add New Car</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="make">Make</Label>
              <Input id="make" name="make" placeholder="BMW" required />
            </div>
            <div>
              <Label htmlFor="model">Model</Label>
              <Input id="model" name="model" placeholder="M3" required />
            </div>
          </div>

          <div>
            <Label htmlFor="year">Year</Label>
            <Input id="year" name="year" type="number" placeholder="2023" min="1900" max="2024" required />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe the car's condition, features, etc."
              required
            />
          </div>

          <div>
            <Label htmlFor="starting_bid">Starting Bid ($)</Label>
            <Input id="starting_bid" name="starting_bid" type="number" placeholder="50000" min="1" step="1" required />
          </div>

          <div>
            <Label htmlFor="bid_end_time">Auction End Time</Label>
            <Input id="bid_end_time" name="bid_end_time" type="datetime-local" required />
          </div>

          <div className="flex space-x-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Adding..." : "Add Car"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
