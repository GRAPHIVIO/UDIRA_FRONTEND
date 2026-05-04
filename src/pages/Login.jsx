import React, { useState } from 'react';
import { BookOpen, User, Lock, ArrowRight, GraduationCap, Briefcase } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/shared';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const result = login(email, password);
    if (!result.success) {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-primary-600 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-white/10 rounded-full blur-3xl rotate-12" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-black/10 rounded-full blur-3xl -rotate-12" />
      </div>
      
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 md:p-10 relative z-10 border border-white/20">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-primary-600 flex items-center justify-center shadow-lg mx-auto mb-6 rotate-3 hover:rotate-0 transition-transform duration-300">
            <BookOpen size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">UDIRA Portal</h1>
          <p className="text-sm text-gray-500 mt-2">Enter your credentials to access your dashboard</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600 flex items-center gap-2 animate-in slide-in-from-top-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
            <div className="relative group">
              <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between ml-1">
              <label className="text-sm font-semibold text-gray-700">Password</label>
              <a href="#" className="text-xs font-medium text-primary-600 hover:underline">Forgot?</a>
            </div>
            <div className="relative group">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full py-4 text-base font-bold shadow-xl shadow-primary-500/20 group bg-primary-600 hover:bg-primary-700 text-white">
            Sign In
            <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">© 2026 UDIRA SMS • All rights reserved</p>
        </div>
      </div>
    </div>
  );
}
