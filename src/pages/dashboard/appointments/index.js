import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Dialog } from "@headlessui/react";
import { FaTrashAlt, FaSearch, FaPlus, FaPhoneAlt, FaRegClock } from "react-icons/fa";
import DashboardLayout, { PageHeader } from "../../../components/DashboardLayout";
import ConfirmModal from "../../../components/confirmModel";
import AddAppointment from "../../../components/addAppointment";
import API_URL from "../../api/config";
import {
  fmtTime,
  dateParts,
  dayStatus,
  byDateTime,
  STATUS_STYLE,
  STATUS_LABEL,
} from "../../../utils/dashboard";

const domain = `${API_URL}`;
const getReservstionUrl = `${domain}/api/reservation/appointments/`;
const singleReservstionUrl = `${domain}/api/reservation/appointments/`;
const getDoctorsUrl = `${domain}/api/doctors/`;

const FILTERS = [
  { key: "all", label: "All" },
  { key: "today", label: "Today" },
  { key: "upcoming", label: "Upcoming" },
  { key: "past", label: "Past" },
];

function Appointments() {
  const [reservationsData, setReservationsData] = useState([]);
  const [allDoctors, setAllDoctors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDeleteUser, setSelectedDeleteUser] = useState(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [addOpen, setAddOpen] = useState(false);

  useEffect(() => {
    const headers = { Authorization: localStorage.getItem("Token1") };
    axios
      .get(getReservstionUrl, { headers })
      .then((res) => setReservationsData(res.data))
      .catch((error) =>
        console.error(
          "Error fetching reservations:",
          error.response ? error.response.data : error.message
        )
      )
      .finally(() => setLoading(false));
    axios
      .get(getDoctorsUrl, { headers })
      .then((res) => setAllDoctors(res.data))
      .catch((error) =>
        console.error(
          "Error fetching AllDoctors:",
          error.response ? error.response.data : error.message
        )
      );
  }, []);

  const handleDeleteClick = (user) => {
    setSelectedDeleteUser(user);
    setShowModal(true);
  };

  const handleDeleteProject = async () => {
    try {
      await axios.delete(`${singleReservstionUrl}${selectedDeleteUser.id}/`, {
        headers: { Authorization: `${localStorage.getItem("Token1")}` },
      });
      setShowModal(false);
      setReservationsData((list) => list.filter((r) => r.id !== selectedDeleteUser.id));
    } catch (error) {
      console.error("Error deleting item:", error.response?.data || error.message);
      setShowModal(false);
    }
  };

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return [...reservationsData]
      .sort(byDateTime)
      .filter((r) => filter === "all" || dayStatus(r.appointment_date) === filter)
      .filter((r) => {
        if (!q) return true;
        const doctor = allDoctors.find((d) => d.id == r.doctor)?.full_name || "";
        return [r.full_name, r.phone, doctor].some((v) => `${v}`.toLowerCase().includes(q));
      });
  }, [reservationsData, allDoctors, query, filter]);

  return (
    <DashboardLayout>
      <PageHeader
        eyebrow="Schedule"
        title="Appointments"
        subtitle={`${reservationsData.length} booked in total`}
      >
        <button
          type="button"
          onClick={() => setAddOpen(true)}
          className="inline-flex items-center gap-2 rounded-full bg-primary-color px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-dark-primary-color"
        >
          <FaPlus size={11} /> Add Appointment
        </button>
      </PageHeader>

      <div className="mb-6 flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:w-80">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-main-color/40" size={13} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, phone or doctor"
            className="w-full rounded-full border border-main-color/15 bg-cream py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary-color focus:ring-2 focus:ring-primary-color/30"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                filter === f.key
                  ? "bg-main-color text-white"
                  : "bg-main-color/5 text-main-color hover:bg-main-color/10"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="py-12 text-center text-main-color/60">Loading appointments…</p>
      ) : rows.length === 0 ? (
        <p className="rounded-2xl bg-white py-12 text-center text-main-color/60 shadow-sm">
          No appointments found.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {rows.map((reservation) => {
            const doctor = allDoctors.find((doc) => doc.id == reservation.doctor);
            const { day, month, weekday } = dateParts(reservation.appointment_date);
            const status = dayStatus(reservation.appointment_date);
            return (
              <div
                key={reservation.id}
                className="flex items-stretch gap-4 rounded-2xl bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex w-16 shrink-0 flex-col items-center justify-center rounded-xl bg-main-color py-3 text-white">
                  <span className="text-[10px] uppercase tracking-wider text-white/70">{weekday}</span>
                  <span className="font-display text-2xl leading-none">{day}</span>
                  <span className="text-[10px] uppercase tracking-wider text-white/70">{month}</span>
                </div>

                <Link
                  href={{
                    pathname: `/dashboard/appointments/${reservation.id}`,
                    query: { reservationId: `${reservation.id}` },
                  }}
                  className="min-w-0 flex-1 text-main-color no-underline"
                >
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <h3 className="mb-0 truncate font-display text-xl">{reservation.full_name}</h3>
                    <span className={`rounded-full px-3 py-0.5 text-xs font-medium ${STATUS_STYLE[status]}`}>
                      {STATUS_LABEL[status]}
                    </span>
                  </div>
                  <p className="mb-1 flex items-center gap-2 text-sm text-main-color/70">
                    <FaRegClock className="text-primary-color" size={12} />
                    {fmtTime(reservation.appointment_time)}
                    {doctor?.full_name && <span>· Dr. {doctor.full_name.replace(/^dr\.?\s+/i, "")}</span>}
                  </p>
                  <p className="mb-1 flex items-center gap-2 text-sm text-main-color/70">
                    <FaPhoneAlt className="text-primary-color" size={11} />
                    {reservation.phone}
                    {reservation.age ? <span>· {reservation.age} yrs</span> : null}
                  </p>
                  {reservation.message && (
                    <p className="mb-0 mt-2 truncate rounded-lg bg-cream px-3 py-1.5 text-sm text-main-color/70">
                      {reservation.message}
                    </p>
                  )}
                </Link>

                <button
                  type="button"
                  aria-label={`Delete appointment for ${reservation.full_name}`}
                  onClick={() => handleDeleteClick(reservation)}
                  className="h-9 w-9 shrink-0 self-start rounded-full text-main-color/40 transition-colors hover:bg-red-50 hover:text-red-500"
                >
                  <FaTrashAlt className="mx-auto" size={14} />
                </button>
              </div>
            );
          })}
        </div>
      )}

      <Dialog open={addOpen} onClose={() => setAddOpen(false)} className="relative z-50">
        <AddAppointment
          onClose={() => setAddOpen(false)}
          onSaved={(appointment) => {
            setReservationsData((list) => [...list, appointment]);
            setAddOpen(false);
          }}
        />
      </Dialog>

      <ConfirmModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={handleDeleteProject}
        message={`Are you sure you want to delete ${selectedDeleteUser?.full_name}?`}
      />
    </DashboardLayout>
  );
}

export default Appointments;
