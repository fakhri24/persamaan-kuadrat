import React, { useId } from 'react';

export interface TamanBacaDiagramProps {
  selisihLabel: string; // contoh: "4 m"
  luasLabel: string; // contoh: "96 m²"
  className?: string;
}

/**
 * Skema lahan taman baca berbentuk persegi panjang.
 *
 * Sengaja hanya menampilkan informasi yang sudah diberikan (panjang, lebar,
 * selisih 4 m, dan luas 96 m²) tanpa variabel atau persamaan, agar siswa tetap
 * harus membangun model luasnya sendiri.
 */
export const TamanBacaDiagramSvg: React.FC<TamanBacaDiagramProps> = ({
  selisihLabel,
  luasLabel,
  className = '',
}) => {
  const titleId = useId();

  return (
    <div
      className={`flex flex-col items-center justify-center my-4 p-3 sm:p-4 bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-inner ${className}`}
    >
      <div className="w-full max-w-md select-none">
        <svg
          viewBox="0 0 460 250"
          className="w-full h-auto"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-labelledby={titleId}
        >
          <title id={titleId}>
            Skema lahan taman baca berbentuk persegi panjang. Panjang {selisihLabel} lebih
            dari lebar. Luas {luasLabel}.
          </title>
          <desc>
            Persegi panjang dengan sisi panjang di atas dan sisi lebar di kiri. Ukuran tidak
            berskala.
          </desc>

          {/* Lahan */}
          <rect
            x="120"
            y="78"
            width="260"
            height="140"
            rx="8"
            strokeWidth="2.2"
            className="fill-indigo-50 stroke-indigo-600 dark:fill-indigo-950 dark:stroke-indigo-400"
          />
          <text
            x="250"
            y="132"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            letterSpacing="2"
            className="fill-indigo-700 dark:fill-indigo-300"
          >
            TAMAN BACA
          </text>
          <text
            x="250"
            y="166"
            textAnchor="middle"
            fontSize="22"
            fontWeight="700"
            className="fill-slate-900 dark:fill-slate-100"
          >
            Luas {luasLabel}
          </text>

          {/* Garis ukur panjang (atas) */}
          <line
            x1="120"
            y1="54"
            x2="380"
            y2="54"
            strokeWidth="1.4"
            className="stroke-indigo-600 dark:stroke-indigo-400"
          />
          <line
            x1="120"
            y1="72"
            x2="120"
            y2="48"
            strokeWidth="1"
            className="stroke-slate-400 dark:stroke-slate-500"
          />
          <line
            x1="380"
            y1="72"
            x2="380"
            y2="48"
            strokeWidth="1"
            className="stroke-slate-400 dark:stroke-slate-500"
          />
          <path d="M120 54 L129 49.5 L129 58.5 Z" className="fill-indigo-600 dark:fill-indigo-400" />
          <path d="M380 54 L371 49.5 L371 58.5 Z" className="fill-indigo-600 dark:fill-indigo-400" />
          <rect
            x="208"
            y="35"
            width="84"
            height="22"
            rx="6"
            className="fill-slate-50 dark:fill-slate-950"
          />
          <text
            x="250"
            y="51"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            className="fill-indigo-700 dark:fill-indigo-300"
          >
            panjang
          </text>

          {/* Garis ukur lebar (kiri, arah atas-bawah) */}
          <line
            x1="90"
            y1="78"
            x2="90"
            y2="218"
            strokeWidth="1.4"
            className="stroke-indigo-600 dark:stroke-indigo-400"
          />
          <line
            x1="114"
            y1="78"
            x2="84"
            y2="78"
            strokeWidth="1"
            className="stroke-slate-400 dark:stroke-slate-500"
          />
          <line
            x1="114"
            y1="218"
            x2="84"
            y2="218"
            strokeWidth="1"
            className="stroke-slate-400 dark:stroke-slate-500"
          />
          <path d="M90 78 L85.5 87 L94.5 87 Z" className="fill-indigo-600 dark:fill-indigo-400" />
          <path
            d="M90 218 L85.5 209 L94.5 209 Z"
            className="fill-indigo-600 dark:fill-indigo-400"
          />
          <rect
            x="78"
            y="122"
            width="24"
            height="52"
            rx="6"
            className="fill-slate-50 dark:fill-slate-950"
          />
          <text
            x="90"
            y="148"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            transform="rotate(90 90 148)"
            className="fill-indigo-700 dark:fill-indigo-300"
          >
            lebar
          </text>

          {/* Callout selisih panjang-lebar */}
          <rect
            x="268"
            y="6"
            width="184"
            height="28"
            rx="8"
            strokeWidth="1.3"
            className="fill-amber-50 stroke-amber-500 dark:fill-amber-950 dark:stroke-amber-400"
          />
          <text
            x="360"
            y="25"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            className="fill-amber-800 dark:fill-amber-200"
          >
            {selisihLabel} lebih dari lebar
          </text>
          <path
            d="M360 34 L380 54"
            fill="none"
            strokeWidth="1.5"
            className="stroke-amber-500 dark:stroke-amber-400"
          />
          <circle
            cx="380"
            cy="54"
            r="2.2"
            className="fill-amber-500 dark:fill-amber-400"
          />
        </svg>
      </div>
    </div>
  );
};
