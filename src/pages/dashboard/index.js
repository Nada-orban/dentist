import React from "react";
import Link from "next/link";

const DoctorDashboard = () => {
  return (
    <div className="min-h-screen flex ">
      {/* Sidebar */}
      <aside className="w-64 bg-main-color text-white p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold">Doctor Dashboard</h2>
        </div>
        <nav>
          <ul>
            <li className="mb-4 ">
              <Link
                className="text-white no-underline"
                href="/doctor/dashboard"
              >
                <p className=" hover:text-primary-color">Home</p>
              </Link>
            </li>
            <li className="mb-4">
              <Link
                className="text-white no-underline"
                href="/doctor/pppointments"
              >
                <p className=" hover:text-primary-color">Appointments</p>
              </Link>
            </li>
            <li className="mb-4">
              <Link className="text-white no-underline" href="/doctor/patients">
                <p className=" hover:text-primary-color">Patients</p>
              </Link>
            </li>
            <li className="mb-4">
              <Link className="text-white no-underline" href="/doctor/messages">
                <p className=" hover:text-primary-color">Messages</p>
              </Link>
            </li>
            <li className="mb-4">
              <Link className="text-white no-underline" href="/doctor/reports">
                <p className=" hover:text-primary-color">Reports</p>
              </Link>
            </li>
            <li className="mb-4">
              <Link className="text-white no-underline" href="/doctor/settings">
                <p className=" hover:text-primary-color">Settings</p>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span>Dr. Smith</span>
            <img
              src="/doctor-avatar.jpg"
              alt="Doctor Avatar"
              className="w-10 h-10 rounded-full"
            />
            <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
              Logout
            </button>
          </div>
        </header>

        {/* Main Section */}
        <section className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Welcome, Dr. Smith!</h2>
          <p className="text-gray-600">
            Here's an overview of your activities today.
          </p>
          {/* Example Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="bg-blue-100 p-4 rounded-lg">
              <h3 className="font-semibold">Today's Appointments</h3>
              <p className="text-2xl">5</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <h3 className="font-semibold">New Patients</h3>
              <p className="text-2xl">2</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DoctorDashboard;
