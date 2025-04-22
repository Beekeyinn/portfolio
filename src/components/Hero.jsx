import { motion } from "framer-motion";
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import { FiArrowRight } from "react-icons/fi";
import { heroData } from "../constants/hero";

const Hero = () => {
    const [text] = useTypewriter({
        words: heroData.roles,
        ...heroData.typewriterSettings
    });

    const fadeInUpVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6
            }
        }
    };

    const staggerContainerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const buttonVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        },
        hover: {
            scale: 1.05,
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
            transition: {
                duration: 0.2,
                ease: "easeInOut"
            }
        }
    };

    const decorationVariants = {
        hidden: { opacity: 0, scale: 0 },
        visible: {
            opacity: 0.7,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        },
        floating: {
            y: [0, -10, 0],
            x: [0, 5, 0],
            transition: {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
            }
        }
    };

    return (
        <section id="home" className="min-h-screen flex flex-col justify-center relative overflow-hidden bg-white dark:bg-gray-900 px-6 md:px-12 lg:px-24 py-16">
            {/* Decorative elements */}
            <motion.div
                className="absolute top-20 right-20 w-64 h-64 rounded-full bg-blue-100 dark:bg-blue-900/20 -z-10 blur-3xl"
                variants={decorationVariants}
                initial="hidden"
                animate={["visible", "floating"]}
            />
            <motion.div
                className="absolute bottom-20 left-10 w-40 h-40 rounded-full bg-indigo-100 dark:bg-indigo-900/20 -z-10 blur-3xl"
                variants={decorationVariants}
                initial="hidden"
                animate={["visible", "floating"]}
                custom={1}
            />

            <motion.div
                className="max-w-6xl mx-auto w-full"
                variants={staggerContainerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="flex flex-col md:flex-row items-center gap-10">
                    <div className="w-full md:w-1/2">
                        <motion.p
                            className="text-blue-600 dark:text-blue-400 font-medium mb-2"
                            variants={fadeInUpVariants}
                        >
                            {heroData.greeting}
                        </motion.p>

                        <motion.h1
                            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
                            variants={fadeInUpVariants}
                        >
                            {heroData.name}
                        </motion.h1>

                        <motion.div
                            className="text-2xl md:text-3xl font-medium text-gray-700 dark:text-gray-300 mb-6"
                            variants={fadeInUpVariants}
                        >
                            I'm a <span className="text-blue-600 dark:text-blue-400">{text}</span>
                            <Cursor cursorColor="#3B82F6" />
                        </motion.div>

                        <motion.p
                            className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-xl"
                            variants={fadeInUpVariants}
                        >
                            {heroData.description}
                        </motion.p>

                        <motion.div
                            className="flex flex-wrap gap-4"
                            variants={fadeInUpVariants}
                        >
                            {heroData.buttons.map((button, index) => (
                                <motion.a
                                    key={index}
                                    href={button.link}
                                    className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition ${button.primary
                                        ? "bg-blue-600 text-white hover:bg-blue-700 group"
                                        : "border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                        }`}
                                    variants={buttonVariants}
                                    whileHover="hover"
                                >
                                    {button.text}
                                    {button.primary && <FiArrowRight className="transition-transform group-hover:translate-x-1" />}
                                </motion.a>
                            ))}
                        </motion.div>
                    </div>

                    <motion.div
                        className="w-full md:w-1/2 relative"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                    >
                        <div className="relative w-full aspect-square max-w-md mx-auto">
                            <img
                                src={heroData.profileImage}
                                alt={heroData.name}
                                className="w-full h-full object-cover rounded-2xl shadow-xl"
                                style={{ aspectRatio: "1/1" }}
                            />

                            <motion.div
                                className="absolute -bottom-5 -right-5 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-lg"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.8 }}
                            >
                                <p className="font-medium">{heroData.experience}</p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

            </motion.div>
        </section>
    );
};

export default Hero; 