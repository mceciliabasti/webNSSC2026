import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { InfoIcon } from '../ui/InfoIcon'

type HomeDetailCardProps = {
  title: string
  description: string
  link: string
}

export function HomeDetailCard({ title, description, link }: HomeDetailCardProps) {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    let frame = 0

    const handleScroll = () => {
      if (frame) {
        cancelAnimationFrame(frame)
      }

      frame = window.requestAnimationFrame(() => {
        const nextOffset = Math.max(-10, Math.min(10, window.scrollY * 0.025))
        setOffset(nextOffset)
      })
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      if (frame) {
        cancelAnimationFrame(frame)
      }
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <Link
      to={link}
      className="group section-card-hover rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition"
      style={{ transform: `translate3d(0, ${offset}px, 0)`, willChange: 'transform' }}
    >
      <div className="mb-3 inline-flex rounded-xl bg-brand-sky/10 p-2 text-brand-primary">
        <InfoIcon text={title} className="h-4 w-4" />
      </div>
      <h3 className="text-2xl font-semibold text-slate-900">{title}</h3>
      <p className="mt-3 text-sm text-slate-700">{description}</p>
      <span className="mt-4 inline-flex items-center justify-center rounded-full bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition group-hover:bg-brand-navy group-hover:shadow-md">
        Ir a la página
      </span>
    </Link>
  )
}
