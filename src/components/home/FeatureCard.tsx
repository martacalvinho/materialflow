import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: "-100px" }}
      className="bg-white rounded-xl p-6 border border-surface-200 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="bg-primary-50 p-3 rounded-lg w-fit mb-4">
        <Icon className="text-primary-600" size={24} />
      </div>
      <h3 className="text-lg font-semibold text-surface-900 mb-2">{title}</h3>
      <p className="text-surface-600">{description}</p>
    </motion.div>
  );
};

export default FeatureCard;