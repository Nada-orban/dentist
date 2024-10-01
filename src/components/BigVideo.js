import React from 'react'

function BigVideo() {
  return (
    <div>
      <h1 className='capitalize'>Take a Look Around Our Office
      </h1>
      <video
        className="w-full h-full object-cover object-right"
        controls
        poster={``}
      >
        <source src={``} type="video/mp4" />
        Your browser does not support the video tag.
      </video>


    </div>
  )
}

export default BigVideo
