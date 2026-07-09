import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, Navigate, Route, Routes, useLocation, useNavigationType, useParams } from 'react-router-dom'
import colegioHero from './imagenes/Colegio/1.png'
import colegioVideo from './imagenes/Colegio/2.png'
import colegioMission from './imagenes/Colegio/3.png'
import colegioVedruna from './imagenes/Colegio/3 (2).png'
import colegioVision from './imagenes/Colegio/4.png'
import colegioProfile from './imagenes/Colegio/5.png'
import colegioHistory from './imagenes/Colegio/7.png'
import colegioPastoral from './imagenes/Colegio/8.png'
import inicialMain from './imagenes/Inicial/PHOTO-2026-06-09-15-15-18 (1).jpg'
import inicialCard from './imagenes/Inicial/Copia de 20260416_152802.jpg'
import inicialGallery1 from './imagenes/Inicial/PHOTO-2026-06-09-15-15-17.jpg'
import inicialGallery2 from './imagenes/Inicial/PHOTO-2026-06-09-15-15-18.jpg'
import inicialGallery3 from './imagenes/Inicial/Copia de 20260406_115022.jpg'
import inicialGallery4 from './imagenes/Inicial/Copia de 20240826_144941.jpg'
import primariaGallery1 from './imagenes/Primaria/IMG_2213.jpg'
import primariaGallery2 from './imagenes/Primaria/IMG_2243.jpg'
import primariaGallery3 from './imagenes/Primaria/IMG_2306.jpg'
import primariaGallery4 from './imagenes/Primaria/IMG_2387.jpg'
import secundariaMain from './imagenes/Secundaria/20250626_095050.jpg'
import secundariaCard from './imagenes/Secundaria/20250626_095831.jpg'
import secundariaGallery1 from './imagenes/Secundaria/20250626_095515.jpg'
import secundariaGallery2 from './imagenes/Secundaria/WhatsApp Image 2025-05-12 at 17.34.24.jpeg'
import secundariaGallery3 from './imagenes/Secundaria/WhatsApp Image 2026-06-23 at 9.16.36 AM.jpeg'
import secundariaGallery4 from './imagenes/Secundaria/WhatsApp Image 2026-06-23 at 9.16.34 AM (2).jpeg'

type SectionData = {
  title: string
  paragraphs?: string[]
  bullets?: string[]
}

type IconName = 'clock' | 'spark' | 'heart' | 'user' | 'book' | 'board' | 'info'

type FactData = {
  label: string
  value: string
}

type GalleryItem = {
  src: string
  alt: string
}

type DetailData = {
  title: string
  subtitle: string
  image: string
  highlights?: string[]
  facts?: FactData[]
  gallery?: GalleryItem[]
  sections: SectionData[]
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
  'Proyección': 'spark',
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

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function InfoIcon({ text, className = 'h-5 w-5' }: { text: string; className?: string }) {
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

const missionData: DetailData = {
  title: 'Nuestra Misión',
  subtitle: 'Educar con alegría en valores para una sociedad fraterna, justa y solidaria.',
  image: colegioMission,
  highlights: [
    'Pedagogía del amor como base institucional.',
    'Formación integral con foco humano y académico.',
    'Compromiso con una sociedad más justa y solidaria.',
  ],
  facts: [
    { label: 'Enfoque', value: 'Valores + Evangelio' },
    { label: 'Modelo', value: 'Educación integral' },
    { label: 'Objetivo', value: 'Transformación social' },
  ],
  sections: [
    {
      title: 'Misión institucional',
      paragraphs: [
        'Educar con alegría en valores, para contribuir a una sociedad más fraterna, justa y solidaria, inspirados en el Evangelio, basados en la pedagogía del amor.',
      ],
    },
  ],
}

const visionData: DetailData = {
  title: 'Nuestra Visión',
  subtitle: 'Educación integral, participativa y personalizada para dignificar la vida.',
  image: colegioVision,
  highlights: [
    'Escuela participativa y personalizada.',
    'Compromiso con la vida, la sociedad y la naturaleza.',
    'Acompañamiento del desarrollo de cada estudiante.',
  ],
  facts: [
    { label: 'Propuesta', value: 'Participativa' },
    { label: 'Escala', value: 'Integral' },
    { label: 'Compromiso', value: 'Vida y naturaleza' },
  ],
  sections: [
    {
      title: 'Visión institucional',
      paragraphs: [
        'Ser un colegio de educación integral, participativa y personalizada que busca generar, dignificar y comprometerse con la vida de las personas, la sociedad y la naturaleza.',
      ],
    },
  ],
}

const profileData: DetailData = {
  title: 'Perfil de Nuestros Alumnos',
  subtitle: 'Rasgos distintivos del estudiante que buscamos formar.',
  image: colegioProfile,
  highlights: [
    'Visión positiva y esperanzadora de la vida.',
    'Pensamiento crítico y trabajo en equipo.',
    'Respeto por las diferencias y compromiso comunitario.',
  ],
  facts: [
    { label: 'Identidad', value: 'Vedruna' },
    { label: 'Valores', value: 'Fraternidad y solidaridad' },
    { label: 'Proyección', value: 'Universitaria y laboral' },
  ],
  sections: [
    {
      title: 'Perfil Vedruna',
      bullets: [
        'Visión positiva y esperanzadora de la vida.',
        'Valores evangélicos, alegría y actuar fraterno y solidario.',
        'Respeto por las diferencias personales, sociales, culturales y religiosas.',
        'Rol protagónico en su proceso educativo y formación integral.',
        'Herramientas para pensamiento crítico e inserción universitaria y laboral.',
        'Compromiso con una mirada holística y el cuidado de la Tierra como Casa Común.',
      ],
    },
  ],
}

const historyData: DetailData = {
  title: 'Nuestra Historia',
  subtitle: 'Memorias de los primeros 113 años del Colegio Nuestra Señora del Sagrado Corazón.',
  image: colegioHistory,
  highlights: [
    'Fundación iniciada en Buenos Aires en 1913.',
    'Crámer 2370 como sede histórica desde 1921.',
    'Más de un siglo educando en valores para la vida.',
  ],
  facts: [
    { label: 'Fundación', value: '1913' },
    { label: 'Sede', value: 'Crámer 2370' },
    { label: 'Trayectoria', value: '113 años' },
  ],
  sections: [
    {
      title: 'Orígenes y fundación',
      paragraphs: [
        'El apostolado docente de las Hermanas Carmelitas de la Caridad Vedruna comienza en Buenos Aires en 1912 con la llegada de las primeras hermanas desde España.',
        'En 1913 se consolidan los inicios del colegio en Belgrano, primero en Crámer 2005 y luego en Vidal 2025, con crecimiento sostenido del nivel primario.',
      ],
    },
    {
      title: 'Casa propia y crecimiento institucional',
      paragraphs: [
        'En 1919 se adquiere el inmueble de Crámer y en 1921 el colegio se traslada definitivamente a Crámer 2370.',
        'Con el paso de los años se expanden aulas, comedor, capilla y nuevas propuestas educativas y pastorales, manteniendo como eje la pedagogía del amor.',
      ],
      bullets: [
        '1949: inauguración del Salón de Actos.',
        '1971: apertura del Jardín de Infantes.',
        '1996: el colegio se transforma en mixto.',
        '2013: celebración de los primeros 100 años.',
      ],
    },
  ],
}

const pastoralData: DetailData = {
  title: 'Pastoral',
  subtitle: 'Síntesis entre fe, cultura y vida en toda la trayectoria escolar.',
  image: colegioPastoral,
  highlights: [
    'Escuela católica con identidad Vedruna.',
    'Acompañamiento espiritual desde Inicial hasta Secundario.',
    'Misión Juvenil Vedruna y acción comunitaria en El Manso.',
  ],
  facts: [
    { label: 'Eje', value: 'Fe, cultura y vida' },
    { label: 'Alcance', value: 'Todos los niveles' },
    { label: 'Comunidad', value: 'MJV + El Manso' },
  ],
  sections: [
    {
      title: 'Identidad pastoral',
      paragraphs: [
        'Somos una escuela católica de la congregación Vedruna. Nuestro carisma se basa en presencia cercana, sencillez y espíritu de familia.',
        'Promovemos una escuela donde aprender y convivir sean parte de un mismo proceso, con alegría compartida, mirada compasiva y compromiso comunitario.',
      ],
    },
    {
      title: 'Propuesta por niveles',
      bullets: [
        'Nivel Inicial: catequesis y celebraciones.',
        'Nivel Primario: catequesis sacramental, reconciliación y eucaristía.',
        'Nivel Secundario: proceso catequístico y confirmación.',
        'Misión Juvenil Vedruna: encuentros, retiros, convivencias y acciones solidarias.',
        'Centro Comunitario El Manso: compromiso social y servicio.',
      ],
    },
  ],
}

const vedrunaData: DetailData = {
  title: 'Somos Vedruna',
  subtitle: 'Una familia educativa con casi 200 años de presencia y servicio.',
  image: colegioVedruna,
  highlights: [
    'Pertenece a la congregación Carmelitas de la Caridad Vedruna.',
    'Presencia en educación, salud y acción social.',
    'Compromiso histórico con los más vulnerables.',
  ],
  facts: [
    { label: 'Legado', value: 'Casi 200 años' },
    { label: 'Misión', value: 'Servicio y fraternidad' },
    { label: 'Red', value: 'Presencia internacional' },
  ],
  sections: [
    {
      title: 'Familia Vedruna',
      paragraphs: [
        'Nuestro colegio forma parte de la Congregación Carmelitas de la Caridad Vedruna, presente en educación, salud y acción social, con foco en los más vulnerables.',
        'En red con comunidades de distintos países, Vedruna sostiene una presencia itinerante, de sobriedad, fraternidad y compromiso evangélico al servicio de la vida.',
      ],
    },
  ],
}

const levelData: Record<string, DetailData> = {
  inicial: {
    title: 'Nivel Inicial',
    subtitle: 'Propuesta Vedruna para salas de 2, 3, 4 y 5 años.',
    image: inicialMain,
    facts: [
      { label: 'Edades', value: '2 a 5 años' },
      { label: 'Turno mañana', value: '08:20 a 12:15' },
      { label: 'Extendida', value: 'Hasta 16:15' },
    ],
    highlights: [
      'Juego como protagonista del aprendizaje.',
      'Vínculo afectivo y mirada personalizada.',
      'Escuela Verde, ESI y talleres de jornada extendida.',
    ],
    gallery: [
      { src: inicialGallery1, alt: 'Actividad de Nivel Inicial 1' },
      { src: inicialGallery2, alt: 'Actividad de Nivel Inicial 2' },
      { src: inicialGallery3, alt: 'Actividad de Nivel Inicial 3' },
      { src: inicialGallery4, alt: 'Actividad de Nivel Inicial 4' },
    ],
    sections: [
      {
        title: 'Pilares de la propuesta educativa',
        bullets: [
          'Comunidad familia-colegio y acompañamiento conjunto.',
          'Vínculo afectivo, escucha y mirada personalizada.',
          'Juego como herramienta central de aprendizaje.',
          'Aprendizaje con sentido y desarrollo de capacidades.',
          'Variedad de propuestas, flexibilidad y equilibrio en experiencias.',
        ],
      },
      {
        title: 'Organización horaria',
        bullets: [
          'Turno mañana (obligatorio): 08:20 a 12:15.',
          'Jornada extendida (optativa): 12:15 a 16:15.',
          'Post-hora: extensión disponible hasta 17:00.',
        ],
      },
      {
        title: 'Ejes y proyectos destacados',
        bullets: [
          'Lengua y Matemática, educación ambiental y digital, juego, inglés y robótica.',
          'Escuela Verde: guardianes del agua, mariposas, huerta y reciclado solidario.',
          'Literatura, música, expresión corporal, ESI y comunidad-familia.',
          'Talleres de jornada extendida: artes visuales, desafíos lúdicos, ciencia y exploración.',
        ],
      },
    ],
  },
  primario: {
    title: 'Nivel Primario',
    subtitle: 'Formación integral, aprendizaje significativo y trabajo colaborativo.',
    image: colegioVedruna,
    facts: [
      { label: 'Jornada', value: '08:15 a 16:15' },
      { label: 'Currículo', value: 'CABA actualizado' },
      { label: 'Evaluación', value: 'Formativa continua' },
    ],
    highlights: [
      'Metodologías activas y aprendizaje contextualizado.',
      'Trabajo colaborativo y robótica por ciclos.',
      'Vida escolar intensa: lectura, deporte, campamentos y música.',
    ],
    gallery: [
      { src: primariaGallery1, alt: 'Actividad de Nivel Primario 1' },
      { src: primariaGallery2, alt: 'Actividad de Nivel Primario 2' },
      { src: primariaGallery3, alt: 'Actividad de Nivel Primario 3' },
      { src: primariaGallery4, alt: 'Actividad de Nivel Primario 4' },
    ],
    sections: [
      {
        title: 'Horario y dinámica escolar',
        bullets: [
          'Jornada completa: 08:15 a 16:15.',
          'Opciones de almuerzo: hogar, comedor o buffet/vianda.',
          'Trabajo educativo conjunto familia-colegio.',
        ],
      },
      {
        title: 'Propuesta curricular',
        paragraphs: [
          'La propuesta se apoya en metodologías activas, aprendizaje contextualizado y evaluación formativa continua para acompañar avances y necesidades.',
        ],
        bullets: [
          'Implementación del nuevo diseño curricular CABA.',
          'Plan Buenos Aires Aprende 2024-2027.',
          'Evaluaciones formativas, pruebas FEPBA y fluidez lectora.',
          'Aprendizaje colaborativo y robótica en ambos ciclos.',
        ],
      },
      {
        title: 'Proyectos y vida escolar',
        bullets: [
          'Escuelas Verdes, ESI, semana de la lectura y semana de la música.',
          'Olimpíadas matemáticas y deportivas, intercolegiales y campamentos.',
          'Concert en inglés y salidas didácticas.',
          'Catequesis familiar, reconciliación y primera comunión.',
          'Talleres extracurriculares: fútbol, patín, taekwondo, arte, ajedrez, teatro musical e inglés.',
        ],
      },
    ],
  },
  secundario: {
    title: 'Nivel Secundario',
    subtitle: 'Pensamiento crítico, autonomía y preparación universitaria-laboral.',
    image: secundariaMain,
    facts: [
      { label: 'Ingreso', value: '07:30' },
      { label: 'Inglés', value: 'Hasta 7 h semanales' },
      { label: '5° año', value: 'Régimen preuniversitario' },
    ],
    highlights: [
      'Formación para pensamiento crítico y autonomía.',
      'Puente universitario-laboral con proyectos reales.',
      'Alto nivel de propuesta en idiomas, tecnología y ciudadanía.',
    ],
    gallery: [
      { src: secundariaGallery1, alt: 'Actividad de Nivel Secundario 1' },
      { src: secundariaGallery2, alt: 'Actividad de Nivel Secundario 2' },
      { src: secundariaGallery3, alt: 'Actividad de Nivel Secundario 3' },
      { src: secundariaGallery4, alt: 'Actividad de Nivel Secundario 4' },
    ],
    sections: [
      {
        title: 'Información general',
        bullets: [
          'Inicio de jornada: 07:30.',
          'Horario extendido variable según año y día de cursada.',
          'Intensificación de lengua extranjera en comprensión y producción oral/escrita.',
          'Carga horaria de inglés: 7 horas en 1er año, 6 horas de 2do a 5to.',
        ],
      },
      {
        title: 'Régimen preuniversitario (5to año)',
        paragraphs: [
          'Funciona como puente hacia estudios superiores y mundo laboral, fortaleciendo autonomía, organización y desarrollo personal e intelectual.',
        ],
        bullets: [
          'Rol protagónico del estudiante en su formación integral.',
          'Herramientas para pensamiento crítico y proyecto de futuro.',
        ],
      },
      {
        title: 'Proyectos destacados',
        bullets: [
          'Artes, ESI, inglés por niveles y encuentros deportivos intercolegiales.',
          'Convenios universitarios: Di Tella, UADE, UB, UCA, UCES y USAL.',
          'Digital Junior UTN, Junior Achievement, ONU modelo y TED-Ed.',
          'PUL (Puente Universitario-Laboral), streaming/taller de radio y museo Vedruna.',
          'Misión Juvenil Vedruna, escuelas verdes y acciones solidarias con Hospital Garrahan.',
        ],
      },
    ],
  },
}

const levelCards = [
  {
    key: 'inicial',
    title: 'Nivel Inicial',
    description: 'Jardín de infantes para salas de 2, 3, 4 y 5 años.',
    image: inicialCard,
  },
  {
    key: 'primario',
    title: 'Nivel Primario',
    description: 'Educación primaria de 1ro a 7mo grado.',
    image: colegioVedruna,
  },
  {
    key: 'secundario',
    title: 'Nivel Secundario',
    description: 'Educación secundaria de 1ro a 5to año.',
    image: secundariaCard,
  },
]

const mainNavItems = [
  { to: '/#inicio', label: 'Inicio' },
  { to: '/#nuestro-colegio', label: 'Nuestro Colegio' },
  { to: '/#nuestra-historia', label: 'Historia' },
  { to: '/#nuestra-institucion', label: 'Institución' },
  { to: '/#niveles', label: 'Niveles' },
  { to: '/inscripciones', label: 'Inscripciones' },
  { to: '/#contacto', label: 'Contacto' },
]

const detailBySlug: Record<string, DetailData> = {
  'nuestra-historia': historyData,
  mision: missionData,
  vision: visionData,
  'perfil-estudiante': profileData,
  pastoral: pastoralData,
  'somos-vedruna': vedrunaData,
}

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwkjN87op04dEUE761SWoOmeGJBk80pL-m0QzEoSNnhuZNDZt1cebEjFKjx3J7YBXK5Ow/exec'

function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/inscripciones" element={<InscripcionesPage />} />
        <Route path="/detalle/:slug" element={<DetailPage />} />
        <Route path="/nivel/:level" element={<LevelPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

function ScrollManager() {
  const location = useLocation()
  const navigationType = useNavigationType()

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      const previous = window.history.scrollRestoration
      window.history.scrollRestoration = 'manual'
      return () => {
        window.history.scrollRestoration = previous
      }
    }
  }, [])

  useEffect(() => {
    const storageKey = `scroll:${location.key}`
    const saveScrollPosition = () => {
      sessionStorage.setItem(storageKey, String(window.scrollY))
    }

    window.addEventListener('scroll', saveScrollPosition, { passive: true })

    return () => {
      saveScrollPosition()
      window.removeEventListener('scroll', saveScrollPosition)
    }
  }, [location.key])

  useEffect(() => {
    const hashTarget = location.hash.replace('#', '')
    if (hashTarget) {
      requestAnimationFrame(() => {
        const element = document.getElementById(decodeURIComponent(hashTarget))
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      })
      return
    }

    const storageKey = `scroll:${location.key}`
    const savedPosition = sessionStorage.getItem(storageKey)

    if (navigationType === 'POP' && savedPosition !== null) {
      window.scrollTo({ top: Number(savedPosition), left: 0, behavior: 'auto' })
      return
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.hash, location.key, navigationType])

  return null
}

function SiteNavigationBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')
  const location = useLocation()
  const sectionIds = useMemo(
    () => mainNavItems.map((item) => item.to.split('#')[1]).filter((id): id is string => Boolean(id)),
    [],
  )

  const sectionIdFromTo = (to: string) => to.split('#')[1] ?? ''

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

  return (
    <div className="w-full rounded-2xl border border-white/35 bg-white/92 p-2 shadow-[0_18px_50px_-35px_rgba(15,23,42,0.7)] backdrop-blur-md">
      <div className="flex items-center justify-between gap-3 px-2 py-1">
        <Link
          to="/"
          className="rounded-xl bg-slate-900 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white"
        >
          Institución Educativa
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {mainNavItems.map((item) => (
            (() => {
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
            })()
          ))}
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
          {mainNavItems.map((item) => (
            (() => {
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
            })()
          ))}
        </nav>
      )}
    </div>
  )
}

function HomePage() {
  const institutionTabs = [
    {
      id: 'mision',
      label: 'Misión',
      link: '/detalle/mision',
      data: missionData,
    },
    {
      id: 'vision',
      label: 'Visión',
      link: '/detalle/vision',
      data: visionData,
    },
    {
      id: 'perfil',
      label: 'Perfil del Estudiante',
      link: '/detalle/perfil-estudiante',
      data: profileData,
    },
  ]
  const [activeInstitutionId, setActiveInstitutionId] = useState(institutionTabs[0].id)
  const activeInstitution =
    institutionTabs.find((item) => item.id === activeInstitutionId) ?? institutionTabs[0]

  return (
    <div id="inicio" className="bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900">
      <header className="relative isolate h-[78vh] min-h-[560px] overflow-hidden">
        <img
          src={colegioHero}
          alt="Institucion Educativa"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/58" />

        <div className="relative mx-auto flex h-full w-full max-w-6xl flex-col justify-between px-5 py-8 sm:px-8 md:px-12 md:py-10">
          <SiteNavigationBar />

          <div className="max-w-3xl pb-8 text-white">
            <h1 className="text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.02em] sm:text-5xl md:text-6xl">
              Colegio Nuestra Señora del Sagrado Corazón
            </h1>
            <p className="mt-5 text-2xl font-normal text-white/90">113 años de historia</p>
            <span className="mt-7 block h-1 w-28 rounded-full bg-brand-primary" />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl space-y-14 px-5 py-14 sm:px-8 md:px-12">
        <section id="nuestro-colegio" className="grid gap-8 rounded-[2rem] border border-slate-200/80 bg-white p-7 shadow-[0_20px_60px_-34px_rgba(15,23,42,0.45)] lg:grid-cols-[1.05fr_0.95fr] lg:p-10">
          <div className="rounded-2xl bg-gradient-to-br from-brand-sky/10 to-white p-6">
            <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">Nuestro Colegio</h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-700">
              Descubrí la experiencia educativa que ofrecemos a nuestros estudiantes y familias.
            </p>
            <p className="mt-4 leading-relaxed text-slate-600">
              Conocé más sobre nuestra comunidad educativa y nuestros valores.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="relative aspect-video bg-slate-900">
              <img
                src={colegioVideo}
                alt="Video institucional"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover opacity-70"
              />
              <div className="absolute inset-0 flex items-center justify-center px-4">
                <div className="flex items-center gap-3 rounded-full bg-black/55 px-5 py-3 text-sm text-white">
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

        <section id="nuestra-historia" className="grid gap-7 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_12px_40px_-22px_rgba(15,23,42,0.38)] md:grid-cols-2 md:p-8">
          <img
            src={historyData.image}
            alt="Nuestra Historia"
            loading="lazy"
            decoding="async"
            className="h-full min-h-64 w-full rounded-2xl object-cover"
          />
          <div>
            <div className="flex items-center gap-3">
              <span className="h-8 w-1.5 rounded-full bg-brand-primary" />
              <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">Nuestra Historia</h2>
            </div>
            <p className="mt-4 leading-relaxed text-slate-700">
              Memorias de nuestros primeros 113 años: orígenes, crecimiento y una pedagogía del amor que sigue viva en cada etapa educativa.
            </p>
            <ul className="mt-5 space-y-2 text-slate-700">
              <li className="flex gap-2">
                <span className="mt-2 h-2 w-2 rounded-full bg-brand-primary" />
                Tradición educativa desde 1913.
              </li>
              <li className="flex gap-2">
                <span className="mt-2 h-2 w-2 rounded-full bg-brand-primary" />
                Crecimiento institucional en clave Vedruna.
              </li>
            </ul>
            <Link
              to="/detalle/nuestra-historia"
              className="mt-6 inline-flex rounded-full bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-navy"
            >
              Conocer más
            </Link>
          </div>
        </section>

        <section id="nuestra-institucion" className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_45px_-28px_rgba(15,23,42,0.45)] md:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">Nuestra Institución</h2>
              <p className="mt-3 text-slate-700">Los pilares que guían nuestra propuesta educativa.</p>
            </div>
            <div className="flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-1.5">
              {institutionTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveInstitutionId(tab.id)}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                    activeInstitutionId === tab.id
                      ? 'bg-white text-brand-primary shadow-sm ring-1 ring-brand-sky/35'
                      : 'text-slate-600 hover:bg-white/80 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-6 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 md:grid-cols-[1fr_1.1fr] md:p-6">
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <img
                src={activeInstitution.data.image}
                alt={activeInstitution.data.title}
                loading="lazy"
                decoding="async"
                className="h-full min-h-72 w-full object-cover"
              />
              <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold tracking-wide text-brand-primary">
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
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-navy"
              >
                Ver página completa
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </section>

        <section id="niveles">
          <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">Nuestros Niveles Educativos</h2>
          <p className="mt-3 text-slate-700">
            Cada nivel cuenta con su página específica, en coherencia con la información del PDF institucional.
          </p>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {levelCards.map((item) => (
              <Link
                key={item.key}
                to={`/nivel/${item.key}`}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="h-44 w-full object-cover"
                  />
                  <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-primary">
                    Nivel
                  </span>
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

        <section className="grid gap-5 md:grid-cols-2">
          <HomeDetailCard
            title="Pastoral"
            description="Síntesis entre fe, cultura y vida en los tres niveles."
            link="/detalle/pastoral"
          />
          <HomeDetailCard
            title="Somos Vedruna"
            description="Identidad institucional y pertenencia a la familia Vedruna."
            link="/detalle/somos-vedruna"
          />
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

function HomeDetailCard(props: { title: string; description: string; link: string }) {
  return (
    <Link
      to={props.link}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="mb-3 inline-flex rounded-xl bg-brand-sky/10 p-2 text-brand-primary">
        <InfoIcon text={props.title} className="h-4 w-4" />
      </div>
      <h3 className="text-2xl font-semibold text-slate-900">{props.title}</h3>
      <p className="mt-3 text-sm text-slate-700">{props.description}</p>
      <p className="mt-4 text-sm font-semibold text-brand-primary">Ir a la página</p>
    </Link>
  )
}

function DetailPage() {
  const { slug } = useParams()
  const data = useMemo(() => (slug ? detailBySlug[slug] : undefined), [slug])
  if (!data) {
    return <Navigate to="/" replace />
  }
  return <DetailTemplate data={data} />
}

function InscripcionesPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [isValidated, setIsValidated] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    if (!form.checkValidity()) {
      setIsValidated(true)
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    const formData = new FormData(form)

    const studentName = String(formData.get('studentName') ?? '')
    const guardianName = String(formData.get('guardianName') ?? '')
    const requestedLevel = String(formData.get('level') ?? '')
    const emailValue = String(formData.get('email') ?? '')
    const phoneValue = String(formData.get('phone') ?? '')
    const messageValue = String(formData.get('message') ?? '')

    const splitName = (fullName: string) => {
      const parts = fullName.trim().split(/\s+/).filter(Boolean)
      if (!parts.length) return { firstName: '', lastName: '' }
      if (parts.length === 1) return { firstName: parts[0], lastName: '' }
      return { firstName: parts[0], lastName: parts.slice(1).join(' ') }
    }

    const studentParsed = splitName(studentName)
    const guardianParsed = splitName(guardianName)

    const selectedLevelLabel =
      requestedLevel === 'inicial'
        ? 'Inicial'
        : requestedLevel === 'primario'
          ? 'Primaria'
          : requestedLevel === 'secundario'
            ? 'Secundaria'
            : requestedLevel

    const payload = new URLSearchParams()
    const appendAll = (keys: string[], value: string) => {
      keys.forEach((key) => payload.append(key, value))
    }

    // Keys aligned with the Apps Script and sheet headers.
    appendAll(['studentName', 'student_name', 'nombreEstudiante', 'nombre_estudiante', 'nombre estudiante', 'nombreAlumno', 'alumno'], studentName)
    appendAll(['guardianName', 'guardian_name', 'nombreAdulto', 'nombre_adulto', 'nombreResponsable', 'adultoResponsable', 'padre', 'madre', 'tutor', 'responsable'], guardianName)

    // Required by autorespuesta in Apps Script: e.parameter.nombre / apellido / email.
    appendAll(['nombre'], guardianParsed.firstName || studentParsed.firstName)
    appendAll(['apellido'], guardianParsed.lastName || studentParsed.lastName)

    // Required by Apps Script: e.parameters.niveles (array) and common single-value aliases.
    appendAll(['niveles'], selectedLevelLabel)
    appendAll(['level', 'nivel', 'nivelSolicitado', 'nivel_solicitado'], selectedLevelLabel)
    appendAll(['email', 'correo', 'mail'], emailValue)
    appendAll(['phone', 'telefono', 'tel'], phoneValue)
    appendAll(['message', 'mensaje', 'consulta'], messageValue)

    try {
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: payload.toString(),
      })

      const data = await response.json()

      if (data.result === 'success') {
        setSubmitStatus('success')
        form.reset()
        setIsValidated(false)
      } else {
        throw new Error(data.details || 'Error desconocido')
      }
    } catch (error) {
      console.error('Error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-slate-50 text-slate-900">
      <header className="relative isolate overflow-hidden bg-gradient-to-br from-brand-primary via-brand-sky to-brand-turquoise text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.22),transparent_42%)]" />
        <div className="relative mx-auto w-full max-w-6xl px-5 py-8 sm:px-8 md:px-12 md:py-10">
          <SiteNavigationBar />
          <div className="max-w-3xl py-12 md:py-16">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/85">Admisiones</p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">Formulario de Inscripciones</h1>
            <p className="mt-4 text-lg text-white/90">
              Completá tus datos y nos vamos a comunicar con vos para continuar el proceso de admisión.
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8 md:py-14">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div
            id="alert-success"
            className={`mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900 ${
              submitStatus === 'success' ? '' : 'hidden'
            }`}
          >
            Recibimos tus datos correctamente. El equipo de admisiones te va a contactar a la brevedad.
          </div>

          <div
            id="alert-error"
            className={`mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900 ${
              submitStatus === 'error' ? '' : 'hidden'
            }`}
          >
            Ocurrió un error al enviar el formulario. Por favor, intentá nuevamente.
          </div>

          <form
            id="contact-form"
            className={`grid gap-5 ${isValidated ? 'was-validated' : ''}`}
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-medium text-slate-700">
                Nombre
                <input
                  required
                  name="studentName"
                  autoComplete="name"
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-primary"
                  placeholder="Ej: Juana Pérez"
                />
              </label>

              <label className="grid gap-2 text-sm font-medium text-slate-700">
                Nivel al que se inscribe
                <select
                  required
                  name="level"
                  defaultValue=""
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-brand-primary"
                >
                  <option value="" disabled>Seleccionar nivel</option>
                  <option value="inicial">Nivel Inicial</option>
                  <option value="primario">Nivel Primario</option>
                  <option value="secundario">Nivel Secundario</option>
                </select>
              </label>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-medium text-slate-700">
                Apellido
                <input
                  required
                  name="guardianName"
                  autoComplete="name"
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-primary"
                    placeholder="Ej: Ana Martínez"
                />
              </label>

              <label className="grid gap-2 text-sm font-medium text-slate-700">
                Teléfono de contacto
                <input
                  required
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-primary"
                  placeholder="Ej: +54 11 1234-5678"
                />
              </label>
            </div>

            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Correo electrónico
              <input
                required
                name="email"
                type="email"
                autoComplete="email"
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-primary"
                placeholder="Ej: familia@email.com"
              />
            </label>

            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Mensaje adicional
              <textarea
                name="message"
                rows={4}
                className="resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-primary"
                placeholder="Contanos si tenés alguna consulta."
              />
            </label>

            <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
              <input
                required
                type="checkbox"
                name="terms"
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-primary focus:ring-brand-primary"
              />
              Acepto que el colegio utilice estos datos para contactarme por el proceso de inscripción.
            </label>

            <button
              id="submit-button"
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-navy disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
            >
              {isSubmitting && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />
              )}
              {isSubmitting ? 'Enviando...' : 'Enviar Consulta'}
            </button>
          </form>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

function LevelPage() {
  const { level } = useParams()
  const data = useMemo(() => (level ? levelData[level] : undefined), [level])
  if (!data) {
    return <Navigate to="/" replace />
  }
  return <DetailTemplate data={data} isLevelPage />
}

function DetailTemplate({ data, isLevelPage = false }: { data: DetailData; isLevelPage?: boolean }) {
  const [activeTab, setActiveTab] = useState(0)
  const [levelViewMode, setLevelViewMode] = useState<'all' | 'tabs'>('tabs')
  const [searchTerm, setSearchTerm] = useState('')
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number | null>(null)
  const [galleryMotion, setGalleryMotion] = useState<'next' | 'prev' | 'zoom'>('zoom')
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)

  const normalizedSearch = searchTerm.trim().toLowerCase()
  const isLightboxOpen = activeGalleryIndex !== null
  const galleryItems = data.gallery ?? []
  const lightboxAnimationClass =
    galleryMotion === 'next'
      ? 'lightbox-image-next'
      : galleryMotion === 'prev'
        ? 'lightbox-image-prev'
        : 'lightbox-image-zoom'

  const filteredSections = useMemo(() => {
    if (!isLevelPage || !normalizedSearch) {
      return data.sections
    }

    return data.sections.filter((section) => {
      const paragraphText = section.paragraphs?.join(' ').toLowerCase() ?? ''
      const bulletText = section.bullets?.join(' ').toLowerCase() ?? ''
      const titleText = section.title.toLowerCase()
      return (
        titleText.includes(normalizedSearch) ||
        paragraphText.includes(normalizedSearch) ||
        bulletText.includes(normalizedSearch)
      )
    })
  }, [data.sections, isLevelPage, normalizedSearch])

  useEffect(() => {
    setActiveTab(0)
    setSearchTerm('')
  }, [data.title])

  useEffect(() => {
    if (activeTab >= filteredSections.length) {
      setActiveTab(0)
    }
  }, [activeTab, filteredSections.length])

  useEffect(() => {
    if (!isLightboxOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (!galleryItems.length) return

      if (event.key === 'Escape') {
        setActiveGalleryIndex(null)
        return
      }

      if (event.key === 'ArrowRight') {
        showNextImage()
      }

      if (event.key === 'ArrowLeft') {
        showPreviousImage()
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [galleryItems.length, isLightboxOpen])

  const showNextImage = () => {
    if (!galleryItems.length) return
    setGalleryMotion('next')
    setActiveGalleryIndex((current) => {
      if (current === null) return 0
      return (current + 1) % galleryItems.length
    })
  }

  const showPreviousImage = () => {
    if (!galleryItems.length) return
    setGalleryMotion('prev')
    setActiveGalleryIndex((current) => {
      if (current === null) return 0
      return (current - 1 + galleryItems.length) % galleryItems.length
    })
  }

  const openLightboxAt = (index: number) => {
    setGalleryMotion('zoom')
    setActiveGalleryIndex(index)
  }

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0]
    touchStartX.current = touch.clientX
    touchStartY.current = touch.clientY
  }

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null || touchStartY.current === null) return

    const touch = event.changedTouches[0]
    const deltaX = touch.clientX - touchStartX.current
    const deltaY = touch.clientY - touchStartY.current
    const swipeThreshold = 48

    touchStartX.current = null
    touchStartY.current = null

    if (Math.abs(deltaX) < swipeThreshold || Math.abs(deltaX) <= Math.abs(deltaY)) {
      return
    }

    if (deltaX < 0) {
      showNextImage()
    } else {
      showPreviousImage()
    }
  }

  const visibleSections =
    isLevelPage && levelViewMode === 'tabs'
      ? [filteredSections[activeTab]].filter(Boolean)
      : filteredSections

  const getSectionId = (section: SectionData) => {
    const originalIndex = data.sections.findIndex((item) => item.title === section.title)
    return `seccion-${slugify(section.title)}-${originalIndex}`
  }

  const sectionAnchors = useMemo(() => {
    const anchors: Array<{ id: string; label: string }> = []

    if (data.facts && data.facts.length > 0) {
      anchors.push({ id: 'ficha-rapida', label: 'Ficha rápida' })
    }
    if (data.highlights && data.highlights.length > 0) {
      anchors.push({ id: 'puntos-clave', label: 'Puntos clave' })
    }
    if (isLevelPage && galleryItems.length > 0) {
      anchors.push({ id: 'galeria-nivel', label: 'Galería' })
    }
    if (isLevelPage && data.sections.length > 1) {
      anchors.push({ id: 'herramientas-nivel', label: 'Herramientas' })
    }

    data.sections.forEach((section) => {
      anchors.push({ id: getSectionId(section), label: section.title })
    })

    return anchors
  }, [data.facts, data.highlights, data.sections, galleryItems.length, isLevelPage])

  return (
    <div className="bg-slate-50 text-slate-900">
      <header className="relative isolate h-[54vh] min-h-[360px] overflow-hidden">
        <img
          src={data.image}
          alt={data.title}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/62" />
        <div className="relative mx-auto flex h-full w-full max-w-6xl flex-col justify-between px-5 py-8 sm:px-8 md:px-12 md:py-10">
          <SiteNavigationBar />
          <div className="max-w-4xl pb-6 text-white">
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">{data.title}</h1>
            <p className="mt-4 text-lg text-white/90">{data.subtitle}</p>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-5 py-12 sm:px-8 md:py-14">
        {sectionAnchors.length > 0 && (
          <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Accesos rápidos</p>
            <div className="flex flex-wrap gap-2">
              {sectionAnchors.map((anchor) => (
                <a
                  key={anchor.id}
                  href={`#${anchor.id}`}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-700 transition hover:border-brand-sky/40 hover:bg-brand-sky/10 hover:text-brand-primary"
                >
                  {anchor.label}
                </a>
              ))}
            </div>
          </section>
        )}

        {data.facts && data.facts.length > 0 && (
          <section id="ficha-rapida" className="mb-6 grid gap-4 sm:grid-cols-3">
            {data.facts.map((fact) => (
              <article
                key={fact.label}
                className="rounded-2xl border border-brand-sky/20 bg-gradient-to-br from-white to-brand-sky/10 p-4 shadow-sm"
              >
                <span className="mb-3 inline-flex rounded-lg bg-brand-sky/15 p-2 text-brand-primary">
                  <InfoIcon text={fact.label} className="h-4 w-4" />
                </span>
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-primary">{fact.label}</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">{fact.value}</p>
              </article>
            ))}
          </section>
        )}

        {data.highlights && data.highlights.length > 0 && (
          <section id="puntos-clave" className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Puntos clave</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {data.highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
                >
                  <span className="mb-2 inline-flex rounded-md bg-white p-1 text-brand-primary">
                    <InfoIcon text={highlight} className="h-4 w-4" />
                  </span>
                  {highlight}
                </div>
              ))}
            </div>
          </section>
        )}

        {isLevelPage && data.gallery && data.gallery.length > 0 && (
          <section id="galeria-nivel" className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-8 w-1.5 rounded-full bg-brand-primary" />
              <span className="inline-flex rounded-md bg-brand-sky/15 p-1.5 text-brand-primary">
                <InfoIcon text="Galería del nivel" className="h-4 w-4" />
              </span>
              <h2 className="text-2xl font-semibold text-slate-900">Galería del nivel</h2>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {galleryItems.map((item, index) => (
                <figure
                  key={item.src}
                  className="group cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-slate-50"
                  onClick={() => openLightboxAt(index)}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-28 w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </figure>
              ))}
            </div>
            <p className="mt-3 text-xs text-slate-500">Tocá o hacé click en una imagen para ampliarla.</p>
          </section>
        )}

        {isLevelPage && data.sections.length > 1 && (
          <section id="herramientas-nivel" className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setLevelViewMode('tabs')}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  levelViewMode === 'tabs'
                    ? 'bg-brand-primary text-white'
                    : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                }`}
              >
                Ver por pestañas
              </button>
              <button
                type="button"
                onClick={() => setLevelViewMode('all')}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  levelViewMode === 'all'
                    ? 'bg-brand-primary text-white'
                    : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                }`}
              >
                Ver todo
              </button>
            </div>

            <div className="mt-4">
              <label htmlFor="level-search" className="mb-2 block text-sm font-medium text-slate-700">
                Buscar tema dentro del nivel
              </label>
              <input
                id="level-search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Ej: robótica, horario, pastoral, ESI"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-brand-primary"
              />
            </div>

            {normalizedSearch && (
              <p className="mt-3 text-sm text-slate-600">
                {filteredSections.length === 0
                  ? 'Sin resultados para la búsqueda actual.'
                  : `${filteredSections.length} secciones encontradas.`}
              </p>
            )}

            {levelViewMode === 'tabs' && (
              <div className="mt-4 flex flex-wrap gap-2">
                {filteredSections.map((section, index) => (
                  <button
                    key={section.title}
                    type="button"
                    onClick={() => setActiveTab(index)}
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm transition ${
                      activeTab === index
                        ? 'bg-brand-sky/15 text-brand-primary ring-1 ring-brand-sky/40'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <InfoIcon text={section.title} className="h-4 w-4" />
                    {section.title}
                  </button>
                ))}
              </div>
            )}
          </section>
        )}

        <div className="space-y-6">
          {visibleSections.map((section) => (
            <section
              id={getSectionId(section)}
              key={`${section.title}-${activeTab}-${levelViewMode}-${normalizedSearch}`}
              className="section-enter rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="h-8 w-1.5 rounded-full bg-brand-primary" />
                <span className="inline-flex rounded-md bg-brand-sky/15 p-1.5 text-brand-primary">
                  <InfoIcon text={section.title} className="h-4 w-4" />
                </span>
                <h2 className="text-2xl font-semibold text-slate-900">{section.title}</h2>
              </div>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph} className="mt-4 leading-relaxed text-slate-700">
                  {paragraph}
                </p>
              ))}
              {section.bullets && (
                <ul className="mt-5 grid gap-3 text-slate-700 md:grid-cols-2">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-relaxed">
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </main>

      {isLightboxOpen && activeGalleryIndex !== null && galleryItems[activeGalleryIndex] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 px-4"
          onClick={() => setActiveGalleryIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Galería ampliada"
        >
          <div
            className="relative w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <button
              type="button"
              onClick={() => setActiveGalleryIndex(null)}
              className="absolute -top-12 right-0 rounded-full bg-white/15 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-white/25"
            >
              Cerrar
            </button>

            <img
              key={`${activeGalleryIndex}-${galleryMotion}`}
              src={galleryItems[activeGalleryIndex].src}
              alt={galleryItems[activeGalleryIndex].alt}
              loading="eager"
              decoding="async"
              className={`max-h-[78vh] w-full rounded-2xl border border-white/15 bg-slate-900 object-contain shadow-2xl ${lightboxAnimationClass}`}
            />

            <div className="mt-4 flex items-center justify-between gap-3 text-white">
              <button
                type="button"
                onClick={showPreviousImage}
                className="rounded-full bg-white/15 px-4 py-2 text-sm font-semibold transition hover:bg-white/25"
              >
                ← Anterior
              </button>
              <p className="text-sm text-white/85">
                {activeGalleryIndex + 1} / {galleryItems.length}
              </p>
              <button
                type="button"
                onClick={showNextImage}
                className="rounded-full bg-white/15 px-4 py-2 text-sm font-semibold transition hover:bg-white/25"
              >
                Siguiente →
              </button>
            </div>
            <p className="mt-3 text-center text-xs text-white/70 md:hidden">Deslizá para cambiar de imagen.</p>
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  )
}

function SiteFooter() {
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
              <Link to="/inscripciones" className="hover:text-white">Inscripciones</Link>
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

export default App
