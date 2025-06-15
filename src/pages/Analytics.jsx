import React from 'react';
import { TrendingUp, Users, DollarSign, Eye, ArrowUp, ArrowDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import StatCard from '../components/StatCard';
import Chart from '../components/Chart';

const Analytics = () => {
  const { theme } = useTheme();

  const metrics = [
    {
      title: 'Total Revenue',
      value: '$124,563',
      change: '+12.5%',
      icon: DollarSign,
      trend: 'up'
    },
    {
      title: 'Active Users',
      value: '8,549',
      change: '+3.2%',
      icon: Users,
      trend: 'up'
    },
    {
      title: 'Conversion Rate',
      value: '3.24%',
      change: '-0.8%',
      icon: TrendingUp,
      trend: 'down'
    },
    {
      title: 'Page Views',
      value: '245,721',
      change: '+18.7%',
      icon: Eye,
      trend: 'up'
    },
  ];

  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Revenue',
        data: [12000, 19000, 15000, 25000, 22000, 30000, 28000, 35000, 32000, 40000, 38000, 45000],
        borderColor: theme.primary,
        backgroundColor: theme.primary + '20',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Profit',
        data: [8000, 12000, 9000, 16000, 14000, 19000, 18000, 22000, 20000, 25000, 24000, 28000],
        borderColor: theme.success,
        backgroundColor: theme.success + '20',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const userGrowthData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'New Users',
        data: [1200, 1900, 1500, 2100],
        backgroundColor: theme.primary,
      },
      {
        label: 'Returning Users',
        data: [800, 1200, 1000, 1400],
        backgroundColor: theme.secondary,
      },
    ],
  };

  const deviceData = {
    labels: ['Desktop', 'Mobile', 'Tablet'],
    datasets: [
      {
        data: [65, 28, 7],
        backgroundColor: [theme.primary, theme.secondary, theme.accent],
      },
    ],
  };

  const topPages = [
    { page: '/dashboard', views: 12543, change: 12.5 },
    { page: '/products', views: 8932, change: -3.2 },
    { page: '/analytics', views: 7621, change: 8.7 },
    { page: '/settings', views: 5432, change: 15.3 },
    { page: '/profile', views: 4321, change: -1.8 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: theme.text }}>
            Analytics
          </h1>
          <p className="mt-2" style={{ color: theme.textSecondary }}>
            Detailed insights into your business performance
          </p>
        </div>
        <div className="flex space-x-3">
          <select 
            className="px-4 py-2 rounded-lg border"
            style={{ 
              backgroundColor: theme.surface,
              borderColor: theme.border,
              color: theme.text 
            }}
          >
            <option>Last 30 days</option>
            <option>Last 7 days</option>
            <option>Last 90 days</option>
            <option>This year</option>
          </select>
          <button
            className="px-4 py-2 rounded-lg text-white font-medium transition-colors hover:opacity-90"
            style={{ backgroundColor: theme.primary }}
          >
            Export Report
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <StatCard key={index} {...metric} />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2">
          <Chart
            type="line"
            data={revenueData}
            title="Revenue & Profit Trends"
            height={400}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Chart
          type="bar"
          data={userGrowthData}
          title="User Growth"
          height={350}
        />
        
        <Chart
          type="doughnut"
          data={deviceData}
          title="Device Usage"
          height={350}
        />

        {/* Top Pages */}
        <div 
          className="p-6 rounded-xl"
          style={{ 
            backgroundColor: theme.surface,
            boxShadow: `0 1px 3px ${theme.shadow}`
          }}
        >
          <h3 className="text-lg font-semibold mb-6" style={{ color: theme.text }}>
            Top Pages
          </h3>
          <div className="space-y-4">
            {topPages.map((page, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: theme.surfaceAlt }}>
                <div>
                  <p className="font-medium" style={{ color: theme.text }}>
                    {page.page}
                  </p>
                  <p className="text-sm" style={{ color: theme.textSecondary }}>
                    {page.views.toLocaleString()} views
                  </p>
                </div>
                <div className={`flex items-center space-x-1 text-sm ${
                  page.change >= 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                  {page.change >= 0 ? (
                    <ArrowUp className="w-4 h-4" />
                  ) : (
                    <ArrowDown className="w-4 h-4" />
                  )}
                  <span>{Math.abs(page.change)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Table */}
      <div 
        className="p-6 rounded-xl overflow-hidden"
        style={{ 
          backgroundColor: theme.surface,
          boxShadow: `0 1px 3px ${theme.shadow}`
        }}
      >
        <h3 className="text-lg font-semibold mb-6" style={{ color: theme.text }}>
          Performance Overview
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: `1px solid ${theme.border}` }}>
                <th className="text-left p-4 font-medium" style={{ color: theme.textSecondary }}>
                  Metric
                </th>
                <th className="text-left p-4 font-medium" style={{ color: theme.textSecondary }}>
                  Current Period
                </th>
                <th className="text-left p-4 font-medium" style={{ color: theme.textSecondary }}>
                  Previous Period
                </th>
                <th className="text-left p-4 font-medium" style={{ color: theme.textSecondary }}>
                  Change
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { metric: 'Revenue', current: '$45,230', previous: '$38,920', change: '+16.2%', positive: true },
                { metric: 'Orders', current: '1,247', previous: '1,156', change: '+7.9%', positive: true },
                { metric: 'Avg Order Value', current: '$36.28', previous: '$33.67', change: '+7.8%', positive: true },
                { metric: 'Bounce Rate', current: '34.2%', previous: '38.1%', change: '-10.2%', positive: true },
                { metric: 'Session Duration', current: '4:32', previous: '4:18', change: '+5.4%', positive: true },
              ].map((row, index) => (
                <tr key={index} style={{ borderBottom: `1px solid ${theme.border}` }}>
                  <td className="p-4 font-medium" style={{ color: theme.text }}>
                    {row.metric}
                  </td>
                  <td className="p-4" style={{ color: theme.text }}>
                    {row.current}
                  </td>
                  <td className="p-4" style={{ color: theme.textSecondary }}>
                    {row.previous}
                  </td>
                  <td className={`p-4 font-medium ${row.positive ? 'text-green-500' : 'text-red-500'}`}>
                    {row.change}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;