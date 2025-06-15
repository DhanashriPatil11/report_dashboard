import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Kanban, 
  Users, 
  BarChart3, 
  Settings, 
  FileText,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Sidebar = () => {
  const { theme, sidebarCollapsed, toggleSidebar } = useTheme();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: Users, label: 'Users', path: '/users' },
    { icon: Calendar, label: 'Calendar', path: '/calendar' },
    { icon: Kanban, label: 'Kanban', path: '/kanban' },
    { icon: FileText, label: 'Reports', path: '/reports' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div 
      className={`fixed left-0 top-0 h-full transition-all duration-500 ease-in-out z-40 ${
        sidebarCollapsed ? 'w-16' : 'w-64'
      } backdrop-blur-lg`}
      style={{ 
        background: theme.surfaceGradient,
        borderRight: `1px solid ${theme.border}`,
        boxShadow: `0 0 30px ${theme.glowPrimary}`
      }}
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0 animate-pulse"
          style={{
            background: `radial-gradient(circle at 20% 50%, ${theme.primary} 0%, transparent 50%), radial-gradient(circle at 80% 20%, ${theme.secondary} 0%, transparent 50%)`
          }}
        />
      </div>

      {/* Header */}
      <div className="relative flex items-center justify-between p-4 border-b" style={{ borderColor: theme.border }}>
        {!sidebarCollapsed && (
          <div className="flex items-center space-x-3 animate-fade-in">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center relative overflow-hidden group"
              style={{ background: theme.primaryGradient }}
            >
              <Sparkles className="w-6 h-6 text-white animate-pulse" />
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-current to-opacity-70 bg-clip-text animate-gradient" style={{ color: theme.text }}>
              VistaPanel
            </h1>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:scale-110 transition-all duration-300 hover:rotate-180 relative group"
          style={{ backgroundColor: theme.surfaceAlt }}
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-4 h-4 transition-transform duration-300" style={{ color: theme.text }} />
          ) : (
            <ChevronLeft className="w-4 h-4 transition-transform duration-300" style={{ color: theme.text }} />
          )}
          <div 
            className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ boxShadow: `0 0 20px ${theme.glowPrimary}` }}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2 relative">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center p-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                sidebarCollapsed ? 'justify-center' : 'space-x-3'
              } hover:scale-105 hover:-translate-y-1`}
              style={{
                background: active ? theme.primaryGradient : 'transparent',
                color: active ? 'white' : theme.text,
                boxShadow: active ? `0 8px 25px ${theme.glowPrimary}` : 'none',
                animation: active ? 'pulse-glow 2s infinite' : 'none'
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  e.target.style.background = theme.surfaceGradient;
                  e.target.style.boxShadow = `0 4px 15px ${theme.shadow}`;
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  e.target.style.background = 'transparent';
                  e.target.style.boxShadow = 'none';
                }
              }}
            >
              {/* Animated background for active item */}
              {active && (
                <div 
                  className="absolute inset-0 animate-pulse opacity-30"
                  style={{ background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)' }}
                />
              )}
              
              <Icon className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ${active ? 'animate-bounce' : 'group-hover:scale-110'}`} />
              {!sidebarCollapsed && (
                <span className="font-medium transition-all duration-300 group-hover:translate-x-1">{item.label}</span>
              )}
              
              {/* Tooltip for collapsed state */}
              {sidebarCollapsed && (
                <div 
                  className="absolute left-full ml-3 px-3 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-50 transform translate-x-2 group-hover:translate-x-0"
                  style={{ 
                    background: theme.surfaceGradient,
                    color: theme.text,
                    boxShadow: `0 4px 15px ${theme.shadow}`
                  }}
                >
                  {item.label}
                  <div 
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 rotate-45"
                    style={{ backgroundColor: theme.surface }}
                  />
                </div>
              )}

              {/* Hover glow effect */}
              <div 
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ boxShadow: `inset 0 0 20px ${theme.glowSecondary}` }}
              />
            </Link>
          );
        })}
      </nav>

      {/* Animated Footer */}
      {!sidebarCollapsed && (
        <div className="absolute bottom-4 left-4 right-4 animate-fade-in">
          <div 
            className="p-4 rounded-xl relative overflow-hidden group hover:scale-105 transition-all duration-300"
            style={{ background: theme.surfaceGradient }}
          >
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: `linear-gradient(45deg, ${theme.primary}20, ${theme.secondary}20)` }}
            />
            <p className="text-sm font-medium relative z-10" style={{ color: theme.text }}>
              Need help?
            </p>
            <p className="text-xs mt-1 relative z-10" style={{ color: theme.textSecondary }}>
              Contact our support team
            </p>
            <div 
              className="absolute top-2 right-2 w-2 h-2 rounded-full animate-ping"
              style={{ backgroundColor: theme.success }}
            />
          </div>
        </div>
      )}

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full animate-float opacity-30"
            style={{
              backgroundColor: theme.primary,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;