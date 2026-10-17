'use client'

import React, { useState } from 'react'

export interface Note {
  id: string
  part: string
  title: string
  text: string
  side: 'left' | 'right'
  pin: [number, number]
  box: [number, number, number, number]
}

export const pranavNotes: Note[] = [
  {
    id: 'head',
    part: 'Head',
    title: 'I architect systems for scale',
    text: 'Clean data schemas, resilient backend services, and scalable cloud architecture.',
    side: 'right',
    pin: [0.50, 0.40],
    box: [0.42, 0.35, 0.58, 0.45],
  },
  {
    id: 'eyes',
    part: 'Eyes',
    title: 'I observe before I build',
    text: 'Deep user intent, intuitive mental models, and scannable visual hierarchy.',
    side: 'left',
    pin: [0.50, 0.40],
    box: [0.44, 0.46, 0.56, 0.54],
  },
  {
    id: 'heart',
    part: 'Heart',
    title: 'Craft & Performance',
    text: 'Sub-100ms response times, 60fps fluid motion, and uncompromising attention to detail.',
    side: 'right',
    pin: [0.50, 0.68],
    box: [0.42, 0.62, 0.58, 0.74],
  },
  {
    id: 'hands',
    part: 'Hands',
    title: 'I prototype in real code',
    text: 'Transforming ideas into production web apps with Next.js, TypeScript, and modern APIs.',
    side: 'left',
    pin: [0.52, 0.62],
    box: [0.35, 0.76, 0.53, 0.88],
  },
]

export function NoteMarks({ notes }: { notes: Note[] }) {
  return (
    <>
      {notes.map(({ id, pin, box }) => (
        <React.Fragment key={id}>
          <span
            data-note-box={id}
            aria-hidden="true"
            className="pointer-events-none absolute hidden lg:block"
            style={{
              left: `${box[0] * 100}%`,
              top: `${box[1] * 100}%`,
              width: `${(box[2] - box[0]) * 100}%`,
              height: `${(box[3] - box[1]) * 100}%`,
            }}
          />
          <span
            data-note-pin={id}
            aria-hidden="true"
            className="pointer-events-none absolute hidden lg:block"
            style={{
              left: `${pin[0] * 100}%`,
              top: `${pin[1] * 100}%`,
            }}
          />
        </React.Fragment>
      ))}
    </>
  )
}

export function NoteCards({
  notes,
  activeId,
  onSelect,
}: {
  notes: Note[]
  activeId: string | null
  onSelect: (id: string | null) => void
}) {
  return (
    <div
      data-ready="true"
      className="note-overlay pointer-events-none absolute inset-0 z-50 hidden lg:block"
    >
      {/* Click outside backdrop when a note is open */}
      {activeId && (
        <div
          className="pointer-events-auto absolute inset-0 -z-10"
          onClick={() => onSelect(null)}
          aria-hidden="true"
        />
      )}

      <ul aria-label="Notes about me">
        {notes.map((note) => {
          const isOpen = activeId === note.id
          return (
            <li
              key={note.id}
              data-note-card={note.id}
              data-open={isOpen ? 'true' : undefined}
              className={`note-light pointer-events-auto absolute w-[16.5rem] transition-all duration-300 ${
                note.side === 'left' ? 'left-[4rem]' : 'right-[4rem]'
              }`}
              style={{
                top:
                  note.id === 'head'
                    ? '22%'
                    : note.id === 'eyes'
                      ? '34%'
                      : note.id === 'heart'
                        ? '48%'
                        : '62%',
              }}
            >
              <button
                type="button"
                onClick={() => onSelect(isOpen ? null : note.id)}
                aria-expanded={isOpen}
                className={`block w-full cursor-pointer rounded-lg p-2 text-[#fff7ec] transition-colors ${
                  note.side === 'left' ? 'text-right' : 'text-left'
                }`}
              >
                <span className="font-hand text-[20px] font-medium leading-none text-[#6ee7b7]">
                  {note.part}
                </span>
                <span className="mt-1 block font-hand text-[25px] font-semibold leading-[1.05]">
                  {note.title}
                </span>
                <span className="note-detail">
                  <span className="block pt-1.5 font-hand text-[20px] font-medium leading-[1.1] text-[#fff7ec]/85">
                    {note.text}
                  </span>
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
