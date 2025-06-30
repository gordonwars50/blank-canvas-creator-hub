import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MacbookPro } from "@/components/ui/macbook-pro";
import Header from "@/components/shared/Header";
import PlanTripButton from "@/components/ui/plan-trip-button";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const laptopScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <section
      ref={containerRef}
      className="relative bg-black pt-0 pb-12 sm:pb-20 overflow-hidden w-full"
    >
      {/* Geometric Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.02] via-transparent to-rose-500/[0.02] blur-3xl" />
        
        {/* Large shape - top left area */}
        <motion.div
          initial={{
              opacity: 0,
              y: -150,
              rotate: -3,
          }}
          animate={{
              opacity: 1,
              y: 0,
              rotate: 8,
          }}
          transition={{
              duration: 2.4,
              delay: 0.3,
              ease: [0.23, 0.86, 0.39, 0.96],
              opacity: { duration: 1.2 },
          }}
          className="absolute left-[-30%] sm:left-[-20%] md:left-[-15%] top-[5%] md:top-[8%]"
        >
          <motion.div
              animate={{
                  y: [0, 15, 0],
              }}
              transition={{
                  duration: 12,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
              }}
              style={{
                  width: 600,
                  height: 140,
              }}
              className="relative max-w-[600px] sm:w-[800px] sm:h-[180px]"
          >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-slate-500/[0.06] to-transparent backdrop-blur-[2px] border-2 border-white/[0.08] shadow-[0_8px_32px_0_rgba(255,255,255,0.05)] after:absolute after:inset-0 after:rounded-full after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
          </motion.div>
        </motion.div>

        {/* Medium shape - top right */}
        <motion.div
          initial={{
              opacity: 0,
              y: -150,
              rotate: -30,
          }}
          animate={{
              opacity: 1,
              y: 0,
              rotate: -18,
          }}
          transition={{
              duration: 2.4,
              delay: 0.5,
              ease: [0.23, 0.86, 0.39, 0.96],
              opacity: { duration: 1.2 },
          }}
          className="absolute right-[-25%] sm:right-[-15%] md:right-[-10%] top-[12%] md:top-[15%]"
        >
          <motion.div
              animate={{
                  y: [0, 15, 0],
              }}
              transition={{
                  duration: 12,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
              }}
              style={{
                  width: 450,
                  height: 110,
              }}
              className="relative max-w-[450px] sm:w-[600px] sm:h-[140px]"
          >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/[0.06] to-transparent backdrop-blur-[2px] border-2 border-white/[0.08] shadow-[0_8px_32px_0_rgba(255,255,255,0.05)] after:absolute after:inset-0 after:rounded-full after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
          </motion.div>
        </motion.div>

        {/* Large shape - bottom right */}
        <motion.div
          initial={{
              opacity: 0,
              y: -150,
              rotate: -23,
          }}
          animate={{
              opacity: 1,
              y: 0,
              rotate: -12,
          }}
          transition={{
              duration: 2.4,
              delay: 0.4,
              ease: [0.23, 0.86, 0.39, 0.96],
              opacity: { duration: 1.2 },
          }}
          className="absolute right-[-30%] sm:right-[-20%] md:right-[-15%] bottom-[8%] md:bottom-[12%]"
        >
          <motion.div
              animate={{
                  y: [0, 15, 0],
              }}
              transition={{
                  duration: 12,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
              }}
              style={{
                  width: 500,
                  height: 120,
              }}
              className="relative max-w-[500px] sm:w-[700px] sm:h-[160px]"
          >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-500/[0.06] to-transparent backdrop-blur-[2px] border-2 border-white/[0.08] shadow-[0_8px_32px_0_rgba(255,255,255,0.05)] after:absolute after:inset-0 after:rounded-full after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
          </motion.div>
        </motion.div>

        {/* Medium shape - bottom left */}
        <motion.div
          initial={{
              opacity: 0,
              y: -150,
              rotate: 5,
          }}
          animate={{
              opacity: 1,
              y: 0,
              rotate: 15,
          }}
          transition={{
              duration: 2.4,
              delay: 0.6,
              ease: [0.23, 0.86, 0.39, 0.96],
              opacity: { duration: 1.2 },
          }}
          className="absolute left-[-20%] sm:left-[-10%] md:left-[-5%] bottom-[15%] md:bottom-[18%]"
        >
          <motion.div
              animate={{
                  y: [0, 15, 0],
              }}
              transition={{
                  duration: 12,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
              }}
              style={{
                  width: 400,
                  height: 100,
              }}
              className="relative max-w-[400px] sm:w-[500px] sm:h-[120px]"
          >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500/[0.06] to-transparent backdrop-blur-[2px] border-2 border-white/[0.08] shadow-[0_8px_32px_0_rgba(255,255,255,0.05)] after:absolute after:inset-0 after:rounded-full after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
          </motion.div>
        </motion.div>

        {/* Small shape - center left */}
        <motion.div
          initial={{
              opacity: 0,
              y: -150,
              rotate: -40,
          }}
          animate={{
              opacity: 1,
              y: 0,
              rotate: -28,
          }}
          transition={{
              duration: 2.4,
              delay: 0.7,
              ease: [0.23, 0.86, 0.39, 0.96],
              opacity: { duration: 1.2 },
          }}
          className="absolute left-[2%] md:left-[5%] top-[45%] md:top-[50%]"
        >
          <motion.div
              animate={{
                  y: [0, 15, 0],
              }}
              transition={{
                  duration: 12,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
              }}
              style={{
                  width: 200,
                  height: 60,
              }}
              className="relative max-w-[200px] sm:w-[300px] sm:h-[80px]"
          >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/[0.06] to-transparent backdrop-blur-[2px] border-2 border-white/[0.08] shadow-[0_8px_32px_0_rgba(255,255,255,0.05)] after:absolute after:inset-0 after:rounded-full after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
          </motion.div>
        </motion.div>

        {/* Small shape - center right */}
        <motion.div
          initial={{
              opacity: 0,
              y: -150,
              rotate: 25,
          }}
          animate={{
              opacity: 1,
              y: 0,
              rotate: 35,
          }}
          transition={{
              duration: 2.4,
              delay: 0.8,
              ease: [0.23, 0.86, 0.39, 0.96],
              opacity: { duration: 1.2 },
          }}
          className="absolute right-[5%] md:right-[8%] top-[55%] md:top-[60%]"
        >
          <motion.div
              animate={{
                  y: [0, 15, 0],
              }}
              transition={{
                  duration: 12,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
              }}
              style={{
                  width: 180,
                  height: 50,
              }}
              className="relative max-w-[180px] sm:w-[250px] sm:h-[70px]"
          >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500/[0.06] to-transparent backdrop-blur-[2px] border-2 border-white/[0.08] shadow-[0_8px_32px_0_rgba(255,255,255,0.05)] after:absolute after:inset-0 after:rounded-full after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
          </motion.div>
        </motion.div>
      </div>

      <Header theme="dark" />

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16 sm:mb-32 pt-4 sm:pt-8">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 leading-tight px-4"
          >
            TAKE CONTROL OF YOUR CHANNEL.
            <br />
            <span style={{ color: '#ff4d4f' }}>SUPERCHARGE YOUR WORKFLOW.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-10 max-w-2xl mx-auto px-4"
          >
            Analytics, scheduling, live streaming, monetization & more - powered by AI and YouTube's official APIs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            className="mb-6 sm:mb-8"
          >
            <PlanTripButton />
          </motion.div>
        </div>

        {/* Hero MacBook with Video */}
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 1, ease: "easeOut" }}
          className="relative z-10 w-full max-w-6xl mx-auto mt-4 sm:mt-8 mb-8 sm:mb-16 px-4"
        >
          <motion.div 
            style={{ scale: laptopScale }}
            className="drop-shadow-[0_35px_70px_rgba(255,0,3,0.3)] shadow-[#ff0003]/40"
          >
            <MacbookPro className="w-full h-auto mx-auto max-w-full">
              <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="/images/landingpage/herovideo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </MacbookPro>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
