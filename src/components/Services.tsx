'use client'
import React from 'react'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'
import { services as servicesinfo } from '../data/services'


function Services() {
  return (
    <section className="bg-cream py-20">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
        <div>
          <p className="eyebrow mb-4">Our Services</p>
          <h2 className="text-4xl leading-tight">
            Comprehensive Dental Care for <span className="serif-em">Every Smile</span>
          </h2>
          <p className="text-main-color/70 mt-5 leading-relaxed">
            From routine check-ups to advanced implants and cosmetic work, we
            offer a full range of treatments to keep your smile healthy and
            beautiful.
          </p>
          <Link
            href="/services"
            className="group inline-flex items-center gap-3 mt-8 bg-main-color hover:bg-dark-primary-color text-white no-underline rounded-full px-7 py-3 text-sm font-medium transition-colors"
          >
            View All Services
            <FaArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4">
          {servicesinfo.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow no-underline text-main-color"
            >
              <div className="h-36 md:h-40 overflow-hidden">
                <img
                  src={encodeURI(service.image)}
                  alt={service.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-sm font-medium">{service.title}</span>
                <FaArrowRight className="text-xs text-primary-color transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
