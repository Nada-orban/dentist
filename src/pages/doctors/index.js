import React from 'react'
import Doctors from '../../components/Doctors'

const doctors = [{
  id: 1, image: "/images/Doctors/doctor1.png", title: "Dr.Mostafa El-Masry", description: "Cosmetic and dental implant specialist"
}, { id: 2, image: "/images/Doctors/doctor2.png", title: "Dr.Ali Gibreel", description: "Cosmetic fillings specialist" },
{ id: 3, image: "/images/Doctors/doctor3.png", title: "Dr.Mohamed El-Maghrby", description: "Orthodontist and Pediatric dentistry" },
{ id: 4, image: "/images/Doctors/doctor4.png", title: "Dr.Abd Elrahman El-Abd ", description: "Endodontist" }]



function index() {
  return (
    <div className='mt-40'>
      <div className=' container mx-auto '>
        <h1 className='font-bold my-5'>Meet Our <span className='text-primary-color' >Doctors</span></h1>
        <div className="grid grid-cols-1  gap-4 mx-4 md:mx-auto " >
          {doctors?.map((doctor) => {
            return (

              <div className=' grid grid-cols-1 md:grid-cols-2' >
                <img src={`${doctor.image}`} alt='' className='rounded-md h-[333px] w-[300px] ' />
                <div className={`${doctor.id % 2 ? "" : "order-first"} mt-10`}>
                  <h3 className='font-bold'>{doctor.title}</h3>
                  <p className='text-gray-500'>{doctor.description}</p>
                </div>
              </div>

            )
          })}
        </div>
      </div>
    </div>
  )
}

export default index
