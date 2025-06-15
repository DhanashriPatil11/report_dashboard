import React, { createContext, useContext, useState, useEffect } from 'react';
import { themes } from '../theme';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('light');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('admin-theme');
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  const changeTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
      localStorage.setItem('admin-theme', themeName);
      
      // Add theme transition effect
      document.body.style.transition = 'all 0.5s ease-in-out';
      setTimeout(() => {
        document.body.style.transition = '';
      }, 500);
    }
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const theme = themes[currentTheme];

  const value = {
    currentTheme,
    theme,
    changeTheme,
    sidebarCollapsed,
    setSidebarCollapsed,
    toggleSidebar,
  };

  return (
    <ThemeContext.Provider value={value}>
      <div 
        className="min-h-screen transition-all duration-500 particles relative overflow-hidden"
        style={{ 
          background: theme.backgroundGradient,
          color: theme.text 
        }}
      >
        {/* Animated background elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div 
            className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20 animate-pulse"
            style={{ 
              background: `radial-gradient(circle, ${theme.primary} 0%, transparent 70%)`,
              animation: 'float 8s ease-in-out infinite'
            }}
          />
          <div 
            className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-20 animate-pulse"
            style={{ 
              background: `radial-gradient(circle, ${theme.secondary} 0%, transparent 70%)`,
              animation: 'float 10s ease-in-out infinite reverse'
            }}
          />
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10 animate-pulse"
            style={{ 
              background: `radial-gradient(circle, ${theme.accent} 0%, transparent 70%)`,
              animation: 'float 12s ease-in-out infinite'
            }}
          />
        </div>
        
        {children}
      </div>
    </ThemeContext.Provider>
  );
};