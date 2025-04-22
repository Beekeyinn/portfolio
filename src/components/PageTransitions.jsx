import { motion } from "framer-motion";

// Fade transition for pages
export const FadeTransition = ({ children, duration = 0.5, ...props }) => {
    const variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            transition={{ duration }}
            {...props}
        >
            {children}
        </motion.div>
    );
};

// Slide transition for pages
export const SlideTransition = ({
    children,
    direction = "left",
    distance = 50,
    duration = 0.5,
    ...props
}) => {
    const getX = () => {
        switch (direction) {
            case "left": return -distance;
            case "right": return distance;
            default: return 0;
        }
    };

    const getY = () => {
        switch (direction) {
            case "up": return -distance;
            case "down": return distance;
            default: return 0;
        }
    };

    const variants = {
        hidden: {
            x: getX(),
            y: getY(),
            opacity: 0
        },
        visible: {
            x: 0,
            y: 0,
            opacity: 1
        },
        exit: {
            x: getX() * -1,
            y: getY() * -1,
            opacity: 0
        }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            transition={{
                duration,
                type: "tween",
                ease: "easeInOut"
            }}
            {...props}
        >
            {children}
        </motion.div>
    );
};

// Scale transition for pages
export const ScaleTransition = ({
    children,
    initialScale = 0.9,
    duration = 0.5,
    ...props
}) => {
    const variants = {
        hidden: {
            scale: initialScale,
            opacity: 0
        },
        visible: {
            scale: 1,
            opacity: 1
        },
        exit: {
            scale: initialScale,
            opacity: 0
        }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            transition={{
                duration,
                type: "spring",
                stiffness: 300,
                damping: 30
            }}
            {...props}
        >
            {children}
        </motion.div>
    );
};

// Flip transition for pages
export const FlipTransition = ({
    children,
    direction = "x",
    duration = 0.8,
    ...props
}) => {
    const variants = {
        hidden: {
            opacity: 0,
            rotateX: direction === "x" ? 90 : 0,
            rotateY: direction === "y" ? 90 : 0
        },
        visible: {
            opacity: 1,
            rotateX: 0,
            rotateY: 0
        },
        exit: {
            opacity: 0,
            rotateX: direction === "x" ? -90 : 0,
            rotateY: direction === "y" ? -90 : 0
        }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            transition={{
                duration,
                type: "spring",
                stiffness: 200,
                damping: 25
            }}
            style={{
                transformStyle: "preserve-3d",
                perspective: "1200px"
            }}
            {...props}
        >
            {children}
        </motion.div>
    );
};

// Swipe transition for pages (overlay effect)
export const SwipeTransition = ({
    children,
    direction = "left",
    duration = 0.8,
    color = "#000",
    ...props
}) => {
    const directionMap = {
        left: { x: ["-100%", "0%", "100%"] },
        right: { x: ["100%", "0%", "-100%"] },
        up: { y: ["-100%", "0%", "100%"] },
        down: { y: ["100%", "0%", "-100%"] }
    };

    const axis = direction === "left" || direction === "right" ? "x" : "y";

    return (
        <div style={{ position: "relative", overflow: "hidden" }} {...props}>
            <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 }
                }}
                transition={{ duration }}
            >
                {children}
            </motion.div>

            <motion.div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: color,
                    zIndex: 10
                }}
                initial={{ [axis]: directionMap[direction][axis][0] }}
                animate={{
                    [axis]: directionMap[direction][axis],
                    transition: {
                        duration,
                        times: [0, 0.5, 1]
                    }
                }}
            />
        </div>
    );
}; 