// components/DashboardLayout.js
import React from "react";
import Link from "next/link";
import API_URL from "../pages/api/config";
import axios from "axios";

const domain = `${API_URL}`;
const logoutUrl = `${domain}/api/register/logout/`;

const DashboardLayout = ({ children }) => {
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
                href="/dashboard/patients"
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
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span>Dr. Moustafa</span>
            <img
              src="/images/Doctors/doctor1.png"
              alt="Doctor Avatar"
              className="w-10 h-10 rounded-full"
            />
            <button className="px-3 py-1 bg-primary-color text-white rounded hover:bg-dark-primary-color">
              Logout
            </button>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
