import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import API_URL from "../pages/api/config";
import {
  FormModal,
  FormBody,
  FormFooter,
  SectionTitle,
  TextField,
  SelectField,
  ListField,
  apiErrorText,
} from "./FormKit";

const domain = `${API_URL}`;
const addPatientUrl = `${domain}/api/dashboard/addPatient/`;
const getDoctorsUrl = `${domain}/api/doctors/`;

const initialValues = {
  patient_name: "",
  age: "",
  email: "",
  phone: "",
  gender: "",
  address: "",
  doctor: "",
  allergies: [],
  medications: [],
  emergency_contact: "",
};

const validationSchema = Yup.object({
  patient_name: Yup.string().required("Full name is required"),
  email: Yup.string().email("Enter a valid email").required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  gender: Yup.string().oneOf(["Male", "Female"]).required("Please choose a gender"),
  address: Yup.string().required("Address is required"),
  age: Yup.number().typeError("Enter a number").min(0, "Must be 0 or more").required("Age is required"),
});

// onClose: close the pop-up. onSaved(patient): called after a successful save.
function AddPatient({ onClose, onSaved }) {
  const [allDoctors, setAllDoctors] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(getDoctorsUrl, { headers: { Authorization: localStorage.getItem("Token1") } })
      .then((res) => setAllDoctors(res.data))
      .catch((err) =>
        console.error("Error fetching AllDoctors:", err.response ? err.response.data : err.message)
      );
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    setError("");
    try {
      const payload = {
        patient_name: values.patient_name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        gender: values.gender,
        address: values.address.trim(),
        age: Number(values.age),
        allergies: values.allergies,
        medications: values.medications,
        emergency_contact: values.emergency_contact.trim() || null,
        doctor: values.doctor || null,
      };
      const res = await axios.post(addPatientUrl, payload, {
        headers: { Authorization: localStorage.getItem("Token1") },
      });
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
      eyebrow="New record"
      title="Add Patient"
      subtitle="Fill in the patient's details. Fields marked * are required."
      onClose={onClose}
    >
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form className="flex min-h-0 flex-1 flex-col">
            <FormBody>
              <SectionTitle>Personal details</SectionTitle>
              <TextField name="patient_name" label="Full name" required full />
              <SelectField name="gender" label="Gender" required>
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </SelectField>
              <TextField name="age" label="Age" type="number" min="0" required />

              <SectionTitle>Contact</SectionTitle>
              <TextField name="phone" label="Phone" type="tel" required />
              <TextField name="email" label="Email" type="email" required />
              <TextField name="address" label="Address" required full />
              <TextField
                name="emergency_contact"
                label="Emergency contact"
                type="tel"
                hint="Phone number of someone we can call"
                full
              />

              <SectionTitle>Medical</SectionTitle>
              <SelectField name="doctor" label="Doctor" full>
                <option value="">No doctor assigned</option>
                {allDoctors.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.full_name} – {doc.specialization}
                  </option>
                ))}
              </SelectField>
              <ListField name="allergies" label="Allergies" placeholder="e.g. Penicillin, Latex" />
              <ListField name="medications" label="Medications" placeholder="e.g. Aspirin" />
            </FormBody>
            <FormFooter
              onCancel={onClose}
              submitting={isSubmitting}
              submitLabel="Save patient"
              error={error}
            />
          </Form>
        )}
      </Formik>
    </FormModal>
  );
}

export default AddPatient;
