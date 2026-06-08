type KpiCardProps = {
  label: string;
  value: string;
  detail: string;
};

function KpiCard({ label, value, detail }: KpiCardProps) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">{label}</p>

      <p className="mt-3 text-3xl font-bold">
        {value}
      </p>

      <p className="mt-2 text-sm text-slate-500">
        {detail}
      </p>
    </div>
  );
}

export default KpiCard;