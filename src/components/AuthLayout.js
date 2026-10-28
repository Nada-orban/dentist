// Shared frame for the sign in and sign up pages: photo on the left, form on the right.
import React from "react";
import Link from "next/link";
import { FaArrowLeft, FaCheck } from "react-icons/fa";

const perks = ["Book appointments in a few clicks", "Choose your doctor and your time", "Friendly, specialized care"];

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-cream lg:grid lg:grid-cols-2">
      <aside className="relative hidden overflow-hidden bg-main-color text-white lg:flex lg:flex-col lg:justify-between lg:p-12">
        <img
          src="/images/hero-chair.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[70%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-main-color via-main-color/80 to-main-color/50" />

        <Link href="/" className="relative z-10 inline-block">
          <img src="/logo-light.png" alt="Luxury Dental Care" className="h-24 w-auto" />
        </Link>

        <div className="relative z-10 max-w-md">
          <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-white/70">Luxury Dental Care</p>
          <h2 className="mb-6 text-4xl leading-tight text-white">
            Modern Dental Care for a <span className="serif-em">Healthier You</span>
          </h2>
          <ul className="m-0 list-none space-y-3 p-0">
            {perks.map((perk) => (
              <li key={perk} className="flex items-center gap-3 text-sm text-white/85">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-color text-[10px] text-white">
                  <FaCheck />
                </span>
                {perk}
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <main className="flex min-h-screen flex-col">
        <div className="flex items-center justify-between px-6 py-5 sm:px-10">
          <Link href="/" className="lg:hidden">
            <img src="/logo-dark-text.png" alt="Luxury Dental Care" className="h-8 w-auto" />
          </Link>
          <Link
            href="/"
            className="ml-auto inline-flex items-center gap-2 text-sm text-main-color/70 no-underline transition-colors hover:text-primary-color"
          >
            <FaArrowLeft size={11} /> Back to website
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center px-6 pb-14 pt-2 sm:px-10">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </main>
    </div>
  );
}
