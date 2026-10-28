// A doctor card for visitors (no staff buttons). Used on the home page and /doctors.
import React from "react";
import Link from "next/link";
import { FaArrowRight, FaRegClock } from "react-icons/fa";
import { fmtTime, DAYS_SHORT } from "../utils/dashboard";

const DoctorPublicCard = ({ doctor, compact = false }) => {
  const days = DAYS_SHORT.filter((d) => (doctor.available_days || []).includes(d.key));
  const name = (doctor.full_name || "").replace(/^dr\.?\s+/i, "");

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl">
      <div className="relative aspect-[4/5] overflow-hidden bg-cream">
        {doctor.profile_image ? (
          <img
            src={doctor.profile_image}
            alt={`Dr. ${name}`}
            className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-display text-8xl text-primary-color">
            {name.charAt(0)}
          </div>
        )}
        {doctor.experience_years > 0 && (
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-main-color shadow-sm backdrop-blur-sm">
            {doctor.experience_years} {doctor.experience_years === 1 ? "year" : "years"} experience
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="eyebrow mb-1 capitalize">{doctor.specialization}</p>
        <h3 className="mb-0 font-display text-2xl text-main-color">Dr. {name}</h3>

        {!compact && doctor.bio && (
          <p className="mb-0 mt-3 line-clamp-3 text-sm leading-relaxed text-main-color/70">{doctor.bio}</p>
        )}

        {!compact && (
          <div className="mt-4 space-y-3">
            {days.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {days.map(({ key, label }) => (
                  <span key={key} className="rounded-full bg-main-color px-3 py-1 text-xs text-white">
                    {label}
                  </span>
                ))}
              </div>
            )}
            {doctor.start_time && doctor.end_time && (
              <p className="mb-0 flex items-center gap-2 text-sm text-main-color/70">
                <FaRegClock className="text-primary-color" size={12} />
                {fmtTime(doctor.start_time)} – {fmtTime(doctor.end_time)}
              </p>
            )}
          </div>
        )}

        <Link
          href="/booking"
          className="group/btn mt-6 inline-flex w-fit items-center gap-2 text-sm font-medium text-primary-color no-underline hover:text-dark-primary-color"
        >
          Book an appointment
          <FaArrowRight size={11} className="transition-transform group-hover/btn:translate-x-1" />
        </Link>
      </div>
    </article>
  );
};

export default DoctorPublicCard;
