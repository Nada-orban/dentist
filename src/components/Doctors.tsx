import React from 'react'
import doctor from '../../public/images/Doctors/file.png'
const doctors = [{
  id: 1, image: "/images/Doctors/doctor1.png", title: "Dr.Mostafa El-Masry", description: "Cosmetic and dental implant specialist"
}, { id: 2, image: "/images/Doctors/doctor2.png", title: "Dr.Ali Gibreel", description: "Cosmetic fillings specialist" },
{ id: 3, image: "/images/Doctors/doctor3.png", title: "Dr.Mohamed El-Maghrby", description: "Orthodontist and Pediatric dentistry" },
{ id: 4, image: "/images/Doctors/doctor4.png", title: "Dr.Abd Elrahman El-Abd ", description: "Endodontist" }]


function Doctors() {
  return (
    <div className='bg-white my-3 py-4'>
      <div className='container mx-auto'>
        <h1 className='font-bold my-5'>Meet Our <span className='text-primary-color' >Doctors</span></h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 " >
          {doctors?.map((doctor) => {
            return (

              <div >
                <img src={`${doctor.image}`} alt='' className='rounded-md h-[333px]' />
                <div className='mt-3'>
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

export default Doctors
