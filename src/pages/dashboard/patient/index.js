import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { FaPhoneAlt, FaSearch, FaPlus } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { Dialog } from "@headlessui/react";
import DashboardLayout, { PageHeader } from "../../../components/DashboardLayout";
import AddPatient from "../../../components/addPatient";
import API_URL from "../../api/config";

const domain = `${API_URL}`;
const getPatientsUrl = `${domain}/api/dashboard/patientInfo/`;

const asText = (v) => (Array.isArray(v) ? v.join(", ") : v) || "None";

const Detail = ({ label, value }) => (
  <div>
    <dt className="mb-0.5 text-[10px] uppercase tracking-[0.2em] text-main-color/50">{label}</dt>
    <dd className="mb-0 text-sm text-main-color">{value}</dd>
  </div>
);

function Patients() {
  const [patientsData, setPatientsData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(getPatientsUrl, { headers: { Authorization: localStorage.getItem("Token1") } })
      .then((res) => setPatientsData(res.data))
      .catch((error) =>
        console.error("Error fetching patient:", error.response ? error.response.data : error.message)
      )
      .finally(() => setLoading(false));
  }, []);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return patientsData;
    return patientsData.filter((p) =>
      [p.patient_name, p.phone, p.email].some((v) => `${v || ""}`.toLowerCase().includes(q))
    );
  }, [patientsData, query]);

  return (
    <DashboardLayout>
      <PageHeader eyebrow="Records" title="Patients" subtitle={`${patientsData.length} patients`}>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 rounded-full bg-primary-color px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-dark-primary-color"
        >
          <FaPlus size={11} /> Add Patient
        </button>
      </PageHeader>

      <div className="mb-6 rounded-2xl bg-white p-4 shadow-sm">
        <div className="relative w-full md:w-80">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-main-color/40" size={13} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, phone or email"
            className="w-full rounded-full border border-main-color/15 bg-cream py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary-color focus:ring-2 focus:ring-primary-color/30"
          />
        </div>
      </div>

      {loading ? (
        <p className="py-12 text-center text-main-color/60">Loading patients…</p>
      ) : rows.length === 0 ? (
        <p className="rounded-2xl bg-white py-12 text-center text-main-color/60 shadow-sm">
          No patients found.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {rows.map((patient) => (
            <article key={patient.id} className="rounded-2xl bg-white p-5 shadow-sm">
              <header className="mb-4 flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-main-color font-display text-xl text-white">
                  {patient.patient_name?.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <h3 className="mb-1 truncate font-display text-xl text-main-color">
                    {patient.patient_name}
                  </h3>
                  <p className="mb-0 flex items-center gap-2 text-sm text-main-color/70">
                    <FaPhoneAlt className="text-primary-color" size={11} /> {patient.phone}
                  </p>
                  <p className="mb-0 flex items-center gap-2 truncate text-sm text-main-color/70">
                    <IoMail className="text-primary-color" /> {patient.email}
                  </p>
                </div>
              </header>

              <dl className="mb-0 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-main-color/10 pt-4">
                <Detail label="Gender" value={patient.gender || "—"} />
                <Detail label="Age" value={patient.age || "—"} />
                <Detail label="Address" value={patient.address || "—"} />
                <Detail label="Emergency contact" value={patient.emergency_contact || "None"} />
                <Detail label="Allergies" value={asText(patient.allergies)} />
                <Detail label="Medications" value={asText(patient.medications)} />
              </dl>
            </article>
          ))}
        </div>
      )}

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50 overflow-y-auto">
        <AddPatient
          onClose={() => setIsOpen(false)}
          onSaved={(patient) => {
            setPatientsData((list) => [...list, patient]);
            setIsOpen(false);
          }}
        />
      </Dialog>
    </DashboardLayout>
  );
}

export default Patients;
