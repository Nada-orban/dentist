// components/DashboardLayout.js
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { MdDashboard } from "react-icons/md";
import {
  FaRegCalendarAlt,
  FaUserFriends,
  FaRegUser,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import API_URL from "../pages/api/config";

const domain = `${API_URL}`;
const logoutUrl = `${domain}/api/register/logout/`;
const doctorUrl = `${domain}/api/dashboard/doctor/`;

const navItems = [
  { label: "Home", href: "/dashboard", icon: MdDashboard },
  {
    label: "Appointments",
    href: "/dashboard/appointments",
    icon: FaRegCalendarAlt,
  },
  { label: "Patients", href: "/dashboard/patient", icon: FaUserFriends },
  { label: "Profile", href: "/dashboard/messages", icon: FaRegUser },
  { label: "Settings", href: "/dashboard/settings", icon: FaCog },
];

// Page title block used at the top of every dashboard page.
export const PageHeader = ({ eyebrow, title, subtitle, children }) => (
  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
    <div>
      {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
      <h1 className="text-3xl md:text-4xl text-main-color mb-1">{title}</h1>
      {subtitle && <p className="text-main-color/60 mb-0">{subtitle}</p>}
    </div>
    {children && (
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    )}
  </div>
);

const DashboardLayout = ({ children, doctorData }) => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [fetched, setFetched] = useState(null);
  const [userName, setUserName] = useState("");

  // Pages that don't load the doctor themselves get it here.
  useEffect(() => {
    setUserName(localStorage.getItem("UserName") || "");
    if (doctorData) return;
    axios
      .get(doctorUrl, {
        headers: { Authorization: localStorage.getItem("Token1") },
      })
      .then((res) => setFetched(res.data))
      .catch(() => {});
  }, [doctorData]);

  // Close the phone menu after navigating.
  useEffect(() => {
    const close = () => setMenuOpen(false);
    router.events.on("routeChangeStart", close);
    return () => router.events.off("routeChangeStart", close);
  }, [router.events]);

  const doctor = (doctorData || fetched)?.doctor;
  const displayName = doctor?.full_name
    ? `Dr. ${doctor.full_name.replace(/^dr\.?\s+/i, "")}`
    : userName || "Welcome";
  const role = doctor?.specialization || (doctor ? "Doctor" : "Clinic staff");

  const handleLogout = async () => {
    try {
      await fetch(logoutUrl, {
        method: "POST",
        credentials: "include",
        headers: { Authorization: localStorage.getItem("Token1") || "" },
      });
    } catch (err) {
      console.error("Logout failed", err);
    }
    localStorage.removeItem("Token1");
    localStorage.removeItem("UserRole");
    localStorage.removeItem("UserName");
    router.push("/register/signIn");
  };

  const sidebar = (
    <div className="flex h-full flex-col px-3 py-6">
      <div className="flex items-center justify-between lg:justify-center">
        <Link href="/" className="block">
          <img
            src="/logo-light.png"
            alt="Luxury Dental Care"
            className="h-16 lg:h-24 w-auto"
          />
        </Link>
        <button
          type="button"
          aria-label="Close menu"
          className="lg:hidden p-2 text-white"
          onClick={() => setMenuOpen(false)}
        >
          <FaTimes className="h-5 w-5" />
        </button>
      </div>

      {/* Doctor */}
      <div className="mt-6 flex items-center gap-3 rounded-2xl bg-white/5 p-3">
        {doctor?.profile_image ? (
          <img
            src={doctor.profile_image}
            alt=""
            className="h-11 w-11 rounded-full object-cover ring-2 ring-primary-color/60"
          />
        ) : (
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-color font-display text-lg text-white">
            {displayName
              .replace(/^Dr\.\s*/, "")
              .charAt(0)
              .toUpperCase()}
          </div>
        )}
        <div className="min-w-0">
          <p className="mb-0 truncate text-sm font-semibold text-white">
            {displayName}
          </p>
          <p className="mb-0 truncate text-xs text-white/60 capitalize">
            {role}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-8 flex-1">
        <p className="mb-3 px-3 text-[10px] uppercase tracking-[0.3em] text-white/40">
          Menu
        </p>
        <ul className="m-0 flex list-none flex-col gap-1 p-0">
          {navItems.map(({ label, href, icon: Icon }) => {
            const isActive =
              href === "/dashboard"
                ? router.pathname === href
                : router.pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 rounded-xl border-l-4 px-4 py-2.5 text-sm no-underline transition-colors ${
                    isActive
                      ? "border-primary-color bg-white/10 font-medium text-white"
                      : "border-transparent text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon
                    size={16}
                    className={`shrink-0 ${isActive ? "text-primary-color" : ""}`}
                  />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-6 space-y-1 border-t border-white/10 pt-4">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm text-white/70 no-underline hover:bg-white/5 hover:text-white"
        >
          ← View website
        </Link>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-left text-sm text-white/70 hover:bg-white/5 hover:text-white"
        >
          <FaSignOutAlt size={14} />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-cream lg:flex">
      {/* Phone top bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between bg-main-color px-4 py-3 text-white shadow-md lg:hidden">
        <Link href="/dashboard" className="flex items-center no-underline">
          <img
            src="/logo-light.png"
            alt="Luxury Dental Care"
            className="h-10 w-auto"
          />
        </Link>
        <button
          type="button"
          aria-label="Open menu"
          className="p-2 text-white"
          onClick={() => setMenuOpen(true)}
        >
          <FaBars className="h-6 w-6" />
        </button>
      </header>

      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 transform bg-main-color transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:translate-x-0 lg:shrink-0 ${
          menuOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        {sidebar}
      </aside>

      <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-10">{children}</main>
    </div>
  );
};

export default DashboardLayout;
