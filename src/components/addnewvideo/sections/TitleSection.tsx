
import React from 'react';
import { GlowCard } from '@/components/ui/spotlight-card';
import { GlowInput } from '@/components/ui/glow-input';

interface TitleSectionProps {
  value: string;
  onChange: (value: string) => void;
}

const TitleSection: React.FC<TitleSectionProps> = ({ value, onChange }) => {
  return (
    <GlowCard glowColor="red" customSize className="w-full p-6 mb-8">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Video Title</h2>
        <GlowInput
          glowColor="red"
          placeholder="Enter video title (optional - AI will generate if left blank)"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-12 text-lg"
        />
        <p className="text-sm text-gray-400">
          Leave blank to have AI generate a title based on your content
        </p>
      </div>
    </GlowCard>
  );
};

export default TitleSection;
