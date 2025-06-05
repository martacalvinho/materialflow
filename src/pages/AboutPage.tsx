import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Globe, Users, Sparkles } from 'lucide-react';
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
              Treqy was founded by an architect with over a decade of experience in architectural practice, working on diverse projects in leading global cities including London, New York, Chicago, and Tokyo.
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
                  description: "Of architectural practice experience"
                },
                {
                  icon: Globe,
                  title: "4 Global Cities",
                  description: "London, New York, Chicago, Tokyo"
                },
                {
                  icon: Users,
                  title: "500+ Projects",
                  description: "Analyzed and organized"
                },
                {
                  icon: Sparkles,
                  title: "15,000+ Materials",
                  description: "Cataloged and tracked"
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
              <h2 className="text-3xl font-bold text-surface-900 mb-6">The "Aha!" Moment</h2>
              <p className="text-lg text-surface-600">
                We saw firsthand how valuable data within past projects was often lost or difficult to access, leading to inefficiencies, missed opportunities for optimization, and a reactive approach to material selection. This sparked the vision for Treqy – a way to transform this dormant information into a powerful, proactive tool for smarter design.
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
                Our mission at Treqy is simple: to empower architects and design studios by making their material libraries and project histories intelligent. We provide an intuitive platform that automatically analyzes your specs, uncovers actionable insights, and helps you make data-driven decisions, faster and more effectively. We believe that by organizing this 'material universe,' studios can enhance creativity, improve efficiency, and deliver even better design outcomes.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold text-surface-900 mb-6">Looking Forward</h2>
              <p className="text-lg text-surface-600">
                Built on a foundation of real-world architectural experience, Treqy is dedicated to evolving alongside the needs of the modern practice. We're committed to helping you turn your material knowledge into a strategic asset.
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