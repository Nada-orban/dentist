import React, { useEffect } from "react";
import Link from "next/link";
import DashboardLayout from "../../components/DashboardLayout";
import API_URL from "../api/config";
import axios from "axios";

const domain = `${API_URL}`;
const getDashboardDoctorUrl = `${domain}/api/dashboard/doctor/`;

function DoctorDashboard() {
  const [doctorData, setDoctorData] = React.useState(null);

  useEffect(() => {
    const fetchDashboardDoctorData = async () => {
      try {
        const response = await axios.get(getDashboardDoctorUrl, {
          headers: {
            Authorization: localStorage.getItem("Token1"),
          },
        });

        console.log("dashboard doctor Response:", response.data);
        setDoctorData(response.data); // ✅ Correctly set the response data
      } catch (error) {
        console.error(
          "Error fetching reservations:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchDashboardDoctorData();
  }, []);

  return (
    <DashboardLayout doctorData={doctorData}>
      {/* Main Section */}

      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">
          Welcome, Dr. {doctorData?.doctor?.full_name}
        </h2>
        <p className="text-gray-600">
          Here's an overview of your activities today.
        </p>
        {/* Example Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="bg-blue-100 p-4 rounded-lg">
            <h3 className="font-semibold">Appointments</h3>
            <p className="text-2xl">{doctorData?.appointments.length}</p>
          </div>
          {/* <div className="bg-green-100 p-4 rounded-lg">
            <h3 className="font-semibold">New Patients</h3>
            <p className="text-2xl">2</p>
          </div> */}
        </div>
      </section>
      <div class="patient-card mt-3">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">
          Today Appointment
        </h2>

        <table class="w-full border-separate border-spacing-y-3">
          <thead>
            <tr class="text-left text-sm text-gray-500">
              <th class="px-3">Patient</th>
              <th class="px-3">Name / Diagnosis</th>
              <th class="px-3 text-right">Time</th>
            </tr>
          </thead>

          <tbody>
            <tr class="bg-gray-50 rounded-lg">
              <td class="px-3 py-3">
                <img
                  src="https://i.pravatar.cc/40?img=1"
                  class="w-10 h-10 rounded-full object-cover"
                  alt="patient"
                />
              </td>

              <td class="px-3 py-3">
                <p class="font-medium text-gray-800">M.J. Mical</p>
                <p class="text-sm text-gray-500">Health Checkup</p>
              </td>

              <td class="px-3 py-3 text-right">
                <span class="inline-block px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-600">
                  On Going
                </span>
              </td>
            </tr>

            <tr class="bg-gray-50 rounded-lg">
              <td class="px-3 py-3">
                <img
                  src="https://i.pravatar.cc/40?img=2"
                  class="w-10 h-10 rounded-full object-cover"
                  alt="patient"
                />
              </td>

              <td class="px-3 py-3">
                <p class="font-medium text-gray-800">Sanath Deo</p>
                <p class="text-sm text-gray-500">Health Checkup</p>
              </td>

              <td class="px-3 py-3 text-right">
                <span class="inline-block px-3 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-600">
                  12:30 PM
                </span>
              </td>
            </tr>

            <tr class="bg-gray-50 rounded-lg">
              <td class="px-3 py-3">
                <img
                  src="https://i.pravatar.cc/40?img=3"
                  class="w-10 h-10 rounded-full object-cover"
                  alt="patient"
                />
              </td>

              <td class="px-3 py-3">
                <p class="font-medium text-gray-800">Lecara Phanj</p>
                <p class="text-sm text-gray-500">Report</p>
              </td>

              <td class="px-3 py-3 text-right">
                <span class="inline-block px-3 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-600">
                  01:00 PM
                </span>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="mt-4 text-sm text-blue-600 font-medium cursor-pointer">
          See All
        </div>
      </div>
    </DashboardLayout>
  );
}

export default DoctorDashboard;
