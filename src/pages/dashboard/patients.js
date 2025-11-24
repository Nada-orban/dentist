// import React, { use, useEffect } from "react";
// import DashboardLayout from "../../components/DashboardLayout";
// import API_URL from "../../api/config";
// import axios from "axios";
// import { useRouter } from "next/router";
// import Link from "next/link";

// const domain = `${API_URL}`;
// const getPatientsUrl = `${domain}/api/reservation/appointments/`;
// const singlePatientUrl = `${domain}/api/reservation/appointments/`;
// const patientHistoryUrl = `${domain}/api/doctors/`;

// function patients() {
//   useEffect(() => {}, []);
//   return (
//     <DashboardLayout>
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-white shadow-md rounded-xl">
//         <h1 className="text-2xl font-bold text-gray-800">Patients List</h1>
//         <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
//           <div className="relative w-full md:w-64">
//             <input
//               type="text"
//               placeholder="Search Patients"
//               className="w-full border border-gray-300 rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary-color"
//             />
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 stroke-linecap="round"
//                 stroke-linejoin="round"
//                 stroke-width="2"
//                 d="M21 21l-4.35-4.35M16.65 10.5A6.15 6.15 0 1110.5 4.35a6.15 6.15 0 016.15 6.15z"
//               />
//             </svg>
//           </div>

//           <button className="bg-main-color  text-white text-sm font-medium px-4 py-2 rounded-full">
//             + Add Patients
//           </button>
//         </div>
//       </div>
//       <div className="grid grid-cols-1  lg:grid-cols-2  gap-4 my-2">
//         <div className="bg-white rounded-xl shadow-md p-4 w-full max-w-sm">
//           <div className="flex items-center justify-between mb-2">
//             <div>
//               <h2 className="text-lg font-semibold">Leslie Alexander</h2>
//               <p className="text-sm text-gray-500">
//                 willie.jennings@example.com
//               </p>
//             </div>
//             <div className="flex gap-2">
//               <button className="text-primary-color hover:underline text-sm flex flex-col">
//                 <div>📞 </div>
//                 <div>Phone</div>
//               </button>
//               {/* <button className="text-primary-color hover:underline text-sm">
//                 📊 Live Vital
//               </button> */}
//             </div>
//           </div>
//           <div className="text-sm text-gray-700 space-y-1">
//             <p>
//               <span className="font-medium">Gender, Age:</span> Male, 24y
//             </p>
//             <p>
//               <span className="font-medium">Physician:</span> Ronald
//             </p>
//             <p>
//               <span className="font-medium">Last Consultation:</span> May 12,
//               2019
//             </p>
//             <p>
//               <span className="font-medium">Appointments:</span> May 15 2020,
//               8:00 AM
//             </p>
//             <p>
//               <span className="font-medium">Status:</span>
//               <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs">
//                 Under Observation
//               </span>
//             </p>
//           </div>
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// }

// export default patients;
