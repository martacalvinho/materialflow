import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);
  
  const faqs = [
    {
      question: 'How long does it take to process my specs?',
      answer: 'Currently, it takes 2-3 business days for our team to process and analyze your project specifications. We\'re working on automating this process with AI to significantly reduce processing time in the future.'
    },
    {
      question: 'Can I track materials across multiple clients?',
      answer: 'Yes. Once your specs are processed, you\'ll have filters by project, client, typology and more. This makes it easy to see patterns in material usage across different types of projects or specific clients.'
    },
    {
      question: 'How do you handle material extraction?',
      answer: 'Our team carefully reviews each PDF to identify and categorize materials. While this process is currently manual to ensure accuracy, we\'re developing AI-assisted tools to automate and enhance this process while maintaining high accuracy standards.'
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
      answer: 'Simply sign up for an account, select your plan, and upload your first project PDF. Our team will begin processing your specs within one business day, and you\'ll receive a notification when your data is ready to explore in the dashboard.'
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