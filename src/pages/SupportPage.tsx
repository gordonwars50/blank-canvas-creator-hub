
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, BookOpen, MessageCircle, HelpCircle, ChevronRight, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import { Link } from 'react-router-dom';
import supportArticles from '@/data/support/supportArticles.json';

const SupportPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = supportArticles.articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const categories = [
    {
      title: 'Getting Started',
      icon: BookOpen,
      description: 'Learn the basics of using Youtilify',
      color: 'bg-blue-500'
    },
    {
      title: 'Account & Billing',
      icon: MessageCircle,
      description: 'Manage your account and subscription',
      color: 'bg-green-500'
    },
    {
      title: 'Trip Planning',
      icon: HelpCircle,
      description: 'Plan and organize your perfect trip',
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Header theme="dark" />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            How can we help you?
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Find answers to common questions, browse our knowledge base, or get in touch with our support team.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-4 text-lg bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-red-500"
            />
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Card key={category.title} className="bg-gray-800 border-gray-700 hover:border-red-500 transition-colors cursor-pointer">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mb-4`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{category.title}</h3>
                  <p className="text-gray-400">{category.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </motion.div>

        {/* Articles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-white mb-8">Popular Articles</h2>
          
          {filteredArticles.length === 0 ? (
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-8 text-center">
                <p className="text-gray-400">No articles found matching your search.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link to={`/support/article/${article.slug}`}>
                    <Card className="bg-gray-800 border-gray-700 hover:border-red-500 transition-colors cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-white mb-2 hover:text-red-400 transition-colors">
                              {article.title}
                            </h3>
                            <p className="text-gray-400 mb-3 line-clamp-2">
                              {article.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {article.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="bg-gray-700 text-gray-300">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400 ml-4 flex-shrink-0" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <Card className="bg-red-950 border-red-800">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-white mb-4">
                Still need help?
              </h3>
              <p className="text-gray-300 mb-6">
                Can't find what you're looking for? Our support team is here to help you get the most out of Youtilify.
              </p>
              <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Contact Support
              </button>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      <Footer theme="dark" />
    </div>
  );
};

export default SupportPage;
