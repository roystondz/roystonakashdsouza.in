import React from 'react'
import {useScroll,motion} from 'framer-motion'

const ScrollProgress = () => {
    const {scrollYProgress} = useScroll();
  return (
    <motion.div
        className='fixed top-0 left-0 right-0 h-1 bg-teal-500 origin-left z-50'
        style={{scaleX:scrollYProgress}}>
    </motion.div>
  )
}

export default ScrollProgress