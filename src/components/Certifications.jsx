import { useState, useEffect } from "react";
import certificationData from "../constants/certifications.json";

const Certifications = () => {
    const [certifications, setCertifications] = useState([]);

    useEffect(() => {
        setCertifications(certificationData);
    }, []);

    return (
        <section id="certifications" className="py-24 px-6 md:px-12 lg:px-24 bg-white dark:bg-gray-900">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold mb-16">Licenses & certifications</h2>

                <div className="space-y-8">
                    {certifications.map((cert) => (
                        <div key={cert.id} className="flex flex-col gap-4 bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-800">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center overflow-hidden">
                                    {cert.logo ? (
                                        <img
                                            src={cert.logo}
                                            alt={`${cert.issuer} logo`}
                                            className="w-full h-full object-contain"
                                        />
                                    ) : (
                                        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-lg font-bold">
                                            {cert.issuer.charAt(0)}
                                        </div>
                                    )}
                                </div>
                                <div className="flex-grow">
                                    <h3 className="text-xl font-semibold">{cert.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400">{cert.issuer}</p>
                                    <p className="text-gray-500 dark:text-gray-500 text-sm">Issued {cert.issueDate}</p>

                                    {cert.credentialUrl && (
                                        <a
                                            href={cert.credentialUrl}
                                            target="_blank"
                                            className="inline-flex items-center mt-3 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                            Show credential
                                        </a>
                                    )}
                                </div>
                            </div>

                            {cert.skills && cert.skills.length > 0 && (
                                <div className="ml-16 mt-2">
                                    <div className="flex flex-wrap gap-2">
                                        {cert.skills.map((skill, index) => (
                                            <span
                                                key={index}
                                                className="inline-flex items-center px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Certifications; 