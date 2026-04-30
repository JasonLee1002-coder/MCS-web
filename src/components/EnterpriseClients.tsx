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
    sub: "從台灣知名連鎖通路到日本高速公路，MCS 在不同場域持續驗證整合能力。",
    clients: [
      {
        name: "台灣知名連鎖超商",
        badge: "台灣最大連鎖超商",
        color: "bg-[#1B3A5C]",
        accentColor: "#3B82F6",
        stats: ["上百台部署"],
      },
      {
        name: "麥味登",
        badge: "台灣最大早餐連鎖之一",
        color: "bg-[#9A3B1A]",
        accentColor: "#E8751A",
        stats: ["90 天完整整合（含硬體）", "贏過外國知名大廠競標", "UV 殺菌 + 雷射感應旗艦版"],
      },
      {
        name: "東方美集團",
        badge: "970+ 門市 · 早午餐連鎖",
        color: "bg-[#7B4A1A]",
        accentColor: "#F59E0B",
        stats: ["50台 2026 H2 GraBox 首批", "192台配送車 GPS 調度", "LINE點餐→GraBox取餐 OMO"],
      },
      {
        name: "翔耀實業集團",
        badge: "特定場域 · 軍事/移工/工廠",
        color: "bg-[#0A4A50]",
        accentColor: "#06B6D4",
        stats: ["軍事基地 · 移工宿舍 · 工廠", "悠遊卡移工友善支付", "OmniCore 遠端補貨預測"],
      },
      {
        name: "日本首都高速道路",
        badge: "NDA + MOU 已簽訂",
        color: "bg-[#1a4a2e]",
        accentColor: "#10B981",
        stats: ["PSE 認證進行中", "MPS Japan 支付整合", "SA/PA 877 據點展開計畫"],
      },
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
    sub: "From Taiwan's leading retail chains to Japan's expressways, MCS validates integration capabilities across diverse venues.",
    clients: [
      {
        name: "Leading Convenience Chain",
        badge: "Taiwan's Largest Convenience Chain",
        color: "bg-[#1B3A5C]",
        accentColor: "#3B82F6",
        stats: ["Hundreds of units deployed"],
      },
      {
        name: "MWD Breakfast Chain",
        badge: "One of Taiwan's Top Breakfast Chains",
        color: "bg-[#9A3B1A]",
        accentColor: "#E8751A",
        stats: ["90-day full integration (incl. hardware)", "Won over a major Japanese competitor", "UV sterilization + laser sensor flagship"],
      },
      {
        name: "EB+ Group",
        badge: "970+ Locations · Breakfast Chain",
        color: "bg-[#7B4A1A]",
        accentColor: "#F59E0B",
        stats: ["50 GraBox units H2 2026 (first batch)", "192-truck GPS fleet dispatch", "LINE order → GraBox pickup OMO"],
      },
      {
        name: "Xiangyao Group",
        badge: "Targeted Venue · Military/Workers/Factories",
        color: "bg-[#0A4A50]",
        accentColor: "#06B6D4",
        stats: ["Military bases · Migrant dorms · Factories", "EasyCard — migrant worker-friendly", "OmniCore AI restocking prediction"],
      },
      {
        name: "Shuto Expressway Japan",
        badge: "NDA + MOU Signed",
        color: "bg-[#1a4a2e]",
        accentColor: "#10B981",
        stats: ["PSE certification in progress", "MPS Japan payment integration", "SA/PA 877-location expansion roadmap"],
      },
    ],
    more: ["Pizza Hut", "Lihpao International", "Everrich Duty Free", "Taiwan HSR", "N&W Group", "15 Post Offices", "Pili Animation", "Huiju Food"],
    si: {
      title: "Listed-Company SI Partners",
      sub: "Three public companies co-promoting, installing, and maintaining MCS equipment",
      items: [
        { name: "Huajing Information", stock: "2468.TW", role: "超商通路 SI", scope: "Sales · Installation · Maintenance" },
        { name: "Yongzhang Technology", stock: "4523.TW", role: "MWD GraBox SI", scope: "Sales · Installation · Maintenance" },
        { name: "Systex Corporation", stock: "6214.TW", role: "Payment Integrator", scope: "EMV · Mobile Pay · E-Invoice" },
      ],
    },
    japan: { title: "Japan Partner", name: "SUN Electronics Japan", role: "PSE Certification · System Integration · Japan Channel", badge: "Long-term WECHE partner" },
  },
  ja: {
    label: "エンタープライズ実績",
    title: "実証済み導入実績",
    sub: "台湾の大手小売チェーンから日本の高速道路まで、MCSは多様な拠点で統合能力を実証しています。",
    clients: [
      {
        name: "台湾大手コンビニチェーン",
        badge: "台湾最大コンビニチェーン",
        color: "bg-[#1B3A5C]",
        accentColor: "#3B82F6",
        stats: ["数百台を導入済み"],
      },
      {
        name: "MWD朝食チェーン",
        badge: "台湾トップ朝食チェーンの一つ",
        color: "bg-[#9A3B1A]",
        accentColor: "#E8751A",
        stats: ["90日で完全統合（ハード含む）", "日本大手競合に勝利", "UV殺菌＋レーザーセンサーフラッグシップ"],
      },
      {
        name: "EB+グループ",
        badge: "970+店舗 · 朝食チェーン",
        color: "bg-[#7B4A1A]",
        accentColor: "#F59E0B",
        stats: ["50台 2026年H2 GraBox初回", "192台GPS配送車管理", "LINE注文→GraBox受取 OMO"],
      },
      {
        name: "翔耀実業グループ",
        badge: "特定拠点 · 軍・寮・工場",
        color: "bg-[#0A4A50]",
        accentColor: "#06B6D4",
        stats: ["軍事基地・移民労働者寮・工場", "悠遊カード——スマホ不要", "OmniCore AI補充予測"],
      },
      {
        name: "首都高速道路日本",
        badge: "NDA＋MOU締結済",
        color: "bg-[#1a4a2e]",
        accentColor: "#10B981",
        stats: ["PSE認証進行中", "MPS Japan決済統合", "SA/PA 877拠点展開ロードマップ"],
      },
    ],
    more: ["ピザハット", "麗嬰国際", "エバーリッチ免税", "台湾新幹線", "N&Wグループ", "郵便局15か所", "霹靂動画", "滙聚食品"],
    si: {
      title: "上場企業SIパートナー",
      sub: "3社の上場企業がMCS機器の販促・設置・保守を担当",
      items: [
        { name: "華経資訊", stock: "2468.TW", role: "超商通路 SI", scope: "営業・設置・保守" },
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
    clients: [
      {
        name: "Jaringan Minimarket Terkemuka",
        badge: "Jaringan Minimarket Terbesar Taiwan",
        color: "bg-[#1B3A5C]",
        accentColor: "#3B82F6",
        stats: ["Ratusan unit telah terpasang"],
      },
      {
        name: "MWD Breakfast Chain",
        badge: "Salah Satu Rantai Sarapan Terbaik Taiwan",
        color: "bg-[#9A3B1A]",
        accentColor: "#E8751A",
        stats: ["Integrasi 90 hari (termasuk hardware)", "Mengalahkan pesaing Jepang ternama", "UV sterilisasi + sensor laser"],
      },
      {
        name: "EB+ Group",
        badge: "970+ Lokasi · Rantai Sarapan",
        color: "bg-[#7B4A1A]",
        accentColor: "#F59E0B",
        stats: ["50 unit GraBox H2 2026 (batch pertama)", "Pengiriman armada GPS 192 truk", "Pesan LINE → ambil GraBox OMO"],
      },
      {
        name: "Xiangyao Group",
        badge: "Venue Tertarget · Militer/Pekerja/Pabrik",
        color: "bg-[#0A4A50]",
        accentColor: "#06B6D4",
        stats: ["Pangkalan militer · Asrama pekerja migran · Pabrik", "EasyCard — ramah pekerja migran", "Prediksi pengisian OmniCore AI"],
      },
      {
        name: "Shuto Expressway Jepang",
        badge: "NDA + MOU Ditandatangani",
        color: "bg-[#1a4a2e]",
        accentColor: "#10B981",
        stats: ["Sertifikasi PSE sedang berlangsung", "Integrasi pembayaran MPS Japan", "Peta jalan ekspansi 877 lokasi"],
      },
    ],
    more: ["Pizza Hut", "Lihpao International", "Everrich Duty Free", "Taiwan HSR", "N&W Group", "15 Kantor Pos", "Pili Animation", "Huiju Food"],
    si: {
      title: "Mitra SI Perusahaan Tercatat",
      sub: "Tiga perusahaan publik mempromosikan, memasang, dan memelihara perangkat MCS",
      items: [
        { name: "Huajing Information", stock: "2468.TW", role: "超商通路 SI", scope: "Penjualan · Instalasi · Pemeliharaan" },
        { name: "Yongzhang Technology", stock: "4523.TW", role: "MWD GraBox SI", scope: "Penjualan · Instalasi · Pemeliharaan" },
        { name: "Systex Corporation", stock: "6214.TW", role: "Integrator Pembayaran", scope: "EMV · Pembayaran Mobile · E-Faktur" },
      ],
    },
    japan: { title: "Mitra Jepang", name: "SUN Electronics Japan", role: "Sertifikasi PSE · Integrasi Sistem · Saluran Jepang", badge: "Mitra jangka panjang WECHE" },
  },
};

export default function EnterpriseClients() {
  const { lang } = useLanguage();
  const d = DATA[lang as keyof typeof DATA] ?? DATA.zh;

  return (
    <section id="enterprise" className="py-24 bg-[#111820]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <FadeIn className="text-center mb-14">
          <div className="inline-block px-4 py-1.5 rounded-full bg-mcs-orange/10 border border-mcs-orange/30 text-mcs-orange text-sm font-semibold mb-4">
            {d.label}
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">{d.title}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">{d.sub}</p>
        </FadeIn>

        {/* 5 client cards — 3 col grid, last row centered */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {d.clients.map((c, i) => (
            <FadeIn key={c.name} delay={i * 0.07}>
              <motion.div
                whileHover={{ y: -5, boxShadow: `0 8px 32px ${c.accentColor}22` }}
                className="rounded-2xl overflow-hidden border border-white/10 h-full flex flex-col transition-shadow"
              >
                {/* Card header */}
                <div className={`${c.color} px-5 py-4 relative`}>
                  {/* Left accent bar */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1"
                    style={{ background: c.accentColor }}
                  />
                  <div className="pl-2">
                    <div className="text-xs font-semibold mb-1" style={{ color: c.accentColor }}>
                      {c.badge}
                    </div>
                    <div className="font-black text-white text-lg leading-snug">{c.name}</div>
                  </div>
                </div>

                {/* Card body */}
                <div className="bg-white/[0.04] p-5 flex-1">
                  <ul className="space-y-2.5">
                    {c.stats.map((s) => (
                      <li key={s} className="text-sm text-gray-300 flex items-start gap-2">
                        <span
                          className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: c.accentColor }}
                        />
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
        <FadeIn delay={0.1} className="mb-14">
          <div className="flex flex-wrap gap-2 justify-center">
            {d.more.map((name) => (
              <span key={name} className="px-3 py-1.5 rounded-full border border-white/15 text-white/50 text-xs bg-white/5">
                {name}
              </span>
            ))}
          </div>
        </FadeIn>

        {/* SI partners */}
        <FadeIn delay={0.05} className="mb-8">
          <div className="rounded-2xl border border-white/10 bg-white/3 p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">{d.si.title}</h3>
              <p className="text-gray-400 text-sm">{d.si.sub}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {d.si.items.map((item, i) => (
                <FadeIn key={item.name} delay={i * 0.08}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="rounded-xl border border-white/10 bg-white/5 p-5 flex flex-col gap-2"
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
          <div className="rounded-xl border border-emerald-700/40 bg-emerald-900/10 p-5 flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="text-xs text-emerald-400 font-semibold mb-1">{d.japan.title}</div>
              <div className="font-bold text-white text-lg">{d.japan.name}</div>
              <div className="text-sm text-gray-400">{d.japan.role}</div>
            </div>
            <span className="text-xs border border-emerald-700/60 text-emerald-400 px-3 py-1.5 rounded-full">
              {d.japan.badge}
            </span>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
