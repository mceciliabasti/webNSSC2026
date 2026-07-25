import { Link } from 'react-router-dom'

export function SiteFooter() {
  return (
    <footer id="contacto" className="bg-slate-900 text-slate-100">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-3 md:px-12">
        <div>
          <h3 className="text-xl font-semibold">Contacto</h3>
          <p className="mt-4 text-sm text-slate-300">Av. Crámer 2370 (C1428CTL) - C.A.B.A., Argentina</p>
          <p className="mt-2 text-sm text-slate-300">+54 11 4781-1277 / 4783-8560 / 4788-9707</p>
          <p className="mt-2 text-sm text-slate-300">info@sagradodebelgrano.edu.ar</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold">Enlaces Rápidos</h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
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
            <li>
              <Link to="/inscripciones" className="hover:text-white">Inscripciones</Link>
            </li>
            <li>
              <Link to="/admisiones/inicial" className="hover:text-white">Admisiones Inicial</Link>
            </li>
            <li>
              <Link to="/admisiones/primaria" className="hover:text-white">Admisiones Primaria</Link>
            </li>
            <li>
              <Link to="/admisiones/secundaria" className="hover:text-white">Admisiones Secundaria</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold">Síguenos</h3>
          <div className="mt-4 flex items-center gap-3">
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
          <p className="mt-5 text-xs text-slate-400">
            © 2026 Colegio Nuestra Señora del Sagrado Corazón. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
