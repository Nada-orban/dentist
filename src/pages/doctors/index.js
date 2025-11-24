"use client";
import React, { useEffect, useState } from "react";
import API_URL from "../api/config";
import axios, { all } from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { IoMdAdd } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import AddDoctor from "../../components/addDoctor";
import ConfirmModal from "../../components/confirmModel";
import DoctorCard from "../../components/DoctorCard";

const domain = `${API_URL}`;
const getDoctorsUrl = `${domain}/api/doctors/`;
const addDoctorUrl = `${domain}/api/doctors/create/`;
const editDoctorUrl = `${domain}/api/doctors/`;
const deleteDoctorUrl = `${domain}/api/doctors/`;

function Doctors() {
  const [allDoctors, setAllDoctors] = React.useState([]);
  const [editDoctor, setEditDoctor] = useState("");
  const [singleDoctor, setSingleDoctor] = React.useState("");
  const [showModal, setShowModal] = React.useState(false);
  const [selectedDeleteUser, setSelectedDeleteUser] = React.useState(null);
  const [editMode, setEditMode] = useState(false);
  let [isOpen, setIsOpen] = useState(false);
  // console.log("Doctors component rendered");
  useEffect(() => {
    const fetchAllDoctors = async () => {
      try {
        const response = await axios.get(getDoctorsUrl, {
          headers: {
            Authorization: undefined,
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

  useEffect(() => {
    if (singleDoctor) {
      setEditDoctor({
        available_days: singleDoctor.available_days,
        bio: singleDoctor.bio,
        email: singleDoctor.email,
        start_time: singleDoctor.start_time,
        end_time: singleDoctor.end_time,
        experience_years: singleDoctor.experience_years,
        full_name: singleDoctor.full_name,
        gender: singleDoctor.gender,
        is_active: singleDoctor.is_active,
        phone: singleDoctor.phone,
        profile_image: singleDoctor.profile_image
          ? singleDoctor.profile_image
          : null,
        specialization: singleDoctor.specialization,
      });
    }
  }, [singleDoctor]);

  //delete doctor
  const handleDeleteClick = (doctor) => {
    setSelectedDeleteUser(doctor);
    setShowModal(true);
  };

  const handleDeleteProject = async () => {
    try {
      const response = await axios.delete(
        `${deleteDoctorUrl}${selectedDeleteUser.id}/`,
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
        "Error deleting doctor:",
        error.response?.data || error.message
      );
    }
  };

  const handleEditDoctor = async (doctor) => {
    setSingleDoctor(doctor);
    try {
      const response = await axios.patch(
        `${editDoctorUrl}${doctor.id}/`,
        editDoctor,
        {
          headers: { Authorization: localStorage.getItem("Token1") },
        }
      );

      setEditDoctor, response.data;
      setEditMode(false);
    } catch (error) {
      console.error(
        "Error updating doctor:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="bg-white my-3 py-4">
      <div className="container mx-auto py-12 ">
        <div className="flex justify-between items-center">
          <h1 className="font-bold my-5">
            Meet Our <span className="text-primary-color">Doctors</span>
          </h1>
          <div className="flex justify-end items-center gap-1">
            <button
              className="  btn-primary1 p-1"
              onClick={() => setIsOpen(true)}
            >
              <IoMdAdd style={{ width: "20px", color: "white" }} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mx-4 md:mx-auto ">
          {allDoctors?.map((doctor) => (
            // return (
            //   <div
            //     className=" shadow-md rounded-md p-4 border-2 border-gray-200 flex flex-col md:flex-row items-start justify-around "
            //     key={doctor.id}
            //   >
            //     <img
            //       src={`http://localhost:8000${doctor.profile_image}`}
            //       // doctor.profile_image?.startsWith("http")
            //       //   ? doctor.profile_image
            //       //   : `http://localhost:8000${doctor.profile_image}`

            //       alt=""
            //       className=" h-48 w-full md:h-80  md:w-80 mb-3"
            //     />

            //     <div className="p-6 flex-1">
            //       <h2 className="text-xl font-bold text-gray-800 mb-1">
            //         {editMode ? (
            //           <input
            //             type="text"
            //             value={editDoctor.full_name}
            //             onChange={(e) =>
            //               setEditDoctor({
            //                 ...editDoctor,
            //                 full_name: e.target.value,
            //               })
            //             }
            //             className="border p-2 rounded-md w-full"
            //           />
            //         ) : (
            //           <div className="">{doctor.full_name}</div>
            //         )}
            //       </h2>
            //       <p className="uppercase text-sm text-gray-500 mb-4">
            //         {editMode ? (
            //           <input
            //             type="text"
            //             value={editDoctor.specialization}
            //             onChange={(e) =>
            //               setEditDoctor({
            //                 ...editDoctor,
            //                 specialization: e.target.value,
            //               })
            //             }
            //             className="border p-2 rounded-md w-full"
            //           />
            //         ) : (
            //           <div className="">{doctor.specialization}</div>
            //         )}
            //       </p>
            //       <p className="text-gray-700 mb-4 italic">
            //         {editMode ? (
            //           <input
            //             type="text"
            //             value={editDoctor.bio}
            //             onChange={(e) =>
            //               setEditDoctor({
            //                 ...editDoctor,
            //                 bio: e.target.value,
            //               })
            //             }
            //             className="border p-2 rounded-md w-full"
            //           />
            //         ) : (
            //           <div className="">{doctor.bio}</div>
            //         )}
            //       </p>

            //       <div className="text-gray-600 text-sm space-y-1">
            //         <p className="flex items-center">
            //           <span className="font-semibold">Experience:</span>{" "}
            //           {editMode ? (
            //             <input
            //               type="number"
            //               value={editDoctor.experience_years}
            //               onChange={(e) =>
            //                 setEditDoctor({
            //                   ...editDoctor,
            //                   experience_years: e.target.value,
            //                 })
            //               }
            //               className="border p-2 rounded-md w-full"
            //             />
            //           ) : (
            //             <div className="">{doctor.experience_years}years</div>
            //           )}
            //         </p>
            //         <p className="flex items-center">
            //           <span className="font-semibold">Available Days:</span>{" "}
            //           {editMode ? (
            //             <input
            //               type="text"
            //               value={editDoctor.available_days.join(", ")}
            //               onChange={(e) =>
            //                 setEditDoctor({
            //                   ...editDoctor,
            //                   available_days: e.target.value.split(", "),
            //                 })
            //               }
            //               className="border p-2 rounded-md w-full"
            //             />
            //           ) : (
            //             <div className="">
            //               {doctor.available_days.join(", ")}
            //             </div>
            //           )}
            //         </p>
            //         <p className="flex items-center">
            //           <span className="font-semibold">Working Hours:</span>{" "}
            //           {editMode ? (
            //             <div className="flex gap-2">
            //               <input
            //                 type="time"
            //                 value={editDoctor.start_time}
            //                 onChange={(e) =>
            //                   setEditDoctor({
            //                     ...editDoctor,
            //                     start_time: e.target.value,
            //                   })
            //                 }
            //                 className="border p-2 rounded-md"
            //               />
            //               <input
            //                 type="time"
            //                 value={editDoctor.end_time}
            //                 onChange={(e) =>
            //                   setEditDoctor({
            //                     ...editDoctor,
            //                     end_time: e.target.value,
            //                   })
            //                 }
            //                 className="border p-2 rounded-md"
            //               />
            //             </div>
            //           ) : (
            //             <div className="">
            //               {doctor.start_time} - {doctor.end_time}
            //             </div>
            //           )}
            //         </p>
            //         <p className="flex items-center">
            //           <span className="font-semibold">Gender:</span>{" "}
            //           {editMode ? (
            //             <input
            //               type="text"
            //               value={editDoctor.gender}
            //               onChange={(e) =>
            //                 setEditDoctor({
            //                   ...editDoctor,
            //                   gender: e.target.value,
            //                 })
            //               }
            //               className="border p-2 rounded-md w-full"
            //             />
            //           ) : (
            //             <div className="">{doctor.gender}</div>
            //           )}
            //         </p>
            //         <p className="flex items-center">
            //           <span className="font-semibold">Phone:</span>{" "}
            //           {editMode ? (
            //             <input
            //               type="text"
            //               value={editDoctor.phone}
            //               onChange={(e) =>
            //                 setEditDoctor({
            //                   ...editDoctor,
            //                   phone: e.target.value,
            //                 })
            //               }
            //               className="border p-2 rounded-md w-full"
            //             />
            //           ) : (
            //             <div className="">{doctor.phone}</div>
            //           )}
            //         </p>
            //         <p className="flex items-center">
            //           <span className="font-semibold">Email:</span>{" "}
            //           {editMode ? (
            //             <input
            //               type="email"
            //               value={editDoctor.email}
            //               onChange={(e) =>
            //                 setEditDoctor({
            //                   ...editDoctor,
            //                   email: e.target.value,
            //                 })
            //               }
            //               className="border p-2 rounded-md w-full"
            //             />
            //           ) : (
            //             <div className="">{doctor.email}</div>
            //           )}
            //         </p>

            //         <p className="flex items-center">
            //           <span className="font-semibold">Status:</span>{" "}
            //           {doctor.is_active ? "Active" : "Inactive"}
            //         </p>
            //       </div>
            //     </div>

            //     <div className="flex   justify-start items-center gap-1">
            //       {editMode ? (
            //         <button
            //           className="  btn-primary1 p-1"
            //           onclikk={() => handleEditDoctor(doctor)}
            //         >
            //           save
            //         </button>
            //       ) : (
            //         <button
            //           className="  btn-primary1 p-1"
            //           onclikk={() => setEditMode(true)}
            //         >
            //           <MdModeEdit style={{ width: "20px", color: "white" }} />
            //         </button>
            //       )}

            //       <button
            //         className="  btn-primary1 p-1"
            //         onClick={() => handleDeleteClick(doctor)}
            //       >
            //         <FaTrashAlt style={{ width: "20px", color: "white" }} />
            //       </button>
            //     </div>
            //   </div>
            // );
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              // handleDeleteClick={handleDeleteClick}
              handleEditDoctor={() => handleEditDoctor(doctor)}
            />
          ))}
        </div>
      </div>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50 overflow-y-auto"
      >
        <AddDoctor />
      </Dialog>
      <ConfirmModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={handleDeleteProject}
        message={`Are you sure you want to delete ${selectedDeleteUser?.full_name}?`}
      />
    </div>
  );
}

export default Doctors;
