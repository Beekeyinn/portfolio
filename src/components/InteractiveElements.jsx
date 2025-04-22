import { motion } from "framer-motion";

// Button with hover effect
export const AnimatedButton = ({
    children,
    className = "",
    onClick,
    whileHover = { scale: 1.05 },
    whileTap = { scale: 0.95 },
    ...props
}) => {
    return (
        <motion.button
            className={`px-6 py-2 rounded-md ${className}`}
            whileHover={whileHover}
            whileTap={whileTap}
            onClick={onClick}
            {...props}
        >
            {children}
        </motion.button>
    );
};

// Card with hover effect
export const AnimatedCard = ({
    children,
    className = "",
    hoverScale = 1.03,
    ...props
}) => {
    return (
        <motion.div
            className={`p-6 rounded-lg shadow-md ${className}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{
                scale: hoverScale,
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)"
            }}
            {...props}
        >
            {children}
        </motion.div>
    );
};

// Icon button with hover rotation or scale
export const IconButton = ({
    icon,
    className = "",
    rotateOnHover = false,
    onClick,
    ...props
}) => {
    return (
        <motion.button
            className={`p-3 rounded-full ${className}`}
            whileHover={rotateOnHover
                ? { rotate: 180, scale: 1.1 }
                : { scale: 1.1 }
            }
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={onClick}
            {...props}
        >
            {icon}
        </motion.button>
    );
};

// Tooltip component
export const Tooltip = ({
    children,
    text,
    position = "top",
    className = "",
    delay = 0.2
}) => {
    const positions = {
        top: { y: -10 },
        bottom: { y: 10 },
        left: { x: -10 },
        right: { x: 10 }
    };

    return (
        <div className="relative inline-block">
            <div>{children}</div>
            <motion.div
                className={`absolute p-2 bg-black text-white text-sm rounded whitespace-nowrap ${className}`}
                initial={{ opacity: 0, ...positions[position] }}
                whileHover={{ opacity: 1, y: 0, x: 0 }}
                transition={{ delay }}
                style={{
                    ...(position === "top" && { bottom: "100%", left: "50%", transform: "translateX(-50%)", marginBottom: "8px" }),
                    ...(position === "bottom" && { top: "100%", left: "50%", transform: "translateX(-50%)", marginTop: "8px" }),
                    ...(position === "left" && { right: "100%", top: "50%", transform: "translateY(-50%)", marginRight: "8px" }),
                    ...(position === "right" && { left: "100%", top: "50%", transform: "translateY(-50%)", marginLeft: "8px" })
                }}
            >
                {text}
            </motion.div>
        </div>
    );
}; 