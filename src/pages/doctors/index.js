import React, { useEffect, useState } from "react";
import Head from "next/head";
import axios from "axios";
import API_URL from "../api/config";
import DoctorPublicCard from "../../components/DoctorPublicCard";

const getDoctorsUrl = `${API_URL}/api/doctors/`;

// Public page for visitors. Staff manage doctors from the dashboard (Dashboard > Doctors).
export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error

  useEffect(() => {
    axios
      .get(getDoctorsUrl)
      .then((res) => {
        setDoctors(res.data.filter((d) => d.is_active !== false));
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);

  return (
    <>
      <Head>
        <title>Our Doctors | Luxury Dental Clinic</title>
        <meta name="description" content="Meet the doctors at Luxury Dental Clinic." />
      </Head>

      <section className="border-b border-main-color/10 bg-white pb-12 pt-32">
        <div className="container mx-auto">
          <p className="eyebrow mb-4">Our Team</p>
          <h1 className="max-w-2xl text-4xl text-main-color md:text-5xl">
            Meet Our <span className="serif-em">Doctors</span>
          </h1>
          <p className="mt-5 max-w-xl leading-relaxed text-main-color/70">
            Experienced, caring professionals who treat every patient with the same attention to detail.
            Choose a doctor and book a time that suits you.
          </p>
        </div>
      </section>

      <section className="bg-cream py-16">
        <div className="container mx-auto">
          {status === "loading" && <p className="py-16 text-center text-main-color/60">Loading our doctors…</p>}
          {status === "error" && (
            <p className="py-16 text-center text-main-color/60">
              We couldn't load our doctors right now. Please try again in a moment.
            </p>
          )}
          {status === "ready" && doctors.length === 0 && (
            <p className="py-16 text-center text-main-color/60">Our team will be listed here soon.</p>
          )}
          {status === "ready" && doctors.length > 0 && (
            <div className="flex flex-wrap justify-center gap-6">
              {doctors.map((doctor) => (
                <div key={doctor.id} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"><DoctorPublicCard doctor={doctor} /></div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
