import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, Search, Phone, Video, MoreVertical, Paperclip, Smile, Users, Wifi, QrCode, Smartphone, Globe, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  timestamp: string;
  sent: boolean;
  read?: boolean;
  type: 'text' | 'image' | 'file';
}

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
  avatar: string;
  type: 'individual' | 'group';
}

const WhatsApp: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<number | null>(1);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [showConnectionModal, setShowConnectionModal] = useState(false);
  const [connectionStep, setConnectionStep] = useState<'qr' | 'phone' | 'connected'>('qr');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);

  const chats: Chat[] = [
    {
      id: 1,
      name: 'John Doe',
      lastMessage: 'Hey, how are you doing?',
      timestamp: '10:30 AM',
      unread: 2,
      online: true,
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      type: 'individual'
    },
    {
      id: 2,
      name: 'Team Project',
      lastMessage: 'Meeting scheduled for tomorrow',
      timestamp: '9:45 AM',
      unread: 0,
      online: false,
      avatar: 'https://images.pexels.com/photos/1267319/pexels-photo-1267319.jpeg?auto=compress&cs=tinysrgb&w=150',
      type: 'group'
    },
    {
      id: 3,
      name: 'Jane Smith',
      lastMessage: 'Thanks for the report!',
      timestamp: 'Yesterday',
      unread: 1,
      online: true,
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      type: 'individual'
    },
    {
      id: 4,
      name: 'Client ABC',
      lastMessage: 'Looking forward to the presentation',
      timestamp: 'Yesterday',
      unread: 0,
      online: false,
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      type: 'individual'
    },
    {
      id: 5,
      name: 'Design Team',
      lastMessage: 'New mockups are ready',
      timestamp: '2 days ago',
      unread: 5,
      online: true,
      avatar: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=150',
      type: 'group'
    }
  ];

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Hey, how are you doing?',
      timestamp: '10:30 AM',
      sent: false,
      read: true,
      type: 'text'
    },
    {
      id: 2,
      text: 'I\'m doing great! Just working on the new productivity app',
      timestamp: '10:32 AM',
      sent: true,
      read: true,
      type: 'text'
    },
    {
      id: 3,
      text: 'That sounds exciting! Can you tell me more about it?',
      timestamp: '10:33 AM',
      sent: false,
      read: true,
      type: 'text'
    },
    {
      id: 4,
      text: 'Sure! It\'s a comprehensive productivity app with notes, reports, calendar, camera, and even WhatsApp integration like this!',
      timestamp: '10:35 AM',
      sent: true,
      read: false,
      type: 'text'
    },
    {
      id: 5,
      text: 'Wow, that\'s impressive! The UI looks really modern and beautiful.',
      timestamp: '10:36 AM',
      sent: false,
      read: true,
      type: 'text'
    }
  ]);

  const currentChat = chats.find(chat => chat.id === selectedChat);
  const filteredChats = chats.filter(chat => 
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sendMessage = () => {
    if (newMessage.trim() && isConnected) {
      const message: Message = {
        id: Date.now(),
        text: newMessage.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sent: true,
        read: false,
        type: 'text'
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const connectWhatsApp = () => {
    setIsConnecting(true);
    
    // Simulate connection process
    setTimeout(() => {
      if (connectionStep === 'qr') {
        setConnectionStep('phone');
      } else if (connectionStep === 'phone') {
        setConnectionStep('connected');
        setIsConnected(true);
        setShowConnectionModal(false);
      }
      setIsConnecting(false);
    }, 2000);
  };

  const disconnectWhatsApp = () => {
    setIsConnected(false);
    setConnectionStep('qr');
    setPhoneNumber('');
    setVerificationCode('');
  };

  const stats = [
    { label: 'Total Chats', value: chats.length.toString(), color: 'from-green-500 to-emerald-500' },
    { label: 'Unread', value: chats.reduce((sum, chat) => sum + chat.unread, 0).toString(), color: 'from-red-500 to-rose-500' },
    { label: 'Online', value: chats.filter(chat => chat.online).length.toString(), color: 'from-blue-500 to-cyan-500' },
    { label: 'Groups', value: chats.filter(chat => chat.type === 'group').length.toString(), color: 'from-purple-500 to-pink-500' }
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
            WhatsApp Integration
          </h1>
          <p className="text-slate-600 text-lg">Connect and manage your WhatsApp conversations</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className={`flex items-center space-x-2 rounded-2xl px-4 py-2 border ${
            isConnected 
              ? 'bg-green-100 border-green-200' 
              : 'bg-red-100 border-red-200'
          }`}>
            {isConnected ? (
              <>
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-green-700">Connected</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-5 h-5 text-red-600" />
                <span className="text-sm font-medium text-red-700">Disconnected</span>
              </>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => isConnected ? disconnectWhatsApp() : setShowConnectionModal(true)}
            className={`flex items-center px-6 py-3 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold ${
              isConnected 
                ? 'bg-gradient-to-r from-red-500 to-rose-600' 
                : 'bg-gradient-to-r from-green-500 to-emerald-600'
            }`}
          >
            {isConnected ? (
              <>
                <RefreshCw className="w-5 h-5 mr-2" />
                Disconnect
              </>
            ) : (
              <>
                <Smartphone className="w-5 h-5 mr-2" />
                Connect WhatsApp
              </>
            )}
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
        {stats.map((stat, index) => (
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
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                <p className="text-sm text-slate-600">{stat.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main WhatsApp Interface */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
        style={{ height: '600px' }}
      >
        {isConnected ? (
          <div className="flex h-full">
            {/* Chat List Sidebar */}
            <div className="w-1/3 border-r border-white/20 flex flex-col">
              {/* Search Header */}
              <div className="p-6 border-b border-white/20 bg-gradient-to-r from-green-50 to-emerald-50">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white/70 border border-white/20 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>

              {/* Chat List */}
              <div className="flex-1 overflow-y-auto">
                <AnimatePresence>
                  {filteredChats.map((chat, index) => (
                    <motion.div
                      key={chat.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ backgroundColor: 'rgba(248, 250, 252, 0.8)' }}
                      onClick={() => setSelectedChat(chat.id)}
                      className={`p-4 border-b border-white/10 cursor-pointer transition-all duration-300 ${
                        selectedChat === chat.id ? 'bg-green-50/80 border-green-200' : 'hover:bg-slate-50/50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <img
                            src={chat.avatar}
                            alt={chat.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-lg"
                          />
                          {chat.online && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                          {chat.type === 'group' && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                              <Users className="w-2 h-2 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center mb-1">
                            <h3 className="font-semibold text-slate-800 truncate">{chat.name}</h3>
                            <span className="text-xs text-slate-500">{chat.timestamp}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <p className="text-sm text-slate-600 truncate">{chat.lastMessage}</p>
                            {chat.unread > 0 && (
                              <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="bg-green-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center font-medium shadow-lg"
                              >
                                {chat.unread}
                              </motion.span>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {selectedChat ? (
                <>
                  {/* Chat Header */}
                  <div className="p-6 border-b border-white/20 bg-gradient-to-r from-green-50 to-emerald-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <img
                            src={currentChat?.avatar}
                            alt={currentChat?.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-lg"
                          />
                          {currentChat?.online && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-800 text-lg">{currentChat?.name}</h3>
                          <p className="text-sm text-slate-600">
                            {currentChat?.online ? 'Online' : 'Last seen recently'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-3 text-slate-600 hover:text-slate-800 rounded-2xl hover:bg-white/60 transition-all duration-200"
                        >
                          <Phone className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-3 text-slate-600 hover:text-slate-800 rounded-2xl hover:bg-white/60 transition-all duration-200"
                        >
                          <Video className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-3 text-slate-600 hover:text-slate-800 rounded-2xl hover:bg-white/60 transition-all duration-200"
                        >
                          <MoreVertical className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Messages Area */}
                  <div className="flex-1 p-6 overflow-y-auto bg-gradient-to-br from-slate-50/30 to-white/30">
                    <div className="space-y-4">
                      <AnimatePresence>
                        {messages.map((message, index) => (
                          <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ delay: index * 0.05 }}
                            className={`flex ${message.sent ? 'justify-end' : 'justify-start'}`}
                          >
                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              className={`max-w-xs lg:max-w-md px-4 py-3 rounded-3xl shadow-lg ${
                                message.sent
                                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-br-lg'
                                  : 'bg-white text-slate-800 border border-white/40 rounded-bl-lg'
                              }`}
                            >
                              <p className="text-sm leading-relaxed">{message.text}</p>
                              <div className={`flex items-center justify-between mt-2 space-x-2 ${
                                message.sent ? 'text-green-100' : 'text-slate-500'
                              }`}>
                                <span className="text-xs">{message.timestamp}</span>
                                {message.sent && (
                                  <span className="text-xs">
                                    {message.read ? '✓✓' : '✓'}
                                  </span>
                                )}
                              </div>
                            </motion.div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="p-6 border-t border-white/20 bg-white/60">
                    <div className="flex items-center space-x-3">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-3 text-slate-600 hover:text-slate-800 rounded-2xl hover:bg-white/60 transition-all duration-200"
                      >
                        <Paperclip className="w-5 h-5" />
                      </motion.button>
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          placeholder="Type a message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={handleKeyPress}
                          className="w-full px-6 py-3 pr-12 bg-white/70 border border-white/20 rounded-3xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 shadow-lg"
                        />
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-600 hover:text-slate-800 p-1 rounded-lg hover:bg-white/60 transition-all duration-200"
                        >
                          <Smile className="w-5 h-5" />
                        </motion.button>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={sendMessage}
                        disabled={!newMessage.trim()}
                        className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                      >
                        <Send className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-50/30 to-white/30">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                  >
                    <MessageCircle className="w-20 h-20 text-slate-300 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-slate-700 mb-3">Select a conversation</h3>
                    <p className="text-slate-500">Choose a chat from the sidebar to start messaging</p>
                  </motion.div>
                </div>
              )}
            </div>
          </div>
        ) : (
          // Not Connected State
          <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-50/30 to-white/30">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center max-w-md"
            >
              <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                <MessageCircle className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-700 mb-3">Connect Your WhatsApp</h3>
              <p className="text-slate-500 mb-6">Connect your WhatsApp account to start managing conversations directly from this app</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowConnectionModal(true)}
                className="flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold mx-auto"
              >
                <QrCode className="w-6 h-6 mr-3" />
                Connect WhatsApp
              </motion.button>
            </motion.div>
          </div>
        )}
      </motion.div>

      {/* Connection Modal */}
      <AnimatePresence>
        {showConnectionModal && (
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
              className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl max-w-md w-full border border-white/20"
            >
              <div className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    {connectionStep === 'qr' ? (
                      <QrCode className="w-8 h-8 text-white" />
                    ) : connectionStep === 'phone' ? (
                      <Smartphone className="w-8 h-8 text-white" />
                    ) : (
                      <CheckCircle className="w-8 h-8 text-white" />
                    )}
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    {connectionStep === 'qr' && 'Scan QR Code'}
                    {connectionStep === 'phone' && 'Verify Phone'}
                    {connectionStep === 'connected' && 'Connected!'}
                  </h2>
                  <p className="text-slate-600">
                    {connectionStep === 'qr' && 'Open WhatsApp on your phone and scan this QR code'}
                    {connectionStep === 'phone' && 'Enter your phone number to verify'}
                    {connectionStep === 'connected' && 'Your WhatsApp is now connected'}
                  </p>
                </div>

                {connectionStep === 'qr' && (
                  <div className="space-y-6">
                    <div className="w-48 h-48 bg-gradient-to-br from-slate-100 to-white border-2 border-slate-200 rounded-2xl mx-auto flex items-center justify-center shadow-lg">
                      <div className="grid grid-cols-8 gap-1">
                        {Array.from({ length: 64 }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-sm ${
                              Math.random() > 0.5 ? 'bg-slate-800' : 'bg-white'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-slate-500 mb-4">
                        1. Open WhatsApp on your phone<br/>
                        2. Go to Settings → Linked Devices<br/>
                        3. Tap "Link a Device" and scan this code
                      </p>
                    </div>
                  </div>
                )}

                {connectionStep === 'phone' && (
                  <div className="space-y-4">
                    <input
                      type="tel"
                      placeholder="Enter your phone number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full px-4 py-3 bg-white/70 border border-white/20 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    />
                    <input
                      type="text"
                      placeholder="Verification code"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      className="w-full px-4 py-3 bg-white/70 border border-white/20 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                )}

                <div className="flex justify-end space-x-3 mt-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowConnectionModal(false)}
                    className="px-6 py-3 text-slate-700 bg-slate-200 rounded-2xl hover:bg-slate-300 transition-all duration-200 font-medium"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={connectWhatsApp}
                    disabled={isConnecting}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 font-medium shadow-lg disabled:opacity-50"
                  >
                    {isConnecting ? (
                      <div className="flex items-center">
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Connecting...
                      </div>
                    ) : (
                      connectionStep === 'qr' ? 'Continue' : 'Verify'
                    )}
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

export default WhatsApp;