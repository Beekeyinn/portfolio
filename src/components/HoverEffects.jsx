import { motion } from "framer-motion";

// Hover scale effect
export const ScaleOnHover = ({
    children,
    scale = 1.05,
    duration = 0.2,
    className = "",
    ...props
}) => {
    return (
        <motion.div
            className={className}
            whileHover={{ scale }}
            transition={{ duration }}
            {...props}
        >
            {children}
        </motion.div>
    );
};

// Hover glow effect
export const GlowOnHover = ({
    children,
    glowColor = "rgba(52, 152, 219, 0.6)",
    glowSize = "15px",
    duration = 0.3,
    className = "",
    ...props
}) => {
    return (
        <motion.div
            className={`relative ${className}`}
            whileHover={{
                boxShadow: `0 0 ${glowSize} ${glowColor}`
            }}
            transition={{ duration }}
            {...props}
        >
            {children}
        </motion.div>
    );
};

// Hover lift effect with shadow
export const LiftOnHover = ({
    children,
    lift = "-5px",
    shadowColor = "rgba(0, 0, 0, 0.2)",
    shadowSpread = "10px",
    duration = 0.3,
    className = "",
    ...props
}) => {
    return (
        <motion.div
            className={className}
            whileHover={{
                y: lift,
                boxShadow: `0 ${shadowSpread} ${shadowSpread} ${shadowColor}`
            }}
            transition={{ duration }}
            {...props}
        >
            {children}
        </motion.div>
    );
};

// Hover image zoom
export const ZoomImageOnHover = ({
    src,
    alt = "",
    scale = 1.1,
    duration = 0.5,
    className = "",
    imgClassName = "",
    ...props
}) => {
    return (
        <motion.div
            className={`overflow-hidden ${className}`}
            {...props}
        >
            <motion.img
                src={src}
                alt={alt}
                className={`w-full h-full object-cover ${imgClassName}`}
                whileHover={{ scale }}
                transition={{ duration }}
            />
        </motion.div>
    );
};

// Hover text highlight
export const HighlightTextOnHover = ({
    children,
    initialColor = "#000",
    hoverColor = "#3498db",
    underlayColor = "rgba(52, 152, 219, 0.2)",
    duration = 0.3,
    className = "",
    ...props
}) => {
    return (
        <motion.span
            className={`relative inline-block ${className}`}
            initial={{ color: initialColor }}
            whileHover={{ color: hoverColor }}
            transition={{ duration }}
            {...props}
        >
            <motion.span
                className="absolute bottom-0 left-0 w-full h-[30%] -z-10"
                initial={{ scaleX: 0, backgroundColor: underlayColor }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration }}
                style={{ originX: 0 }}
            />
            {children}
        </motion.span>
    );
};

// Reveal content on hover
export const RevealContentOnHover = ({
    children,
    hiddenContent,
    duration = 0.3,
    className = "",
    ...props
}) => {
    return (
        <motion.div
            className={`relative overflow-hidden ${className}`}
            initial="hidden"
            whileHover="visible"
            {...props}
        >
            <div>{children}</div>
            <motion.div
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70"
                variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 }
                }}
                transition={{ duration }}
            >
                {hiddenContent}
            </motion.div>
        </motion.div>
    );
};

// Hover border animation
export const BorderAnimOnHover = ({
    children,
    borderColor = "#3498db",
    borderWidth = "2px",
    duration = 0.3,
    className = "",
    ...props
}) => {
    return (
        <motion.div
            className={`relative ${className}`}
            {...props}
        >
            {children}

            {/* Top border */}
            <motion.div
                className="absolute top-0 left-0 h-0 w-0 bg-transparent"
                style={{ height: borderWidth }}
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration }}
            >
                <div className="h-full" style={{ backgroundColor: borderColor }}></div>
            </motion.div>

            {/* Right border */}
            <motion.div
                className="absolute top-0 right-0 h-0 w-0 bg-transparent"
                style={{ width: borderWidth }}
                initial={{ height: 0 }}
                whileHover={{ height: "100%" }}
                transition={{ duration, delay: duration * 0.25 }}
            >
                <div className="w-full h-full" style={{ backgroundColor: borderColor }}></div>
            </motion.div>

            {/* Bottom border */}
            <motion.div
                className="absolute bottom-0 right-0 h-0 w-0 bg-transparent"
                style={{ height: borderWidth }}
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration, delay: duration * 0.5 }}
            >
                <div className="w-full h-full" style={{ backgroundColor: borderColor }}></div>
            </motion.div>

            {/* Left border */}
            <motion.div
                className="absolute bottom-0 left-0 h-0 w-0 bg-transparent"
                style={{ width: borderWidth }}
                initial={{ height: 0 }}
                whileHover={{ height: "100%" }}
                transition={{ duration, delay: duration * 0.75 }}
            >
                <div className="w-full h-full" style={{ backgroundColor: borderColor }}></div>
            </motion.div>
        </motion.div>
    );
};