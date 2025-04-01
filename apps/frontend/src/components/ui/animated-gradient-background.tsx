"use client"

import { useRef, useEffect } from "react"

export function AnimatedGradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)
  const gradientRef = useRef<CanvasGradient | null>(null)
  const animationRef = useRef<number>(0)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext("2d")
    if (!context) return

    contextRef.current = context

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      createGradient()
    }

    const createGradient = () => {
      if (!contextRef.current || !canvas) return

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      const gradient = contextRef.current.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        Math.max(canvas.width, canvas.height) / 1.5,
      )

      gradient.addColorStop(0, "rgba(59, 130, 246, 0.4)") // Blue
      gradient.addColorStop(0.5, "rgba(37, 99, 235, 0.2)") // Darker blue
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)") // Transparent

      gradientRef.current = gradient
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      }
    }

    const animate = () => {
      if (!contextRef.current || !canvas || !gradientRef.current) return

      contextRef.current.clearRect(0, 0, canvas.width, canvas.height)

      // Create dynamic gradient based on mouse position
      const mouseX = mouseRef.current.x || canvas.width / 2
      const mouseY = mouseRef.current.y || canvas.height / 2

      const gradient = contextRef.current.createRadialGradient(
        mouseX,
        mouseY,
        0,
        mouseX,
        mouseY,
        Math.max(canvas.width, canvas.height) / 2,
      )

      gradient.addColorStop(0, "rgba(59, 130, 246, 0.3)") // Blue
      gradient.addColorStop(0.3, "rgba(37, 99, 235, 0.1)") // Darker blue
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)") // Transparent

      contextRef.current.fillStyle = gradient
      contextRef.current.fillRect(0, 0, canvas.width, canvas.height)

      // Add a second gradient for more depth
      const secondGradient = contextRef.current.createRadialGradient(
        canvas.width - mouseX / 3,
        canvas.height - mouseY / 3,
        0,
        canvas.width - mouseX / 3,
        canvas.height - mouseY / 3,
        canvas.width,
      )

      secondGradient.addColorStop(0, "rgba(79, 70, 229, 0.2)") // Indigo
      secondGradient.addColorStop(0.5, "rgba(67, 56, 202, 0.1)") // Darker indigo
      secondGradient.addColorStop(1, "rgba(0, 0, 0, 0)") // Transparent

      contextRef.current.fillStyle = secondGradient
      contextRef.current.fillRect(0, 0, canvas.width, canvas.height)

      animationRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener("resize", resizeCanvas)
    window.addEventListener("mousemove", handleMouseMove)

    resizeCanvas()
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full -z-10 opacity-80" />
}

