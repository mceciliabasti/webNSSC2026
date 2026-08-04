import { useEffect, useState } from 'react'
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

function useScrollParallax(multiplier = 0.03, maxOffset = 10) {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    let frame = 0

    const handleScroll = () => {
      if (frame) {
        cancelAnimationFrame(frame)
      }

      frame = window.requestAnimationFrame(() => {
        const nextOffset = Math.max(-maxOffset, Math.min(maxOffset, window.scrollY * multiplier))
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
  }, [maxOffset, multiplier])

  return offset
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
  const heroOffset = useScrollParallax(0.12, 30)
  const contentOffset = useScrollParallax(0.06, 16)

  return (
    <header className="relative isolate h-[78vh] min-h-[560px] overflow-hidden">
      <img
        src={backgroundImage}
        alt="Institucion Educativa"
        loading="eager"
        decoding="async"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ transform: `translate3d(0, ${heroOffset}px, 0)`, willChange: 'transform' }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(10,21,42,0.82)_0%,rgba(13,24,40,0.64)_45%,rgba(15,42,96,0.86)_100%)]" />
      <div className="brand-orb absolute -left-8 top-24 h-56 w-56 rounded-full bg-[#2f8d8a]/25 blur-3xl" />
      <div className="brand-orb absolute bottom-12 right-0 h-64 w-64 rounded-full bg-[#d97b2c]/20 blur-3xl" />

      <div className="relative mx-auto flex h-full w-full max-w-6xl flex-col justify-between px-5 py-8 sm:px-8 md:px-12 md:py-10">
        <div className="pt-16 md:pt-20">
          <SiteNavigationBar />
        </div>

        <div className="hero-ambient max-w-3xl pb-8 pt-8 text-white md:pt-10" style={{ transform: `translate3d(0, ${contentOffset}px, 0)`, willChange: 'transform' }}>
          <div className="mt-5 rounded-[2rem] border border-white/18 bg-white/12 p-6 shadow-[0_18px_50px_-35px_rgba(15,23,42,0.7)] backdrop-blur-md md:p-8">
            <h1 className="text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.02em] sm:text-5xl md:text-6xl">
              {title}
            </h1>
            <p className="mt-5 text-xl font-normal text-white/90 sm:text-2xl">{subtitle}</p>
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
  const imageOffset = useScrollParallax(0.06, 18)
  const sectionOffset = useScrollParallax(0.04, 12)

  return (
    <section id="nuestra-historia" className="scroll-mt-28 grid gap-8 rounded-[1.75rem] border border-slate-200/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(248,250,252,0.96))] p-6 shadow-[0_14px_45px_-28px_rgba(15,23,42,0.35)] backdrop-blur-sm section-card-hover md:grid-cols-2 md:p-8" style={{ transform: `translate3d(0, ${sectionOffset}px, 0)`, willChange: 'transform' }}>
      <img
        src={image}
        alt={title}
        loading="lazy"
        decoding="async"
        className="h-full min-h-64 w-full rounded-2xl object-cover"
        style={{ transform: `translate3d(0, ${imageOffset}px, 0)`, willChange: 'transform' }}
      />
      <div>
        <div className="flex items-center gap-3">
          <span className="h-8 w-1.5 rounded-full bg-brand-primary" />
          <h2 className="relative inline-block pb-2 text-3xl font-semibold text-slate-900 after:absolute after:bottom-0 after:left-0 after:h-1 after:w-14 after:rounded-full after:bg-[linear-gradient(90deg,#d97706_0%,#fb7185_100%)] md:text-4xl">{title}</h2>
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
  const sectionOffset = useScrollParallax(0.04, 12)

  return (
    <section id="nuestra-institucion" className="scroll-mt-28 rounded-[1.75rem] border border-slate-200/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.99),rgba(248,250,252,0.95))] p-6 shadow-[0_18px_45px_-30px_rgba(15,23,42,0.36)] backdrop-blur-sm section-card-hover md:p-8" style={{ transform: `translate3d(0, ${sectionOffset}px, 0)`, willChange: 'transform' }}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="relative inline-block pb-2 text-3xl font-semibold text-slate-900 after:absolute after:bottom-0 after:left-0 after:h-1 after:w-14 after:rounded-full after:bg-[linear-gradient(90deg,#d97706_0%,#fb7185_100%)] md:text-4xl">{title}</h2>
          <p className="mt-3 text-slate-700">{intro}</p>
        </div>
        <div className="flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-[linear-gradient(180deg,rgba(75,106,147,0.1)_0%,rgba(255,255,255,0.9)_100%)] p-1.5">
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
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm md:p-6">
          <h3 className="text-3xl font-semibold text-slate-900">{activeInstitution.data.title}</h3>
          <p
            className={`mt-3 leading-relaxed text-slate-700 ${
              activeInstitution.id === 'perfil' ? 'whitespace-pre-line text-justify' : ''
            }`}
          >
            {activeInstitution.data.subtitle}
          </p>

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
            className="mt-6 inline-flex items-center justify-center rounded-full bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-navy hover:shadow-md"
          >
            Ver página completa
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
  const sectionOffset = useScrollParallax(0.03, 10)

  return (
    <section id="niveles" className="scroll-mt-28" style={{ transform: `translate3d(0, ${sectionOffset}px, 0)`, willChange: 'transform' }}>
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="relative inline-block pb-2 text-3xl font-semibold text-slate-900 after:absolute after:bottom-0 after:left-0 after:h-1 after:w-14 after:rounded-full after:bg-[linear-gradient(90deg,#d97706_0%,#fb7185_100%)] md:text-4xl">{title}</h2>
      </div>
      <p className="mt-3 text-slate-700">{intro}</p>
      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item.key}
            to={`/nivel/${item.key}`}
            className="group section-card-hover overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white/96 shadow-[0_12px_35px_-26px_rgba(15,23,42,0.3)] transition"
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
              <span className="mt-4 inline-flex items-center justify-center rounded-full bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition group-hover:bg-brand-navy group-hover:shadow-md">
                Ver más información
              </span>
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
  const sectionOffset = useScrollParallax(0.04, 12)

  return (
    <section id="recursos-institucionales" className="scroll-mt-28 rounded-[1.75rem] border border-slate-200/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(248,250,252,0.95))] p-6 shadow-[0_18px_45px_-30px_rgba(15,23,42,0.34)] backdrop-blur-sm section-card-hover md:p-8" style={{ transform: `translate3d(0, ${sectionOffset}px, 0)`, willChange: 'transform' }}>
      <div className="max-w-2xl">
        <h2 className="relative inline-block pb-2 text-3xl font-semibold text-slate-900 after:absolute after:bottom-0 after:left-0 after:h-1 after:w-14 after:rounded-full after:bg-[linear-gradient(90deg,#d97706_0%,#fb7185_100%)] md:text-4xl">{title}</h2>
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
  const mediaOffset = useScrollParallax(0.07, 20)
  const sectionOffset = useScrollParallax(0.04, 12)

  return (
    <section id="nuestro-colegio" className="scroll-mt-28 grid gap-8 rounded-[1.75rem] border border-slate-200/70 bg-white/92 p-7 shadow-[0_20px_60px_-38px_rgba(15,23,42,0.38)] backdrop-blur-sm section-card-hover lg:grid-cols-[1.05fr_0.95fr] lg:p-10" style={{ transform: `translate3d(0, ${sectionOffset}px, 0)`, willChange: 'transform' }}>
      <div className="rounded-[1.5rem] bg-[linear-gradient(180deg,rgba(239,229,215,0.95)_0%,rgba(255,255,255,0.96)_100%)] p-6">
        <h2 className="relative inline-block pb-2 text-3xl font-semibold text-slate-900 after:absolute after:bottom-0 after:left-0 after:h-1 after:w-14 after:rounded-full after:bg-[linear-gradient(90deg,#d97706_0%,#fb7185_100%)] md:text-4xl">{title}</h2>
        <p className="mt-4 text-lg leading-relaxed text-slate-700">{description}</p>
        <p className="mt-4 leading-relaxed text-slate-600">{secondaryText}</p>
      </div>
      <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm" style={{ transform: `translate3d(0, ${mediaOffset}px, 0)`, willChange: 'transform' }}>
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
