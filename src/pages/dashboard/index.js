import React from "react";
import Link from "next/link";
import DashboardLayout from "../../components/DashboardLayout";

const DoctorDashboard = () => {
  return (
    <DashboardLayout>
      {/* Main Section */}
      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Welcome, Dr. Moustafa!</h2>
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
    </DashboardLayout>
  );
};

export default DoctorDashboard;
