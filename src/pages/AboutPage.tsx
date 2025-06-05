import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Globe, Sparkles, Target, ArrowRight, Users, Lightbulb, Rocket, TrendingUp, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-20 px-4 md:px-6 bg-gradient-to-b from-primary-50 to-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(109,40,217,0.05),transparent)] pointer-events-none" />
          <div className="container mx-auto max-w-4xl text-center relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-primary-100 text-primary-600 mb-8"
            >
              <Users size={16} />
              <span className="text-sm font-medium">By Architects, For Architects</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-surface-900 mb-6 leading-tight"
            >
              Transforming Material Knowledge into Design Intelligence
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-surface-600 max-w-3xl mx-auto mb-8"
            >
              With a decade of architectural practice spanning global hubs like London, New York, Chicago, and Tokyo, we intimately understand the challenges you face. We've lived the reality of navigating complex projects and the often-overlooked goldmine hidden within material specifications.
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
                  description: "Of architectural practice experience",
                  color: "bg-primary-50",
                  iconColor: "text-primary-600"
                },
                {
                  icon: Globe,
                  title: "4 Global Cities",
                  description: "London, New York, Chicago, Tokyo",
                  color: "bg-secondary-50",
                  iconColor: "text-secondary-600"
                },
                {
                  icon: Target,
                  title: "Vast Data Pools",
                  description: "Observed across years of architectural specs",
                  color: "bg-terracotta-50",
                  iconColor: "text-terracotta-600"
                },
                {
                  icon: Sparkles,
                  title: "Actionable Clarity",
                  description: "Transforming complex data into smart design choices",
                  color: "bg-accent-50",
                  iconColor: "text-accent-600"
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
                    <div className={`mx-auto w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
                      <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
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
            {/* The "Aha!" Moment */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mb-6">
                  <Lightbulb className="w-6 h-6 text-primary-600" />
                </div>
                <h2 className="text-3xl font-bold text-surface-900 mb-6">The "Aha!" Moment</h2>
                <div className="bg-primary-50 text-primary-700 text-lg md:text-xl font-medium p-6 rounded-lg mb-8 max-w-2xl">
                  "We knew there had to be a way to transform that chaos into clarity, that history into a powerful, proactive design tool."
                </div>
                <p className="text-lg text-surface-600 leading-relaxed">
                  Ever felt that critical material knowledge from past projects was just...gone? Lost in old PDFs or forgotten spreadsheets? We've been there. That frustration – seeing valuable data lie dormant while inefficiencies crept in – was the spark for Treqy.
                </p>
              </div>
            </motion.div>

            {/* Our Mission */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-terracotta-50 rounded-lg flex items-center justify-center mb-6">
                  <Compass className="w-6 h-6 text-terracotta-600" />
                </div>
                <h2 className="text-3xl font-bold text-surface-900 mb-6">Our Mission</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {[
                    {
                      icon: Target,
                      title: "Intuitive Analysis",
                      description: "Automatically analyze specs and reveal actionable insights"
                    },
                    {
                      icon: Sparkles,
                      title: "Smart Decisions",
                      description: "Make data-driven choices with speed and confidence"
                    },
                    {
                      icon: TrendingUp,
                      title: "Better Outcomes",
                      description: "Boost creativity and slash inefficiencies"
                    }
                  ].map((card, index) => (
                    <div key={index} className="bg-surface-50 p-6 rounded-lg">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mb-4 mx-auto">
                        <card.icon className="w-5 h-5 text-primary-600" />
                      </div>
                      <h3 className="font-medium mb-2">{card.title}</h3>
                      <p className="text-sm text-surface-600">{card.description}</p>
                    </div>
                  ))}
                </div>
                <p className="text-lg text-surface-600 leading-relaxed">
                  Our mission is clear: to <span className="font-medium">give you back control</span> and <span className="font-medium">harness the intelligence</span> locked within your material libraries and project histories. Imagine your entire 'material universe,\' perfectly organized, working for you.
                </p>
              </div>
            </motion.div>

            {/* Looking Forward */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-secondary-50 rounded-lg flex items-center justify-center mb-6">
                  <Rocket className="w-6 h-6 text-secondary-600" />
                </div>
                <h2 className="text-3xl font-bold text-surface-900 mb-6">Looking Forward</h2>
                <div className="bg-secondary-50 text-secondary-700 text-lg md:text-xl font-medium p-6 rounded-lg mb-8 max-w-2xl">
                  "We're obsessed with understanding the dynamic needs of modern practice."
                </div>
                <p className="text-lg text-surface-600 leading-relaxed">
                  Grounded in real-world architectural experience, Treqy isn't just a tool; it's an evolving partner. We're passionately committed to helping you transform your accumulated material knowledge from a simple record into a powerful strategic asset for every future project.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 md:px-6 bg-primary-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.1),transparent)] pointer-events-none" />
          <div className="container mx-auto max-w-4xl text-center relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold">Ready to Transform Your Material Knowledge?</h2>
              <p className="text-lg text-primary-100 max-w-2xl mx-auto">
                Join forward-thinking architecture studios already using Treqy to make smarter material decisions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/dashboard">
                  <Button 
                    size="lg"
                    className="bg-white text-primary-900 hover:bg-primary-50 w-full sm:w-auto"
                  >
                    Try Interactive Demo
                  </Button>
                </Link>
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/10 w-full sm:w-auto"
                >
                  Contact Sales
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;