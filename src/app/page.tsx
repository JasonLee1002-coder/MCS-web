import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Clients from "@/components/Clients";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AiConsultant from "@/components/AiConsultant";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Clients />
        <About />
        <Contact />
      </main>
      <Footer />
      <AiConsultant />
    </>
  );
}
