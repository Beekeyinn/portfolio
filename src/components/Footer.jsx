import { FaGithub, FaLinkedin } from "react-icons/fa";
import { socialLinks, profileInfo } from "../constants/social";

const Footer = () => {
    return (
        <footer className="py-8 px-6 md:px-12 lg:px-24 bg-gray-100 dark:bg-gray-900">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col items-center justify-center">
                    {/* Social Links */}
                    <div className="flex space-x-4 mb-4">
                        <a
                            href={socialLinks.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                            aria-label="GitHub Profile"
                        >
                            <FaGithub className="w-6 h-6" />
                        </a>
                        <a
                            href={socialLinks.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                            aria-label="LinkedIn Profile"
                        >
                            <FaLinkedin className="w-6 h-6" />
                        </a>
                    </div>

                    {/* Copyright */}
                    <p className="text-gray-600 dark:text-gray-400">
                        © {new Date().getFullYear()} {profileInfo.name}. All rights reserved.
                    </p>

                    {/* Tagline */}
                    <p className="text-gray-500 dark:text-gray-500 text-sm mt-2 italic">
                        {profileInfo.bio}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 