import React from 'react'

const About = () => {
  return (
    <div id='about' className='w-full h-screen bg-black relative overflow-hidden'>
      <div className='absolute inset-0 '>
        <div className='absolute -top-32 -left-32 w-[70vw] sm:w-[z-500vw] md:w-[40vw] h-[70vw] sm:h-[z-500vw] md:h-[40vw]  max-w-[500px] max-h-[500px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-30 sm:opacity-20 md:opacity-10 blur-[100px] sm:blur-[130px] md:blur-[150px] animate-pulse' >

        </div>
        <div className='absolute -bottom-32 -right-32 w-[70vw] sm:w-[z-500vw] md:w-[40vw] h-[70vw] sm:h-[z-500vw] md:h-[40vw]  max-w-[500px] max-h-[500px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-30 sm:opacity-20 md:opacity-10 blur-[100px] sm:blur-[130px] md:blur-[150px] animate-pulse' >

        </div>
      </div>
    </div>
  )
}

export default About