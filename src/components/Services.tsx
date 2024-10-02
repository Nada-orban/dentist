import React from 'react'
import Card from 'react-bootstrap/Card';
const servicesinfo = [
  { id: 1, image: "/images/services/dental-crown.jpg", title: "crowns" },
  // { id: 2, image: "/images/services/JFD_invisalign-stock.jpg", title: "invisalign" },
  { id: 3, image: "/images/services/dental-implants-service-box-jackson-family-dental.jpg", title: "implants" },
  { id: 4, image: "/images/services/IMG_2128.jpg", title: "laser fillings" },
  { id: 5, image: "/images/services/veneer_1 (1).jpg", title: "veneers" },
  { id: 6, image: "/images/services/full-mouth-rehab-before-and-after-jackson-family-dental.jpeg", title: "full mouth rehab" },
  { id: 7, image: "/images/services/pexels-karolina-grabowska-6627706.jpg", title: "root canals" },



]

function Services() {
  return (
    <div className='my-5'>
      <h1 className='container mx-auto'>our <span className='text-primary-color'>services</span></h1>
      <div className='grid grid-cols-1 md:grid-cols-3 bg-black'>
        {servicesinfo?.map((service) => {
          return (
            <>
              <div className="bg-dark text-white overflow-hidden relative group cursor-pointer " id={`${service.id}`}>
                <div className=" h-64 overflow-hidden ">
                  <img src={`${service.image}`} alt="Card image" className='h-full w-full  object-cover  border border-white transform transition-transform duration-1000  group-hover:scale-125  ' />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-50  "></div>
                <div className='absolute bottom-0 left-[5%] text-bold text-3xl'>
                  <p>{service.title}</p>
                </div>


              </div>
            </>

          )
        })}




      </div>

    </div>
  )
}

export default Services
