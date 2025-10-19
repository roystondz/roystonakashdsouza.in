import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import ParticlesBackground from "./components/ParticlesBackground";
import ScrollProgress from "./components/ScrollProgress";
import About from "./sections/About";
import Contact from "./sections/Contact";
import Experience from "./sections/Experience";
import Footer from "./sections/Footer";
import Home from "./sections/Home";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Testimonials from "./sections/Testimonials";

export default function App() {
  return (
    <div className="relative gradient text-white scroll-smooth scrollbar-hide scroll-behavior-auto">  
    {/* <CustomCursor/> */}
    <ScrollProgress/>
      <Navbar/>
      <Home/>
      <About/>
      <Skills/>
      <Projects/>
      <Experience/>
      {/* <Testimonials/> */}
      <Contact/>
      <Footer/>
    </div>
  );
}