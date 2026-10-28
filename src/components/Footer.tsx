'use client'
import React from 'react'
import Link from 'next/link'
import { FaArrowRight, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa'
import { services } from '../data/services'
import { PHONE, ADDRESS, MAPS_LINK } from '../data/clinic'

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'Our Services', href: '/services' },
  { name: 'Our Doctors', href: '/doctors' },
  { name: 'Contact Us', href: '/contact' },
  { name: 'Book an Appointment', href: '/booking' },
]

const heading =
  'text-[11px] uppercase tracking-[0.3em] text-primary-color font-medium mb-5'
const linkClass =
  'text-white/70 hover:text-white no-underline text-sm transition-colors'

export default function Footer() {
  return (
    <footer className="overflow-hidden">
      {/* Call to action */}
      <div className="bg-primary-color">
        <div className="container mx-auto px-6 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-left">
          <div>
            <h2 className="text-white text-3xl md:text-4xl mb-1">
              Your Best Smile Starts Here
            </h2>
            <p className="text-white/85 mb-0">
              Book your visit today and let us take care of you.
            </p>
          </div>
          <Link
            href="/booking"
            className="group inline-flex items-center gap-3 bg-white text-main-color no-underline rounded-full px-8 py-3 text-sm font-medium shadow-sm hover:shadow-lg transition-shadow shrink-0"
          >
            Book an Appointment
            <FaArrowRight className="text-primary-color transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Main footer */}
      <div className="bg-main-color text-white">
        <div className="container mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Link href="/" className="inline-block mb-5">
              <img
                src="/logo-light.png"
                alt="Luxury Dental Care"
                className="h-24 w-auto"
              />
            </Link>
            <p className="text-white/70 text-sm leading-relaxed mb-0 max-w-xs">
              Implants, periodontics and cosmetic dentistry, with specialized
              care and trusted results.
            </p>
          </div>

          <div>
            <h6 className={heading}>Quick Links</h6>
            <ul className="list-none p-0 m-0 space-y-3">
              {quickLinks.map((l) => (
                <li key={l.name}>
                  <Link href={l.href} className={linkClass}>
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h6 className={heading}>Services</h6>
            <ul className="list-none p-0 m-0 space-y-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className={linkClass}>
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h6 className={heading}>Visit Us</h6>
            <ul className="list-none p-0 m-0 space-y-4">
              <li className="flex gap-3 text-sm text-white/70 leading-relaxed">
                <FaMapMarkerAlt className="text-primary-color mt-1 shrink-0" />
                <a
                  href={MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  {ADDRESS}
                </a>
              </li>
              <li className="flex gap-3 items-center">
                <FaPhoneAlt className="text-primary-color shrink-0" />
                <a href={`tel:${PHONE}`} className={linkClass}>
                  {PHONE}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="container mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between gap-2 text-xs text-white/50">
            <span>© {new Date().getFullYear()} Luxury Dental Care. All rights reserved.</span>
            <span>
              Website by{' '}
              <a
                className="text-primary-color no-underline hover:underline"
                href="https://nadasamir.vercel.app/"
              >
                Nada Orban
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
