
"use client";
import { SmoothScroll } from "react-smooth-scrolll";

interface SmoothScrollProviderProps {
  children: React.ReactNode;
  enabled?: boolean;
}

const SmoothScrollProvider = ({ children, enabled = true }: SmoothScrollProviderProps) => {
  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <SmoothScroll 
      scrollSpeed={1.2} 
      smoothness={0.08} 
      infinite={false}
    >
      {children}
    </SmoothScroll>
  );
};

export default SmoothScrollProvider;
