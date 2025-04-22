import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";

const NAV_LINKS = [
    { to: "/", label: "Home" },
    { to: "/#expertise", label: "Expertise" },
    { to: "/#work", label: "Projects" },
    { to: "/#experience", label: "Experience" },
    { to: "/#education", label: "Education" },
    { to: "/#contact", label: "Contact" },
];

const Navbar = ({ isDarkMode, toggleDarkMode }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    // Handle scroll events for navbar appearance
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (isMobileMenuOpen && !e.target.closest('.mobile-menu-container')) {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMobileMenuOpen]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isMobileMenuOpen]);

    // Handle smooth scrolling to sections
    const handleNavClick = (e, to) => {
        // Only handle anchor links
        if (to.includes('#')) {
            e.preventDefault();

            const sectionId = to.split('#')[1];
            const element = document.getElementById(sectionId);

            if (element) {
                // Close mobile menu
                setIsMobileMenuOpen(false);

                // Scroll to element
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    };

    const isActive = (to) => {
        if (to === '/') {
            return location.pathname === '/' && !location.hash;
        }
        return to.includes(location.hash);
    };

    const linkClasses = (to) => classNames(
        "font-medium transition-colors duration-200",
        "relative py-2 px-1",
        {
            "text-blue-600 dark:text-blue-400": isActive(to),
            "text-gray-700 hover:text-blue-500 dark:text-gray-200 dark:hover:text-blue-400": !isActive(to),
        }
    );

    const navbarClasses = classNames(
        "sticky top-0 z-40 w-full transition-all duration-300",
        {
            "bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-md": scrolled,
            "bg-white dark:bg-gray-900": !scrolled
        },
        "py-4 px-6 md:px-12"
    );

    const mobileMenuClasses = classNames(
        "fixed inset-0 z-50 lg:hidden",
        "bg-black bg-opacity-50 backdrop-blur-sm",
        "transition-opacity duration-300 ease-in-out",
        {
            "opacity-100": isMobileMenuOpen,
            "opacity-0 pointer-events-none": !isMobileMenuOpen
        }
    );

    return (
        <nav className={navbarClasses}>
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link
                    to="/"
                    className="text-3xl md:text-4xl no-underline font-logo italic font-extrabold text-gray-800 dark:text-gray-100 flex items-center gap-1"
                >
                    <span className="text-blue-500">Bikin</span>Shrestha
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-8">
                    {NAV_LINKS.map(({ to, label }) => (
                        <Link
                            key={to}
                            to={to}
                            className={linkClasses(to)}
                            onClick={(e) => handleNavClick(e, to)}
                        >
                            {label}
                            {isActive(to) && (
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 dark:bg-blue-400" />
                            )}
                        </Link>
                    ))}

                    {/* Desktop Dark Mode Toggle */}
                    <button
                        onClick={toggleDarkMode}
                        className="ml-4 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                        aria-label="Toggle dark mode"
                    >
                        {isDarkMode ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <div className="flex items-center lg:hidden">
                    <button
                        onClick={toggleDarkMode}
                        className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 mr-3"
                        aria-label="Toggle dark mode"
                    >
                        {isDarkMode ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                            </svg>
                        )}
                    </button>
                    <button
                        onClick={() => setIsMobileMenuOpen(prev => !prev)}
                        className={classNames(
                            "p-2 rounded-md transition-colors duration-200",
                            "border border-gray-300 dark:border-gray-700",
                            "focus:outline-none focus:ring-2 focus:ring-blue-500",
                            {
                                "bg-blue-500 text-white": isMobileMenuOpen,
                                "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200": !isMobileMenuOpen
                            }
                        )}
                        aria-label="Toggle mobile menu"
                        aria-expanded={isMobileMenuOpen}
                    >
                        {isMobileMenuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={mobileMenuClasses}>
                <div className="mobile-menu-container h-full w-4/5 max-w-sm bg-white dark:bg-gray-900 shadow-xl p-6 transform transition-transform duration-300 ease-in-out"
                    style={{
                        transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)'
                    }}
                >
                    <div className="flex flex-col space-y-6 mt-8">
                        {NAV_LINKS.map(({ to, label }) => (
                            <Link
                                key={to}
                                to={to}
                                onClick={(e) => handleNavClick(e, to)}
                                className={classNames(
                                    "text-xl font-medium px-4 py-2 rounded-md transition-colors duration-200",
                                    {
                                        "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900 dark:bg-opacity-20": isActive(to),
                                        "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800": !isActive(to)
                                    }
                                )}
                            >
                                {label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

