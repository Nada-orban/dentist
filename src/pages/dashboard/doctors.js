import React, { useEffect, useState } from "react";
import axios from "axios";
import { Dialog } from "@headlessui/react";
import { FaPlus } from "react-icons/fa";
import DashboardLayout, { PageHeader } from "../../components/DashboardLayout";
import DoctorCard from "../../components/DoctorCard";
import AddDoctor from "../../components/addDoctor";
import ConfirmModal from "../../components/confirmModel";
import API_URL from "../api/config";

const doctorsUrl = `${API_URL}/api/doctors/`;

// Staff page: add, edit and delete doctors. Visitors see /doctors instead.
function DoctorsAdmin() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addOpen, setAddOpen] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get(doctorsUrl, { headers: { Authorization: localStorage.getItem("Token1") } })
      .then((res) => setDoctors(res.data))
      .catch((error) =>
        console.error("Error fetching doctors:", error.response ? error.response.data : error.message)
      )
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async () => {
    const doctor = toDelete;
    setToDelete(null);
    setMessage("");
    try {
      await axios.delete(`${doctorsUrl}${doctor.id}/`, {
        headers: { Authorization: localStorage.getItem("Token1") },
      });
      setDoctors((list) => list.filter((d) => d.id !== doctor.id));
    } catch (error) {
      // Doctors that still have appointments can't be deleted.
      setMessage(
        `Dr. ${doctor.full_name} couldn't be deleted. A doctor who has appointments can't be removed: ` +
          "delete or move their appointments first, or untick “Available for bookings” in Edit."
      );
    }
  };

  return (
    <DashboardLayout>
      <PageHeader eyebrow="Team" title="Doctors" subtitle={`${doctors.length} on your team`}>
        <button
          type="button"
          onClick={() => setAddOpen(true)}
          className="inline-flex items-center gap-2 rounded-full bg-primary-color px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-dark-primary-color"
        >
          <FaPlus size={11} /> Add Doctor
        </button>
      </PageHeader>

      {message && (
        <p className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{message}</p>
      )}

      {loading ? (
        <p className="py-12 text-center text-main-color/60">Loading doctors…</p>
      ) : doctors.length === 0 ? (
        <p className="rounded-2xl bg-white py-12 text-center text-main-color/60 shadow-sm">No doctors yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} handleDeleteClick={setToDelete} />
          ))}
        </div>
      )}

      <Dialog open={addOpen} onClose={() => setAddOpen(false)} className="relative z-50">
        <AddDoctor onClose={() => setAddOpen(false)} />
      </Dialog>

      <ConfirmModal
        show={Boolean(toDelete)}
        onHide={() => setToDelete(null)}
        onConfirm={handleDelete}
        message={`Are you sure you want to delete Dr. ${toDelete?.full_name || ""}?`}
      />
    </DashboardLayout>
  );
}

export default DoctorsAdmin;
