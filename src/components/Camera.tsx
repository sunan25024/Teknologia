import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera as CameraIcon, Download, RefreshCw, Sun, Slash as FlashOn, Grid, Timer, Zap, Image as ImageIcon, MapPin, X, Play, Square, Maximize2 } from 'lucide-react';

interface CapturedPhoto {
  id: number;
  dataUrl: string;
  timestamp: string;
  location?: string;
  settings: {
    flash: boolean;
    grid: boolean;
    timer: boolean;
  };
}

const Camera: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [capturedPhotos, setCapturedPhotos] = useState<CapturedPhoto[]>([]);
  const [currentStream, setCurrentStream] = useState<MediaStream | null>(null);
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [gridEnabled, setGridEnabled] = useState(false);
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [cameraFacing, setCameraFacing] = useState<'user' | 'environment'>('environment');
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Check camera permissions on mount
  useEffect(() => {
    checkCameraPermission();
  }, []);

  const checkCameraPermission = async () => {
    try {
      const result = await navigator.permissions.query({ name: 'camera' as PermissionName });
      setHasPermission(result.state === 'granted');
      
      result.addEventListener('change', () => {
        setHasPermission(result.state === 'granted');
      });
    } catch (error) {
      console.log('Permission API not supported');
      setHasPermission(null);
    }
  };

  const startCamera = useCallback(async () => {
    try {
      // Request camera permission
      const constraints = { 
        video: { 
          width: { ideal: 1920, max: 1920 },
          height: { ideal: 1080, max: 1080 },
          facingMode: cameraFacing,
          frameRate: { ideal: 30 }
        },
        audio: true
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      
      setCurrentStream(stream);
      setIsActive(true);
      setHasPermission(true);

      // Setup media recorder for video recording
      const recorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp9'
      });
      
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks(prev => [...prev, event.data]);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        
        // Create download link for video
        const a = document.createElement('a');
        a.href = url;
        a.download = `video_${new Date().toISOString().replace(/[:.]/g, '-')}.webm`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        setRecordedChunks([]);
      };

      setMediaRecorder(recorder);
      
    } catch (error) {
      console.error('Error accessing camera:', error);
      setHasPermission(false);
      
      let errorMessage = 'Could not access camera. ';
      if (error instanceof Error) {
        if (error.name === 'NotAllowedError') {
          errorMessage += 'Please allow camera access in your browser settings.';
        } else if (error.name === 'NotFoundError') {
          errorMessage += 'No camera found on this device.';
        } else if (error.name === 'NotReadableError') {
          errorMessage += 'Camera is already in use by another application.';
        } else {
          errorMessage += error.message;
        }
      }
      
      alert(errorMessage);
    }
  }, [cameraFacing, recordedChunks]);

  const stopCamera = useCallback(() => {
    if (currentStream) {
      currentStream.getTracks().forEach(track => track.stop());
    }
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current);
    }
    setCurrentStream(null);
    setIsActive(false);
    setRecordingTime(0);
  }, [currentStream, mediaRecorder, isRecording]);

  const switchCamera = useCallback(() => {
    setCameraFacing(prev => prev === 'user' ? 'environment' : 'user');
    if (isActive) {
      stopCamera();
      setTimeout(() => {
        startCamera();
      }, 100);
    }
  }, [isActive, stopCamera, startCamera]);

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Apply flash effect
    if (flashEnabled) {
      const flashDiv = document.createElement('div');
      flashDiv.style.position = 'fixed';
      flashDiv.style.top = '0';
      flashDiv.style.left = '0';
      flashDiv.style.width = '100%';
      flashDiv.style.height = '100%';
      flashDiv.style.backgroundColor = 'white';
      flashDiv.style.zIndex = '9999';
      flashDiv.style.opacity = '0.8';
      flashDiv.style.pointerEvents = 'none';
      document.body.appendChild(flashDiv);
      
      setTimeout(() => {
        if (document.body.contains(flashDiv)) {
          document.body.removeChild(flashDiv);
        }
      }, 150);
    }

    // Mirror image if using front camera
    if (cameraFacing === 'user') {
      context.scale(-1, 1);
      context.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
    } else {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
    }

    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
    const timestamp = new Date().toLocaleString();

    const newPhoto: CapturedPhoto = {
      id: Date.now(),
      dataUrl,
      timestamp,
      location: 'Current Location',
      settings: {
        flash: flashEnabled,
        grid: gridEnabled,
        timer: timerEnabled
      }
    };

    setCapturedPhotos(prev => [newPhoto, ...prev]);
    
    // Play camera shutter sound
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT');
    audio.volume = 0.3;
    audio.play().catch(() => {
      // Ignore audio play errors
    });
  }, [flashEnabled, gridEnabled, timerEnabled, cameraFacing]);

  const handleTimerCapture = useCallback(() => {
    if (timerEnabled) {
      setCountdown(3);
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            capturePhoto();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      capturePhoto();
    }
  }, [timerEnabled, capturePhoto]);

  const startRecording = useCallback(() => {
    if (mediaRecorder && mediaRecorder.state === 'inactive') {
      setRecordedChunks([]);
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
  }, [mediaRecorder]);

  const stopRecording = useCallback(() => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
      setIsRecording(false);
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    }
  }, [mediaRecorder]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  const downloadPhoto = (photo: CapturedPhoto) => {
    const link = document.createElement('a');
    link.href = photo.dataUrl;
    link.download = `photo_${photo.timestamp.replace(/[/,:]/g, '-')}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const deletePhoto = (id: number) => {
    setCapturedPhotos(prev => prev.filter(photo => photo.id !== id));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Permission denied state
  if (hasPermission === false) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex justify-center items-center h-96">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-8"
          >
            <CameraIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">Camera Access Denied</h3>
            <p className="text-slate-600 mb-4">Please allow camera access to use this feature</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={checkCameraPermission}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-2xl font-semibold"
            >
              Check Permission
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-6 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0"
      >
        <div>
          <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
            Camera
          </h1>
          <p className="text-slate-600 text-sm sm:text-lg">Capture photos and videos with advanced features</p>
        </div>
        <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-2xl px-3 sm:px-4 py-2 border border-white/20">
          <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
          <span className="text-xs sm:text-sm font-medium text-slate-700">{capturedPhotos.length} photos captured</span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
        {/* Camera View */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
              {isActive ? (
                <>
                  <video
                    ref={videoRef}
                    className={`w-full h-full object-cover ${cameraFacing === 'user' ? 'scale-x-[-1]' : ''}`}
                    autoPlay
                    muted
                    playsInline
                  />
                  
                  {/* Recording indicator */}
                  {isRecording && (
                    <div className="absolute top-4 left-4 flex items-center space-x-2 bg-red-500 text-white px-3 py-1 rounded-full">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">REC {formatTime(recordingTime)}</span>
                    </div>
                  )}
                  
                  {/* Grid overlay */}
                  {gridEnabled && (
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="w-full h-full grid grid-cols-3 grid-rows-3">
                        {Array.from({ length: 9 }).map((_, i) => (
                          <div key={i} className="border border-white/30"></div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Countdown */}
                  <AnimatePresence>
                    {countdown > 0 && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                      >
                        <motion.div
                          key={countdown}
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 1.5, opacity: 0 }}
                          className="text-6xl sm:text-8xl font-bold text-white"
                        >
                          {countdown}
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Fullscreen button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleFullscreen}
                    className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-lg hover:bg-black/70 transition-all duration-200"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </motion.button>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-white">
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center"
                  >
                    <CameraIcon className="w-16 sm:w-20 h-16 sm:h-20 mx-auto mb-6 opacity-50" />
                    <p className="text-lg sm:text-xl font-semibold mb-2">Camera not active</p>
                    <p className="text-white/70 text-sm sm:text-base">Click "Start Camera" to begin</p>
                  </motion.div>
                </div>
              )}
            </div>
            
            {/* Camera Controls */}
            <div className="p-4 sm:p-6 bg-gradient-to-r from-slate-50 to-white">
              <div className="flex flex-col space-y-4">
                {/* Settings Row */}
                <div className="flex justify-center space-x-2 sm:space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setFlashEnabled(!flashEnabled)}
                    className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl transition-all duration-300 ${
                      flashEnabled 
                        ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg' 
                        : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                    }`}
                  >
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setGridEnabled(!gridEnabled)}
                    className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl transition-all duration-300 ${
                      gridEnabled 
                        ? 'bg-gradient-to-r from-blue-400 to-cyan-500 text-white shadow-lg' 
                        : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                    }`}
                  >
                    <Grid className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setTimerEnabled(!timerEnabled)}
                    className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl transition-all duration-300 ${
                      timerEnabled 
                        ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg' 
                        : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                    }`}
                  >
                    <Timer className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={switchCamera}
                    className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-slate-200 text-slate-600 hover:bg-slate-300 transition-all duration-300"
                  >
                    <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.button>
                </div>
                
                {/* Main Controls */}
                <div className="flex justify-center items-center space-x-3 sm:space-x-4">
                  {!isActive ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={startCamera}
                      className="flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-sm sm:text-base"
                    >
                      <CameraIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      Start Camera
                    </motion.button>
                  ) : (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleTimerCapture}
                        disabled={countdown > 0 || isRecording}
                        className="flex items-center px-4 sm:px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-sm sm:text-base"
                      >
                        <CameraIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                        {countdown > 0 ? 'Capturing...' : 'Photo'}
                      </motion.button>

                      {!isRecording ? (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={startRecording}
                          disabled={countdown > 0}
                          className="flex items-center px-4 sm:px-6 py-3 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-sm sm:text-base"
                        >
                          <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                          Record
                        </motion.button>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={stopRecording}
                          className="flex items-center px-4 sm:px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-sm sm:text-base"
                        >
                          <Square className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                          Stop
                        </motion.button>
                      )}
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={stopCamera}
                        className="flex items-center px-4 sm:px-6 py-3 bg-gradient-to-r from-slate-500 to-slate-600 text-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-sm sm:text-base"
                      >
                        <X className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                        Stop
                      </motion.button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Photo Gallery */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl border border-white/20 p-4 sm:p-6">
            <h2 className="text-lg sm:text-2xl font-bold text-slate-800 mb-4">Recent Photos ({capturedPhotos.length})</h2>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              <AnimatePresence>
                {capturedPhotos.map((photo, index) => (
                  <motion.div
                    key={photo.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/70 rounded-xl sm:rounded-2xl shadow-lg border border-white/20 overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <img
                      src={photo.dataUrl}
                      alt={`Captured at ${photo.timestamp}`}
                      className="w-full h-24 sm:h-32 object-cover"
                    />
                    <div className="p-3 sm:p-4">
                      <p className="text-xs text-slate-500 mb-1 font-medium">{photo.timestamp}</p>
                      {photo.location && (
                        <div className="flex items-center text-xs text-slate-400 mb-3">
                          <MapPin className="w-3 h-3 mr-1" />
                          {photo.location}
                        </div>
                      )}
                      
                      {/* Settings indicators */}
                      <div className="flex items-center space-x-2 mb-3">
                        {photo.settings.flash && (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full font-medium">Flash</span>
                        )}
                        {photo.settings.grid && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">Grid</span>
                        )}
                        {photo.settings.timer && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">Timer</span>
                        )}
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => downloadPhoto(photo)}
                          className="flex items-center px-3 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg text-xs hover:shadow-lg transition-all duration-200 font-medium"
                        >
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => deletePhoto(photo.id)}
                          className="text-red-500 hover:text-red-700 text-xs font-medium px-2 py-1 rounded-lg hover:bg-red-50 transition-all duration-200"
                        >
                          Delete
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            {capturedPhotos.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 text-slate-500"
              >
                <CameraIcon className="w-12 sm:w-16 h-12 sm:h-16 mx-auto mb-4 opacity-30" />
                <p className="font-medium text-sm sm:text-base">No photos captured yet</p>
                <p className="text-xs sm:text-sm">Start capturing to see your photos here</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Hidden canvas for photo capture */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default Camera;