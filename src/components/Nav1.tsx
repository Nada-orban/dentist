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
import { FaChevronRight, FaTooth } from "react-icons/fa";
import * as Logo from "../../public/logo.jpg";
import Image from "next/image";
import { TiThMenuOutline } from "react-icons/ti";
import Link from "next/link";
import { services } from "../data/services";
import { useRouter } from "next/router";

const products = services.map((s) => ({ name: s.title, href: `/services/${s.slug}` }));
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
        className="container mx-auto flex items-center justify-between px-6"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a
            href="/"
            className={`relative flex items-center no-underline transition-all duration-300 ${
              light ? "py-2.5 pl-0" : dark ? "py-3 pl-0" : "py-2 pl-5"
            }`}
          >
            <span className="sr-only">Luxury Dental Care</span>
            <img
              src={light ? "/logo-dark-tooth.png" : "/logo-tooth.png"}
              alt=""
              aria-hidden="true"
              className={
                light
                  ? "relative h-7 w-auto mr-2.5"
                  : dark
                  ? "relative h-9 w-auto mr-3"
                  : "absolute left-0 top-1/2 -translate-y-1/2 w-auto opacity-45 h-16 lg:h-20"
              }
            />
            <img
              src={light ? "/logo-dark-text.png" : "/logo-text.png"}
              alt="Luxury Dental Care"
              className={`relative z-10 w-auto transition-all duration-300 ${
                light ? "h-6" : dark ? "h-9" : "h-12 lg:h-14"
              }`}
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 "
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
          </button>
        </div>
        <div className="block lg:hidden">
          {mobileMenuOpen ? (
            <button>
              <MdOutlineClose
                className="w-7 h-7"
                onClick={() => setMobileMenuOpen(false)}
              />
            </button>
          ) : (
            <button>
              <TiThMenuOutline
                className="w-7 h-7"
                onClick={() => setMobileMenuOpen(true)}
              />
            </button>
          )}
        </div>
        <div className="hidden lg:block">
          <div className="flex justify-end items-center">
          </div>
          <div className={`flex items-center transition-all duration-300 ${light ? "py-0" : dark ? "py-3" : "py-5"}`}>
            <PopoverGroup className="hidden lg:flex lg:gap-x-10">
              <a
                href=""
                className="text-sm font-normal leading-6 text-inherit no-underline"
              >
                About
              </a>
              {/* <Popover className="relative">
                <PopoverButton className="flex items-center gap-x-1 text-sm font-normal leading-6 text-inherit">
                  About
                  <IoIosArrowDown className="h-4 w-4 flex-none text-white" aria-hidden="true" />

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
                  <PopoverPanel className="absolute -left-8 top-full z-10 mt-3 w-52 max-w-md overflow-hidden rounded-md bg-main-color shadow-lg ring-1 ring-gray-900/5">
                    <div className="p-4">
                      {aboutinfo?.map((item) => (
                        <div
                          key={item.name}
                          className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-primary-color"
                        >

                          <div className="flex-auto">
                            <a href={item.href} className="block font-semibold text-white no-underline">
                              {item.name}
                              <span className="absolute inset-0" />
                            </a>

                          </div>
                        </div>
                      ))}
                    </div>

                  </PopoverPanel>
                </Transition>
              </Popover> */}

              <Popover className="relative">
                <PopoverButton className="flex items-center gap-x-1 text-sm font-normal leading-6 text-inherit">
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
                          className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-cream"
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

              {/* <a href="#" className="text-sm font-normal leading-6 text-inherit no-underline">
                New Patients

                
              </a> */}
              <a
                href="/doctors"
                className="text-sm font-normal leading-6 text-inherit no-underline"
              >
                Our Doctors
              </a>
              <a
                href="/contact"
                className="text-sm font-normal leading-6 text-inherit no-underline"
              >
                Contact Us
              </a>

              <a
                href="/register/signIn"
                className="text-sm font-normal leading-6 text-inherit no-underline"
                onClick={isLoggedIn ? handleLogout : handleLogin}
              >
                {isLoggedIn ? "Logout" : "Login"}
              </a>
            </PopoverGroup>
            <Link
              href="/booking"
              className={`ms-10 rounded-full border px-5 py-1.5 text-sm no-underline transition-colors ${
                light
                  ? "border-primary-color bg-primary-color text-white hover:bg-dark-primary-color"
                  : "border-white/60 text-white hover:bg-white hover:text-main-color"
              }`}
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </nav>
      {mobileMenuOpen && (
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="relative z-10 overflow-hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex  pl-10">
                <DialogPanel
                  transition
                  className={`pointer-events-auto relative w-screen h-full bg-white  transform transition-all duration-700 ease-in-out  ${
                    mobileMenuOpen ? "translate-x-0" : "translate-x-full"
                  }`}
                >
                  {/* <TransitionChild>
                    <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 duration-500 ease-in-out data-[closed]:opacity-0 sm:-ml-10 sm:pr-4">
                      <button
 
                       onClick={() => setMobileMenuOpen(false)}
                       className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                     >
                       <span className="absolute -inset-2.5" />
                       <span className="sr-only">Close panel</span>
                       <IoCloseSharp aria-hidden="true" className="h-6 w-6" />
                     </button>
                    </div>
                  </TransitionChild> */}
                  <div className="flex h-full flex-col overflow-y-scroll bg-main-color py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <DialogTitle className="text-base font-semibold leading-6 text-gray-900">
                        Panel title
                      </DialogTitle>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                          <div className="space-y-2 py-6">
                            <a
                              href="/"
                              className="-mx-4 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-primary-color no-underline"
                            >
                              Home
                            </a>
                            <Disclosure as="div" className="-mx-3">
                              <DisclosureButton className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-white hover:bg-primary-color">
                                About
                                <IoIosArrowDown
                                  className="h-4 w-4 flex-none text-white"
                                  aria-hidden="true"
                                />
                              </DisclosureButton>
                              <DisclosurePanel className="mt-2 space-y-2">
                                {aboutinfo?.map((item) => (
                                  <DisclosureButton
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className="block rounded-lg py-2 pl-6 pr-3 text-md font-semibold leading-7 text-white hover:bg-primary-color no-underline"
                                  >
                                    - {item.name}
                                  </DisclosureButton>
                                ))}
                              </DisclosurePanel>
                            </Disclosure>

                            <Disclosure as="div" className="-mx-3">
                              <DisclosureButton className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-white hover:bg-primary-color">
                                Services
                                <IoIosArrowDown
                                  className="h-4 w-4 flex-none text-white"
                                  aria-hidden="true"
                                />
                              </DisclosureButton>
                              <DisclosurePanel className="mt-2 space-y-2">
                                {products.map((item) => (
                                  <DisclosureButton
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className="block rounded-lg py-2 pl-6 pr-3 text-md font-semibold leading-7 text-white hover:bg-primary-color no-underline"
                                  >
                                    - {item.name}
                                  </DisclosureButton>
                                ))}
                              </DisclosurePanel>
                            </Disclosure>

                            <button className=" btn1 btn-primary1 w-full mt-5">
                              <Link
                                href="/booking"
                                className="text-sm font-normal leading-6 text-inherit no-underline"
                              >
                                Book Online
                                {/* <span aria-hidden="true">&rarr;</span> */}
                              </Link>
                            </button>
                          </div>
                          {/* <div className="py-6">
                            <a
                              href="#"
                              className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-primary-color no-underline"
                            >
                              Log in
                            </a>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogPanel>
              </div>
            </div>
          </div>
        </Dialog>
      )}

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
