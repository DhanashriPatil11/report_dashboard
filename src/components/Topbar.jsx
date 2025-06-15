import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  Settings, 
  User, 
  Moon, 
  Sun,
  Palette,
  ChevronDown,
  Zap
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Topbar = () => {
  const { currentTheme, theme, changeTheme, sidebarCollapsed } = useTheme();
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const themeOptions = [
    { key: 'light', label: 'Light', icon: Sun },
    { key: 'dark', label: 'Dark', icon: Moon },
    { key: 'ocean', label: 'Ocean', icon: Palette },
    { key: 'neon', label: 'Neon', icon: Zap },
  ];

  return (
    <div 
      className={`fixed top-0 right-0 h-16 flex items-center justify-between px-6 transition-all duration-500 z-30 backdrop-blur-lg ${
        sidebarCollapsed ? 'left-16' : 'left-64'
      }`}
      style={{ 
        background: theme.surfaceGradient,
        borderBottom: `1px solid ${theme.border}`,
        boxShadow: `0 4px 20px ${theme.shadow}`
      }}
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0 animate-pulse"
          style={{
            background: `radial-gradient(circle at 70% 30%, ${theme.primary} 0%, transparent 50%)`
          }}
        />
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-lg relative">
        <div className="relative group">
          <Search 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-all duration-300 group-hover:scale-110" 
            style={{ color: theme.textSecondary }}
          />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 hover:shadow-lg focus:scale-105"
            style={{
              background: theme.backgroundGradient,
              borderColor: theme.border,
              color: theme.text,
              boxShadow: `0 4px 15px ${theme.shadow}`
            }}
            onFocus={(e) => {
              e.target.style.borderColor = theme.primary;
              e.target.style.boxShadow = `0 0 0 4px ${theme.glowPrimary}, 0 8px 25px ${theme.shadow}`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = theme.border;
              e.target.style.boxShadow = `0 4px 15px ${theme.shadow}`;
            }}
          />
          
          {/* Search animation effect */}
          <div 
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{ boxShadow: `0 0 20px ${theme.glowPrimary}` }}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-4">
        {/* Theme Selector */}
        <div className="relative">
          <button
            onClick={() => setShowThemeMenu(!showThemeMenu)}
            className="p-3 rounded-2xl transition-all duration-300 hover:scale-110 hover:rotate-12 relative group"
            style={{ 
              background: theme.surfaceGradient,
              boxShadow: `0 4px 15px ${theme.shadow}`
            }}
          >
            <Palette className="w-5 h-5 transition-colors duration-300" style={{ color: theme.text }} />
            
            {/* Button glow effect */}
            <div 
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ boxShadow: `0 0 20px ${theme.glowPrimary}` }}
            />
          </button>

          {showThemeMenu && (
            <div 
              className="absolute right-0 mt-3 w-52 rounded-2xl shadow-2xl border py-2 z-50 animate-slide-down backdrop-blur-lg"
              style={{ 
                background: theme.surfaceGradient,
                borderColor: theme.border,
                boxShadow: `0 20px 40px ${theme.shadow}`
              }}
            >
              {themeOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.key}
                    onClick={() => {
                      changeTheme(option.key);
                      setShowThemeMenu(false);
                    }}
                    className={`w-full flex items-center px-4 py-3 text-left transition-all duration-300 hover:scale-105 relative group ${
                      currentTheme === option.key ? 'font-bold' : ''
                    }`}
                    style={{
                      color: currentTheme === option.key ? theme.primary : theme.text,
                      background: currentTheme === option.key ? theme.primaryGradient + '20' : 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      if (currentTheme !== option.key) {
                        e.target.style.background = theme.surfaceAlt;
                        e.target.style.transform = 'translateX(4px)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (currentTheme !== option.key) {
                        e.target.style.background = 'transparent';
                        e.target.style.transform = 'translateX(0)';
                      }
                    }}
                  >
                    <Icon className="w-5 h-5 mr-3 transition-transform duration-300 group-hover:rotate-12" />
                    {option.label}
                    
                    {currentTheme === option.key && (
                      <div className="ml-auto w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: theme.primary }} />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Notifications */}
        <button
          className="relative p-3 rounded-2xl transition-all duration-300 hover:scale-110 hover:rotate-6 group"
          style={{ 
            background: theme.surfaceGradient,
            boxShadow: `0 4px 15px ${theme.shadow}`
          }}
        >
          <Bell className="w-5 h-5 transition-all duration-300 group-hover:animate-swing" style={{ color: theme.text }} />
          <span 
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-xs flex items-center justify-center animate-pulse"
            style={{ 
              background: theme.errorGradient,
              boxShadow: `0 0 10px ${theme.error}`
            }}
          >
            <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
          </span>
          
          {/* Notification glow */}
          <div 
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ boxShadow: `0 0 20px ${theme.glowSecondary}` }}
          />
        </button>

        {/* Settings */}
        <button
          className="p-3 rounded-2xl transition-all duration-300 hover:scale-110 hover:rotate-90 group"
          style={{ 
            background: theme.surfaceGradient,
            boxShadow: `0 4px 15px ${theme.shadow}`
          }}
        >
          <Settings className="w-5 h-5 transition-transform duration-500" style={{ color: theme.text }} />
          
          {/* Settings glow */}
          <div 
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ boxShadow: `0 0 20px ${theme.glowPrimary}` }}
          />
        </button>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center space-x-3 p-2 rounded-2xl transition-all duration-300 hover:scale-105 group"
            style={{ 
              background: theme.surfaceGradient,
              boxShadow: `0 4px 15px ${theme.shadow}`
            }}
          >
            <div 
              className="w-10 h-10 rounded-2xl flex items-center justify-center relative overflow-hidden group-hover:scale-110 transition-transform duration-300"
              style={{ background: theme.primaryGradient }}
            >
              <User className="w-5 h-5 text-white" />
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold transition-colors duration-300" style={{ color: theme.text }}>
                John Doe
              </p>
              <p className="text-xs transition-colors duration-300" style={{ color: theme.textSecondary }}>
                Administrator
              </p>
            </div>
            <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" style={{ color: theme.textSecondary }} />
            
            {/* Profile glow */}
            <div 
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ boxShadow: `0 0 20px ${theme.glowPrimary}` }}
            />
          </button>

          {showProfileMenu && (
            <div 
              className="absolute right-0 mt-3 w-52 rounded-2xl shadow-2xl border py-2 z-50 animate-slide-down backdrop-blur-lg"
              style={{ 
                background: theme.surfaceGradient,
                borderColor: theme.border,
                boxShadow: `0 20px 40px ${theme.shadow}`
              }}
            >
              <button 
                className="w-full px-4 py-3 text-left transition-all duration-300 hover:scale-105 hover:translate-x-1"
                style={{ color: theme.text }}
                onMouseEnter={(e) => e.target.style.background = theme.surfaceAlt}
                onMouseLeave={(e) => e.target.style.background = 'transparent'}
              >
                Profile Settings
              </button>
              <button 
                className="w-full px-4 py-3 text-left transition-all duration-300 hover:scale-105 hover:translate-x-1"
                style={{ color: theme.text }}
                onMouseEnter={(e) => e.target.style.background = theme.surfaceAlt}
                onMouseLeave={(e) => e.target.style.background = 'transparent'}
              >
                Account Preferences
              </button>
              <hr style={{ borderColor: theme.border }} className="my-2" />
              <button 
                className="w-full px-4 py-3 text-left transition-all duration-300 hover:scale-105 hover:translate-x-1"
                style={{ color: theme.error }}
                onMouseEnter={(e) => {
                  e.target.style.background = theme.errorGradient + '20';
                  e.target.style.boxShadow = `0 0 15px ${theme.error}40`;
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.boxShadow = 'none';
                }}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full animate-float opacity-20"
            style={{
              backgroundColor: theme.primary,
              left: `${20 + i * 25}%`,
              top: `${30 + Math.random() * 40}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${4 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Topbar;