import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Upload } from 'lucide-react';
import Button from '../ui/Button';
import DashboardPreview from './DashboardPreview';

const HeroSection: React.FC = () => {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-6 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-surface-900 leading-tight">
              Transform your material library into actionable insights.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-surface-600 max-w-xl">
              Upload your project specs and instantly discover patterns in your material choices. Make smarter decisions for future designs.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="group flex items-center gap-2"
              >
                <span>See your insights</span>
                <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="flex items-center gap-2"
              >
                <Upload size={18} />
                <span>Live Demo</span>
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <DashboardPreview />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;