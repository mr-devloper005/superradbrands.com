'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

export function EditableReveal({ children, index = 0, className = '' }: { children: ReactNode; index?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    setMounted(true)
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } }, { threshold: .12 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])
  return <div ref={ref} data-mounted={mounted} className={`editable-reveal ${visible ? 'is-visible' : ''} ${className}`} style={{ transitionDelay: `${Math.min(index * 70, 490)}ms` }}>{children}</div>
}
