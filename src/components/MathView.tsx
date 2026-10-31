import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MathViewProps {
  math: string;
  block?: boolean;
  className?: string;
}

export const MathView: React.FC<MathViewProps> = ({ math, block = false, className = '' }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const html = useMemo(() => {
    try {
      // Normalize multiple backslashes before LaTeX command letters (e.g. \\quad -> \quad, \\text -> \text)
      const sanitized = math.replace(/\\+([a-zA-Z]+)/g, (_, cmd) => '\\' + cmd);
      return katex.renderToString(sanitized, {
        displayMode: block,
        throwOnError: false,
      });
    } catch {
      return math;
    }
  }, [math, block]);

  // Rumus blok panjang diskalakan agar muat di layar kecil; jika masih lebih
  // lebar, beri isyarat gulir (fade) supaya tidak terpotong tanpa petunjuk.
  useLayoutEffect(() => {
    if (!block) return;

    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    let frame = 0;
    const measure = () => {
      content.style.fontSize = '';
      const available = container.clientWidth - 16;
      const needed = content.scrollWidth;
      if (available <= 0 || needed <= 0) return;

      if (needed > available) {
        const scale = Math.max(0.85, available / needed);
        content.style.fontSize = `${scale}em`;
      }

      const stillOverflowing = content.scrollWidth - container.clientWidth > 2;
      setIsOverflowing((previous) => (previous === stillOverflowing ? previous : stillOverflowing));
    };

    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };

    measure();
    const observer = new ResizeObserver(schedule);
    observer.observe(container);
    document.fonts?.ready.then(schedule).catch(() => {});

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [block, html]);

  if (block) {
    return (
      <div className={`my-2 w-full max-w-full ${className}`}>
        <div
          ref={containerRef}
          tabIndex={0}
          role="math"
          aria-roledescription="rumus matematika"
          title={isOverflowing ? 'Geser ke samping untuk melihat rumus lengkap' : undefined}
          className={`w-full max-w-full overflow-x-auto py-1.5 px-2 text-center font-math scrollbar-thin touch-pan-x rounded-lg transition-all focus:outline-none focus:ring-1 focus:ring-indigo-300/50 ${
            isOverflowing ? 'math-overflow-fade' : ''
          }`}
        >
          <div
            ref={contentRef}
            className="inline-block"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    );
  }

  return (
    <span
      className={`inline-block max-w-full overflow-x-auto align-middle font-math ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
