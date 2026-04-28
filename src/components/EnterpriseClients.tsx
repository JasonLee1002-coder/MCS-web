"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const DATA = {
  zh: {
    label: "企業客戶實績",
    title: "已驗證的落地實績",
    sub: "從台灣最大超商到日本高速公路，MCS 在不同場域持續驗證整合能力。",
    anchor: { label: "錨定客戶", title: "東方美集團 × OmniCore 全通路自助化", badge: "970+ 門市 · 台灣指標早午餐連鎖", role: "MCS 角色：軟體整合商 + 平台提供商", sub: "MCS 是協助 970+ 連鎖門市完成全通路「自助化」的技術夥伴。GraBox 取餐、LINE 點餐到 192 台配送車調度，全部透過 OmniCore 統一串接，IT 成本僅需自建的 5–12%。", stats: [{ num: "970+", label: "連鎖門市" }, { num: "50台", label: "2026 H2 首批 GraBox" }, { num: "192台", label: "配送車 GPS 調度" }, { num: "5-12%", label: "IT 成本比" }] },
    clients: [
      { name: "全家超商 FamilyMart", badge: "台灣最大連鎖超商", color: "bg-[#1B3A5C]", stats: ["200+ 台部署（2026起）", "整合全家 POS 系統", "科學園區 / 大學 / 觀光飯店"] },
      { name: "麥味登", badge: "台灣最大早餐連鎖之一", color: "bg-[#E8751A]", stats: ["90 天完整整合（含硬體）", "贏過外國知名大廠競標", "UV 殺菌 + 雷射感應旗艦版"] },
      { name: "日本首都高速道路", badge: "NDA + MOU 已簽訂", color: "bg-[#1a7a4a]", stats: ["PSE 認證進行中", "MPS Japan 支付整合", "SA/PA 877 據點展開計畫"] },
    ],
    more: ["必勝客", "麗嬰國際", "昇恆昌機場", "台灣高鐵", "N&W Group", "全省 15 個郵局", "霹靂布袋戲", "滙聚食品"],
    si: {
      title: "上市公司 SI 夥伴",
      sub: "三家上市公司共同推廣、安裝、維護 MCS 設備",
      items: [
        { name: "華經資訊", stock: "2468.TW", role: "全家超商 SI", scope: "業務推廣 · 安裝 · 維護" },
        { name: "永璋科技", stock: "4523.TW", role: "麥味登 GraBox SI", scope: "業務推廣 · 安裝 · 維護" },
        { name: "精誠資訊", stock: "6214.TW", role: "金流整合商", scope: "EMV · 行動支付 · 電子發票" },
      ],
    },
    japan: { title: "日本夥伴", name: "SUN Electronics Japan", role: "PSE 認證 · 系統整合 · 日本通路", badge: "微勤多年合作夥伴" },
  },
  en: {
    label: "Enterprise Client Track Record",
    title: "Proven Deployments",
    sub: "From Taiwan's largest convenience chain to Japan's expressways, MCS validates integration capabilities across diverse venues.",
    anchor: { label: "Anchor Client", title: "EB+ Group × OmniCore Omnichannel Automation", badge: "970+ Locations · Taiwan's #1 Breakfast Chain", role: "MCS Role: Software Integrator + Platform Provider", sub: "MCS is the technology partner enabling 970+ breakfast chain locations to step away from manual workflows. GraBox pickup, LINE ordering, and 192-vehicle fleet dispatch — all unified through OmniCore at just 5–12% of self-build IT cost.", stats: [{ num: "970+", label: "Chain Locations" }, { num: "50 Units", label: "First GraBox Batch H2 2026" }, { num: "192 Trucks", label: "GPS Fleet Dispatch" }, { num: "5-12%", label: "of Self-Build IT Cost" }] },
    clients: [
      { name: "FamilyMart Taiwan", badge: "Taiwan's Largest Convenience Chain", color: "bg-[#1B3A5C]", stats: ["200+ units (from 2026)", "Full FamilyMart POS integration", "Science parks / Universities / Hotels"] },
      { name: "MWD Breakfast Chain", badge: "One of Taiwan's Top Breakfast Chains", color: "bg-[#E8751A]", stats: ["90-day full integration (incl. hardware)", "Won over a major Japanese competitor", "UV sterilization + laser sensor flagship"] },
      { name: "Shuto Expressway Japan", badge: "NDA + MOU Signed", color: "bg-[#1a7a4a]", stats: ["PSE certification in progress", "MPS Japan payment integration", "SA/PA 877-location expansion roadmap"] },
    ],
    more: ["Pizza Hut", "Lihpao International", "Everrich Duty Free", "Taiwan HSR", "N&W Group", "15 Post Offices", "Pili Animation", "Huiju Food"],
    si: {
      title: "Listed-Company SI Partners",
      sub: "Three public companies co-promoting, installing, and maintaining MCS equipment",
      items: [
        { name: "Huajing Information", stock: "2468.TW", role: "FamilyMart SI", scope: "Sales · Installation · Maintenance" },
        { name: "Yongzhang Technology", stock: "4523.TW", role: "MWD GraBox SI", scope: "Sales · Installation · Maintenance" },
        { name: "Systex Corporation", stock: "6214.TW", role: "Payment Integrator", scope: "EMV · Mobile Pay · E-Invoice" },
      ],
    },
    japan: { title: "Japan Partner", name: "SUN Electronics Japan", role: "PSE Certification · System Integration · Japan Channel", badge: "Long-term WECHE partner" },
  },
  ja: {
    label: "エンタープライズ実績",
    title: "実証済み導入実績",
    sub: "台湾最大のコンビニチェーンから日本の高速道路まで、MCSは多様な拠点で統合能力を実証しています。",
    anchor: { label: "アンカークライアント", title: "EB+グループ × OmniCoreオムニチャネル自動化", badge: "970+店舗 · 台湾No.1朝食チェーン", role: "MCS役割：ソフトウェアインテグレーター＋プラットフォームプロバイダー", sub: "MCSは970+の朝食チェーン店舗が手動業務から解放されるための技術パートナーです。GraBox受取、LINE注文、192台の配送車GPS管理——すべてOmniCoreで統合、自社構築比5〜12%のコストで実現。", stats: [{ num: "970+", label: "チェーン店舗" }, { num: "50台", label: "初回GraBoxバッチ 2026H2" }, { num: "192台", label: "GPS配送車管理" }, { num: "5-12%", label: "自社IT費用比" }] },
    clients: [
      { name: "ファミリーマート台湾", badge: "台湾最大コンビニチェーン", color: "bg-[#1B3A5C]", stats: ["200台+導入（2026年〜）", "ファミリーマートPOS完全統合", "サイエンスパーク / 大学 / ホテル"] },
      { name: "MWD朝食チェーン", badge: "台湾トップ朝食チェーンの一つ", color: "bg-[#E8751A]", stats: ["90日で完全統合（ハード含む）", "日本大手競合に勝利", "UV殺菌＋レーザーセンサーフラッグシップ"] },
      { name: "首都高速道路日本", badge: "NDA＋MOU締結済", color: "bg-[#1a7a4a]", stats: ["PSE認証進行中", "MPS Japan決済統合", "SA/PA 877拠点展開ロードマップ"] },
    ],
    more: ["ピザハット", "麗嬰国際", "エバーリッチ免税", "台湾新幹線", "N&Wグループ", "郵便局15か所", "霹靂動画", "滙聚食品"],
    si: {
      title: "上場企業SIパートナー",
      sub: "3社の上場企業がMCS機器の販促・設置・保守を担当",
      items: [
        { name: "華経資訊", stock: "2468.TW", role: "ファミリーマートSI", scope: "営業・設置・保守" },
        { name: "永璋科技", stock: "4523.TW", role: "MWD GraBox SI", scope: "営業・設置・保守" },
        { name: "精誠資訊", stock: "6214.TW", role: "決済インテグレーター", scope: "EMV・モバイル決済・電子請求書" },
      ],
    },
    japan: { title: "日本パートナー", name: "SUN Electronics Japan", role: "PSE認証 · システム統合 · 日本チャネル", badge: "WECHE長期合作パートナー" },
  },
  id: {
    label: "Rekam Jejak Klien Enterprise",
    title: "Implementasi yang Terbukti",
    sub: "Dari jaringan minimarket terbesar Taiwan hingga jalan tol Jepang, MCS memvalidasi kemampuan integrasi di berbagai venue.",
    anchor: { label: "Klien Anchor", title: "EB+ Group × Otomasi Omnichannel OmniCore", badge: "970+ Lokasi · Rantai Sarapan #1 Taiwan", role: "Peran MCS: Integrator Perangkat Lunak + Penyedia Platform", sub: "MCS adalah mitra teknologi yang memungkinkan 970+ lokasi rantai sarapan beralih dari alur kerja manual. GraBox pickup, pemesanan LINE, dan pengiriman armada 192 kendaraan — semua disatukan melalui OmniCore hanya 5–12% dari biaya IT mandiri.", stats: [{ num: "970+", label: "Lokasi Rantai" }, { num: "50 Unit", label: "Batch GraBox Pertama H2 2026" }, { num: "192 Truk", label: "Manajemen Armada GPS" }, { num: "5-12%", label: "dari Biaya IT Mandiri" }] },
    clients: [
      { name: "FamilyMart Taiwan", badge: "Jaringan Minimarket Terbesar Taiwan", color: "bg-[#1B3A5C]", stats: ["200+ unit (dari 2026)", "Integrasi penuh FamilyMart POS", "Science parks / Universitas / Hotel"] },
      { name: "MWD Breakfast Chain", badge: "Salah Satu Rantai Sarapan Terbaik Taiwan", color: "bg-[#E8751A]", stats: ["Integrasi 90 hari (termasuk hardware)", "Mengalahkan pesaing Jepang ternama", "UV sterilisasi + sensor laser"] },
      { name: "Shuto Expressway Jepang", badge: "NDA + MOU Ditandatangani", color: "bg-[#1a7a4a]", stats: ["Sertifikasi PSE sedang berlangsung", "Integrasi pembayaran MPS Japan", "Peta jalan ekspansi 877 lokasi"] },
    ],
    more: ["Pizza Hut", "Lihpao International", "Everrich Duty Free", "Taiwan HSR", "N&W Group", "15 Kantor Pos", "Pili Animation", "Huiju Food"],
    si: {
      title: "Mitra SI Perusahaan Tercatat",
      sub: "Tiga perusahaan publik mempromosikan, memasang, dan memelihara perangkat MCS",
      items: [
        { name: "Huajing Information", stock: "2468.TW", role: "FamilyMart SI", scope: "Penjualan · Instalasi · Pemeliharaan" },
        { name: "Yongzhang Technology", stock: "4523.TW", role: "MWD GraBox SI", scope: "Penjualan · Instalasi · Pemeliharaan" },
        { name: "Systex Corporation", stock: "6214.TW", role: "Integrator Pembayaran", scope: "EMV · Pembayaran Mobile · E-Faktur" },
      ],
    },
    japan: { title: "Mitra Jepang", name: "SUN Electronics Japan", role: "Sertifikasi PSE · Integrasi Sistem · Saluran Jepang", badge: "Mitra jangka panjang WECHE" },
  },
};

export default function EnterpriseClients() {
  const { lang } = useLanguage();
  const d = DATA[lang] ?? DATA.zh;

  return (
    <section id="enterprise" className="py-24 bg-[#111820]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <FadeIn className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-mcs-orange/10 border border-mcs-orange/30 text-mcs-orange text-sm font-semibold mb-4">
            {d.label}
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">{d.title}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">{d.sub}</p>
        </FadeIn>

        {/* Anchor client — EB+ */}
        <FadeIn delay={0.05} className="mb-12">
          <div className="rounded-2xl overflow-hidden border border-white/10">
            <div className="bg-gradient-to-r from-[#1B3A5C] to-[#0e2035] px-6 py-5 flex items-center justify-between flex-wrap gap-3 relative">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-mcs-orange" />
              <div className="pl-2">
                <span className="text-xs font-bold bg-mcs-orange/80 text-white px-2.5 py-0.5 rounded-full mr-3">{d.anchor.label}</span>
                <span className="font-black text-xl text-white">{d.anchor.title}</span>
              </div>
              <span className="text-sm text-white/70 bg-white/10 border border-white/20 px-3 py-1 rounded-full">{d.anchor.badge}</span>
            </div>
            <div className="bg-white/3 p-6">
              <p className="text-sm text-mcs-orange font-semibold mb-3">{d.anchor.role}</p>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">{d.anchor.sub}</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {d.anchor.stats.map((s) => (
                  <div key={s.label} className="text-center glass-card rounded-xl p-3">
                    <div className="text-2xl font-bold text-mcs-orange">{s.num}</div>
                    <div className="text-xs text-gray-400 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* 3 key client cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {d.clients.map((c, i) => (
            <FadeIn key={c.name} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -4 }}
                className="rounded-xl overflow-hidden border border-white/10 h-full flex flex-col"
              >
                <div className={`${c.color} px-5 py-4 relative`}>
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-mcs-orange" />
                  <div className="pl-2">
                    <div className="text-xs font-bold text-white/60 mb-1">{c.badge}</div>
                    <div className="font-black text-white text-lg leading-snug">{c.name}</div>
                  </div>
                </div>
                <div className="bg-white/5 p-5 flex-1">
                  <ul className="space-y-2">
                    {c.stats.map((s) => (
                      <li key={s} className="text-xs text-gray-300 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-mcs-orange flex-shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        {/* More clients chips */}
        <FadeIn delay={0.1} className="mb-16">
          <div className="flex flex-wrap gap-2 justify-center">
            {d.more.map((name) => (
              <span key={name} className="px-3 py-1.5 rounded-full border border-white/20 text-white/60 text-xs bg-white/5">
                {name}
              </span>
            ))}
          </div>
        </FadeIn>

        {/* SI partners — listed companies */}
        <FadeIn delay={0.05} className="mb-8">
          <div className="rounded-2xl border border-white/10 bg-white/3 p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">{d.si.title}</h3>
              <p className="text-gray-400 text-sm">{d.si.sub}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {d.si.items.map((item, i) => (
                <FadeIn key={item.name} delay={i * 0.08}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="rounded-xl border border-white/10 bg-white/5 p-5 flex flex-col gap-3"
                  >
                    <div>
                      <div className="font-bold text-white text-base">{item.name}</div>
                      <div className="text-xs text-mcs-orange font-semibold">{item.stock}</div>
                    </div>
                    <div className="text-sm text-gray-300 font-medium">{item.role}</div>
                    <div className="text-xs text-gray-500">{item.scope}</div>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Japan partner */}
        <FadeIn delay={0.1}>
          <div className="rounded-xl border border-[#1a7a4a]/40 bg-[#1a7a4a]/5 p-5 flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="text-xs text-[#4ade80] font-semibold mb-1">{d.japan.title}</div>
              <div className="font-bold text-white text-lg">{d.japan.name}</div>
              <div className="text-sm text-gray-400">{d.japan.role}</div>
            </div>
            <span className="text-xs border border-[#1a7a4a]/60 text-[#4ade80] px-3 py-1.5 rounded-full">{d.japan.badge}</span>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
