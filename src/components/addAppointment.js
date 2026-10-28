import React, { useEffect, useState } from "react";
import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import axios from "axios";
import API_URL from "../pages/api/config";
import { todayISO, fmtTime } from "../utils/dashboard";
import {
  FormModal,
  FormBody,
  FormFooter,
  SectionTitle,
  TextField,
  SelectField,
  TextAreaField,
  ChipGroup,
  Shell,
  apiErrorText,
} from "./FormKit";

const domain = `${API_URL}`;
const createUrl = `${domain}/api/reservation/appointments/book/`;
const getDoctorsUrl = `${domain}/api/doctors/`;
const bookedSlotsUrl = (doctorId, date) =>
  `${domain}/api/reservation/booked_slots/${doctorId}/${date}/`;

const initialValues = {
  full_name: "",
  phone: "",
  age: "",
  email: "",
  doctor: "",
  appointment_date: todayISO(),
  appointment_time: "",
  message: "",
};

const validationSchema = Yup.object({
  full_name: Yup.string().min(3, "Enter the full name").required("Patient name is required"),
  phone: Yup.string().required("Phone number is required"),
  age: Yup.number().typeError("Enter a number").min(0, "Must be 0 or more").nullable(),
  email: Yup.string().email("Enter a valid email"),
  doctor: Yup.string().required("Choose a doctor"),
  appointment_date: Yup.string().required("Choose a date"),
  appointment_time: Yup.string().required("Choose a time"),
});

// "09:00", "10:00"... between the doctor's start and end time.
const makeSlots = (start, end, stepMinutes = 60) => {
  const toMin = (t) => {
    const [h, m] = t.split(":");
    return Number(h) * 60 + Number(m);
  };
  const out = [];
  for (let t = toMin(start || "09:00"); t < toMin(end || "17:00"); t += stepMinutes) {
    out.push(`${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`);
  }
  return out;
};

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Free-time picker: needs the chosen doctor and date.
const TimeSlots = ({ doctors }) => {
  const { values, setFieldValue } = useFormikContext();
  const [booked, setBooked] = useState([]);
  const doctor = doctors.find((d) => String(d.id) === String(values.doctor));
  const ready = doctor && values.appointment_date;

  useEffect(() => {
    if (!ready) return;
    let cancelled = false;
    axios
      .get(bookedSlotsUrl(doctor.id, values.appointment_date))
      .then((res) => !cancelled && setBooked((res.data || []).map((t) => `${t}`.slice(0, 5))))
      .catch(() => !cancelled && setBooked([]));
    return () => {
      cancelled = true;
    };
  }, [ready, doctor?.id, values.appointment_date]);

  // If the chosen time was taken after a date/doctor change, clear it.
  useEffect(() => {
    if (values.appointment_time && booked.includes(values.appointment_time)) {
      setFieldValue("appointment_time", "");
    }
  }, [booked]);

  const weekday = values.appointment_date
    ? WEEKDAYS[new Date(`${values.appointment_date}T00:00:00`).getDay()]
    : "";
  const offDay = doctor && weekday && doctor.available_days && !doctor.available_days.includes(weekday);

  return (
    <Shell name="appointment_time" label="Time" required full>
      {!ready ? (
        <p className="mb-0 rounded-xl bg-cream px-4 py-3 text-sm text-main-color/60">
          Choose a doctor and a date to see the free times.
        </p>
      ) : (
        <>
          {offDay && (
            <p className="mb-3 rounded-xl border border-primary-color/30 bg-primary-color/10 px-4 py-2.5 text-sm text-dark-primary-color">
              Dr. {doctor.full_name.replace(/^dr\.?\s+/i, "")} doesn't usually work on {weekday}s.
            </p>
          )}
          <ChipGroup
            options={makeSlots(doctor.start_time, doctor.end_time).map((t) => ({
              key: t,
              label: fmtTime(`${t}:00`),
            }))}
            value={values.appointment_time}
            onToggle={(t) => setFieldValue("appointment_time", t)}
            isDisabled={(t) => booked.includes(t)}
          />
          {booked.length > 0 && (
            <p className="mb-0 mt-2 text-xs text-main-color/50">Crossed-out times are already booked.</p>
          )}
        </>
      )}
    </Shell>
  );
};

// onClose: close the pop-up. onSaved(appointment): called after a successful save.
function AddAppointment({ onClose, onSaved }) {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(getDoctorsUrl, { headers: { Authorization: localStorage.getItem("Token1") } })
      .then((res) => setDoctors(res.data.filter((d) => d.is_active !== false)))
      .catch((err) =>
        console.error("Error fetching AllDoctors:", err.response ? err.response.data : err.message)
      );
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    setError("");
    try {
      const payload = {
        full_name: values.full_name.trim(),
        phone: values.phone.trim(),
        doctor: values.doctor,
        appointment_date: values.appointment_date,
        appointment_time: values.appointment_time,
        message: values.message.trim() || null,
      };
      if (values.age !== "") payload.age = Number(values.age);
      if (values.email.trim()) payload.email = values.email.trim();

      const res = await axios.post(createUrl, payload, {
        headers: { Authorization: localStorage.getItem("Token1") },
      });
      if (onSaved) onSaved(res.data);
      else window.location.reload();
    } catch (err) {
      const text = apiErrorText(err);
      setError(
        /phone/i.test(text) && /already exists/i.test(text)
          ? "A booking with this phone number already exists. Use a different number."
          : text
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <FormModal
      eyebrow="Schedule"
      title="Add Appointment"
      subtitle="Book a visit for a patient. Fields marked * are required."
      onClose={onClose}
    >
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting, setFieldValue }) => (
          <Form className="flex min-h-0 flex-1 flex-col">
            <FormBody>
              <SectionTitle>Patient</SectionTitle>
              <TextField name="full_name" label="Full name" required full />
              <TextField name="phone" label="Phone" type="tel" required />
              <TextField name="age" label="Age" type="number" min="0" />
              <TextField name="email" label="Email" type="email" hint="Optional" full />

              <SectionTitle>Visit</SectionTitle>
              <SelectField
                name="doctor"
                label="Doctor"
                required
                onChange={(e) => {
                  setFieldValue("doctor", e.target.value);
                  setFieldValue("appointment_time", "");
                }}
              >
                <option value="">Select a doctor</option>
                {doctors.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.full_name} – {doc.specialization}
                  </option>
                ))}
              </SelectField>
              <TextField
                name="appointment_date"
                label="Date"
                type="date"
                min={todayISO()}
                required
                onChange={(e) => {
                  setFieldValue("appointment_date", e.target.value);
                  setFieldValue("appointment_time", "");
                }}
              />
              <TimeSlots doctors={doctors} />
              <TextAreaField name="message" label="Reason for the visit" hint="Optional" />
            </FormBody>
            <FormFooter
              onCancel={onClose}
              submitting={isSubmitting}
              submitLabel="Book appointment"
              error={error}
            />
          </Form>
        )}
      </Formik>
    </FormModal>
  );
}

export default AddAppointment;
