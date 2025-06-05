import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import DashboardPreview from './DashboardPreview';

const HeroSection: React.FC = () => {
  return (
    <section className="pt-24 md:pt-32 pb-16 md:pb-24 px-4 md:px-6 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col text-center lg:text-left"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-surface-900 leading-tight">
              Analyze Project Specs. Unlock Material Insights. Design Smarter.
            </h1>
            <p className="mt-4 md:mt-6 text-base sm:text-lg md:text-xl text-surface-600 max-w-xl mx-auto lg:mx-0">
              Upload your project specs to analyze your most-used materials, identify client-specific preferences, and track supplier performance. Make data-driven design decisions, effortlessly.
            </p>
            <ul className="mt-6 md:mt-8 space-y-3 text-left">
              <li className="flex items-center gap-2 text-surface-700">
                <span className="text-primary-600">✓</span>
                Instantly see top materials & suppliers
              </li>
              <li className="flex items-center gap-2 text-surface-700">
                <span className="text-primary-600">✓</span>
                Understand client & project type patterns
              </li>
              <li className="flex items-center gap-2 text-surface-700">
                <span className="text-primary-600">✓</span>
                Make informed choices, faster
              </li>
            </ul>
            <div className="mt-8 md:mt-10 flex justify-center lg:justify-start">
              <Link to="/dashboard">
                <Button 
                  size="lg" 
                  className="group flex items-center gap-2"
                >
                  <span>Try Interactive Demo</span>
                  <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative mt-8 lg:mt-0"
          >
            <DashboardPreview />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;