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

const domain = `${API_URL}`;
const createReservstionUrl = `${domain}/api/reservation/appointments/book/`;
const getReservstionUrl = `${domain}/api/reservation/appointments/`;

const patientInfo = [
  {
    id: "1",
    title: "New Patient",
    services: [{ service1: "filling" }],
  },
  {
    id: "2",
    title: "Existing Patient",
    services: [{ service1: "veneer" }, { service1: "filling" }],
  },
];

function index() {
  const [reservationsData, setReservationsData] = useState("");

  const validationSchema = Yup.object({
    fullName: Yup.string()
      .min(3, "Must be at least 3 characters")
      .required("Full name is required"),
    email: Yup.string().email("Invalid email format"),
    phone: Yup.string()
      .matches(/^[0-9]{11}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    date: Yup.date()
      .min(new Date(), "Appointment date cannot be in the past")
      .required("Please select a date"),
    time: Yup.string().required("Please select a time"),
    // reason: Yup.string().min(10, "Please provide more details"),
  });

  useEffect(async () => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(getReservstionUrl, {
          headers: {
            Authorization: localStorage.getItem("Token1"),
          },
        });

        console.log("API Response:", response.data);
        setReservationsData(response.data); // ✅ Correctly set the response data
      } catch (error) {
        console.error(
          "Error fetching reservations:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchReservations();
  }, []);

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log("Form data:", values);
    try {
      // Send data to backend
      const response = await axios.post(`${createReservstionUrl}`, values, {
        headers: { Authorization: localStorage.getItem("Token1") },
      });
      console.log("Appointment booked successfully:", response.data);
      alert("Appointment booked successfully!");
      resetForm(); // Reset form after successful submission
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment. Try again later.");
    }
    setSubmitting(false);
  };
  return (
    <div className="mt-32  ">
      <div className=" container py-20 bg-gray-100">
        {" "}
        <h1 className="text-bold text-center">Book an Appointment</h1>
        <div className="flex items-center justify-center flex-col md:flex-row w-full ">
          <div className="w-full">
            <TabGroup>
              <TabList className="mb-6 rounded-full border border-black w-fit mx-auto ">
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
              </TabList>
              <TabPanels>
                {patientInfo?.map((patient) => {
                  return (
                    <TabPanel>
                      <div className="flex flex-col gap-2 mx-10   ">
                        <Formik
                          initialValues={{
                            fullName: "",
                            email: "",
                            phone: "",
                            appointment_date: "",
                            appointment_time: "",
                            message: "",
                          }}
                          validationSchema={validationSchema}
                          onSubmit={handleSubmit}
                        >
                          {({ isSubmitting }) => (
                            <Form className="space-y-4">
                              {/* Full Name */}
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                                <div>
                                  <label className="block font-medium">
                                    Full Name <span>*</span>
                                  </label>
                                  <Field
                                    type="text"
                                    name="fullName"
                                    className="w-full p-2 border rounded-md"
                                  />
                                  <ErrorMessage
                                    name="fullName"
                                    component="div"
                                    className="text-red-500 text-sm"
                                  />
                                </div>

                                {/* Email */}
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
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-4">
                                {/* Date */}
                                <div>
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
                                </div>

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
                                    <option value="09:00 AM">09:00 AM</option>
                                    <option value="10:00 AM">10:00 AM</option>
                                    <option value="11:00 AM">11:00 AM</option>
                                    <option value="01:00 PM">01:00 PM</option>
                                    <option value="02:00 PM">02:00 PM</option>
                                  </Field>
                                  <ErrorMessage
                                    name="time"
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
                                  name="reason"
                                  className="w-full p-2 border rounded-md"
                                  rows="3"
                                />
                                <ErrorMessage
                                  name="reason"
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
                          )}
                        </Formik>
                      </div>
                    </TabPanel>
                  );
                })}
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
