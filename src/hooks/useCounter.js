import { useState, useEffect, useRef } from 'react'

export function useCounter(end, duration = 2000, start = 0) {
  const [count, setCount] = useState(start)
  const ref = useRef(null)
  const startedRef = useRef(false)

  const startCounting = () => {
    if (startedRef.current) return
    startedRef.current = true
    const startTime = Date.now()
    const tick = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(start + (end - start) * eased))
      if (progress < 1) ref.current = requestAnimationFrame(tick)
    }
    ref.current = requestAnimationFrame(tick)
  }

  useEffect(() => {
    return () => { if (ref.current) cancelAnimationFrame(ref.current) }
  }, [])

  return { count, startCounting }
}
