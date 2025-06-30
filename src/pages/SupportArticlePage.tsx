
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Tag, Share2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import { Link, useParams } from 'react-router-dom';
import supportArticles from '@/data/support/supportArticles.json';

const SupportArticlePage = () => {
  const { slug } = useParams();
  const article = supportArticles.articles.find(article => article.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header theme="dark" />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Article Not Found</h1>
            <p className="text-gray-400 mb-8">The article you're looking for doesn't exist.</p>
            <Link to="/support">
              <Button className="bg-red-500 hover:bg-red-600">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Support
              </Button>
            </Link>
          </div>
        </main>
        <Footer theme="dark" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header theme="dark" />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link to="/support">
            <Button variant="ghost" className="text-gray-400 hover:text-white hover:bg-gray-800">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Support
            </Button>
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-gray-700 text-gray-300">
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
            {article.title}
          </h1>
          
          <div className="flex items-center gap-6 text-gray-400">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{article.readTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Published: {article.publishedAt}</span>
            </div>
          </div>
        </motion.div>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-8">
              <div className="prose prose-invert max-w-none">
                {article.content.map((section, index) => (
                  <div key={index} className="mb-6">
                    {section.type === 'heading' && (
                      <h2 className="text-2xl font-bold text-white mb-4">
                        {section.text}
                      </h2>
                    )}
                    {section.type === 'paragraph' && (
                      <p className="text-gray-300 leading-relaxed mb-4">
                        {section.text}
                      </p>
                    )}
                    {section.type === 'callout' && (
                      <div className={`p-4 rounded-lg mb-4 ${
                        section.variant === 'info' ? 'bg-blue-900 border-blue-700' :
                        section.variant === 'success' ? 'bg-green-900 border-green-700' :
                        section.variant === 'warning' ? 'bg-yellow-900 border-yellow-700' :
                        'bg-gray-700 border-gray-600'
                      } border`}>
                        <p className="text-white">{section.text}</p>
                      </div>
                    )}
                    {section.type === 'image' && (
                      <div className="mb-6">
                        <img 
                          src={section.src} 
                          alt={section.alt} 
                          className="w-full rounded-lg"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Share Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 text-center"
        >
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Was this article helpful?
              </h3>
              <div className="flex justify-center gap-4">
                <Button className="bg-green-600 hover:bg-green-700">
                  Yes, it helped
                </Button>
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                  No, I need more help
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Related Articles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {supportArticles.articles
              .filter(relatedArticle => 
                relatedArticle.id !== article.id && 
                relatedArticle.tags.some(tag => article.tags.includes(tag))
              )
              .slice(0, 4)
              .map((relatedArticle) => (
                <Link key={relatedArticle.id} to={`/support/article/${relatedArticle.slug}`}>
                  <Card className="bg-gray-800 border-gray-700 hover:border-red-500 transition-colors cursor-pointer h-full">
                    <CardContent className="p-6">
                      <h4 className="text-lg font-semibold text-white mb-2 hover:text-red-400 transition-colors">
                        {relatedArticle.title}
                      </h4>
                      <p className="text-gray-400 mb-3 line-clamp-2">
                        {relatedArticle.description}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{relatedArticle.readTime}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </motion.div>
      </main>

      <Footer theme="dark" />
    </div>
  );
};

export default SupportArticlePage;
