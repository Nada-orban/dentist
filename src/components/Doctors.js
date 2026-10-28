"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { FaArrowRight } from "react-icons/fa";
import API_URL from "../pages/api/config";
import DoctorPublicCard from "./DoctorPublicCard";

const getDoctorsUrl = `${API_URL}/api/doctors/`;

// "Meet Our Doctors" section on the home page.
function Doctors() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axios
      .get(getDoctorsUrl)
      .then((res) => setDoctors(res.data.filter((d) => d.is_active !== false)))
      .catch((error) =>
        console.error("Error fetching doctors:", error.response ? error.response.data : error.message)
      );
  }, []);

  // Nothing to show (or server unreachable): don't leave an empty section.
  if (!doctors.length) return null;

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-3">Our Team</p>
            <h2 className="mb-0 text-4xl">
              Meet Our <span className="serif-em">Doctors</span>
            </h2>
          </div>
          <Link
            href="/doctors"
            className="group inline-flex items-center gap-2 text-sm font-medium text-primary-color no-underline hover:text-dark-primary-color"
          >
            View all doctors
            <FaArrowRight size={11} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {doctors.slice(0, 3).map((doctor) => (
            <div key={doctor.id} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"><DoctorPublicCard doctor={doctor} compact /></div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Doctors;
