import React, { useId } from 'react';

export interface TanggaDiagramProps {
  panjangTangga: string; // e.g. "13 m"
  tinggiLabel: string;   // e.g. "t = x + 7 m"
  jarakLabel: string;    // e.g. "x m"
  className?: string;
}

export const TanggaDiagramSvg: React.FC<TanggaDiagramProps> = ({
  panjangTangga,
  tinggiLabel,
  jarakLabel,
  className = '',
}) => {
  const titleId = useId();

  // Ladder geometry
  // Top of ladder at wall: (130, 55)
  // Base of wall on ground: (130, 235)
  // Foot of ladder on ground: (350, 235)

  // Calculate 8 ladder rungs along the hypotenuse
  const rungs = [];
  const numRungs = 7;
  const x1 = 130;
  const y1 = 55;
  const x2 = 350;
  const y2 = 235;

  for (let i = 1; i <= numRungs; i++) {
    const t = i / (numRungs + 1);
    const rx = x1 + t * (x2 - x1);
    const ry = y1 + t * (y2 - y1);
    // Perpendicular normal to ladder direction: dx = 220, dy = 180 => perp is (-dy, dx) = (-180, 220) normalized
    // Length is ~284, perp unit: (-0.63, 0.77) * 7px
    const nx = -4.5;
    const ny = 5.5;
    rungs.push({
      x1: rx - nx,
      y1: ry - ny,
      x2: rx + nx,
      y2: ry + ny,
    });
  }

  return (
    <div className={`flex flex-col items-center justify-center my-4 p-3 sm:p-4 bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-inner ${className}`}>
      <div className="w-full max-w-md aspect-[16/10] relative select-none">
        <svg
          viewBox="0 0 460 290"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-labelledby={titleId}
        >
          <title id={titleId}>
            Skema tangga: panjang {panjangTangga}, tinggi {tinggiLabel}, jarak {jarakLabel}
          </title>
          <desc>
            Segitiga siku-siku antara dinding vertikal, lantai datar, dan tangga yang bersandar.
            Skema tidak berskala.
          </desc>
          <defs>
            {/* Pattern for wall brick texture */}
            <pattern id="brickPattern" width="20" height="12" patternUnits="userSpaceOnUse">
              <rect width="20" height="12" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-slate-300 dark:text-slate-700/60" />
              <line x1="0" y1="6" x2="20" y2="6" stroke="currentColor" strokeWidth="0.8" className="text-slate-300 dark:text-slate-700/60" />
              <line x1="10" y1="0" x2="10" y2="6" stroke="currentColor" strokeWidth="0.8" className="text-slate-300 dark:text-slate-700/60" />
              <line x1="0" y1="6" x2="0" y2="12" stroke="currentColor" strokeWidth="0.8" className="text-slate-300 dark:text-slate-700/60" />
              <line x1="20" y1="6" x2="20" y2="12" stroke="currentColor" strokeWidth="0.8" className="text-slate-300 dark:text-slate-700/60" />
            </pattern>

            {/* Pattern for ground hatch */}
            <pattern id="groundHatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="8" stroke="currentColor" strokeWidth="1" className="text-slate-400 dark:text-slate-600" />
            </pattern>

            {/* Dimension arrow markers */}
            <marker id="tanggaArrowStart" viewBox="0 0 10 10" refX="2" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 10 1 L 0 5 L 10 9 z" fill="currentColor" className="text-indigo-600 dark:text-indigo-400" />
            </marker>
            <marker id="tanggaArrowEnd" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="currentColor" className="text-indigo-600 dark:text-indigo-400" />
            </marker>
          </defs>

          {/* Wall / Dinding Bangunan */}
          <rect
            x="60"
            y="30"
            width="70"
            height="205"
            fill="url(#brickPattern)"
            stroke="currentColor"
            strokeWidth="1.8"
            className="text-slate-400 dark:text-slate-600"
          />
          {/* Outer edge of wall (facing ladder) */}
          <line
            x1="130"
            y1="25"
            x2="130"
            y2="235"
            stroke="currentColor"
            strokeWidth="2.5"
            className="text-slate-700 dark:text-slate-300"
          />

          {/* Ground / Tanah Datar */}
          <rect
            x="50"
            y="235"
            width="370"
            height="24"
            fill="url(#groundHatch)"
            className="text-slate-300 dark:text-slate-700"
          />
          <line
            x1="50"
            y1="235"
            x2="420"
            y2="235"
            stroke="currentColor"
            strokeWidth="2.5"
            className="text-slate-800 dark:text-slate-200"
          />

          {/* Right Angle (Siku-siku 90 deg) at corner (130, 235) */}
          <path
            d="M 130 220 L 145 220 L 145 235"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="text-rose-500 dark:text-rose-400"
          />
          <circle cx="137.5" cy="227.5" r="1.5" className="fill-rose-500 dark:fill-rose-400" />

          {/* Ladder Rails (Tangga Bersandar) */}
          {/* Rail 1 (left) */}
          <line
            x1={x1 - 4.5}
            y1={y1 - 5.5}
            x2={x2 - 4.5}
            y2={y2 - 5.5}
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
            className="text-amber-600 dark:text-amber-500"
          />
          {/* Rail 2 (right) */}
          <line
            x1={x1 + 4.5}
            y1={y1 + 5.5}
            x2={x2 + 4.5}
            y2={y2 + 5.5}
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
            className="text-amber-600 dark:text-amber-500"
          />

          {/* Ladder Rungs (Anak Tangga) */}
          {rungs.map((r, idx) => (
            <line
              key={idx}
              x1={r.x1}
              y1={r.y1}
              x2={r.x2}
              y2={r.y2}
              stroke="currentColor"
              strokeWidth="2.2"
              className="text-amber-700 dark:text-amber-400"
            />
          ))}

          {/* Dimension Line: Vertical Height (Tinggi Dinding) */}
          <line
            x1="42"
            y1="60"
            x2="42"
            y2="230"
            stroke="currentColor"
            strokeWidth="1.6"
            markerStart="url(#tanggaArrowStart)"
            markerEnd="url(#tanggaArrowEnd)"
            className="text-indigo-600 dark:text-indigo-400"
          />
          {/* Dimension Extension Lines */}
          <line x1="38" y1="55" x2="130" y2="55" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" className="text-slate-400 dark:text-slate-500" />
          <line x1="38" y1="235" x2="60" y2="235" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" className="text-slate-400 dark:text-slate-500" />

          {/* Badge: Tinggi Label */}
          <g transform="translate(42, 145)">
            <rect
              x="-34"
              y="-12"
              width="68"
              height="24"
              rx="6"
              className="fill-white dark:fill-slate-900 stroke-indigo-400 dark:stroke-indigo-600"
              strokeWidth="1.2"
            />
            <text
              x="0"
              y="4"
              textAnchor="middle"
              className="text-[11px] font-bold fill-indigo-700 dark:fill-indigo-300"
            >
              {tinggiLabel.includes('=') ? tinggiLabel : `Tinggi = ${tinggiLabel}`}
            </text>
          </g>

          {/* Dimension Line: Horizontal Distance (Jarak Kaki ke Tembok) */}
          <line
            x1="135"
            y1="270"
            x2="345"
            y2="270"
            stroke="currentColor"
            strokeWidth="1.6"
            markerStart="url(#tanggaArrowStart)"
            markerEnd="url(#tanggaArrowEnd)"
            className="text-indigo-600 dark:text-indigo-400"
          />
          {/* Extension lines for ground */}
          <line x1="130" y1="235" x2="130" y2="278" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" className="text-slate-400 dark:text-slate-500" />
          <line x1="350" y1="235" x2="350" y2="278" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" className="text-slate-400 dark:text-slate-500" />

          {/* Badge: Jarak Kaki Label */}
          <g transform="translate(240, 270)">
            <rect
              x="-35"
              y="-12"
              width="70"
              height="24"
              rx="6"
              className="fill-white dark:fill-slate-900 stroke-indigo-400 dark:stroke-indigo-600"
              strokeWidth="1.2"
            />
            <text
              x="0"
              y="4"
              textAnchor="middle"
              className="text-[11px] font-bold fill-indigo-700 dark:fill-indigo-300"
            >
              Jarak = {jarakLabel}
            </text>
          </g>

          {/* Badge: Panjang Tangga (Hypotenuse) */}
          {/* Midpoint of ladder: (240, 145), offset up-right to (265, 125) */}
          <g transform="translate(270, 120)">
            <rect
              x="-50"
              y="-13"
              width="100"
              height="26"
              rx="8"
              className="fill-amber-50 dark:fill-amber-950/90 stroke-amber-500 dark:stroke-amber-400 shadow-sm"
              strokeWidth="1.5"
            />
            <text
              x="0"
              y="4"
              textAnchor="middle"
              className="text-[12px] font-extrabold fill-amber-800 dark:fill-amber-200"
            >
              Tangga = {panjangTangga}
            </text>
          </g>

          {/* Architectural Labels */}
          <text
            x="95"
            y="20"
            textAnchor="middle"
            className="text-[10px] font-semibold tracking-wider fill-slate-500 dark:fill-slate-400 uppercase"
          >
            Tembok
          </text>
          <text
            x="395"
            y="228"
            textAnchor="end"
            className="text-[10px] font-semibold tracking-wider fill-slate-500 dark:fill-slate-400 uppercase"
          >
            Lantai Datar
          </text>
        </svg>
      </div>

      <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-1 text-center italic">
        Ilustrasi skematis (tidak berskala): segitiga siku-siku antara tinggi tembok jangkauan,
        jarak tumpuan kaki tangga, dan panjang tangga bersandar.
      </div>
    </div>
  );
};
