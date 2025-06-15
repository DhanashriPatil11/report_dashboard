import React, { useState, useEffect } from 'react';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Eye,
  ArrowRight,
  Activity,
  Zap,
  Star
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import StatCard from '../components/StatCard';
import Chart from '../components/Chart';

const Dashboard = () => {
  const { theme } = useTheme();
  const [animatedStats, setAnimatedStats] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedStats(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    {
      title: 'Total Users',
      value: '24,532',
      change: '+12.5%',
      icon: Users,
      trend: 'up'
    },
    {
      title: 'Revenue',
      value: '$89,430',
      change: '+8.2%',
      icon: DollarSign,
      trend: 'up'
    },
    {
      title: 'Growth Rate',
      value: '23.1%',
      change: '-2.1%',
      icon: TrendingUp,
      trend: 'down'
    },
    {
      title: 'Page Views',
      value: '143K',
      change: '+15.3%',
      icon: Eye,
      trend: 'up'
    },
  ];

  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Revenue',
        data: [12000, 19000, 15000, 25000, 22000, 30000, 28000],
        borderColor: theme.primary,
        backgroundColor: theme.primary + '20',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: theme.primary,
        pointBorderColor: '#fff',
        pointBorderWidth: 3,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  const userActivityData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Active Users',
        data: [1200, 1900, 1500, 2500, 2200, 3000, 2800],
        backgroundColor: theme.secondaryGradient,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const trafficData = {
    labels: ['Organic Search', 'Direct', 'Social Media', 'Email', 'Referral'],
    datasets: [
      {
        data: [45, 25, 15, 10, 5],
        backgroundColor: [
          theme.primary,
          theme.secondary,
          theme.accent,
          theme.success,
          theme.warning,
        ],
        borderWidth: 0,
        hoverOffset: 10,
      },
    ],
  };

  const recentActivities = [
    { user: 'John Doe', action: 'Created new project', time: '2 minutes ago', icon: Star },
    { user: 'Jane Smith', action: 'Updated user profile', time: '5 minutes ago', icon: Users },
    { user: 'Mike Johnson', action: 'Completed task #127', time: '10 minutes ago', icon: Zap },
    { user: 'Sarah Wilson', action: 'Added new comment', time: '15 minutes ago', icon: Activity },
    { user: 'David Brown', action: 'Uploaded file', time: '20 minutes ago', icon: TrendingUp },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Animated Header */}
      <div className="flex justify-between items-center">
        <div className="animate-bounce-in">
          <h1 className="text-4xl font-bold gradient-text mb-2">
            Dashboard
          </h1>
          <p className="text-lg" style={{ color: theme.textSecondary }}>
            Welcome back! Here's what's happening with your business today.
          </p>
        </div>
        <button
          className="px-6 py-3 rounded-2xl text-white font-bold transition-all duration-300 hover:scale-110 hover:rotate-3 relative overflow-hidden group"
          style={{ 
            background: theme.primaryGradient,
            boxShadow: `0 8px 25px ${theme.glowPrimary}`
          }}
        >
          <span className="relative z-10 flex items-center space-x-2">
            <span>View Reports</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
          
          {/* Button animation effect */}
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ boxShadow: `0 0 30px ${theme.glowPrimary}` }}
          />
        </button>
      </div>

      {/* Animated Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`transition-all duration-700 ${
              animatedStats 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            <StatCard {...stat} />
          </div>
        ))}
      </div>

      {/* Enhanced Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="animate-slide-down" style={{ animationDelay: '0.2s' }}>
          <Chart
            type="line"
            data={revenueData}
            title="Revenue Trend"
            height={350}
          />
        </div>
        <div className="animate-slide-down" style={{ animationDelay: '0.4s' }}>
          <Chart
            type="bar"
            data={userActivityData}
            title="User Activity"
            height={350}
          />
        </div>
      </div>

      {/* Enhanced Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Traffic Sources with Animation */}
        <div 
          className="p-6 rounded-2xl animate-slide-down relative overflow-hidden group"
          style={{ 
            background: theme.surfaceGradient,
            boxShadow: `0 8px 25px ${theme.shadow}`,
            animationDelay: '0.6s'
          }}
        >
          {/* Animated background */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `linear-gradient(135deg, ${theme.primary}10, ${theme.secondary}10)`
            }}
          />
          
          <Chart
            type="doughnut"
            data={trafficData}
            title="Traffic Sources"
            height={300}
          />
        </div>

        {/* Enhanced Recent Activity */}
        <div 
          className="lg:col-span-2 p-6 rounded-2xl animate-slide-down relative overflow-hidden"
          style={{ 
            background: theme.surfaceGradient,
            boxShadow: `0 8px 25px ${theme.shadow}`,
            animationDelay: '0.8s'
          }}
        >
          {/* Floating particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full animate-float opacity-30"
                style={{
                  backgroundColor: theme.accent,
                  left: `${10 + i * 20}%`,
                  top: `${20 + Math.random() * 60}%`,
                  animationDelay: `${i * 0.4}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>

          <div className="flex items-center justify-between mb-6 relative z-10">
            <h3 className="text-xl font-bold gradient-text">
              Recent Activity
            </h3>
            <button 
              className="text-sm font-bold flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 hover:translate-x-1 group"
              style={{ 
                color: theme.primary,
                background: theme.primaryGradient + '20'
              }}
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          <div className="space-y-4 relative z-10">
            {recentActivities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div 
                  key={index} 
                  className="flex items-center space-x-4 p-4 rounded-xl hover:scale-105 transition-all duration-300 group relative overflow-hidden"
                  style={{ 
                    background: theme.backgroundGradient,
                    border: `1px solid ${theme.border}`
                  }}
                >
                  {/* Activity item glow effect */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ boxShadow: `inset 0 0 20px ${theme.glowPrimary}` }}
                  />
                  
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 relative"
                    style={{ background: theme.accentGradient }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                    <div 
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ boxShadow: `0 0 20px ${theme.accent}` }}
                    />
                  </div>
                  <div className="flex-1 relative z-10">
                    <p className="font-bold transition-colors duration-300" style={{ color: theme.text }}>
                      {activity.user}
                    </p>
                    <p className="text-sm transition-colors duration-300" style={{ color: theme.textSecondary }}>
                      {activity.action}
                    </p>
                  </div>
                  <div className="text-sm font-medium transition-colors duration-300" style={{ color: theme.textSecondary }}>
                    {activity.time}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;