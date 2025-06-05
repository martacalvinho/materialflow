import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24">
        <section className="py-20 px-4 md:px-6 bg-gradient-to-b from-primary-50 to-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(109,40,217,0.05),transparent)] pointer-events-none" />
          <div className="container mx-auto max-w-4xl text-center relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-primary-100 text-primary-600 mb-8"
            >
              <Shield size={16} />
              <span className="text-sm font-medium">Last updated: March 15, 2024</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-surface-900 mb-6"
            >
              Privacy Policy
            </motion.h1>
          </div>
        </section>

        <section className="py-16 px-4 md:px-6">
          <div className="container mx-auto max-w-3xl">
            <div className="prose prose-lg">
              <h2>Introduction</h2>
              <p>
                At Treqy, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our material management platform.
              </p>

              <h2>Information We Collect</h2>
              <h3>Account Information</h3>
              <p>
                When you create an account, we collect:
              </p>
              <ul>
                <li>Your name and email address</li>
                <li>Company/studio information</li>
                <li>Password (encrypted)</li>
              </ul>

              <h3>Project Data</h3>
              <p>
                When you use our platform, we collect:
              </p>
              <ul>
                <li>Project specifications and documentation</li>
                <li>Material usage data</li>
                <li>Client information you provide</li>
                <li>Usage patterns and preferences</li>
              </ul>

              <h2>How We Use Your Information</h2>
              <p>
                We use the collected information to:
              </p>
              <ul>
                <li>Provide and maintain our services</li>
                <li>Analyze and improve material usage patterns</li>
                <li>Generate insights and recommendations</li>
                <li>Send service updates and notifications</li>
                <li>Respond to your requests and support needs</li>
              </ul>

              <h2>Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to maintain the security of your information, including:
              </p>
              <ul>
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments</li>
                <li>Access controls and authentication</li>
                <li>Regular backups and disaster recovery procedures</li>
              </ul>

              <h2>Data Sharing</h2>
              <p>
                We do not sell your personal information. We may share your information with:
              </p>
              <ul>
                <li>Service providers who assist in operating our platform</li>
                <li>Legal authorities when required by law</li>
                <li>Business partners with your explicit consent</li>
              </ul>

              <h2>Your Rights</h2>
              <p>
                You have the right to:
              </p>
              <ul>
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Export your data</li>
                <li>Opt-out of marketing communications</li>
              </ul>

              <h2>Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p>
                Email: privacy@treqy.com<br />
                Address: 123 Architecture Lane, Suite 100<br />
                Design District, NY 10001
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPage;