"use client";
import React, { useEffect, useState } from "react";
// import doctor from "../../public/images/Doctors/file.png";
import API_URL from "../pages/api/config";
import axios, { all } from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

const domain = `${API_URL}`;
const getDoctorsUrl = `${domain}/api/doctors/`;
const addDoctorUrl = `${domain}/api/doctors/create/`;
const editDoctorUrl = `${domain}/api/doctors/`;
const deleteDoctorUrl = `${domain}/api/doctors/`;

function Doctors() {
  const [allDoctors, setAllDoctors] = React.useState([]);
  const [singleDoctor, setSingleDoctor] = React.useState("");
  const [showModal, setShowModal] = React.useState(false);
  const [selectedDeleteUser, setSelectedDeleteUser] = React.useState(null);
  let [isOpen, setIsOpen] = useState(false);

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
          error.response ? error.response.data : error.message,
        );
      }
    };

    fetchAllDoctors();
  }, []);

  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-6">
        <p className="eyebrow mb-3">Our Team</p>
        <h2 className="text-4xl mb-10">
          Meet Our <span className="serif-em">Doctors</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mx-4 md:mx-auto ">
          {allDoctors?.map((doctor) => {
            return (
              <div key={doctor.id}>
                {doctor.profile_image ? (
                  <img
                    src={doctor.profile_image}
                    alt={doctor.full_name}
                    className="rounded-2xl h-[333px] w-full object-cover"
                  />
                ) : (
                  <div className="rounded-2xl h-[333px] w-full bg-cream flex items-center justify-center font-display text-6xl text-primary-color">
                    {doctor.full_name?.charAt(0)}
                  </div>
                )}
                <div className="mt-3">
                  <h3 className="font-bold">{doctor.full_name}</h3>
                  <p className="text-gray-500">{doctor.specialization}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Doctors;
