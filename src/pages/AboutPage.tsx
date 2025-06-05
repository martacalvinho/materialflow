import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Globe, Sparkles, Target } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-20 px-4 md:px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-surface-900 mb-6"
            >
              By Architects, For Architects
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-surface-600 max-w-3xl mx-auto"
            >
              Born from real-world architectural experience, Treqy transforms how design studios manage and leverage their material knowledge. Our founder's decade of experience in leading global firms showed us exactly what architects need.
            </motion.p>
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
                  description: "Of architectural expertise"
                },
                {
                  icon: Globe,
                  title: "4 Global Cities",
                  description: "London, New York, Chicago, Tokyo"
                },
                {
                  icon: Target,
                  title: "1 Mission",
                  description: "Make material data work for you"
                },
                {
                  icon: Sparkles,
                  title: "Infinite Potential",
                  description: "For your material library"
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
                  <div className="bg-white p-6 rounded-xl border border-surface-200 shadow-sm">
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
          <div className="container mx-auto max-w-4xl space-y-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold text-surface-900 mb-6">The Spark</h2>
              <p className="text-lg text-surface-600">
                Every architecture studio sits on a goldmine of material knowledge – locked away in past project specs. We watched talented architects spend countless hours searching through old PDFs, recreating material schedules, and missing opportunities to leverage their studio's collective experience. That's when we knew: there had to be a better way.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold text-surface-900 mb-6">Our Mission</h2>
              <p className="text-lg text-surface-600">
                We're transforming how architects interact with their material knowledge. Imagine instantly knowing every project where you've used a specific material, understanding usage patterns across different building types, and getting alerts about discontinued products before they affect your projects. That's the power of Treqy – turning your past decisions into future insights.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold text-surface-900 mb-6">The Future</h2>
              <p className="text-lg text-surface-600">
                We're just getting started. Our vision goes beyond just organizing materials – we're building a platform that learns from your studio's unique material preferences, helps you make more sustainable choices, and transforms your specification process from a time-consuming task into a strategic advantage. Join us in shaping the future of material intelligence in architecture.
              </p>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;