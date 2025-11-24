// components/DashboardLayout.js
import React from "react";
import Link from "next/link";
import API_URL from "../pages/api/config";
import axios from "axios";
import { IoSettingsSharp } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

const domain = `${API_URL}`;
const logoutUrl = `${domain}/api/register/logout/`;

const callsToAction = [
  { name: "Settings", href: "#" },
  { name: "Sign Out", href: "#" },
];
const DashboardLayout = ({ children, doctorData }) => {
  return (
    <div className="min-h-screen flex">
      {/* Aside Navigation */}
      <aside className="w-64 bg-main-color text-white p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary-color">
            Doctor Dashboard
          </h2>
        </div>
        <nav>
          <ul>
            <li className="mb-4 ">
              <Link className="text-white no-underline" href="/dashboard">
                <p className=" hover:text-primary-color">Home</p>
              </Link>
            </li>
            <li className="mb-4">
              <Link
                className="text-white no-underline"
                href="/dashboard/appointments"
              >
                <p className=" hover:text-primary-color">Appointments</p>
              </Link>
            </li>
            <li className="mb-4">
              <Link
                className="text-white no-underline"
                href="/dashboard/patient"
              >
                <p className=" hover:text-primary-color">Patients</p>
              </Link>
            </li>
            <li className="mb-4">
              <Link
                className="text-white no-underline"
                href="/dashboard/messages"
              >
                <p className=" hover:text-primary-color">Messages</p>
              </Link>
            </li>

            <li className="mb-4">
              <Link
                className="text-white no-underline"
                href="/dashboard/settings"
              >
                <p className=" hover:text-primary-color">Settings</p>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        {/* Header */}
        {/* <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold"></h1>
          <div className="flex items-center space-x-4">
            <span>Dr.{doctorData?.doctor?.full_name}</span>

            <Popover className="relative">
              <PopoverButton className="inline-flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900">
                <img
                  src="/images/Doctors/doctor1.png"
                  alt="Doctor Avatar"
                  className="w-10 h-10 rounded-full"
                />
              </PopoverButton>

              <PopoverPanel
                transition
                className="absolute right-1000px z-10 mt-1 flex w-60 max-w-max -translate-x-1/2 px-4 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
              >
                <div className="w-screen max-w-md flex-auto overflow-hidden rounded-xl bg-white text-sm/6 shadow-lg ring-1 ring-gray-900/5">
                  <div className="grid grid-cols-1 divide-x divide-gray-900/5 bg-gray-50">
                    {callsToAction.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className=" items-center justify-center  p-3 font-semibold text-gray-900 hover:bg-gray-100 border bottom-1"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </PopoverPanel>
            </Popover>
          </div>
        </header> */}
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
