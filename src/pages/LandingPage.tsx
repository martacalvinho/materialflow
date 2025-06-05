import React from 'react';
import Header from '../components/layout/Header';
import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import HowItWorks from '../components/home/HowItWorks';
import PricingSection from '../components/home/PricingSection';
import ContactSection from '../components/home/ContactSection';
import FaqSection from '../components/home/FaqSection';
import Footer from '../components/layout/Footer';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorks />
        <PricingSection />
        <ContactSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;