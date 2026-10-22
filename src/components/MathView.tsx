import React, { useMemo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MathViewProps {
  math: string;
  block?: boolean;
  className?: string;
}

export const MathView: React.FC<MathViewProps> = ({ math, block = false, className = '' }) => {
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

  if (block) {
    return (
      <div
        tabIndex={0}
        role="region"
        aria-label="Formula Matematika"
        className={`my-2 w-full max-w-full overflow-x-auto py-1.5 px-2 text-center font-math scrollbar-thin touch-pan-x rounded-lg transition-all focus:outline-none focus:ring-1 focus:ring-indigo-300/50 ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <span
      className={`inline-block max-w-full overflow-x-auto align-middle font-math px-0.5 ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
