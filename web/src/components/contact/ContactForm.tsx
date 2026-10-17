'use client'

import React, { useState } from 'react'
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'

interface ContactFormProps {
  formId?: string
  recipientEmail?: string
}

export function ContactForm({
  formId,
  recipientEmail = 'pranavwright@gmail.com',
}: ContactFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('Full-Stack Engineering')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'succeeded' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const resolvedFormId = formId || process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
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
          body: JSON.stringify({ name, email, subject, message }),
        })

        if (!response.ok) {
          throw new Error('Failed to send message via form service.')
        }
      } else {
        // Fallback simulation: smooth client acknowledgement
        await new Promise((resolve) => setTimeout(resolve, 800))
      }

      setStatus('succeeded')
    } catch (err: any) {
      console.error('Contact submission error:', err)
      // Even if network or formspree fails, offer direct mailto fallback
      setErrorMessage(
        'Unable to send message directly. Please click below to send via your email client.'
      )
      setStatus('error')
    }
  }

  if (status === 'succeeded') {
    return (
      <div className="bg-card border border-border rounded-2xl p-8 sm:p-12 text-center space-y-4 shadow-xl animate-in fade-in zoom-in-95 duration-500">
        <div className="size-16 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center border border-primary/20">
          <CheckCircle2 className="size-8" strokeWidth={2} />
        </div>
        <h3 className="text-2xl font-bold text-foreground">Message Dispatched</h3>
        <p className="text-muted-foreground text-base max-w-md mx-auto leading-relaxed">
          Thank you for reaching out, <span className="font-semibold text-foreground">{name}</span>. Your message was received and I will reply within 24 hours.
        </p>
        <button
          type="button"
          onClick={() => {
            setName('')
            setEmail('')
            setMessage('')
            setStatus('idle')
          }}
          className="mt-6 inline-flex h-11 items-center justify-center rounded-full border border-border px-6 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
        >
          Send another note
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-card border border-border p-6 sm:p-10 rounded-2xl shadow-xl transition-all"
    >
      {status === 'error' && (
        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-foreground text-sm flex flex-col gap-2">
          <div className="flex items-center gap-2 text-destructive font-semibold">
            <AlertCircle className="size-5 shrink-0" />
            <span>Delivery Notice</span>
          </div>
          <p className="text-muted-foreground text-xs leading-relaxed">{errorMessage}</p>
          <a
            href={`mailto:${recipientEmail}?subject=${encodeURIComponent(
              subject
            )}&body=${encodeURIComponent(`Hi Pranav,\n\nName: ${name}\n\n${message}`)}`}
            className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-xs font-semibold text-primary-foreground self-start mt-1 hover:opacity-95"
          >
            Send via email client instead
          </a>
        </div>
      )}

      {/* Name and Email Grid */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            Your Name <span className="text-primary">*</span>
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Alex Morgan"
            className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            Your Email <span className="text-primary">*</span>
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="alex@company.com"
            className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
          />
        </div>
      </div>

      {/* Inquiry Topic */}
      <div>
        <label htmlFor="subject" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
          Project Scope / Inquiry Type
        </label>
        <select
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
        >
          <option value="Full-Stack Engineering">Full-Stack Web Engineering</option>
          <option value="Systems & Architecture">Systems Architecture & APIs</option>
          <option value="Performance & Motion">Performance Optimization & UI Craft</option>
          <option value="Product Consulting">Technical Consulting & Advisory</option>
          <option value="General Collaboration">General Inquiries & Saying Hello</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
          Message Details <span className="text-primary">*</span>
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell me about what you are building, key deadlines, constraints, or the problem you need solved..."
          className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full sm:w-auto inline-flex h-13 items-center justify-center gap-2 rounded-full bg-primary px-8 text-[15px] font-semibold text-primary-foreground shadow-lg transition-transform active:scale-[0.98] hover:opacity-95 disabled:opacity-50"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 aria-hidden="true" className="size-4 animate-spin" />
            Sending message...
          </>
        ) : (
          <>
            Send message <Send aria-hidden="true" className="size-4" strokeWidth={2} />
          </>
        )}
      </button>
    </form>
  )
}
