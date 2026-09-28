import { useNavigate } from 'react-router-dom';
import { Shield, Users, Landmark, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useEffect } from 'react';

export default function PortalSelection() {
  const navigate = useNavigate();
  const { user, role } = useAuthStore();

  // If already logged in, redirect to correct portal
  useEffect(() => {
    if (user) {
      if (role === 'citizen') navigate('/citizen/welcome', { replace: true });
      else navigate('/authority', { replace: true });
    }
  }, [user, role, navigate]);

  return (
    <div className="min-h-screen bg-[#F5F0E8] flex flex-col items-center justify-center p-4 sm:p-8">
      {/* Logo and Header */}
      <div className="text-center mb-10 max-w-xl mx-auto">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-[#4A7C59] to-[#0F2018] mb-5 shadow-xl shadow-[#0F2018]/15">
          <Shield size={40} className="text-white" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#0F2018] uppercase tracking-wider">
          Landslide Watch
        </h1>
        <p className="text-xs sm:text-sm text-[#1A3028] mt-2 tracking-widest uppercase font-bold">
          Northeast India Early Warning & Decision-Support System
        </p>
        <p className="text-xs text-slate-600 mt-1 font-medium">
          Smart India Hackathon 2026 · Problem ID: SIH26001
        </p>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
        
        {/* CITIZEN CARD */}
        <div className="bg-white rounded-3xl border-2 border-[#C8D8BC] hover:border-[#4A7C59] transition-all duration-200 shadow-md hover:shadow-xl flex flex-col overflow-hidden group">
          <div className="flex-1 text-center py-8 px-6 space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#4A7C59]/15 text-[#4A7C59] group-hover:scale-105 transition-transform">
              <Users size={32} />
            </div>
            <div>
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-black uppercase tracking-wider border border-emerald-200 mb-2">
                Public Safety
              </div>
              <h2 className="text-2xl font-black text-[#0F2018] tracking-tight">Citizen Portal</h2>
            </div>
            <p className="text-xs sm:text-sm text-[#1A3028] leading-relaxed font-medium">
              Real-time slope stability checks, mountain corridor trip risk assessments, crowd-sourced hazard reporting, and nearby safe ground locator.
            </p>
          </div>

          <div className="p-5 border-t border-[#C8D8BC] bg-[#FAF7F2]">
            <button
              onClick={() => navigate('/citizen/login')}
              className="w-full py-3.5 px-4 rounded-2xl bg-[#4A7C59] hover:bg-[#1A3028] text-white font-black text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 transform active:scale-98"
            >
              <span>Enter Citizen Portal</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* AUTHORITY CARD */}
        <div className="bg-white rounded-3xl border-2 border-blue-200 hover:border-blue-600 transition-all duration-200 shadow-md hover:shadow-xl flex flex-col overflow-hidden group">
          <div className="flex-1 text-center py-8 px-6 space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-50 text-blue-700 group-hover:scale-105 transition-transform">
              <Landmark size={32} />
            </div>
            <div>
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 text-[10px] font-black uppercase tracking-wider border border-blue-200 mb-2">
                Official Access
              </div>
              <h2 className="text-2xl font-black text-[#0F2018] tracking-tight">Authority Portal</h2>
            </div>
            <p className="text-xs sm:text-sm text-[#1A3028] leading-relaxed font-medium">
              Multi-factor GIS risk maps, 24h/72h rainfall radars, P1–P4 operational priority engine, task dispatch, and automated historical backtesting.
            </p>
          </div>

          <div className="p-5 border-t border-blue-100 bg-[#F6F8FA]">
            <button
              onClick={() => navigate('/authority/login')}
              className="w-full py-3.5 px-4 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white font-black text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 transform active:scale-98"
            >
              <span>Enter Authority Portal</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
