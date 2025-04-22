"use client";
import React, { useEffect, useState } from "react";
// import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
// import Tab from 'react-bootstrap/Tab';
// import Tabs from 'react-bootstrap/Tabs';
import Dropdown from "react-bootstrap/Dropdown";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { IoIosArrowDown } from "react-icons/io";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import API_URL from "../api/config";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AppointmentDatePicker from "../../components/AppointmentDatePicker";
import { useFormikContext } from "formik";
import { format } from "date-fns";

const domain = `${API_URL}`;
const createReservstionUrl = `${domain}/api/reservation/appointments/book/`;
const getReservstionUrl = `${domain}/api/reservation/appointments/`;
const getDoctorsUrl = `${domain}/api/doctors/`;
const getBookedSlotsUrl = `${domain}/api/booked_slots/`;

function index() {
  const [reservationsData, setReservationsData] = useState("");
  const [allDoctors, setAllDoctors] = React.useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [finished, setFinished] = useState(false);

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

  const validationSchema = Yup.object({
    full_name: Yup.string()
      .min(3, "Must be at least 3 characters")
      .required("Full name is required"),
    email: Yup.string().email("Invalid email format"),
    phone: Yup.string()
      .matches(/^[0-9]{11}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),

    // reason: Yup.string().min(10, "Please provide more details"),
  });
  function generateTimeSlots(startTime, endTime, intervalMinutes) {
    const slots = [];
    const start = new Date(`1970-01-01T${startTime}`);
    const end = new Date(`1970-01-01T${endTime}`);

    while (start < end) {
      const hours = start.getHours().toString().padStart(2, "0");
      const minutes = start.getMinutes().toString().padStart(2, "0");
      slots.push(`${hours}:${minutes}`);
      start.setMinutes(start.getMinutes() + intervalMinutes);
      setSlots(slots);
    }

    return slots;
  }

  // Handle form submission
  const handleSubmit = async (values) => {
    console.log("hi");
    console.log("Form data:", values);
    try {
      // Send data to backend
      const response = await axios.post(
        `${createReservstionUrl}`,
        {
          ...values,
          appointment_date: format(values.appointment_date, "yyyy-MM-dd"),
        },
        {
          headers: { Authorization: localStorage.getItem("Token1") },
        }
      );
      console.log("Appointment booked successfully:", response.data);
      alert("Appointment booked successfully!");
      // resetForm();
      window.location.reload(); // Reload the page to see the updated data
      // Reset form after successful submission
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment. Try again later.");
    }
  };

  const handleDoctorTime = (id) => {
    const doc = allDoctors.find((doctor) => doctor.id == id);
    setSelectedDoctor(doc);
    console.log("Selected doctor:", doc);
    const startTime = doc.start_time;
    const endTime = doc.end_time;

    if (doc) {
      generateTimeSlots(startTime, endTime, 60);
    }
  };
  console.log("slots", slots);

  return (
    <div className="mt-32  ">
      <div className=" container py-20 bg-gray-100">
        {" "}
        <h1 className="text-bold text-center">Book an Appointment</h1>
        <div className="flex items-center justify-center flex-col md:flex-row w-full ">
          <div className="w-full">
            <TabGroup>
              {/* <TabList className="mb-6 rounded-full border border-black w-fit mx-auto ">
                {patientInfo?.map((patient) => {
                  return (
                    <Tab
                      key={patient.id}
                      className="rounded-full py-1 px-3 text-sm/6 font-semibold text-black focus:outline-none data-[selected]:bg-primary-color   data-[selected]:data-[hover]:bg-primary-color data-[focus]:outline-1 data-[focus]:outline-primary-color"
                    >
                      {patient.title}
                    </Tab>
                  );
                })}
              </TabList> */}
              <TabPanels>
                <TabPanel>
                  {finished ? (
                    <div>Appointment booked successfully</div>
                  ) : (
                    <>
                      <div className="flex flex-col gap-2 mx-10   ">
                        <Formik
                          initialValues={{
                            full_name: "",
                            email: "",
                            phone: "",
                            age: "",
                            doctor: "",
                            appointment_date: "",
                            appointment_time: "",
                            message: "",
                          }}
                          validationSchema={validationSchema}
                          onSubmit={handleSubmit}
                        >
                          {({ values, isSubmitting, setFieldValue }) => {
                            console.log("Formik values:", values);
                            useEffect(() => {
                              if (selectedDoctor && values.appointment_date) {
                                fetch(
                                  `${getBookedSlotsUrl}${selectedDoctor}/${format(
                                    values.appointment_date,
                                    "yyyy-MM-dd"
                                  )}`
                                )
                                  .then((res) => res.json())
                                  .then((bookedTimes) => {
                                    const allSlots = generateTimeSlots(
                                      doctor.start_time,
                                      doctor.end_time,
                                      60
                                    );
                                    const availableSlots = allSlots.filter(
                                      (time) => !bookedTimes.includes(time)
                                    );
                                    setSlots(availableSlots);
                                  });
                              }
                            }, [selectedDoctor, values.appointment_date]);

                            return (
                              <Form className="space-y-4">
                                {/* Full Name */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-4">
                                  <div>
                                    <label className="block font-medium">
                                      Full Name <span>*</span>
                                    </label>
                                    <Field
                                      type="text"
                                      name="full_name"
                                      className="w-full p-2 border rounded-md"
                                    />
                                    <ErrorMessage
                                      name="full_name"
                                      component="div"
                                      className="text-red-500 text-sm"
                                    />
                                  </div>
                                  <div>
                                    <label className="block font-medium">
                                      Age <span>*</span>
                                    </label>
                                    <Field
                                      type="number"
                                      name="age"
                                      className="w-full p-2 border rounded-md"
                                    />
                                    <ErrorMessage
                                      name="age"
                                      component="div"
                                      className="text-red-500 text-sm"
                                    />
                                  </div>
                                  {/* Email */}

                                  {/* Phone */}
                                  <div>
                                    <label className="block font-medium">
                                      Phone Number <span>*</span>
                                    </label>
                                    <Field
                                      type="text"
                                      name="phone"
                                      className="w-full p-2 border rounded-md"
                                    />
                                    <ErrorMessage
                                      name="phone"
                                      component="div"
                                      className="text-red-500 text-sm"
                                    />
                                  </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-4">
                                  {/* Date */}
                                  <div>
                                    <label className="block font-medium">
                                      Choose a Doctor{" "}
                                      <span className="text-red-500">*</span>
                                    </label>
                                    <Field
                                      as="select"
                                      name="doctor"
                                      className="w-full p-2 border rounded-md"
                                      value={values.doctor}
                                      onChange={(e) => {
                                        const selectedId = e.target.value;
                                        setFieldValue("doctor", selectedId); // update Formik's value
                                        handleDoctorTime(selectedId);
                                      }}
                                    >
                                      <option value="" disabled>
                                        -- Select Doctor --
                                      </option>
                                      {allDoctors.map((doc) => (
                                        <option key={doc.id} value={doc.id}>
                                          {doc.full_name} – {doc.specialization}
                                        </option>
                                      ))}
                                    </Field>
                                    <ErrorMessage
                                      name="doctor"
                                      component="div"
                                      className="text-red-500 text-sm"
                                    />
                                  </div>
                                  {/* <div>
                              <label className="block font-medium">
                                Appointment Date <span>*</span>
                              </label>
                              <Field
                                type="date"
                                name="appointment_date"
                                className="w-full p-2 border rounded-md"
                              />
                              <ErrorMessage
                                name="date"
                                component="div"
                                className="text-red-500 text-sm"
                              />
                            </div> */}
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ">
                                    <AppointmentDatePicker
                                      doctor={selectedDoctor}
                                    />

                                    {/* Time */}
                                    <div>
                                      <label className="block font-medium">
                                        Appointment Time <span>*</span>
                                      </label>
                                      <Field
                                        as="select"
                                        name="appointment_time"
                                        className="w-full p-2 border rounded-md"
                                      >
                                        <option value="">Select a time</option>
                                        {slots?.map((slot) => (
                                          <option value={slot}>{slot}</option>
                                        ))}
                                      </Field>
                                      <ErrorMessage
                                        name="time"
                                        component="div"
                                        className="text-red-500 text-sm"
                                      />
                                    </div>
                                  </div>
                                  <div>
                                    <label className="block font-medium">
                                      Email
                                    </label>
                                    <Field
                                      type="email"
                                      name="email"
                                      className="w-full p-2 border rounded-md"
                                    />
                                    <ErrorMessage
                                      name="email"
                                      component="div"
                                      className="text-red-500 text-sm"
                                    />
                                  </div>
                                </div>

                                {/* Reason for Appointment */}
                                <div className="mb-4">
                                  <label className="block font-medium ">
                                    Reason for Appointment
                                  </label>
                                  <Field
                                    as="textarea"
                                    name="message"
                                    className="w-full p-2 border rounded-md"
                                    rows="3"
                                  />
                                  <ErrorMessage
                                    name="message"
                                    component="div"
                                    className="text-red-500 text-sm"
                                  />
                                </div>

                                {/* Submit Button */}
                                <button
                                  type="submit"
                                  disabled={isSubmitting}
                                  className="btn1 btn-primary1 w-fit  mx-auto "
                                >
                                  {isSubmitting
                                    ? "Booking..."
                                    : "Book Appointment"}
                                </button>
                              </Form>
                            );
                          }}
                        </Formik>
                      </div>
                    </>
                  )}
                </TabPanel>
              </TabPanels>
            </TabGroup>

            {/* <Tabs
            defaultActiveKey="New Patient"
            id="uncontrolled-tab-example"
            className="mb-3 rounded-full border border-black w-fit"
          >
            <Tab eventKey="New Patient" title="New Patient">
              <div className='flex flex-col gap-2'>
                <Menu >
                  <MenuButton className="rounded-full border border-black p-2" >Please Select a Service </MenuButton>
                  <MenuItems anchor="bottom">
                    <MenuItem>
                      <a className="block data-[focus]:bg-blue-100" href="/settings">
                        Settings
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a className="block data-[focus]:bg-blue-100" href="/support">
                        Support
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a className="block data-[focus]:bg-blue-100" href="/license">
                        License
                      </a>
                    </MenuItem>
                  </MenuItems>
                </Menu>
                <input type='date' className='rounded-full' />
              </div>

            </Tab>
            <Tab eventKey="Existing Patient" title="Existing Patient">
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Dropdown Button
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Tab>
          </Tabs> */}
          </div>
        </div>
      </div>
      {/* <div className="hidden md:block">
        <img
          src="/images/Suite-test-4800x3200.webp"
          alt=""
          style={{ width: "100%", height: "100%" }}
        />
      </div> */}
    </div>
  );
}

export default index;
