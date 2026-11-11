import React, { useId } from 'react';

export interface KolamJalanDiagramProps {
  luasKolamLabel?: string; // contoh: "140 m²"
  selisihLabel?: string; // contoh: "4 m"
  lebarJalanLabel?: string; // contoh: "2 m"
  className?: string;
}

/**
 * Diagram SVG HD Kolam Renang & Jalan Setapak di Sekelilingnya (4 Sisi).
 *
 * Dirancang 100% bebas bocoran (tanpa rumus variabel l, l+4, l+2x, maupun ukuran
 * hasil akhir). Hanya menampilkan visual arsitektural kolam di bagian dalam,
 * jalur pedestrian/jalan setapak bertekstur paving di sekeliling luarnya,
 * serta penunjuk lebar jalan di keempat sisi.
 */
export const KolamJalanDiagramSvg: React.FC<KolamJalanDiagramProps> = ({
  luasKolamLabel = '140 m²',
  lebarJalanLabel = '2 m',
  className = '',
}) => {
  const titleId = useId();
  const uid = useId().replace(/:/g, '');

  return (
    <div
      className={`flex flex-col items-center justify-center my-4 p-3 sm:p-4 bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-inner ${className}`}
    >
      <div className="w-full max-w-md select-none">
        <svg
          viewBox="0 0 480 280"
          className="w-full h-auto"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-labelledby={titleId}
        >
          <title id={titleId}>
            Skema kolam renang persegi panjang dengan luas {luasKolamLabel} yang dikelilingi jalan
            setapak selebar {lebarJalanLabel} di keempat sisinya.
          </title>
          <desc>
            Persegi panjang bagian dalam merupakan kolam renang, dikelilingi bingkai persegi panjang
            bagian luar yang merupakan jalan setapak dengan lebar seragam di keempat sisi.
          </desc>

          <defs>
            {/* Tekstur paving halus untuk area jalan setapak */}
            <pattern
              id={`paving-${uid}`}
              width="16"
              height="16"
              patternUnits="userSpaceOnUse"
            >
              <rect
                width="16"
                height="16"
                className="fill-amber-50/90 dark:fill-slate-800/90"
              />
              <path
                d="M 0 8 H 16 M 8 0 V 8 M 0 0 V 16 M 16 8 V 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.7"
                className="text-amber-300/80 dark:text-slate-600/80"
              />
            </pattern>

            {/* Gradien air kolam */}
            <linearGradient id={`poolGrad-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.95" />
            </linearGradient>

            <linearGradient id={`poolGradDark-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0c4a6e" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#082f49" stopOpacity="0.95" />
            </linearGradient>

            {/* Pola riak air halus */}
            <pattern
              id={`waterRipple-${uid}`}
              width="32"
              height="16"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 4 8 Q 10 4, 16 8 T 28 8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                className="text-sky-400/40 dark:text-sky-400/20"
              />
            </pattern>
          </defs>

          {/* Bingkai Luar: Area Total (Kolam + Jalan Setapak) */}
          {/* Koordinat Luar: x=60, y=24, width=360, height=224 */}
          <rect
            x="60"
            y="24"
            width="360"
            height="224"
            rx="10"
            fill={`url(#paving-${uid})`}
            stroke="currentColor"
            strokeWidth="2.2"
            className="text-slate-700 dark:text-slate-300"
          />

          {/* Bingkai Dalam: Area Kolam Renang */}
          {/* Lebar jalan di layar = 42px pada tiap sisi -> x=102, y=66, width=276, height=140 */}
          <rect
            x="102"
            y="66"
            width="276"
            height="140"
            rx="6"
            className="fill-sky-100 dark:fill-sky-950 stroke-sky-600 dark:stroke-sky-400"
            strokeWidth="2.2"
          />
          <rect
            x="102"
            y="66"
            width="276"
            height="140"
            rx="6"
            fill={`url(#waterRipple-${uid})`}
          />

          {/* Garis bantu sudut jalan (corner miters halus) */}
          <line
            x1="60"
            y1="66"
            x2="102"
            y2="66"
            stroke="currentColor"
            strokeWidth="0.9"
            strokeDasharray="3 3"
            className="text-slate-400 dark:text-slate-500"
          />
          <line
            x1="378"
            y1="66"
            x2="420"
            y2="66"
            stroke="currentColor"
            strokeWidth="0.9"
            strokeDasharray="3 3"
            className="text-slate-400 dark:text-slate-500"
          />
          <line
            x1="60"
            y1="206"
            x2="102"
            y2="206"
            stroke="currentColor"
            strokeWidth="0.9"
            strokeDasharray="3 3"
            className="text-slate-400 dark:text-slate-500"
          />
          <line
            x1="378"
            y1="206"
            x2="420"
            y2="206"
            stroke="currentColor"
            strokeWidth="0.9"
            strokeDasharray="3 3"
            className="text-slate-400 dark:text-slate-500"
          />

          {/* Badge Tengah Kolam Renang */}
          <rect
            x="166"
            y="106"
            width="148"
            height="60"
            rx="10"
            className="fill-white/95 dark:fill-slate-900/95 stroke-sky-500 dark:stroke-sky-400"
            strokeWidth="1.4"
          />
          <text
            x="240"
            y="129"
            textAnchor="middle"
            fontSize="12"
            fontWeight="800"
            letterSpacing="1.6"
            className="fill-sky-700 dark:fill-sky-300"
          >
            KOLAM RENANG
          </text>
          <text
            x="240"
            y="153"
            textAnchor="middle"
            fontSize="16"
            fontWeight="800"
            className="fill-slate-900 dark:fill-slate-100"
          >
            Luas = {luasKolamLabel}
          </text>

          {/* Label panjang & lebar kolam di sisi dalam (tanpa angka/rumus bocoran) */}
          <rect
            x="206"
            y="73"
            width="68"
            height="18"
            rx="4"
            className="fill-sky-50/90 dark:fill-slate-900/90"
          />
          <text
            x="240"
            y="85.5"
            textAnchor="middle"
            fontSize="11.5"
            fontWeight="700"
            className="fill-sky-800 dark:fill-sky-300"
          >
            panjang
          </text>

          <rect
            x="109"
            y="112"
            width="18"
            height="48"
            rx="4"
            className="fill-sky-50/90 dark:fill-slate-900/90"
          />
          <text
            x="121"
            y="136"
            textAnchor="middle"
            fontSize="11.5"
            fontWeight="700"
            transform="rotate(-90 121 136)"
            className="fill-sky-800 dark:fill-sky-300"
          >
            lebar
          </text>

          {/* Label "JALAN SETAPAK" pada area atas & bawah */}
          <rect
            x="184"
            y="34"
            width="112"
            height="21"
            rx="5"
            className="fill-amber-100/95 dark:fill-amber-950/90 stroke-amber-500/70 dark:stroke-amber-500/60"
            strokeWidth="1"
          />
          <text
            x="240"
            y="48"
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="800"
            letterSpacing="1.1"
            className="fill-amber-900 dark:fill-amber-200"
          >
            JALAN SETAPAK
          </text>

          {/* Panah Ukur Lebar Jalan — Sisi Atas (x=330, y=24..66) */}
          <line
            x1="330"
            y1="27"
            x2="330"
            y2="63"
            stroke="currentColor"
            strokeWidth="1.6"
            className="text-indigo-700 dark:text-indigo-300"
          />
          <path d="M330 25 L326.5 32 L333.5 32 Z" className="fill-indigo-700 dark:fill-indigo-300" />
          <path d="M330 65 L326.5 58 L333.5 58 Z" className="fill-indigo-700 dark:fill-indigo-300" />
          <rect
            x="337"
            y="35"
            width="34"
            height="19"
            rx="4"
            className="fill-white dark:fill-slate-900 stroke-indigo-500 dark:stroke-indigo-400"
            strokeWidth="1.1"
          />
          <text
            x="354"
            y="48"
            textAnchor="middle"
            fontSize="11"
            fontWeight="800"
            className="fill-indigo-700 dark:fill-indigo-300"
          >
            {lebarJalanLabel}
          </text>

          {/* Panah Ukur Lebar Jalan — Sisi Bawah (x=240, y=206..248) */}
          <line
            x1="240"
            y1="209"
            x2="240"
            y2="245"
            stroke="currentColor"
            strokeWidth="1.6"
            className="text-indigo-700 dark:text-indigo-300"
          />
          <path d="M240 207 L236.5 214 L243.5 214 Z" className="fill-indigo-700 dark:fill-indigo-300" />
          <path d="M240 247 L236.5 240 L243.5 240 Z" className="fill-indigo-700 dark:fill-indigo-300" />
          <rect
            x="247"
            y="217.5"
            width="34"
            height="19"
            rx="4"
            className="fill-white dark:fill-slate-900 stroke-indigo-500 dark:stroke-indigo-400"
            strokeWidth="1.1"
          />
          <text
            x="264"
            y="230.5"
            textAnchor="middle"
            fontSize="11"
            fontWeight="800"
            className="fill-indigo-700 dark:fill-indigo-300"
          >
            {lebarJalanLabel}
          </text>

          {/* Panah Ukur Lebar Jalan — Sisi Kiri (x=60..102, y=136) */}
          <line
            x1="63"
            y1="136"
            x2="99"
            y2="136"
            stroke="currentColor"
            strokeWidth="1.6"
            className="text-indigo-700 dark:text-indigo-300"
          />
          <path d="M61 136 L68 132.5 L68 139.5 Z" className="fill-indigo-700 dark:fill-indigo-300" />
          <path d="M101 136 L94 132.5 L94 139.5 Z" className="fill-indigo-700 dark:fill-indigo-300" />
          <rect
            x="64"
            y="109"
            width="34"
            height="19"
            rx="4"
            className="fill-white dark:fill-slate-900 stroke-indigo-500 dark:stroke-indigo-400"
            strokeWidth="1.1"
          />
          <text
            x="81"
            y="122"
            textAnchor="middle"
            fontSize="11"
            fontWeight="800"
            className="fill-indigo-700 dark:fill-indigo-300"
          >
            {lebarJalanLabel}
          </text>

          {/* Panah Ukur Lebar Jalan — Sisi Kanan (x=378..420, y=136) */}
          <line
            x1="381"
            y1="136"
            x2="417"
            y2="136"
            stroke="currentColor"
            strokeWidth="1.6"
            className="text-indigo-700 dark:text-indigo-300"
          />
          <path d="M379 136 L386 132.5 L386 139.5 Z" className="fill-indigo-700 dark:fill-indigo-300" />
          <path d="M419 136 L412 132.5 L412 139.5 Z" className="fill-indigo-700 dark:fill-indigo-300" />
          <rect
            x="382"
            y="109"
            width="34"
            height="19"
            rx="4"
            className="fill-white dark:fill-slate-900 stroke-indigo-500 dark:stroke-indigo-400"
            strokeWidth="1.1"
          />
          <text
            x="399"
            y="122"
            textAnchor="middle"
            fontSize="11"
            fontWeight="800"
            className="fill-indigo-700 dark:fill-indigo-300"
          >
            {lebarJalanLabel}
          </text>
        </svg>
      </div>

      <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-1 text-center italic">
        Ilustrasi skematis (tidak berskala): kolam renang persegi panjang di bagian tengah yang
        dikelilingi jalan setapak selebar {lebarJalanLabel} di keempat sisinya.
      </div>
    </div>
  );
};
