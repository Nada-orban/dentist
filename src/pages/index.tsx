import Image from 'next/image'
import { Inter } from 'next/font/google'
import Nav1 from '../components/Nav1'
import Carousel from 'react-bootstrap/Carousel';
import { SetStateAction, useState } from 'react';


const inter = Inter({ subsets: ['latin'] })
const images = [{ id: 1, image: "/images/339029496_555654533324483_2280488122461761110_n.jpg" },
{ id: 2, image: "/images/343449107_537026245173982_3062507908384429181_n.jpg" },
{ id: 3, image: "/images/343554417_793300798658626_580949358500694920_n.jpg" }]

export default function Home() {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex: any) => {
    setIndex(selectedIndex);
  };
  return (
    <div className='container mx-auto'>
      <Carousel
        data-bs-theme="dark"
        activeIndex={index}
        onSelect={handleSelect}
        className="custom-carousel"
      // prevIcon={<FaArrowLeft style={{ color: '#8DD9FF', fontSize: '2rem' }} />}
      // nextIcon={<FaArrowRight style={{ color: '#8DD9FF', fontSize: '2rem' }} />} 
      >
        {images?.map((slide) => {
          return (
            <Carousel.Item className="">
              <img src={`${slide.image}`} alt="" className=" w-1/2  mx-auto h-[500px] " />
              {/* <ExampleCarouselImage text="First slide" /> */}
              <Carousel.Caption className="absolute top-10 right-10 p-2 text-black ">
                <div className="bg-[#8DD9FF] w-1/2 bg-opacity-20" >{ }</div>
                {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
              </Carousel.Caption>
            </Carousel.Item>




          )
        })}

      </Carousel>


      {/* <div id="default-carousel" className="relative w-full  " data-carousel="slide">

        <div className="relative h-56 overflow-hidden rounded-lg md:h-[70vh]">

          <div className=" duration-700 ease-in-out" data-carousel-item id="carousel-item-2">
            <img src="/images/339029496_555654533324483_2280488122461761110_n.jpg" className="absolute block w-[70vh] h-[70vh] -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
          </div>

          <div className=" duration-700 ease-in-out" data-carousel-item>
            <img src="/images/343449107_537026245173982_3062507908384429181_n.jpg" className="absolute block w-[70vh] h-[70vh] -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
          </div>

          <div className=" duration-700 ease-in-out" data-carousel-item>
            <img src="/images/343554417_793300798658626_580949358500694920_n.jpg" className="absolute block w-[70vh] h-[70vh] -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
          </div>

        </div>

        <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
          <button type="button" className="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
          <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
          <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
          <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
          <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 5" data-carousel-slide-to="4"></button>
        </div>

        <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-10 cursor-pointer group focus:outline-none" data-carousel-prev>
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/30 dark:bg-gray-800/30 group-hover:bg-black/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg className="w-4 h-4 text-black dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>
        <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-10 cursor-pointer group focus:outline-none" data-carousel-next>
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/30 dark:bg-gray-800/30 group-hover:bg-black/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-black dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg className="w-4 h-4 text-black dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>
 */}

    </div>

  )
}
