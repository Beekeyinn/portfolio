import { motion } from "framer-motion";
import { useState } from "react";

// Button with tap effect
export const TapButton = ({
    children,
    scale = 0.95,
    duration = 0.1,
    className = "",
    ...props
}) => {
    return (
        <motion.button
            className={className}
            whileTap={{ scale }}
            transition={{ duration }}
            {...props}
        >
            {children}
        </motion.button>
    );
};

// Input field with focus animation
export const AnimatedInput = ({
    className = "",
    focusColor = "#3498db",
    initialColor = "#e2e8f0",
    duration = 0.2,
    ...props
}) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className={`relative ${className}`}>
            <input
                className="w-full outline-none border-2 rounded px-4 py-2"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                style={{ borderColor: initialColor }}
                {...props}
            />
            <motion.div
                className="absolute bottom-0 left-0 w-full h-0.5 rounded"
                initial={{ scaleX: 0 }}
                animate={{
                    scaleX: isFocused ? 1 : 0,
                    backgroundColor: isFocused ? focusColor : initialColor
                }}
                transition={{ duration }}
            />
        </div>
    );
};

// Checkbox with animation
export const AnimatedCheckbox = ({
    checked = false,
    onChange,
    size = "1.5rem",
    checkedColor = "#3498db",
    uncheckedColor = "#e2e8f0",
    duration = 0.2,
    ...props
}) => {
    const boxVariants = {
        checked: {
            backgroundColor: checkedColor,
            borderColor: checkedColor,
            transition: { duration }
        },
        unchecked: {
            backgroundColor: "transparent",
            borderColor: uncheckedColor,
            transition: { duration }
        }
    };

    const checkVariants = {
        checked: {
            pathLength: 1,
            opacity: 1,
            transition: {
                duration,
                delay: duration / 2
            }
        },
        unchecked: {
            pathLength: 0,
            opacity: 0,
            transition: { duration: duration / 2 }
        }
    };

    return (
        <motion.div
            style={{
                width: size,
                height: size,
                borderWidth: "2px",
                borderRadius: "4px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer"
            }}
            variants={boxVariants}
            animate={checked ? "checked" : "unchecked"}
            onClick={() => onChange?.(!checked)}
            {...props}
        >
            <svg
                width="70%"
                height="70%"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <motion.path
                    d="M6 12L10 16L18 8"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    variants={checkVariants}
                    animate={checked ? "checked" : "unchecked"}
                />
            </svg>
        </motion.div>
    );
};

// Toggle switch animation
export const AnimatedToggle = ({
    isOn = false,
    onChange,
    width = "3rem",
    height = "1.5rem",
    onColor = "#3498db",
    offColor = "#e2e8f0",
    duration = 0.3,
    ...props
}) => {
    const calculateStyles = () => {
        const parsedWidth = typeof width === "string" ? width : `${width}px`;
        const parsedHeight = typeof height === "string" ? height : `${height}px`;
        return {
            width: parsedWidth,
            height: parsedHeight,
            borderRadius: parsedHeight
        };
    };

    const toggleStyles = calculateStyles();
    const knobSize = parseFloat(toggleStyles.height) * 0.8;

    return (
        <motion.div
            style={{
                ...toggleStyles,
                backgroundColor: isOn ? onColor : offColor,
                padding: `${(parseFloat(toggleStyles.height) - knobSize) / 2}px`,
                cursor: "pointer",
                display: "flex",
                justifyContent: isOn ? "flex-end" : "flex-start"
            }}
            animate={{ backgroundColor: isOn ? onColor : offColor }}
            transition={{ duration }}
            onClick={() => onChange?.(!isOn)}
            {...props}
        >
            <motion.div
                style={{
                    width: `${knobSize}px`,
                    height: `${knobSize}px`,
                    borderRadius: "50%",
                    backgroundColor: "#fff"
                }}
                layout
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
        </motion.div>
    );
};

// Loading spinner
export const AnimatedSpinner = ({
    size = "2rem",
    color = "#3498db",
    duration = 1,
    ...props
}) => {
    return (
        <motion.div
            style={{
                width: size,
                height: size,
                borderRadius: "50%",
                border: `3px solid ${color}20`,
                borderTopColor: color,
                display: "inline-block"
            }}
            animate={{ rotate: 360 }}
            transition={{
                duration,
                repeat: Infinity,
                ease: "linear"
            }}
            {...props}
        />
    );
};

// Success checkmark animation
export const SuccessCheckmark = ({
    size = "3rem",
    color = "#2ecc71",
    strokeWidth = 3,
    duration = 0.5,
    ...props
}) => {
    const pathVariants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
                duration,
                ease: "easeInOut"
            }
        }
    };

    return (
        <motion.svg
            width={size}
            height={size}
            viewBox="0 0 50 50"
            initial="hidden"
            animate="visible"
            {...props}
        >
            <motion.circle
                cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke={color}
                strokeWidth={strokeWidth}
                variants={{
                    hidden: { pathLength: 0, opacity: 0 },
                    visible: {
                        pathLength: 1,
                        opacity: 1,
                        transition: {
                            duration: duration * 0.8,
                            ease: "easeInOut"
                        }
                    }
                }}
            />
            <motion.path
                d="M15 25l8 8 12-15"
                fill="none"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={pathVariants}
                transition={{
                    delay: duration * 0.4,
                    duration: duration * 0.6
                }}
            />
        </motion.svg>
    );
}; 