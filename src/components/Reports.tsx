import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Download, FileText, Image, Calendar, Search, Filter, Eye, BarChart3, TrendingUp } from 'lucide-react';

interface Report {
  id: number;
  title: string;
  description: string;
  type: 'text' | 'photo' | 'mixed';
  status: 'draft' | 'completed';
  createdAt: string;
  photos: string[];
  content: string;
  views: number;
  size: string;
}

const Reports: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([
    {
      id: 1,
      title: 'Monthly Progress Report',
      description: 'Comprehensive analysis of project milestones and achievements',
      type: 'mixed',
      status: 'completed',
      createdAt: '2025-01-10',
      photos: ['https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg'],
      content: 'This month we achieved significant progress in multiple areas including user engagement, feature development, and performance optimization...',
      views: 24,
      size: '2.4 MB'
    },
    {
      id: 2,
      title: 'Site Inspection Report',
      description: 'Detailed documentation of site conditions and observations',
      type: 'photo',
      status: 'draft',
      createdAt: '2025-01-09',
      photos: ['https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg', 'https://images.pexels.com/photos/3184293/pexels-photo-3184293.jpeg'],
      content: 'Site inspection conducted on January 9th, 2025. Overall conditions are satisfactory with minor maintenance required...',
      views: 12,
      size: '5.1 MB'
    },
    {
      id: 3,
      title: 'Financial Analysis Q1',
      description: 'Quarterly financial performance and budget analysis',
      type: 'text',
      status: 'completed',
      createdAt: '2025-01-08',
      photos: [],
      content: 'Q1 financial analysis shows positive growth trends with revenue increasing by 15% compared to previous quarter...',
      views: 45,
      size: '1.2 MB'
    }
  ]);

  const [showNewReportModal, setShowNewReportModal] = useState(false);
  const [newReport, setNewReport] = useState({
    title: '',
    description: '',
    type: 'text' as 'text' | 'photo' | 'mixed',
    content: ''
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateReport = () => {
    if (newReport.title.trim()) {
      const report: Report = {
        id: Date.now(),
        title: newReport.title,
        description: newReport.description,
        type: newReport.type,
        status: 'draft',
        createdAt: new Date().toISOString().split('T')[0],
        photos: [],
        content: newReport.content,
        views: 0,
        size: '0.5 MB'
      };
      setReports([report, ...reports]);
      setNewReport({ title: '', description: '', type: 'text', content: '' });
      setShowNewReportModal(false);
    }
  };

  const downloadReport = (report: Report) => {
    const content = `
Report: ${report.title}
Description: ${report.description}
Created: ${report.createdAt}
Status: ${report.status}
Views: ${report.views}

Content:
${report.content}

Photos: ${report.photos.length} attached
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${report.title.replace(/\s+/g, '_')}_report.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'text':
        return <FileText className="w-5 h-5" />;
      case 'photo':
        return <Image className="w-5 h-5" />;
      case 'mixed':
        return <BarChart3 className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'text':
        return 'from-blue-400 to-cyan-500';
      case 'photo':
        return 'from-purple-400 to-pink-500';
      case 'mixed':
        return 'from-green-400 to-emerald-500';
      default:
        return 'from-slate-400 to-slate-500';
    }
  };

  const stats = [
    { label: 'Total Reports', value: reports.length.toString(), icon: FileText, color: 'from-blue-500 to-cyan-500' },
    { label: 'Completed', value: reports.filter(r => r.status === 'completed').length.toString(), icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
    { label: 'Total Views', value: reports.reduce((sum, r) => sum + r.views, 0).toString(), icon: Eye, color: 'from-purple-500 to-pink-500' },
    { label: 'This Month', value: reports.filter(r => r.createdAt.startsWith('2025-01')).length.toString(), icon: Calendar, color: 'from-orange-500 to-red-500' }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-8"
      >
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
            Reports
          </h1>
          <p className="text-slate-600 text-lg">Create and manage detailed reports with text and photos</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowNewReportModal(true)}
          className="flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Report
        </motion.button>
      </motion.div>

      {/* Stats */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className={`bg-gradient-to-r ${stat.color} rounded-2xl p-3 shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                  <p className="text-sm text-slate-600">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Search and Filter */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4 mb-8"
      >
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-lg transition-all duration-300"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-6 py-3 bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-lg font-medium"
        >
          <option value="all">All Status</option>
          <option value="draft">Draft</option>
          <option value="completed">Completed</option>
        </select>
      </motion.div>

      {/* Reports Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        <AnimatePresence>
          {filteredReports.map((report, index) => (
            <motion.div
              key={report.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Report Header */}
              <div className={`bg-gradient-to-r ${getTypeColor(report.type)} p-6 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-white/20 rounded-2xl">
                        {getTypeIcon(report.type)}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{report.title}</h3>
                        <p className="text-white/80 text-sm">{report.description}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                      report.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {report.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-white/80 text-sm space-x-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {report.createdAt}
                    </div>
                    <div className="flex items-center">
                      <Image className="w-4 h-4 mr-1" />
                      {report.photos.length} photos
                    </div>
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {report.views} views
                    </div>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
                <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-white/10 rounded-full"></div>
              </div>

              {/* Report Content */}
              <div className="p-6">
                <p className="text-slate-600 text-sm mb-6 line-clamp-3 leading-relaxed">{report.content}</p>
                
                {/* Photo Preview */}
                {report.photos.length > 0 && (
                  <div className="flex space-x-3 mb-6 overflow-x-auto">
                    {report.photos.slice(0, 3).map((photo, photoIndex) => (
                      <motion.img
                        key={photoIndex}
                        whileHover={{ scale: 1.1 }}
                        src={photo}
                        alt={`Report ${report.id} - ${photoIndex + 1}`}
                        className="w-20 h-20 object-cover rounded-2xl border-2 border-white shadow-lg flex-shrink-0"
                      />
                    ))}
                    {report.photos.length > 3 && (
                      <div className="w-20 h-20 bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl border-2 border-white shadow-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-semibold text-slate-600">+{report.photos.length - 3}</span>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Footer */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4 text-sm text-slate-500">
                    <span>{report.size}</span>
                    <span>•</span>
                    <span>{report.content.split(' ').length} words</span>
                  </div>
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center px-4 py-2 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-all duration-200 font-medium"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => downloadReport(report)}
                      className="flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 font-medium shadow-lg"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* New Report Modal */}
      <AnimatePresence>
        {showNewReportModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl max-w-lg w-full border border-white/20"
            >
              <div className="p-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Create New Report</h2>
                
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Report title"
                    value={newReport.title}
                    onChange={(e) => setNewReport({ ...newReport, title: e.target.value })}
                    className="w-full px-4 py-3 bg-white/70 border border-white/20 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  />
                  
                  <input
                    type="text"
                    placeholder="Report description"
                    value={newReport.description}
                    onChange={(e) => setNewReport({ ...newReport, description: e.target.value })}
                    className="w-full px-4 py-3 bg-white/70 border border-white/20 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  />
                  
                  <select
                    value={newReport.type}
                    onChange={(e) => setNewReport({ ...newReport, type: e.target.value as 'text' | 'photo' | 'mixed' })}
                    className="w-full px-4 py-3 bg-white/70 border border-white/20 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="text">Text Only</option>
                    <option value="photo">Photo Only</option>
                    <option value="mixed">Text + Photos</option>
                  </select>
                  
                  <textarea
                    placeholder="Report content..."
                    value={newReport.content}
                    onChange={(e) => setNewReport({ ...newReport, content: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 bg-white/70 border border-white/20 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none transition-all duration-300"
                  />
                </div>
                
                <div className="flex justify-end space-x-3 mt-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowNewReportModal(false)}
                    className="px-6 py-3 text-slate-700 bg-slate-200 rounded-2xl hover:bg-slate-300 transition-all duration-200 font-medium"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCreateReport}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 font-medium shadow-lg"
                  >
                    Create Report
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Reports;