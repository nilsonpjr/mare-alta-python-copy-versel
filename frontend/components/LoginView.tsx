import React, { useState } from 'react';
import { StorageService } from '../services/storage';
import { User } from '../types';
import { Anchor, Lock, Mail, ArrowRight, UserCircle } from 'lucide-react';


interface LoginViewProps {
  onLogin: (user: User) => void;
  onGoToSignup?: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin, onGoToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = StorageService.login(email, password);
    if (user) {
      onLogin(user);
    } else {
      setError('Credenciais inválidas. Verifique usuário e senha.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor - Nautical Abstract */}
      <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1566374828859-96892552e6c5?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-900 via-slate-900/90 to-blue-900/50"></div>

      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative z-10 flex flex-col">
        {/* Header */}
        <div className="bg-slate-900/50 p-8 border-b border-white/10 text-center">
          <div className="w-20 h-20 bg-gradient-to-tr from-cyan-600 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cyan-900/50 rotate-3 transform hover:rotate-6 transition-transform">
            <Anchor className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-wide">MARE ALTA</h1>
          <p className="text-cyan-200 text-sm font-medium mt-1">Gestão Náutica Especializada</p>
        </div>

        {/* Form */}
        <div className="p-8 bg-white">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email Corporativo</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-cyan-600 transition-colors" />
                </div>
                <input
                  type="email"
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all shadow-sm"
                  placeholder="seu.nome@marealta.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Senha de Acesso</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-cyan-600 transition-colors" />
                </div>
                <input
                  type="password"
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all shadow-sm"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-lg text-red-600 text-sm font-medium animate-pulse">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-cyan-200 text-sm font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all transform active:scale-[0.98]"
            >
              Acessar Sistema
              <ArrowRight className="w-4 h-4" />
            </button>

            {onGoToSignup && (
              <div className="mt-4 text-center">
                <span className="text-slate-500 text-sm">Ainda não tem conta? </span>
                <button
                  type="button"
                  onClick={onGoToSignup}
                  className="text-cyan-600 font-bold text-sm hover:underline"
                >
                  Teste Grátis
                </button>
              </div>
            )}
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100">
            <p className="text-xs text-center text-slate-400 mb-3 font-semibold uppercase">Ambiente de Demonstração</p>
            <div className="grid grid-cols-3 gap-2">
              <button onClick={() => { setEmail('admin@marealta.com'); setPassword('123456'); }} className="p-2 rounded bg-slate-50 hover:bg-slate-100 text-xs text-slate-600 border border-slate-200 transition-colors flex flex-col items-center gap-1">
                <UserCircle className="w-4 h-4 text-red-500" /> Admin
              </button>
              <button onClick={() => { setEmail('tecnico@marealta.com'); setPassword('123456'); }} className="p-2 rounded bg-slate-50 hover:bg-slate-100 text-xs text-slate-600 border border-slate-200 transition-colors flex flex-col items-center gap-1">
                <UserCircle className="w-4 h-4 text-green-500" /> Técnico
              </button>
              <button onClick={() => { setEmail('cliente@marealta.com'); setPassword('123456'); }} className="p-2 rounded bg-slate-50 hover:bg-slate-100 text-xs text-slate-600 border border-slate-200 transition-colors flex flex-col items-center gap-1">
                <UserCircle className="w-4 h-4 text-blue-500" /> Cliente
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 text-slate-500 text-xs opacity-60">
        © {new Date().getFullYear()} Mare Alta Náutica - v2.5.0
      </div>
    </div>
  );
};