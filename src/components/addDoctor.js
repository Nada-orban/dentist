import React, { useState } from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { FaCamera } from "react-icons/fa";
import API_URL from "../pages/api/config";
import {
  FormModal,
  FormBody,
  FormFooter,
  SectionTitle,
  TextField,
  SelectField,
  TextAreaField,
  DaysField,
  Shell,
  apiErrorText,
} from "./FormKit";

const domain = `${API_URL}`;
const addDoctorUrl = `${domain}/api/doctors/create/`;
const doctorUrl = (id) => `${domain}/api/doctors/${id}/`;

const emptyValues = {
  full_name: "",
  email: "",
  phone: "",
  gender: "",
  specialization: "",
  experience_years: "",
  available_days: [],
  start_time: "",
  end_time: "",
  bio: "",
  is_active: true,
  profile_image: null,
};

// "10:52:00" -> "10:52" (what a time input expects)
const hhmm = (t) => (t ? `${t}`.slice(0, 5) : "");

const valuesFromDoctor = (d) => ({
  full_name: d.full_name || "",
  email: d.email || "",
  phone: d.phone || "",
  gender: d.gender || "",
  specialization: d.specialization || "",
  experience_years: d.experience_years ?? "",
  available_days: d.available_days || [],
  start_time: hhmm(d.start_time),
  end_time: hhmm(d.end_time),
  bio: d.bio || "",
  is_active: d.is_active !== false,
  profile_image: null, // only set when a new photo is chosen
});

const validationSchema = Yup.object({
  full_name: Yup.string().required("Full name is required"),
  email: Yup.string().email("Enter a valid email").required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  gender: Yup.string().oneOf(["Male", "Female"]).required("Please choose a gender"),
  specialization: Yup.string().required("Specialization is required"),
  experience_years: Yup.number().typeError("Enter a number").min(0, "Must be 0 or more").nullable(),
  available_days: Yup.array().min(1, "Pick at least one day"),
});

// Photo picker with a round preview. `current` is the photo the doctor already has.
const PhotoField = ({ name, current }) => {
  const [, , helpers] = useField(name);
  const [preview, setPreview] = useState(current || "");
  return (
    <Shell
      label="Profile photo"
      hint={current ? "Choose a new photo to replace the current one." : "Optional. JPG or PNG."}
      full
    >
      <div className="flex items-center gap-4">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-cream text-main-color/30 ring-1 ring-main-color/10">
          {preview ? <img src={preview} alt="" className="h-full w-full object-cover" /> : <FaCamera size={22} />}
        </div>
        <label className="cursor-pointer rounded-full border border-main-color/20 px-5 py-2 text-sm text-main-color transition-colors hover:border-primary-color hover:text-primary-color">
          {preview ? "Change photo" : "Choose photo"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.currentTarget.files[0];
              if (!file) return;
              helpers.setValue(file);
              setPreview(URL.createObjectURL(file));
            }}
          />
        </label>
      </div>
    </Shell>
  );
};

// Add a doctor, or edit one when a `doctor` is passed in.
// onClose: close the pop-up. onSaved(doctor): called after a successful save.
function AddDoctor({ doctor, onClose, onSaved }) {
  const editing = Boolean(doctor);
  const [error, setError] = useState("");

  const handleSubmit = async (values, { setSubmitting }) => {
    setError("");
    try {
      const formData = new FormData();
      formData.append("full_name", values.full_name.trim());
      formData.append("email", values.email.trim());
      formData.append("phone", values.phone.trim());
      formData.append("gender", values.gender);
      formData.append("specialization", values.specialization.trim());
      if (values.experience_years !== "") formData.append("experience_years", values.experience_years);
      if (values.start_time) formData.append("start_time", values.start_time);
      if (values.end_time) formData.append("end_time", values.end_time);
      formData.append("bio", values.bio);
      formData.append("is_active", values.is_active ? "true" : "false");
      values.available_days.forEach((day) => formData.append("available_days", day));
      // Only send a photo if a new one was chosen (otherwise the current one is kept).
      if (values.profile_image) formData.append("profile_image", values.profile_image);

      const config = { headers: { Authorization: localStorage.getItem("Token1") } };
      const res = editing
        ? await axios.patch(doctorUrl(doctor.id), formData, config)
        : await axios.post(addDoctorUrl, formData, config);
      if (onSaved) onSaved(res.data);
      else window.location.reload();
    } catch (err) {
      setError(apiErrorText(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <FormModal
      eyebrow="Team"
      title={editing ? "Edit Doctor" : "Add Doctor"}
      subtitle={
        editing
          ? `Update ${doctor.full_name}'s details. Fields marked * are required.`
          : "Add a doctor so patients can book with them. Fields marked * are required."
      }
      onClose={onClose}
    >
      <Formik
        initialValues={editing ? valuesFromDoctor(doctor) : emptyValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form className="flex min-h-0 flex-1 flex-col">
            <FormBody>
              <SectionTitle>Profile</SectionTitle>
              <PhotoField name="profile_image" current={editing ? doctor.profile_image : ""} />
              <TextField name="full_name" label="Full name" required full />
              <SelectField name="gender" label="Gender" required>
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </SelectField>
              <TextField name="specialization" label="Specialization" required placeholder="e.g. Orthodontist" />
              <TextField name="experience_years" label="Years of experience" type="number" min="0" />
              <TextField name="phone" label="Phone" type="tel" required />
              <TextField name="email" label="Email" type="email" required full />
              <TextAreaField name="bio" label="Short bio" placeholder="A few lines patients will read about the doctor" />

              <SectionTitle>Availability</SectionTitle>
              <DaysField name="available_days" label="Working days" />
              <TextField name="start_time" label="Starts at" type="time" />
              <TextField name="end_time" label="Ends at" type="time" />
              <div className="sm:col-span-2">
                <label className="flex cursor-pointer items-center gap-3 text-sm text-main-color">
                  <input
                    type="checkbox"
                    checked={values.is_active}
                    onChange={(e) => setFieldValue("is_active", e.target.checked)}
                    className="h-5 w-5 rounded border-main-color/30 accent-primary-color checked:!border-primary-color checked:!bg-primary-color focus:!ring-primary-color/40"
                  />
                  Available for bookings
                </label>
              </div>
            </FormBody>
            <FormFooter
              onCancel={onClose}
              submitting={isSubmitting}
              submitLabel={editing ? "Save changes" : "Save doctor"}
              error={error}
            />
          </Form>
        )}
      </Formik>
    </FormModal>
  );
}

export default AddDoctor;
