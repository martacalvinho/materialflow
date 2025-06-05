import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, ArrowRight, Sparkles, Package, ChevronRight } from 'lucide-react';

const DashboardPreview: React.FC = () => {
  const [activeCard, setActiveCard] = useState(0);

  const cards = [
    {
      title: 'Upload your specs',
      content: (
        <div className="bg-white rounded-xl border border-surface-200 shadow-sm p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-primary-50 rounded-lg">
              <FileText className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <h3 className="font-medium">Villa_Renovation_Specs.pdf</h3>
              <p className="text-sm text-surface-600">Uploaded 2 minutes ago</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="p-4 bg-surface-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Living Room</span>
                <span className="text-sm text-surface-600">8 materials</span>
              </div>
              <div className="space-y-2">
                <div className="h-2 bg-surface-200 rounded-full w-3/4" />
                <div className="h-2 bg-surface-200 rounded-full w-1/2" />
              </div>
            </div>
            <div className="p-4 bg-surface-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Kitchen</span>
                <span className="text-sm text-surface-600">12 materials</span>
              </div>
              <div className="space-y-2">
                <div className="h-2 bg-surface-200 rounded-full w-full" />
                <div className="h-2 bg-surface-200 rounded-full w-2/3" />
              </div>
            </div>
            <div className="p-4 bg-surface-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Master Bath</span>
                <span className="text-sm text-surface-600">6 materials</span>
              </div>
              <div className="space-y-2">
                <div className="h-2 bg-surface-200 rounded-full w-1/2" />
                <div className="h-2 bg-surface-200 rounded-full w-1/3" />
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'We analyze patterns',
      content: (
        <div className="bg-white rounded-xl border border-surface-200 shadow-sm p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Package className="h-5 w-5 text-primary-600" />
                <h3 className="font-medium">Material Usage Analysis</h3>
              </div>
              <span className="text-sm text-surface-600">Last 12 months</span>
            </div>
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="h-3 bg-primary-100 rounded-full">
                      <motion.div 
                        className="h-full bg-primary-600 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: '85%' }}
                        transition={{ duration: 1, delay: 0.2 }}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-medium w-32">Oak Hardwood</span>
                  <span className="text-sm text-surface-600 w-16">85%</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="h-3 bg-primary-100 rounded-full">
                      <motion.div 
                        className="h-full bg-primary-600 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: '65%' }}
                        transition={{ duration: 1, delay: 0.4 }}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-medium w-32">Matte Paint</span>
                  <span className="text-sm text-surface-600 w-16">65%</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="h-3 bg-primary-100 rounded-full">
                      <motion.div 
                        className="h-full bg-primary-600 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: '45%' }}
                        transition={{ duration: 1, delay: 0.6 }}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-medium w-32">Marble</span>
                  <span className="text-sm text-surface-600 w-16">45%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Get actionable insights',
      content: (
        <div className="bg-white rounded-xl border border-surface-200 shadow-sm p-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-surface-50 rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-primary-600" />
                <h4 className="font-medium">Trending Up</h4>
              </div>
              <div className="space-y-2">
                <div className="text-sm">Sustainable materials</div>
                <div className="text-sm">Local suppliers</div>
                <div className="text-sm">Natural finishes</div>
              </div>
            </div>
            <div className="p-4 bg-surface-50 rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-accent-600" />
                <h4 className="font-medium">Watch List</h4>
              </div>
              <div className="space-y-2">
                <div className="text-sm">3 discontinued items</div>
                <div className="text-sm">2 price increases</div>
                <div className="text-sm">1 new alternative</div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % cards.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between mb-8">
        {cards.map((card, i) => (
          <motion.button
            key={i}
            onClick={() => setActiveCard(i)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              i === activeCard 
                ? 'bg-primary-50 text-primary-700' 
                : 'text-surface-600 hover:bg-surface-50'
            }`}
            whileHover={{ scale: 1.02 }}
          >
            <span className="font-medium">{card.title}</span>
            <ChevronRight 
              className={`h-4 w-4 transition-transform ${
                i === activeCard ? 'rotate-90' : ''
              }`} 
            />
          </motion.button>
        ))}
      </div>

      <motion.div
        key={activeCard}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        {cards[activeCard].content}
      </motion.div>
    </div>
  );
};

export default DashboardPreview;