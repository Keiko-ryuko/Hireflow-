import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Briefcase, 
  Calendar, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle 
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Total Candidates', value: '1,284', change: '+12%', icon: Users, color: 'bg-blue-50 text-blue-600' },
    { label: 'Active Jobs', value: '42', change: '+5%', icon: Briefcase, color: 'bg-indigo-50 text-indigo-600' },
    { label: 'Interviews Today', value: '18', change: '-2%', icon: Calendar, color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Hiring Rate', value: '84%', change: '+8%', icon: TrendingUp, color: 'bg-amber-50 text-amber-600' },
  ];

  const pipelineData = [
    { name: 'Applied', value: 450 },
    { name: 'Screening', value: 320 },
    { name: 'Interview', value: 180 },
    { name: 'Offer', value: 65 },
    { name: 'Hired', value: 42 },
  ];

  const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const performanceData = [
    { month: 'Jan', hires: 12, applications: 120 },
    { month: 'Feb', hires: 15, applications: 145 },
    { month: 'Mar', hires: 18, applications: 180 },
    { month: 'Apr', hires: 14, applications: 160 },
    { month: 'May', hires: 22, applications: 210 },
    { month: 'Jun', hires: 25, applications: 240 },
  ];

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-2xl font-bold text-[#111827]">Recruitment Overview</h2>
          <p className="text-[#6B7280]">Welcome back! Here's what's happening with your hiring pipeline.</p>
        </div>
        <button className="bg-[#4F46E5] text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-indigo-100 hover:bg-[#4338CA] transition-all flex items-center gap-2">
          <PlusCircle className="w-5 h-5" />
          Create New Job
        </button>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-[#E9ECEF] shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-[#6B7280] text-sm font-medium">{stat.label}</h3>
            <p className="text-2xl font-bold text-[#111827] mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Hiring Funnel */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-[#E9ECEF] shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-[#111827]">Hiring Performance</h3>
            <select className="bg-[#F3F4F6] border-none rounded-lg text-sm px-3 py-1.5 focus:ring-2 focus:ring-[#4F46E5]">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  cursor={{ fill: '#F9FAFB' }}
                />
                <Bar dataKey="hires" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                <Bar dataKey="applications" fill="#E0E7FF" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pipeline Distribution */}
        <div className="bg-white p-8 rounded-2xl border border-[#E9ECEF] shadow-sm">
          <h3 className="text-lg font-bold text-[#111827] mb-8">Pipeline Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pipelineData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pipelineData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-4">
            {pipelineData.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                  <span className="text-[#6B7280]">{item.name}</span>
                </div>
                <span className="font-semibold text-[#111827]">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-8 rounded-2xl border border-[#E9ECEF] shadow-sm">
        <h3 className="text-lg font-bold text-[#111827] mb-6">Recent Candidate Activity</h3>
        <div className="space-y-6">
          {[
            { name: 'Sarah Johnson', role: 'Senior Product Designer', status: 'Interview Scheduled', time: '2 hours ago', icon: Calendar, color: 'text-blue-600 bg-blue-50' },
            { name: 'Michael Chen', role: 'Full Stack Engineer', status: 'AI Screening Passed', time: '4 hours ago', icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
            { name: 'Emily Davis', role: 'Marketing Manager', status: 'Offer Sent', time: 'Yesterday', icon: TrendingUp, color: 'text-amber-600 bg-amber-50' },
            { name: 'David Wilson', role: 'DevOps Engineer', status: 'Rejected', time: 'Yesterday', icon: XCircle, color: 'text-red-600 bg-red-50' },
          ].map((activity, i) => (
            <div key={i} className="flex items-center justify-between py-4 border-b border-[#F3F4F6] last:border-0">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#F3F4F6] rounded-full flex items-center justify-center text-[#4F46E5] font-bold">
                  {activity.name[0]}
                </div>
                <div>
                  <p className="font-semibold text-[#111827]">{activity.name}</p>
                  <p className="text-sm text-[#6B7280]">{activity.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${activity.color}`}>
                  <activity.icon className="w-3.5 h-3.5" />
                  {activity.status}
                </div>
                <span className="text-sm text-[#9CA3AF] flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {activity.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const PlusCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default Dashboard;
