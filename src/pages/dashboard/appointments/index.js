import React, { useEffect } from "react";
import DashboardLayout from "../../../components/DashboardLayout";
import API_URL from "../../api/config";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

const domain = `${API_URL}`;
const getReservstionUrl = `${domain}/api/reservation/appointments/`;

function appointments() {
  const [reservationsData, setReservationsData] = React.useState([]);
  const router = useRouter();

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
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {reservationsData.map((reservation) => (
          <Link
            href={{
              pathname: `/dashboard/appointments/${reservation.id}`,
              query: {
                reservationId: `${reservation.id}`,
              },
            }}
            key={reservation.id}
            className="bg-light-main-color p-4 rounded-lg grid  gap-4 no-underline"
          >
            <div className="flex items-center justify-start gap-1">
              <div className="text-md md:text-lg font-semibold">Name:</div>
              <div>{reservation.full_name}</div>
            </div>
            <div className="flex items-center justify-start gap-1">
              <div className="text-md md:text-lg font-semibold">Age:</div>
              <div>{reservation.age}</div>
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
                <div className="text-md md:text-lg font-semibold">Message:</div>
                <div>{reservation.message}</div>
              </div>
            )}
          </Link>
        ))}
      </div>
    </DashboardLayout>
  );
}

export default appointments;
