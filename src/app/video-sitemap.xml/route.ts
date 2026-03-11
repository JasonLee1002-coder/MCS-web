export async function GET() {
  const videos = [
    {
      loc: "https://www.mcstation.ai/cases#mwd",
      title: "GraBox 智取櫃取餐實際操作示範",
      description:
        "銓幻元科技 GraBox AI智取櫃在麥味登門市的實際取餐操作示範，展示掃碼取餐的便利流程。",
      contentUrl: "https://www.mcstation.ai/images/cases/mwd/grabox-demo.mp4",
      thumbnailUrl:
        "https://www.mcstation.ai/images/cases/mwd/grabox-closeup.jpg",
    },
    {
      loc: "https://www.mcstation.ai/cases#mwd",
      title: "高雄加盟展 GraBox 智取櫃展示",
      description:
        "銓幻元科技 GraBox AI智取櫃在高雄加盟展的展示，展現智慧取餐解決方案。",
      contentUrl:
        "https://www.mcstation.ai/images/cases/mwd/kaohsiung-expo.mp4",
      thumbnailUrl:
        "https://www.mcstation.ai/images/cases/mwd/grabox-features.png",
    },
    {
      loc: "https://www.mcstation.ai/cases#temple",
      title: "數位功德香油箱操作示範",
      description:
        "銓幻元科技數位功德香油箱在宮廟現場的操作示範，傳統廟宇造型搭配觸控螢幕與電子支付。",
      contentUrl:
        "https://www.mcstation.ai/images/cases/temple/temple-machine-01.mp4",
      thumbnailUrl:
        "https://www.mcstation.ai/images/cases/temple/temple-machine-closeup.jpg",
    },
    {
      loc: "https://www.mcstation.ai/cases#temple",
      title: "數位功德香油箱觸控互動展示",
      description:
        "數位功德香油箱的觸控互動功能展示，可選擇四種神明動畫，信用卡或行動支付捐獻功德金。",
      contentUrl:
        "https://www.mcstation.ai/images/cases/temple/temple-machine-02.mp4",
      thumbnailUrl:
        "https://www.mcstation.ai/images/cases/temple/shilin-front.jpg",
    },
    {
      loc: "https://www.mcstation.ai/cases#temple",
      title: "數位功德香油箱完整導覽",
      description:
        "銓幻元科技數位功德香油箱完整導覽，金碧輝煌的外觀融合傳統美學與現代科技。",
      contentUrl:
        "https://www.mcstation.ai/images/cases/temple/temple-machine-03.mp4",
      thumbnailUrl:
        "https://www.mcstation.ai/images/cases/temple/huguo-037.jpg",
    },
    {
      loc: "https://www.mcstation.ai/cases#temple",
      title: "中壢仁海宮小朋友體驗數位功德箱",
      description:
        "中壢仁海宮現場，小朋友體驗數位功德香油箱的互動功能。",
      contentUrl:
        "https://www.mcstation.ai/images/cases/temple/renhai-kid.mp4",
      thumbnailUrl:
        "https://www.mcstation.ai/images/cases/temple/renhai-temple-overview.jpg",
    },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${videos
  .map(
    (v) => `  <url>
    <loc>${v.loc}</loc>
    <video:video>
      <video:thumbnail_loc>${v.thumbnailUrl}</video:thumbnail_loc>
      <video:title>${escapeXml(v.title)}</video:title>
      <video:description>${escapeXml(v.description)}</video:description>
      <video:content_loc>${v.contentUrl}</video:content_loc>
    </video:video>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
