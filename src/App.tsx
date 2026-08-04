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
  InstitutionSection,
  LevelsSection,
} from './components/home/HomePageSections'
import colegioHero from './imagenes/Colegio/9.png'
import colegioVideo from './imagenes/Colegio/2.png'
import colegioVedruna from './imagenes/Colegio/3.png'
import colegioPastoral from './imagenes/Colegio/8.png'
import inicialMain from './imagenes/Inicial/PHOTO-2026-06-09-15-15-18 (1).jpg'
import inicialCard from './imagenes/Inicial/Copia de 20260416_152802.jpg'
import primariaGallery1 from './imagenes/Primaria/IMG_2213.jpg'
import primariaGallery2 from './imagenes/Primaria/IMG_2243.jpg'
import primariaGallery3 from './imagenes/Primaria/IMG_2246.jpg'
import secundariaMain from './imagenes/Secundaria/20250626_095050.jpg'
import secundariaCard from './imagenes/Secundaria/20250626_095831.jpg'
import infoNivelesPdf from './info/info-niveles.pdf'
import comunicacionCnsccPdf from './info/comunicacion-cnssc.pdf'
import propuestaEducativaVedrunaPdf from './recursos/recursos/Propuesta Educativa Vedruna.pdf'
import vedrunaEnElMundoPreview from './imagenes/Colegio/vedruna-en-el-mundo-preview.png'
import type { DetailData, ResourceItem, SectionData } from './types/content'

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

type LevelKey = 'inicial' | 'primario' | 'secundario'

type ResourceGroup = {
  id: string
  label: string
  resources: ResourceItem[]
}

const RESOURCE_YEAR = '2026'
const WHATSAPP_PHONE = '541135057434'
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_PHONE}`

function getFileExtension(filePath: string) {
  const extension = filePath.split('.').pop()
  return extension ? extension.toLowerCase() : ''
}

function getResourceTitleFromPath(filePath: string) {
  const fileName = filePath.split('/').pop() ?? filePath
  return decodeURIComponent(fileName)
    .replace(/\.[^/.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function isResourceFromSelectedYear(value: string) {
  return value.includes(RESOURCE_YEAR)
}

function buildResourcesFromGlob(modules: Record<string, string>): ResourceItem[] {
  return Object.entries(modules)
    .map(([path, file]) => ({
      title: getResourceTitleFromPath(path),
      file,
      format: getFileExtension(path),
    }))
    .filter((resource) => isResourceFromSelectedYear(resource.title))
    .sort((a, b) => a.title.localeCompare(b.title, 'es'))
}

function buildGalleryItemsFromGlob(modules: Record<string, string>) {
  return Object.entries(modules)
    .map(([path, src]) => ({
      src,
      alt: getResourceTitleFromPath(path),
    }))
    .sort((a, b) => a.alt.localeCompare(b.alt, 'es'))
}

const initialGalleryItems = buildGalleryItemsFromGlob(
  import.meta.glob('./imagenes/Inicial/*.{jpg,jpeg}', {
    eager: true,
    query: '?url',
    import: 'default',
  }) as Record<string, string>,
)

const primaryGalleryItems = buildGalleryItemsFromGlob(
  import.meta.glob('./imagenes/Primaria/*.{jpg,jpeg}', {
    eager: true,
    query: '?url',
    import: 'default',
  }) as Record<string, string>,
)

const secondaryGalleryItems = buildGalleryItemsFromGlob(
  import.meta.glob('./imagenes/Secundaria/*.{jpg,jpeg}', {
    eager: true,
    query: '?url',
    import: 'default',
  }) as Record<string, string>,
)

const initialLevelResources = buildResourcesFromGlob(
  import.meta.glob('./recursos/recursos/inicial/*.{pdf,doc,docx,html,pps,ppsx}', {
    eager: true,
    query: '?url',
    import: 'default',
  }) as Record<string, string>,
)

const primaryLevelResources = buildResourcesFromGlob(
  import.meta.glob('./recursos/recursos/primaria/*.{pdf,doc,docx,html,pps,ppsx}', {
    eager: true,
    query: '?url',
    import: 'default',
  }) as Record<string, string>,
)

const secondaryLevelResources = buildResourcesFromGlob(
  import.meta.glob('./recursos/recursos/secundaria/*.{pdf,doc,docx,html,pps,ppsx}', {
    eager: true,
    query: '?url',
    import: 'default',
  }) as Record<string, string>,
)

const comedorResources = buildResourcesFromGlob(
  import.meta.glob('./recursos/recursos/comedor/*.{pdf,doc,docx,html,pps,ppsx}', {
    eager: true,
    query: '?url',
    import: 'default',
  }) as Record<string, string>,
)

const levelResourceGroups: Record<LevelKey, ResourceGroup[]> = {
  inicial: [
    { id: 'nivel-inicial', label: 'Nivel Inicial', resources: initialLevelResources },
    { id: 'comedor-inicial', label: 'Comedor', resources: comedorResources },
  ],
  primario: [
    { id: 'nivel-primario', label: 'Nivel Primario', resources: primaryLevelResources },
    { id: 'comedor-primario', label: 'Comedor', resources: comedorResources },
  ],
  secundario: [
    { id: 'nivel-secundario', label: 'Nivel Secundario', resources: secondaryLevelResources },
  ],
}

const missionData: DetailData = {
  title: 'Misión',
  subtitle: 'Educar con alegría en valores para una sociedad fraterna, justa y solidaria.',
  image: primariaGallery3,
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
      title: 'Misión',
      paragraphs: [
        'Educar con alegría en valores, para contribuir a una sociedad más fraterna, justa y solidaria, inspirados en el Evangelio, basados en la pedagogía del amor.',
      ],
    },
  ],
}

const visionData: DetailData = {
  title: 'Visión',
  subtitle: 'Educación integral, participativa y personalizada para dignificar la vida.',
  image: primariaGallery3,
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
      title: 'Visión',
      paragraphs: [
        'Ser un colegio de educación integral, participativa y personalizada que busca generar, dignificar y comprometerse con la vida de las personas, la sociedad y la naturaleza.',
      ],
    },
  ],
}

const profileData: DetailData = {
  title: 'Perfil de Nuestros Alumnos',
  subtitle: 'Buscamos desarrollar una identidad institucional en nuestros estudiantes, caracterizada por valores fundamentales que los preparen para los desafíos del futuro.\n\nEsta formación integral constituye el núcleo de nuestra propuesta educativa, buscando que cada estudiante desarrolle al máximo sus potencialidades en un ambiente de respeto, calidez y solidez académica adecuada.',
  image: primariaGallery3,
  highlights: [
    
  ],
  facts: [
    { label: 'Identidad', value: 'Vedruna' },
    { label: 'Valores', value: 'Fraternidad y solidaridad' },
    { label: 'Proyección', value: 'Universitaria y laboral' },
  ],
  sections: [
    {
      title: 'Perfil del Alumno que Aspiramos Formar',
      paragraphs: [
        'En el Colegio Nuestra Señora del Sagrado Corazón, buscamos desarrollar una identidad institucional en nuestros estudiantes, caracterizada por valores fundamentales que los preparen para los desafíos del futuro. Nuestros egresados se distinguen por:',
      ],
    },
    {
      title: 'Valores Humanos',
      bullets: [
        'Actitud positiva y esperanzadora.',
        'Alegría, fraternidad y solidaridad.',
        'Respeto por las diferencias.',
      ],
    },
    {
      title: 'Formación Integral',
      bullets: [
        'Valores evangélicos.',
        'Capacidad de trabajo en equipo.',
        'Pensamiento crítico.',
      ],
    },
    {
      title: 'Proyección al Futuro',
      bullets: [
        'Herramientas para el ámbito universitario.',
        'Preparación para el mundo laboral.',
        'Conciencia ambiental y responsabilidad global.',
      ],
    },
    {
      title: 'Cierre del Perfil',
      paragraphs: [
        'Esta formación integral constituye el núcleo de nuestra propuesta educativa, buscando que cada estudiante desarrolle al máximo sus potencialidades en un ambiente de respeto, calidez y solidez académica adecuada.',
      ],
    },
  ],
}

const institutionData: DetailData = {
  title: 'Nuestra Institución',
  subtitle: '',
  image: primariaGallery3,
  highlights: [
    ...(missionData.highlights ?? []),
    ...(visionData.highlights ?? []),
    ...(profileData.highlights ?? []),
  ],
  facts: [
    ...(missionData.facts ?? []),
    ...(visionData.facts ?? []),
    ...(profileData.facts ?? []),
  ],
  sections: [
    ...(missionData.sections ?? []),
    ...(visionData.sections ?? []),
    ...(profileData.sections ?? []),
  ],
}

const historyData: DetailData = {
  title: 'Nuestra Historia',
  subtitle: 'Más de un siglo de solidez educativa, tradición Vedruna y compromiso con cada generación.',
  image: primariaGallery2,
  highlights: [
    'En noviembre de 1912 llegan a Buenos Aires las Hermanas Carmelitas de la Caridad Vedruna.',
    'En 1913 nace el colegio en Belgrano, con aprobación oficial y una primera matrícula de 26 alumnas.',
    'Una historia de crecimiento sostenido, identidad Vedruna y adaptación a cada época educativa.',
  ],
  facts: [
    { label: 'Fundación', value: '1913' },
    { label: 'Sede', value: 'Crámer 2370' },
    { label: 'Trayectoria', value: 'Más de un siglo' },
  ],
  sections: [
    {
      title: 'Nuestros inicios (1912-1913)',
      paragraphs: [
        'La historia del Colegio Nuestra Señora del Sagrado Corazón comienza en noviembre de 1912, con la llegada a Buenos Aires de tres Hermanas Carmelitas de la Caridad Vedruna: Concepción Figuerola, Eustaquia de Echeverría y Dolores Mascaró.',
        'Ellas dejaron su España natal para traer el carisma Vedruna a tierras argentinas. El comienzo fue modesto, pero lleno de esperanza: en 1913 se alquiló un pequeño chalet en Crámer 2005, en el barrio de Belgrano.',
        'En pocos meses, el colegio recibió su aprobación oficial y comenzó su misión educativa con 26 alumnas, sentando las bases de una institución que marcaría la educación porteña.',
      ],
    },
    {
      title: 'Crecimiento y consolidación',
      paragraphs: [
        'Con el crecimiento de la comunidad educativa, el colegio se trasladó temporalmente a Vidal 2025, donde amplió su matrícula para recibir alumnas internas y externas.',
        'En esa etapa también incorporó formación musical a través del Conservatorio Tibaud Piazzini. Con el tiempo, la institución fue consolidando su presencia con una propuesta que conjugó tradición e innovación sin perder su identidad Vedruna.',
      ],
    },
    {
      title: 'Línea de tiempo institucional',
      bullets: [
        '1919: Se adquiere el edificio Las Cuatro Estaciones en Crámer 2370, estableciendo una sede propia para el crecimiento institucional. Tres años más tarde, el colegio se traslada definitivamente a Crámer 2370, dirección que continúa siendo su casa hasta hoy.',
        '1930: Según registros internos, ya funcionaba el Nivel Inicial de manera no formal y mixta, como una respuesta temprana a las necesidades educativas de la comunidad.',
        '1931: Se inaugura la sección secundaria oficial con el Liceo Nacional de Señoritas Nº 2, ampliando la propuesta formativa y fortaleciendo el proyecto educativo.',
        '1937-1940: Se proyecta y construye la Capilla, consagrada con el nombre de Nuestra Señora del Carmen, patrona de la congregación. Su inauguración oficial, con la bendición del Cardenal Copello, la consolida como espacio de recogimiento, oración y vida comunitaria.',
        '1971: Se crea formalmente el Jardín de Infantes, completando los niveles educativos y permitiendo una trayectoria escolar continua desde los primeros años.',
        '1992: Comienzan los bachilleratos con orientación laboral en Informática y Comunicación Social, en sintonía con las demandas formativas y profesionales de la época.',
        '1996: El colegio se transforma en mixto y ese mismo año incorpora la doble escolaridad, profundizando su propuesta integral y su apertura a nuevos tiempos.',
      ],
    },
    {
      title: 'Legado que continúa',
      paragraphs: [
        'Cada etapa de esta historia refleja el compromiso con la excelencia educativa y la capacidad de adaptación a los tiempos, manteniendo siempre la esencia de los valores Vedruna.',
        'El colegio ha sabido evolucionar sin perder su identidad, conjugando tradición e innovación al servicio de la comunidad educativa. Hoy continúa construyendo comunidad con la misma convicción de sus orígenes: educar con sentido, cercanía y vocación de servicio.',
      ],
    },
  ],
}

const pastoralData: DetailData = {
  title: 'Pastoral',
  subtitle: 'Fe, servicio y encuentro como eje transversal de la propuesta educativa Vedruna.',
  image: colegioPastoral,
  highlights: [
    'Plan Pastoral articulado entre escuela y congregación.',
    'Educación en valores desde la fe y el carisma Vedruna.',
    'Experiencias de acompañamiento, reflexión, sacramentos y servicio comunitario.',
  ],
  facts: [
    { label: 'Eje', value: 'Fe, cultura y vida' },
    { label: 'Alcance', value: 'Toda la comunidad educativa' },
    { label: 'Comunidad', value: 'MJV, El Manso y proyectos pastorales' },
  ],
  sections: [
    {
      title: 'Identidad pastoral',
      paragraphs: [
        'La dimensión pastoral constituye un eje transversal en la propuesta educativa del Colegio Nuestra Señora del Sagrado Corazón. A través de ella promovemos un enfoque integrador que vincula la fe, la cultura y la vida cotidiana.',
        'El Plan Pastoral articula actividades y proyectos que vinculan escuela y congregación, fomentando la educación en valores desde la fe y el carisma Vedruna, con alegría, compasión y sentido de comunidad.',
      ],
    },
    {
      title: 'Origen y fundamentación',
      paragraphs: [
        'El Plan Pastoral surge para consolidar estructuras organizativas, profundizar proyectos ya en curso y establecer un sistema de seguimiento, comunicación y evaluación más sostenido.',
        'Coordinado por agentes de pastoral y referentes institucionales, busca fortalecer la vinculación, la reflexión y la profundización de todos los participantes con el carisma Vedruna.',
      ],
    },
    {
      title: 'Metas concretas',
      bullets: [
        'Concientización efectiva de las distintas dimensiones de la pastoral por parte del estudiantado.',
        'Difusión periódica de producciones vinculadas al carisma Vedruna.',
        'Coordinación y desarrollo de propuestas sacramentales de opción institucional.',
        'Acciones solidarias que integren a estudiantes, personal, familias, egresados y comunidad cercana.',
        'Sistema fluido de comunicación, planificación y seguimiento de proyectos pastorales transversales.',
      ],
    },
    {
      title: 'Actividades y proyectos destacados',
      bullets: [
        'Catequesis curricular y familiar por niveles educativos, con sacramentos de opción institucional.',
        'Taller de Visión Pastoral como espacio de reflexión integral e interdisciplinaria.',
        'Misión Juvenil Vedruna con retiros, encuentros, acciones solidarias y eventos comunitarios.',
        'Laicado Vedruna como propuesta de fe, espiritualidad y carisma para adultos.',
        'Centro Comunitario Vedruna El Manso con campañas y acciones de acercamiento comunitario.',
      ],
    },
    {
      title: 'Acompañamiento sacramental por niveles',
      bullets: [
        'Nivel Inicial: catequesis sistemática, celebraciones litúrgicas, primeros encuentros con Jesús y vivencia cotidiana de valores.',
        'Nivel Primario: catequesis sacramental y celebraciones institucionales en el camino de reconciliación y eucaristía.',
        'Nivel Secundario: profundización en la fe, confirmación, convivencias y proyectos de servicio comunitario.',
      ],
    },
    {
      title: 'Misión Juvenil Vedruna y acción solidaria',
      paragraphs: [
        'La Misión Juvenil Vedruna representa un espacio privilegiado para vivir experiencias transformadoras de fe, encuentro y compromiso social.',
      ],
      bullets: [
        'Retiros espirituales por nivel, encuentros de reflexión y oración, campamentos de integración y celebraciones litúrgicas significativas.',
        'Proyectos de voluntariado, apoyo al Centro Comunitario El Manso, campañas solidarias estacionales y acompañamiento a comunidades vulnerables.',
        'Desarrollo de sensibilidad social y compromiso activo con una sociedad más justa y fraterna, en consonancia con los valores evangélicos.',
      ],
    },
  ],
}

const vedrunaData: DetailData = {
  title: 'Somos Vedruna',
  subtitle: 'Carisma Vedruna: nuestra esencia fundacional al servicio de la educación y la vida.',
  image: colegioVedruna,
  highlights: [
    '"La educación es obra del corazón" - Santa Joaquina de Vedruna.',
    'Enfoque educativo basado en el amor, la ternura y la dedicación.',
    'Casi dos siglos de compromiso en educación, salud y acción social.',
  ],
  facts: [
    { label: 'Legado', value: 'Casi 200 años' },
    { label: 'Misión', value: 'Servicio y fraternidad' },
    { label: 'Red', value: 'Presencia internacional' },
  ],
  sections: [
    {
      title: 'Carisma Vedruna: nuestra esencia fundacional',
      paragraphs: [
        '"La educación es obra del corazón". Inspirados en Santa Joaquina de Vedruna, asumimos una pedagogía que pone en el centro el amor, la ternura, la dedicación y la compasión para acompañar el crecimiento de cada estudiante.',
        'El Colegio Nuestra Señora del Sagrado Corazón pertenece a la Familia Vedruna y forma parte de la congregación Hermanas Carmelitas de la Caridad, con casi dos siglos de compromiso en educación, salud y acción social en diversos países del mundo.',
      ],
    },
    {
      title: 'Familia Vedruna',
      paragraphs: [
        'Nuestra comunidad educativa se sustenta en un carisma que impulsa el desarrollo integral de la persona y reconoce la dignidad de cada vida como principio irrenunciable.',
        'Este carisma no se limita a un área puntual: impregna la enseñanza, la convivencia cotidiana, los vínculos y cada propuesta formativa del colegio.',
      ],
    },
    {
      title: 'Elementos fundamentales del carisma',
      bullets: [
        'Pedagogía del amor: educar desde la cercanía, la ternura y la confianza.',
        'Dignidad de cada persona: acompañamiento personalizado y mirada integral.',
        'Compasión activa: sensibilidad ante las necesidades de los demás y compromiso con el bien común.',
        'Trabajo en comunión: articulación entre docentes, directivos, personal y religiosas Vedruna.',
        'Servicio transformador: presencia en educación, salud y acción social con foco en los más vulnerables.',
        'Fidelidad creativa: adaptación a los desafíos del siglo XXI sin perder la esencia fundacional.',
      ],
    },
    {
      title: 'Un legado vivo para hoy',
      paragraphs: [
        'Docentes, directivos y personal no docente, junto con las religiosas Vedruna, trabajan en comunión para transmitir estos valores a las nuevas generaciones.',
        'Así, la tradición Vedruna continúa viva en nuestra institución, conjugando raíces profundas e innovación educativa al servicio de una formación humana, académica y espiritual completa.',
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
    gallery: initialGalleryItems,
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
    gallery: primaryGalleryItems,
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
    gallery: secondaryGalleryItems,
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
  'nuestra-institucion': institutionData,
  mision: institutionData,
  vision: institutionData,
  'perfil-estudiante': institutionData,
  pastoral: pastoralData,
  'somos-vedruna': vedrunaData,
}

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwkjN87op04dEUE761SWoOmeGJBk80pL-m0QzEoSNnhuZNDZt1cebEjFKjx3J7YBXK5Ow/exec'
const SITE_TITLE = 'Colegio Nuestra Señora del Sagrado Corazón'

function App() {
  const location = useLocation()
  console.log('app-location', location.pathname, location.search, location.hash)

  return (
    <>
      <TitleManager />
      <ScrollManager />
      <WhatsAppFloatingButton />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/inscripciones" element={<InscripcionesPage />} />
        <Route path="/admisiones/inicial" element={<AdmissionsPage title="Admisiones Inicial" subtitle="Completá el formulario para solicitar información del proceso de ingreso al nivel inicial." levelLabel="Inicial" scriptUrl={SCRIPT_URL} />} />
        <Route path="/admisiones/primaria" element={<AdmissionsPage title="Admisiones Primaria" subtitle="Completá el formulario para solicitar información del proceso de ingreso al nivel primario." levelLabel="Primaria" scriptUrl={SCRIPT_URL} />} />
        <Route path="/admisiones/secundaria" element={<AdmissionsPage title="Admisiones Secundaria" subtitle="Completá el formulario para solicitar información del proceso de ingreso al nivel secundario." levelLabel="Secundaria" scriptUrl={SCRIPT_URL} />} />
        <Route path="/autoridades" element={<AuthoritiesPage />} />
        <Route path="/recursos" element={<ResourcesHubPage />} />
        <Route path="/detalle/:slug" element={<DetailPage />} />
        <Route path="/nivel/:level" element={<LevelPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

function WhatsAppFloatingButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-20 right-5 z-[60] inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#22c55e] text-white shadow-[0_12px_28px_-16px_rgba(21,128,61,0.7)] transition hover:-translate-y-0.5 hover:bg-[#16a34a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22c55e] focus-visible:ring-offset-2"
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
        <path
          d="M12 3.75a8.25 8.25 0 0 0-7.18 12.31L3.75 20.25l4.33-1.03A8.25 8.25 0 1 0 12 3.75Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.5 8.9c0-.42.34-.77.77-.77h.57c.29 0 .56.16.69.42l.58 1.15a.77.77 0 0 1-.12.86l-.52.62a6.15 6.15 0 0 0 2.35 2.35l.62-.52a.77.77 0 0 1 .86-.12l1.15.58c.26.13.42.4.42.69v.57a.77.77 0 0 1-.77.77h-.3a7.8 7.8 0 0 1-6.18-6.18v-.3Z"
          fill="currentColor"
        />
      </svg>
      <span className="sr-only">WhatsApp</span>
    </a>
  )
}

function TitleManager() {
  const location = useLocation()

  useEffect(() => {
    document.title = SITE_TITLE
  }, [location.pathname])

  return null
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
  const [scrollOffset, setScrollOffset] = useState(0)

  useEffect(() => {
    let frame = 0

    const handleScroll = () => {
      if (frame) {
        cancelAnimationFrame(frame)
      }

      frame = window.requestAnimationFrame(() => {
        setScrollOffset(window.scrollY)
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
  }, [])

  const institutionTabs = [
    {
      id: 'mision',
      label: 'Misión',
      link: '/detalle/nuestra-institucion',
      data: missionData,
    },
    {
      id: 'vision',
      label: 'Visión',
      link: '/detalle/nuestra-institucion',
      data: visionData,
    },
    {
      id: 'perfil',
      label: 'Perfil del Estudiante',
      link: '/detalle/nuestra-institucion',
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
    <div id="inicio" className="bg-gradient-to-b from-sand-50 via-white to-slate-100 text-slate-900">
      <HomeHeroSection
        backgroundImage={colegioHero}
        title="Colegio Nuestra Señora del Sagrado Corazón"
        subtitle="113 años de historia"
      />

      <main className="mx-auto w-full max-w-6xl space-y-16 px-5 py-16 sm:px-8 md:px-12">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-56 opacity-40"
          style={{ transform: `translate3d(0, ${Math.min(24, scrollOffset * 0.015)}px, 0)` }}
        />
        <div
          className="rounded-[2rem] border border-slate-200/60 bg-white/70 p-1 shadow-[0_14px_40px_-30px_rgba(15,23,42,0.3)] backdrop-blur-sm"
          style={{ transform: `translate3d(0, ${Math.min(14, scrollOffset * 0.006)}px, 0)` }}
        >
          <HomeIntroSection
            title="Nuestro Colegio"
            description="Descubrí la experiencia educativa que ofrecemos a nuestros estudiantes y familias."
            secondaryText="Conocé más sobre nuestra comunidad educativa y nuestros valores."
            image={colegioVideo}
          />
        </div>

        <div
          className="rounded-[2rem] border border-slate-200/60 bg-white/70 p-1 shadow-[0_14px_40px_-30px_rgba(15,23,42,0.3)] backdrop-blur-sm"
          style={{ transform: `translate3d(0, ${Math.min(16, scrollOffset * 0.008)}px, 0)` }}
        >
          <HomeHistorySection
            image={historyData.image}
            title="Nuestra Historia"
            description="Memorias de nuestros primeros 113 años: orígenes, crecimiento y una pedagogía del amor que sigue viva en cada etapa educativa."
            bullets={['Tradición educativa desde 1913.', 'Crecimiento institucional en clave Vedruna.']}
            link="/detalle/nuestra-historia"
          />
        </div>

        <div
          className="rounded-[2rem] border border-slate-200/60 bg-white/70 p-1 shadow-[0_14px_40px_-30px_rgba(15,23,42,0.3)] backdrop-blur-sm"
          style={{ transform: `translate3d(0, ${Math.min(18, scrollOffset * 0.009)}px, 0)` }}
        >
          <InstitutionSection
            title="Nuestra Identidad Institucional"
            intro="Los pilares que guían nuestra propuesta educativa."
            tabs={institutionTabs}
            activeInstitutionId={activeInstitutionId}
            activeInstitution={activeInstitution}
            onTabChange={setActiveInstitutionId}
          />
        </div>

        <div
          className="rounded-[2rem] border border-slate-200/60 bg-white/70 p-1 shadow-[0_14px_40px_-30px_rgba(15,23,42,0.3)] backdrop-blur-sm"
          style={{ transform: `translate3d(0, ${Math.min(20, scrollOffset * 0.01)}px, 0)` }}
        >
          <LevelsSection
            title="Nuestros Niveles Educativos"
            intro="Cada nivel cuenta con su página específica, en coherencia con la información del PDF institucional."
            items={levelCards}
          />
        </div>

        <div
          className="rounded-[2rem] border border-slate-200/60 bg-white/70 p-1 shadow-[0_14px_40px_-30px_rgba(15,23,42,0.3)] backdrop-blur-sm"
          style={{ transform: `translate3d(0, ${Math.min(22, scrollOffset * 0.011)}px, 0)` }}
        >
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
        </div>
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
    <div className="bg-gradient-to-b from-sand-50 via-white to-slate-100 text-slate-900">
      <header className="border-b border-slate-200/70 bg-white/88 backdrop-blur-md">
        <div className="mx-auto w-full max-w-6xl px-5 py-7 sm:px-8 md:px-12 md:py-9">
          <SiteNavigationBar />
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 md:px-12">
        <Link to="/" className="text-sm font-medium text-brand-primary transition hover:text-brand-navy">
          ← Volver al inicio
        </Link>
        <h1 className="mt-2 text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">Formulario de Inscripciones</h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-700">
          Completá tus datos y nos vamos a comunicar con vos para continuar el proceso de admisión.
        </p>

        <section className="soft-reveal mt-6 max-w-3xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm section-card-hover sm:p-8">
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

function ResourcesHubPage() {
  const institutionalResources = [
    {
      title: 'Información de niveles',
      description: 'Documento institucional con la propuesta educativa por nivel.',
      href: infoNivelesPdf,
    },
    {
      title: 'Comunicación institucional CNSSC',
      description: 'Material institucional de difusión y orientación para familias.',
      href: comunicacionCnsccPdf,
    },
  ].filter((resource) => isResourceFromSelectedYear(resource.title))

  const levelLinks = [
    {
      title: 'Nivel Inicial',
      description: 'Accedé a los recursos específicos del nivel inicial.',
      to: '/nivel/inicial#recursos-nivel',
    },
    {
      title: 'Nivel Primario',
      description: 'Consultá los materiales y documentos del nivel primario.',
      to: '/nivel/primario#recursos-nivel',
    },
    {
      title: 'Nivel Secundario',
      description: 'Revisá recursos y archivos del nivel secundario.',
      to: '/nivel/secundario#recursos-nivel',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-sand-50 via-white to-slate-100 text-slate-900">
      <header className="border-b border-slate-200/70 bg-white/88 backdrop-blur-sm">
        <div className="mx-auto w-full max-w-6xl px-5 py-7 sm:px-8 md:px-12 md:py-9">
          <SiteNavigationBar />
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl space-y-8 px-5 py-10 sm:px-8 md:px-12">
        <section className="rounded-[1.75rem] border border-slate-200/70 bg-white/94 p-6 shadow-[0_16px_42px_-30px_rgba(15,23,42,0.34)] md:p-8">
          <Link to="/" className="text-sm font-medium text-brand-primary transition hover:text-brand-navy">
            ← Volver al inicio
          </Link>
          <h1 className="mt-3 text-4xl font-semibold text-slate-900">Recursos Institucionales</h1>
          <p className="mt-2 max-w-3xl text-slate-700">
            Encontrá aquí los documentos institucionales principales y accesos directos a los recursos de cada nivel educativo.
          </p>
        </section>

        <section className="soft-reveal rounded-[1.75rem] border border-slate-200/70 bg-white/94 p-6 shadow-[0_16px_42px_-30px_rgba(15,23,42,0.34)] section-card-hover md:p-8">
          <h2 className="text-3xl font-semibold text-slate-900">Documentos Institucionales 2026</h2>
          {institutionalResources.length > 0 ? (
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {institutionalResources.map((resource) => (
                <article key={resource.title} className="section-card-hover rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_-24px_rgba(15,23,42,0.24)]">
                  <h3 className="text-xl font-semibold text-slate-900">{resource.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">{resource.description}</p>
                  <a
                    href={resource.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex rounded-full bg-sand-50 px-4 py-2 text-sm font-semibold text-brand-primary ring-1 ring-slate-200 transition hover:bg-brand-primary hover:text-white"
                  >
                    Abrir documento
                  </a>
                </article>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-600">No hay documentos institucionales etiquetados como 2026.</p>
          )}
        </section>

        <section className="soft-reveal rounded-[1.75rem] border border-slate-200/70 bg-white/94 p-6 shadow-[0_16px_42px_-30px_rgba(15,23,42,0.34)] section-card-hover md:p-8">
          <h2 className="text-3xl font-semibold text-slate-900">Recursos por Nivel</h2>
          <p className="mt-2 text-slate-700">Ingresá al nivel que necesites para ver sus materiales específicos.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {levelLinks.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="section-card-hover rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_-24px_rgba(15,23,42,0.24)] transition hover:border-brand-sky/40 hover:bg-sand-50"
              >
                <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{item.description}</p>
                <p className="mt-4 text-sm font-semibold text-brand-primary">Ver recursos</p>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

function LevelPage() {
  const { level } = useParams()
  const levelKey = level as LevelKey | undefined
  const data = useMemo(() => (levelKey ? levelData[levelKey] : undefined), [levelKey])
  if (!levelKey || !data) {
    return <Navigate to="/" replace />
  }
  return <LevelDetailTemplate data={data} levelKey={levelKey} />
}

function AuthoritiesPage() {
  return (
    <div className="bg-gradient-to-b from-sand-50 via-white to-slate-100 text-slate-900">
      <header className="border-b border-slate-200/70 bg-white/88 backdrop-blur-md">
        <div className="mx-auto w-full max-w-6xl px-5 py-7 sm:px-8 md:px-12 md:py-9">
          <SiteNavigationBar />
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 md:px-12">
        <Link to="/" className="text-sm font-medium text-brand-primary transition hover:text-brand-navy">
          ← Volver al inicio
        </Link>

        <h1 className="mt-2 text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">Autoridades</h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-700">
          Equipo directivo y apoderado legal del colegio.
        </p>

        <section className="soft-reveal mt-8 grid gap-4 md:grid-cols-2">
          <article className="flex h-full flex-col rounded-[1.5rem] border border-slate-200/70 bg-white/95 p-6 shadow-[0_12px_35px_-26px_rgba(15,23,42,0.34)]">
            <h2 className="text-2xl font-semibold text-slate-900">Nivel Inicial</h2>
            <p className="mt-3 text-base leading-relaxed text-slate-700">Directora: Prof. Adriana Gighiloni</p>
          </article>

          <article className="flex h-full flex-col rounded-[1.5rem] border border-slate-200/70 bg-white/95 p-6 shadow-[0_12px_35px_-26px_rgba(15,23,42,0.34)]">
            <h2 className="text-2xl font-semibold text-slate-900">Nivel Primario</h2>
            <p className="mt-3 text-base leading-relaxed text-slate-700">Directora: Prof. Florencia Farías</p>
            <p className="mt-2 text-base leading-relaxed text-slate-700">Vicedirectora: Prof. Mariana Maggi</p>
          </article>

          <article className="flex h-full flex-col rounded-[1.5rem] border border-slate-200/70 bg-white/95 p-6 shadow-[0_12px_35px_-26px_rgba(15,23,42,0.34)]">
            <h2 className="text-2xl font-semibold text-slate-900">Nivel Secundario</h2>
            <p className="mt-3 text-base leading-relaxed text-slate-700">Rectora: Mg. Ma. Eugenia Benvenuto</p>
            <p className="mt-2 text-base leading-relaxed text-slate-700">Dir. de Estudios: Prof. Vanesa Trani</p>
          </article>

          <article className="flex h-full flex-col rounded-[1.5rem] border border-slate-200/70 bg-white/95 p-6 shadow-[0_12px_35px_-26px_rgba(15,23,42,0.34)]">
            <h2 className="text-2xl font-semibold text-slate-900">Apoderado Legal</h2>
            <p className="mt-3 text-base leading-relaxed text-slate-700">Lic. Rafael Cuervo Alarcón</p>
          </article>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

function LevelDetailTemplate({ data, levelKey }: { data: DetailData; levelKey: LevelKey }) {
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number | null>(null)
  const [galleryMotion, setGalleryMotion] = useState<'next' | 'prev' | 'zoom'>('zoom')
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)
  const galleryViewportRef = useRef<HTMLDivElement | null>(null)
  const [activeResourceGroupId, setActiveResourceGroupId] = useState('')
  const [activeView, setActiveView] = useState<'info' | 'resources'>('info')
  const location = useLocation()

  const galleryItems = data.gallery ?? []
  const resourceGroups = levelResourceGroups[levelKey] ?? []
  const isLightboxOpen = activeGalleryIndex !== null
  const introText = data.highlights?.[0] ?? data.sections[0]?.paragraphs?.[0] ?? data.subtitle
  const leftColumnSection = data.sections[0]
  const rightColumnSection = data.sections[1]
  const remainingSections = data.sections.slice(2)
  const activeResourceGroup = resourceGroups.find((group) => group.id === activeResourceGroupId) ?? resourceGroups[0]
  const levelHeaderAccentClass: Record<LevelKey, string> = {
    inicial: 'bg-[linear-gradient(90deg,#7c2d12_0%,#f59e0b_100%)]',
    primario: 'bg-[linear-gradient(90deg,#0f766e_0%,#2dd4bf_100%)]',
    secundario: 'bg-[linear-gradient(90deg,#0f3b77_0%,#60a5fa_100%)]',
  }

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

  useEffect(() => {
    const defaultGroup = resourceGroups[0]
    setActiveResourceGroupId(defaultGroup?.id ?? '')
  }, [resourceGroups])

  useEffect(() => {
    setActiveView(location.hash.includes('recursos') ? 'resources' : 'info')
  }, [location.hash])

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

  const scrollGallery = (direction: 'prev' | 'next') => {
    const container = galleryViewportRef.current
    if (!container) return

    const scrollAmount = Math.max(220, container.clientWidth * 0.82)
    container.scrollBy({
      left: direction === 'next' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    })
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
    <div className="bg-gradient-to-b from-sand-50 via-white to-slate-100 text-slate-900">
      <header className="border-b border-slate-200/70 bg-white/88 backdrop-blur-md">
        <div className="mx-auto w-full max-w-6xl px-5 py-7 sm:px-8 md:px-12 md:py-9">
          <SiteNavigationBar />
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 md:px-12">
        <Link to="/" className="text-sm font-medium text-brand-primary transition hover:text-brand-navy">
          ← Volver al inicio
        </Link>

        <h1 className="mt-3 text-4xl font-semibold text-slate-900">{data.title}</h1>
        <div className={`mt-3 h-1 w-28 rounded-full ${levelHeaderAccentClass[levelKey]}`} aria-hidden="true" />
        <p
          className={`mt-3 text-lg font-medium text-brand-primary ${
            data.title === 'Perfil de Nuestros Alumnos' ? 'whitespace-pre-line text-justify' : ''
          }`}
        >
          {data.subtitle}
        </p>


        <p className="mt-5 max-w-5xl leading-relaxed text-slate-700">{introText}</p>

        <div className="mt-6 flex flex-wrap items-center gap-2 rounded-full border border-slate-200 bg-white/90 p-1.5 shadow-sm">
          <button
            type="button"
            onClick={() => setActiveView('info')}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              activeView === 'info'
                ? 'bg-brand-primary text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            Información
          </button>
          <button
            type="button"
            onClick={() => setActiveView('resources')}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              activeView === 'resources'
                ? 'bg-brand-primary text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            Recursos
          </button>
        </div>

        {activeView === 'resources' && (
          <div className="mt-3 flex flex-wrap gap-2">
            <Link
              to="/"
              className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-brand-sky/40 hover:bg-brand-sky/10 hover:text-brand-primary"
            >
              Inicio
            </Link>
            <Link
              to="/recursos"
              className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-brand-sky/40 hover:bg-brand-sky/10 hover:text-brand-primary"
            >
              Institucionales
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
        )}

        {activeView === 'info' ? (
          <>
            <img
              src={data.image}
              alt={data.title}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="mt-5 h-[340px] w-full rounded-xl border border-slate-200 object-cover shadow-sm md:h-[420px]"
            />

            {(leftColumnSection || rightColumnSection) && (
              <section className="soft-reveal mt-6 grid gap-4 md:grid-cols-2">
                {[leftColumnSection, rightColumnSection].filter(Boolean).map((section) => (
                  <article key={section!.title} className="section-card-hover rounded-[1.5rem] border border-slate-200/70 bg-white/90 p-5 shadow-[0_10px_28px_-24px_rgba(15,23,42,0.3)]">
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
              <section className="soft-reveal mt-5 space-y-4">
                {remainingSections.map((section) => (
                  <article key={section.title} className="section-card-hover rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
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
              <section id="galeria-nivel" className="soft-reveal mt-8">
                <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">Galería de Fotos</h2>

                <div className="mt-4 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => scrollGallery('prev')}
                    aria-label="Mostrar miniaturas anteriores"
                    className="hidden rounded-full border border-slate-200 bg-white p-2 text-slate-700 shadow-sm transition hover:border-brand-sky/40 hover:bg-brand-sky/10 hover:text-brand-primary sm:inline-flex"
                  >
                    ←
                  </button>

                  <div
                    ref={galleryViewportRef}
                    className="flex-1 overflow-x-auto pb-2"
                    style={{ scrollbarWidth: 'none', touchAction: 'pan-x' }}
                  >
                    <div className="flex w-max gap-3">
                      {galleryItems.map((item, index) => (
                        <figure
                          key={item.src}
                          className="group w-32 shrink-0 cursor-pointer overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm sm:w-40"
                          onClick={() => openLightboxAt(index)}
                        >
                          <img
                            src={item.src}
                            alt={item.alt}
                            loading="lazy"
                            decoding="async"
                            className="h-24 w-full object-cover transition duration-300 group-hover:scale-105 sm:h-28"
                          />
                        </figure>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => scrollGallery('next')}
                    aria-label="Mostrar miniaturas siguientes"
                    className="hidden rounded-full border border-slate-200 bg-white p-2 text-slate-700 shadow-sm transition hover:border-brand-sky/40 hover:bg-brand-sky/10 hover:text-brand-primary sm:inline-flex"
                  >
                    →
                  </button>
                </div>

                <div className="mt-3 flex items-center justify-center gap-3 sm:hidden">
                  <button
                    type="button"
                    onClick={() => scrollGallery('prev')}
                    aria-label="Mostrar miniaturas anteriores"
                    className="rounded-full border border-slate-200 bg-white p-2 text-slate-700 shadow-sm transition hover:border-brand-sky/40 hover:bg-brand-sky/10 hover:text-brand-primary"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollGallery('next')}
                    aria-label="Mostrar miniaturas siguientes"
                    className="rounded-full border border-slate-200 bg-white p-2 text-slate-700 shadow-sm transition hover:border-brand-sky/40 hover:bg-brand-sky/10 hover:text-brand-primary"
                  >
                    →
                  </button>
                </div>
              </section>
            )}
          </>
        ) : (
          resourceGroups.length > 0 && (
            <section id="recursos-nivel" className="soft-reveal mt-6 scroll-mt-28">
              <div className="section-card-hover rounded-[1.5rem] border border-slate-200/70 bg-white/94 p-4 shadow-[0_10px_28px_-24px_rgba(15,23,42,0.3)] sm:p-5">
                <div className="flex flex-wrap gap-2">
                  {resourceGroups.map((group) => {
                    const isActive = group.id === activeResourceGroup?.id
                    return (
                      <button
                        key={group.id}
                        type="button"
                        onClick={() => setActiveResourceGroupId(group.id)}
                        className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                          isActive
                            ? 'bg-brand-primary text-white shadow-sm'
                            : 'border border-slate-200 bg-white text-slate-700 hover:border-brand-sky/40 hover:bg-brand-sky/10 hover:text-brand-primary'
                        }`}
                      >
                        {group.label}
                      </button>
                    )
                  })}
                </div>

                {activeResourceGroup && activeResourceGroup.resources.length > 0 ? (
                  <div className="mt-4 grid gap-3">
                    {activeResourceGroup.resources.map((resource) => {
                      return (
                        <article
                          key={resource.file}
                          className="section-card-hover rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition hover:border-brand-sky/40 hover:bg-sand-50"
                        >
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-slate-900">{resource.title}</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <a
                                href={resource.file}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex rounded-full bg-sand-50 px-3 py-1.5 text-xs font-semibold text-brand-primary ring-1 ring-slate-200 transition hover:bg-brand-primary hover:text-white"
                              >
                                Ver
                              </a>
                              <a
                                href={resource.file}
                                download
                                className="inline-flex rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-100"
                              >
                                Descargar
                              </a>
                            </div>
                          </div>
                        </article>
                      )
                    })}
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-slate-600">No se encontraron archivos en esta categoría.</p>
                )}
              </div>
            </section>
          )
        )}

        <section className="soft-reveal mt-8 rounded-[1.75rem] border border-slate-200/70 bg-[linear-gradient(180deg,rgba(53,95,151,0.96)_0%,rgba(26,53,88,0.98)_100%)] px-5 py-8 text-center text-white shadow-[0_18px_45px_-30px_rgba(15,23,42,0.45)]">
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
  const [timelineProgress, setTimelineProgress] = useState(0)
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)
  const galleryViewportRef = useRef<HTMLDivElement | null>(null)
  const timelineRef = useRef<HTMLDivElement | null>(null)

  const galleryItems = data.gallery ?? []
  const resources = data.resources ?? []
  const isLightboxOpen = activeGalleryIndex !== null
  const isInstitutionDetailPage = data.title === 'Nuestra Institución'
  const isPastoralDetailPage = data.title === 'Pastoral'
  const isHistoryDetailPage = data.title === 'Nuestra Historia'
  const isVedrunaDetailPage = data.title === 'Somos Vedruna'
  const usesAccentedDetailHeader = isInstitutionDetailPage || isPastoralDetailPage || isHistoryDetailPage || isVedrunaDetailPage
  const introText = data.highlights?.[0] ?? data.sections[0]?.paragraphs?.[0] ?? data.subtitle
  const leftColumnSection = data.sections[0]
  const rightColumnSection = data.sections[1]
  const remainingSections = data.sections.slice(2)
  const profileCardTitles = new Set(['Valores Humanos', 'Formación Integral', 'Proyección al Futuro'])
  const profileIntroSection = remainingSections.find((section) => section.title === 'Perfil del Alumno que Aspiramos Formar')
  const profileOutroSection = remainingSections.find((section) => section.title === 'Cierre del Perfil')
  const profileHighlightSections = remainingSections.filter((section) => profileCardTitles.has(section.title))
  const profileCardToneStyles: Record<string, { card: string; title: string; dot: string }> = {
    'Valores Humanos': {
      card: 'border-sky-200 bg-sky-50/90',
      title: 'text-sky-900',
      dot: 'bg-sky-500',
    },
    'Formación Integral': {
      card: 'border-sky-200 bg-sky-50/90',
      title: 'text-sky-900',
      dot: 'bg-sky-500',
    },
    'Proyección al Futuro': {
      card: 'border-sky-200 bg-sky-50/90',
      title: 'text-sky-900',
      dot: 'bg-sky-500',
    },
  }
  const regularRemainingSections = remainingSections.filter(
    (section) =>
      section.title !== 'Perfil del Alumno que Aspiramos Formar' &&
      section.title !== 'Cierre del Perfil' &&
      !profileCardTitles.has(section.title),
  )

  const getSectionId = (section: SectionData) => {
    const originalIndex = data.sections.findIndex((item) => item.title === section.title)
    return `seccion-${slugify(section.title)}-${originalIndex}`
  }

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

  useEffect(() => {
    if (!isHistoryDetailPage) {
      setTimelineProgress(0)
      return
    }

    const updateTimelineProgress = () => {
      const container = timelineRef.current
      if (!container) return

      const rect = container.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const total = rect.height + viewportHeight * 0.4
      const covered = viewportHeight - rect.top - viewportHeight * 0.2
      const progress = Math.max(0, Math.min(1, covered / total))
      setTimelineProgress(progress)
    }

    updateTimelineProgress()
    window.addEventListener('scroll', updateTimelineProgress, { passive: true })
    window.addEventListener('resize', updateTimelineProgress)

    return () => {
      window.removeEventListener('scroll', updateTimelineProgress)
      window.removeEventListener('resize', updateTimelineProgress)
    }
  }, [isHistoryDetailPage])

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

  const scrollGallery = (direction: 'prev' | 'next') => {
    const container = galleryViewportRef.current
    if (!container) return

    const scrollAmount = Math.max(220, container.clientWidth * 0.82)
    container.scrollBy({
      left: direction === 'next' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    })
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
    <div className="bg-gradient-to-b from-sand-50 via-white to-slate-100 text-slate-900">
      <header className="border-b border-slate-200/70 bg-white/88 backdrop-blur-md">
        <div className="mx-auto w-full max-w-6xl px-5 py-7 sm:px-8 md:px-12 md:py-9">
          <SiteNavigationBar />
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 md:px-12">
        <Link to="/" className="text-sm font-medium text-brand-primary transition hover:text-brand-navy">
          ← Volver al inicio
        </Link>

        <h1 className={`mt-3 text-4xl font-semibold ${usesAccentedDetailHeader ? 'text-brand-primary' : 'text-slate-900'}`}>{data.title}</h1>
        {usesAccentedDetailHeader && (
          <div className="mt-3 h-1 w-28 rounded-full bg-[linear-gradient(90deg,#0f3b77_0%,#60a5fa_100%)]" aria-hidden="true" />
        )}
        <p className={`mt-3 text-lg font-medium ${usesAccentedDetailHeader ? 'text-brand-primary' : 'text-brand-primary'}`}>{data.subtitle}</p>

        {isVedrunaDetailPage ? (
          <blockquote className="mt-5 max-w-5xl rounded-2xl border border-brand-primary/25 bg-[linear-gradient(110deg,rgba(15,42,96,0.15),rgba(96,165,250,0.2)_50%,rgba(47,141,138,0.14))] px-5 py-4 text-brand-primary shadow-[0_14px_34px_-24px_rgba(15,42,96,0.45)]">
            <p className="overflow-x-auto whitespace-nowrap text-lg font-semibold leading-relaxed text-brand-navy">
              "La educación es obra del corazón" - <span className="text-sm font-normal italic text-brand-navy">Santa Joaquina de Vedruna</span>
            </p>
          </blockquote>
        ) : (
          <p className={`mt-5 max-w-5xl leading-relaxed ${isPastoralDetailPage ? 'text-slate-800' : 'text-slate-700'} ${isVedrunaDetailPage ? 'text-justify' : ''}`}>{introText}</p>
        )}

        {isInstitutionDetailPage ? (
          <section className="soft-reveal mt-6 grid gap-5 lg:grid-cols-[1fr_1.05fr] lg:items-start">
            <div className="space-y-5">
              {[leftColumnSection, rightColumnSection].filter(Boolean).map((section) => (
                <article id={getSectionId(section!)} key={section!.title} className="section-card-hover rounded-[1.5rem] border border-slate-200/70 bg-white/94 p-5 shadow-[0_10px_28px_-24px_rgba(15,23,42,0.28)]">
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
            </div>

            <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm">
              <img
                src={data.image}
                alt={data.title}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="h-[260px] w-full object-cover object-top md:h-[320px]"
              />
            </div>
          </section>
        ) : (
          <>
            {!isVedrunaDetailPage && (
              <img
                src={data.image}
                alt={data.title}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className={`mt-5 h-[340px] w-full rounded-xl object-cover shadow-sm md:h-[420px] ${
                  isPastoralDetailPage ? 'border border-sky-200' : 'border border-slate-200'
                }`}
              />
            )}

            {(leftColumnSection || rightColumnSection) && (
              <section className={`soft-reveal mt-6 grid gap-5 ${isVedrunaDetailPage ? '' : 'md:grid-cols-2'}`}>
                {[leftColumnSection, rightColumnSection].filter(Boolean).map((section) => (
                  <article
                    id={getSectionId(section!)}
                    key={section!.title}
                    className={`section-card-hover rounded-[1.5rem] border p-5 shadow-[0_10px_28px_-24px_rgba(15,23,42,0.28)] ${
                      isPastoralDetailPage ? 'border-sky-200/80 bg-[linear-gradient(180deg,rgba(239,246,255,0.98),rgba(255,255,255,0.96))]' : 'border-slate-200/70 bg-white/94'
                    }`}
                  >
                    <h2 className={`text-3xl font-semibold ${isPastoralDetailPage ? 'text-brand-primary' : 'text-slate-900'}`}>{section!.title}</h2>

                    {section!.paragraphs?.map((paragraph) => (
                      <p key={paragraph} className={`mt-4 text-sm leading-relaxed text-slate-700 ${isVedrunaDetailPage ? 'text-justify' : ''}`}>
                        {paragraph}
                      </p>
                    ))}

                    {section!.bullets && (
                      <ul className="mt-4 space-y-2 text-sm text-slate-700">
                        {section!.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-2">
                            <span className={`mt-2 h-1.5 w-1.5 rounded-full ${isPastoralDetailPage ? 'bg-sky-600' : 'bg-brand-primary'}`} />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </article>
                ))}
              </section>
            )}
          </>
        )}

        {profileHighlightSections.length > 0 && (
          <section className="mt-5 rounded-[1.5rem] border border-slate-200/70 bg-white/92 p-5 shadow-[0_12px_35px_-26px_rgba(15,23,42,0.34)]">
            <h2 className="text-2xl font-semibold text-slate-900">
              {profileIntroSection?.title ?? 'Perfil del Alumno que Aspiramos Formar'}
            </h2>

            {profileIntroSection?.paragraphs?.map((paragraph) => (
              <p key={paragraph} className="mt-4 text-sm leading-relaxed text-slate-700">
                {paragraph}
              </p>
            ))}

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {profileHighlightSections.map((section) => {
                const tone = profileCardToneStyles[section.title] ?? {
                  card: 'border-slate-200 bg-slate-50/95',
                  title: 'text-slate-900',
                  dot: 'bg-brand-primary',
                }

                return (
                <article key={section.title} className={`rounded-xl border p-4 shadow-sm ${tone.card}`}>
                  <h3 className={`text-xl font-semibold ${tone.title}`}>{section.title}</h3>

                  {section.bullets && (
                    <ul className="mt-3 space-y-2 text-sm text-slate-700">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2">
                          <span className={`mt-1.5 h-1.5 w-1.5 rounded-full ${tone.dot}`} />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
                )
              })}
            </div>

            {profileOutroSection?.paragraphs?.map((paragraph) => (
              <p key={paragraph} className="mt-5 text-sm leading-relaxed text-slate-700">
                {paragraph}
              </p>
            ))}
          </section>
        )}

        {isInstitutionDetailPage && (
          <section className="mt-5 rounded-2xl border border-sky-200 bg-sky-50/80 p-4 md:p-5">
            <p className="text-base font-semibold text-slate-900">Mirá nuestra Propuesta Educativa Vedruna</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <a
                href={propuestaEducativaVedrunaPdf}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-brand-primary px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-brand-navy"
              >
                Ver archivo
              </a>
              <a
                href={propuestaEducativaVedrunaPdf}
                download="Propuesta Educativa Vedruna.pdf"
                className="inline-flex items-center justify-center rounded-full border border-brand-primary bg-white px-4 py-2 text-xs font-semibold text-brand-primary transition hover:bg-brand-sky/10"
              >
                Descargar PDF
              </a>
            </div>
          </section>
        )}

        {regularRemainingSections.length > 0 && (
          <section className="mt-5 space-y-4">
            {regularRemainingSections.map((section) => (
              (() => {
                const isHistoryTimelineSection =
                  isHistoryDetailPage &&
                  section.title.toLowerCase().includes('línea de tiempo') &&
                  Boolean(section.bullets?.length)
                const isVedrunaCarismaSection =
                  isVedrunaDetailPage &&
                  section.title.toLowerCase().includes('elementos fundamentales') &&
                  Boolean(section.bullets?.length)

                if (isVedrunaCarismaSection) {
                  return (
                    <article
                      id={getSectionId(section)}
                      key={section.title}
                      className="section-card-hover rounded-[1.5rem] border border-slate-200/70 bg-white/92 p-5 shadow-[0_12px_35px_-26px_rgba(15,23,42,0.34)]"
                    >
                      <h2 className="text-2xl font-semibold text-slate-900">{section.title}</h2>

                      <div className="mt-4 grid gap-3 md:grid-cols-2">
                        {section.bullets?.map((bullet, index) => {
                          const separatorIndex = bullet.indexOf(':')
                          const heading = separatorIndex > -1 ? bullet.slice(0, separatorIndex).trim() : ''
                          const description = separatorIndex > -1 ? bullet.slice(separatorIndex + 1).trim() : bullet

                          return (
                            <article
                              key={bullet}
                              className="section-enter section-card-hover rounded-xl border border-sky-200 bg-[linear-gradient(180deg,rgba(239,246,255,0.95),rgba(255,255,255,0.98))] p-4 shadow-sm"
                              style={{ animationDelay: `${index * 80}ms` }}
                            >
                              {heading && <h3 className="text-base font-semibold text-brand-primary">{heading}</h3>}
                              <p className="mt-1.5 text-sm leading-relaxed text-slate-700 text-justify">{description}</p>
                            </article>
                          )
                        })}
                      </div>
                    </article>
                  )
                }

                if (isHistoryTimelineSection) {
                  return (
                    <article
                      id={getSectionId(section)}
                      key={section.title}
                      className="section-card-hover rounded-[1.5rem] border border-sky-200/80 bg-[linear-gradient(180deg,rgba(239,246,255,0.97),rgba(255,255,255,0.95))] p-5 shadow-[0_12px_35px_-26px_rgba(15,23,42,0.34)]"
                    >
                      <h2 className="text-2xl font-semibold text-brand-primary">{section.title}</h2>

                      <div ref={timelineRef} className="relative mt-5 pl-6">
                        <span className="absolute bottom-2 left-[9px] top-2 w-[2px] rounded-full bg-[linear-gradient(180deg,#60a5fa_0%,#0f3b77_100%)]" aria-hidden="true" />
                        <span
                          className="absolute left-[9px] top-2 w-[2px] rounded-full bg-[linear-gradient(180deg,#93c5fd_0%,#1d4ed8_100%)] shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                          style={{ height: `calc((100% - 1rem) * ${timelineProgress})` }}
                          aria-hidden="true"
                        />

                        <ul className="space-y-3">
                          {section.bullets?.map((bullet, index) => {
                            const separatorIndex = bullet.indexOf(':')
                            const year = separatorIndex > -1 ? bullet.slice(0, separatorIndex).trim() : ''
                            const description = separatorIndex > -1 ? bullet.slice(separatorIndex + 1).trim() : bullet
                            const offsetClass = index % 2 === 0 ? 'md:mr-10' : 'md:ml-10'
                            const dotClass = index % 2 === 0 ? 'bg-brand-primary' : 'bg-sky-600'

                            return (
                              <li
                                key={bullet}
                                className={`section-enter section-card-hover relative rounded-xl border border-blue-800/70 bg-[linear-gradient(160deg,#0f2a60_0%,#10203f_100%)] p-3.5 text-white shadow-[0_14px_30px_-20px_rgba(15,42,96,0.85)] ${offsetClass}`}
                                style={{ animationDelay: `${index * 90}ms` }}
                              >
                                <span className={`absolute -left-[23px] top-5 h-3.5 w-3.5 rounded-full border-2 border-white shadow ${dotClass}`} aria-hidden="true" />
                                {year && <p className="text-sm font-bold tracking-wide text-sky-200">{year}</p>}
                                <p className="mt-1 text-sm leading-relaxed text-white/95">{description}</p>
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    </article>
                  )
                }

                return (
                  <article
                    id={getSectionId(section)}
                    key={section.title}
                    className={`section-card-hover rounded-[1.5rem] border p-5 shadow-[0_12px_35px_-26px_rgba(15,23,42,0.34)] ${
                      isPastoralDetailPage ? 'border-blue-200/80 bg-[linear-gradient(180deg,rgba(239,246,255,0.96),rgba(255,255,255,0.95))]' : 'border-slate-200/70 bg-white/92'
                    }`}
                  >
                    <h2 className={`text-2xl font-semibold ${isPastoralDetailPage ? 'text-brand-primary' : 'text-slate-900'}`}>{section.title}</h2>

                    {section.paragraphs?.map((paragraph) => (
                      <p key={paragraph} className={`mt-4 text-sm leading-relaxed text-slate-700 ${isVedrunaDetailPage ? 'text-justify' : ''}`}>
                        {paragraph}
                      </p>
                    ))}

                    {section.bullets && (
                      <ul className="mt-4 grid gap-2 text-sm text-slate-700 md:grid-cols-2">
                        {section.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className={`rounded-lg border px-3 py-2 ${
                              isPastoralDetailPage ? 'border-blue-200 bg-sky-50/70' : 'border-slate-200 bg-slate-50'
                            }`}
                          >
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}
                  </article>
                )
              })()
            ))}
          </section>
        )}

        {isVedrunaDetailPage && (
          <section className="mt-6 rounded-[1.5rem] border border-slate-200 bg-[linear-gradient(160deg,rgba(255,255,255,0.98),rgba(241,245,255,0.96))] p-5 shadow-[0_14px_40px_-28px_rgba(15,23,42,0.38)]">
            <h2 className="text-2xl font-semibold text-brand-primary">Vedruna en el mundo</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700 text-justify">
              Conocé los lugares donde está presente la congregación y visitá la página oficial de la congregación.
            </p>

            <div className="relative mt-4 overflow-hidden rounded-2xl border border-brand-primary/20 bg-[radial-gradient(circle_at_18%_20%,rgba(96,165,250,0.35),rgba(15,42,96,0.92)_55%,rgba(9,18,42,0.96)_100%)] p-2 shadow-[0_18px_45px_-25px_rgba(15,42,96,0.75)]">
              <img
                src={vedrunaEnElMundoPreview}
                alt="Vista previa del documento Vedruna en el mundo"
                loading="lazy"
                decoding="async"
                className="h-auto max-h-[620px] w-full rounded-xl border border-white/20 bg-white/95 object-contain"
              />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href="https://vedruna.org"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-brand-primary px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-brand-navy"
              >
                Ir a vedruna.org
              </a>
            </div>
          </section>
        )}

        {galleryItems.length > 0 && (
          <section id="galeria-nivel" className="mt-8">
            <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">Galería de Fotos</h2>

            <div className="mt-4 flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollGallery('prev')}
                aria-label="Mostrar miniaturas anteriores"
                className="hidden rounded-full border border-slate-200 bg-white p-2 text-slate-700 shadow-sm transition hover:border-brand-sky/40 hover:bg-brand-sky/10 hover:text-brand-primary sm:inline-flex"
              >
                ←
              </button>

              <div
                ref={galleryViewportRef}
                className="flex-1 overflow-x-auto pb-2"
                style={{ scrollbarWidth: 'none', touchAction: 'pan-x' }}
              >
                <div className="flex w-max gap-3">
                  {galleryItems.map((item, index) => (
                    <figure
                      key={item.src}
                      className="group w-32 shrink-0 cursor-pointer overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm sm:w-40"
                      onClick={() => openLightboxAt(index)}
                    >
                      <img
                        src={item.src}
                        alt={item.alt}
                        loading="lazy"
                        decoding="async"
                        className="h-24 w-full object-cover transition duration-300 group-hover:scale-105 sm:h-28"
                      />
                    </figure>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => scrollGallery('next')}
                aria-label="Mostrar miniaturas siguientes"
                className="hidden rounded-full border border-slate-200 bg-white p-2 text-slate-700 shadow-sm transition hover:border-brand-sky/40 hover:bg-brand-sky/10 hover:text-brand-primary sm:inline-flex"
              >
                →
              </button>
            </div>

            <div className="mt-3 flex items-center justify-center gap-3 sm:hidden">
              <button
                type="button"
                onClick={() => scrollGallery('prev')}
                aria-label="Mostrar miniaturas anteriores"
                className="rounded-full border border-slate-200 bg-white p-2 text-slate-700 shadow-sm transition hover:border-brand-sky/40 hover:bg-brand-sky/10 hover:text-brand-primary"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => scrollGallery('next')}
                aria-label="Mostrar miniaturas siguientes"
                className="rounded-full border border-slate-200 bg-white p-2 text-slate-700 shadow-sm transition hover:border-brand-sky/40 hover:bg-brand-sky/10 hover:text-brand-primary"
              >
                →
              </button>
            </div>
          </section>
        )}

        {resources.length > 0 && (
          <section id="recursos-nivel" className="mt-8">
            <h2 className="text-center text-4xl font-semibold text-slate-900">Recursos para Descargar</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {resources.map((resource) => (
                <article key={resource.title} className="rounded-[1.5rem] border border-slate-200/70 bg-white/94 p-4 shadow-[0_10px_28px_-24px_rgba(15,23,42,0.28)]">
                  <h3 className="text-sm font-semibold text-slate-900">{resource.title}</h3>
                  <p className="mt-2 text-xs text-slate-600">Archivo PDF institucional</p>
                  <a
                    href={resource.file}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex rounded-full bg-sand-50 px-3 py-1.5 text-xs font-semibold text-brand-primary ring-1 ring-slate-200 transition hover:bg-brand-primary hover:text-white"
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
