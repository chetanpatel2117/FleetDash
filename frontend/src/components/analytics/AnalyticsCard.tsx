interface AnalyticsCardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  color: string;
}

function AnalyticsCard ({ title, value, subtitle, color }: AnalyticsCardProps) {
  return (
    <div className='rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md'>
      <div className='flex items-center justify-between'>
        <div>
          <p className='text-sm text-slate-500'>{title}</p>

          <h2 className='mt-2 text-3xl font-bold text-slate-800'>{value}</h2>

          {subtitle && <p className='mt-2 text-sm text-slate-400'>{subtitle}</p>}
        </div>

        <div className={`h-4 w-4 rounded-full ${color}`} />
      </div>
    </div>
  );
}

export default AnalyticsCard;
