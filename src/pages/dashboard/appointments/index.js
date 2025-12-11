import React, { useEffect } from "react";
import DashboardLayout from "../../../components/DashboardLayout";
import API_URL from "../../api/config";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { FaTrashAlt } from "react-icons/fa";
import ConfirmModal from "../../../components/confirmModel";

const domain = `${API_URL}`;
const getReservstionUrl = `${domain}/api/reservation/appointments/`;
const singleReservstionUrl = `${domain}/api/reservation/appointments/`;
const getDoctorsUrl = `${domain}/api/doctors/`;

function appointments() {
  const [reservationsData, setReservationsData] = React.useState([]);
  const router = useRouter();
  const [showModal, setShowModal] = React.useState(false);
  const [selectedDeleteUser, setSelectedDeleteUser] = React.useState(null);
  const [allDoctors, setAllDoctors] = React.useState([]);
  const [singleDoctor, setSingleDoctor] = React.useState("");

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(getReservstionUrl, {
          headers: {
            Authorization: localStorage.getItem("Token1"),
          },
        });

        console.log("booking Response:", response.data);
        setReservationsData(response.data); // ✅ Correctly set the response data
      } catch (error) {
        console.error(
          "Error fetching reservations:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchReservations();
  }, []);
  console.log("reservationsData", reservationsData);
  useEffect(() => {
    const fetchAllDoctors = async () => {
      try {
        const response = await axios.get(getDoctorsUrl, {
          headers: {
            Authorization: localStorage.getItem("Token1"),
          },
        });

        console.log("Doctors Response:", response.data);
        setAllDoctors(response.data); // ✅ Correctly set the response data
      } catch (error) {
        console.error(
          "Error fetching AllDoctors:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchAllDoctors();
  }, []);

  const handleDeleteClick = (user) => {
    setSelectedDeleteUser(user);
    setShowModal(true);
  };

  const handleDeleteProject = async () => {
    try {
      const response = await axios.delete(
        `${singleReservstionUrl}${selectedDeleteUser.id}/`,
        {
          headers: { Authorization: `${localStorage.getItem("Token1")}` }, // Use Bearer for better security
        }
      );

      console.log("Item deleted successfully:", response.data);

      // Close modal before reloading
      setShowModal(false);

      // Reload after a short delay to ensure UI updates
      setTimeout(() => {
        window.location.reload();
      }, 150);
    } catch (error) {
      window.location.reload();
      console.error(
        "Error deleting item:",
        error.response?.data || error.message
      );
    }
  };
  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-white shadow-md rounded-xl">
        <h1 className="text-2xl font-bold text-gray-800">Appointments List</h1>
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

          <button className="bg-main-color  text-white text-sm font-medium px-4 py-2 rounded-full">
            + Add Appointment
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
        {reservationsData.map((reservation) => {
          const selecteddoctor = allDoctors.find(
            (doc) => doc.id == reservation.doctor
          );
          // setSingleDoctor(doctor);
          return (
            <div className="flex items-start justify-between bg-white p-4 gap-4 text-black shadow-md rounded-xl ">
              <Link
                href={{
                  pathname: `/dashboard/appointments/${reservation.id}`,
                  query: {
                    reservationId: `${reservation.id}`,
                  },
                }}
                key={reservation.id}
                className="no-underline text-black "
              >
                <div>
                  <div className="flex items-center justify-start gap-1">
                    <div className="text-md md:text-lg font-semibold">
                      Name:
                    </div>
                    <div>{reservation.full_name}</div>
                  </div>
                  <div className="flex items-center justify-start gap-1">
                    <div className="text-md md:text-lg font-semibold">Age:</div>
                    <div>{reservation.age}</div>
                  </div>
                  <div className="flex items-center justify-start gap-1">
                    <div className="text-md md:text-lg font-semibold">
                      doctor:
                    </div>
                    <div>{selecteddoctor?.full_name}</div>
                  </div>
                  <div className="flex items-center justify-start gap-1">
                    <div className="text-md md:text-lg font-semibold">
                      Appointment date:
                    </div>
                    <div>{reservation.appointment_date}</div>
                  </div>
                  <div className="flex items-center justify-start gap-1">
                    <div className="text-md md:text-lg font-semibold">
                      Appointment time:
                    </div>
                    <div>{reservation.appointment_time}</div>
                  </div>
                  {reservation.message && (
                    <div className="flex items-center justify-start gap-1">
                      <div className="text-md md:text-lg font-semibold">
                        Message:
                      </div>
                      <div>{reservation.message}</div>
                    </div>
                  )}
                </div>
              </Link>
              <div>
                <button onClick={() => handleDeleteClick(reservation)}>
                  <FaTrashAlt
                    style={{ width: "20px" }}
                    className="hover:text-red-500"
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <ConfirmModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={handleDeleteProject}
        message={`Are you sure you want to delete ${selectedDeleteUser?.full_name}?`}
      />
    </DashboardLayout>
  );
}

export default appointments;
