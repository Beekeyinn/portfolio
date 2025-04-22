import { motion } from "framer-motion";

const LoadingScreen = () => {
    const logoVariants = {
        initial: { scale: 0.8, opacity: 0 },
        animate: {
            scale: 1,
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    const pulseVariants = {
        initial: { opacity: 0.6, scale: 0.95 },
        animate: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.8,
                repeat: Infinity,
                repeatType: "reverse"
            }
        }
    };

    const loaderVariants = {
        initial: { width: 0 },
        animate: {
            width: "100%",
            transition: { duration: 1.2, ease: "easeInOut" }
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center z-50">
            <motion.div
                className="mb-8"
                variants={logoVariants}
                initial="initial"
                animate="animate"
            >
                <motion.div
                    className="w-24 h-24 rounded-full border-4 border-blue-600 flex items-center justify-center text-3xl font-bold text-blue-600"
                    variants={pulseVariants}
                    initial="initial"
                    animate="animate"
                >
                    BK
                </motion.div>
            </motion.div>

            <div className="w-64 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-blue-600"
                    variants={loaderVariants}
                    initial="initial"
                    animate="animate"
                />
            </div>

            <motion.p
                className="mt-4 text-gray-600 dark:text-gray-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                Loading amazing things...
            </motion.p>
        </div>
    );
};

export default LoadingScreen; 