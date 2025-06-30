
import { AnimatedMixedText } from "@/components/ui/animated-mixed-text";

const HighlightsSection = () => {
  const textSegments = [
    { text: "With YouManage, you can" },
    { text: "Control Your Channel", className: "text-red-500" },
    { text: "like a pro—upload, analyze, and grow your audience from one intelligent dashboard. Effortlessly handle" },
    { text: "Uploads & Scheduling", className: "text-red-500" },
    { text: "with AI-generated titles, tags, thumbnails, and a powerful calendar. Unlock deep insights with our" },
    { text: "AI Analytics Engine", className: "text-red-500" },
    { text: "that predicts publish times, tracks engagement, and spots trends before they happen. Manage livestreams, automate comments, and track revenue using" },
    { text: "Smart Monetization Tools", className: "text-red-500" },
    { text: "built to scale with your channel." },
  ];

  return (
    <section id="features-section" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <AnimatedMixedText
            segments={textSegments}
            delay={50}
            direction="top"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-6 leading-tight sm:leading-snug max-w-6xl mx-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default HighlightsSection;
