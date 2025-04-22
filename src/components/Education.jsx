import { useState, useEffect } from "react";
import educationData from "../constants/education.json";

const Education = () => {
    const [education, setEducation] = useState([]);

    useEffect(() => {
        setEducation(educationData);
    }, []);

    return (
        <section id="education" className="py-24 px-6 md:px-12 lg:px-24 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold mb-16">Education</h2>

                <div className="space-y-12">
                    {education.map((edu) => (
                        <div key={edu.id} className="flex flex-col gap-4 bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
                                    {edu.logo ? (
                                        <img
                                            src={edu.logo}
                                            alt={`${edu.institution} logo`}
                                            className="w-full h-full object-contain p-1"
                                        />
                                    ) : (
                                        /* Fallback if no logo */
                                        <div className="text-2xl font-bold text-gray-400">
                                            {edu.institution.charAt(0)}
                                        </div>
                                    )}
                                </div>
                                <div className="flex-grow">
                                    <h3 className="text-xl font-bold">{edu.institution}</h3>
                                    <p className="text-gray-700 dark:text-gray-300">{edu.degree}</p>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-sm text-gray-500 dark:text-gray-400">
                                        {edu.period && (
                                            <span>{edu.period}</span>
                                        )}
                                        {edu.period && edu.location && (
                                            <span className="hidden sm:inline">•</span>
                                        )}
                                        {edu.location && (
                                            <span>{edu.location}</span>
                                        )}
                                    </div>
                                    {edu.skills && edu.skills.length > 0 && (
                                        <div className="mt-4">
                                            <p className="text-sm font-semibold mb-2">Skills:</p>
                                            <div className="flex flex-wrap gap-2">
                                                {edu.skills.map((skill, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="flex-shrink-0">
                                    <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education; 