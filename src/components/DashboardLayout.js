// components/DashboardLayout.js
import React from "react";
import Link from "next/link";
import API_URL from "../pages/api/config";
import axios from "axios";
import { IoSettingsSharp } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { MdDashboard } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { MdOutlinePayment } from "react-icons/md";
import { FaRegUser, FaHospitalUser } from "react-icons/fa";
import { IoIosSettings, IoIosLogOut } from "react-icons/io";
import { useRouter } from "next/router";

const domain = `${API_URL}`;
const logoutUrl = `${domain}/api/register/logout/`;

const callsToAction = [
  { name: "Settings", href: "#" },
  { name: "Sign Out", href: "#" },
];
const navItems = [
  { label: "Home", href: "/dashboard", icon: MdDashboard },
  { label: "Appointments", href: "/dashboard/appointments", icon: SlCalender },
  { label: "Patients", href: "/dashboard/patient", icon: FaHospitalUser },
  { label: "Profile", href: "/dashboard/messages", icon: FaRegUser },
  { label: "Settings", href: "/dashboard/settings", icon: IoIosSettings },
];

const DashboardLayout = ({ children, doctorData }) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch(logoutUrl, { method: "POST", credentials: "include" });
      router.push("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-60 bg-main-color text-white flex flex-col py-8 px-4 shadow-lg">
        {/* Doctor Profile */}
        <div className="flex flex-col items-center mb-8">
          <div className="ring-4 ring-white/30 rounded-full">
            <img
              src="/images/Doctors/doctor1.png"
              alt="Doctor Avatar"
              className="w-20 h-20 rounded-full object-cover"
            />
          </div>
          <h3 className="mt-4 text-base font-semibold text-center">
            Dr. {doctorData?.doctor?.full_name || "Loading..."}
          </h3>
          <p className="text-sm text-white/60 mt-1">
            {doctorData?.doctor?.specialty || "Specialist"}
          </p>
          <hr className="w-full mt-4 border-white/20" />
        </div>

        {/* Navigation */}
        <nav className="flex-1">
          <ul className="flex flex-col gap-1">
            {navItems.map(({ label, href, icon: Icon }) => {
              const isActive = router.pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors no-underline
                      ${
                        isActive
                          ? "bg-white/20 text-white font-semibold"
                          : "text-white/80 hover:bg-white/10 hover:text-white"
                      }`}
                  >
                    <Icon size={18} />
                    <span className="text-sm">{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2.5 mt-4 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors w-full text-left"
        >
          <IoIosLogOut size={18} />
          <span className="text-sm">Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100 overflow-auto">{children}</main>
    </div>
  );
};

export default DashboardLayout;
