
import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const PrivacyPolicyPage = () => {
  const sections = [
    {
      id: 'information-collection',
      title: 'Information We Collect',
      content: [
        'We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support.',
        'This may include your name, email address, travel preferences, and any other information you choose to provide.',
        'We also automatically collect certain information about your device and usage of our services through cookies and similar technologies.'
      ]
    },
    {
      id: 'how-we-use',
      title: 'How We Use Your Information',
      content: [
        'We use the information we collect to provide, maintain, and improve our services.',
        'This includes personalizing your travel recommendations, processing transactions, and communicating with you.',
        'We may also use your information to send you marketing communications, though you can opt out at any time.'
      ]
    },
    {
      id: 'data-sharing',
      title: 'Data Sharing and Disclosure',
      content: [
        'We do not sell, trade, or otherwise transfer your personal information to third parties without your consent.',
        'We may share your information with trusted service providers who assist us in operating our platform.',
        'We may also disclose your information if required by law or to protect our rights and safety.'
      ]
    },
    {
      id: 'data-security',
      title: 'Data Security',
      content: [
        'We implement appropriate technical and organizational measures to protect your personal information.',
        'However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.',
        'We regularly review and update our security practices to ensure your data remains protected.'
      ]
    },
    {
      id: 'your-rights',
      title: 'Your Rights and Choices',
      content: [
        'You have the right to access, update, or delete your personal information at any time.',
        'You can modify your account settings or contact us directly to exercise these rights.',
        'You may also opt out of marketing communications while continuing to receive service-related messages.'
      ]
    },
    {
      id: 'cookies',
      title: 'Cookies and Tracking Technologies',
      content: [
        'We use cookies and similar technologies to enhance your experience and analyze usage patterns.',
        'You can control cookie settings through your browser preferences.',
        'Some features of our service may not function properly if you disable cookies.'
      ]
    },
    {
      id: 'contact',
      title: 'Contact Information',
      content: [
        'If you have any questions about this Privacy Policy or our data practices, please contact us.',
        'You can reach us at privacy@youtilify.com or through our support channels.',
        'We will respond to your inquiries promptly and work to address any concerns.'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header theme="light" />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 mb-4 max-w-2xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          <p className="text-sm text-gray-500">
            Last updated: December 27, 2025
          </p>
        </motion.div>

        {/* Quick Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="bg-white border-gray-200">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Navigation</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="text-red-500 hover:text-red-600 hover:underline text-sm font-medium transition-colors"
                  >
                    {section.title}
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Privacy Policy Content */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              id={section.id}
              className="scroll-mt-24"
            >
              <Card className="bg-white border-gray-200 shadow-sm">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                      {index + 1}
                    </span>
                    {section.title}
                  </h2>
                  <div className="space-y-4">
                    {section.content.map((paragraph, pIndex) => (
                      <p key={pIndex} className="text-gray-700 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Questions About Your Privacy?
              </h3>
              <p className="text-gray-700 mb-6">
                We're here to help. Contact us if you have any questions about how we handle your data.
              </p>
              <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Contact Support
              </button>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      <Footer theme="light" />
    </div>
  );
};

export default PrivacyPolicyPage;
