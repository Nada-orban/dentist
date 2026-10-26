import React from 'react'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'

// Patient videos. To add one:
//  - a file: put the .mp4 (and optional poster) in public/videos, add a { kind: 'file', ... } line
//  - a Facebook reel/video: add a { kind: 'facebook', url: '<link>' } line (it must be public)
type PatientVideo =
  | { kind: 'file'; src: string; poster?: string; title: string }
  | { kind: 'facebook'; url: string; title: string }

const videos: PatientVideo[] = [
  {
    kind: 'file',
    src: '/videos/345926857_111083635306534_5529420903827255617_n.mp4',
    poster: '/videos/346106057_1277919939489108_402350355798767432_n.jpg',
    title: 'A patient shares his experience',
  },
  {
    kind: 'facebook',
    url: 'https://www.facebook.com/reel/252492680701376',
    title: 'Watch on Facebook',
  },
]

function Feedback() {
  return (
    <section className="bg-cream py-20 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="eyebrow mb-4">Patient Stories</p>
            <h2 className="text-4xl leading-tight mb-0">
              Real People. <span className="serif-em">Real Smiles.</span>
            </h2>
          </div>
          <div className="md:max-w-sm">
            <p className="text-main-color/70 leading-relaxed">
              Hear from our patients in their own words, and see why they trust
              us with their smiles.
            </p>
            <Link
              href="/booking"
              className="group inline-flex items-center gap-3 bg-main-color hover:bg-dark-primary-color text-white no-underline rounded-full px-7 py-3 text-sm font-medium transition-colors"
            >
              Book an Appointment
              <FaArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-start justify-center">
          {videos.map((v) =>
            v.kind === 'file' ? (
              <figure key={v.src} className="m-0 w-full md:flex-1 min-w-0">
                <div className="rounded-2xl overflow-hidden shadow-xl bg-black aspect-video">
                  <video
                    className="w-full h-full object-cover"
                    controls
                    playsInline
                    preload="metadata"
                    poster={v.poster}
                  >
                    <source src={v.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <figcaption className="mt-3 text-sm text-main-color/60">
                  {v.title}
                </figcaption>
              </figure>
            ) : (
              <figure key={v.url} className="m-0 shrink-0 mx-auto md:mx-0">
                <div className="rounded-2xl overflow-hidden shadow-xl bg-black w-[267px] h-[476px]">
                  <iframe
                    src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
                      v.url
                    )}&show_text=false&width=267&height=476&t=0`}
                    width={267}
                    height={476}
                    style={{ border: 'none', overflow: 'hidden' }}
                    scrolling="no"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    title={v.title}
                  />
                </div>
                <figcaption className="mt-3 text-sm text-main-color/60">
                  <a
                    href={v.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-main-color/60 hover:text-primary-color"
                  >
                    {v.title}
                  </a>
                </figcaption>
              </figure>
            )
          )}
        </div>
      </div>
    </section>
  )
}

export default Feedback
