import React, { useState, useEffect } from "react";
import { useFormikContext } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AppointmentDatePicker = ({ doctor }) => {
  const { setFieldValue, values } = useFormikContext();
  const [selectedDate, setSelectedDate] = useState(null);

  const isDoctorAvailable = (date) => {
    if (!doctor || !doctor.available_days) return false;

    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    return doctor.available_days.includes(dayName);
  };

  // useEffect(() => {
  //   setFieldValue(
  //     "appointment_date",
  //     selectedDate ? selectedDate.toISOString().slice(0, 10) : ""
  //   );
  // }, [selectedDate, setFieldValue]);
  const handleDateChange = (date) => {
    setFieldValue("appointment_date", date); // sets Formik value
  };

  return (
    <div>
      <label className="block font-medium">
        Appointment Date <span className="text-red-500">*</span>
      </label>
      <DatePicker
        selected={values.appointment_date}
        onChange={handleDateChange}
        filterDate={isDoctorAvailable}
        dateFormat="yyyy-MM-dd"
        placeholderText="Select a date"
        className="block w-full p-2 border rounded-md text-base "
        minDate={new Date()}
      />
    </div>
  );
};

export default AppointmentDatePicker;
