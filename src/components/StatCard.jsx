import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const StatCard = ({ title, value, change, icon: Icon, trend = 'up' }) => {
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="p-6 rounded-2xl transition-all duration-500 hover:shadow-2xl cursor-pointer transform hover:-translate-y-2 hover:scale-105 relative overflow-hidden group"
      style={{ 
        background: theme.surfaceGradient,
        borderColor: theme.border,
        boxShadow: `0 4px 15px ${theme.shadow}`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background gradient */}
      <div 
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ${
          isHovered ? 'animate-gradient-shift' : ''
        }`}
        style={{
          background: `linear-gradient(135deg, ${theme.primary}10, ${theme.secondary}10, ${theme.accent}10)`
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full transition-all duration-1000 ${
              isHovered ? 'animate-float opacity-60' : 'opacity-0'
            }`}
            style={{
              backgroundColor: theme.primary,
              left: `${20 + i * 30}%`,
              top: `${20 + i * 20}%`,
              animationDelay: `${i * 0.3}s`
            }}
          />
        ))}
      </div>

      <div className="flex items-center justify-between mb-6 relative z-10">
        <div 
          className={`p-4 rounded-2xl transition-all duration-500 relative overflow-hidden group-hover:scale-110 ${
            isHovered ? 'animate-pulse' : ''
          }`}
          style={{ 
            background: theme.primaryGradient,
            boxShadow: `0 8px 25px ${theme.glowPrimary}`
          }}
        >
          <Icon className="w-7 h-7 text-white transition-transform duration-300 group-hover:rotate-12" />
          
          {/* Icon glow effect */}
          <div 
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ boxShadow: `0 0 30px ${theme.glowPrimary}` }}
          />
        </div>
        
        <div className={`text-sm font-bold px-3 py-1 rounded-full transition-all duration-300 ${
          trend === 'up' ? 'text-green-400' : 'text-red-400'
        } ${isHovered ? 'animate-bounce' : ''}`}
        style={{
          background: trend === 'up' ? theme.successGradient : theme.errorGradient,
          color: 'white',
          boxShadow: `0 4px 15px ${trend === 'up' ? theme.success : theme.error}40`
        }}>
          {change}
        </div>
      </div>
      
      <div className="relative z-10">
        <h3 className={`text-3xl font-bold mb-2 transition-all duration-300 ${
          isHovered ? 'animate-pulse' : ''
        }`} style={{ 
          color: theme.text,
          textShadow: isHovered ? `0 0 10px ${theme.glowPrimary}` : 'none'
        }}>
          {value}
        </h3>
        <p className="text-sm transition-all duration-300 group-hover:translate-x-1" style={{ color: theme.textSecondary }}>
          {title}
        </p>
      </div>

      {/* Animated border */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(45deg, ${theme.primary}, ${theme.secondary}, ${theme.accent}, ${theme.primary})`,
          backgroundSize: '300% 300%',
          animation: isHovered ? 'gradient-border 3s ease infinite' : 'none',
          padding: '2px'
        }}
      >
        <div 
          className="w-full h-full rounded-2xl"
          style={{ background: theme.surface }}
        />
      </div>

      {/* Ripple effect on hover */}
      {isHovered && (
        <div 
          className="absolute inset-0 rounded-2xl animate-ping opacity-20"
          style={{ backgroundColor: theme.primary }}
        />
      )}
    </div>
  );
};

export default StatCard;