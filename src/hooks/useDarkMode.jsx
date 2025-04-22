// src/hooks/useDarkMode.js
import { useState, useEffect } from 'react';

export default function useDarkMode() {
    // 1) Initialize theme
    const [darkMode, setDarkMode] = useState(() => {
        const stored = localStorage.getItem('darkMode');
        return stored ? stored : (window.matchMedia('(prefers-color-scheme: dark)').matches);
    });

    // 2) Sync <html> class & localStorage whenever darkMode changes
    useEffect(() => {
        const root = document.querySelector("#root");
        if (darkMode) {
            root.classList.add('dark');
        }
        else {
            root.classList.remove('dark');
        }
        localStorage.setItem('darkMode', darkMode);
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', () => {
            setDarkMode(mediaQuery.matches ? 'dark' : 'light');
            localStorage.setItem('darkMode', mediaQuery.matches);
            root.classList.toggle('dark', mediaQuery.matches);
        });
        return () => {
            mediaQuery.removeEventListener('change', () => {
                setDarkMode(mediaQuery.matches ? 'dark' : 'light');
                localStorage.setItem('darkMode', mediaQuery.matches);
                root.classList.toggle('dark', mediaQuery.matches);
            });
        };
    }, [darkMode]);

    return [darkMode, setDarkMode];
}

