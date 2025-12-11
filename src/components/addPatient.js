import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import axios from "axios";
import API_URL from "../pages/api/config";

const domain = `${API_URL}`;
const addPatientUrl = `${domain}/api/dashboard/addPatient/`;
const getDoctorsUrl = `${domain}/api/doctors/`;

function addPatient() {
  const [allDoctors, setAllDoctors] = React.useState([]);
  useEffect(() => {
    const fetchAllDoctors = async () => {
      try {
        const response = await axios.get(getDoctorsUrl, {
          headers: {
            Authorization: localStorage.getItem("Token1"),
          },
        });

        console.log("API Response:", response.data);
        setAllDoctors(response.data); // ✅ Correctly set the response data
      } catch (error) {
        console.error(
          "Error fetching AllDoctors:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchAllDoctors();
  }, []);
  const initialValues = {
    patient_name: "",
    age: "",
    email: "",
    phone: "",
    gender: "",
    address: "",
    allergies: [],
    created_at: "",
    last_updated_at: "",
    last_updated_by: "",
    doctor: "",
    medications: [],
    emergency_contact: "",
  };

  const validationSchema = Yup.object({
    patient_name: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    gender: Yup.string()
      .oneOf(["Male", "Female"])
      .required("Gender is required"),
    address: Yup.string().required("address is required"),
    age: Yup.number().min(0, "Must be 1 or more").nullable(),
    // allergies: Yup.string().required("Please specify available days"),

    created_at: Yup.string(),
    last_updated_at: Yup.string(),

    // profile_image is optional
  });

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      // Append all fields from your form (assuming you have them in a `values` object)
      formData.append("patient_name", values.patient_name);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("gender", values.gender);
      formData.append("address", values.address);
      formData.append("age", values.age);
      formData.append("created_at", values.created_at); // "HH:MM" format
      formData.append("last_updated_at", values.last_updated_at); // "HH:MM" format
      formData.append("doctor", values.doctor);
      formData.append("emergency_contact", values.emergency_contact);
      formData.append("last_updated_by", values.last_updated_by);

      if (values.allergies) {
        values.allergies.forEach((allergy) => {
          formData.append("allergies", allergy);
        });
      }
      if (values.medications) {
        values.medications.forEach((medication) => {
          formData.append("medications", medication);
        });
      }

      console.log("FormData entries:", [...formData.entries()]);

      console.log("Submitting form data:", values);

      await axios
        .post(addPatientUrl, formData, {
          headers: {
            Authorization: localStorage.getItem("Token1"),
            "Content-Type": "application/json",
          },
        })
        .then((res) => console.log(res));
      window.location.reload();
    } catch (err) {
      if (err.response) {
        console.group("🛑 500 Response");
        console.error("Status:", err.response.status);
        console.error("Headers:", err.response.headers);
        console.error("Body:", err.response.data);
        console.groupEnd();
      } else if (err.request) {
        console.error("No response—request was:", err.request);
      } else {
        console.error("Setup error:", err.message);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50   flex w-full items-center justify-center p-4 overflow-y-auto  ">
      <DialogPanel className=" space-y-4 border bg-white px-12 pb-12 mt-10 ">
        <DialogTitle className="font-bold my-10">Add Patient:</DialogTitle>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values }) => (
            <Form encType="multipart/form-data" className="space-y-4">
              {/* Full Name */}
              <div className="flex items-center gap-4">
                <label htmlFor="patient_name" className="w-40">
                  Full Name:
                </label>
                <Field
                  name="patient_name"
                  type="text"
                  id="patient_name"
                  className="w-full border p-2 rounded"
                />
              </div>
              <ErrorMessage
                name="patient_name"
                component="div"
                className="text-red-500 ml-44"
              />

              {/* Email */}
              <div className="flex items-center gap-4">
                <label htmlFor="email" className="w-40">
                  Email:
                </label>
                <Field
                  name="email"
                  type="email"
                  id="email"
                  className="w-full border p-2 rounded"
                />
              </div>
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 ml-44"
              />

              {/* Phone */}
              <div className="flex items-center gap-4">
                <label htmlFor="phone" className="w-40">
                  Phone:
                </label>
                <Field
                  name="phone"
                  type="text"
                  id="phone"
                  className="w-full border p-2 rounded"
                />
              </div>
              <ErrorMessage
                name="phone"
                component="div"
                className="text-red-500 ml-44"
              />

              {/* Gender */}
              <div className="flex items-center gap-4">
                <label htmlFor="gender" className="w-40">
                  Gender:
                </label>
                <Field
                  as="select"
                  name="gender"
                  id="gender"
                  className="w-full border p-2 rounded"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Field>
              </div>
              <ErrorMessage
                name="gender"
                component="div"
                className="text-red-500 ml-44"
              />

              {/* address */}
              <div className="flex items-center gap-4">
                <label htmlFor="address" className="w-40">
                  address:
                </label>
                <Field
                  name="address"
                  type="text"
                  id="address"
                  className="w-full border p-2 rounded"
                />
              </div>
              <ErrorMessage
                name="address"
                component="div"
                className="text-red-500 ml-44"
              />

              {/* Experience */}
              <div className="flex items-center gap-4">
                <label htmlFor="age" className="w-40">
                  Age:
                </label>
                <Field
                  name="age"
                  type="number"
                  id="age"
                  className="w-full border p-2 rounded"
                />
              </div>
              <ErrorMessage
                name="age"
                component="div"
                className="text-red-500 ml-44"
              />
              <div className="flex items-center gap-4">
                <label htmlFor="medications" className="w-40">
                  doctor:
                </label>
                <Field
                  as="select"
                  name="doctor"
                  className="w-full p-2 border rounded-md"
                  value={values.doctor}
                  onChange={(e) => {
                    const selectedId = e.target.value;
                    setFieldValue("doctor", selectedId); // update Formik's value
                  }}
                >
                  <option value="" disabled>
                    Select Doctor
                  </option>
                  {allDoctors.map((doc) => (
                    <option key={doc.id} value={doc.id}>
                      {doc.full_name} – {doc.specialization}
                    </option>
                  ))}
                </Field>
              </div>

              <div className="flex items-center gap-4">
                <label htmlFor="allergies" className="w-40">
                  Allergies:
                </label>

                <Field name="allergies">
                  {({ field, form }) => (
                    <input
                      id="allergies"
                      className="w-full border p-2 rounded"
                      value={
                        Array.isArray(field.value) ? field.value.join(", ") : ""
                      }
                      onChange={(e) => {
                        const arr = e.target.value
                          .split(",")
                          .map((item) => item.trim())
                          .filter(Boolean);

                        form.setFieldValue("allergies", arr);
                      }}
                    />
                  )}
                </Field>
              </div>
              <ErrorMessage
                name="allergies"
                component="div"
                className="text-red-500 ml-44"
              />
              <div className="flex items-center gap-4">
                <label htmlFor="medications" className="w-40">
                  medications:
                </label>
                <Field name="medications">
                  {({ field, form }) => (
                    <input
                      {...field}
                      id="medications"
                      className="w-full border p-2 rounded"
                      value={
                        Array.isArray(field.value) ? field.value.join(", ") : ""
                      }
                      onChange={(e) => {
                        const arr = e.target.value
                          .split(",")
                          .map((item) => item.trim())
                          .filter(Boolean); // remove empty items

                        form.setFieldValue("medications", arr);
                      }}
                    />
                  )}
                </Field>
              </div>
              <ErrorMessage
                name="medications"
                component="div"
                className="text-red-500 ml-44"
              />
              <div className="flex items-center gap-4">
                <label htmlFor="Emergency Contact" className="w-40">
                  Emergency Contact:
                </label>
                <Field
                  name="Emergency Contact"
                  type="text"
                  id="Emergency Contact"
                  className="w-full border p-2 rounded"
                />
              </div>
              <ErrorMessage
                name="Emergency Contact"
                component="div"
                className="text-red-500 ml-44"
              />
              {/* Start Time */}
              {/* <div className="flex items-center gap-4">
                <label
                  htmlFor="created_at
created_at"
                  className="w-40"
                >
                  Start Time:
                </label>
                <Field
                  name="created_at
created_at"
                  type="time"
                  id="created_at
created_at"
                  className="w-full border p-2 rounded"
                />
              </div> */}

              {/* End Time */}
              {/* <div className="flex items-center gap-4">
                <label htmlFor="last_updated_at" className="w-40">
                  End Time:
                </label>
                <Field
                  name="last_updated_at"
                  type="time"
                  id="last_updated_at"
                  className="w-full border p-2 rounded"
                />
              </div> */}

              {/*doctor */}

              {/* Profile Image */}
              {/* <div className="flex items-center gap-4">
                <label htmlFor="profile_image" className="w-40">
                  Profile Image:
                </label>
                <input
                  name="profile_image"
                  type="file"
                  id="profile_image"
                  className="w-full"
                  onChange={(event) => {
                    setFieldValue(
                      "profile_image",
                      event.currentTarget.files[0]
                    );
                  }}
                />
              </div> */}

              {/* Active */}
              {/* <div className="flex items-center gap-4  ">
                <label htmlFor="is_active" className="w-40">
                  Active:
                </label>
                <Field
                  type="checkbox"
                  name="is_active"
                  id="is_active"
                  checked={values.is_active}
                  className="w-5 h-5 "
                />
              </div> */}
              <button
                type="submit"
                className="btn1 btn-primary1 w-full  "
                // onClick={handleSubmit}
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </DialogPanel>
    </div>
  );
}

export default addPatient;
