"use client";
import Image from "next/image";
import { Inter } from "next/font/google";
import Nav1 from "../components/Nav1";
import Carousel from "react-bootstrap/Carousel";
import { SetStateAction, useState } from "react";
import BigVideo from "../components/BigVideo";
import Services from "@/components/Services";
import Landing from "../components/Landing";
import Doctors from "@/components/Doctors";
import Feedback from "@/components/Feedback";

const inter = Inter({ subsets: ["latin"] });
const images = [
  {
    id: 1,
    image: "/images/339029496_555654533324483_2280488122461761110_n.jpg",
  },
  {
    id: 2,
    image: "/images/343449107_537026245173982_3062507908384429181_n.jpg",
  },
  {
    id: 3,
    image: "/images/343554417_793300798658626_580949358500694920_n.jpg",
  },
];

export default function Home() {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  return (
    <>
      <Landing />
      {/* <div className='container mx-auto relative mt-5'>

        <Carousel
          data-bs-theme="dark"
          activeIndex={index}
          onSelect={handleSelect}
          className="custom-carousel relative"
        // prevIcon={<FaArrowLeft style={{ color: '#8DD9FF', fontSize: '2rem' }} />}
        // nextIcon={<FaArrowRight style={{ color: '#8DD9FF', fontSize: '2rem' }} />} 
        >
          {images?.map((slide) => {
            return (
              <Carousel.Item className="">
                <img src={`${slide.image}`} alt="" className=" w-1/2  mx-auto h-[500px] " />

                <Carousel.Caption className="absolute top-10 right-10 p-2 text-black ">
                  <div className="bg-[#8DD9FF] w-1/2 bg-opacity-20" >{ }</div>

                </Carousel.Caption>
              </Carousel.Item>




            )
          })}

        </Carousel>




      </div> */}
      <Doctors />
      <Services />
      <Feedback />
    </>
  );
}
