"use client"

import { useRef, useEffect, useState } from "react"

export function Grid3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)
  const animationRef = useRef<number>(0)
  const pointsRef = useRef<{ x: number; y: number; z: number }[]>([])
  const angleRef = useRef(0)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return
    
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext("2d")
    if (!context) return

    contextRef.current = context

    // Define perspective at this scope level so it's accessible to all functions
    const perspective = 800

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      generatePoints()
    }

    const generatePoints = () => {
      if (!canvas) return

      pointsRef.current = []
      const gridSize = 20
      const spacing = 100

      for (let x = -gridSize; x <= gridSize; x++) {
        for (let z = -gridSize; z <= gridSize; z++) {
          pointsRef.current.push({
            x: x * spacing,
            y: 0,
            z: z * spacing,
          })
        }
      }
    }

    const project = (x: number, y: number, z: number) => {
      if (!canvas) return { x: 0, y: 0, scale: 0 }

      // Use perspective from parent scope
      // Ensure z is never equal to -perspective to avoid division by zero
      const adjustedZ = z === -perspective ? -perspective + 0.1 : z
      const depth = perspective / (perspective + adjustedZ)

      return {
        x: canvas.width / 2 + x * depth,
        y: canvas.height / 2 + y * depth,
        scale: depth,
      }
    }

    const animate = () => {
      if (!contextRef.current || !canvas) return

      contextRef.current.clearRect(0, 0, canvas.width, canvas.height)

      // Rotate points
      angleRef.current += 0.002
      const cosA = Math.cos(angleRef.current)
      const sinA = Math.sin(angleRef.current)

      // Sort points by z-index for proper rendering
      const sortedPoints = [...pointsRef.current]
        .map((point) => {
          // Rotate around Y axis
          const rotX = point.x * cosA - point.z * sinA
          const rotZ = point.z * cosA + point.x * sinA

          // Apply a wave effect
          const y = point.y + Math.sin(rotX / 100 + angleRef.current * 5) * 20

          return { x: rotX, y, z: rotZ - 500 } // Move grid back in z space
        })
        .filter((point) => point.z > -perspective + 1) // Filter out points behind or too close to camera
        .sort((a, b) => a.z - b.z)

      // Draw grid
      contextRef.current.strokeStyle = "rgba(59, 130, 246, 0.2)"
      contextRef.current.lineWidth = 1

      // Draw horizontal lines
      for (let i = 0; i < sortedPoints.length; i += 40) {
        contextRef.current.beginPath()

        for (let j = 0; j < 40 && i + j < sortedPoints.length; j++) {
          const point = sortedPoints[i + j]
          const projected = project(point.x, point.y, point.z)

          if (j === 0) {
            contextRef.current.moveTo(projected.x, projected.y)
          } else {
            contextRef.current.lineTo(projected.x, projected.y)
          }
        }

        contextRef.current.stroke()
      }

      // Draw vertical lines
      for (let i = 0; i < 40; i++) {
        contextRef.current.beginPath()

        for (let j = 0; j < sortedPoints.length; j += 40) {
          if (i + j < sortedPoints.length) {
            const point = sortedPoints[i + j]
            const projected = project(point.x, point.y, point.z)

            if (j === 0) {
              contextRef.current.moveTo(projected.x, projected.y)
            } else {
              contextRef.current.lineTo(projected.x, projected.y)
            }
          }
        }

        contextRef.current.stroke()
      }

      // Draw points
      sortedPoints.forEach((point) => {
        const projected = project(point.x, point.y, point.z)
        const alpha = Math.min(1, Math.max(0, (point.z + 1000) / 1500))

        // Only draw points with positive scale/depth
        if (projected.scale > 0) {
          const radius = Math.max(0.5, 1.5 * projected.scale) // Ensure radius is always positive

          contextRef.current!.fillStyle = `rgba(59, 130, 246, ${alpha * 0.5})`
          contextRef.current!.beginPath()
          contextRef.current!.arc(projected.x, projected.y, radius, 0, Math.PI * 2)
          contextRef.current!.fill()
        }
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener("resize", resizeCanvas)

    resizeCanvas()
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationRef.current)
    }
  }, [isClient])

  if (!isClient) {
    return <div className="fixed inset-0 w-full h-full -z-20 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5" />
  }

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full -z-20 opacity-40" />
}

