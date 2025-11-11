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
    </DashboardLayout>
  );
}

export default DoctorDashboard;
