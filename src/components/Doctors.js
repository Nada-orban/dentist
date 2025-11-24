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
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchAllDoctors();
  }, []);

  return (
    <div className="bg-white my-3 py-4">
      <div className="container mx-auto ">
        <h1 className="font-bold my-5">
          Meet Our <span className="text-primary-color">Doctors</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mx-4 md:mx-auto ">
          {allDoctors?.map((doctor) => {
            return (
              <div>
                <img
                  src={`${doctor.profile_image}`}
                  alt=""
                  className="rounded-md h-[333px] "
                />
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
