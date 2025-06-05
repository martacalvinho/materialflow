import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Button from '../ui/Button';

const PricingSection: React.FC = () => {
  const plans = [
    {
      name: 'Starter',
      description: 'For small studios just getting started.',
      price: '$150',
      period: '/month',
      features: [
        'Upload PDFs manually',
        'Access to basic dashboard',
        'Material analysis',
        'Personal reports',
        'Up to 20 projects'
      ],
      highlight: false,
      buttonText: 'Start Trial',
      buttonVariant: 'outline' as const
    },
    {
      name: 'Pro',
      description: 'Perfect for active architecture teams.',
      price: '$350',
      period: '/month',
      features: [
        'Everything in Starter, plus:',
        'Material tagging & notes',
        'Smart alerts system',
        'Full material analysis',
        'Export PDF',
        'Coming soon: DIY Kit to organize physical library',
        'Up to 100 projects'
      ],
      highlight: true,
      buttonText: 'Try Pro',
      buttonVariant: 'primary' as const
    },
    {
      name: 'Enterprise',
      description: 'For large offices with advanced needs.',
      price: 'Custom',
      period: '',
      features: [
        'Everything in Pro, plus:',
        'Custom branding',
        'Priority support',
        'On-call assistance',
        'Vendor analytics',
        'Unlimited projects',
        'Coming soon: monthly physical material library organization'
      ],
      highlight: false,
      buttonText: 'Contact Sales',
      buttonVariant: 'outline' as const
    }
  ];

  return (
    <section id="pricing" className="py-20 px-6 bg-surface-50">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-surface-900">Simple, value-based pricing</h2>
          <p className="mt-4 text-lg text-surface-600 max-w-2xl mx-auto">
            Choose the plan that best fits your studio's needs and scale as you grow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`bg-white rounded-xl border ${plan.highlight ? 'border-primary-300 shadow-lg ring-1 ring-primary-300' : 'border-surface-200 shadow-sm'} overflow-hidden flex flex-col`}
            >
              {plan.highlight && (
                <div className="bg-primary-600 text-white text-center py-2 text-sm font-medium">
                  Most Popular
                </div>
              )}
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-surface-900">{plan.name}</h3>
                <p className="mt-2 text-surface-600">{plan.description}</p>
                <div className="mt-6 flex items-end">
                  <span className="text-4xl font-bold text-surface-900">{plan.price}</span>
                  <span className="text-surface-600 ml-1 mb-1">{plan.period}</span>
                </div>
                
                <div className="mt-8 space-y-4 flex-1">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex">
                      <Check size={20} className="text-primary-600 mt-0.5 mr-3 shrink-0" />
                      <span className="text-surface-700">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8">
                  <Button
                    variant={plan.buttonVariant}
                    className="w-full justify-center"
                  >
                    {plan.buttonText}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;