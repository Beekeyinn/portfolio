import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

// Fade in component when it enters the viewport
export const FadeInView = ({
    children,
    className = "",
    delay = 0,
    duration = 0.5,
    threshold = 0.1,
    ...props
}) => {
    const controls = useAnimation();
    const ref = useRef(null);
    const inView = useInView(ref, { threshold });

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration, delay }
                }
            }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
};

// Slide in component from a direction
export const SlideInView = ({
    children,
    className = "",
    direction = "left",
    delay = 0,
    duration = 0.5,
    distance = 50,
    threshold = 0.1,
    ...props
}) => {
    const controls = useAnimation();
    const ref = useRef(null);
    const inView = useInView(ref, { threshold });

    const getInitialPosition = () => {
        switch (direction) {
            case "left": return { x: -distance, opacity: 0 };
            case "right": return { x: distance, opacity: 0 };
            case "top": return { y: -distance, opacity: 0 };
            case "bottom": return { y: distance, opacity: 0 };
            default: return { x: -distance, opacity: 0 };
        }
    };

    useEffect(() => {
        if (inView) {
            controls.start({ x: 0, y: 0, opacity: 1, transition: { duration, delay } });
        }
    }, [controls, inView, duration, delay]);

    return (
        <motion.div
            ref={ref}
            initial={getInitialPosition()}
            animate={controls}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
};

// Staggered children reveal on scroll
export const StaggeredList = ({
    children,
    className = "",
    staggerDelay = 0.1,
    childClassName = "",
    threshold = 0.1,
    ...props
}) => {
    const controls = useAnimation();
    const ref = useRef(null);
    const inView = useInView(ref, { threshold });

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);

    return (
        <motion.div
            ref={ref}
            className={className}
            initial="hidden"
            animate={controls}
            {...props}
        >
            {Array.isArray(children)
                ? children.map((child, i) => (
                    <motion.div
                        key={i}
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: {
                                opacity: 1,
                                y: 0,
                                transition: {
                                    delay: i * staggerDelay,
                                },
                            },
                        }}
                        className={childClassName}
                    >
                        {child}
                    </motion.div>
                ))
                : children
            }
        </motion.div>
    );
};

// Scale in element on scroll
export const ScaleInView = ({
    children,
    className = "",
    threshold = 0.1,
    duration = 0.5,
    delay = 0,
    ...props
}) => {
    const controls = useAnimation();
    const ref = useRef(null);
    const inView = useInView(ref, { threshold });

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);

    return (
        <motion.div
            ref={ref}
            className={className}
            initial="hidden"
            animate={controls}
            variants={{
                hidden: { scale: 0, opacity: 0 },
                visible: {
                    scale: 1,
                    opacity: 1,
                    transition: { duration, delay }
                }
            }}
            {...props}
        >
            {children}
        </motion.div>
    );
}; 