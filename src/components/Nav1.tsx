import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import { IoIosArrowDown } from 'react-icons/io'
import * as Logo from '../../public/logo.jpg'
import Image from 'next/image'
import { TiThMenuOutline } from "react-icons/ti";



const products = [
  { name: 'General', href: '#' },
  { name: 'Surgical', href: '#' },
  { name: 'Cosmetic', href: '#' },

]
const aboutinfo = [
  { name: 'Contact Us', href: '#' },
  { name: 'Our Doctors', href: '#' },
  // { name: 'Cosmetic', href: '#' },

]


function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-main-color text-white mb-5 fixed top-0 w-full z-20">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6  lg:px-8 " aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <Image className=" w-20 md:w-32 " src={Logo} alt="" />
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
        <div className='block md:hidden'>
          <button>< TiThMenuOutline className="w-7 h-7" /></button>
        </div>
        <div className='hidden md:block'>
          <div className='flex justify-end items-center'>
            <p className='text-primary-color capitalize'>call us now: <span className='text-gray-100'>01032946286</span></p>
          </div>
          <div className='flex items-center'>
            <Popover.Group className="hidden lg:flex lg:gap-x-10">


              <Popover className="relative">
                <Popover.Button className="flex items-center gap-x-1 text-md font-semibold leading-6 text-white">
                  About
                  <IoIosArrowDown className="h-4 w-4 flex-none text-white" aria-hidden="true" />

                </Popover.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-52 max-w-md overflow-hidden rounded-md bg-main-color shadow-lg ring-1 ring-gray-900/5">
                    <div className="p-4">
                      {aboutinfo.map((item) => (
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

                  </Popover.Panel>
                </Transition>
              </Popover>

              <Popover className="relative">
                <Popover.Button className="flex items-center gap-x-1 text-md font-semibold leading-6 text-white">
                  Services
                  <IoIosArrowDown className="h-4 w-4 flex-none text-white" aria-hidden="true" />

                </Popover.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-40 max-w-md overflow-hidden rounded-md bg-main-color shadow-lg ring-1 ring-gray-900/5">
                    <div className="p-4">
                      {products.map((item) => (
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

                  </Popover.Panel>
                </Transition>
              </Popover>


              <a href="#" className="text-md font-semibold leading-6 text-white no-underline">
                New Patients

              </a>


            </Popover.Group>
            <button className="hidden lg:flex  lg:justify-center bg-[#C5B069] w-28 h-10 px-4 py-2 rounded-full ms-7">
              <a href="#" className="text-md font-semibold leading-6 text-white no-underline">
                Book
                {/* <span aria-hidden="true">&rarr;</span> */}
              </a>
            </button>

          </div>


        </div>

      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              {/* <XMarkIcon className="h-6 w-6" aria-hidden="true" /> */}
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <a
                        href="#"
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-50 no-underline">
                        About
                      </a>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-white hover:bg-gray-50">
                        Services
                        {/* <ChevronDownIcon
                          className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                          aria-hidden="true"
                        /> */}
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {products.map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-lg py-2 pl-6 pr-3 text-md font-semibold leading-7 text-white hover:bg-gray-50 no-underline"
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
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
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
