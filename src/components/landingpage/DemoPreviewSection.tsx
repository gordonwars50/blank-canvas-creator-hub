import { Card } from "@/components/ui/card";
import { Play } from "lucide-react";
import { useState } from "react";
import VideoPlayer from "@/components/ui/video-player";
import { motion, AnimatePresence } from "framer-motion";

const DemoPreviewSection = () => {
  const [showVideo, setShowVideo] = useState(false);

  const videoSrc = "/images/landingpage/demovideo.mp4";
  const thumbnailSrc = "/images/landingpage/demothumbnail.png";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      filter: "blur(10px)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1] as const,
      }
    },
  };

  return (
    <motion.section 
      className="pt-8 pb-20 bg-black" 
      id="demo-preview"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="w-full max-w-none px-4 sm:px-6 lg:px-8">
        {/* Keep the space with padding instead of text */}
        <div className="text-center mb-8 py-16"></div>

        <motion.div variants={itemVariants} className="max-w-7xl mx-auto">
          <Card className="relative overflow-hidden shadow-2xl border-0 group">
            <div className="aspect-video bg-gradient-to-br from-red-900 to-red-700 relative">
              <AnimatePresence mode="wait">
                {!showVideo ? (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url(${thumbnailSrc})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    {/* Overlay for better contrast */}
                    <div className="absolute inset-0 bg-black/60" />
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div 
                        className="text-center"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                      >
                        <motion.div 
                          className="w-20 h-20 bg-red-600/90 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300 cursor-pointer hover:bg-red-500/90"
                          onClick={() => setShowVideo(true)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Play className="w-8 h-8 text-white ml-1" />
                        </motion.div>
                        <p className="text-white text-lg font-semibold">Watch Demo</p>
                      </motion.div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="video"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <VideoPlayer src={videoSrc} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default DemoPreviewSection;
