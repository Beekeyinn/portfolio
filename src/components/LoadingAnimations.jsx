import { motion } from "framer-motion";

// Spinner loading animation
export const Spinner = ({
    size = 40,
    color = "#3498db",
    thickness = 4,
    duration = 1.2,
    ...props
}) => {
    return (
        <motion.div
            style={{
                width: size,
                height: size,
                borderRadius: "50%",
                border: `${thickness}px solid rgba(0, 0, 0, 0.1)`,
                borderTopColor: color,
                display: "inline-block",
            }}
            animate={{ rotate: 360 }}
            transition={{
                duration,
                ease: "linear",
                repeat: Infinity,
            }}
            {...props}
        />
    );
};

// Dots loading animation
export const LoadingDots = ({
    size = 10,
    gap = 6,
    color = "#3498db",
    count = 3,
    duration = 0.5,
    ...props
}) => {
    return (
        <div
            style={{
                display: "flex",
                gap: gap,
                alignItems: "center",
                justifyContent: "center"
            }}
            {...props}
        >
            {[...Array(count)].map((_, i) => (
                <motion.div
                    key={i}
                    style={{
                        width: size,
                        height: size,
                        borderRadius: "50%",
                        backgroundColor: color,
                    }}
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [1, 0.5, 1],
                    }}
                    transition={{
                        duration,
                        ease: "easeInOut",
                        repeat: Infinity,
                        delay: i * 0.15,
                    }}
                />
            ))}
        </div>
    );
};

// Skeleton text loading animation
export const SkeletonText = ({
    width = "100%",
    height = 20,
    borderRadius = 4,
    count = 1,
    gap = 8,
    animated = true,
    ...props
}) => {
    const baseStyle = {
        width,
        height,
        borderRadius,
        backgroundColor: "#e0e0e0",
        display: "block",
        marginBottom: gap,
    };

    const animation = animated ? {
        animate: {
            opacity: [0.7, 0.9, 0.7]
        },
        transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
        }
    } : {};

    return (
        <div {...props}>
            {[...Array(count)].map((_, i) => (
                <motion.div
                    key={i}
                    style={{
                        ...baseStyle,
                        width: typeof width === "string" ? width : (
                            // For array widths, cycle through them, or use the last one
                            Array.isArray(width) ? width[i % width.length] : width
                        )
                    }}
                    {...animation}
                />
            ))}
        </div>
    );
};

// Skeleton card loading animation
export const SkeletonCard = ({
    width = 300,
    height = 200,
    borderRadius = 8,
    animated = true,
    ...props
}) => {
    const animation = animated ? {
        animate: {
            opacity: [0.7, 0.9, 0.7]
        },
        transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
        }
    } : {};

    return (
        <motion.div
            style={{
                width,
                height,
                borderRadius,
                backgroundColor: "#e0e0e0",
                overflow: "hidden",
            }}
            {...animation}
            {...props}
        >
            <div style={{ padding: 16 }}>
                <SkeletonText
                    width="60%"
                    height={24}
                    animated={false}
                />
                <SkeletonText
                    count={3}
                    height={16}
                    animated={false}
                />
            </div>
        </motion.div>
    );
};

// Progress bar loading
export const ProgressBar = ({
    width = "100%",
    height = 6,
    progress = 50,
    color = "#3498db",
    backgroundColor = "#e0e0e0",
    borderRadius = 3,
    animated = true,
    duration = 0.6,
    ...props
}) => {
    return (
        <div
            style={{
                width,
                height,
                backgroundColor,
                borderRadius,
                overflow: "hidden",
            }}
            {...props}
        >
            <motion.div
                style={{
                    height: "100%",
                    backgroundColor: color,
                    width: animated ? 0 : `${progress}%`,
                }}
                animate={{ width: `${progress}%` }}
                transition={{
                    duration,
                    ease: "easeInOut",
                }}
            />
        </div>
    );
}; 