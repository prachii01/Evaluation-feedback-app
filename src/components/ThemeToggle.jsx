import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.dataset.theme = savedTheme;
    return savedTheme;
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      <span className="theme-toggle-icon">
        {theme === 'light' ? '🌙' : '☀️'}
      </span>
      <span className="theme-toggle-text">
        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      </span>
    </button>
  );
}
