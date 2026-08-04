import { Link } from 'react-router-dom'
import nsscLogo from '../../elementos/Logos Sagrado-20260731T055841Z-1-001/Logos Sagrado/EscudoNSSC2.png'
import bicentenarioVedrunaLogo from '../../elementos/Logos Sagrado-20260731T055841Z-1-001/Logos Sagrado/vedruna B.png'

export function SiteFooter() {
  return (
    <footer id="contacto" className="bg-[linear-gradient(135deg,#111827_0%,#172554_100%)] text-slate-100">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-3 md:px-12">
        <div>
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-slate-200">
            <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-white p-1 shadow-[0_8px_22px_-14px_rgba(15,23,42,0.5)] ring-1 ring-white/15">
              <img src={nsscLogo} alt="Escudo del Colegio NSSC" className="h-full w-full object-contain" />
            </span>
            <span className="leading-tight">
              Colegio Nuestra Señora
              <br />
              del Sagrado Corazón
            </span>
          </div>
          <h3 className="mt-4 text-xl font-semibold">Contacto</h3>
          <p className="mt-2 text-sm text-slate-300">Colegio Nuestra Señora del Sagrado Corazón, tradición Vedruna desde 1913.</p>
          <p className="mt-4 text-sm text-slate-300">Av. Crámer 2370 (C1428CTL) - C.A.B.A., Argentina</p>
          <p className="mt-2 text-sm text-slate-300">+54 11 4781-1277 / 4783-8560 / 4788-9707</p>
          <p className="mt-2 text-sm text-slate-300">info@sagradodebelgrano.edu.ar</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold">Enlaces Rápidos</h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li>
              <Link to="/inscripciones" className="hover:text-white">Inscripciones</Link>
            </li>
            <li>
              <Link to="/nivel/inicial" className="hover:text-white">Nivel Inicial</Link>
            </li>
            <li>
              <Link to="/nivel/primario" className="hover:text-white">Nivel Primario</Link>
            </li>
            <li>
              <Link to="/nivel/secundario" className="hover:text-white">Nivel Secundario</Link>
            </li>
            <li>
              <Link to="/detalle/pastoral" className="hover:text-white">Pastoral</Link>
            </li>
            <li>
              <Link to="/#equipo-gestion" className="hover:text-white">Equipo de gestión</Link>
            </li>
            <li>
              <Link to="/#recursos-institucionales" className="hover:text-white">Recursos institucionales</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold">Seguinos</h3>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <a
              href="https://www.instagram.com/colegio.nssc/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-white/10 px-4 py-2 text-sm transition hover:bg-white/20"
            >
              Instagram
            </a>
            <a
              href="https://www.facebook.com/Colegio-Nuestra-Se%C3%B1ora-del-Sagrado-Coraz%C3%B3n-105172268862868"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-white/10 px-4 py-2 text-sm transition hover:bg-white/20"
            >
              Facebook
            </a>
          </div>
          <div className="mt-4 inline-flex items-center rounded-2xl border border-slate-200 bg-white/95 px-2 py-1 shadow-sm">
            <img
              src={bicentenarioVedrunaLogo}
              alt="Logo Bicentenario Vedruna 1826-2026"
              className="h-7 w-auto object-contain"
            />
          </div>
          <p className="mt-5 text-xs text-slate-400">
            © 2026 Colegio Nuestra Señora del Sagrado Corazón. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
