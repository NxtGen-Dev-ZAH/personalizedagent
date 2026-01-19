type MetricCardProps = {
  label: string;
  value: string;
  delta?: string;
  trend?: "up" | "down" | "steady";
};

export function MetricCard({ label, value, delta, trend = "steady" }: MetricCardProps) {
  const trendColor =
    trend === "up"
      ? "text-emerald-300"
      : trend === "down"
        ? "text-rose-300"
        : "text-slate-300";

  return (
    <div className="glass-panel p-5 transition hover:border-white/20 hover:bg-white/10">
      <p className="text-xs uppercase tracking-[0.4em] text-white/50">{label}</p>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-3xl font-semibold text-white">{value}</p>
        {delta && <span className={`text-sm font-medium ${trendColor}`}>{delta}</span>}
      </div>
    </div>
  );
}

