'use client'
import React from 'react'
// import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
// import Tab from 'react-bootstrap/Tab';
// import Tabs from 'react-bootstrap/Tabs';
import Dropdown from 'react-bootstrap/Dropdown';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { IoIosArrowDown } from "react-icons/io";


const patientInfo = [{
  id: "1",
  title: "New Patient",
  services: [
    { service1: "veneer" },
    { service1: "filling" }
  ],
},
{
  id: "2",
  title: "Existing Patient",
  services: [
    { service1: "veneer" },
    { service1: "filling" }
  ],


}]


function index() {
  return (
    <div className='mt-36 '>
      <h1 className='text-bold text-center'>Book an Appointment</h1>
      <div className='flex items-center justify-center flex-col md:flex-row '>
        <div>
          <TabGroup>
            <TabList className="mb-3 rounded-full border border-black w-fit">
              {patientInfo?.map((patient) => {
                return (
                  <Tab
                    key={patient.id}
                    className="rounded-full py-1 px-3 text-sm/6 font-semibold text-black focus:outline-none data-[selected]:bg-primary-color   data-[selected]:data-[hover]:bg-primary-color data-[focus]:outline-1 data-[focus]:outline-primary-color"
                  >
                    {patient.title}
                  </Tab>
                )
              })}

            </TabList>
            <TabPanels>
              {patientInfo?.map((patient) => {
                return (
                  <TabPanel >
                    <div className='flex flex-col gap-2'>
                      <Menu >
                        <MenuButton className="rounded-full border border-black p-2 flex items-center justify-between" >Please Select a Service  <IoIosArrowDown /></MenuButton>
                        <MenuItems transition
                          anchor="bottom end"
                          className="w-64 origin-top-right rounded-xl border border-black bg-white p-1 text-sm/6 text-black transition duration-100 ease-in-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0">
                          {patient.services?.map((service) => {
                            return (
                              <MenuItem>
                                <p className="block data-[focus]:bg-blue-100 k" >
                                  {service.service1}
                                </p>
                              </MenuItem>

                            )

                          })}


                        </MenuItems>
                      </Menu>
                      <input type='date' className='rounded-full' />
                      <input type='time' className='rounded-full' />






                    </div>
                  </TabPanel>

                )
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

        <div></div>
      </div>



    </div >

  )
}

export default index
