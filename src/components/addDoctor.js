import React from "react";
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
const getDoctorsUrl = `${domain}/api/doctors/`;
const addDoctorUrl = `${domain}/api/doctors/create/`;
const editDoctorUrl = `${domain}/api/doctors/`;
const deleteDoctorUrl = `${domain}/api/doctors/`;

function addDoctor() {
  const initialValues = {
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
    is_active: "",
    profile_image: null,
  };

  const validationSchema = Yup.object({
    full_name: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    gender: Yup.string()
      .oneOf(["Male", "Female"])
      .required("Gender is required"),
    specialization: Yup.string().required("Specialization is required"),
    experience_years: Yup.number().min(0, "Must be 0 or more").nullable(),
    // available_days: Yup.string().required("Please specify available days"),
    start_time: Yup.string(),
    end_time: Yup.string(),
    bio: Yup.string(),
    // profile_image is optional
  });

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      // Append all fields from your form (assuming you have them in a `values` object)
      formData.append("full_name", values.full_name);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("gender", values.gender);
      formData.append("specialization", values.specialization);
      formData.append("experience_years", values.experience_years);
      formData.append("start_time", values.start_time); // "HH:MM" format
      formData.append("end_time", values.end_time); // "HH:MM" format
      formData.append("bio", values.bio);
      formData.append("is_active", values.is_active ? "true" : "false"); // true or false

      if (values.available_days) {
        values.available_days.forEach((day) => {
          formData.append("available_days", day);
        });
      }

      // If there's a profile image, make sure it's a File object
      if (values.profile_image) {
        formData.append("profile_image", values.profile_image);
      }
      console.log("FormData entries:", [...formData.entries()]);

      console.log("Submitting form data:", values);

      await axios
        .post(addDoctorUrl, formData, {
          headers: {
            Authorization: localStorage.getItem("Token1"),
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
    <div className="fixed inset-0 bg-black bg-opacity-50   flex w-full items-center justify-center p-4 overflow-y-auto  pt-10">
      <DialogPanel className=" space-y-4 border bg-white p-12 mt-40 ">
        <DialogTitle className="font-bold my-10">Add Doctor</DialogTitle>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values }) => (
            <Form encType="multipart/form-data" className="space-y-4">
              {/* Full Name */}
              <div className="flex items-center gap-4">
                <label htmlFor="full_name" className="w-40">
                  Full Name:
                </label>
                <Field
                  name="full_name"
                  type="text"
                  id="full_name"
                  className="w-full border p-2 rounded"
                />
              </div>
              <ErrorMessage
                name="full_name"
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

              {/* Specialization */}
              <div className="flex items-center gap-4">
                <label htmlFor="specialization" className="w-40">
                  Specialization:
                </label>
                <Field
                  name="specialization"
                  type="text"
                  id="specialization"
                  className="w-full border p-2 rounded"
                />
              </div>
              <ErrorMessage
                name="specialization"
                component="div"
                className="text-red-500 ml-44"
              />

              {/* Experience */}
              <div className="flex items-center gap-4">
                <label htmlFor="experience_years" className="w-40">
                  Experience (years):
                </label>
                <Field
                  name="experience_years"
                  type="number"
                  id="experience_years"
                  className="w-full border p-2 rounded"
                />
              </div>
              <ErrorMessage
                name="experience_years"
                component="div"
                className="text-red-500 ml-44"
              />

              {/* Available Days */}
              <div className="flex items-center gap-4">
                <label htmlFor="available_days" className="w-40">
                  Available Days:
                </label>
                {/* <Field
                  name="available_days"
                  type="text"
                  id="available_days"
                  placeholder="e.g., Monday, Wednesday"
                  className="w-full border p-2 rounded"
                /> */}
                <Field
                  multiple={true}
                  as="select"
                  name="available_days"
                  id="available_days"
                  className="w-full border p-2 rounded"
                  onChange={(e) => {
                    const selected = Array.from(
                      e.target.selectedOptions,
                      (opt) => opt.value
                    );
                    setFieldValue("available_days", selected);
                  }}
                >
                  <option value="">Select Day</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </Field>
              </div>
              <ErrorMessage
                name="available_days"
                component="div"
                className="text-red-500 ml-44"
              />

              {/* Start Time */}
              <div className="flex items-center gap-4">
                <label htmlFor="start_time" className="w-40">
                  Start Time:
                </label>
                <Field
                  name="start_time"
                  type="time"
                  id="start_time"
                  className="w-full border p-2 rounded"
                />
              </div>

              {/* End Time */}
              <div className="flex items-center gap-4">
                <label htmlFor="end_time" className="w-40">
                  End Time:
                </label>
                <Field
                  name="end_time"
                  type="time"
                  id="end_time"
                  className="w-full border p-2 rounded"
                />
              </div>

              {/* Bio */}
              <div className="flex items-start gap-4">
                <label htmlFor="bio" className="w-40 pt-2">
                  Bio:
                </label>
                <Field
                  name="bio"
                  as="textarea"
                  id="bio"
                  className="w-full border p-2 rounded h-24"
                />
              </div>

              {/* Profile Image */}
              <div className="flex items-center gap-4">
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
              </div>

              {/* Active */}
              <div className="flex items-center gap-4  ">
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
              </div>
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

export default addDoctor;
