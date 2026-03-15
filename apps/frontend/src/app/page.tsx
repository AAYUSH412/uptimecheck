import Hero from "../components/landing/Hero";
import SocialProof from "../components/landing/SocialProof";
import HowItWorks from "../components/landing/HowItWorks";
import Features from "../components/landing/Features";
import PricingTeaser from "../components/landing/PricingTeaser";
import CTA from "../components/landing/CTA";
import Footer from "../components/landing/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0A0A0F]">
      <main className="grow">
        <Hero />
        <SocialProof />
        <HowItWorks />
        <Features />
        <PricingTeaser />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}