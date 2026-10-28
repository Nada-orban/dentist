// DoctorCard.js
import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { FaTrashAlt, FaPen, FaPhoneAlt, FaRegClock, FaEnvelope } from "react-icons/fa";
import AddDoctor from "./addDoctor";
import { fmtTime, DAYS_SHORT } from "../utils/dashboard";

const DoctorCard = ({ doctor, handleDeleteClick }) => {
  const [editOpen, setEditOpen] = useState(false);
  const days = doctor.available_days || [];

  return (
    <article className="flex flex-col gap-6 rounded-3xl bg-cream p-5 shadow-sm sm:flex-row sm:p-6">
      {doctor.profile_image ? (
        <img
          src={doctor.profile_image}
          alt={doctor.full_name}
          className="h-64 w-full shrink-0 rounded-2xl object-cover sm:h-56 sm:w-56"
        />
      ) : (
        <div className="flex h-64 w-full shrink-0 items-center justify-center rounded-2xl bg-white font-display text-7xl text-primary-color sm:h-56 sm:w-56">
          {doctor.full_name?.charAt(0)}
        </div>
      )}

      <div className="min-w-0 flex-1">
        <div className="mb-3 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="eyebrow mb-1">{doctor.specialization}</p>
            <h2 className="mb-0 truncate font-display text-3xl text-main-color">{doctor.full_name}</h2>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              aria-label={`Edit ${doctor.full_name}`}
              onClick={() => setEditOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-main-color shadow-sm transition-colors hover:bg-primary-color hover:text-white"
            >
              <FaPen size={13} />
            </button>
            <button
              type="button"
              aria-label={`Delete ${doctor.full_name}`}
              onClick={() => handleDeleteClick && handleDeleteClick(doctor)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-main-color/60 shadow-sm transition-colors hover:bg-red-500 hover:text-white"
            >
              <FaTrashAlt size={13} />
            </button>
          </div>
        </div>

        <span
          className={`mb-3 inline-block rounded-full px-3 py-0.5 text-xs font-medium ${
            doctor.is_active ? "bg-primary-color/15 text-dark-primary-color" : "bg-gray-200 text-gray-500"
          }`}
        >
          {doctor.is_active ? "Available for bookings" : "Not taking bookings"}
        </span>

        {doctor.bio && <p className="mb-4 text-sm italic leading-relaxed text-main-color/70">{doctor.bio}</p>}

        <div className="mb-4 flex flex-wrap gap-1.5">
          {DAYS_SHORT.map(({ key, label }) => (
            <span
              key={key}
              className={`rounded-full px-3 py-1 text-xs ${
                days.includes(key) ? "bg-main-color text-white" : "bg-white text-main-color/35"
              }`}
            >
              {label}
            </span>
          ))}
        </div>

        <ul className="m-0 grid list-none grid-cols-1 gap-x-6 gap-y-2 p-0 text-sm text-main-color/80 sm:grid-cols-2">
          <li className="flex items-center gap-2">
            <FaRegClock className="shrink-0 text-primary-color" size={12} />
            {doctor.start_time && doctor.end_time
              ? `${fmtTime(doctor.start_time)} – ${fmtTime(doctor.end_time)}`
              : "Hours not set"}
          </li>
          <li className="flex items-center gap-2">
            <FaPhoneAlt className="shrink-0 text-primary-color" size={11} />
            {doctor.phone}
          </li>
          <li className="flex items-center gap-2 sm:col-span-2">
            <FaEnvelope className="shrink-0 text-primary-color" size={12} />
            <span className="truncate">{doctor.email}</span>
          </li>
          <li className="text-main-color/60">
            {doctor.gender}
            {doctor.experience_years ? ` · ${doctor.experience_years} years of experience` : ""}
          </li>
        </ul>
      </div>

      <Dialog open={editOpen} onClose={() => setEditOpen(false)} className="relative z-50">
        <AddDoctor doctor={doctor} onClose={() => setEditOpen(false)} />
      </Dialog>
    </article>
  );
};

export default DoctorCard;
