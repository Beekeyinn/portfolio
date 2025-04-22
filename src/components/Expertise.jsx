import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import expertiseData from "../constants/expertise.json";

const Expertise = () => {
    const [data, setData] = useState(expertiseData);
    const [activeFilter, setActiveFilter] = useState("All");
    const [filteredAreas, setFilteredAreas] = useState(expertiseData.areas);
    
    // Extract unique categories for filter buttons
    const categories = ["All", ...new Set(expertiseData.areas.map(area => area.category))];
    
    // Filter areas when activeFilter changes
    useEffect(() => {
        if (activeFilter === "All") {
            setFilteredAreas(expertiseData.areas);
        } else {
            setFilteredAreas(expertiseData.areas.filter(area => area.category === activeFilter));
        }
    }, [activeFilter]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const cardVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12
            }
        },
        hover: {
            y: -10,
            boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10
            }
        }
    };

    const quoteVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delay: 0.5,
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    const filterVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <section id="expertise" className="py-24 px-6 md:px-12 lg:px-24">
            <motion.div
                className="max-w-6xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
            >
                <motion.h2
                    className="text-4xl md:text-5xl font-bold mb-8"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    {data.title}
                </motion.h2>
                
                <motion.p 
                    className="text-lg text-gray-600 dark:text-gray-300 mb-10 max-w-3xl"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {data.description}
                </motion.p>

                <motion.div 
                    className="flex flex-wrap gap-3 mb-12"
                    variants={filterVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {categories.map((category, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveFilter(category)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                                activeFilter === category 
                                    ? "bg-blue-600 text-white" 
                                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-10"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {filteredAreas.map((area) => (
                        <motion.div
                            key={area.id}
                            className="p-8 rounded-lg bg-gray-50 dark:bg-gray-800 hover:shadow-lg transition-shadow duration-300"
                            variants={cardVariants}
                            whileHover="hover"
                        >
                            <h3 className="text-2xl font-bold mb-4">
                                <span className="text-sm text-blue-600 dark:text-blue-400 block mb-1">{area.category}</span>
                                {area.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                {area.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    className="mt-16 p-8 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg"
                    variants={quoteVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.6 }}
                >
                    <blockquote className="text-xl md:text-2xl font-medium text-center italic text-gray-700 dark:text-gray-300">
                        "{data.quote.text}"
                        <footer className="mt-4 text-sm text-gray-500 dark:text-gray-400">- {data.quote.author}</footer>
                    </blockquote>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Expertise;