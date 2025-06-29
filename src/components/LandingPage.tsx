import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  ArrowRight, 
  Star, 
  Users, 
  Shield, 
  Smartphone, 
  Globe, 
  CheckCircle,
  Play,
  Menu,
  X,
  StickyNote,
  FileText,
  Camera,
  Calendar,
  MessageCircle,
  Table,
  Settings
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features = [
    {
      icon: StickyNote,
      title: 'Smart Notes',
      description: 'Organize your thoughts with beautiful, searchable notes',
      color: 'from-amber-500 to-orange-500'
    },
    {
      icon: FileText,
      title: 'Dynamic Reports',
      description: 'Create comprehensive reports with text and photos',
      color: 'from-emerald-500 to-green-500'
    },
    {
      icon: Camera,
      title: 'Instant Capture',
      description: 'Take photos with automatic timestamp and location',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Calendar,
      title: 'Smart Calendar',
      description: 'Schedule and manage your activities beautifully',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp Integration',
      description: 'Connect and manage your conversations seamlessly',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Table,
      title: 'Data Management',
      description: 'Powerful spreadsheet tools and external connections',
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Project Manager',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      text: 'This app has revolutionized how I manage my daily tasks. The integration between all features is seamless!'
    },
    {
      name: 'Michael Chen',
      role: 'Entrepreneur',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      text: 'The WhatsApp integration and camera features make this perfect for field work. Highly recommended!'
    },
    {
      name: 'Emily Davis',
      role: 'Designer',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      text: 'Beautiful design and intuitive interface. Everything I need in one place!'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Active Users' },
    { number: '99.9%', label: 'Uptime' },
    { number: '4.9/5', label: 'User Rating' },
    { number: '24/7', label: 'Support' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-rose-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-50 px-6 py-4"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ProductiveHub
              </h1>
              <p className="text-xs text-slate-500">All-in-One Solution</p>
            </div>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-slate-600 hover:text-slate-800 font-medium transition-colors">Features</a>
            <a href="#testimonials" className="text-slate-600 hover:text-slate-800 font-medium transition-colors">Reviews</a>
            <a href="#pricing" className="text-slate-600 hover:text-slate-800 font-medium transition-colors">Pricing</a>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onGetStarted}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
            >
              Get Started
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-800 rounded-lg"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden"
            >
              <div className="p-6 space-y-4">
                <a href="#features" className="block text-slate-600 hover:text-slate-800 font-medium transition-colors">Features</a>
                <a href="#testimonials" className="block text-slate-600 hover:text-slate-800 font-medium transition-colors">Reviews</a>
                <a href="#pricing" className="block text-slate-600 hover:text-slate-800 font-medium transition-colors">Pricing</a>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onGetStarted}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow-lg font-semibold"
                >
                  Get Started
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
              <Star className="w-4 h-4 mr-2" />
              Trusted by 10,000+ users worldwide
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-slate-800 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 leading-tight">
              Your Ultimate
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Productivity Hub
              </span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Streamline your workflow with our all-in-one productivity suite. Notes, reports, calendar, camera, WhatsApp integration, and more - all in one beautiful, responsive application.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={onGetStarted}
              className="flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 font-semibold text-lg"
            >
              <Zap className="w-6 h-6 mr-3" />
              Start Free Trial
              <ArrowRight className="w-5 h-5 ml-3" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center px-8 py-4 bg-white/80 backdrop-blur-xl text-slate-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold border border-white/20"
            >
              <Play className="w-5 h-5 mr-3" />
              Watch Demo
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-slate-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 px-6 py-20 bg-white/30 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent mb-6">
              Everything You Need
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Powerful features designed to boost your productivity and streamline your workflow
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-8 hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 to-purple-600 bg-clip-text text-transparent mb-6">
              Loved by Users
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              See what our users are saying about ProductiveHub
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -5 }}
                className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-8 hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-slate-800 text-lg">{testimonial.name}</h4>
                    <p className="text-slate-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-slate-700 leading-relaxed italic">"{testimonial.text}"</p>
                <div className="flex items-center mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Boost Your Productivity?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of users who have transformed their workflow with ProductiveHub
            </p>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={onGetStarted}
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 font-bold text-lg"
            >
              <Zap className="w-6 h-6 mr-3" />
              Get Started Now
              <ArrowRight className="w-5 h-5 ml-3" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold">ProductiveHub</h3>
              </div>
              <p className="text-slate-400 mb-6 max-w-md">
                The ultimate productivity suite that brings all your tools together in one beautiful, responsive application.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span className="text-sm text-slate-400">Secure & Private</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="w-5 h-5 text-blue-400" />
                  <span className="text-sm text-slate-400">Global Access</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Features</h4>
              <ul className="space-y-2 text-slate-400">
                <li>Smart Notes</li>
                <li>Dynamic Reports</li>
                <li>Camera Integration</li>
                <li>Calendar Management</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400">
            <p>&copy; 2025 ProductiveHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;