import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';

const ContactSection: React.FC = () => {
  return (
    <section className="py-20 px-4 md:px-6 bg-white">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="container mx-auto max-w-3xl text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-surface-900 mb-4">
          Unsure How Treqy Can Help Your Studio?
        </h2>
        <p className="text-lg text-surface-600 mb-8 max-w-2xl mx-auto">
          Have questions about getting started, which plan is right for you, or how Treqy can specifically address your material management challenges? We're here to help.
        </p>
        <Button size="lg">Contact Us for Details</Button>
      </motion.div>
    </section>
  );
};

export default ContactSection;