import React, { useEffect, useMemo, useState } from 'react'
import ParticlesBackground from '../components/ParticlesBackground'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6'
import avatar from '../assets/avator.png'

const Home = () => {

  const roles=useMemo(()=>['Web Developer','Blockchain Developer','Software Engineer'],[])
  const [index,setIndex]=useState(0);
  const [subIndex,setSubindex]=useState(0);
  const [deleting,setDeleting]=useState(false);
  const socials=[
    {Icon:FaXTwitter,label:'X',link:'https://x.com/royston_akash'},
    {Icon:FaLinkedinIn,label:'LinkedIn',link:'https://www.linkedin.com/in/royston-akash-dsouza-8b4b621b3/'},
    {Icon:FaGithub,label:'GitHub',link:''}
  ]

  useEffect(()=>{
    const current = roles[index];
    const timeout = setTimeout(()=>{
      if(!deleting && subIndex<current.length){
        setSubindex(v=>v+1);

      }
      else if(!deleting && subIndex===current.length){
        setTimeout(()=>{setDeleting(true)},1000);
      }
      else if (deleting && subIndex>0){
        setSubindex(v=>v-1);
      }
      else if (deleting && subIndex ===0){
        setDeleting(false);
        setIndex(v=>(v+1)%roles.length);
      }
    },deleting?40:60)
    return (()=>{
      clearTimeout(timeout);
    })

  },[subIndex,index,deleting,roles])

 

  return (
    <section id='home' className='w-full h-screen relative bg-black overflow-hidden'>
      <ParticlesBackground />
      <div className='absolute inset-0 '>
        <div className='absolute -top-32 -left-32 w-[70vw] sm:w-[z-500vw] md:w-[40vw] h-[70vw] sm:h-[z-500vw] md:h-[40vw]  max-w-[500px] max-h-[500px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-30 sm:opacity-20 md:opacity-10 blur-[100px] sm:blur-[130px] md:blur-[150px] animate-pulse' >

        </div>
        <div className='absolute -bottom-32 -right-32 w-[70vw] sm:w-[z-500vw] md:w-[40vw] h-[70vw] sm:h-[z-500vw] md:h-[40vw]  max-w-[500px] max-h-[500px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-30 sm:opacity-20 md:opacity-10 blur-[100px] sm:blur-[130px] md:blur-[150px] animate-pulse' >

        </div>
      </div>
      <div className='relative z-10 h-full w-full max-w-7xl px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mx-auto'>
        <div className='flex flex-col justify-center h-full text-center lg:text-left relative'>
          <div className='w-full lg:pr-24 mx-auto max-w-[48rem] lg:ml-20'>
            <motion.div className='mb-3 text-xl sm:text-2xl md:text-3xl font-semibold lg:text-4xl text-white tracking-wide min-h-[1.6em]'
              initial={{opacity:0,y:12}}
              animate={{opacity:1,y:0}}
              transition={{duration:0.6}}
            >
              <span>{roles[index].substring(0,subIndex)}</span>
              <span className='inline-block w-[2px] ml-1 bg-white animate-pulse align-middle' style={{height:'1em'}}></span>
            </motion.div>
            <motion.h1
            className='text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text leading-tight bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63]'
            initial={{opacity:0,y:50}}
            animate={{opacity:1,y:0}}
            transition={{duration:1,delay:0.4}}
            >Hello, I'm<br/><span className='text-white font-bold text-5xl sm:text-6xl md:text-7xl '>Royston Akash Dsouza</span></motion.h1>
            <motion.p className='mt-6 text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0'
            initial={{opacity:0,y:50}}
            animate={{opacity:1,y:0}}
            transition={{duration:1,delay:0.8}}
            >I’m a Software Developer crafting scalable, human-centered solutions.
            Clean design. Solid code. Real impact.</motion.p>
            <motion.div className='mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6'
            initial={{opacity:0,y:50}}
            animate={{opacity:1,y:0}}
            transition={{duration:1,delay:1.2}}
            >
              <a href='#projects' className='px-6 py-3 rounded-full font-medium text-lg text-white bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] shadow-lg hover:scale-105 transition-all'>View My Work</a>
              <a href='' download className='px-6 py-3 rounded-full font-medium text-lg text-black bg-white shadow-lg hover:bg-gray-300 hover:scale-105 transition-all'>My Resume</a>
            </motion.div>
            <motion.div className='mt-10 flex gap-5 text-2xl md:text-3xl justify-center lg:justify-start'>
              {socials.map(({Icon,label,link})=>(
                <motion.a href={link} key={label} aria-label={label} target='_blank' rel='noopener noreferrer'
                className='text-gray-300 hover:text-white transition-colors'
                whileHover={{scale:1.2}}
                whileTap={{scale:0.9}}
                >
                  {<Icon />}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
        <motion.img
  src={avatar}
  alt="Avatar"
  className="
    hidden lg:block 
    mx-auto lg:ml-auto my-auto 
    scale-120
    
  "
  style={{ maxHeight: '80vh', maxWidth: '100%' }}
  initial={{ opacity: 0, scale: 0.6, y: 50 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  transition={{ duration: 1, delay: 1.6 }}
/>



        
      </div>

    </section>
  )
}

export default Home