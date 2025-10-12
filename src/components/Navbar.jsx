import React, { useEffect, useRef, useState } from 'react'
import OverlayMenu from './OverlayMenu'
import Logo from '../assets/Logo.png'
import { FiMenu } from 'react-icons/fi';
const Navbar = () => {

    const [menuOpen,setMenuOpen]=useState(false);
    const [visible,setVisible]=useState(true);
    const [forceVisible,setForceVisible]=useState(false);


    const lastScrollY=useRef(0);
    const timerId=useRef(null);

    useEffect(()=>{
        const homeSection=document.querySelector('#home');
        const observer=new IntersectionObserver(([entry])=>{
            if(entry.isIntersecting){
                setForceVisible(true);
                setVisible(true);
            }else{
                setForceVisible(false);

            }
        }   ,{threshold:0.1})
        if (homeSection) observer.observe(homeSection);

        return(()=>{
            if (homeSection) observer.unobserve(homeSection);
        })
    },[])

    useEffect(()=>{
        const handleScroll=()=>{
            if (forceVisible) {
                setVisible(true);
            return;
            }
        const currentScrollY=window.scrollY;
        if (currentScrollY>lastScrollY.current && currentScrollY>100){
            setVisible(false);
        }else{
            setVisible(true);
            if (timerId.current) clearTimeout(timerId.current);
            timerId.current=setTimeout(()=>{
                setVisible(false);
            },3000);
        }
        lastScrollY.current=currentScrollY;
        
}
        window.addEventListener('scroll',handleScroll);
        return()=>{
            window.removeEventListener('scroll',handleScroll,{passive:true});
            if (timerId.current) clearTimeout(timerId.current);
        }
},[forceVisible])

  return (
    <>
    <nav className={`fixed top-0 left-0 flex w-full px-6 py-4 items-center z-50 transition-transform duration-200 ${visible?"translate-y-0":"-translate-y-full"} justify-between`}>
<div className='flex items-center space-x-2'>
    <img src={Logo} className="w-8 h-8 "/>
    <div className='text-2xl font-bold text-white hidden sm:block hover:text-pink-500 transition-colors duration-300'><a href='#'>Royston Akash Dsouza</a></div>
</div>
<div className='block lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2'>
<button className='text-white text-3xl focus:outline-none' aria-label="openmenu" onClick={()=>setMenuOpen(true)} >
    <FiMenu/>
</button>
</div>
<div className='hidden lg:block '>
<a href='#contact' className='bg-gradient-to-r from-pink-500 to-blue-500 text-white px-5 py-2 rounded-full font-medium shadow-lg hover:opacity-90 transition-opacity duration-300'>
    Reach out
</a>
</div>
    </nav>
    <OverlayMenu isOpen={menuOpen} onClose={()=>setMenuOpen(false)}/>
    </>
  )
}

export default Navbar
