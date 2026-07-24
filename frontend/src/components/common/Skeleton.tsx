interface SkeletonProps {
  className?: string;
}

function Skeleton ({ className = "" }: SkeletonProps) {
  return <div className={`animate-pulse rounded-lg bg-slate-700/40 ${className}`} />;
}

export default Skeleton;
