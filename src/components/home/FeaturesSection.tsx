import React from 'react';
import { FileText, Baseline as Timeline, Bell, Search, Lightbulb, FileBarChart } from 'lucide-react';
import FeatureCard from './FeatureCard';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: FileText,
      title: 'PDF Analysis',
      description: 'Drag and drop your specs — we extract all material data automatically.'
    },
    {
      icon: Timeline,
      title: 'Material Timeline',
      description: 'See when and how often each material was used across projects.'
    },
    {
      icon: Bell,
      title: 'Smart Alerts',
      description: 'Get notified of duplicates, outdated materials, or usage gaps.'
    },
    {
      icon: Search,
      title: 'Search & Filter',
      description: 'Instantly find what you used for any client, typology, or room.'
    },
    {
      icon: Lightbulb,
      title: 'Suggestions',
      description: 'We suggest replacements for discontinued or underperforming materials.'
    },
    {
      icon: FileBarChart,
      title: 'Usage Reports',
      description: 'Download branded PDFs with your data — ready for internal or client use.'
    }
  ];

  return (
    <section id="features" className="py-20 px-6 bg-surface-50">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-surface-900">Organize your material universe</h2>
          <p className="mt-4 text-lg text-surface-600 max-w-2xl mx-auto">
            Extract valuable insights from your past projects and make informed decisions for future designs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;