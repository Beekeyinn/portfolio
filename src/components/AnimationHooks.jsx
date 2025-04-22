import { useState, useEffect, useRef } from "react";
import { useAnimation } from "framer-motion";

// Hook for detecting when an element is in view
export const useInView = (threshold = 0.1, rootMargin = "0px") => {
    const ref = useRef(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            {
                rootMargin,
                threshold,
            }
        );

        const currentRef = ref.current;

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [threshold, rootMargin]);

    return [ref, isInView];
};

// Hook for scroll-triggered animations
export const useScrollAnimation = (threshold = 0.1) => {
    const controls = useAnimation();
    const [ref, isInView] = useInView(threshold);

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        }
    }, [controls, isInView]);

    return [ref, controls];
};

// Hook for sequential animations
export const useSequentialAnimation = (animationSteps, initialDelay = 0) => {
    const controls = useAnimation();

    const playSequence = async () => {
        await controls.start("hidden");

        await new Promise(resolve => setTimeout(resolve, initialDelay * 1000));

        for (const step of animationSteps) {
            await controls.start(step.variant);

            if (step.duration) {
                await new Promise(resolve => setTimeout(resolve, step.duration * 1000));
            }
        }
    };

    return [controls, playSequence];
};

// Hook for typing animation
export const useTypingAnimation = (text, speed = 50, initialDelay = 0) => {
    const [displayText, setDisplayText] = useState("");
    const [isDone, setIsDone] = useState(false);

    useEffect(() => {
        let timeout;
        let currentIndex = 0;
        setDisplayText("");
        setIsDone(false);

        const startTyping = () => {
            if (currentIndex <= text.length) {
                setDisplayText(text.substring(0, currentIndex));
                currentIndex++;

                if (currentIndex > text.length) {
                    setIsDone(true);
                } else {
                    timeout = setTimeout(startTyping, speed);
                }
            }
        };

        const initialTimeout = setTimeout(() => {
            startTyping();
        }, initialDelay);

        return () => {
            clearTimeout(timeout);
            clearTimeout(initialTimeout);
        };
    }, [text, speed, initialDelay]);

    return [displayText, isDone];
};

// Hook for mouse hover tracking
export const useMousePosition = (ref) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0, hover: false });

    useEffect(() => {
        if (!ref.current) return;

        const handleMouseMove = (e) => {
            const element = ref.current;
            const rect = element.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const normalizedX = x / rect.width;
            const normalizedY = y / rect.height;

            setMousePosition({
                x: normalizedX,
                y: normalizedY,
                hover: true,
                rawX: x,
                rawY: y
            });
        };

        const handleMouseLeave = () => {
            setMousePosition(prev => ({ ...prev, hover: false }));
        };

        const element = ref.current;
        element.addEventListener("mousemove", handleMouseMove);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            element.removeEventListener("mousemove", handleMouseMove);
            element.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [ref]);

    return mousePosition;
};

// Hook for delayed animation
export const useDelayedAnimation = (delay = 0) => {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsReady(true);
        }, delay * 1000);

        return () => clearTimeout(timeout);
    }, [delay]);

    return isReady;
};

// Hook for spring physics
export const useSpringAnimation = (initialValue = 0, springConfig = { stiffness: 100, damping: 10 }) => {
    const [target, setTarget] = useState(initialValue);
    const [current, setCurrent] = useState(initialValue);
    const frameRef = useRef();

    useEffect(() => {
        let velocity = 0;
        const { stiffness, damping } = springConfig;

        const animateSpring = () => {
            const force = stiffness * (target - current);
            velocity = velocity * (1 - damping / 100) + force / 100;

            const nextValue = current + velocity;
            setCurrent(nextValue);

            // Check if animation has settled
            if (Math.abs(target - nextValue) < 0.001 && Math.abs(velocity) < 0.001) {
                setCurrent(target);
                return;
            }

            frameRef.current = requestAnimationFrame(animateSpring);
        };

        frameRef.current = requestAnimationFrame(animateSpring);

        return () => {
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }
        };
    }, [target, springConfig]);

    return [current, setTarget];
}; 