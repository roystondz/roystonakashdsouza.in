import React from 'react'

import { motion } from 'framer-motion'
const Footer = () => {
  return (
    <div className='w-full min-h-screen bg-black '>
      
      <motion.h1
      className='text-4xl sm:text-5xl md:text-6xl font-bold text-white flex justify-center items-center h-full p-10 w-full text-center'
      initial={{y:50,opacity:0}}
      whileInView={{y:0,opacity:1}}
      transition={{duration:0.5,delay:0.3}}
      >Lets Work Together</motion.h1>
      <motion.div
        className='flex sm:flex-col lg:flex-row'
      >
        
      </motion.div>
    </div>
  )
}

export default Footer