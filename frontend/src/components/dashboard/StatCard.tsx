import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  title: string;
  value: string;
  icon: LucideIcon;
};

function StatCard ({ title, value, icon }: StatCardProps) {
  const Icon = icon;

  return (
    <div className='rounded-xl border border-slate-700 bg-slate-800 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500'>
      <div className='flex items-center justify-between'>
        <h3 className='text-sm font-medium text-slate-400'>{title}</h3>

        <div className='rounded-lg bg-slate-700 p-3'>
          <Icon size={22} className='text-cyan-400' />
        </div>
      </div>

      <p className='mt-6 text-4xl font-bold text-white'>{value}</p>
    </div>
  );
}

export default StatCard;
