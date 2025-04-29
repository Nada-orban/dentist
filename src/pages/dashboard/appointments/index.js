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

        console.log("API Response:", response.data);
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
  useEffect(() => {
    const fetchAllDoctors = async () => {
      try {
        const response = await axios.get(getDoctorsUrl, {
          headers: {
            Authorization: localStorage.getItem("Token1"),
          },
        });

        console.log("API Response:", response.data);
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {reservationsData.map((reservation) => {
          const selecteddoctor = allDoctors.find(
            (doc) => doc.id == reservation.doctor
          );
          // setSingleDoctor(doctor);
          return (
            <div className="flex items-start justify-between bg-light-main-color p-4 rounded-lg    gap-4 text-white ">
              <Link
                href={{
                  pathname: `/dashboard/appointments/${reservation.id}`,
                  query: {
                    reservationId: `${reservation.id}`,
                  },
                }}
                key={reservation.id}
                className="no-underline text-white "
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
