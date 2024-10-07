import React from 'react'

function Feedback() {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-start mb-8">What Our<span className='text-primary-color'> Patients</span>  Say:</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="relative pb-56 overflow-hidden rounded-lg">
              <video
                className="absolute inset-0 w-full h-full object-cover"
                controls
              // poster="../../public/videos/346106057_1277919939489108_402350355798767432_n.jpg"
              >
                <source src="https://video.xx.fbcdn.net/v/t42.1790-2/345926857_111083635306534_5529420903827255617_n.mp4?_nc_cat=107&ccb=1-7&_nc_sid=55d0d3&efg=eyJybHIiOjM0MCwicmxhIjo1MTIsInZlbmNvZGVfdGFnIjoic3ZlX3NkIiwidmlkZW9faWQiOjY0MTMwNDY2NjIwODY2OTJ9&_nc_e2o=6413046662086692&_nc_ohc=GXdEUAIlKFcQ7kNvgHPFA4a&rl=340&vabr=189&_nc_ht=video-iad3-1.xx&_nc_gid=AbviaJGbucqPLQMF72mtZVn&oh=00_AYBDZcZcPbdf0qi1tW5RQ-u9aL99_AI5yEuWPD5APjBMWg&oe=670A45B2" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {/* <iframe className='absolute inset-0 w-full h-full object-cover ' src="https://video.xx.fbcdn.net/v/t42.1790-2/345926857_111083635306534_5529420903827255617_n.mp4?_nc_cat=107&ccb=1-7&_nc_sid=55d0d3&efg=eyJybHIiOjM0MCwicmxhIjo1MTIsInZlbmNvZGVfdGFnIjoic3ZlX3NkIiwidmlkZW9faWQiOjY0MTMwNDY2NjIwODY2OTJ9&_nc_e2o=6413046662086692&_nc_ohc=GXdEUAIlKFcQ7kNvgHPFA4a&rl=340&vabr=189&_nc_ht=video-iad3-1.xx&_nc_gid=AbviaJGbucqPLQMF72mtZVn&oh=00_AYBDZcZcPbdf0qi1tW5RQ-u9aL99_AI5yEuWPD5APjBMWg&oe=670A45B2" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}

              {/* <video src="https://video.xx.fbcdn.net/v/t42.1790-2/345926857_111083635306534_5529420903827255617_n.mp4?_nc_cat=107&ccb=1-7&_nc_sid=55d0d3&efg=eyJybHIiOjM0MCwicmxhIjo1MTIsInZlbmNvZGVfdGFnIjoic3ZlX3NkIiwidmlkZW9faWQiOjY0MTMwNDY2NjIwODY2OTJ9&_nc_e2o=6413046662086692&_nc_ohc=GXdEUAIlKFcQ7kNvgHPFA4a&rl=340&vabr=189&_nc_ht=video-iad3-1.xx&_nc_gid=AbviaJGbucqPLQMF72mtZVn&oh=00_AYBDZcZcPbdf0qi1tW5RQ-u9aL99_AI5yEuWPD5APjBMWg&oe=670A45B2" className='absolute inset-0 w-full h-full object-cover ' /> */}
              {/* <img src="video-thumbnail.jpg" alt="Patient Review" className="absolute inset-0 w-full h-full object-cover" />
              <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-3xl">▶</button> */}
            </div>
            <div className="mt-4">
              <p className="text-lg font-medium">"Amazing dental care!"</p>
              <span className="block text-sm text-gray-500">- John Doe, July 2024</span>
            </div>
          </div>
        </div>
        <div className="text-center mt-12">
          <button className="bg-primary-color text-white py-3 px-6 rounded-lg hover:bg-dark-primary-color">Book an Appointment</button>

        </div>
      </div>
    </section>
  )
}

export default Feedback
