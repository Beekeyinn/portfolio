import { AnimatePresence, motion } from "framer-motion";
import Hero from "../components/Hero";
import Expertise from "../components/Expertise";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
import Education from "../components/Education";
import Certifications from "../components/Certifications";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Hero />
        <Expertise />
        <Projects />
        <Experience />
        <Education />
        <Certifications />
        <Contact />
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
};

export default Home;
