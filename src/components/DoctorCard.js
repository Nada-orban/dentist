// DoctorCard.js
import React, { useState, useEffect } from "react";
import API_URL from "../pages/api/config";
import axios, { all } from "axios";
import { FaTrashAlt } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";

const domain = `${API_URL}`;
const editDoctorUrl = `${domain}/api/doctors/`;

const DoctorCard = ({ doctor, handleDeleteClick }) => {
  const [editMode, setEditMode] = useState(false);
  const [editDoctor, setEditDoctor] = useState(doctor);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (doctor) {
      setEditDoctor({
        available_days: doctor.available_days,
        bio: doctor.bio,
        email: doctor.email,
        start_time: doctor.start_time,
        end_time: doctor.end_time,
        experience_years: doctor.experience_years,
        full_name: doctor.full_name,
        gender: doctor.gender,
        is_active: doctor.is_active,
        phone: doctor.phone,
        profile_image: doctor.profile_image ? doctor.profile_image : undefined,
        specialization: doctor.specialization,
      });
    }
  }, [doctor]);
  const handleSave = async () => {
    await handleEditDoctor(editDoctor);
    setEditMode(false);
  };
  console.log("editDoctor", editDoctor);
  const handleEditDoctor = async (doctor) => {
    try {
      const formData = new FormData();

      // Append normal fields
      formData.append("full_name", editDoctor.full_name);
      formData.append("email", editDoctor.email);
      formData.append("phone", editDoctor.phone);
      formData.append("gender", editDoctor.gender);
      formData.append("specialization", editDoctor.specialization);
      formData.append("experience_years", editDoctor.experience_years);

      formData.append("start_time", editDoctor.start_time);
      formData.append("end_time", editDoctor.end_time);
      formData.append("bio", editDoctor.bio);
      formData.append("is_active", editDoctor.is_active);
      editDoctor.available_days.forEach((day) => {
        formData.append("available_days", day);
      });
      // Append file field only if new file selected
      if (editDoctor.profile_image instanceof File) {
        formData.append("profile_image", editDoctor.profile_image);
      }
      const response = await axios.patch(
        `${editDoctorUrl}${doctor.id}/`,
        formData,
        {
          headers: { Authorization: localStorage.getItem("Token1") },
        }
      );

      setEditDoctor(response.data);
      setEditMode(false);
      window.location.reload();
    } catch (error) {
      console.error(
        "Error updating doctor:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div
      className=" shadow-md rounded-md p-4 border-2 border-gray-200 flex flex-col md:flex-row items-start justify-around "
      key={doctor.id}
    >
      <div className="p-6">
        {editMode ? (
          <>
            <input
              id="image"
              name="profile_image"
              type="file"
              accept="image/*"
              className="border p-2 rounded-md w-full  "
              onChange={(e) => {
                if (e.target.files.length > 0) {
                  console.log("New Image Selected:", e.target.files[0]);
                  setEditDoctor((prev) => ({
                    ...prev,
                    profile_image: e.target.files[0], // ✅ Ensure only a single file is stored
                  }));
                }
              }}
            />
            {!(editDoctor.profile_image instanceof File) && (
              <p className="text-xs text-gray-500 mt-1">
                Current image will be kept if you don’t choose a new one.
              </p>
            )}
          </>
        ) : (
          <img
            src={`http://localhost:8000${doctor.profile_image}`}
            // doctor.profile_image?.startsWith("http")
            //   ? doctor.profile_image
            //   : `http://localhost:8000${doctor.profile_image}`

            alt=""
            className=" h-48 w-full md:h-80  md:w-80 mb-3"
          />
        )}
      </div>

      <div className="p-6 flex-1">
        <h2 className="text-xl font-bold text-gray-800 mb-1">
          {editMode ? (
            <input
              type="text"
              value={editDoctor.full_name}
              onChange={(e) =>
                setEditDoctor({
                  ...editDoctor,
                  full_name: e.target.value,
                })
              }
              className="border p-2 rounded-md w-full"
            />
          ) : (
            <div className="">{doctor.full_name}</div>
          )}
        </h2>
        <p className="uppercase text-sm text-gray-500 mb-4">
          {editMode ? (
            <input
              type="text"
              value={editDoctor.specialization}
              onChange={(e) =>
                setEditDoctor({
                  ...editDoctor,
                  specialization: e.target.value,
                })
              }
              className="border p-2 rounded-md w-full"
            />
          ) : (
            <div className="">{doctor.specialization}</div>
          )}
        </p>
        <p className="text-gray-700 mb-4 italic">
          {editMode ? (
            <input
              type="text"
              value={editDoctor.bio}
              onChange={(e) =>
                setEditDoctor({
                  ...editDoctor,
                  bio: e.target.value,
                })
              }
              className="border p-2 rounded-md w-full"
            />
          ) : (
            <div className="">{doctor.bio}</div>
          )}
        </p>

        <div className="text-gray-600 text-sm space-y-1">
          <p className="flex items-center">
            <span className="font-semibold">Experience:</span>{" "}
            {editMode ? (
              <input
                type="number"
                value={editDoctor.experience_years}
                onChange={(e) =>
                  setEditDoctor({
                    ...editDoctor,
                    experience_years: e.target.value,
                  })
                }
                className="border p-2 rounded-md w-full"
              />
            ) : (
              <div className="">{doctor.experience_years}years</div>
            )}
          </p>
          <p className="flex items-center">
            <span className="font-semibold">Available Days:</span>{" "}
            {editMode ? (
              <select
                multiple
                value={editDoctor.available_days}
                onChange={(e) => {
                  // const daysArray = e.target.value
                  //   .split(",") // split by comma
                  //   .map((day) => day.trim()) // trim spaces around each day
                  //   .filter((day) => day); // remove any empty strings
                  const selectedOptions = Array.from(
                    e.target.selectedOptions
                  ).map((option) => option.value);

                  setEditDoctor({
                    ...editDoctor,
                    available_days: selectedOptions,
                  });
                }}
                className="border p-2 rounded-md w-full"
              >
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>
            ) : (
              <div className="">{doctor.available_days.join(", ")}</div>
            )}
          </p>
          <p className="flex items-center">
            <span className="font-semibold">Working Hours:</span>{" "}
            {editMode ? (
              <div className="flex gap-2">
                <input
                  type="time"
                  value={editDoctor.start_time}
                  onChange={(e) =>
                    setEditDoctor({
                      ...editDoctor,
                      start_time: e.target.value,
                    })
                  }
                  className="border p-2 rounded-md"
                />
                <input
                  type="time"
                  value={editDoctor.end_time}
                  onChange={(e) =>
                    setEditDoctor({
                      ...editDoctor,
                      end_time: e.target.value,
                    })
                  }
                  className="border p-2 rounded-md"
                />
              </div>
            ) : (
              <div className="">
                {doctor.start_time} - {doctor.end_time}
              </div>
            )}
          </p>
          <p className="flex items-center">
            <span className="font-semibold">Gender:</span>{" "}
            {editMode ? (
              <input
                type="text"
                value={editDoctor.gender}
                onChange={(e) =>
                  setEditDoctor({
                    ...editDoctor,
                    gender: e.target.value,
                  })
                }
                className="border p-2 rounded-md w-full"
              />
            ) : (
              <div className="">{doctor.gender}</div>
            )}
          </p>
          <p className="flex items-center">
            <span className="font-semibold">Phone:</span>{" "}
            {editMode ? (
              <input
                type="text"
                value={editDoctor.phone}
                onChange={(e) =>
                  setEditDoctor({
                    ...editDoctor,
                    phone: e.target.value,
                  })
                }
                className="border p-2 rounded-md w-full"
              />
            ) : (
              <div className="">{doctor.phone}</div>
            )}
          </p>
          <p className="flex items-center">
            <span className="font-semibold">Email:</span>{" "}
            {editMode ? (
              <input
                type="email"
                value={editDoctor.email}
                onChange={(e) =>
                  setEditDoctor({
                    ...editDoctor,
                    email: e.target.value,
                  })
                }
                className="border p-2 rounded-md w-full"
              />
            ) : (
              <div className="">{doctor.email}</div>
            )}
          </p>

          <p className="flex items-center">
            <span className="font-semibold">Status:</span>{" "}
            {editMode ? (
              <select
                value={editDoctor.is_active ? "true" : "false"}
                onChange={(e) =>
                  setEditDoctor({
                    ...editDoctor,
                    is_active: e.target.value === "true", // 🔥 Convert string back to boolean
                  })
                }
                className="border p-2 rounded-md w-full"
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            ) : (
              <div className="">{doctor.is_active ? "Active" : "Inactive"}</div>
            )}
            {/* {doctor.is_active ? "Active" : "Inactive"} */}
          </p>
        </div>
      </div>

      <div className="flex   justify-start items-center gap-1">
        {editMode ? (
          <button
            className="  btn-primary1 p-1 text-white"
            onClick={() => handleEditDoctor(doctor)}
          >
            save
          </button>
        ) : (
          <button
            className="  btn-primary1 p-1"
            onClick={() => setEditMode(true)}
          >
            <MdModeEdit style={{ width: "20px", color: "white" }} />
          </button>
        )}

        <button
          className="  btn-primary1 p-1"
          onClick={() => handleDeleteClick(doctor)}
        >
          <FaTrashAlt style={{ width: "20px", color: "white" }} />
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;
