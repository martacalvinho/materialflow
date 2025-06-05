import React from 'react';
import { motion } from 'framer-motion';
import { Scale } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const TermsPage: React.FC = () => {
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
              <Scale size={16} />
              <span className="text-sm font-medium">Last updated: March 15, 2024</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-surface-900 mb-6"
            >
              Terms of Service
            </motion.h1>
          </div>
        </section>

        <section className="py-16 px-4 md:px-6">
          <div className="container mx-auto max-w-3xl">
            <div className="prose prose-lg">
              <h2>1. Agreement to Terms</h2>
              <p>
                By accessing or using Treqy's material management platform, you agree to be bound by these Terms of Service and all applicable laws and regulations.
              </p>

              <h2>2. Description of Service</h2>
              <p>
                Treqy provides a platform for architectural studios to:
              </p>
              <ul>
                <li>Upload and analyze project specifications</li>
                <li>Track material usage across projects</li>
                <li>Generate insights and reports</li>
                <li>Manage material libraries</li>
              </ul>

              <h2>3. User Accounts</h2>
              <p>
                To use our services, you must:
              </p>
              <ul>
                <li>Create an account with accurate information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Promptly notify us of any unauthorized access</li>
                <li>Be at least 18 years old</li>
              </ul>

              <h2>4. Subscription and Payments</h2>
              <p>
                Our service is provided on a subscription basis:
              </p>
              <ul>
                <li>Payments are processed securely through our payment providers</li>
                <li>Subscriptions auto-renew unless cancelled</li>
                <li>Refunds are provided according to our refund policy</li>
                <li>Prices may change with 30 days notice</li>
              </ul>

              <h2>5. User Content</h2>
              <p>
                You retain ownership of your content but grant us license to:
              </p>
              <ul>
                <li>Store and process your data</li>
                <li>Generate analytics and insights</li>
                <li>Improve our services</li>
              </ul>

              <h2>6. Acceptable Use</h2>
              <p>
                You agree not to:
              </p>
              <ul>
                <li>Violate any laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Upload malicious content</li>
                <li>Attempt to gain unauthorized access</li>
                <li>Resell or redistribute our service</li>
              </ul>

              <h2>7. Service Availability</h2>
              <p>
                While we strive for 99.9% uptime:
              </p>
              <ul>
                <li>We may perform scheduled maintenance</li>
                <li>Service may be interrupted for updates</li>
                <li>We're not liable for factors beyond our control</li>
              </ul>

              <h2>8. Termination</h2>
              <p>
                We may terminate or suspend access to our service:
              </p>
              <ul>
                <li>For violations of these terms</li>
                <li>At our sole discretion</li>
                <li>Without prior notice</li>
              </ul>

              <h2>9. Limitation of Liability</h2>
              <p>
                Treqy is provided "as is" without warranties. We're not liable for:
              </p>
              <ul>
                <li>Indirect or consequential damages</li>
                <li>Data loss or corruption</li>
                <li>Service interruptions</li>
                <li>Third-party actions</li>
              </ul>

              <h2>10. Changes to Terms</h2>
              <p>
                We may modify these terms:
              </p>
              <ul>
                <li>With 30 days notice for material changes</li>
                <li>Effective immediately for non-material changes</li>
                <li>Notice will be provided via email or in-app notification</li>
              </ul>

              <h2>11. Contact Information</h2>
              <p>
                For questions about these terms, contact us at:
              </p>
              <p>
                Email: legal@treqy.com<br />
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

export default TermsPage;