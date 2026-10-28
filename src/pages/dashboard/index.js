import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { FaRegCalendarAlt, FaRegClock, FaUserFriends, FaArrowRight } from "react-icons/fa";
import DashboardLayout, { PageHeader } from "../../components/DashboardLayout";
import API_URL from "../api/config";
import {
  todayISO,
  fmtTime,
  dateParts,
  dayStatus,
  byDateTime,
  STATUS_STYLE,
  STATUS_LABEL,
} from "../../utils/dashboard";

const domain = `${API_URL}`;
const getDashboardDoctorUrl = `${domain}/api/dashboard/doctor/`;

const StatCard = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm">
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-color/10 text-primary-color">
      <Icon size={20} />
    </div>
    <div>
      <p className="mb-0 font-display text-3xl leading-none text-main-color">{value}</p>
      <p className="mb-0 mt-1 text-sm text-main-color/60">{label}</p>
    </div>
  </div>
);

const AppointmentRow = ({ a }) => {
  const { day, month } = dateParts(a.appointment_date);
  const status = dayStatus(a.appointment_date);
  return (
    <Link
      href={{
        pathname: `/dashboard/appointments/${a.id}`,
        query: { reservationId: `${a.id}` },
      }}
      className="flex items-center gap-4 rounded-xl px-3 py-3 text-main-color no-underline transition-colors hover:bg-cream"
    >
      <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-main-color text-white">
        <span className="font-display text-lg leading-none">{day}</span>
        <span className="text-[10px] uppercase tracking-wider text-white/70">{month}</span>
      </div>
      <div className="min-w-0 flex-1">
        <p className="mb-0 truncate font-medium">{a.full_name}</p>
        <p className="mb-0 truncate text-sm text-main-color/60">
          {a.message || "No notes"}
        </p>
      </div>
      <div className="shrink-0 text-right">
        <p className="mb-1 text-sm font-medium">{fmtTime(a.appointment_time)}</p>
        <span className={`rounded-full px-3 py-0.5 text-xs font-medium ${STATUS_STYLE[status]}`}>
          {STATUS_LABEL[status]}
        </span>
      </div>
    </Link>
  );
};

const Panel = ({ title, link, children }) => (
  <section className="rounded-2xl bg-white p-6 shadow-sm">
    <div className="mb-3 flex items-center justify-between">
      <h2 className="mb-0 text-2xl text-main-color">{title}</h2>
      {link && (
        <Link
          href={link.href}
          className="inline-flex items-center gap-2 text-sm text-primary-color no-underline hover:underline"
        >
          {link.label} <FaArrowRight size={10} />
        </Link>
      )}
    </div>
    {children}
  </section>
);

const Empty = ({ children }) => (
  <p className="mb-0 rounded-xl bg-cream px-4 py-6 text-center text-sm text-main-color/60">
    {children}
  </p>
);

function DoctorDashboard() {
  const [doctorData, setDoctorData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardDoctorData = async () => {
      try {
        const response = await axios.get(getDashboardDoctorUrl, {
          headers: { Authorization: localStorage.getItem("Token1") },
        });
        setDoctorData(response.data);
      } catch (err) {
        setError(
          err.response?.status === 403
            ? "This account is not linked to a doctor profile."
            : "We couldn't load your appointments. Please sign in again."
        );
      }
    };
    fetchDashboardDoctorData();
  }, []);

  const today = todayISO();
  const all = [...(doctorData?.appointments || [])].sort(byDateTime);
  const todays = all.filter((a) => a.appointment_date === today);
  const upcoming = all.filter((a) => a.appointment_date > today);
  const patients = new Set(all.map((a) => a.phone)).size;
  const firstName = doctorData?.doctor?.full_name?.replace(/^dr\.?\s+/i, "");

  return (
    <DashboardLayout doctorData={doctorData}>
      <PageHeader
        eyebrow="Dashboard"
        title={firstName ? `Welcome, Dr. ${firstName}` : "Welcome"}
        subtitle="Here's an overview of your day."
      />

      {error && (
        <p className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard icon={FaRegClock} label="Appointments today" value={todays.length} />
        <StatCard icon={FaRegCalendarAlt} label="Upcoming" value={upcoming.length} />
        <StatCard icon={FaUserFriends} label="Patients booked" value={patients} />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Panel title="Today" link={{ href: "/dashboard/appointments", label: "All appointments" }}>
          {todays.length ? (
            todays.map((a) => <AppointmentRow key={a.id} a={a} />)
          ) : (
            <Empty>No appointments today.</Empty>
          )}
        </Panel>
        <Panel title="Upcoming">
          {upcoming.length ? (
            upcoming.slice(0, 5).map((a) => <AppointmentRow key={a.id} a={a} />)
          ) : (
            <Empty>No upcoming appointments.</Empty>
          )}
        </Panel>
      </div>
    </DashboardLayout>
  );
}

export default DoctorDashboard;
