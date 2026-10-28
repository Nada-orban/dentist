"use client";
import { Fragment, useEffect, useState } from "react";
import {
  Dialog,
  Disclosure,
  Popover,
  Transition,
  PopoverPanel,
  PopoverButton,
  PopoverGroup,
  DisclosureButton,
  DisclosurePanel,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  TransitionChild,
} from "@headlessui/react";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineClose } from "react-icons/md";
import { FaBars, FaChevronRight, FaTooth } from "react-icons/fa";
import * as Logo from "../../public/logo.jpg";
import Image from "next/image";
import { TiThMenuOutline } from "react-icons/ti";
import Link from "next/link";
import { services } from "../data/services";
import { useRouter } from "next/router";

const products = services.map((s) => ({
  name: s.title,
  href: `/services/${s.slug}`,
}));
const aboutinfo = [
  // { name: 'Contact Us', href: '#' },
  { name: "Our Doctors", href: "/doctors" },
  // { name: 'Cosmetic', href: '#' },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  // Play the slide-out animation first, then really close the menu.
  const closeMenu = () => {
    if (menuClosing) return;
    setMenuClosing(true);
    setTimeout(() => {
      setMobileMenuOpen(false);
      setMenuClosing(false);
    }, 300);
  };
  //login
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const isHome = router.pathname === "/";
  const dark = isHome && scrolled; // home page, after scrolling: dark bar
  const light = !isHome; // inner pages: light bar, so it stands out from dark banners

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("Token1");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("Token1");
    localStorage.removeItem("UserRole");
    setIsLoggedIn(false);
    router.push("/register/signIn"); // or homepage
  };
  const handleLogin = () => {
    router.push("register/signIn");
  };
  console.log("isLoggedIn", isLoggedIn);

  return (
    <header
      className={`fixed top-0 w-full z-20 transition-colors duration-300 ${
        dark
          ? "bg-main-color text-white shadow-lg border-b border-primary-color/40"
          : light
            ? "bg-cream/90 text-main-color border-b border-primary-color/25 backdrop-blur-md"
            : "bg-transparent text-white"
      }`}
    >
      <nav
        className="container mx-auto flex items-center justify-between"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a
            href="/"
            className={`relative flex items-center no-underline transition-all duration-300 ${
              light ? "py-3 sm:py-2.5" : dark ? "py-3" : "py-3 sm:py-2 sm:pl-5"
            }`}
          >
            <span className="sr-only">Luxury Dental Care</span>
            <img
              src={light ? "/logo-dark-tooth.png" : "/logo-tooth.png"}
              alt=""
              aria-hidden="true"
              className={
                light
                  ? "relative h-9 sm:h-7 w-auto mr-2.5"
                  : dark
                    ? "relative h-8 xl:h-9 w-auto mr-2.5 sm:mr-3"
                    : "relative h-9 w-auto mr-2.5 sm:mr-0 sm:absolute sm:left-0 sm:top-1/2 sm:-translate-y-1/2 sm:opacity-45 sm:h-14 xl:h-20"
              }
            />
            <img
              src={light ? "/logo-dark-text.png" : "/logo-text.png"}
              alt="Luxury Dental Care"
              className={`relative z-10 w-auto transition-all duration-300 ${
                light
                  ? "h-7 sm:h-6 "
                  : dark
                    ? "h-7 sm:h-8 xl:h-9"
                    : "h-7 sm:h-11 xl:h-12"
              }`}
            />
          </a>
        </div>
        <button
          type="button"
          aria-label="Open menu"
          className="lg:hidden p-2 -mr-2 text-inherit"
          onClick={() => setMobileMenuOpen(true)}
        >
          <FaBars className="w-6 h-6" />
        </button>
        <div className="hidden lg:block">
          <div className="flex justify-end items-center"></div>
          <div
            className={`flex items-center transition-all duration-300 ${light ? "py-0" : dark ? "py-3" : "py-5"}`}
          >
            <PopoverGroup className="hidden lg:flex lg:gap-x-6 xl:gap-x-10">
              <a
                href=""
                className="text-base font-normal leading-6 text-inherit no-underline"
              >
                About
              </a>

              <Popover className="relative">
                <PopoverButton className="group flex items-center gap-x-1 text-base font-normal leading-6 text-inherit outline-none">
                  Services
                  <IoIosArrowDown
                    className="h-4 w-4 flex-none text-inherit transition-transform duration-200 group-data-[open]:rotate-180"
                    aria-hidden="true"
                  />
                </PopoverButton>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-2"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-2"
                >
                  <PopoverPanel className="absolute -left-24 top-full z-30 mt-5 w-[32rem] rounded-3xl bg-white p-3 text-main-color shadow-2xl ring-1 ring-main-color/10">
                    {({ close }) => (
                      <>
                        {/* little arrow pointing at the button */}
                        <span
                          aria-hidden="true"
                          className="absolute -top-1.5 left-28 h-3 w-3 rotate-45 border-l border-t border-main-color/10 bg-white"
                        />
                        <div className="grid grid-cols-2 gap-1">
                          {services.map((s) => (
                            <Link
                              key={s.slug}
                              href={`/services/${s.slug}`}
                              onClick={() => close()}
                              className="group/item flex items-center rounded-2xl px-4 py-3 text-main-color no-underline transition-colors hover:bg-cream"
                            >
                              <span className="min-w-0">
                                <span className="block text-sm font-semibold leading-tight transition-colors group-hover/item:text-primary-color">
                                  {s.title}
                                </span>
                                <span className="mt-0.5 line-clamp-2 block text-xs leading-snug text-main-color/60">
                                  {s.summary}
                                </span>
                              </span>
                            </Link>
                          ))}
                        </div>
                        <div className="mt-2 flex items-center justify-between rounded-2xl bg-cream px-4 py-3">
                          <span className="text-xs text-main-color/60">
                            Not sure which treatment you need?
                          </span>
                          <Link
                            href="/services"
                            onClick={() => close()}
                            className="inline-flex items-center gap-2 text-sm font-medium text-primary-color no-underline hover:text-dark-primary-color"
                          >
                            View all services <span aria-hidden="true">→</span>
                          </Link>
                        </div>
                      </>
                    )}
                  </PopoverPanel>
                </Transition>
              </Popover>

              <a
                href="/doctors"
                className="text-base font-normal leading-6 text-inherit no-underline"
              >
                Our Doctors
              </a>
              <a
                href="/contact"
                className="text-base font-normal leading-6 text-inherit no-underline"
              >
                Contact Us
              </a>

              <a
                href="/register/signIn"
                className="text-base font-normal leading-6 text-inherit no-underline"
                onClick={isLoggedIn ? handleLogout : handleLogin}
              >
                {isLoggedIn ? "Logout" : "Login"}
              </a>
            </PopoverGroup>
            <Link
              href="/booking"
              className={`ms-6 xl:ms-10 rounded-full border px-5 py-1.5 text-base no-underline transition-colors   ${
                light
                  ? "border-primary-color bg-primary-color text-white hover:bg-dark-primary-color "
                  : "border-primary-color text-white hover:bg-dark-primary-color hover:text-main-color"
              }`}
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={closeMenu}
        className="relative z-50 lg:hidden"
      >
        <DialogBackdrop
          className={`fixed inset-0 bg-black/60 ${
            menuClosing ? "animate-fade-out" : "animate-fade-in"
          }`}
        />
        <div className="fixed inset-0 flex justify-end">
          <DialogPanel
            className={`flex h-full w-full max-w-sm flex-col bg-main-color text-white shadow-2xl ${
              menuClosing ? "animate-menu-out" : "animate-menu-in"
            }`}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <a
                href="/"
                className="flex items-center gap-2 no-underline"
                onClick={() => closeMenu()}
              >
                <img
                  src="/logo-tooth.png"
                  alt=""
                  aria-hidden="true"
                  className="h-8 w-auto"
                />
                <img
                  src="/logo-text.png"
                  alt="Luxury Dental Care"
                  className="h-7 w-auto"
                />
              </a>
              <button
                type="button"
                aria-label="Close menu"
                className="p-2 -mr-2 text-white"
                onClick={() => closeMenu()}
              >
                <MdOutlineClose className="h-7 w-7" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-6 py-4">
              <ul className="m-0 list-none p-0">
                <li className="border-b border-white/10">
                  <Link
                    href="/"
                    onClick={() => closeMenu()}
                    className="block py-4 font-display text-2xl text-white no-underline"
                  >
                    Home
                  </Link>
                </li>
                <li className="border-b border-white/10">
                  <Disclosure>
                    <DisclosureButton className="flex w-full items-center justify-between py-4 font-display text-2xl text-white">
                      Services
                      <IoIosArrowDown
                        className="h-5 w-5 text-primary-color"
                        aria-hidden="true"
                      />
                    </DisclosureButton>
                    <DisclosurePanel className="pb-3">
                      {products.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => closeMenu()}
                          className="block py-2 pl-3 text-base text-white/70 no-underline hover:text-white"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </DisclosurePanel>
                  </Disclosure>
                </li>
                <li className="border-b border-white/10">
                  <Link
                    href="/doctors"
                    onClick={() => closeMenu()}
                    className="block py-4 font-display text-2xl text-white no-underline"
                  >
                    Our Doctors
                  </Link>
                </li>
                <li className="border-b border-white/10">
                  <Link
                    href="/contact"
                    onClick={() => closeMenu()}
                    className="block py-4 font-display text-2xl text-white no-underline"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="space-y-4 border-t border-white/10 px-6 py-6">
              <Link
                href="/booking"
                onClick={() => closeMenu()}
                className="block rounded-full bg-primary-color py-3 text-center text-sm font-medium text-white no-underline hover:bg-dark-primary-color"
              >
                Book Appointment
              </Link>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </header>
  );
}
