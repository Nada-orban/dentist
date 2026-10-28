import React from 'react'
import Link from 'next/link'
import { FaArrowRight, FaFacebookF, FaPlay } from 'react-icons/fa'

// Patient videos. To add one:
//  - a file: put the .mp4 (and optional poster) in public/videos, add a { kind: 'file', ... } line
//  - a Facebook reel/video: add a { kind: 'facebook', url: '<link>' } line (it must be public)
type PatientVideo =
  | { kind: 'file'; src: string; poster?: string; label: string }
  | { kind: 'facebook'; url: string; label: string }

const videos: PatientVideo[] = [
  {
    kind: 'file',
    src: '/videos/345926857_111083635306534_5529420903827255617_n.mp4',
    poster: '/videos/346106057_1277919939489108_402350355798767432_n.jpg',
    label: 'Patient story',
  },
  {
    kind: 'facebook',
    url: 'https://www.facebook.com/reel/252492680701376',
    label: 'From our Facebook',
  },
]

// Both videos use this exact frame: a square, so they always match.
const frame =
  'rounded-2xl overflow-hidden bg-black ring-1 ring-white/15 shadow-2xl w-full aspect-square'
const card = 'm-0 w-full md:flex-1 md:max-w-[420px] min-w-0'

function Label({ children, icon }: { children: React.ReactNode; icon: React.ReactNode }) {
  return (
    <figcaption className="mt-4 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/60">
      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary-color text-white text-[10px]">
        {icon}
      </span>
      {children}
    </figcaption>
  )
}

function Feedback() {
  return (
    <section className="bg-cream py-20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[2rem] bg-main-color px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
          {/* soft gold glow decoration */}
          <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary-color/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-primary-color/10 blur-3xl" />

          <div className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-primary-color font-medium mb-4">
                Patient Stories
              </p>
              <h2 className="text-4xl lg:text-5xl leading-tight mb-0 text-white">
                Real People. <span className="serif-em">Real Smiles.</span>
              </h2>
            </div>
            <div className="md:max-w-sm">
              <p className="text-white/70 leading-relaxed">
                Hear from our patients in their own words, and see why they
                trust us with their smiles.
              </p>
              <Link
                href="/booking"
                className="group inline-flex items-center gap-3 bg-primary-color hover:bg-dark-primary-color text-white no-underline rounded-full px-7 py-3 text-sm font-medium transition-colors"
              >
                Book an Appointment
                <FaArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <div className="relative flex flex-col md:flex-row gap-8 items-center md:items-start justify-center">
            {videos.map((v) =>
              v.kind === 'file' ? (
                <figure key={v.src} className={card}>
                  <div className={frame}>
                    <video
                      className="w-full h-full object-contain"
                      controls
                      playsInline
                      preload="metadata"
                      poster={v.poster}
                    >
                      <source src={v.src} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <Label icon={<FaPlay />}>{v.label}</Label>
                </figure>
              ) : (
                <figure key={v.url} className={card}>
                  <div className={frame}>
                    <iframe
                      src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
                        v.url
                      )}&show_text=false&width=420&height=420&t=0`}
                      className="w-full h-full"
                      style={{ border: 'none', overflow: 'hidden' }}
                      scrolling="no"
                      allowFullScreen
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      title={v.label}
                    />
                  </div>
                  <Label icon={<FaFacebookF />}>
                    <a
                      href={v.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/60 hover:text-white no-underline"
                    >
                      {v.label}
                    </a>
                  </Label>
                </figure>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Feedback
