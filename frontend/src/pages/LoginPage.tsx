import { useEffect, useRef, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  Eye,
  EyeOff,
  Truck,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const navigate = useNavigate();
  const { login, isAdmin } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const ok = await login(username.trim(), password, remember);

    setLoading(false);

    if (!ok) {
      setError("Unable to sign in right now. Please verify the backend URL and credentials.");
    }
  };

  useEffect(() => {
    if (isAdmin) {
      navigate("/", { replace: true });
      return;
    }

    usernameRef.current?.focus();
  }, [isAdmin, navigate]);


  return (
    <div className="relative min-h-screen overflow-hidden bg-[#07111f] text-white">
      <style>{`
        @keyframes float-card {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes pulse-ring {
          0% { transform: scale(0.95); opacity: 0.7; }
          100% { transform: scale(1.05); opacity: 0.2; }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-6px); }
          50% { transform: translateX(6px); }
          75% { transform: translateX(-3px); }
        }

        .float-card { animation: float-card 4s ease-in-out infinite; }
        .pulse-ring { animation: pulse-ring 3s ease-in-out infinite; }
        .shake { animation: shake 0.35s ease-in-out; }
      `}</style>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(6,182,212,0.18),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(37,99,235,0.2),_transparent_35%)]" />
        <div className="absolute left-[-8%] top-[-10%] h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-5%] h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:42px_42px]" />
      </div>

      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg shadow-cyan-500/20">
            <Truck className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-base font-semibold tracking-wide text-white">FleetDash</p>
            <p className="text-xs text-slate-400">Enterprise Logistics</p>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto flex min-h-[calc(100vh-88px)] max-w-7xl items-center px-4 pb-8 sm:px-6 lg:px-8">
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="hidden lg:flex lg:flex-col lg:justify-center">
            <div className="max-w-xl">

            
              <div className="mt-8 rounded-[28px] border border-white/10 bg-slate-950/40 p-5 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl">
                <div className="float-card relative overflow-hidden rounded-[24px] border border-cyan-400/20 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-4">
                  <div className="pulse-ring absolute inset-0 rounded-[24px] border border-cyan-400/20" />
                  <svg viewBox="0 0 420 280" className="relative h-auto w-full" aria-label="Fleet analytics illustration">
                    <rect x="38" y="44" width="344" height="192" rx="22" fill="#0f172a" stroke="rgba(255,255,255,0.08)" />
                    <path d="M86 184c28-52 54-82 98-82 40 0 63 23 93 57" stroke="#22c55e" strokeWidth="3" fill="none" strokeLinecap="round" />
                    <path d="M86 202c24-34 48-52 72-54 30-2 44 11 77 49" stroke="#06b6d4" strokeWidth="3" fill="none" strokeLinecap="round" />
                    <circle cx="123" cy="148" r="8" fill="#06b6d4" />
                    <circle cx="199" cy="122" r="8" fill="#2563eb" />
                    <circle cx="267" cy="160" r="8" fill="#22c55e" />
                    <circle cx="325" cy="118" r="10" fill="#f59e0b" />
                    <circle cx="145" cy="208" r="14" fill="#0f172a" stroke="#22c55e" strokeWidth="3" />
                    <rect x="86" y="82" width="84" height="50" rx="12" fill="#111827" stroke="#2563eb" />
                    <path d="M104 108h48" stroke="#f8fafc" strokeLinecap="round" />
                    <path d="M104 122h28" stroke="#94a3b8" strokeLinecap="round" />
                    <rect x="194" y="84" width="92" height="46" rx="12" fill="#111827" stroke="#06b6d4" />
                    <path d="M212 109h56" stroke="#f8fafc" strokeLinecap="round" />
                    <path d="M212 121h24" stroke="#94a3b8" strokeLinecap="round" />
                    <rect x="292" y="86" width="50" height="50" rx="14" fill="#111827" stroke="#22c55e" />
                    <path d="M306 108h20" stroke="#f8fafc" strokeLinecap="round" />
                    <path d="M306 122h12" stroke="#94a3b8" strokeLinecap="round" />
                    <path d="M110 192l42-35 35 26 37-22 49 25" stroke="#ffffff" strokeOpacity="0.6" strokeWidth="2" fill="none" strokeLinecap="round" />
                    <path d="M96 204h236" stroke="rgba(255,255,255,0.12)" strokeWidth="2" strokeDasharray="4 6" />
                  </svg>
                </div>
              </div>
            </div>
          </section>

          <section className="flex justify-center">
            <div className={`w-full max-w-lg rounded-[32px] border border-white/10 bg-white/10 p-6 shadow-2xl shadow-slate-950/50 backdrop-blur-xl sm:p-8 ${error ? "shake" : ""}`}>
              <div className="mb-6">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-200">
                  <Building2 className="h-4 w-4" />
                  Secure admin access
                </div>
                <h2 className="text-3xl font-semibold text-white">Welcome Back</h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">Login to your FleetDash account and continue managing your fleet.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="username">
                   Username & Email Address 
                  </label>
                  <div className="relative">
                    <input
                      id="username"
                      ref={usernameRef}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3.5 pr-4 text-sm text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
                      autoComplete="email"
                      placeholder="admin@fleetdash.com"
                      aria-label="Email Address"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="password">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3.5 pr-12 text-sm text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      aria-label="Password"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
                      aria-pressed={showPassword}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {error ? (
                  <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300" role="alert" aria-live="assertive">
                    {error}
                  </div>
                ) : null}

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <label className="flex items-center gap-2 text-sm text-slate-300">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      className="h-4 w-4 rounded border-white/10 bg-slate-900 text-cyan-500 focus:ring-cyan-400"
                      aria-checked={remember}
                    />
                    Remember me
                  </label>

                  <button type="button" className="text-sm font-medium text-cyan-300 transition hover:text-cyan-200">
                    Forgot password?
                  </button>
                </div>

                <button
                  disabled={loading || !username.trim() || !password}
                  type="submit"
                  className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-3.5 font-semibold text-white shadow-lg shadow-cyan-600/20 transition hover:translate-y-[-1px] hover:shadow-cyan-600/30 disabled:cursor-not-allowed disabled:opacity-60"
                  aria-disabled={loading || !username.trim() || !password}
                >
                  {loading ? (
                    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                  ) : (
                    <ArrowRight className="h-5 w-5 transition group-hover:translate-x-0.5" />
                  )}
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </form>

              <div className="my-6 flex items-center gap-3">
                <span className="text-xs tracking-[0.3em] text-slate-500">Demo :- username : admin & password :admin123</span>
              </div>    
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
