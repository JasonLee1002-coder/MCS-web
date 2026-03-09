import Link from "next/link";

const clients = [
  { name: "麗嬰國際 Funbox Toys", id: "funbox" },
  { name: "麥味登 MWD（揚秦國際）", id: "mwd" },
  { name: "日本首都高速公路", id: "expressway" },
  { name: "鼎新電腦", id: "funbox" },
  { name: "靈知科技 × 長林旅店", id: "hotel" },
  { name: "玩具加乘", id: "toyplus" },
];

export default function Clients() {
  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-sm font-medium text-gray-400 uppercase tracking-widest mb-8">
          信賴銓幻元的企業夥伴
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {clients.map((c) => (
            <Link
              key={c.name}
              href={`/cases#${c.id}`}
              className="flex items-center justify-center h-20 rounded-xl border border-gray-100 hover:border-mcs-orange/30 hover:shadow-md transition-all px-4 group"
            >
              <span className="text-sm font-medium text-gray-500 group-hover:text-mcs-orange transition-colors text-center leading-tight">
                {c.name.split("（")[0].split("×")[0].trim()}
              </span>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/cases"
            className="inline-flex items-center gap-2 text-mcs-orange hover:text-mcs-orange-light font-medium text-sm transition-colors"
          >
            查看完整客戶實績
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
