import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ArrowRight, Sparkles, Package, ChevronRight, AlertTriangle, TrendingUp, DollarSign, Building2, BarChart3 } from 'lucide-react';

const DashboardPreview: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [showInsights, setShowInsights] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (activeStep === 2) {
      const timer = setTimeout(() => {
        setShowInsights(true);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setShowInsights(false);
    }
  }, [activeStep]);

  const steps = [
    {
      title: "Upload your specs",
      content: (
        <div className="bg-white rounded-xl border border-surface-200 shadow-sm p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-primary-50 rounded-lg">
              <FileText className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <h3 className="font-medium">Villa_Renovation_Specs.pdf</h3>
              <p className="text-sm text-surface-600">Processing complete</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-surface-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Building2 size={16} className="text-surface-600" />
                  <span className="font-medium">Project Overview</span>
                </div>
                <span className="text-sm text-surface-600">32 pages</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Materials Found</span>
                  <span className="text-primary-600">124</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Suppliers Identified</span>
                  <span className="text-primary-600">18</span>
                </div>
              </div>
            </div>
            <div className="p-4 bg-surface-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Package size={16} className="text-surface-600" />
                  <span className="font-medium">Material Categories</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Flooring</span>
                  <span className="text-primary-600">28 items</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Paint & Finishes</span>
                  <span className="text-primary-600">45 items</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Hardware</span>
                  <span className="text-primary-600">51 items</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "We analyze patterns",
      content: (
        <div className="bg-white rounded-xl border border-surface-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-5 w-5 text-primary-600" />
              <h3 className="font-medium">Material Usage Analysis</h3>
            </div>
            <span className="text-sm text-surface-600">Last 12 months</span>
          </div>
          <div className="space-y-6">
            <div className="space-y-4">
              {[
                { name: 'Oak Hardwood', percentage: 85, color: 'bg-primary-600' },
                { name: 'Matte Paint', percentage: 65, color: 'bg-secondary-600' },
                { name: 'Marble', percentage: 45, color: 'bg-terracotta-600' }
              ].map((material, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{material.name}</span>
                    <span className="text-surface-600">{material.percentage}%</span>
                  </div>
                  <div className="h-2 bg-surface-100 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${material.color} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${material.percentage}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-surface-50 rounded-lg">
                <div className="text-sm font-medium mb-2">Project Types</div>
                <div className="space-y-1 text-sm text-surface-600">
                  <div>Residential: 65%</div>
                  <div>Commercial: 35%</div>
                </div>
              </div>
              <div className="p-4 bg-surface-50 rounded-lg">
                <div className="text-sm font-medium mb-2">Suppliers</div>
                <div className="space-y-1 text-sm text-surface-600">
                  <div>Local: 45%</div>
                  <div>International: 55%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Get actionable insights",
      content: (
        <div className="bg-white rounded-xl border border-surface-200 shadow-sm p-6">
          <AnimatePresence>
            {showInsights && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-surface-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      <h4 className="font-medium text-green-700">Trending Up</h4>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Sustainable materials</span>
                        <span className="text-green-600">+28%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Local suppliers</span>
                        <span className="text-green-600">+15%</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-accent-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="h-5 w-5 text-accent-600" />
                      <h4 className="font-medium text-accent-700">Watch List</h4>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm text-accent-700">3 discontinued items</div>
                      <div className="text-sm text-accent-700">2 price increases</div>
                      <div className="text-sm text-accent-700">1 new alternative</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-primary-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <DollarSign className="h-5 w-5 text-primary-600" />
                      <h4 className="font-medium text-primary-700">Cost Analysis</h4>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm text-primary-700">15% potential savings</div>
                      <div className="text-sm text-primary-700">3 alternative options</div>
                    </div>
                  </div>
                  <div className="p-4 bg-terracotta-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="h-5 w-5 text-terracotta-600" />
                      <h4 className="font-medium text-terracotta-700">Recommendations</h4>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm text-terracotta-700">5 new eco-friendly options</div>
                      <div className="text-sm text-terracotta-700">Local supplier match</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between mb-8">
        {steps.map((step, i) => (
          <motion.button
            key={i}
            onClick={() => setActiveStep(i)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              i === activeStep 
                ? 'bg-primary-50 text-primary-700' 
                : 'text-surface-600 hover:bg-surface-50'
            }`}
            whileHover={{ scale: 1.02 }}
          >
            <span className="font-medium">{step.title}</span>
            <ChevronRight 
              className={`h-4 w-4 transition-transform ${
                i === activeStep ? 'rotate-90' : ''
              }`} 
            />
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {steps[activeStep].content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default DashboardPreview;