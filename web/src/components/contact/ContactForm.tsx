'use client'

import React from 'react'
import {useForm, ValidationError} from '@formspree/react'
import {Send, CheckCircle2, AlertCircle} from 'lucide-react'

interface ContactFormProps {
  formId?: string
}

export function ContactForm({formId}: ContactFormProps) {
  const resolvedFormId = formId || process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID || ''
  const [state, handleSubmit] = useForm(resolvedFormId || 'unconfigured')

  if (!resolvedFormId) {
    return (
      <div className="bg-surface border border-border/80 rounded-xl p-8 text-center space-y-3">
        <p className="text-text-secondary text-sm">
          Contact form is currently being configured. Please reach out directly via email.
        </p>
      </div>
    )
  }

  if (state.succeeded) {
    return (
      <div className="bg-surface border border-accent/40 rounded-xl p-8 text-center space-y-4 shadow-xl">
        <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/30 text-accent mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-semibold text-text-primary">
          Message Dispatched
        </h3>
        <p className="text-text-secondary text-sm max-w-sm mx-auto leading-relaxed">
          Thanks for reaching out! Your message was transmitted directly to my inbox. I usually reply within 24–48 hours.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-surface border border-border p-6 sm:p-8 rounded-xl shadow-xl">
      {state.errors && state.errors.getFormErrors().length > 0 && (
        <div className="p-4 rounded-lg bg-red-950/30 border border-red-800/40 text-red-300 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">Submission Error</p>
            <p className="text-xs text-red-400 mt-1">
              Please check your input fields and try again, or reach out directly via email.
            </p>
          </div>
        </div>
      )}

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wider text-text-muted mb-2">
          Your Name
        </label>
        <input
          id="name"
          type="text"
          name="name"
          required
          placeholder="e.g. Alex Miller"
          className="w-full bg-background border border-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted/60 text-sm focus:outline-none focus:border-accent transition-colors"
        />
        <ValidationError prefix="Name" field="name" errors={state.errors} className="text-xs text-red-400 mt-1" />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-text-muted mb-2">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          placeholder="alex@domain.com"
          className="w-full bg-background border border-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted/60 text-sm focus:outline-none focus:border-accent transition-colors"
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} className="text-xs text-red-400 mt-1" />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-text-muted mb-2">
          Project / Inquiry Details
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell me what you're building, what problems need solving, or how we can collaborate..."
          className="w-full bg-background border border-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted/60 text-sm focus:outline-none focus:border-accent transition-colors resize-none"
        />
        <ValidationError prefix="Message" field="message" errors={state.errors} className="text-xs text-red-400 mt-1" />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={state.submitting}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold text-background bg-accent hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
      >
        {state.submitting ? (
          <>
            <span className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
            <span>Sending Message...</span>
          </>
        ) : (
          <>
            <span>Send Message</span>
            <Send className="w-4 h-4" />
          </>
        )}
      </button>

      <p className="text-[11px] text-text-muted text-center font-mono pt-1">
        Secured via Formspree AJAX • No spam guaranteed
      </p>
    </form>
  )
}
