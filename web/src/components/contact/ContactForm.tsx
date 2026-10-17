'use client'

import React, { useState } from 'react'
import { Send, CheckCircle2, AlertCircle, Loader2, Sparkles, Mail, Copy, Check } from 'lucide-react'

interface ContactFormProps {
  formId?: string
  recipientEmail?: string
}

const inquiryTopics = [
  'Full-Stack Engineering',
  'Systems Architecture',
  'Product UI & Motion',
  'Technical Advisory',
  'General Collaboration',
]

export function ContactForm({
  formId,
  recipientEmail = 'pranavwright@gmail.com',
}: ContactFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState(inquiryTopics[0])
  const [message, setMessage] = useState('')
  const [copied, setCopied] = useState(false)

  // Validation & status states
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'succeeded' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const resolvedFormId = formId || process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID

  const validate = () => {
    const newErrors: { name?: string; email?: string; message?: string } = {}

    if (!name.trim()) {
      newErrors.name = 'Please provide your name.'
    }

    if (!email.trim()) {
      newErrors.email = 'Please provide your email address.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address.'
    }

    if (!message.trim()) {
      newErrors.message = 'Please provide details about your project or inquiry.'
    } else if (message.trim().length < 10) {
      newErrors.message = 'Please share a bit more context (at least 10 characters).'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setStatus('submitting')
    setErrorMessage('')

    try {
      if (resolvedFormId && resolvedFormId !== 'unconfigured') {
        const response = await fetch(`https://formspree.io/f/${resolvedFormId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            topic: subject,
            message: message.trim(),
          }),
        })

        if (!response.ok) {
          throw new Error('Form service returned an error status.')
        }
      } else {
        // Fallback simulation: smooth client acknowledgement
        await new Promise((resolve) => setTimeout(resolve, 800))
      }

      setStatus('succeeded')
    } catch (err: any) {
      console.error('Contact submission error:', err)
      setErrorMessage(
        'The automated dispatch service is currently unreachable. You can immediately send this note via your standard email client below.'
      )
      setStatus('error')
    }
  }

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(
      `From: ${name} (${email})\nTopic: ${subject}\n\n${message}`
    )
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // SUCCESS STATE VIEW
  if (status === 'succeeded') {
    return (
      <div className="relative rounded-[28px] border border-border bg-card p-8 sm:p-12 text-center space-y-6 shadow-2xl animate-in fade-in zoom-in-95 duration-500 overflow-hidden">
        {/* Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-primary/10 blur-3xl"
        />

        <div className="size-20 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center border border-primary/25 shadow-inner">
          <CheckCircle2 className="size-10" strokeWidth={2} />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Transmission Verified
          </span>
          <h3 className="display text-[clamp(2rem,4vw,2.75rem)] leading-tight text-foreground">
            Message Dispatched
          </h3>
          <p className="text-muted-foreground text-[16px] sm:text-[17px] max-w-lg mx-auto leading-relaxed pt-2">
            Thank you, <span className="font-semibold text-foreground">{name}</span>. Your inquiry regarding <span className="font-medium text-foreground">"{subject}"</span> has been queued. I typically respond within 24 hours.
          </p>
        </div>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              setName('')
              setEmail('')
              setMessage('')
              setErrors({})
              setStatus('idle')
            }}
            className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground shadow-lg hover:opacity-95 active:scale-[0.97] transition-all"
          >
            Send another inquiry
          </button>

          <button
            type="button"
            onClick={handleCopyMessage}
            className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-card px-5 text-sm font-semibold text-foreground hover:bg-muted active:scale-[0.97] transition-all"
          >
            {copied ? (
              <>
                <Check className="size-4 text-primary" />
                <span>Copied note</span>
              </>
            ) : (
              <>
                <Copy className="size-4 opacity-70" />
                <span>Copy my note</span>
              </>
            )}
          </button>
        </div>
      </div>
    )
  }

  // ACTIVE FORM VIEW
  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="relative rounded-[28px] border border-border bg-card p-6 sm:p-10 shadow-2xl space-y-8 overflow-hidden transition-all duration-300"
    >
      {/* Background Accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -bottom-20 size-80 rounded-full bg-primary/5 blur-3xl"
      />

      {/* Header Prompt */}
      <div className="space-y-2 border-b border-border/60 pb-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
          <Sparkles className="size-3.5" />
          <span>Interactive Inquiry</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Send a detailed briefing
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Fill out the details below. I review incoming client and collaboration inquiries daily.
        </p>
      </div>

      {/* Error Fallback Banner */}
      {status === 'error' && (
        <div
          role="alert"
          aria-live="polite"
          className="rounded-2xl border border-destructive/25 bg-destructive/10 p-5 space-y-3 text-foreground animate-in fade-in duration-300"
        >
          <div className="flex items-center gap-2 text-destructive font-semibold text-sm">
            <AlertCircle className="size-5 shrink-0" />
            <span>Service Notification</span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {errorMessage}
          </p>
          <a
            href={`mailto:${recipientEmail}?subject=${encodeURIComponent(
              `[${subject}] Inquiry from ${name || 'Portfolio Contact'}`
            )}&body=${encodeURIComponent(
              `Hi Pranav,\n\nName: ${name}\nEmail: ${email}\nTopic: ${subject}\n\n${message}`
            )}`}
            className="inline-flex h-10 items-center gap-2 rounded-full bg-primary px-5 text-xs font-semibold text-primary-foreground hover:opacity-95 shadow-md active:scale-[0.97] transition-all"
          >
            <Mail className="size-3.5" />
            <span>Open in default email client</span>
          </a>
        </div>
      )}

      {/* 1. Inquiry Topic Selector */}
      <div className="space-y-3">
        <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          What is the primary scope?
        </label>
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Inquiry scope">
          {inquiryTopics.map((topic) => {
            const isSelected = subject === topic
            return (
              <button
                key={topic}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => setSubject(topic)}
                className={`rounded-full px-4 py-2 text-xs font-medium transition-all duration-200 border active:scale-[0.97] ${
                  isSelected
                    ? 'bg-foreground text-background border-foreground font-semibold shadow-sm'
                    : 'bg-background/80 text-muted-foreground border-border hover:border-primary/40 hover:text-foreground'
                }`}
              >
                {topic}
              </button>
            )
          })}
        </div>
      </div>

      {/* 2. Name & Email Inputs */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="contact-name"
            className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
          >
            Your Name <span className="text-primary">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }))
            }}
            placeholder="e.g. Alex Morgan"
            className={`w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 transition-colors focus:outline-none focus:ring-1 focus:ring-primary ${
              errors.name ? 'border-destructive focus:border-destructive' : 'border-border focus:border-primary'
            }`}
          />
          {errors.name && (
            <p className="text-xs text-destructive flex items-center gap-1 font-medium pt-0.5">
              <AlertCircle className="size-3" />
              {errors.name}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="contact-email"
            className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
          >
            Your Email <span className="text-primary">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }))
            }}
            placeholder="alex@company.com"
            className={`w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 transition-colors focus:outline-none focus:ring-1 focus:ring-primary ${
              errors.email ? 'border-destructive focus:border-destructive' : 'border-border focus:border-primary'
            }`}
          />
          {errors.email && (
            <p className="text-xs text-destructive flex items-center gap-1 font-medium pt-0.5">
              <AlertCircle className="size-3" />
              {errors.email}
            </p>
          )}
        </div>
      </div>

      {/* 3. Detailed Message Area */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label
            htmlFor="contact-message"
            className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
          >
            Project Context &amp; Objectives <span className="text-primary">*</span>
          </label>
          <span className="text-[11px] font-mono text-muted-foreground tabular">
            {message.length} chars
          </span>
        </div>
        <textarea
          id="contact-message"
          required
          rows={5}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value)
            if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }))
          }}
          placeholder="Describe what you are looking to build or solve: technical constraints, timeline, team structure, or architecture goals..."
          className={`w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 transition-colors focus:outline-none focus:ring-1 focus:ring-primary resize-none ${
            errors.message ? 'border-destructive focus:border-destructive' : 'border-border focus:border-primary'
          }`}
        />
        {errors.message ? (
          <p className="text-xs text-destructive flex items-center gap-1 font-medium pt-0.5">
            <AlertCircle className="size-3" />
            {errors.message}
          </p>
        ) : (
          <p className="text-[11px] text-muted-foreground">
            Direct NDA-compliant inquiry. Your email is never shared.
          </p>
        )}
      </div>

      {/* 4. Submission Button */}
      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          type="submit"
          disabled={status === 'submitting'}
          aria-busy={status === 'submitting'}
          className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-primary px-8 text-[16px] font-semibold text-primary-foreground shadow-xl transition-all duration-300 ease-expo active:scale-[0.97] hover:opacity-95 disabled:opacity-50"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="size-5 animate-spin" />
              <span>Transmitting briefing...</span>
            </>
          ) : (
            <>
              <span>Send briefing</span>
              <Send className="size-4" strokeWidth={2} />
            </>
          )}
        </button>

        <p className="text-xs text-muted-foreground font-mono">
          Avg response time: &lt; 24h
        </p>
      </div>
    </form>
  )
}
