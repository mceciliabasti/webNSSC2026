import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const topNavItems = [
  { to: '/#inicio', label: 'Inicio' },
  { to: '/#nuestro-colegio', label: 'Nuestro Colegio' },
  { to: '/#nuestra-historia', label: 'Historia' },
  { to: '/#nuestra-institucion', label: 'Institución' },
  { to: '/#equipo-gestion', label: 'Equipo' },
  { to: '/inscripciones', label: 'Inscripciones' },
  { to: '/#contacto', label: 'Contacto' },
]

const levelNavItems = [
  { to: '/nivel/inicial', label: 'Nivel Inicial' },
  { to: '/nivel/primario', label: 'Nivel Primario' },
  { to: '/nivel/secundario', label: 'Nivel Secundario' },
]

const institutionalResourceItems = [
  { to: '/#recursos-institucionales', label: 'Recursos institucionales' },
  { to: '/detalle/mision', label: 'Misión' },
  { to: '/detalle/vision', label: 'Visión' },
  { to: '/detalle/pastoral', label: 'Pastoral' },
]

const levelResourceItems = [
  { to: '/nivel/inicial#recursos-nivel', label: 'Inicial' },
  { to: '/nivel/primario#recursos-nivel', label: 'Primario' },
  { to: '/nivel/secundario#recursos-nivel', label: 'Secundario' },
]

export function SiteNavigationBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')
  const [showScrollToTop, setShowScrollToTop] = useState(false)
  const location = useLocation()
  const sectionIds = useMemo(
    () => topNavItems.map((item) => item.to.split('#')[1]).filter((id): id is string => Boolean(id)),
    [],
  )

  const sectionIdFromTo = (to: string) => to.split('#')[1] ?? ''
  const isLevelsActive = location.pathname.startsWith('/nivel/') || (location.pathname === '/' && activeSection === 'niveles')
  const isResourcesActive = location.pathname.startsWith('/nivel/') || (location.pathname === '/' && activeSection === 'recursos-institucionales')

  useEffect(() => {
    const hashSection = location.hash.replace('#', '')
    if (location.pathname === '/' && hashSection) {
      setActiveSection(hashSection)
      return
    }

    if (location.pathname === '/') {
      setActiveSection('inicio')
      return
    }

    setActiveSection('')
  }, [location.hash, location.pathname])

  useEffect(() => {
    if (location.pathname !== '/') return

    const computeActiveSection = () => {
      const offset = window.scrollY + 160
      let current = 'inicio'

      sectionIds.forEach((sectionId) => {
        const element = document.getElementById(sectionId)
        if (element && element.offsetTop <= offset) {
          current = sectionId
        }
      })

      setActiveSection(current)
    }

    computeActiveSection()
    window.addEventListener('scroll', computeActiveSection, { passive: true })

    return () => {
      window.removeEventListener('scroll', computeActiveSection)
    }
  }, [location.pathname, sectionIds])

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 320)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  return (
    <>
      <div className="sticky top-4 z-40 w-full rounded-2xl border border-white/35 bg-white/92 p-2 shadow-[0_18px_50px_-35px_rgba(15,23,42,0.7)] backdrop-blur-md md:fixed md:left-1/2 md:top-4 md:w-[calc(100%-2rem)] md:max-w-6xl md:-translate-x-1/2">
      <div className="flex items-center justify-between gap-3 px-2 py-1">
        <nav className="hidden items-center gap-1 md:flex">
          {topNavItems.map((item) => {
            const sectionId = sectionIdFromTo(item.to)
            const isSectionLink = item.to.includes('#')
            const isActive = isSectionLink
              ? location.pathname === '/' && activeSection === sectionId
              : location.pathname === item.to

            return (
              <Link
                key={item.to}
                to={item.to}
                className={`rounded-xl px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-brand-primary text-white'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {item.label}
              </Link>
            )
          })}

          <div className="group relative">
            <button
              type="button"
              className={`rounded-xl px-3 py-2 text-sm font-medium transition ${
                isLevelsActive
                  ? 'bg-brand-primary text-white'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              }`}
              aria-haspopup="menu"
            >
              Niveles
            </button>

            <div className="invisible absolute left-0 top-[calc(100%+0.4rem)] z-20 w-56 translate-y-1 rounded-xl border border-slate-200 bg-white p-1.5 opacity-0 shadow-lg transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              {levelNavItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="block rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="group relative">
            <button
              type="button"
              className={`rounded-xl px-3 py-2 text-sm font-medium transition ${
                isResourcesActive
                  ? 'bg-brand-primary text-white'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              }`}
              aria-haspopup="menu"
            >
              Recursos
            </button>

            <div className="invisible absolute right-0 top-[calc(100%+0.4rem)] z-20 w-64 translate-y-1 rounded-xl border border-slate-200 bg-white p-1.5 opacity-0 shadow-lg transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              <div className="mb-1 border-b border-slate-100 px-2 pb-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Institucionales</p>
                {institutionalResourceItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="mt-1 block rounded-lg px-2 py-2 text-sm text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="px-2 pt-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Por nivel</p>
                {levelResourceItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="mt-1 block rounded-lg px-2 py-2 text-sm text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>

        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-100 md:hidden"
          aria-expanded={isOpen}
          aria-label="Toggle menu"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <nav className="mt-2 grid gap-1 border-t border-slate-200 px-1 pt-2 md:hidden">
          {topNavItems.map((item) => {
            const sectionId = sectionIdFromTo(item.to)
            const isSectionLink = item.to.includes('#')
            const isActive = isSectionLink
              ? location.pathname === '/' && activeSection === sectionId
              : location.pathname === item.to

            return (
              <Link
                key={item.to}
                to={item.to}
                className={`rounded-xl px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-brand-primary text-white'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {item.label}
              </Link>
            )
          })}

          <details className="rounded-xl border border-slate-200 bg-white">
            <summary className="cursor-pointer list-none rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900">
              Niveles
            </summary>
            <div className="grid gap-1 px-2 pb-2">
              {levelNavItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </details>

          <details className="rounded-xl border border-slate-200 bg-white">
            <summary className="cursor-pointer list-none rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900">
              Recursos
            </summary>
            <div className="grid gap-1 px-2 pb-2">
              {institutionalResourceItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
                >
                  {item.label}
                </Link>
              ))}
              {levelResourceItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </details>
        </nav>
      )}
      </div>

      {showScrollToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-50"
          aria-label="Volver arriba"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M12 19V5M12 5l-6 6M12 5l6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    </>
  )
}
