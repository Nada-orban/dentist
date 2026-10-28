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
    router.push("/login");
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
                    ? "relative h-9 w-auto mr-2.5 sm:mr-3"
                    : "relative h-9 w-auto mr-2.5 sm:mr-0 sm:absolute sm:left-0 sm:top-1/2 sm:-translate-y-1/2 sm:opacity-45 sm:h-16 lg:h-20"
              }
            />
            <img
              src={light ? "/logo-dark-text.png" : "/logo-text.png"}
              alt="Luxury Dental Care"
              className={`relative z-10 w-auto transition-all duration-300 ${
                light
                  ? "h-7 sm:h-6 "
                  : dark
                    ? "h-7 sm:h-9"
                    : "h-7 sm:h-12 lg:h-14"
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
            <PopoverGroup className="hidden lg:flex lg:gap-x-10">
              <a
                href=""
                className="text-base font-normal leading-6 text-inherit no-underline"
              >
                About
              </a>

              <Popover className="relative">
                <PopoverButton className="flex items-center gap-x-1 text-base font-normal leading-6 text-inherit">
                  Services
                  <IoIosArrowDown
                    className="h-4 w-4 flex-none text-inherit"
                    aria-hidden="true"
                  />
                </PopoverButton>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <PopoverPanel className="absolute -left-8 top-full z-10 mt-3 w-56 max-w-md overflow-hidden rounded-md bg-white shadow-xl ring-1 ring-gray-900/5">
                    <div className="p-4">
                      {products.map((item) => (
                        <div
                          key={item.name}
                          className="group relative flex items-center gap-x-6 rounded-lg p-4 text-base leading-6 hover:bg-cream"
                        >
                          <div className="flex-auto">
                            <a
                              href={item.href}
                              className="block font-medium text-main-color no-underline"
                            >
                              {item.name}
                              <span className="absolute inset-0" />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </PopoverPanel>
                </Transition>
              </Popover>

              {/* <a href="#" className="text-base font-normal leading-6 text-inherit no-underline">
                New Patients

                
              </a> */}
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
              className={`ms-10 rounded-full border px-5 py-1.5 text-base no-underline transition-colors  ${
                light
                  ? "border-primary-color bg-primary-color text-white hover:bg-dark-primary-color"
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
              {/* <div className="flex items-center justify-between text-sm">
                <a href="tel:01032946286" className="text-white/80 no-underline">
                  01032946286
                </a>
                {isLoggedIn ? (
                  <button
                    type="button"
                    className="text-white/80"
                    onClick={() => {
                      closeMenu();
                      handleLogout();
                    }}
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    href="/register/signIn"
                    onClick={() => closeMenu()}
                    className="text-white/80 no-underline"
                  >
                    Login
                  </Link>
                )}
              </div> */}
            </div>
          </DialogPanel>
        </div>
      </Dialog>
      {/* <Dialog as="div" className="hidden " open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed bottom-0 top-20 right-0 z-30 w-full overflow-y-auto bg-main-color px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10     ">
      
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-primary-color0/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>

                      <DisclosureButton className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-white hover:bg-primary-color">
                        About
                      
                      </DisclosureButton>
                      <DisclosurePanel className="mt-2 space-y-2">
                        {aboutinfo?.map((item) => (
                          <DisclosureButton
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-lg py-2 pl-6 pr-3 text-md font-semibold leading-7 text-white hover:bg-gray-50 no-underline"
                          >
                            {item.name}
                          </DisclosureButton>
                        ))}
                      </DisclosurePanel>
                      <DisclosureButton className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-white hover:bg-gray-50">
                        Services
                      
                      </DisclosureButton>
                      <DisclosurePanel className="mt-2 space-y-2">
                        {products.map((item) => (
                          <DisclosureButton
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-lg py-2 pl-6 pr-3 text-md font-semibold leading-7 text-white hover:bg-gray-50 no-underline"
                          >
                            {item.name}
                          </DisclosureButton>
                        ))}
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>

                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-50 no-underline"
                >
                  New Patients
                </a>

              </div>
              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-gray-50 no-underline"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
    </Dialog> */}
    </header>
  );
}
