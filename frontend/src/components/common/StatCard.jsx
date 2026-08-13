function StatCard({ title, value, icon, color, subtitle }) {
  return (
    <div className="min-h-[220px] rounded-[30px] border border-[#E8DCCA] bg-[#FFFDF9] p-8 shadow-sm transition-all duration-300 hover:shadow-lg">

<div className="flex h-full items-center gap-8">

<div className={`flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl ${color}`}>
          {icon}
        </div>

        <div className="flex flex-col">

          <p className="text-base font-semibold text-[#6B7280]">
            {title}
          </p>

          <h2 className="mt-3 text-5xl font-bold text-[#111827]">
            {value}
          </h2>

          <p className="mt-2 text-sm text-[#6B7280]">
            {subtitle}
          </p>

        </div>

      </div>

    </div>
  );
}

export default StatCard;