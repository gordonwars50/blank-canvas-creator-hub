
import React, { useEffect, useRef, forwardRef } from 'react';

interface GlowInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  glowColor?: 'blue' | 'purple' | 'green' | 'red' | 'orange';
  leftIcon?: React.ReactNode;
}

const glowColorMap = {
  blue: { base: 220, spread: 200 },
  purple: { base: 280, spread: 300 },
  green: { base: 120, spread: 200 },
  red: { base: 0, spread: 200 },
  orange: { base: 30, spread: 200 }
};

const GlowInput = forwardRef<HTMLInputElement, GlowInputProps>(({ 
  className = '', 
  glowColor = 'red',
  leftIcon,
  ...props
}, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const syncPointer = (e: PointerEvent) => {
      const { clientX: x, clientY: y } = e;
      
      if (containerRef.current) {
        containerRef.current.style.setProperty('--x', x.toFixed(2));
        containerRef.current.style.setProperty('--xp', (x / window.innerWidth).toFixed(2));
        containerRef.current.style.setProperty('--y', y.toFixed(2));
        containerRef.current.style.setProperty('--yp', (y / window.innerHeight).toFixed(2));
      }
    };

    document.addEventListener('pointermove', syncPointer);
    return () => document.removeEventListener('pointermove', syncPointer);
  }, []);

  const { base, spread } = glowColorMap[glowColor];

  const getInlineStyles = (): React.CSSProperties & Record<string, any> => {
    return {
      '--base': base,
      '--spread': spread,
      '--radius': '8',
      '--border': '1',
      '--backdrop': 'hsl(0 0% 60% / 0.12)',
      '--backup-border': 'var(--backdrop)',
      '--size': '200',
      '--outer': '1',
      '--border-size': 'calc(var(--border, 2) * 1px)',
      '--spotlight-size': 'calc(var(--size, 150) * 1px)',
      '--hue': 'calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))',
      '--saturation': '50',
      '--lightness': '50',
      '--bg-spot-opacity': '0.05',
      '--border-spot-opacity': '0.3',
      '--border-light-opacity': '0.1',
      backgroundImage: `radial-gradient(
        var(--spotlight-size) var(--spotlight-size) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 70) * 1%) / var(--bg-spot-opacity, 0.1)), transparent
      )`,
      backgroundColor: 'var(--backdrop, transparent)',
      backgroundSize: 'calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))',
      backgroundPosition: '50% 50%',
      backgroundAttachment: 'fixed',
      border: 'var(--border-size) solid var(--backup-border)',
      position: 'relative',
      touchAction: 'none',
      borderRadius: 'calc(var(--radius) * 1px)',
      overflow: 'hidden',
    };
  };

  const beforeAfterStyles = `
    [data-glow-input]::before,
    [data-glow-input]::after {
      pointer-events: none;
      content: "";
      position: absolute;
      inset: calc(var(--border-size) * -1);
      border: var(--border-size) solid transparent;
      border-radius: calc(var(--radius) * 1px);
      background-attachment: fixed;
      background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
      background-repeat: no-repeat;
      background-position: 50% 50%;
      mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
      mask-clip: padding-box, border-box;
      mask-composite: intersect;
    }
    
    [data-glow-input]::before {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 50) * 1%) / var(--border-spot-opacity, 1)), transparent 100%
      );
      filter: brightness(2);
    }
    
    [data-glow-input]::after {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(0 100% 100% / var(--border-light-opacity, 1)), transparent 100%
      );
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: beforeAfterStyles }} />
      <div
        ref={containerRef}
        data-glow-input
        style={getInlineStyles()}
        className={`relative w-full ${className}`}
      >
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          {...props}
          className={`
            w-full h-full bg-transparent text-white placeholder-gray-400 
            focus:outline-none border-none
            ${leftIcon ? 'pl-10' : 'pl-4'} pr-4 py-2
          `}
        />
      </div>
    </>
  );
});

GlowInput.displayName = 'GlowInput';

export { GlowInput };
