import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface CarouselProps {
  children: React.ReactNode
  className?: string
}

interface CarouselContentProps {
  children: React.ReactNode
  className?: string
}

interface CarouselItemProps {
  children: React.ReactNode
  className?: string
}

interface CarouselPreviousProps {
  onClick?: () => void
  className?: string
}

interface CarouselNextProps {
  onClick?: () => void
  className?: string
}

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("relative", className)}
      {...props}
    />
  )
)
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<HTMLDivElement, CarouselContentProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      {...props}
    />
  )
)
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<HTMLDivElement, CarouselItemProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("min-w-0 shrink-0 grow-0 basis-full", className)}
      {...props}
    />
  )
)
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<HTMLButtonElement, CarouselPreviousProps>(
  ({ className, onClick, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      className={cn(
        "absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-[#222428] p-2 transition-colors hover:bg-gray-600",
        className
      )}
      {...props}
    >
      <ChevronLeft className="h-5 w-5" />
      <span className="sr-only">Previous</span>
    </button>
  )
)
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<HTMLButtonElement, CarouselNextProps>(
  ({ className, onClick, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      className={cn(
        "absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-[#222428] p-2 transition-colors hover:bg-gray-600",
        className
      )}
      {...props}
    >
      <ChevronRight className="h-5 w-5" />
      <span className="sr-only">Next</span>
    </button>
  )
)
CarouselNext.displayName = "CarouselNext"

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
}

