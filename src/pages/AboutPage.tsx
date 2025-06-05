import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Globe, Sparkles, Target, ArrowRight, Users, Lightbulb, Rocket } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-20 px-4 md:px-6 bg-gradient-to-b from-primary-50 to-white">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-primary-100 text-primary-600 mb-8"
            >
              <Users size={16} />
              <span className="text-sm font-medium">Built by architects, for architects</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-surface-900 mb-6"
            >
              Transforming Material Knowledge into Design Intelligence
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-surface-600 max-w-3xl mx-auto mb-8"
            >
              We're revolutionizing how architecture studios manage, analyze, and leverage their material specifications. Turn your past project data into actionable insights for smarter design decisions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button 
                size="lg"
                className="group"
              >
                <span>Start Your Journey</span>
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Experience Grid */}
        <section className="py-16 bg-surface-50 px-4 md:px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Building2,
                  title: "10+ Years",
                  description: "Of architectural expertise across diverse project types"
                },
                {
                  icon: Globe,
                  title: "Global Reach",
                  description: "Experience in London, New York, Chicago, Tokyo"
                },
                {
                  icon: Target,
                  title: "Clear Focus",
                  description: "Dedicated to enhancing material intelligence"
                },
                {
                  icon: Sparkles,
                  title: "Innovation",
                  description: "Continuously evolving with your needs"
                }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="bg-white p-6 rounded-xl border border-surface-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="mx-auto w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mb-4">
                      <stat.icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-surface-900 mb-2">{stat.title}</h3>
                    <p className="text-surface-600">{stat.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Sections */}
        <section className="py-20 px-4 md:px-6">
          <div className="container mx-auto max-w-4xl space-y-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mb-6">
                <Lightbulb className="w-6 h-6 text-primary-600" />
              </div>
              <h2 className="text-3xl font-bold text-surface-900 mb-6">The "Aha!" Moment</h2>
              <p className="text-lg text-surface-600 leading-relaxed">
                Every architecture studio sits on a goldmine of material knowledge – locked away in past project specs. We watched talented architects spend countless hours searching through old PDFs, recreating material schedules, and missing opportunities to leverage their studio's collective experience. That's when we knew: there had to be a better way to transform this dormant information into a powerful, proactive tool for smarter design.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 bg-terracotta-50 rounded-lg flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-terracotta-600" />
              </div>
              <h2 className="text-3xl font-bold text-surface-900 mb-6">Our Mission</h2>
              <p className="text-lg text-surface-600 leading-relaxed">
                We're transforming how architects interact with their material knowledge. Imagine instantly knowing every project where you've used a specific material, understanding usage patterns across different building types, and getting alerts about discontinued products before they affect your projects. That's the power of Treqy – turning your past decisions into future insights.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 bg-secondary-50 rounded-lg flex items-center justify-center mb-6">
                <Rocket className="w-6 h-6 text-secondary-600" />
              </div>
              <h2 className="text-3xl font-bold text-surface-900 mb-6">Looking Forward</h2>
              <p className="text-lg text-surface-600 leading-relaxed">
                We're just getting started. Our vision goes beyond just organizing materials – we're building a platform that learns from your studio's unique material preferences, helps you make more sustainable choices, and transforms your specification process from a time-consuming task into a strategic advantage. Join us in shaping the future of material intelligence in architecture.
              </p>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 md:px-6 bg-primary-900 text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold">Ready to Transform Your Material Knowledge?</h2>
              <p className="text-lg text-primary-100 max-w-2xl mx-auto">
                Join forward-thinking architecture studios already using Treqy to make smarter material decisions.
              </p>
              <Button 
                size="lg"
                className="bg-white text-primary-900 hover:bg-primary-50"
              >
                Get Started Free
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;