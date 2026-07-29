import { Navigate } from "react-router-dom";
import { ShieldCheck, UserRound, BadgeCheck } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function ProfilePage() {
  const { user, logout } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950 px-6 py-8 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/30 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">Account profile</p>
            <h1 className="mt-2 text-3xl font-semibold">{user.username}</h1>
            <p className="mt-2 text-sm text-slate-400">Manage your FleetDash account details and access level.</p>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-3 text-cyan-200">
            <ShieldCheck className="h-5 w-5" />
            <span className="text-sm font-medium">{user.role.toUpperCase()}</span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/20">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600">
                <UserRound className="h-7 w-7 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Signed-in user</h2>
                <p className="text-sm text-slate-400">Authenticated through FleetDash</p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Username</p>
                <p className="mt-2 text-lg font-semibold text-white">{user.username}</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Role</p>
                <p className="mt-2 text-lg font-semibold text-white">{user.role}</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 sm:col-span-2">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Status</p>
                <div className="mt-3 flex items-center gap-2 text-sm text-emerald-400">
                  <BadgeCheck className="h-4 w-4" />
                  Active session
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/20">
            <h2 className="text-xl font-semibold">Quick actions</h2>
            <p className="mt-2 text-sm text-slate-400">Review your access and manage your session.</p>

            <button
              onClick={logout}
              className="mt-6 w-full rounded-2xl bg-red-500/15 px-4 py-3 text-sm font-medium text-red-300 transition hover:bg-red-500/25"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
