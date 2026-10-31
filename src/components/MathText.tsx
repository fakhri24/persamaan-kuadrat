import React, { useMemo } from 'react';
import { MathView } from './MathView';

interface MathTextProps {
  text: string;
  className?: string;
  /**
   * Teks yang memuat matematika dalam delimiter LaTeX:
   * - `$...$`   -> rumus inline (KaTeX)
   * - `$$...$$` -> rumus blok (KaTeX display)
   * - `\n`      -> baris baru (dipertahankan via whitespace-pre-line)
   */
}

type Segment =
  | { type: 'text'; value: string }
  | { type: 'inline'; value: string }
  | { type: 'block'; value: string };

const MATH_SEGMENT = /\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g;

const parseSegments = (text: string): Segment[] => {
  const segments: Segment[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  MATH_SEGMENT.lastIndex = 0;
  while ((match = MATH_SEGMENT.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: 'text', value: text.slice(lastIndex, match.index) });
    }
    if (match[1] !== undefined) {
      segments.push({ type: 'block', value: match[1] });
    } else if (match[2] !== undefined) {
      segments.push({ type: 'inline', value: match[2] });
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    segments.push({ type: 'text', value: text.slice(lastIndex) });
  }
  return segments;
};

export const MathText: React.FC<MathTextProps> = ({ text, className = '' }) => {
  const segments = useMemo(() => parseSegments(text), [text]);

  return (
    <div className={`whitespace-pre-line ${className}`}>
      {segments.map((segment, index) => {
        if (segment.type === 'text') {
          const previous = segments[index - 1];
          const next = segments[index + 1];
          const whitespaceOnly = segment.value.trim() === '';
          // Hilangkan baris kosong di antara dua rumus blok agar tidak terlalu renggang.
          if (whitespaceOnly && previous?.type === 'block' && next?.type === 'block') {
            return null;
          }
          return <React.Fragment key={index}>{segment.value}</React.Fragment>;
        }
        if (segment.type === 'block') {
          return <MathView key={index} block math={segment.value} />;
        }
        return <MathView key={index} math={segment.value} />;
      })}
    </div>
  );
};
