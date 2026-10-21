import React from 'react';

export const Contoh55Svg: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center my-6 p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm">
      <div className="w-full max-w-lg aspect-[16/10] relative">
        <svg
          viewBox="0 0 520 320"
          className="w-full h-full select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Pattern for shaded lapangan */}
            <pattern id="diagonalHatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="8" stroke="currentColor" strokeWidth="1.2" className="text-slate-400 dark:text-slate-600" />
            </pattern>
            {/* Marker for arrows */}
            <marker id="arrowStart" viewBox="0 0 10 10" refX="2" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 10 1 L 0 5 L 10 9 z" fill="currentColor" className="text-slate-700 dark:text-slate-300" />
            </marker>
            <marker id="arrowEnd" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="currentColor" className="text-slate-700 dark:text-slate-300" />
            </marker>
          </defs>

          {/* Outer Boundary ABCD (Road outer edges) */}
          <rect
            x="40"
            y="30"
            width="440"
            height="250"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="text-slate-800 dark:text-slate-200"
          />

          {/* Shaded Lapangan (Touches bottom edge, inset by 2m road on left, top, right) */}
          {/* Inset coordinates: x = 110, y = 100, width = 300, height = 180 */}
          <rect
            x="110"
            y="100"
            width="300"
            height="180"
            fill="url(#diagonalHatch)"
            className="text-slate-400 dark:text-slate-600"
          />
          <rect
            x="110"
            y="100"
            width="300"
            height="180"
            fill="currentColor"
            fillOpacity="0.15"
            stroke="currentColor"
            strokeWidth="2.5"
            className="text-slate-800 dark:text-slate-200"
          />

          {/* Label: Jalan (at the top road section) */}
          <text
            x="260"
            y="65"
            textAnchor="middle"
            className="text-base font-semibold fill-slate-700 dark:fill-slate-300 tracking-wide"
          >
            Jalan
          </text>

          {/* Label: Lapangan (center of shaded region) */}
          <rect
            x="200"
            y="170"
            width="120"
            height="36"
            rx="6"
            className="fill-white/80 dark:fill-slate-900/80 stroke-slate-300 dark:stroke-slate-700"
            strokeWidth="1"
          />
          <text
            x="260"
            y="194"
            textAnchor="middle"
            className="text-base font-bold fill-slate-900 dark:fill-slate-100"
          >
            Lapangan
          </text>
          <text
            x="260"
            y="245"
            textAnchor="middle"
            className="text-sm font-medium fill-slate-600 dark:fill-slate-400 font-math"
          >
            panjang = 2l
          </text>

          {/* Double-headed arrow: Top Road Width (2 m) */}
          <line
            x1="160"
            y1="36"
            x2="160"
            y2="94"
            stroke="currentColor"
            strokeWidth="1.8"
            markerStart="url(#arrowStart)"
            markerEnd="url(#arrowEnd)"
            className="text-slate-700 dark:text-slate-300"
          />
          <text
            x="175"
            y="70"
            textAnchor="start"
            className="text-sm font-bold fill-slate-900 dark:fill-slate-100 font-math"
          >
            2 m
          </text>

          {/* Double-headed arrow: Left Road Width (2 m) */}
          <line
            x1="46"
            y1="230"
            x2="104"
            y2="230"
            stroke="currentColor"
            strokeWidth="1.8"
            markerStart="url(#arrowStart)"
            markerEnd="url(#arrowEnd)"
            className="text-slate-700 dark:text-slate-300"
          />
          <text
            x="75"
            y="255"
            textAnchor="middle"
            className="text-sm font-bold fill-slate-900 dark:fill-slate-100 font-math"
          >
            2 m
          </text>

          {/* Double-headed arrow: Right Road Width (2 m) */}
          <line
            x1="416"
            y1="230"
            x2="474"
            y2="230"
            stroke="currentColor"
            strokeWidth="1.8"
            markerStart="url(#arrowStart)"
            markerEnd="url(#arrowEnd)"
            className="text-slate-700 dark:text-slate-300"
          />
          <text
            x="445"
            y="255"
            textAnchor="middle"
            className="text-sm font-bold fill-slate-900 dark:fill-slate-100 font-math"
          >
            2 m
          </text>

          {/* Dimension marker: Width l on right of lapangan */}
          <line
            x1="400"
            y1="105"
            x2="400"
            y2="275"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="3 3"
            className="text-slate-400 dark:text-slate-500"
          />
        </svg>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 italic text-center">
        Gambar Contoh 5.5: Lapangan persegi panjang dengan jalan selebar 2 meter pada tiga sisi luarnya.
      </p>
    </div>
  );
};
