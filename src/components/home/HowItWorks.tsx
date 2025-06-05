import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Database, LayoutDashboard } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: Upload,
      title: 'Upload project PDFs',
      description: 'Project Set or finishes schedule - just drag and drop.',
      color: 'bg-primary-50 text-primary-600'
    },
    {
      icon: Database,
      title: 'We extract & organize',
      description: 'We read and categorize materials into your private database.',
      color: 'bg-secondary-50 text-secondary-600'
    },
    {
      icon: LayoutDashboard,
      title: 'You explore your dashboard',
      description: 'Track what you used, get alerts, download reports, share insights with new hires, and simplify your workflow.',
      color: 'bg-terracotta-50 text-terracotta-600'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-surface-900">How it works</h2>
          <p className="mt-4 text-lg text-surface-600 max-w-2xl mx-auto">
            Three simple steps to transform your architectural specifications into actionable insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative"
            >
              <div className="flex flex-col items-center text-center">
                <div className={`${step.color} w-16 h-16 rounded-full flex items-center justify-center mb-6`}>
                  <step.icon size={24} />
                </div>
                <div className="flex items-center mb-4">
                  <div className="bg-primary-100 text-primary-800 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-surface-900 ml-3">{step.title}</h3>
                </div>
                <p className="text-surface-600">{step.description}</p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-surface-200 -translate-x-8">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 rotate-45 w-2 h-2 border-t-2 border-r-2 border-surface-300"></div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;