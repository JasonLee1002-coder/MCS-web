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

const PLATFORM_DATA = {
  zh: {
    label: "核心平台",
    title: "OmniCore",
    titleSub: "智慧設備管理暨 AI 零售作業系統",
    sub: "專為智慧設備設計的多租戶雲端作業系統。一個後台管理全部設備、全部客戶、全部數據——不需自養資訊團隊。",
    features: [
      { icon: "📡", name: "設備即時監控", desc: "網路狀態、機台溫度、格子狀態、庫存水位，即時掌握。" },
      { icon: "📊", name: "交易 & 營業報表", desc: "按機台、場域、商品、日期多維度切片，快速洞察銷售趨勢。" },
      { icon: "🔔", name: "主動異常通報", desc: "整合 LINE Notify，溫度異常、低庫存、交易失敗即時推播。" },
      { icon: "🛡️", name: "食安溫控稽核", desc: "設定溫度上下限，超標自動鎖貨，完整稽核紀錄備查。" },
      { icon: "🚚", name: "補貨 & 倉儲管理", desc: "撿貨單、補貨單、庫存盤點一鍵匯出，AI 補貨預測模組。" },
      { icon: "🎯", name: "促銷活動模組", desc: "折扣碼、組合促銷、時間限定活動，無需工程師即可上架。" },
      { icon: "👤", name: "會員 & 點數整合", desc: "OMO 線上線下融合，消費累點、禮券兌換、推播行銷。" },
      { icon: "🏢", name: "多租戶隔離架構", desc: "每個客戶獨立後台，數據完全隔離，支援品牌客製化。" },
    ],
    integLabel: "系統串接生態",
    integNote: "不需自養資訊團隊，OmniCore 已整合以下系統",
    integGroups: [
      { icon: "🏭", title: "ERP 系統", items: ["富士通 Fujitsu ERP", "鼎新 Digiwin ERP", "超商內部管理平台"] },
      { icon: "👥", title: "會員 & 電商", items: ["Ocard 會員平台", "SHOPLINE", "91APP", "Pointsoft"] },
      { icon: "💳", title: "金流支付", items: ["精誠資訊 / 英特拉", "悠遊卡 EasyCard", "LINE Pay", "街口 / Apple Pay", "信用卡 EMV"] },
      { icon: "🚛", title: "物流 & 場域", items: ["Lalamove 即時派送", "台積電員工卡", "Garmin / 聯詠員工卡", "MPS Japan 無人支付"] },
    ],
    callout: "導入 OmniCore 的企業，IT 建置費用僅需自建的 5–12%",
    calloutSub: "MCS 負責整合、維護、升級——你只需要專注在營運與品牌",
    businessModel: {
      title: "四大收入模式",
      sub: "MCS 與客戶深度綁定，越合作越有價值",
      items: [
        { icon: "📅", label: "平台連線月費", desc: "NT$1,000/台/月（量大分階層彈性報價）", type: "recurring" },
        { icon: "💰", label: "資訊及 AI 服務分潤", desc: "客戶營業額 5%—客戶越賺，MCS 越賺", type: "aligned" },
        { icon: "🔧", label: "企業客製整合費", desc: "NT$50萬起/案，一次性深度綁定", type: "onetime" },
        { icon: "🔑", label: "軟體授權 + 年度 MA", desc: "每台一次性授權費，每年升級保固", type: "recurring" },
      ],
    },
  },
  en: {
    label: "Core Platform",
    title: "OmniCore",
    titleSub: "Smart Device Management & AI Retail OS",
    sub: "A multi-tenant cloud operating system built for smart devices. One dashboard for all devices, all clients, all data — no in-house IT team required.",
    features: [
      { icon: "📡", name: "Real-time Device Monitoring", desc: "Network status, temperature, locker state, inventory levels — always in view." },
      { icon: "📊", name: "Transaction & Sales Reports", desc: "Slice by device, location, product, or date. Spot trends instantly." },
      { icon: "🔔", name: "Proactive Anomaly Alerts", desc: "LINE Notify integration: temperature spikes, low stock, failed transactions — notified immediately." },
      { icon: "🛡️", name: "Food Safety Temperature Audit", desc: "Set upper/lower limits. Auto-lock on breach. Complete audit trail." },
      { icon: "🚚", name: "Restocking & Inventory Mgmt", desc: "One-click pick lists, restock sheets, and inventory counts. AI prediction module included." },
      { icon: "🎯", name: "Promotion Engine", desc: "Discount codes, bundle deals, time-limited campaigns — no engineer needed to deploy." },
      { icon: "👤", name: "Member & Loyalty Integration", desc: "OMO loyalty: earn points in-store, redeem online. Push marketing campaigns." },
      { icon: "🏢", name: "Multi-tenant Architecture", desc: "Fully isolated per client. Each tenant has their own dashboard and branding." },
    ],
    integLabel: "Integration Ecosystem",
    integNote: "No in-house IT team needed — OmniCore already integrates with:",
    integGroups: [
      { icon: "🏭", title: "ERP Systems", items: ["Fujitsu ERP", "Digiwin ERP", "Leading Chain Internal Platform"] },
      { icon: "👥", title: "Loyalty & E-Commerce", items: ["Ocard", "SHOPLINE", "91APP", "Pointsoft"] },
      { icon: "💳", title: "Payment", items: ["Systex / Intella", "EasyCard", "LINE Pay", "JKO / Apple Pay", "Credit Card EMV"] },
      { icon: "🚛", title: "Logistics & Venue", items: ["Lalamove Express", "TSMC Employee Card", "Garmin / Novatek Cards", "MPS Japan Cashless"] },
    ],
    callout: "Enterprises using OmniCore pay only 5–12% of self-build IT costs",
    calloutSub: "MCS handles all integration, maintenance, and upgrades — you focus on operations and brand.",
    businessModel: {
      title: "Four Revenue Streams",
      sub: "MCS grows deeper with every client — the more they earn, the more we earn",
      items: [
        { icon: "📅", label: "Monthly Platform Fee", desc: "NT$1,000/device/month (tiered for volume)", type: "recurring" },
        { icon: "💰", label: "AI & Data Revenue Share", desc: "5% of client GMV — aligned incentives", type: "aligned" },
        { icon: "🔧", label: "Enterprise Integration Fee", desc: "NT$500K+ per project, one-time deep integration", type: "onetime" },
        { icon: "🔑", label: "Software License + Annual MA", desc: "Per-device license + yearly upgrade & maintenance", type: "recurring" },
      ],
    },
  },
  ja: {
    label: "コアプラットフォーム",
    title: "OmniCore",
    titleSub: "スマート機器管理・AI小売オペレーティングシステム",
    sub: "スマート機器専用に設計されたマルチテナントクラウドOSです。すべての機器・クライアント・データを一つのダッシュボードで管理——自社ITチーム不要。",
    features: [
      { icon: "📡", name: "リアルタイム機器監視", desc: "ネットワーク状態、温度、ロッカー状態、在庫レベルをリアルタイムで把握。" },
      { icon: "📊", name: "取引・売上レポート", desc: "機器・場所・商品・日付で多次元分析。トレンドを即座に把握。" },
      { icon: "🔔", name: "異常プロアクティブ通知", desc: "LINENotify連携で温度上昇・在庫不足・取引失敗を即時通知。" },
      { icon: "🛡️", name: "食品安全温度監査", desc: "上下限設定、超過時自動ロック、完全な監査記録。" },
      { icon: "🚚", name: "補充・在庫管理", desc: "ピッキングリスト・補充シート・棚卸表をワンクリック出力。AI予測モジュール付き。" },
      { icon: "🎯", name: "プロモーションエンジン", desc: "割引コード・バンドル・期間限定キャンペーン——エンジニア不要で展開可能。" },
      { icon: "👤", name: "会員・ポイント統合", desc: "OMO対応：店舗でポイント獲得、オンラインで交換。プッシュマーケティング。" },
      { icon: "🏢", name: "マルチテナントアーキテクチャ", desc: "クライアントごとに完全隔離。独自ダッシュボードとブランディングをサポート。" },
    ],
    integLabel: "連携エコシステム",
    integNote: "自社ITチーム不要——OmniCoreが既に連携しているシステム",
    integGroups: [
      { icon: "🏭", title: "ERPシステム", items: ["富士通ERP", "Digiwin ERP", "コンビニ内部管理プラットフォーム"] },
      { icon: "👥", title: "会員・EC", items: ["Ocard", "SHOPLINE", "91APP", "Pointsoft"] },
      { icon: "💳", title: "決済", items: ["Systex / Intella", "悠遊カード", "LINE Pay", "街口 / Apple Pay", "クレジットカードEMV"] },
      { icon: "🚛", title: "物流・拠点", items: ["Lalamove即時配送", "TSMC社員カード", "Garmin / Novatek社員カード", "MPS Japan無人決済"] },
    ],
    callout: "OmniCore導入企業はITコストを自社構築比5〜12%に削減",
    calloutSub: "MCSがすべての統合・保守・アップグレードを担当——あなたは運営とブランドに集中できます。",
    businessModel: {
      title: "4つの収益モデル",
      sub: "MCSはクライアントと深く連携——パートナーの成長がMCSの成長",
      items: [
        { icon: "📅", label: "月額プラットフォーム費", desc: "NT$1,000/台/月（数量に応じた段階的料金）", type: "recurring" },
        { icon: "💰", label: "AI・データ収益シェア", desc: "クライアントGMVの5%——利益が一致する構造", type: "aligned" },
        { icon: "🔧", label: "エンタープライズ統合費", desc: "NT$50万+/プロジェクト、一回限りの深度統合", type: "onetime" },
        { icon: "🔑", label: "ソフトウェアライセンス+年間MA", desc: "機器ごとのライセンス料＋年次アップグレード・保守", type: "recurring" },
      ],
    },
  },
  id: {
    label: "Platform Inti",
    title: "OmniCore",
    titleSub: "Sistem Manajemen Perangkat Cerdas & AI Retail OS",
    sub: "Sistem operasi cloud multi-tenant yang dirancang khusus untuk perangkat cerdas. Satu dashboard untuk semua perangkat, semua klien, semua data.",
    features: [
      { icon: "📡", name: "Pemantauan Perangkat Real-time", desc: "Status jaringan, suhu, kondisi loker, tingkat inventaris — selalu terpantau." },
      { icon: "📊", name: "Laporan Transaksi & Penjualan", desc: "Iris berdasarkan perangkat, lokasi, produk, atau tanggal. Temukan tren instan." },
      { icon: "🔔", name: "Peringatan Anomali Proaktif", desc: "Integrasi LINE Notify: lonjakan suhu, stok rendah, transaksi gagal — notifikasi langsung." },
      { icon: "🛡️", name: "Audit Suhu Keamanan Pangan", desc: "Atur batas atas/bawah. Auto-lock saat pelanggaran. Jejak audit lengkap." },
      { icon: "🚚", name: "Manajemen Pengisian & Inventaris", desc: "Daftar pengambilan, lembar pengisian, dan perhitungan inventaris dengan satu klik." },
      { icon: "🎯", name: "Mesin Promosi", desc: "Kode diskon, paket bundel, kampanye terbatas waktu — tidak perlu engineer." },
      { icon: "👤", name: "Integrasi Member & Loyalitas", desc: "Loyalitas OMO: kumpulkan poin di toko, tukarkan online." },
      { icon: "🏢", name: "Arsitektur Multi-tenant", desc: "Terisolasi sepenuhnya per klien. Dashboard dan branding sendiri untuk setiap tenant." },
    ],
    integLabel: "Ekosistem Integrasi",
    integNote: "Tidak perlu tim IT internal — OmniCore sudah terintegrasi dengan:",
    integGroups: [
      { icon: "🏭", title: "Sistem ERP", items: ["Fujitsu ERP", "Digiwin ERP", "Platform Internal Leading Chain"] },
      { icon: "👥", title: "Loyalitas & E-Commerce", items: ["Ocard", "SHOPLINE", "91APP", "Pointsoft"] },
      { icon: "💳", title: "Pembayaran", items: ["Systex / Intella", "EasyCard", "LINE Pay", "JKO / Apple Pay", "Kartu Kredit EMV"] },
      { icon: "🚛", title: "Logistik & Venue", items: ["Lalamove Express", "Kartu Karyawan TSMC", "Kartu Garmin / Novatek", "MPS Japan Cashless"] },
    ],
    callout: "Perusahaan yang menggunakan OmniCore hanya membayar 5–12% dari biaya IT mandiri",
    calloutSub: "MCS menangani semua integrasi, pemeliharaan, dan pembaruan — Anda fokus pada operasi dan merek.",
    businessModel: {
      title: "Empat Aliran Pendapatan",
      sub: "MCS semakin erat dengan setiap klien — semakin mereka berkembang, semakin MCS berkembang",
      items: [
        { icon: "📅", label: "Biaya Platform Bulanan", desc: "NT$1.000/perangkat/bulan (bertingkat untuk volume)", type: "recurring" },
        { icon: "💰", label: "Bagi Hasil AI & Data", desc: "5% dari GMV klien — insentif yang selaras", type: "aligned" },
        { icon: "🔧", label: "Biaya Integrasi Enterprise", desc: "NT$500K+ per proyek, integrasi mendalam satu kali", type: "onetime" },
        { icon: "🔑", label: "Lisensi Perangkat Lunak + MA Tahunan", desc: "Lisensi per perangkat + pembaruan & pemeliharaan tahunan", type: "recurring" },
      ],
    },
  },
};

export default function OmniCoreSection() {
  const { lang } = useLanguage();
  const d = PLATFORM_DATA[lang] ?? PLATFORM_DATA.zh;

  return (
    <section id="omnicore" className="py-24 bg-[#0e1218]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <FadeIn className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-mcs-orange/10 border border-mcs-orange/30 text-mcs-orange text-sm font-semibold mb-4">
            {d.label}
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-2">
            {d.title}
          </h2>
          <p className="text-xl text-mcs-orange font-semibold mb-4">{d.titleSub}</p>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">{d.sub}</p>
        </FadeIn>

        {/* 8 feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {d.features.map((f, i) => (
            <FadeIn key={f.name} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -4, borderColor: "rgba(232,117,26,0.4)" }}
                className="rounded-xl border border-white/10 bg-white/5 p-5 h-full flex flex-col gap-3 cursor-default transition-colors"
              >
                <span className="text-3xl">{f.icon}</span>
                <p className="text-white font-bold text-sm">{f.name}</p>
                <p className="text-gray-400 text-xs leading-relaxed flex-1">{f.desc}</p>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        {/* Integration ecosystem */}
        <FadeIn>
          <div className="rounded-2xl border border-white/10 bg-white/3 p-8 mb-8">
            <div className="mb-6 text-center">
              <h3 className="text-2xl font-bold text-white mb-2">{d.integLabel}</h3>
              <p className="text-gray-400">{d.integNote}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {d.integGroups.map((g) => (
                <div key={g.title}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">{g.icon}</span>
                    <span className="text-white font-bold text-sm">{g.title}</span>
                  </div>
                  <ul className="space-y-1.5">
                    {g.items.map((item) => (
                      <li key={item} className="text-xs text-gray-400 flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-mcs-orange flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Callout */}
        <FadeIn delay={0.1}>
          <div className="rounded-2xl border border-mcs-orange/30 bg-mcs-orange/5 p-6 text-center mb-16">
            <p className="text-mcs-orange font-bold text-lg mb-1">{d.callout}</p>
            <p className="text-gray-400 text-sm">{d.calloutSub}</p>
          </div>
        </FadeIn>


      </div>
    </section>
  );
}
