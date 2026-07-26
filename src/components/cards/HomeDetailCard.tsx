import { Link } from 'react-router-dom'
import { InfoIcon } from '../ui/InfoIcon'

type HomeDetailCardProps = {
  title: string
  description: string
  link: string
}

export function HomeDetailCard({ title, description, link }: HomeDetailCardProps) {
  return (
    <Link
      to={link}
      className="rounded-[2rem] border border-slate-200/70 bg-white/96 p-6 shadow-[0_12px_35px_-26px_rgba(15,23,42,0.3)] transition hover:-translate-y-1 hover:shadow-[0_18px_45px_-30px_rgba(15,23,42,0.38)]"
    >
      <div className="mb-3 inline-flex rounded-xl bg-sand-100 p-2 text-brand-primary shadow-sm">
        <InfoIcon text={title} className="h-4 w-4" />
      </div>
      <h3 className="text-2xl font-semibold text-slate-900">{title}</h3>
      <p className="mt-3 text-sm text-slate-700">{description}</p>
      <p className="mt-4 text-sm font-semibold text-brand-primary">Ir a la página</p>
    </Link>
  )
}
