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
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="mb-3 inline-flex rounded-xl bg-brand-sky/10 p-2 text-brand-primary">
        <InfoIcon text={title} className="h-4 w-4" />
      </div>
      <h3 className="text-2xl font-semibold text-slate-900">{title}</h3>
      <p className="mt-3 text-sm text-slate-700">{description}</p>
      <p className="mt-4 text-sm font-semibold text-brand-primary">Ir a la página</p>
    </Link>
  )
}
