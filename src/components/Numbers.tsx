const stats = [
  { number: "20+", label: "品牌販賣機部署", sub: "麗嬰國際 Funbox" },
  { number: "7+", label: "跨產業成功案例", sub: "餐飲·玩具·旅宿·宮廟" },
  { number: "100%", label: "台灣設計製造", sub: "品質嚴格把關" },
  { number: "JP", label: "外銷日本實績", sub: "首都高速公路服務區" },
];

export default function Numbers() {
  return (
    <section className="py-16 bg-gradient-to-r from-mcs-blue-dark to-mcs-blue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-mcs-orange mb-2">
                {s.number}
              </div>
              <div className="text-white font-medium mb-1">{s.label}</div>
              <div className="text-gray-400 text-sm">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
