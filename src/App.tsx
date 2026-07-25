import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, Navigate, Route, Routes, useLocation, useNavigationType, useParams } from 'react-router-dom'
import { AdmissionsPage } from './components/admisiones/AdmissionsPage'
import { SiteFooter } from './components/layout/SiteFooter'
import { SiteNavigationBar } from './components/layout/SiteNavigationBar'
import {
  HomeDetailLinksSection,
  HomeHistorySection,
  HomeHeroSection,
  HomeIntroSection,
  InstitutionalResourcesSection,
  InstitutionSection,
  LevelsSection,
  ManagementSection,
} from './components/home/HomePageSections'
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
import infoNivelesPdf from './info/info-niveles.pdf'
import comunicacionCnsccPdf from './info/Comunicación CNSSC .pdf'
import type { DetailData, SectionData } from './types/content'
import { InfoIcon } from './components/ui/InfoIcon'

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
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
    resources: [
      { title: 'Información de niveles', file: infoNivelesPdf },
      { title: 'Comunicación institucional CNSSC', file: comunicacionCnsccPdf },
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
    resources: [
      { title: 'Información de niveles', file: infoNivelesPdf },
      { title: 'Comunicación institucional CNSSC', file: comunicacionCnsccPdf },
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
    resources: [
      { title: 'Información de niveles', file: infoNivelesPdf },
      { title: 'Comunicación institucional CNSSC', file: comunicacionCnsccPdf },
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
        <Route path="/admisiones/inicial" element={<AdmissionsPage title="Admisiones Inicial" subtitle="Completá el formulario para solicitar información del proceso de ingreso al nivel inicial." levelLabel="Inicial" scriptUrl={SCRIPT_URL} />} />
        <Route path="/admisiones/primaria" element={<AdmissionsPage title="Admisiones Primaria" subtitle="Completá el formulario para solicitar información del proceso de ingreso al nivel primario." levelLabel="Primaria" scriptUrl={SCRIPT_URL} />} />
        <Route path="/admisiones/secundaria" element={<AdmissionsPage title="Admisiones Secundaria" subtitle="Completá el formulario para solicitar información del proceso de ingreso al nivel secundario." levelLabel="Secundaria" scriptUrl={SCRIPT_URL} />} />
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

  const levelCards = [
    {
      key: 'inicial',
      title: 'Nivel Inicial',
      description: 'Acompañamiento cercano para los primeros años de vida escolar.',
      image: inicialCard,
    },
    {
      key: 'primario',
      title: 'Nivel Primario',
      description: 'Propuesta integral para la formación académica y humana.',
      image: primariaGallery1,
    },
    {
      key: 'secundario',
      title: 'Nivel Secundario',
      description: 'Formación orientada a la construcción de ciudadanía y futuro.',
      image: secundariaCard,
    },
  ]

  return (
    <div id="inicio" className="bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900">
      <HomeHeroSection
        backgroundImage={colegioHero}
        title="Colegio Nuestra Señora del Sagrado Corazón"
        subtitle="113 años de historia"
      />

      <main className="mx-auto w-full max-w-6xl space-y-14 px-5 py-14 sm:px-8 md:px-12">
        <HomeIntroSection
          title="Nuestro Colegio"
          description="Descubrí la experiencia educativa que ofrecemos a nuestros estudiantes y familias."
          secondaryText="Conocé más sobre nuestra comunidad educativa y nuestros valores."
          image={colegioVideo}
        />

        <HomeHistorySection
          image={historyData.image}
          title="Nuestra Historia"
          description="Memorias de nuestros primeros 113 años: orígenes, crecimiento y una pedagogía del amor que sigue viva en cada etapa educativa."
          bullets={['Tradición educativa desde 1913.', 'Crecimiento institucional en clave Vedruna.']}
          link="/detalle/nuestra-historia"
        />

        <InstitutionSection
          title="Nuestra Institución"
          intro="Los pilares que guían nuestra propuesta educativa."
          tabs={institutionTabs}
          activeInstitutionId={activeInstitutionId}
          activeInstitution={activeInstitution}
          onTabChange={setActiveInstitutionId}
        />

        <LevelsSection
          title="Nuestros Niveles Educativos"
          intro="Cada nivel cuenta con su página específica, en coherencia con la información del PDF institucional."
          items={levelCards}
        />

        <ManagementSection
          title="Equipo de gestión"
          intro="Un equipo cercano y comprometido que acompaña a cada estudiante, familia y docente en el día a día escolar."
          members={[
            { role: 'Directora', description: 'Orientación institucional y acompañamiento general.' },
            { role: 'Vicedirectora', description: 'Coordinación pedagógica y seguimiento de la propuesta.' },
            { role: 'Coordinación pedagógica', description: 'Articulación de proyectos, trayectorias y enseñanza.' },
            { role: 'Coordinación administrativa', description: 'Gestión operativa, organización y bienestar institucional.' },
          ]}
        />

        <InstitutionalResourcesSection
          title="Recursos institucionales"
          intro="Accedé a los documentos y materiales oficiales que acompañan la propuesta educativa del colegio."
          resources={[
            {
              title: 'Información de niveles',
              description: 'Documento institucional con la propuesta por niveles.',
              href: infoNivelesPdf,
            },
            {
              title: 'Comunicación institucional CNSSC',
              description: 'Material de difusión y orientación institucional.',
              href: comunicacionCnsccPdf,
            },
          ]}
        />

        <HomeDetailLinksSection
          cards={[
            {
              title: 'Pastoral',
              description: 'Síntesis entre fe, cultura y vida en los tres niveles.',
              link: '/detalle/pastoral',
            },
            {
              title: 'Somos Vedruna',
              description: 'Identidad institucional y pertenencia a la familia Vedruna.',
              link: '/detalle/somos-vedruna',
            },
          ]}
        />
      </main>

      <SiteFooter />
    </div>
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
    <div className="bg-slate-100 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-6xl px-5 py-7 sm:px-8 md:px-12 md:py-9">
          <SiteNavigationBar />
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 md:px-12">
        <Link to="/" className="text-sm font-medium text-brand-primary transition hover:text-brand-navy">
          ← Volver al inicio
        </Link>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">Admisiones</p>
        <h1 className="mt-2 text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">Formulario de Inscripciones</h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-700">
          Completá tus datos y nos vamos a comunicar con vos para continuar el proceso de admisión.
        </p>

        <section className="mt-6 max-w-3xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
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
  return <LevelDetailTemplate data={data} />
}

function LevelDetailTemplate({ data }: { data: DetailData }) {
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number | null>(null)
  const [galleryMotion, setGalleryMotion] = useState<'next' | 'prev' | 'zoom'>('zoom')
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)

  const galleryItems = data.gallery ?? []
  const resources = data.resources ?? []
  const isLightboxOpen = activeGalleryIndex !== null
  const introText = data.highlights?.[0] ?? data.sections[0]?.paragraphs?.[0] ?? data.subtitle
  const leftColumnSection = data.sections[0]
  const rightColumnSection = data.sections[1]
  const remainingSections = data.sections.slice(2)

  const lightboxAnimationClass =
    galleryMotion === 'next'
      ? 'lightbox-image-next'
      : galleryMotion === 'prev'
        ? 'lightbox-image-prev'
        : 'lightbox-image-zoom'

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

  return (
    <div className="bg-slate-100 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-6xl px-5 py-7 sm:px-8 md:px-12 md:py-9">
          <SiteNavigationBar />
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 md:px-12">
        <Link to="/" className="text-sm font-medium text-brand-primary transition hover:text-brand-navy">
          ← Volver al inicio
        </Link>

        <h1 className="mt-3 text-4xl font-semibold text-slate-900">{data.title}</h1>
        <p className="mt-1 text-lg font-medium text-brand-primary">{data.subtitle}</p>

        {data.facts && data.facts.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {data.facts.map((fact) => (
              <span
                key={fact.label}
                className="inline-flex items-center gap-1 rounded-md border border-blue-100 bg-blue-50 px-3 py-1 text-xs text-slate-700"
              >
                <InfoIcon text={fact.label} className="h-3.5 w-3.5 text-brand-primary" />
                <span className="font-semibold">{fact.label}:</span>
                <span>{fact.value}</span>
              </span>
            ))}
          </div>
        )}

        <p className="mt-5 max-w-5xl leading-relaxed text-slate-700">{introText}</p>

        <img
          src={data.image}
          alt={data.title}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="mt-5 h-[340px] w-full rounded-xl border border-slate-200 object-cover shadow-sm md:h-[420px]"
        />

        {(leftColumnSection || rightColumnSection) && (
          <section className="mt-6 grid gap-4 md:grid-cols-2">
            {[leftColumnSection, rightColumnSection].filter(Boolean).map((section) => (
              <article key={section!.title} className="rounded-xl border border-slate-200 bg-slate-200/55 p-5">
                <h2 className="text-3xl font-semibold text-slate-900">{section!.title}</h2>

                {section!.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className="mt-4 text-sm leading-relaxed text-slate-700">
                    {paragraph}
                  </p>
                ))}

                {section!.bullets && (
                  <ul className="mt-4 space-y-2 text-sm text-slate-700">
                    {section!.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-primary" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </section>
        )}

        {remainingSections.length > 0 && (
          <section className="mt-5 space-y-4">
            {remainingSections.map((section) => (
              <article key={section.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="text-2xl font-semibold text-slate-900">{section.title}</h2>

                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className="mt-4 text-sm leading-relaxed text-slate-700">
                    {paragraph}
                  </p>
                ))}

                {section.bullets && (
                  <ul className="mt-4 grid gap-2 text-sm text-slate-700 md:grid-cols-2">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </section>
        )}

        {galleryItems.length > 0 && (
          <section id="galeria-nivel" className="mt-8">
            <h2 className="text-center text-4xl font-semibold text-slate-900">Galería de Fotos</h2>
            <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
              {galleryItems.map((item, index) => (
                <figure
                  key={item.src}
                  className="group cursor-pointer overflow-hidden rounded-lg border border-slate-200 bg-white"
                  onClick={() => openLightboxAt(index)}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-36 w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </figure>
              ))}
            </div>
          </section>
        )}

        {resources.length > 0 && (
          <section id="recursos-nivel" className="mt-8 scroll-mt-28">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-3xl font-semibold text-slate-900">Recursos para Descargar</h2>
              <div className="flex flex-wrap gap-2">
                <Link
                  to="/"
                  className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-brand-sky/40 hover:bg-brand-sky/10 hover:text-brand-primary"
                >
                  Inicio
                </Link>
                <Link
                  to="/#recursos-institucionales"
                  className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-brand-sky/40 hover:bg-brand-sky/10 hover:text-brand-primary"
                >
                  Recursos institucionales
                </Link>
                <Link
                  to="/nivel/inicial#recursos-nivel"
                  className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-brand-sky/40 hover:bg-brand-sky/10 hover:text-brand-primary"
                >
                  Inicial
                </Link>
                <Link
                  to="/nivel/primario#recursos-nivel"
                  className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-brand-sky/40 hover:bg-brand-sky/10 hover:text-brand-primary"
                >
                  Primario
                </Link>
                <Link
                  to="/nivel/secundario#recursos-nivel"
                  className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-brand-sky/40 hover:bg-brand-sky/10 hover:text-brand-primary"
                >
                  Secundario
                </Link>
              </div>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {resources.map((resource) => (
                <article key={resource.title} className="rounded-xl border border-slate-300 bg-slate-100 p-4">
                  <h3 className="text-sm font-semibold text-slate-900">{resource.title}</h3>
                  <p className="mt-2 text-xs text-slate-600">Archivo PDF institucional</p>
                  <a
                    href={resource.file}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex rounded-md bg-white px-3 py-1.5 text-xs font-semibold text-brand-primary ring-1 ring-slate-300 transition hover:bg-brand-primary hover:text-white"
                  >
                    Abrir PDF
                  </a>
                </article>
              ))}
            </div>
          </section>
        )}

        <section className="mt-8 rounded-xl bg-gradient-to-r from-brand-primary to-brand-navy px-5 py-8 text-center text-white shadow-md">
          <h2 className="text-4xl font-semibold">¿Desea inscribir a su hijo/a?</h2>
          <p className="mt-2 text-white/90">Estamos aquí para acompañarlos en este importante paso.</p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/inscripciones"
              className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-brand-primary transition hover:bg-slate-100"
            >
              Formulario de Inscripción
            </Link>
            <Link
              to="/"
              className="rounded-md bg-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/30"
            >
              Volver al inicio
            </Link>
          </div>
        </section>
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

function DetailTemplate({ data }: { data: DetailData }) {
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number | null>(null)
  const [galleryMotion, setGalleryMotion] = useState<'next' | 'prev' | 'zoom'>('zoom')
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)

  const galleryItems = data.gallery ?? []
  const resources = data.resources ?? []
  const isLightboxOpen = activeGalleryIndex !== null
  const introText = data.highlights?.[0] ?? data.sections[0]?.paragraphs?.[0] ?? data.subtitle
  const leftColumnSection = data.sections[0]
  const rightColumnSection = data.sections[1]
  const remainingSections = data.sections.slice(2)

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
    if (galleryItems.length > 0) {
      anchors.push({ id: 'galeria-nivel', label: 'Galería' })
    }
    if (resources.length > 0) {
      anchors.push({ id: 'recursos-nivel', label: 'Recursos' })
    }

    data.sections.forEach((section) => {
      anchors.push({ id: getSectionId(section), label: section.title })
    })

    return anchors
  }, [data.facts, data.highlights, data.sections, galleryItems.length, resources.length])

  const lightboxAnimationClass =
    galleryMotion === 'next'
      ? 'lightbox-image-next'
      : galleryMotion === 'prev'
        ? 'lightbox-image-prev'
        : 'lightbox-image-zoom'

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

  return (
    <div className="bg-slate-100 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-6xl px-5 py-7 sm:px-8 md:px-12 md:py-9">
          <SiteNavigationBar />
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 md:px-12">
        <Link to="/" className="text-sm font-medium text-brand-primary transition hover:text-brand-navy">
          ← Volver al inicio
        </Link>

        <h1 className="mt-3 text-4xl font-semibold text-slate-900">{data.title}</h1>
        <p className="mt-1 text-lg font-medium text-brand-primary">{data.subtitle}</p>

        {data.facts && data.facts.length > 0 && (
          <section id="ficha-rapida" className="mt-4 flex flex-wrap gap-2">
            {data.facts.map((fact) => (
              <span
                key={fact.label}
                className="inline-flex items-center gap-1 rounded-md border border-blue-100 bg-blue-50 px-3 py-1 text-xs text-slate-700"
              >
                <InfoIcon text={fact.label} className="h-3.5 w-3.5 text-brand-primary" />
                <span className="font-semibold">{fact.label}:</span>
                <span>{fact.value}</span>
              </span>
            ))}
          </section>
        )}

        <p className="mt-5 max-w-5xl leading-relaxed text-slate-700">{introText}</p>

        <img
          src={data.image}
          alt={data.title}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="mt-5 h-[340px] w-full rounded-xl border border-slate-200 object-cover shadow-sm md:h-[420px]"
        />

        {sectionAnchors.length > 0 && (
          <section className="mt-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
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

        {data.highlights && data.highlights.length > 0 && (
          <section id="puntos-clave" className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">Puntos clave</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {data.highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
                >
                  <span className="mb-2 inline-flex rounded-md bg-white p-1.5 text-brand-primary">
                    <InfoIcon text={highlight} className="h-4 w-4" />
                  </span>
                  {highlight}
                </div>
              ))}
            </div>
          </section>
        )}

        {(leftColumnSection || rightColumnSection) && (
          <section className="mt-6 grid gap-4 md:grid-cols-2">
            {[leftColumnSection, rightColumnSection].filter(Boolean).map((section) => (
              <article id={getSectionId(section!)} key={section!.title} className="rounded-xl border border-slate-200 bg-slate-200/55 p-5">
                <h2 className="text-3xl font-semibold text-slate-900">{section!.title}</h2>

                {section!.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className="mt-4 text-sm leading-relaxed text-slate-700">
                    {paragraph}
                  </p>
                ))}

                {section!.bullets && (
                  <ul className="mt-4 space-y-2 text-sm text-slate-700">
                    {section!.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-primary" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </section>
        )}

        {remainingSections.length > 0 && (
          <section className="mt-5 space-y-4">
            {remainingSections.map((section) => (
              <article id={getSectionId(section)} key={section.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="text-2xl font-semibold text-slate-900">{section.title}</h2>

                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className="mt-4 text-sm leading-relaxed text-slate-700">
                    {paragraph}
                  </p>
                ))}

                {section.bullets && (
                  <ul className="mt-4 grid gap-2 text-sm text-slate-700 md:grid-cols-2">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </section>
        )}

        {galleryItems.length > 0 && (
          <section id="galeria-nivel" className="mt-8">
            <h2 className="text-center text-4xl font-semibold text-slate-900">Galería de Fotos</h2>
            <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
              {galleryItems.map((item, index) => (
                <figure
                  key={item.src}
                  className="group cursor-pointer overflow-hidden rounded-lg border border-slate-200 bg-white"
                  onClick={() => openLightboxAt(index)}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-36 w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </figure>
              ))}
            </div>
          </section>
        )}

        {resources.length > 0 && (
          <section id="recursos-nivel" className="mt-8">
            <h2 className="text-center text-4xl font-semibold text-slate-900">Recursos para Descargar</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {resources.map((resource) => (
                <article key={resource.title} className="rounded-xl border border-slate-300 bg-slate-100 p-4">
                  <h3 className="text-sm font-semibold text-slate-900">{resource.title}</h3>
                  <p className="mt-2 text-xs text-slate-600">Archivo PDF institucional</p>
                  <a
                    href={resource.file}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex rounded-md bg-white px-3 py-1.5 text-xs font-semibold text-brand-primary ring-1 ring-slate-300 transition hover:bg-brand-primary hover:text-white"
                  >
                    Abrir PDF
                  </a>
                </article>
              ))}
            </div>
          </section>
        )}
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

export default App
