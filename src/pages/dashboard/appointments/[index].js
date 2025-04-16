import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../components/DashboardLayout";
import API_URL from "../../api/config";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { useRouter } from "next/router";

const domain = `${API_URL}`;
const singleReservstionUrl = `${domain}/api/reservation/appointments/`;

function Appointment() {
  const router = useRouter();
  const { reservationId } = router.query;
  const [reservation_Id, setReservation_Id] = useState("");
  const [reservationData, setReservationData] = useState("");
  const [editreservationData, setEditReservationData] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  // useEffect(() => {
  //   if (reservationId) {
  //     setReservation_Id(reservationId);
  //   }
  // }, [reservationId]);
  console.log("reservationId", reservationId);
  useEffect(() => {
    if (!reservationId) return;
    try {
      if (reservationId != 0) {
        axios
          .get(`${singleReservstionUrl}${reservationId}/`, {
            headers: {
              Authorization: localStorage.getItem("Token1"),
            },
          })
          .then((res) => {
            console.log("res", res.data);
            setReservationData(res.data);
          });
      }
    } catch (error) {
      console.error(
        "Error fetching reservations:",
        error.response ? error.response.data : error.message
      );
    }
  }, [reservationId]);

  useEffect(() => {
    if (reservationData) {
      setEditReservationData({
        full_name: reservationData.full_name,
        phone: reservationData.phone,
        age: reservationData.age,
        appointment_date: reservationData.appointment_date,
        appointment_time: reservationData.appointment_time,
        email: reservationData.email,
        number_of_phases: reservationData.number_of_phases,
        message: reservationData.message,
      });
    }
  }, [reservationData]);

  const handleEdit = () => {

  };

 
  return (
    <DashboardLayout>
      <div
        // key={reservation.id}
        className=" flex items-start justify-between  w-full mt-5  p-10  rounded-lg "
      >
        <div className="w-3/4">
          <div className=" flexInfoBox">
            <div className="text-md md:text-lg font-semibold">Name:</div>
            {editMode ? (
              <input
                type="text"
                value={editreservationData?.full_name}
                onChange={(e) =>
                  setEditReservationData({
                    ...editreservationData,
                    full_name: e.target.value,
                  })
                }
                className="border p-2 rounded-md w-full"
              />
            ) : (
              <div className="infobBox">{reservationData?.full_name}</div>
            )}
          </div>
          <div className="flexInfoBox">
            <div className="text-md md:text-lg font-semibold">Age:</div>
            {editMode ? (
              <input
                type="text"
                value={editreservationData?.age}
                onChange={(e) =>
                  setEditReservationData({
                    ...editreservationData,
                    age: e.target.value,
                  })
                }
                className="border p-2 rounded-md w-full"
              />
            ) : (
              <div className="infobBox">{reservationData?.age}</div>
            )}
          </div>
          <div className="flexInfoBox">
            <div className="text-md md:text-lg font-semibold">
              Appointment date:
            </div>
            {editMode ? (
              <input
                type="date"
                value={editreservationData?.appointment_date}
                onChange={(e) =>
                  setEditReservationData({
                    ...editreservationData,
                    appointment_date: e.target.value,
                  })
                }
                className="border p-2 rounded-md w-full"
              />
            ) : (
              <div className="infobBox">
                {reservationData?.appointment_date}
              </div>
            )}
          </div>
          <div className="flexInfoBox">
            <div className="text-md md:text-lg font-semibold">
              Appointment time:
            </div>
            {editMode ? (
              <input
                type="time"
                value={editreservationData?.appointment_time}
                onChange={(e) =>
                  setEditReservationData({
                    ...editreservationData,
                    appointment_time: e.target.value,
                  })
                }
                className="border p-2 rounded-md w-full"
              />
            ) : (
              <div className="infobBox">
                {reservationData?.appointment_time}
              </div>
            )}
          </div>

          <div className="flexInfoBox">
            <div className="text-md md:text-lg font-semibold">Message:</div>
            {editMode ? (
              <input
                type="text"
                value={editreservationData?.message}
                onChange={(e) =>
                  setEditReservationData({
                    ...editreservationData,
                    message: e.target.value,
                  })
                }
                className="border p-2 rounded-md w-full"
              />
            ) : (
              <div className="infobBox">{reservationData?.message}</div>
            )}
          </div>
        </div>
        <div className="flex items-center justify-end gap-1">
          <button onClick={handleEdit}>
            <MdModeEdit
              style={{ width: "20px" }}
              className="hover:text-primary-color"
            />
          </button>
          {/* <button onClick={() => handleDeleteClick(reservationId)}>
            <FaTrashAlt
              style={{ width: "20px" }}
              className="hover:text-red-500"
            />
          </button> */}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Appointment;
