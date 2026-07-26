import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { SiteFooter } from '../layout/SiteFooter'
import { SiteNavigationBar } from '../layout/SiteNavigationBar'

type AdmissionsPageProps = {
  title: string
  subtitle: string
  levelLabel: string
  scriptUrl: string
}

const faqItems = [
  {
    question: '¿Cuándo se abren las inscripciones?',
    answer:
      'Las vacantes se publican según el calendario institucional y la disponibilidad de cada nivel. Podés completar el formulario para recibir información actualizada.',
  },
  {
    question: '¿Se puede solicitar una entrevista?',
    answer:
      'Sí. Una vez enviada la consulta, el equipo de orientación se contactará para coordinar la entrevista y el recorrido institucional.',
  },
  {
    question: '¿Se ofrece orientación para familias?',
    answer:
      'Sí. Brindamos acompañamiento para que las familias puedan conocer la propuesta, el proceso de ingreso y los requisitos del nivel elegido.',
  },
]

export function AdmissionsPage({ title, subtitle, levelLabel, scriptUrl }: AdmissionsPageProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [isValidated, setIsValidated] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    if (!form.checkValidity()) {
      setIsValidated(true)
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    const formData = new FormData(form)
    try {
      const response = await fetch(scriptUrl, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Error al enviar el formulario')
      }

      setSubmitStatus('success')
      form.reset()
      setIsValidated(false)
    } catch {
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

        <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_45px_-28px_rgba(15,23,42,0.45)] md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">{title}</p>
            <h1 className="mt-3 text-4xl font-semibold text-slate-900">{title}</h1>
            <p className="mt-3 max-w-2xl leading-relaxed text-slate-700">{subtitle}</p>
            <p className="mt-2 text-sm text-slate-600">Nivel solicitado: {levelLabel}</p>

            <form noValidate onSubmit={handleSubmit} className="mt-6 grid gap-4" data-testid="admissions-form">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium text-slate-700">
                  Nombre del estudiante
                  <input
                    required
                    name="studentName"
                    type="text"
                    className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-primary"
                    placeholder="Ej: María López"
                  />
                </label>

                <label className="grid gap-2 text-sm font-medium text-slate-700">
                  Nombre del tutor / responsable
                  <input
                    required
                    name="guardianName"
                    type="text"
                    className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-primary"
                    placeholder="Ej: Ana López"
                  />
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium text-slate-700">
                  Correo electrónico
                  <input
                    required
                    name="email"
                    type="email"
                    className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-primary"
                    placeholder="tutoremail@example.com"
                  />
                </label>

                <label className="grid gap-2 text-sm font-medium text-slate-700">
                  Teléfono
                  <input
                    required
                    name="phone"
                    type="tel"
                    className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-primary"
                    placeholder="11 1234 5678"
                  />
                </label>
              </div>

              <label className="grid gap-2 text-sm font-medium text-slate-700">
                Nivel de interés
                <select
                  required
                  name="level"
                  defaultValue={levelLabel}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-brand-primary"
                >
                  <option value="Inicial">Inicial</option>
                  <option value="Primaria">Primaria</option>
                  <option value="Secundaria">Secundaria</option>
                </select>
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

              {isValidated && (
                <p className="text-sm font-medium text-amber-600">Completá todos los campos obligatorios para continuar.</p>
              )}

              {submitStatus === 'success' && (
                <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                  Gracias. Tu consulta fue enviada correctamente. Nos pondremos en contacto pronto.
                </p>
              )}

              {submitStatus === 'error' && (
                <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                  Ocurrió un problema al enviar el formulario. Intentá nuevamente en unos minutos.
                </p>
              )}

              <button
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

          <section className="space-y-6">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_45px_-28px_rgba(15,23,42,0.45)] md:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Preguntas frecuentes</h2>
              <div className="mt-4 space-y-3">
                {faqItems.map((item) => (
                  <details key={item.question} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <summary className="cursor-pointer text-sm font-semibold text-slate-900">{item.question}</summary>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">{item.answer}</p>
                  </details>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-brand-sky/10 p-6 shadow-[0_18px_45px_-28px_rgba(15,23,42,0.45)] md:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">¿Necesitás ayuda?</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                Podés completar el formulario y nos pondremos en contacto para acompañarte en el proceso de ingreso.
              </p>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
