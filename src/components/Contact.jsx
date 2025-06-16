import { useState } from "react";
import { socialLinks, socialIcons, profileInfo } from "../constants/social";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Contact = () => {
    const [formData, setFormData] = useState({
        email: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage(null);

        // Simulate form submission
        try {
            // This would be replaced with an actual API call in a production environment
            const response = await fetch("https://formspree.io/f/mvgazzbq", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            console.log(response);

            setSubmitMessage({
                type: "success",
                text: "Message sent successfully! I'll get back to you soon."
            });

            // Reset form
            setFormData({
                email: "",
                message: ""
            });
        } catch (error) {
            setSubmitMessage({
                type: "error",
                text: "Something went wrong. Please try again later."
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Map icon strings to actual components
    const getIconComponent = (iconName) => {
        switch (iconName) {
            case "FaGithub":
                return <FaGithub />;
            case "FaLinkedin":
                return <FaLinkedin />;
            case "FaEnvelope":
                return <FaEnvelope />;
            default:
                return null;
        }
    };

    // Function to get appropriate URL for each social platform
    const getSocialUrl = (key, url) => {
        switch (key) {
            case 'email':
                return `mailto:${url}`;
            case 'github':
                return url;
            case 'linkedin':
                return url;
            default:
                return url;
        }
    };

    return (
        <section id="contact" className="py-24 px-6 md:px-12 lg:px-24 bg-blue-50 dark:bg-gray-800">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row gap-16">
                    <div className="md:w-1/2">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">{profileInfo.contactHeading}</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                            {profileInfo.contactDescription}
                        </p>
                        <div className="space-y-4">
                            {profileInfo.email && (
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 dark:bg-opacity-30 rounded-full flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <a href={`mailto:${profileInfo.email}`} className="text-lg hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                        {profileInfo.email}
                                    </a>
                                </div>
                            )}
                            {profileInfo.location && (
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 dark:bg-opacity-30 rounded-full flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <a
                                        href={profileInfo.locationUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-lg hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                    >
                                        {profileInfo.location}
                                    </a>
                                </div>
                            )}
                            {profileInfo.phone && (
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 dark:bg-opacity-30 rounded-full flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <a href={`tel:${profileInfo.phone}`} className="text-lg hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                        {profileInfo.phone}
                                    </a>
                                </div>
                            )}
                        </div>
                        <div className="mt-8 flex gap-4">
                            {Object.entries(socialLinks).map(([key, url]) => (
                                <a
                                    key={key}
                                    href={getSocialUrl(key, url)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-900 dark:hover:bg-opacity-30 transition-colors duration-200"
                                    aria-label={socialIcons[key]?.name || key}
                                >
                                    <span className="text-gray-700 dark:text-gray-300 text-xl">
                                        {getIconComponent(socialIcons[key]?.icon)}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="md:w-1/2">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {submitMessage && (
                                <div className={`p-4 rounded-md ${submitMessage.type === 'success' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:bg-opacity-30 dark:text-green-300' : 'bg-red-100 text-red-700 dark:bg-red-900 dark:bg-opacity-30 dark:text-red-300'}`}>
                                    {submitMessage.text}
                                </div>
                            )}

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-md bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Your email"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="5"
                                    className="w-full px-4 py-3 rounded-md bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Your message"
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;