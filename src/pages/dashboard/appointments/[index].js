import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { FaArrowLeft, FaPen } from "react-icons/fa";
import DashboardLayout from "../../../components/DashboardLayout";
import API_URL from "../../api/config";
import { fmtTime, dayStatus, STATUS_STYLE, STATUS_LABEL } from "../../../utils/dashboard";

const domain = `${API_URL}`;
const singleReservstionUrl = `${domain}/api/reservation/appointments/`;

const FIELDS = [
  { key: "full_name", label: "Patient name", type: "text" },
  { key: "age", label: "Age", type: "number" },
  { key: "phone", label: "Phone", type: "text" },
  { key: "email", label: "Email", type: "email" },
  { key: "appointment_date", label: "Date", type: "date" },
  { key: "appointment_time", label: "Time", type: "time" },
];

const inputClass =
  "w-full rounded-xl border border-main-color/15 bg-cream px-4 py-2.5 text-sm outline-none focus:border-primary-color focus:ring-2 focus:ring-primary-color/30";

function Appointment() {
  const router = useRouter();
  // Works from the list link (?reservationId=) and from the address itself (/appointments/3)
  const reservationId = router.query.reservationId || router.query.index;
  const [reservationData, setReservationData] = useState(null);
  const [edit, setEdit] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState("loading"); // loading | ready | missing
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!reservationId) return;
    axios
      .get(`${singleReservstionUrl}${reservationId}/`, {
        headers: { Authorization: localStorage.getItem("Token1") },
      })
      .then((res) => {
        setReservationData(res.data);
        setStatus("ready");
      })
      .catch(() => setStatus("missing"));
  }, [reservationId]);

  const startEdit = () => {
    setEdit({
      full_name: reservationData.full_name || "",
      phone: reservationData.phone || "",
      age: reservationData.age ?? "",
      appointment_date: reservationData.appointment_date || "",
      appointment_time: reservationData.appointment_time || "",
      email: reservationData.email || "",
      message: reservationData.message || "",
    });
    setError("");
    setEditMode(true);
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      const payload = { ...edit, age: edit.age === "" ? null : edit.age, email: edit.email || null };
      const response = await axios.patch(`${singleReservstionUrl}${reservationId}/`, payload, {
        headers: { Authorization: localStorage.getItem("Token1") },
      });
      setReservationData(response.data);
      setEditMode(false);
    } catch (err) {
      const data = err.response?.data;
      setError(
        data && typeof data === "object"
          ? Object.values(data).flat().join(" ")
          : "Could not save the changes. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  const shownStatus = reservationData ? dayStatus(reservationData.appointment_date) : null;
  const display = {
    appointment_time: fmtTime(reservationData?.appointment_time),
  };

  return (
    <DashboardLayout>
      <Link
        href="/dashboard/appointments"
        className="mb-6 inline-flex items-center gap-2 text-sm text-main-color/70 no-underline hover:text-primary-color"
      >
        <FaArrowLeft size={11} /> All appointments
      </Link>

      {status === "loading" && <p className="text-main-color/60">Loading…</p>}
      {status === "missing" && (
        <p className="rounded-2xl bg-white py-12 text-center text-main-color/60 shadow-sm">
          This appointment could not be found.
        </p>
      )}

      {status === "ready" && (
        <div className="max-w-3xl rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6 flex flex-wrap items-start justify-between gap-4 border-b border-main-color/10 pb-6">
            <div>
              <p className="eyebrow mb-2">Appointment</p>
              <h1 className="mb-2 text-3xl text-main-color">{reservationData.full_name}</h1>
              <span className={`rounded-full px-3 py-0.5 text-xs font-medium ${STATUS_STYLE[shownStatus]}`}>
                {STATUS_LABEL[shownStatus]}
              </span>
            </div>
            {!editMode && (
              <button
                type="button"
                onClick={startEdit}
                className="inline-flex items-center gap-2 rounded-full border border-main-color/20 px-5 py-2 text-sm text-main-color transition-colors hover:border-primary-color hover:text-primary-color"
              >
                <FaPen size={11} /> Edit
              </button>
            )}
          </div>

          <dl className="mb-0 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
            {FIELDS.map(({ key, label, type }) => (
              <div key={key}>
                <dt className="mb-1 text-[10px] uppercase tracking-[0.2em] text-main-color/50">{label}</dt>
                <dd className="mb-0">
                  {editMode ? (
                    <input
                      type={type}
                      value={edit[key]}
                      onChange={(e) => setEdit({ ...edit, [key]: e.target.value })}
                      className={inputClass}
                    />
                  ) : (
                    <span className="text-main-color">
                      {(key === "appointment_time" ? display.appointment_time : reservationData[key]) || "—"}
                    </span>
                  )}
                </dd>
              </div>
            ))}
            <div className="sm:col-span-2">
              <dt className="mb-1 text-[10px] uppercase tracking-[0.2em] text-main-color/50">Message</dt>
              <dd className="mb-0">
                {editMode ? (
                  <textarea
                    rows={3}
                    value={edit.message}
                    onChange={(e) => setEdit({ ...edit, message: e.target.value })}
                    className={inputClass}
                  />
                ) : (
                  <span className="text-main-color">{reservationData.message || "—"}</span>
                )}
              </dd>
            </div>
          </dl>

          {error && (
            <p className="mb-0 mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}

          {editMode && (
            <div className="mt-8 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="rounded-full border border-main-color/20 px-6 py-2.5 text-sm text-main-color hover:bg-cream"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={saving}
                onClick={handleSave}
                className="rounded-full bg-primary-color px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-dark-primary-color disabled:opacity-60"
              >
                {saving ? "Saving…" : "Save changes"}
              </button>
            </div>
          )}
        </div>
      )}
    </DashboardLayout>
  );
}

export default Appointment;
