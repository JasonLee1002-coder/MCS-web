import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Clients from "@/components/Clients";
import Numbers from "@/components/Numbers";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "銓幻元科技 MCS",
  alternateName: "MCS Meta Clearing Station",
  url: "https://www.mcstation.ai",
  publisher: {
    "@type": "Organization",
    name: "銓幻元科技股份有限公司",
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.mcstation.ai/#business",
  name: "銓幻元科技股份有限公司",
  alternateName: ["MCS", "Meta Clearing Station", "銓幻元科技"],
  image: "https://www.mcstation.ai/images/mcs-logo.png",
  url: "https://www.mcstation.ai",
  email: "service@transtep.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "長安西路78巷4弄10號1樓",
    addressLocality: "大同區",
    addressRegion: "台北市",
    postalCode: "103",
    addressCountry: "TW",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 25.0504,
    longitude: 121.5168,
  },
  areaServed: [
    { "@type": "Country", name: "TW" },
    { "@type": "Country", name: "JP" },
    { "@type": "Country", name: "SG" },
  ],
  priceRange: "$$",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
};

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <Hero />
        <Services />
        <Clients />
        <Numbers />
        <About />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
