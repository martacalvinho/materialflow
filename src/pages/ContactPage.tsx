import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageSquare, Clock, Globe } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-20 px-4 md:px-6 bg-gradient-to-b from-primary-50 to-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(109,40,217,0.05),transparent)] pointer-events-none" />
          <div className="container mx-auto max-w-4xl text-center relative">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-surface-900 mb-6"
            >
              Get in Touch
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-surface-600 max-w-2xl mx-auto"
            >
              Have questions about Treqy? We're here to help you transform your material management process.
            </motion.p>
          </div>
        </section>

        {/* Contact Methods Grid */}
        <section className="py-16 px-4 md:px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Mail,
                  title: "Email Us",
                  description: "Get a response within 24 hours",
                  info: "hello@treqy.com",
                  action: "Send email",
                  href: "mailto:hello@treqy.com"
                },
                {
                  icon: Phone,
                  title: "Call Us",
                  description: "Mon-Fri from 9am to 6pm",
                  info: "+1 (555) 123-4567",
                  action: "Call now",
                  href: "tel:+15551234567"
                },
                {
                  icon: Globe,
                  title: "Global Support",
                  description: "Available in multiple time zones",
                  info: "24/7 Support for Enterprise",
                  action: "View locations",
                  href: "#locations"
                }
              ].map((method, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-xl border border-surface-200 shadow-sm"
                >
                  <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mb-4">
                    <method.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-surface-900 mb-2">{method.title}</h3>
                  <p className="text-surface-600 mb-4">{method.description}</p>
                  <p className="font-medium text-surface-900 mb-4">{method.info}</p>
                  <a 
                    href={method.href}
                    className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2"
                  >
                    {method.action}
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16 px-4 md:px-6 bg-surface-50">
          <div className="container mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl border border-surface-200 shadow-sm"
            >
              <h2 className="text-2xl font-bold text-surface-900 mb-6">Send us a message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-surface-200 rounded-lg text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-surface-200 rounded-lg text-sm"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-surface-200 rounded-lg text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-1">
                    Subject
                  </label>
                  <select className="w-full px-3 py-2 border border-surface-200 rounded-lg text-sm">
                    <option>General Inquiry</option>
                    <option>Sales Question</option>
                    <option>Technical Support</option>
                    <option>Enterprise Solutions</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-1">
                    Message
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-surface-200 rounded-lg text-sm"
                    rows={4}
                    required
                  />
                </div>

                <Button type="submit" className="w-full justify-center">
                  Send Message
                </Button>
              </form>
            </motion.div>
          </div>
        </section>

        {/* FAQ Preview */}
        <section className="py-20 px-4 md:px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-3xl font-bold text-surface-900">
                Looking for quick answers?
              </h2>
              <p className="text-lg text-surface-600">
                Check out our comprehensive FAQ section for immediate answers to common questions.
              </p>
              <Button 
                variant="outline"
                onClick={() => window.location.href = '/#faq'}
                className="mx-auto"
              >
                View FAQ
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;