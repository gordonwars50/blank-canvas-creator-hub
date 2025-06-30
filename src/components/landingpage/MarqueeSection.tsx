
import { VelocityScroll } from "@/components/ui/scroll-based-velocity";

const MarqueeSection = () => {
  return (
    <div className="w-full py-6 bg-black">
      <VelocityScroll
        text="Plan → Publish → Analyze → Monetize → Repeat 💰"
        default_velocity={3}
        className="font-display text-center text-4xl font-bold tracking-[-0.02em] text-white drop-shadow-sm md:text-6xl md:leading-[4rem]"
      />
    </div>
  );
};

export default MarqueeSection;
