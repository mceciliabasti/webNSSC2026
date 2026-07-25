import type { IconName } from '../../types/content'

type InfoIconProps = {
  text: string
  className?: string
}

const sectionIconMap: Record<string, IconName> = {
  'Misión institucional': 'heart',
  'Visión institucional': 'heart',
  'Perfil Vedruna': 'user',
  'Orígenes y fundación': 'book',
  'Casa propia y crecimiento institucional': 'book',
  'Identidad pastoral': 'heart',
  'Propuesta por niveles': 'board',
  'Familia Vedruna': 'heart',
  'Pilares de la propuesta educativa': 'board',
  'Organización horaria': 'clock',
  'Ejes y proyectos destacados': 'spark',
  'Horario y dinámica escolar': 'clock',
  'Propuesta curricular': 'board',
  'Proyectos y vida escolar': 'spark',
  'Información general': 'info',
  'Régimen preuniversitario (5to año)': 'board',
  'Proyectos destacados': 'spark',
}

const factIconMap: Record<string, IconName> = {
  Enfoque: 'heart',
  Modelo: 'board',
  Objetivo: 'spark',
  Propuesta: 'board',
  Escala: 'info',
  Compromiso: 'heart',
  Identidad: 'user',
  Valores: 'heart',
  Proyección: 'spark',
  Fundación: 'book',
  Sede: 'book',
  Trayectoria: 'book',
  Eje: 'heart',
  Alcance: 'info',
  Comunidad: 'heart',
  Legado: 'book',
  Misión: 'heart',
  Red: 'info',
  Edades: 'user',
  'Turno mañana': 'clock',
  Extendida: 'clock',
  Jornada: 'clock',
  Currículo: 'board',
  Evaluación: 'info',
  Ingreso: 'clock',
  Inglés: 'board',
  '5° año': 'board',
}

function iconTypeFromText(text: string) {
  if (sectionIconMap[text]) return sectionIconMap[text]
  if (factIconMap[text]) return factIconMap[text]

  const value = text.toLowerCase()
  if (value.includes('horario') || value.includes('jornada')) return 'clock'
  if (value.includes('proyecto') || value.includes('vida escolar')) return 'spark'
  if (value.includes('pastoral') || value.includes('mision') || value.includes('misión') || value.includes('vision') || value.includes('visión')) return 'heart'
  if (value.includes('perfil') || value.includes('alumno')) return 'user'
  if (value.includes('historia') || value.includes('origen')) return 'book'
  if (value.includes('curricular') || value.includes('propuesta')) return 'board'
  return 'info'
}

export function InfoIcon({ text, className = 'h-5 w-5' }: InfoIconProps) {
  const type = iconTypeFromText(text)

  if (type === 'clock') {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v6l4 2" />
      </svg>
    )
  }

  if (type === 'spark') {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2l2.2 5.3L20 9l-4.6 3.8L16.8 19 12 15.8 7.2 19l1.4-6.2L4 9l5.8-1.7z" />
      </svg>
    )
  }

  if (type === 'heart') {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 20s-7-4.6-9-8.7A5.3 5.3 0 0 1 12 5a5.3 5.3 0 0 1 9 6.3C19 15.4 12 20 12 20z" />
      </svg>
    )
  }

  if (type === 'user') {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c1.6-3.5 4.4-5 8-5s6.4 1.5 8 5" />
      </svg>
    )
  }

  if (type === 'book') {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 5h8a3 3 0 0 1 3 3v11H7a3 3 0 0 0-3 3z" />
        <path d="M20 5h-8a3 3 0 0 0-3 3v11h8a3 3 0 0 1 3 3z" />
      </svg>
    )
  }

  if (type === 'board') {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="14" rx="2" />
        <path d="M8 21h8M12 18v3" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 10v6M12 7h.01" />
    </svg>
  )
}
