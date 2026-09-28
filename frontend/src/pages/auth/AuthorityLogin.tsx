import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Shield, Eye, EyeOff, Landmark, ArrowLeft, KeyRound } from 'lucide-react';
import { Spinner } from '../../components/shared/Badges';

export default function AuthorityLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  
  const { signIn, loading, demoLogin, user, role } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (role === 'citizen') navigate('/citizen/welcome', { replace: true });
      else navigate('/authority', { replace: true });
    }
  }, [user, role, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await signIn(email, password, 'authority');
      navigate('/authority');
    } catch (err: any) {
      setError(err.message || 'Sign in failed.');
    }
  };

  const handleDemoLogin = (selectedRole: string) => {
    demoLogin(selectedRole);
    navigate('/authority');
  };

  return (
    <div className="min-h-screen bg-[#F5F0E8] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        
        <Link to="/" className="inline-flex items-center text-xs font-bold text-[#1A3028] hover:text-[#0F2018] mb-6 transition-colors">
          <ArrowLeft size={14} className="mr-1.5" /> Back to Portal Selection
        </Link>
        
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-700 to-slate-900 mb-3 shadow-lg shadow-blue-900/20">
            <Shield size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-black text-[#0F2018] uppercase tracking-wider">Landslide Watch</h1>
          <p className="text-xs text-[#1A3028] font-semibold mt-1">Disaster Management & Scientific Authority Portal</p>
        </div>

        <div className="bg-white rounded-3xl border-2 border-blue-200 shadow-md p-6 sm:p-8 space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-10 pointer-events-none"></div>
          
          <div className="text-center pb-3 border-b border-slate-200">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 mb-2.5">
              <Landmark size={24} />
            </div>
            <h2 className="text-xl font-black text-[#0F2018]">Authority Portal</h2>
            <p className="text-xs text-[#1A3028] font-medium mt-1">Authorized access for SDMA, NDMA & District Authorities</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#0F2018] mb-1.5 uppercase tracking-wider">Official Email / ID</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#C8D8BC] rounded-xl px-3.5 py-2.5 text-sm text-[#0F2018] placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-200 transition-all"
                placeholder="authority@landslidewatch.in"
                required
                autoComplete="email"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0F2018] mb-1.5 uppercase tracking-wider">Password</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#C8D8BC] rounded-xl px-3.5 py-2.5 text-sm text-[#0F2018] placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-200 transition-all pr-11"
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors"
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex justify-end text-xs pt-1">
              <button type="button" className="text-blue-700 hover:text-blue-900 font-bold">
                Forgot credentials?
              </button>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-300 rounded-xl p-2.5 text-red-700 text-xs text-center font-bold">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-black text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 transform active:scale-98"
            >
              {loading ? <><Spinner size={18} /> Authenticating...</> : 'Secure Sign In'}
            </button>
          </form>

          {/* Quick Demo Accounts */}
          <div className="pt-4 border-t border-slate-200 space-y-2.5">
            <div className="text-[11px] font-bold text-[#1A3028] uppercase tracking-wider text-center">
              Evaluator Quick-Fill Credentials
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleDemoLogin('authority')}
                className="py-2.5 px-3 rounded-xl bg-[#FAF7F2] hover:bg-blue-50 text-[#1A3028] hover:text-blue-900 font-bold text-xs transition-all border border-slate-300 hover:border-blue-400 flex items-center justify-center gap-1.5 shadow-xs"
              >
                <KeyRound size={13} className="text-blue-600" />
                <span>Demo Authority</span>
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('admin')}
                className="py-2.5 px-3 rounded-xl bg-[#FAF7F2] hover:bg-blue-50 text-[#1A3028] hover:text-blue-900 font-bold text-xs transition-all border border-slate-300 hover:border-blue-400 flex items-center justify-center gap-1.5 shadow-xs"
              >
                <KeyRound size={13} className="text-amber-600" />
                <span>Demo Admin</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
