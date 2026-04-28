import type { Lang } from "@/contexts/LanguageContext";

export type Translations = {
  nav: {
    home: string;
    services: string;
    cases: string;
    products: string;
    blog: string;
    about: string;
    faq: string;
    contact: string;
    consulting: string;
  };
  hero: {
    badge: string;
    subBadge: string;
    headline1: string;
    headline2: string;
    tagline: string;
    cta1: string;
    cta2: string;
    stat1v: string;
    stat1l: string;
    stat2v: string;
    stat2l: string;
    stat3v: string;
    stat3l: string;
  };
  services: {
    title: string;
    subtitle: string;
  };
  consulting: {
    title: string;
    subtitle: string;
    cta: string;
    items: { icon: string; title: string; desc: string }[];
  };
  globalPresence: {
    title: string;
    subtitle: string;
    sgTitle: string;
    sgDesc: string;
    sgBadge: string;
    twTitle: string;
    twDesc: string;
    twBadge: string;
    bridge: string;
  };
  about: {
    title: string;
    subtitle: string;
    desc: string;
    feat1t: string;
    feat1d: string;
    feat2t: string;
    feat2d: string;
    feat3t: string;
    feat3d: string;
    feat4t: string;
    feat4d: string;
  };
  numbers: {
    v1: string; l1: string;
    v2: string; l2: string;
    v3: string; l3: string;
    v4: string; l4: string;
  };
  contact: {
    title: string;
    subtitle: string;
    company: string;
    person: string;
    service: string;
    message: string;
    submit: string;
  };
  footer: {
    quickLinks: string;
    products: string;
    allRights: string;
    acraLabel: string;
  };
};

export const translations: Record<Lang, Translations> = {
  zh: {
    nav: {
      home: "首頁",
      services: "服務方案",
      cases: "客戶實績",
      products: "產品",
      blog: "部落格",
      about: "關於我們",
      faq: "常見問題",
      contact: "聯絡我們",
      consulting: "顧問服務",
    },
    hero: {
      badge: "唯一整合線上線下 × 供應鏈 × 全通道+會員的 AI 零售作業系統",
      subBadge: "🇹🇼 台灣研發製造 · 新加坡國際總部 · 日本 MOU 已簽",
      headline1: "不是賣設備",
      headline2: "讓零售生態真正有效益",
      tagline:
        "MCS 銓幻元科技是台灣唯一整合硬體設備 × OmniCore AI 雲端平台 × ERP/會員/金流/物流串接的智慧零售作業系統。一個平台讓連鎖品牌省下 88% 的 IT 建置成本，真正讓每一個場域的營運效益最大化。",
      cta1: "預約產品展示",
      cta2: "聯絡顧問",
      stat1v: "200台+",
      stat1l: "全家超商部署（2026起）",
      stat2v: "90天",
      stat2l: "麥味登完整整合",
      stat3v: "5-12%",
      stat3l: "企業 IT 成本節省",
    },
    services: {
      title: "服務方案",
      subtitle: "從硬體設備到雲端軟體，全方位覆蓋您的數位化需求",
    },
    consulting: {
      title: "顧問服務",
      subtitle:
        "由新加坡專業團隊提供亞太市場進入策略與數位轉型諮詢，協助企業跨境佈局東南亞市場",
      cta: "預約顧問諮詢",
      items: [
        {
          icon: "🎯",
          title: "市場進入策略",
          desc: "協助台灣企業切入新加坡、東南亞市場，提供法規遵循、通路開發、在地夥伴資源全套規劃服務。",
        },
        {
          icon: "🔧",
          title: "系統整合諮詢",
          desc: "從 POS、KDS 到 ERP 全面整合，提供客製化軟硬體架構設計與導入支援，讓系統無縫運作。",
        },
        {
          icon: "📊",
          title: "數位轉型規劃",
          desc: "評估現有業務流程，設計 AI 驅動的自動化方案，顯著提升運營效率與終端客戶體驗。",
        },
        {
          icon: "🌐",
          title: "跨國合規輔導",
          desc: "新加坡 ACRA、PDPA 法規遵循，協助企業建立符合國際標準的數據治理與隱私保護架構。",
        },
      ],
    },
    globalPresence: {
      title: "雙核心全球佈局",
      subtitle:
        "新加坡國際總部 × 台灣研發製造中心 — 以亞太為舞台，輸出世界級技術解決方案",
      sgTitle: "新加坡總部",
      sgDesc:
        "Meta Clearing Station Pte. Ltd.\n138 Cecil Street, #13-02\nCecil Court, Singapore 069538\n\n• ASEAN 市場進入窗口\n• 國際合規與金融整合\n• 亞太業務開發中心",
      sgBadge: "ACRA 認證 · 2023 立案",
      twTitle: "台灣研發中心",
      twDesc:
        "銓幻元科技股份有限公司\n103 台北市大同區\n長安西路 78 巷 4 弄 10 號 1 樓\n\n• 硬體研發製造 100% 台灣\n• 軟體工程與 AI 模組開發\n• 日本市場技術合作夥伴",
      twBadge: "100% 台灣製造",
      bridge: "技術 × 市場 × 合規",
    },
    about: {
      title: "關於銓幻元科技 MCS",
      subtitle: "台灣研發製造 × 新加坡國際總部",
      desc: "銓幻元科技股份有限公司是 GraBox AI 智取櫃、冷凍微波販賣機的台灣設計製造商，所有設備 100% 台灣自主研發製造。國際總部 Meta Clearing Station Pte. Ltd. 於 2023 年在新加坡 ACRA 立案，以亞太為舞台提供完整的智慧零售解決方案。",
      feat1t: "新加坡立案",
      feat1d: "ACRA 認證，合規國際營運",
      feat2t: "台灣研發製造",
      feat2d: "銓幻元科技 100% 台灣硬體",
      feat3t: "AI 智慧驅動",
      feat3d: "自主 AI 模組，持續進化",
      feat4t: "一站式整合",
      feat4d: "硬體＋軟體＋雲端全包",
    },
    numbers: {
      v1: "2023", l1: "新加坡立案",
      v2: "6+",   l2: "核心服務項目",
      v3: "100%", l3: "台灣自主研發",
      v4: "3",    l4: "服務市場（TW·JP·SG）",
    },
    contact: {
      title: "聯絡我們",
      subtitle: "告訴我們您的需求，顧問團隊將在 24 小時內回應",
      company: "公司名稱",
      person: "聯絡人",
      service: "感興趣的服務",
      message: "需求說明",
      submit: "送出詢問",
    },
    footer: {
      quickLinks: "快速導覽",
      products: "產品與服務",
      allRights: "All rights reserved.",
      acraLabel: "ACRA 認證企業",
    },
  },

  en: {
    nav: {
      home: "Home",
      services: "Services",
      cases: "Cases",
      products: "Products",
      blog: "Blog",
      about: "About",
      faq: "FAQ",
      contact: "Contact",
      consulting: "Consulting",
    },
    hero: {
      badge: "The Only AI Retail OS Integrating Online-Offline × Supply Chain × Omnichannel + Membership",
      subBadge: "🇹🇼 Taiwan R&D · Singapore HQ · Japan MOU Signed",
      headline1: "We Don't Sell Hardware.",
      headline2: "We Make Retail Ecosystems Work.",
      tagline:
        "MCS is Taiwan's only AI Retail Operating System — integrating smart devices, OmniCore cloud AI, and ERP/loyalty/payment/logistics in one platform. Enterprise partners save 88% on IT infrastructure while maximizing revenue at every venue.",
      cta1: "Request a Demo",
      cta2: "Talk to a Consultant",
      stat1v: "200+",
      stat1l: "FamilyMart Units (from 2026)",
      stat2v: "90 Days",
      stat2l: "MWD Full Integration",
      stat3v: "5–12%",
      stat3l: "of Self-Build IT Cost",
    },
    services: {
      title: "Our Services",
      subtitle: "Full-stack digital solutions from smart hardware to cloud software",
    },
    consulting: {
      title: "Consulting Services",
      subtitle:
        "Asia-Pacific market entry strategy and digital transformation advisory from our Singapore-based professional team",
      cta: "Book a Consultation",
      items: [
        {
          icon: "🎯",
          title: "Market Entry Strategy",
          desc: "Help Taiwan companies enter Singapore and Southeast Asian markets with comprehensive planning covering regulatory compliance, channel development, and local partner networks.",
        },
        {
          icon: "🔧",
          title: "System Integration Advisory",
          desc: "Custom hardware-software integration architecture across POS, KDS, and ERP systems, with full deployment support for seamless operations.",
        },
        {
          icon: "📊",
          title: "Digital Transformation Planning",
          desc: "Evaluate existing workflows and design AI-driven automation solutions to significantly boost operational efficiency and end-customer experience.",
        },
        {
          icon: "🌐",
          title: "Cross-Border Compliance",
          desc: "Singapore ACRA and PDPA compliance guidance, helping businesses build internationally-standard data governance and privacy protection frameworks.",
        },
      ],
    },
    globalPresence: {
      title: "Dual-Core Global Architecture",
      subtitle:
        "Singapore International HQ × Taiwan R&D Center — Delivering world-class technology solutions across Asia-Pacific",
      sgTitle: "Singapore Headquarters",
      sgDesc:
        "Meta Clearing Station Pte. Ltd.\n138 Cecil Street, #13-02\nCecil Court, Singapore 069538\n\n• ASEAN Market Gateway\n• International Compliance & Finance Hub\n• Asia-Pacific Business Development",
      sgBadge: "ACRA Registered · Est. 2023",
      twTitle: "Taiwan R&D Center",
      twDesc:
        "Transtep Technology Co., Ltd.\n103 Taipei City, Datong District\nChangan W. Rd., Ln.78, Aly.4, No.10, 1F\n\n• 100% Taiwan Hardware Manufacturing\n• Software Engineering & AI Module R&D\n• Japan Market Technology Partner",
      twBadge: "100% Taiwan-Made",
      bridge: "Technology × Market × Compliance",
    },
    about: {
      title: "About MCS",
      subtitle: "Singapore Incorporated × Taiwan Technology",
      desc: "Meta Clearing Station Pte. Ltd. was incorporated in Singapore under ACRA in 2023 (UEN: 202316403G). Operating from Singapore as the international HQ, we deeply integrate Taiwan's elite hardware manufacturing capabilities to deliver complete digital transformation solutions — from devices to cloud — for Asia-Pacific enterprises.",
      feat1t: "Singapore Incorporated",
      feat1d: "ACRA certified for compliant global operations",
      feat2t: "Taiwan R&D & Manufacturing",
      feat2d: "100% Taiwan hardware, quality assured",
      feat3t: "AI-Powered",
      feat3d: "Proprietary AI modules, continuously evolving",
      feat4t: "All-in-One Integration",
      feat4d: "Hardware + Software + Cloud, fully covered",
    },
    numbers: {
      v1: "2023", l1: "Singapore Incorporated",
      v2: "6+",   l2: "Core Service Categories",
      v3: "100%", l3: "Taiwan-Developed Technology",
      v4: "3",    l4: "Markets Served (TW · JP · SG)",
    },
    contact: {
      title: "Contact Us",
      subtitle: "Tell us your requirements. Our consulting team will respond within 24 hours.",
      company: "Company Name",
      person: "Contact Person",
      service: "Service of Interest",
      message: "Project Details",
      submit: "Send Inquiry",
    },
    footer: {
      quickLinks: "Quick Links",
      products: "Products & Services",
      allRights: "All rights reserved.",
      acraLabel: "ACRA Registered Company",
    },
  },

  id: {
    nav: {
      home: "Beranda",
      services: "Layanan",
      cases: "Studi Kasus",
      products: "Produk",
      blog: "Blog",
      about: "Tentang Kami",
      faq: "FAQ",
      contact: "Hubungi Kami",
      consulting: "Konsultasi",
    },
    hero: {
      badge: "Perusahaan Terdaftar ACRA Singapura · UEN 202316403G",
      subBadge: "🇹🇼 Teknologi Taiwan · Ekspansi ke Asia Tenggara",
      headline1: "Perangkat Cerdas AI",
      headline2: "Integrasi Sistem Bisnis",
      tagline:
        "Meta Clearing Station Pte. Ltd., berkantor pusat di Singapura, mengintegrasikan keahlian perangkat keras dan perangkat lunak terbaik Taiwan untuk menghadirkan solusi digital end-to-end — dari lemari pintar AI GraBox dan mesin vending microwave beku hingga sistem cloud POS/KDS — untuk perusahaan di seluruh Asia-Pasifik.",
      cta1: "Jelajahi Solusi",
      cta2: "Bicara dengan Konsultan",
      stat1v: "SG",
      stat1l: "Kantor Pusat Singapura",
      stat2v: "6+",
      stat2l: "Solusi Utama",
      stat3v: "AI",
      stat3l: "Berbasis AI",
    },
    services: {
      title: "Layanan Kami",
      subtitle: "Solusi digital lengkap dari perangkat keras cerdas hingga perangkat lunak cloud",
    },
    consulting: {
      title: "Layanan Konsultasi",
      subtitle:
        "Strategi masuk pasar Asia-Pasifik dan konsultasi transformasi digital dari tim profesional berbasis Singapura kami",
      cta: "Pesan Konsultasi",
      items: [
        {
          icon: "🎯",
          title: "Strategi Masuk Pasar",
          desc: "Membantu perusahaan Taiwan memasuki pasar Singapura dan Asia Tenggara dengan perencanaan komprehensif yang mencakup kepatuhan regulasi, pengembangan saluran, dan jaringan mitra lokal.",
        },
        {
          icon: "🔧",
          title: "Konsultasi Integrasi Sistem",
          desc: "Desain arsitektur integrasi perangkat keras-lunak khusus di seluruh sistem POS, KDS, dan ERP, dengan dukungan penerapan penuh untuk operasi yang mulus.",
        },
        {
          icon: "📊",
          title: "Perencanaan Transformasi Digital",
          desc: "Evaluasi alur kerja yang ada dan rancang solusi otomasi berbasis AI untuk meningkatkan efisiensi operasional dan pengalaman pelanggan secara signifikan.",
        },
        {
          icon: "🌐",
          title: "Kepatuhan Lintas Batas",
          desc: "Panduan kepatuhan ACRA dan PDPA Singapura, membantu bisnis membangun tata kelola data dan kerangka perlindungan privasi berstandar internasional.",
        },
      ],
    },
    globalPresence: {
      title: "Arsitektur Global Dua Inti",
      subtitle:
        "Kantor Pusat Internasional Singapura × Pusat R&D Taiwan — Menghadirkan solusi teknologi kelas dunia di seluruh Asia-Pasifik",
      sgTitle: "Kantor Pusat Singapura",
      sgDesc:
        "Meta Clearing Station Pte. Ltd.\n138 Cecil Street, #13-02\nCecil Court, Singapura 069538\n\n• Gerbang Pasar ASEAN\n• Hub Kepatuhan & Keuangan Internasional\n• Pengembangan Bisnis Asia-Pasifik",
      sgBadge: "Terdaftar ACRA · Est. 2023",
      twTitle: "Pusat R&D Taiwan",
      twDesc:
        "Transtep Technology Co., Ltd.\n103 Kota Taipei, Distrik Datong\nChangan W. Rd., Ln.78, Aly.4, No.10, 1F\n\n• 100% Manufaktur Perangkat Keras Taiwan\n• Rekayasa Perangkat Lunak & R&D Modul AI\n• Mitra Teknologi Pasar Jepang",
      twBadge: "100% Buatan Taiwan",
      bridge: "Teknologi × Pasar × Kepatuhan",
    },
    about: {
      title: "Tentang MCS",
      subtitle: "Didirikan di Singapura × Teknologi Taiwan",
      desc: "Meta Clearing Station Pte. Ltd. didirikan di Singapura di bawah ACRA pada 2023 (UEN: 202316403G). Beroperasi dari Singapura sebagai kantor pusat internasional, kami mengintegrasikan kemampuan manufaktur perangkat keras elite Taiwan untuk menghadirkan solusi transformasi digital lengkap — dari perangkat hingga cloud — bagi perusahaan Asia-Pasifik.",
      feat1t: "Didirikan di Singapura",
      feat1d: "Bersertifikasi ACRA untuk operasi global yang patuh",
      feat2t: "R&D & Manufaktur Taiwan",
      feat2d: "100% perangkat keras Taiwan, terjamin kualitasnya",
      feat3t: "Berbasis AI",
      feat3d: "Modul AI proprieter yang terus berkembang",
      feat4t: "Integrasi Lengkap",
      feat4d: "Perangkat Keras + Perangkat Lunak + Cloud, sepenuhnya terintegrasi",
    },
    numbers: {
      v1: "2023", l1: "Didirikan di Singapura",
      v2: "6+",   l2: "Kategori Layanan Utama",
      v3: "100%", l3: "Teknologi Buatan Taiwan",
      v4: "3",    l4: "Pasar Dilayani (TW · JP · SG)",
    },
    contact: {
      title: "Hubungi Kami",
      subtitle: "Ceritakan kebutuhan Anda. Tim konsultan kami akan merespons dalam 24 jam.",
      company: "Nama Perusahaan",
      person: "Kontak Person",
      service: "Layanan yang Diminati",
      message: "Detail Proyek",
      submit: "Kirim Pertanyaan",
    },
    footer: {
      quickLinks: "Tautan Cepat",
      products: "Produk & Layanan",
      allRights: "Semua hak dilindungi.",
      acraLabel: "Perusahaan Terdaftar ACRA",
    },
  },

  ja: {
    nav: {
      home: "ホーム",
      services: "サービス",
      cases: "導入事例",
      products: "製品",
      blog: "ブログ",
      about: "会社概要",
      faq: "よくある質問",
      contact: "お問い合わせ",
      consulting: "コンサルティング",
    },
    hero: {
      badge: "オンライン×オフライン × サプライチェーン × 全チャネル+会員を統合する唯一のAI小売OS",
      subBadge: "🇹🇼 台湾R&D · シンガポール本社 · 日本 MOU 締結済",
      headline1: "機器を売るのではない。",
      headline2: "小売エコシステムを機能させる。",
      tagline:
        "MCSは台湾唯一のAI小売オペレーティングシステムです。スマート機器 × OmniCoreクラウドAI × ERP/会員/決済/物流を一つのプラットフォームに統合。企業パートナーはITコストを88%削減しながら、すべての拠点で収益を最大化できます。",
      cta1: "デモを予約する",
      cta2: "コンサルタントに相談",
      stat1v: "200台+",
      stat1l: "ファミリーマート導入（2026年〜）",
      stat2v: "90日",
      stat2l: "MWD完全統合達成",
      stat3v: "5〜12%",
      stat3l: "自社構築IT費用比",
    },
    services: {
      title: "サービス一覧",
      subtitle: "スマートハードウェアからクラウドソフトウェアまで、デジタル化ニーズを全方位でカバー",
    },
    consulting: {
      title: "コンサルティングサービス",
      subtitle:
        "シンガポール拠点のプロフェッショナルチームが、アジア太平洋市場参入戦略とデジタルトランスフォーメーションをご支援します",
      cta: "コンサルタントに相談する",
      items: [
        {
          icon: "🎯",
          title: "市場参入戦略",
          desc: "台湾企業のシンガポール・東南アジア市場参入をサポート。法規制対応、チャネル開拓、現地パートナーネットワークを含む包括的な計画策定をご提供します。",
        },
        {
          icon: "🔧",
          title: "システム統合コンサルティング",
          desc: "POS、KDS、ERPをまたぐカスタムハードウェア・ソフトウェア統合アーキテクチャの設計と、シームレスな運用のための完全な導入支援を行います。",
        },
        {
          icon: "📊",
          title: "デジタルトランスフォーメーション計画",
          desc: "既存のワークフローを評価し、AI駆動の自動化ソリューションを設計することで、業務効率とエンドユーザー体験を大幅に向上させます。",
        },
        {
          icon: "🌐",
          title: "クロスボーダーコンプライアンス",
          desc: "シンガポールのACRAおよびPDPA規制への対応を支援し、国際基準に準拠したデータガバナンスおよびプライバシー保護フレームワークの構築をサポートします。",
        },
      ],
    },
    globalPresence: {
      title: "デュアルコアグローバル体制",
      subtitle:
        "シンガポール国際本社 × 台湾R&Dセンター — アジア太平洋全域に世界水準の技術ソリューションを提供",
      sgTitle: "シンガポール本社",
      sgDesc:
        "Meta Clearing Station Pte. Ltd.\n138 Cecil Street, #13-02\nCecil Court, Singapore 069538\n\n• ASEANマーケットゲートウェイ\n• 国際コンプライアンス・金融ハブ\n• アジア太平洋ビジネス開発拠点",
      sgBadge: "ACRA登録 · 2023年設立",
      twTitle: "台湾R&Dセンター",
      twDesc:
        "銓幻元科技股份有限公司\n台北市大同区長安西路78巷4弄10号1F\n\n• 100%台湾製ハードウェア製造\n• ソフトウェアエンジニアリング・AIモジュールR&D\n• 日本市場テクノロジーパートナー",
      twBadge: "100%台湾製",
      bridge: "技術 × 市場 × コンプライアンス",
    },
    about: {
      title: "MCSについて",
      subtitle: "シンガポール法人 × 台湾テクノロジー",
      desc: "Meta Clearing Station Pte. Ltd.は2023年にシンガポールACRAに正式登録（UEN: 202316403G）されました。シンガポールを国際本社として、台湾の優れたハードウェア製造能力を深く統合し、アジア太平洋地域の企業に機器からクラウドまでの完全なデジタルトランスフォーメーションソリューションをご提供しています。",
      feat1t: "シンガポール法人",
      feat1d: "ACRA認定、国際基準に準拠した運営",
      feat2t: "台湾R&D・製造",
      feat2d: "100%台湾製ハードウェア、品質保証",
      feat3t: "AI駆動",
      feat3d: "独自AIモジュール、継続的に進化",
      feat4t: "オールインワン統合",
      feat4d: "ハードウェア＋ソフトウェア＋クラウドを完全網羅",
    },
    numbers: {
      v1: "2023", l1: "シンガポール設立",
      v2: "6+",   l2: "コアサービス種別",
      v3: "100%", l3: "台湾開発技術",
      v4: "3",    l4: "サービス市場（TW·JP·SG）",
    },
    contact: {
      title: "お問い合わせ",
      subtitle: "ご要件をお聞かせください。コンサルタントチームが24時間以内にご連絡します。",
      company: "会社名",
      person: "担当者名",
      service: "ご興味のあるサービス",
      message: "プロジェクト詳細",
      submit: "お問い合わせを送信",
    },
    footer: {
      quickLinks: "クイックリンク",
      products: "製品・サービス",
      allRights: "All rights reserved.",
      acraLabel: "ACRA登録企業",
    },
  },
};
