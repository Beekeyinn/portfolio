import { socialLinks, profileInfo } from './social';
import profileImage from '../assets/profile2.jpg';
export const heroData = {
    greeting: "Hello, I'm",
    name: profileInfo.name,
    roles: ['Full Stack Developer', 'Web Scraper', 'Tech Enthusiast', "Python Developer", "Django/FastAPI Developer", "AI Enthusiast"],
    description: "Passionate about building scalable, efficient and user-friendly web applications. Specializing in modern JavaScript frameworks and cloud technologies.",
    profileImage: profileImage,
    experience: "5+ Years Experience",
    buttons: [
        {
            text: "See My Work",
            link: "#projects",
            primary: true
        },
        {
            text: "Contact Me",
            link: "#contact",
            primary: false
        }
    ],
    typewriterSettings: {
        loop: 0,
        typeSpeed: 70,
        deleteSpeed: 50,
        delaySpeed: 1000,
    },
    social: socialLinks,
    skills: [
        "Python",
        "Django",
        "REST API",
        "Celery",
        "JavaScript",
        "React",
        "HTML/CSS",
        "Git/GitHub"
    ],
    tagline: profileInfo.bio
}; 