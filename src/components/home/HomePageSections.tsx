import { Link } from 'react-router-dom'
import type { DetailData } from '../../types/content'
import { HomeDetailCard } from '../cards/HomeDetailCard'
import { SiteNavigationBar } from '../layout/SiteNavigationBar'
import { InfoIcon } from '../ui/InfoIcon'

type InstitutionTab = {
  id: string
  label: string
  link: string
  data: DetailData
}

type LevelCardItem = {
  key: string
  title: string
  description: string
  image: string
}

type HomeDetailLink = {
  title: string
  description: string
  link: string
}

type ResourceLink = {
  title: string
  description: string
  href: string
}

export function HomeHeroSection({
  backgroundImage,
  title,
  subtitle,
}: {
  backgroundImage: string
  title: string
  subtitle: string
}) {
  return (
    <header className="relative isolate h-[78vh] min-h-[560px] overflow-hidden">
      <img
        src={backgroundImage}
        alt="Institucion Educativa"
        loading="eager"
        decoding="async"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,24,40,0.34)_0%,rgba(13,24,40,0.6)_100%)]" />

      <div className="relative mx-auto flex h-full w-full max-w-6xl flex-col justify-between px-5 py-8 sm:px-8 md:px-12 md:py-10">
        <div className="pt-16 md:pt-20">
          <SiteNavigationBar />
        </div>

        <div className="max-w-3xl pb-8 pt-8 text-white md:pt-10">
          <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-white/90 backdrop-blur-sm">
            Comunidad educativa Vedruna
          </div>
          <div className="mt-5 rounded-[2rem] border border-white/18 bg-white/12 p-6 shadow-[0_18px_50px_-35px_rgba(15,23,42,0.7)] backdrop-blur-md md:p-8">
            <h1 className="text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.02em] sm:text-5xl md:text-6xl">
              {title}
            </h1>
            <p className="mt-5 text-2xl font-normal text-white/90">{subtitle}</p>
            <span className="mt-7 block h-1 w-28 rounded-full bg-brand-primary" />
          </div>
        </div>
      </div>
    </header>
  )
}

export function HomeHistorySection({
  image,
  title,
  description,
  bullets,
  link,
}: {
  image: string
  title: string
  description: string
  bullets: string[]
  link: string
}) {
  return (
    <section id="nuestra-historia" className="scroll-mt-28 grid gap-8 rounded-[1.75rem] border border-slate-200/70 bg-white/94 p-6 shadow-[0_14px_45px_-28px_rgba(15,23,42,0.35)] backdrop-blur-sm md:grid-cols-2 md:p-8">
      <img
        src={image}
        alt={title}
        loading="lazy"
        decoding="async"
        className="h-full min-h-64 w-full rounded-2xl object-cover"
      />
      <div>
        <div className="flex items-center gap-3">
          <span className="h-8 w-1.5 rounded-full bg-brand-primary" />
          <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">{title}</h2>
        </div>
        <p className="mt-4 leading-relaxed text-slate-700">{description}</p>
        <ul className="mt-5 space-y-2 text-slate-700">
          {bullets.map((bullet) => (
            <li key={bullet} className="flex gap-2">
              <span className="mt-2 h-2 w-2 rounded-full bg-brand-primary" />
              {bullet}
            </li>
          ))}
        </ul>
        <Link
          to={link}
          className="mt-6 inline-flex items-center justify-center rounded-full bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-navy hover:shadow-md"
        >
          Conocer más
        </Link>
      </div>
    </section>
  )
}

export function InstitutionSection({
  title,
  intro,
  tabs,
  activeInstitutionId,
  activeInstitution,
  onTabChange,
}: {
  title: string
  intro: string
  tabs: InstitutionTab[]
  activeInstitutionId: string
  activeInstitution: InstitutionTab
  onTabChange: (tabId: string) => void
}) {
  return (
    <section id="nuestra-institucion" className="scroll-mt-28 rounded-[1.75rem] border border-slate-200/70 bg-white/94 p-6 shadow-[0_18px_45px_-30px_rgba(15,23,42,0.36)] backdrop-blur-sm md:p-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">{title}</h2>
          <p className="mt-3 text-slate-700">{intro}</p>
        </div>
        <div className="flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-[linear-gradient(180deg,rgba(239,229,215,0.62)_0%,rgba(255,255,255,0.9)_100%)] p-1.5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                activeInstitutionId === tab.id
                  ? 'bg-white text-brand-primary shadow-sm ring-1 ring-slate-200'
                  : 'text-slate-600 hover:bg-white/80 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-6 rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-[0_14px_40px_-30px_rgba(15,23,42,0.32)] md:grid-cols-[1fr_1.1fr] md:p-6">
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <img
            src={activeInstitution.data.image}
            alt={activeInstitution.data.title}
            loading="lazy"
            decoding="async"
            className="h-full min-h-64 w-full object-cover md:max-h-[28rem]"
          />
          <span className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1 text-xs font-semibold tracking-wide text-brand-primary">
            {activeInstitution.label}
          </span>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm md:p-6">
          <h3 className="text-3xl font-semibold text-slate-900">{activeInstitution.data.title}</h3>
          <p className="mt-3 leading-relaxed text-slate-700">{activeInstitution.data.subtitle}</p>
          <ul className="mt-5 space-y-2.5 text-sm text-slate-700">
            {(activeInstitution.data.highlights ?? []).slice(0, 4).map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-brand-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <Link
            to={activeInstitution.link}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-navy hover:shadow-md"
          >
            Ver página completa
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export function LevelsSection({
  title,
  intro,
  items,
}: {
  title: string
  intro: string
  items: LevelCardItem[]
}) {
  return (
    <section id="niveles" className="scroll-mt-28">
      <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">{title}</h2>
      <p className="mt-3 text-slate-700">{intro}</p>
      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item.key}
            to={`/nivel/${item.key}`}
            className="group overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white/96 shadow-[0_12px_35px_-26px_rgba(15,23,42,0.3)] transition hover:-translate-y-1 hover:shadow-[0_18px_45px_-30px_rgba(15,23,42,0.38)]"
          >
            <div className="relative">
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                decoding="async"
                className="h-44 w-full object-cover"
              />
            </div>
            <div className="p-5">
              <h3 className="text-2xl font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-700">{item.description}</p>
              <p className="mt-4 text-sm font-semibold text-brand-primary group-hover:text-brand-navy">
                Ver más información
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export function InstitutionalResourcesSection({
  title,
  intro,
  resources,
}: {
  title: string
  intro: string
  resources: ResourceLink[]
}) {
  return (
    <section id="recursos-institucionales" className="scroll-mt-28 rounded-[1.75rem] border border-slate-200/70 bg-white/94 p-6 shadow-[0_18px_45px_-30px_rgba(15,23,42,0.34)] backdrop-blur-sm md:p-8">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">{title}</h2>
        <p className="mt-3 text-slate-700">{intro}</p>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {resources.map((resource) => (
          <a
            key={resource.title}
            href={resource.href}
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl border border-slate-200 bg-white/96 p-5 shadow-[0_10px_28px_-24px_rgba(15,23,42,0.22)] transition hover:-translate-y-1 hover:bg-white hover:shadow-[0_14px_35px_-26px_rgba(15,23,42,0.28)]"
          >
            <h3 className="text-xl font-semibold text-slate-900">{resource.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">{resource.description}</p>
          </a>
        ))}
      </div>
    </section>
  )
}

export function HomeDetailLinksSection({
  cards,
}: {
  cards: HomeDetailLink[]
}) {
  return (
    <section className="grid gap-5 md:grid-cols-2">
      {cards.map((card) => (
        <HomeDetailCard key={card.title} title={card.title} description={card.description} link={card.link} />
      ))}
    </section>
  )
}

export function HomeIntroSection({
  title,
  description,
  secondaryText,
  image,
}: {
  title: string
  description: string
  secondaryText: string
  image: string
}) {
  return (
    <section id="nuestro-colegio" className="scroll-mt-28 grid gap-8 rounded-[1.75rem] border border-slate-200/70 bg-white/92 p-7 shadow-[0_20px_60px_-38px_rgba(15,23,42,0.38)] backdrop-blur-sm lg:grid-cols-[1.05fr_0.95fr] lg:p-10">
      <div className="rounded-[1.5rem] bg-[linear-gradient(180deg,rgba(239,229,215,0.95)_0%,rgba(255,255,255,0.96)_100%)] p-6">
        <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">{title}</h2>
        <p className="mt-4 text-lg leading-relaxed text-slate-700">{description}</p>
        <p className="mt-4 leading-relaxed text-slate-600">{secondaryText}</p>
      </div>
      <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm">
        <div className="relative aspect-video bg-slate-900">
          <img
            src={image}
            alt="Video institucional"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover opacity-70"
          />
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <div className="flex items-center gap-3 rounded-full bg-black/52 px-5 py-3 text-sm text-white backdrop-blur-sm">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              Video institucional próximamente
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function ManagementSection(_props: {
  title?: string
  intro?: string
  members?: Array<{ role: string; description: string }>
}) {
  return null
}

export function HomeSectionIcon({ text }: { text: string }) {
  return (
    <div className="mb-3 inline-flex rounded-xl bg-sand-100 p-2 text-brand-primary shadow-sm">
      <InfoIcon text={text} className="h-4 w-4" />
    </div>
  )
}
