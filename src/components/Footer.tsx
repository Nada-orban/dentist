import React from 'react';
import { IoHome } from "react-icons/io5";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      className="bg-main-color text-start text-neutral-100  lg:text-left mt-5 overflow-hidden ">

      {/* <!-- Main container div: holds the entire content of the footer, including four sections (TW Elements, Products, Useful links, and Contact), with responsive styling and appropriate padding/margins. --> */}
      <div className=" py-10 text-start  container mx-auto  ">
        <div className=" grid grid-cols-1  md:grid-cols-5  gap-4 md:gap-0">
          {/* <!-- TW Elements section --> */}
          {/* <div className=" ">
            <h6
              className="text-start mb-4 flex justify-center font-semibold uppercase  text-primary-color">
              

              SERVICES
            </h6>
            <ul className='text-start'>
              <li>General</li>
              <li>Cosmetic</li>
              <li>Surgical</li>
              <li></li>
            </ul>
          </div> */}
          {/* <!-- Products section --> */}
          <div className="">
            <h6
              className="mb-4 flex justify-start font-semibold uppercase  text-primary-color">
              SERVICES
            </h6>
            <p className="mb-4">
              <a className="text-white dark:text-neutral-200 no-underline"
              >General</a>
            </p>

            <p className="mb-4">
              <a className="text-white dark:text-neutral-200 no-underline"
              >Cosmetic</a>
            </p>
            <p className="mb-4">
              <a className="text-white dark:text-neutral-200 no-underline"
              >Surgical</a>
            </p>

          </div>
          <div className="">
            <h6
              className="mb-4 flex justify-start font-semibold uppercase  text-primary-color">
              PRACTICE
            </h6>
            <p className="mb-4">
              <a className="text-white dark:text-neutral-200 no-underline"
              >About Us</a>
            </p>
            <p className="mb-4">
              <a className="text-white dark:text-neutral-200 no-underline"
              >New Patients</a>
            </p>

          </div>



          <div className="">
            <div>
              <h6
                className="mb-4 flex justify-start font-semibold uppercase  text-primary-color">
                Hours
              </h6>
              <p className="mb-4">
                <a className="text-white dark:text-neutral-200 no-underline"
                >
                  <p className='font-bold mb-2'>Monday – Thursday</p>
                  <p className='text-gray-500'>8am – 5pm</p>
                  <p className='font-bold mb-2'>Friday</p>
                  <p className='text-gray-500'> By appointment</p>
                </a>
              </p>
            </div>
            <div>
              <h6
                className="mb-4 mt-2 flex justify-start font-semibold uppercase  text-primary-color">
                Social
              </h6>
              <div className='flex gap-2'>
                <p className="mb-4">
                  <a className="text-white dark:text-neutral-200 no-underline"
                  >
                    <FaFacebookF className='bg-primary-color p-2 w-10 h-10 text-white rounded-md' />
                  </a>
                </p>
                <p className="mb-4">
                  <a className="text-white dark:text-neutral-200 no-underline"
                  >
                    <FaInstagram className='bg-primary-color p-2 w-10 h-10 text-white rounded-md' />
                  </a>
                </p>
              </div>

            </div>


          </div>
          <div className='md:col-span-2 text-start'>
            <h6
              className="mb-4 flex justify-start font-semibold uppercase md:justify-start text-primary-color">
              OUR OFFICE
            </h6>
            <div className="mb-4 flex items-start justify-center md:justify-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mr-3 h-10 w-10 md:h-7 md:w-7">
                <path
                  d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                <path
                  d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
              </svg>
              {/* <IoHome className="mr-3 h-5 w-5" /> */}
              <p className='text-start'>21 Museum Street, in front of Al Mahrousa Tourism, second floor,Tanta,Egypt</p>

            </div>
            <p className="mb-4 flex items-center justify-start md:justify-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mr-3 h-5 w-5">
                <path
                  d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                <path
                  d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
              </svg>
              info@example.com
            </p>
            <p className="mb-4 flex items-center justify-start md:justify-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mr-3 h-5 w-5">
                <path
                  fillRule="evenodd"
                  d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                  clipRule="evenodd" />
              </svg>
              01032946286
            </p>

          </div>
        </div>
      </div>



      {/* <!--Copyright section--> */}
      <div className="bg-main-color p-6 text-start ">
        <span>Dental Website by : </span>
        <a
          className="font-semibold text-primary-color dark:text-neutral-400"
          href="https://nadasamir.vercel.app/"
        >Nada Orban</a>
      </div>
    </footer>
  );
}