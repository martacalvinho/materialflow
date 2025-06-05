import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);
  
  const faqs = [
    {
      question: 'Do I need to tag materials myself?',
      answer: 'No. Our system extracts materials directly from your uploaded specs. We use advanced algorithms to identify and categorize materials automatically, saving you hours of manual work.'
    },
    {
      question: 'Can I track materials across multiple clients?',
      answer: 'Yes. You\'ll have filters by project, client, typology and more. This makes it easy to see patterns in material usage across different types of projects or specific clients.'
    },
    {
      question: 'How accurate is the material extraction?',
      answer: 'Our system achieves approximately 95% accuracy in identifying materials from well-structured PDFs. Any missed materials can be easily added manually, and our system continuously improves with usage.'
    },
    {
      question: 'Is my data secure and private?',
      answer: 'Absolutely. Your project data is encrypted and stored securely. Each studio gets their own private database, and we never share your information with third parties without explicit permission.'
    },
    {
      question: 'Can I export the data for presentations?',
      answer: 'Yes. You can generate beautiful, branded reports for both internal use and client presentations. These reports can be customized to highlight specific aspects of your material usage.'
    },
    {
      question: 'How do I get started?',
      answer: 'Simply sign up for an account, select your plan, and upload your first project PDF. Our system will guide you through the process, and you\'ll have your first insights within minutes.'
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 px-6">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-surface-900">Frequently Asked Questions</h2>
          <p className="mt-4 text-lg text-surface-600 max-w-2xl mx-auto">
            Everything you need to know about Treqy's material intelligence platform.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="border border-surface-200 rounded-lg overflow-hidden"
            >
              <button 
                className={`w-full flex justify-between items-center p-6 text-left ${openIndex === index ? 'bg-primary-50' : 'bg-white'}`}
                onClick={() => toggleFaq(index)}
              >
                <span className="font-semibold text-surface-900">{faq.question}</span>
                {openIndex === index ? 
                  <Minus size={18} className="text-primary-600" /> : 
                  <Plus size={18} className="text-surface-500" />
                }
              </button>
              {openIndex === index && (
                <div className="p-6 pt-0 text-surface-700">
                  <p>{faq.answer}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;