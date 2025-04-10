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

const domain = `${API_URL}`;
const getDoctorsUrl = `${domain}/api/doctors/`;
const addDoctorUrl = `${domain}/api/doctors/create/`;
const editDoctorUrl = `${domain}/api/doctors/`;
const deleteDoctorUrl = `${domain}/api/doctors/`;

function Doctors() {
  const [allDoctors, setAllDoctors] = React.useState([]);
  const [singleDoctor, setSingleDoctor] = React.useState("");
  let [isOpen, setIsOpen] = useState(false);

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

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mx-4 md:mx-auto ">
          {allDoctors?.map((doctor) => {
            return (
              <div className="flex justify-between items-center ">
                <div>
                  <img
                    src={doctor.profile_image}
                    // doctor.profile_image?.startsWith("http")
                    //   ? doctor.profile_image
                    //   : `http://localhost:8000${doctor.profile_image}`

                    alt=""
                    className="rounded-md h-[333px] "
                  />
                  <div className="mt-3">
                    <h3 className="font-bold">{doctor.full_name}</h3>
                    <p className="text-gray-500">{doctor.bio}</p>
                  </div>
                </div>
                <div>
                  <button className="  btn-primary1 p-1">
                    <MdModeEdit style={{ width: "20px", color: "white" }} />
                  </button>
                  <button className="  btn-primary1 p-1">
                    <FaTrashAlt style={{ width: "20px", color: "white" }} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50 overflow-y-auto"
      >
        <AddDoctor />
      </Dialog>
    </div>
  );
}

export default Doctors;
