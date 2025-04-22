import { motion } from "framer-motion";
import experienceData from "../constants/experience.json";

const Experience = () => {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12
            }
        }
    };

    const cardVariants = {
        hover: {
            scale: 1.02,
            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.12)",
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10
            }
        }
    };

    return (
        <section id="experience" className="py-24 px-6 md:px-12 lg:px-24 bg-white dark:bg-gray-900">
            <motion.div
                className="max-w-6xl mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6 }}
            >
                <motion.h2
                    className="text-4xl md:text-5xl font-bold mb-16"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    Work Experience
                </motion.h2>

                <motion.p
                    className="text-xl text-gray-600 dark:text-gray-300 mb-16 max-w-3xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    I've worked with various organizations ranging from startups to established companies, focusing on scalable software architecture and innovative solutions.
                </motion.p>

                <motion.div
                    className="relative"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {/* Timeline line */}
                    <motion.div
                        className="absolute left-0 md:left-1/2 h-full w-1 bg-blue-200 dark:bg-blue-800 -translate-x-1/2 hidden md:block"
                        initial={{ height: 0 }}
                        whileInView={{ height: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2 }}
                    ></motion.div>

                    {experienceData.map((exp, index) => (
                        <motion.div
                            key={index}
                            className={`flex flex-col md:flex-row gap-8 mb-16 relative ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                }`}
                            variants={itemVariants}
                        >
                            {/* Timeline dot */}
                            <motion.div
                                className="absolute left-0 md:left-1/2 top-0 w-5 h-5 bg-blue-500 rounded-full -translate-x-1/2 z-10 hidden md:block"
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ type: "spring", stiffness: 300, damping: 10, delay: index * 0.1 }}
                            ></motion.div>

                            {/* Date */}
                            <motion.div
                                className={`w-full md:w-1/2 text-right ${index % 2 === 0 ? "md:text-left md:pl-8" : "md:pr-8"}`}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                            >
                                <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                                    {exp.period}
                                </span>
                                {exp.duration && (
                                    <span className="block mt-2 text-gray-500 dark:text-gray-400 text-sm">
                                        {exp.duration}
                                    </span>
                                )}
                            </motion.div>

                            {/* Content */}
                            <motion.div
                                className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}
                                variants={cardVariants}
                                whileHover="hover"
                            >
                                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                                    <h3 className="text-2xl font-bold mb-2">{exp.title}</h3>
                                    <div className="flex items-center mb-2">
                                        <h4 className="text-lg text-blue-600 dark:text-blue-400 font-medium">{exp.company}</h4>
                                        {exp.type && (
                                            <span className="ml-2 px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full">
                                                {exp.type}
                                            </span>
                                        )}
                                    </div>
                                    {exp.location && (
                                        <p className="text-gray-600 dark:text-gray-300 mb-2">
                                            {exp.location}
                                            {exp.working_mode && ` • ${exp.working_mode}`}
                                        </p>
                                    )}
                                    {exp.skills && exp.skills.length > 0 && (
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {exp.skills.map((skill, i) => (
                                                <motion.span
                                                    key={i}
                                                    className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    whileInView={{ opacity: 1, scale: 1 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: 0.4 + (i * 0.05) }}
                                                    whileHover={{ scale: 1.1, backgroundColor: "#E5E7EB" }}
                                                >
                                                    {skill}
                                                </motion.span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Experience; 