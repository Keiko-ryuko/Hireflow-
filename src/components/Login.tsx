import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, ShieldCheck, Zap, BarChart3, Users, BrainCircuit } from 'lucide-react';
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const Login: React.FC = () => {
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Login Error:', error);
    }
  };

  const features = [
    { icon: BrainCircuit, title: 'AI Screening', desc: 'Automate resume analysis with Gemini AI.' },
    { icon: Zap, title: 'Fast Pipeline', desc: 'Move candidates through stages effortlessly.' },
    { icon: BarChart3, title: 'Analytics', desc: 'Data-driven hiring decisions at your fingertips.' },
    { icon: ShieldCheck, title: 'Secure', desc: 'Enterprise-grade security for your data.' },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col lg:flex-row">
      {/* Left Side - Branding & Features */}
      <div className="lg:w-1/2 bg-[#4F46E5] p-12 lg:p-24 flex flex-col justify-between text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <Briefcase className="text-[#4F46E5] w-6 h-6" />
            </div>
            <h1 className="text-3xl font-black tracking-tighter">HireFlow</h1>
          </div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight mb-8">
              The Future of <br />
              <span className="text-indigo-200">Recruitment</span> <br />
              is Here.
            </h2>
            <p className="text-xl text-indigo-100 max-w-md leading-relaxed mb-12">
              HireFlow automates the entire hiring lifecycle with AI, reducing time-to-hire by up to 70%.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-8 relative z-10">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="space-y-2"
              >
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <feature.icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg">{feature.title}</h3>
                <p className="text-sm text-indigo-100/80">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-sm text-indigo-200/60 relative z-10">
          © 2026 HireFlow AI. All rights reserved.
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-10"
        >
          <div className="text-center">
            <h2 className="text-4xl font-black text-[#111827] mb-3 tracking-tight">Welcome Back</h2>
            <p className="text-[#6B7280] text-lg">Sign in to manage your hiring pipeline.</p>
          </div>

          <div className="space-y-6">
            <button
              onClick={handleLogin}
              className="w-full flex items-center justify-center gap-4 py-4 px-6 bg-white border-2 border-[#E9ECEF] rounded-2xl font-bold text-lg text-[#111827] hover:bg-[#F9FAFB] hover:border-[#4F46E5] transition-all shadow-sm active:scale-[0.98]"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-6 h-6" />
              Continue with Google
            </button>

            <div className="relative flex items-center py-4">
              <div className="flex-grow border-t border-[#E9ECEF]"></div>
              <span className="flex-shrink mx-4 text-[#9CA3AF] text-sm font-medium">or use email</span>
              <div className="flex-grow border-t border-[#E9ECEF]"></div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#374151]">Work Email</label>
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="w-full px-5 py-4 bg-[#F9FAFB] border border-[#E9ECEF] rounded-2xl text-sm focus:ring-2 focus:ring-[#4F46E5] transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#374151]">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-5 py-4 bg-[#F9FAFB] border border-[#E9ECEF] rounded-2xl text-sm focus:ring-2 focus:ring-[#4F46E5] transition-all"
                />
              </div>
            </div>

            <button className="w-full py-4 bg-[#111827] text-white rounded-2xl font-bold text-lg hover:bg-black transition-all shadow-xl shadow-gray-200 active:scale-[0.98]">
              Sign In
            </button>
          </div>

          <p className="text-center text-sm text-[#6B7280]">
            Don't have an account? <span className="text-[#4F46E5] font-bold cursor-pointer hover:underline">Contact HR Admin</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
