import React, { useState, useEffect } from "react";
import DashboardLayout from "../../../components/DashboardLayout";
import API_URL from "../../api/config";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { Dialog } from "@headlessui/react";
import AddPatient from "../../../components/addPatient";

const domain = `${API_URL}`;
const getPatientsUrl = `${domain}/api/dashboard/patientInfo/`;
const singlePatientUrl = `${domain}/api/dashboard/patient/<int:pk>/`;
// const patientHistoryUrl = `${domain}/api/dashboard`;

function patients() {
  const [patientsData, setPatientsData] = React.useState([]);
  let [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(getPatientsUrl, {
          headers: {
            Authorization: localStorage.getItem("Token1"),
          },
        });

        console.log("patients Response:", response.data);
        setPatientsData(response.data); // ✅ Correctly set the response data
      } catch (error) {
        console.error(
          "Error fetching patient:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchPatients();
  }, []);
  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-white shadow-md rounded-xl">
        <h1 className="text-2xl font-bold text-gray-800">Patients List</h1>
        <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search Patients"
              className="w-full border border-gray-300 rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary-color"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-4.35-4.35M16.65 10.5A6.15 6.15 0 1110.5 4.35a6.15 6.15 0 016.15 6.15z"
              />
            </svg>
          </div>

          <button
            className="bg-main-color  text-white text-sm font-medium px-4 py-2 rounded-full"
            onClick={() => setIsOpen(true)}
          >
            + Add Patients
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1  lg:grid-cols-2  gap-4 my-3">
        {patientsData?.map((patient) => {
          return (
            <div className="patient-card">
              <div className="card-header">
                <h3 className="patient-name">{patient.patient_name}</h3>
                <div>
                  <p className="flex items-center gap-2 text-sm mb-1">
                    <FaPhoneAlt />
                    <span className="text-primary-color text-sm">
                      {patient.phone}
                    </span>
                  </p>
                  <p className="flex items-center gap-2 text-sm mb-1">
                    <IoMail />
                    <span className="text-primary-color text-sm">
                      {patient.email}
                    </span>
                  </p>
                </div>
              </div>

              {/* <div className="card-subheader">
                <p className="email">{patient.email}</p>
              </div> */}

              <div className="card-body">
                <p>
                  <span>Gender:</span> {patient.gender}
                </p>
                <p>
                  <span>Age:</span> {patient.age}
                </p>
                <p>
                  <span>Address:</span> {patient.address}
                </p>
                <p>
                  <span>Allergies:</span> {patient.allergies || "None"}
                </p>
                <p>
                  <span>Medications:</span> {patient.medications || "None"}
                </p>
                <p>
                  <span>Emergency Contact:</span> {patient.emergency || "None"}
                </p>
                <p>
                  <span>Created:</span> {patient.createdAt || "None"}
                </p>
                <p>
                  <span>Last Updated:</span> {patient.updatedAt || "None"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50 overflow-y-auto"
      >
        <AddPatient />
      </Dialog>
    </DashboardLayout>
  );
}

export default patients;
