import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Table, Plus, Download, Upload, Search, Filter, Edit3, Save, X, BarChart3, TrendingUp, Users, ExternalLink, Link, Globe, FileSpreadsheet, Eye, Maximize2, Minimize2 } from 'lucide-react';

interface SpreadsheetCell {
  value: string;
  type: 'text' | 'number' | 'date' | 'link';
}

interface SpreadsheetRow {
  id: number;
  cells: SpreadsheetCell[];
}

interface SpreadsheetLink {
  id: number;
  name: string;
  url: string;
  description: string;
  lastAccessed: string;
  type: 'google-sheets' | 'excel-online' | 'airtable' | 'notion';
  status: 'active' | 'inactive';
  embedUrl?: string;
}

const Spreadsheet: React.FC = () => {
  const [data, setData] = useState<SpreadsheetRow[]>([
    {
      id: 1,
      cells: [
        { value: 'Website Redesign', type: 'text' },
        { value: 'In Progress', type: 'text' },
        { value: '2025-01-15', type: 'date' },
        { value: 'John Doe', type: 'text' },
        { value: '75', type: 'number' }
      ]
    },
    {
      id: 2,
      cells: [
        { value: 'Mobile App Development', type: 'text' },
        { value: 'Completed', type: 'text' },
        { value: '2025-01-10', type: 'date' },
        { value: 'Jane Smith', type: 'text' },
        { value: '100', type: 'number' }
      ]
    },
    {
      id: 3,
      cells: [
        { value: 'Database Migration', type: 'text' },
        { value: 'Pending', type: 'text' },
        { value: '2025-01-20', type: 'date' },
        { value: 'Bob Johnson', type: 'text' },
        { value: '0', type: 'number' }
      ]
    },
    {
      id: 4,
      cells: [
        { value: 'API Integration', type: 'text' },
        { value: 'In Progress', type: 'text' },
        { value: '2025-01-18', type: 'date' },
        { value: 'Alice Brown', type: 'text' },
        { value: '45', type: 'number' }
      ]
    }
  ]);

  const [spreadsheetLinks, setSpreadsheetLinks] = useState<SpreadsheetLink[]>([
    {
      id: 1,
      name: 'Project Management Dashboard',
      url: 'https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit',
      embedUrl: 'https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit?usp=sharing&output=html&widget=true',
      description: 'Main project tracking and task management',
      lastAccessed: '2 hours ago',
      type: 'google-sheets',
      status: 'active'
    },
    {
      id: 2,
      name: 'Financial Reports Q1',
      url: 'https://docs.google.com/spreadsheets/d/1234567890abcdef/edit',
      embedUrl: 'https://docs.google.com/spreadsheets/d/1234567890abcdef/edit?usp=sharing&output=html&widget=true',
      description: 'Quarterly financial analysis and budget tracking',
      lastAccessed: '1 day ago',
      type: 'google-sheets',
      status: 'active'
    },
    {
      id: 3,
      name: 'Team Performance Metrics',
      url: 'https://airtable.com/app123456789/tbl987654321',
      embedUrl: 'https://airtable.com/embed/app123456789/tbl987654321',
      description: 'Employee performance and KPI tracking',
      lastAccessed: '3 days ago',
      type: 'airtable',
      status: 'active'
    },
    {
      id: 4,
      name: 'Inventory Management',
      url: 'https://onedrive.live.com/edit.aspx?resid=123&cid=456',
      embedUrl: 'https://onedrive.live.com/embed?resid=123&cid=456&authkey=ABC123&em=2',
      description: 'Stock levels and supply chain management',
      lastAccessed: '1 week ago',
      type: 'excel-online',
      status: 'inactive'
    },
    {
      id: 5,
      name: 'Customer Database',
      url: 'https://www.notion.so/workspace/customer-db-789',
      embedUrl: 'https://www.notion.so/workspace/customer-db-789?embed=true',
      description: 'Customer information and contact details',
      lastAccessed: '2 weeks ago',
      type: 'notion',
      status: 'active'
    }
  ]);

  const [headers] = useState(['Task Name', 'Status', 'Due Date', 'Assignee', 'Progress (%)']);
  const [editingCell, setEditingCell] = useState<{ rowId: number, cellIndex: number } | null>(null);
  const [editValue, setEditValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterColumn, setFilterColumn] = useState('all');
  const [showLinksModal, setShowLinksModal] = useState(false);
  const [showAddLinkModal, setShowAddLinkModal] = useState(false);
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const [selectedSpreadsheet, setSelectedSpreadsheet] = useState<SpreadsheetLink | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [newLink, setNewLink] = useState({
    name: '',
    url: '',
    description: '',
    type: 'google-sheets' as SpreadsheetLink['type']
  });

  const filteredData = data.filter(row => {
    if (!searchTerm) return true;
    return row.cells.some(cell => 
      cell.value.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const filteredLinks = spreadsheetLinks.filter(link =>
    link.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    link.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startEdit = (rowId: number, cellIndex: number, currentValue: string) => {
    setEditingCell({ rowId, cellIndex });
    setEditValue(currentValue);
  };

  const saveEdit = () => {
    if (!editingCell) return;

    setData(prevData => 
      prevData.map(row => 
        row.id === editingCell.rowId
          ? {
              ...row,
              cells: row.cells.map((cell, index) => 
                index === editingCell.cellIndex
                  ? { ...cell, value: editValue }
                  : cell
              )
            }
          : row
      )
    );

    setEditingCell(null);
    setEditValue('');
  };

  const cancelEdit = () => {
    setEditingCell(null);
    setEditValue('');
  };

  const addRow = () => {
    const newRow: SpreadsheetRow = {
      id: Date.now(),
      cells: headers.map(() => ({ value: '', type: 'text' as const }))
    };
    setData([...data, newRow]);
  };

  const deleteRow = (rowId: number) => {
    setData(data.filter(row => row.id !== rowId));
  };

  const openSpreadsheet = (link: SpreadsheetLink) => {
    // Update last accessed time
    setSpreadsheetLinks(prev => 
      prev.map(l => 
        l.id === link.id 
          ? { ...l, lastAccessed: 'Just now', status: 'active' }
          : l
      )
    );
    
    // Open in new tab
    window.open(link.url, '_blank');
  };

  const viewEmbedded = (link: SpreadsheetLink) => {
    setSelectedSpreadsheet(link);
    setShowEmbedModal(true);
    
    // Update last accessed time
    setSpreadsheetLinks(prev => 
      prev.map(l => 
        l.id === link.id 
          ? { ...l, lastAccessed: 'Just now', status: 'active' }
          : l
      )
    );
  };

  const generateEmbedUrl = (url: string, type: SpreadsheetLink['type']): string => {
    switch (type) {
      case 'google-sheets':
        // Convert Google Sheets URL to embed format
        const sheetId = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/)?.[1];
        return sheetId ? `https://docs.google.com/spreadsheets/d/${sheetId}/edit?usp=sharing&output=html&widget=true` : url;
      
      case 'excel-online':
        // Excel Online embed format
        return url.replace('/edit.aspx', '/embed');
      
      case 'airtable':
        // Airtable embed format
        return url.replace('airtable.com/', 'airtable.com/embed/');
      
      case 'notion':
        // Notion embed format
        return `${url}?embed=true`;
      
      default:
        return url;
    }
  };

  const addNewLink = () => {
    if (newLink.name.trim() && newLink.url.trim()) {
      const embedUrl = generateEmbedUrl(newLink.url, newLink.type);
      const link: SpreadsheetLink = {
        id: Date.now(),
        name: newLink.name,
        url: newLink.url,
        embedUrl: embedUrl,
        description: newLink.description,
        lastAccessed: 'Never',
        type: newLink.type,
        status: 'active'
      };
      setSpreadsheetLinks([link, ...spreadsheetLinks]);
      setNewLink({ name: '', url: '', description: '', type: 'google-sheets' });
      setShowAddLinkModal(false);
    }
  };

  const deleteLink = (linkId: number) => {
    setSpreadsheetLinks(spreadsheetLinks.filter(link => link.id !== linkId));
  };

  const exportToCSV = () => {
    const csvContent = [
      headers.join(','),
      ...data.map(row => row.cells.map(cell => `"${cell.value}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'spreadsheet_data.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getProgressColor = (progress: string) => {
    const num = parseInt(progress);
    if (num >= 80) return 'from-green-400 to-green-500';
    if (num >= 50) return 'from-yellow-400 to-yellow-500';
    if (num >= 20) return 'from-orange-400 to-orange-500';
    return 'from-red-400 to-red-500';
  };

  const getTypeIcon = (type: SpreadsheetLink['type']) => {
    switch (type) {
      case 'google-sheets':
        return <FileSpreadsheet className="w-5 h-5 text-green-600" />;
      case 'excel-online':
        return <FileSpreadsheet className="w-5 h-5 text-blue-600" />;
      case 'airtable':
        return <Table className="w-5 h-5 text-orange-600" />;
      case 'notion':
        return <FileSpreadsheet className="w-5 h-5 text-gray-600" />;
      default:
        return <FileSpreadsheet className="w-5 h-5 text-gray-600" />;
    }
  };

  const getTypeColor = (type: SpreadsheetLink['type']) => {
    switch (type) {
      case 'google-sheets':
        return 'from-green-400 to-emerald-500';
      case 'excel-online':
        return 'from-blue-400 to-cyan-500';
      case 'airtable':
        return 'from-orange-400 to-amber-500';
      case 'notion':
        return 'from-gray-400 to-slate-500';
      default:
        return 'from-gray-400 to-slate-500';
    }
  };

  const stats = [
    { label: 'Total Tasks', value: data.length.toString(), icon: Table, color: 'from-blue-500 to-cyan-500' },
    { label: 'Completed', value: data.filter(row => row.cells[1]?.value.toLowerCase() === 'completed').length.toString(), icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
    { label: 'Connected Sheets', value: spreadsheetLinks.filter(link => link.status === 'active').length.toString(), icon: Link, color: 'from-purple-500 to-pink-500' },
    { label: 'Team Members', value: new Set(data.map(row => row.cells[3]?.value)).size.toString(), icon: Users, color: 'from-orange-500 to-red-500' }
  ];

  return (
    <div className="p-6 h-full overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-8"
      >
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Data Management
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">Manage your spreadsheets and data connections</p>
        </div>
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowLinksModal(true)}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
          >
            <Link className="w-5 h-5 mr-2" />
            My Spreadsheets
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={addRow}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Row
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={exportToCSV}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
          >
            <Download className="w-5 h-5 mr-2" />
            Export CSV
          </motion.button>
        </div>
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
              whileHover={{ scale: 1.05, y: -5, rotateY: 5 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 dark:border-slate-700/20 p-6 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className={`bg-gradient-to-r ${stat.color} rounded-2xl p-3 shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-slate-800 dark:text-white">{stat.value}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</p>
                  </div>
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
            placeholder="Search data..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/70 dark:bg-slate-800/60 backdrop-blur-xl border border-white/20 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-lg transition-all duration-300 text-slate-800 dark:text-white"
          />
        </div>
        <select
          value={filterColumn}
          onChange={(e) => setFilterColumn(e.target.value)}
          className="px-6 py-3 bg-white/70 dark:bg-slate-800/60 backdrop-blur-xl border border-white/20 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-lg font-medium text-slate-800 dark:text-white"
        >
          <option value="all">All Columns</option>
          {headers.map((header, index) => (
            <option key={index} value={index.toString()}>{header}</option>
          ))}
        </select>
      </motion.div>

      {/* Spreadsheet Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-slate-700/20 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-slate-50 to-white dark:from-slate-800 dark:to-slate-700 border-b border-slate-200 dark:border-slate-600">
              <tr>
                {headers.map((header, index) => (
                  <th key={index} className="px-6 py-4 text-left text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    {header}
                  </th>
                ))}
                <th className="px-6 py-4 text-left text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              <AnimatePresence>
                {filteredData.map((row, rowIndex) => (
                  <motion.tr
                    key={row.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: rowIndex * 0.05 }}
                    whileHover={{ backgroundColor: 'rgba(248, 250, 252, 0.8)' }}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-all duration-200"
                  >
                    {row.cells.map((cell, cellIndex) => (
                      <td key={cellIndex} className="px-6 py-4 whitespace-nowrap">
                        {editingCell?.rowId === row.id && editingCell?.cellIndex === cellIndex ? (
                          <div className="flex items-center space-x-2">
                            <input
                              type="text"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                              onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                              autoFocus
                            />
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={saveEdit}
                              className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-all duration-200"
                            >
                              <Save className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={cancelEdit}
                              className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
                            >
                              <X className="w-4 h-4" />
                            </motion.button>
                          </div>
                        ) : (
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            onClick={() => startEdit(row.id, cellIndex, cell.value)}
                            className="cursor-pointer hover:bg-white/60 dark:hover:bg-slate-700/60 p-2 rounded-xl transition-all duration-200"
                          >
                            {cellIndex === 1 ? ( // Status column
                              <span className={`px-3 py-1 text-sm rounded-full border font-medium ${getStatusColor(cell.value)}`}>
                                {cell.value}
                              </span>
                            ) : cellIndex === 4 ? ( // Progress column
                              <div className="flex items-center space-x-3">
                                <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                                  <div
                                    className={`h-3 rounded-full bg-gradient-to-r ${getProgressColor(cell.value)} transition-all duration-500`}
                                    style={{ width: `${Math.min(100, Math.max(0, parseInt(cell.value) || 0))}%` }}
                                  />
                                </div>
                                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 min-w-[40px]">{cell.value}%</span>
                              </div>
                            ) : (
                              <span className="text-sm text-slate-800 dark:text-slate-200 font-medium">{cell.value || '-'}</span>
                            )}
                          </motion.div>
                        )}
                      </td>
                    ))}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => deleteRow(row.id)}
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
                      >
                        <X className="w-4 h-4" />
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Spreadsheet Links Modal */}
      <AnimatePresence>
        {showLinksModal && (
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
              className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl shadow-2xl max-w-4xl w-full max-h-[80vh] border border-white/20 dark:border-slate-700/20 overflow-hidden"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-white">My Spreadsheets</h2>
                  <div className="flex space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowAddLinkModal(true)}
                      className="flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-medium"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Link
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowLinksModal(false)}
                      className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200"
                    >
                      <X className="w-6 h-6" />
                    </motion.button>
                  </div>
                </div>
                
                <div className="max-h-96 overflow-y-auto space-y-4">
                  <AnimatePresence>
                    {filteredLinks.map((link, index) => (
                      <motion.div
                        key={link.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.02, y: -2 }}
                        className="bg-white/60 dark:bg-slate-700/60 rounded-2xl border border-white/20 dark:border-slate-600/20 p-6 hover:shadow-lg transition-all duration-300 group"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4 flex-1">
                            <div className={`p-3 rounded-2xl bg-gradient-to-r ${getTypeColor(link.type)} shadow-lg`}>
                              {getTypeIcon(link.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-slate-800 dark:text-white text-lg mb-2">{link.name}</h3>
                              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{link.description}</p>
                              <div className="flex items-center space-x-4 text-xs text-slate-500 dark:text-slate-400">
                                <span>Last accessed: {link.lastAccessed}</span>
                                <span className={`px-2 py-1 rounded-full font-medium ${
                                  link.status === 'active' 
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                                    : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                                }`}>
                                  {link.status}
                                </span>
                                <span className="capitalize">{link.type.replace('-', ' ')}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => viewEmbedded(link)}
                              className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-medium"
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              View
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => openSpreadsheet(link)}
                              className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-medium"
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Open
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => deleteLink(link.id)}
                              className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
                            >
                              <X className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Embedded Spreadsheet Modal */}
      <AnimatePresence>
        {showEmbedModal && selectedSpreadsheet && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 ${isFullscreen ? 'p-0' : ''}`}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className={`bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-slate-700/20 overflow-hidden ${
                isFullscreen ? 'w-full h-full rounded-none' : 'max-w-6xl w-full max-h-[90vh]'
              }`}
            >
              <div className="flex justify-between items-center p-6 border-b border-white/20 dark:border-slate-700/20 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-slate-800 dark:to-slate-700">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-2xl bg-gradient-to-r ${getTypeColor(selectedSpreadsheet.type)} shadow-lg`}>
                    {getTypeIcon(selectedSpreadsheet.type)}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white">{selectedSpreadsheet.name}</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{selectedSpreadsheet.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 rounded-xl hover:bg-white/60 dark:hover:bg-slate-700 transition-all duration-200"
                  >
                    {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => openSpreadsheet(selectedSpreadsheet)}
                    className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 rounded-xl hover:bg-white/60 dark:hover:bg-slate-700 transition-all duration-200"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setShowEmbedModal(false);
                      setIsFullscreen(false);
                    }}
                    className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 rounded-xl hover:bg-white/60 dark:hover:bg-slate-700 transition-all duration-200"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
              
              <div className={`${isFullscreen ? 'h-[calc(100vh-80px)]' : 'h-96'} w-full`}>
                <iframe
                  src={selectedSpreadsheet.embedUrl || selectedSpreadsheet.url}
                  className="w-full h-full border-0"
                  title={selectedSpreadsheet.name}
                  allow="fullscreen"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add New Link Modal */}
      <AnimatePresence>
        {showAddLinkModal && (
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
              className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl shadow-2xl max-w-lg w-full border border-white/20 dark:border-slate-700/20"
            >
              <div className="p-8">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Add New Spreadsheet Link</h2>
                
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Spreadsheet name"
                    value={newLink.name}
                    onChange={(e) => setNewLink({ ...newLink, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/70 dark:bg-slate-700/60 border border-white/20 dark:border-slate-600 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 text-slate-800 dark:text-white"
                  />
                  
                  <input
                    type="url"
                    placeholder="Spreadsheet URL"
                    value={newLink.url}
                    onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                    className="w-full px-4 py-3 bg-white/70 dark:bg-slate-700/60 border border-white/20 dark:border-slate-600 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 text-slate-800 dark:text-white"
                  />
                  
                  <textarea
                    placeholder="Description (optional)"
                    value={newLink.description}
                    onChange={(e) => setNewLink({ ...newLink, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 bg-white/70 dark:bg-slate-700/60 border border-white/20 dark:border-slate-600 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none transition-all duration-300 text-slate-800 dark:text-white"
                  />
                  
                  <select
                    value={newLink.type}
                    onChange={(e) => setNewLink({ ...newLink, type: e.target.value as SpreadsheetLink['type'] })}
                    className="w-full px-4 py-3 bg-white/70 dark:bg-slate-700/60 border border-white/20 dark:border-slate-600 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 text-slate-800 dark:text-white"
                  >
                    <option value="google-sheets">Google Sheets</option>
                    <option value="excel-online">Excel Online</option>
                    <option value="airtable">Airtable</option>
                    <option value="notion">Notion</option>
                  </select>
                </div>
                
                <div className="flex justify-end space-x-3 mt-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAddLinkModal(false)}
                    className="px-6 py-3 text-slate-700 dark:text-slate-300 bg-slate-200 dark:bg-slate-700 rounded-2xl hover:bg-slate-300 dark:hover:bg-slate-600 transition-all duration-200 font-medium"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={addNewLink}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 font-medium shadow-lg"
                  >
                    Add Link
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

export default Spreadsheet;