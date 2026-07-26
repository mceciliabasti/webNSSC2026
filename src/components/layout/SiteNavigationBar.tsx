import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation } from 'react-router-dom'

const topNavItems = [
  { to: '/#inicio', label: 'Inicio' },
  { to: '/#nuestro-colegio', label: 'Nuestro Colegio' },
  { to: '/#nuestra-historia', label: 'Historia' },
  { to: '/#nuestra-institucion', label: 'Institución' },
  { to: '/inscripciones', label: 'Inscripciones' },
  { to: '/#contacto', label: 'Contacto' },
]

const CONTACT_LINK = '/#contacto'

const levelNavItems = [
  { to: '/nivel/inicial', label: 'Nivel Inicial' },
  { to: '/nivel/primario', label: 'Nivel Primario' },
  { to: '/nivel/secundario', label: 'Nivel Secundario' },
  { to: '/autoridades', label: 'Autoridades' },
]

const resourceNavItems = [
  { to: '/recursos', label: 'Institucionales' },
  { to: '/nivel/inicial#recursos-nivel', label: 'Inicial' },
  { to: '/nivel/primario#recursos-nivel', label: 'Primaria' },
  { to: '/nivel/secundario#recursos-nivel', label: 'Secundaria' },
]

export function SiteNavigationBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')
  const [showScrollToTop, setShowScrollToTop] = useState(false)
  const location = useLocation()
  const mainNavItems = useMemo(() => topNavItems.filter((item) => item.to !== CONTACT_LINK), [])
  const contactNavItem = useMemo(() => topNavItems.find((item) => item.to === CONTACT_LINK), [])
  const sectionIds = useMemo(
    () => topNavItems.map((item) => item.to.split('#')[1]).filter((id): id is string => Boolean(id)),
    [],
  )

  const sectionIdFromTo = (to: string) => to.split('#')[1] ?? ''
  const isLevelsActive =
    location.pathname.startsWith('/nivel/') || location.pathname === '/autoridades' || (location.pathname === '/' && activeSection === 'niveles')
  const isResourcesActive = location.pathname.startsWith('/nivel/') || location.pathname === '/recursos'

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

  const navContent = (
    <>
      <div className="fixed left-1/2 top-4 z-[2147483647] isolate w-[calc(100%-1rem)] -translate-x-1/2 rounded-[1.5rem] border border-slate-200/70 bg-white/90 p-2.5 shadow-[0_18px_50px_-35px_rgba(15,23,42,0.42)] backdrop-blur-md md:w-[calc(100%-2rem)] md:max-w-6xl">
      <div className="flex items-center justify-between gap-3 px-2 py-1">
        <nav className="hidden items-center gap-1.5 md:flex">
          {mainNavItems.map((item) => {
            const sectionId = sectionIdFromTo(item.to)
            const isSectionLink = item.to.includes('#')
            const isActive = isSectionLink
              ? location.pathname === '/' && activeSection === sectionId
              : location.pathname === item.to

            return (
              <Link
                key={item.to}
                to={item.to}
                className={`rounded-full px-3.5 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-brand-primary text-white shadow-sm'
                    : 'text-slate-700 hover:bg-sand-100 hover:text-slate-900'
                }`}
              >
                {item.label}
              </Link>
            )
          })}

          <div className="group relative">
            <button
              type="button"
              className={`rounded-full px-3.5 py-2 text-sm font-medium transition ${
                isLevelsActive
                  ? 'bg-brand-primary text-white shadow-sm'
                  : 'text-slate-700 hover:bg-sand-100 hover:text-slate-900'
              }`}
              aria-haspopup="menu"
            >
              Niveles
            </button>

            <div className="invisible absolute left-0 top-[calc(100%+0.4rem)] z-20 w-56 translate-y-1 rounded-[1.25rem] border border-slate-200 bg-white/96 p-1.5 opacity-0 shadow-[0_16px_35px_-24px_rgba(15,23,42,0.35)] transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              {levelNavItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="block rounded-xl px-3 py-2 text-sm text-slate-700 transition hover:bg-sand-100 hover:text-slate-900"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="group relative">
            <button
              type="button"
              className={`rounded-full px-3.5 py-2 text-sm font-medium transition ${
                isResourcesActive
                  ? 'bg-brand-primary text-white shadow-sm'
                  : 'text-slate-700 hover:bg-sand-100 hover:text-slate-900'
              }`}
              aria-haspopup="menu"
            >
              Recursos
            </button>

            <div className="invisible absolute right-0 top-[calc(100%+0.4rem)] z-20 w-64 translate-y-1 rounded-[1.25rem] border border-slate-200 bg-white/96 p-1.5 opacity-0 shadow-[0_16px_35px_-24px_rgba(15,23,42,0.35)] transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              {resourceNavItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="block rounded-xl px-2 py-2 text-sm text-slate-700 transition hover:bg-sand-100 hover:text-slate-900"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {contactNavItem && (() => {
            const sectionId = sectionIdFromTo(contactNavItem.to)
            const isSectionLink = contactNavItem.to.includes('#')
            const isActive = isSectionLink
              ? location.pathname === '/' && activeSection === sectionId
              : location.pathname === contactNavItem.to

            return (
              <Link
                key={contactNavItem.to}
                to={contactNavItem.to}
                className={`rounded-full px-3.5 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-brand-primary text-white shadow-sm'
                    : 'text-slate-700 hover:bg-sand-100 hover:text-slate-900'
                }`}
              >
                {contactNavItem.label}
              </Link>
            )
          })()}
        </nav>

        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:bg-sand-100 md:hidden"
          aria-expanded={isOpen}
          aria-label="Toggle menu"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <nav className="mt-2 grid gap-1.5 border-t border-slate-200 px-1 pt-2 md:hidden">
          {mainNavItems.map((item) => {
            const sectionId = sectionIdFromTo(item.to)
            const isSectionLink = item.to.includes('#')
            const isActive = isSectionLink
              ? location.pathname === '/' && activeSection === sectionId
              : location.pathname === item.to

            return (
              <Link
                key={item.to}
                to={item.to}
                className={`rounded-full px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-brand-primary text-white shadow-sm'
                    : 'text-slate-700 hover:bg-sand-100 hover:text-slate-900'
                }`}
              >
                {item.label}
              </Link>
            )
          })}

          <details className="rounded-[1.25rem] border border-slate-200 bg-white/96">
            <summary className="cursor-pointer list-none rounded-[1.25rem] px-3 py-2 text-sm font-medium text-slate-700 hover:bg-sand-100 hover:text-slate-900">
              Niveles
            </summary>
            <div className="grid gap-1 px-2 pb-2">
              {levelNavItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="rounded-xl px-3 py-2 text-sm text-slate-700 transition hover:bg-sand-100 hover:text-slate-900"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </details>

          <details className="rounded-[1.25rem] border border-slate-200 bg-white/96">
            <summary className="cursor-pointer list-none rounded-[1.25rem] px-3 py-2 text-sm font-medium text-slate-700 hover:bg-sand-100 hover:text-slate-900">
              Recursos
            </summary>
            <div className="grid gap-1 px-2 pb-2">
              {resourceNavItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="rounded-xl px-3 py-2 text-sm text-slate-700 transition hover:bg-sand-100 hover:text-slate-900"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </details>

          {contactNavItem && (() => {
            const sectionId = sectionIdFromTo(contactNavItem.to)
            const isSectionLink = contactNavItem.to.includes('#')
            const isActive = isSectionLink
              ? location.pathname === '/' && activeSection === sectionId
              : location.pathname === contactNavItem.to

            return (
              <Link
                key={contactNavItem.to}
                to={contactNavItem.to}
                className={`rounded-full px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-brand-primary text-white shadow-sm'
                    : 'text-slate-700 hover:bg-sand-100 hover:text-slate-900'
                }`}
              >
                {contactNavItem.label}
              </Link>
            )
          })()}
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

  if (typeof document === 'undefined') {
    return navContent
  }

  return createPortal(navContent, document.body)
}
