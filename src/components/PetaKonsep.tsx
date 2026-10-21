import React from 'react';
import { MathView } from './MathView';
import { ArrowDown, CornerDownRight } from 'lucide-react';

export const PetaKonsep: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="my-8 p-5 md:p-8 bg-gradient-to-b from-indigo-50/50 to-white dark:from-slate-900/80 dark:to-slate-950 border border-indigo-100 dark:border-slate-800 rounded-2xl shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span className="w-2.5 h-6 bg-indigo-600 rounded-full inline-block"></span>
            Peta Konsep: Persamaan Kuadrat
          </h3>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Klik salah satu kotak materi untuk langsung melompat ke bagian pembahasan terkait.
          </p>
        </div>
      </div>

      {/* Root Node */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => scrollTo('bab-5')}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg rounded-xl shadow-md transition-transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
        >
          <span>Persamaan Kuadrat</span>
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </button>
      </div>

      {/* Main 5 Branches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
        {/* Branch 1: Bentuk Umum */}
        <div className="flex flex-col">
          <button
            onClick={() => scrollTo('sub-5-1-1')}
            className="text-left p-3.5 bg-white dark:bg-slate-800 border-2 border-indigo-200 dark:border-indigo-900/60 rounded-xl hover:border-indigo-500 dark:hover:border-indigo-400 transition-all shadow-sm hover:shadow hover:-translate-y-0.5 h-full group"
          >
            <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
              Bentuk Umum
            </div>
            <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              <MathView math="ax^2 + bx + c = 0" />
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              dengan <MathView math="a \neq 0" /> dan <MathView math="a, b, c \in \mathbb{R}" />
            </div>
          </button>
        </div>

        {/* Branch 2: Mencari Akar */}
        <div className="flex flex-col">
          <button
            onClick={() => scrollTo('sub-5-1')}
            className="text-left p-3.5 bg-white dark:bg-slate-800 border-2 border-indigo-200 dark:border-indigo-900/60 rounded-xl hover:border-indigo-500 dark:hover:border-indigo-400 transition-all shadow-sm hover:shadow hover:-translate-y-0.5 group"
          >
            <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
              Sub-bab 5.1
            </div>
            <div className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Mencari Akar-akar Persamaan Kuadrat
            </div>
          </button>
          {/* Sub nodes */}
          <div className="mt-2 space-y-1.5 pl-2 border-l-2 border-indigo-100 dark:border-slate-800">
            <button
              onClick={() => scrollTo('sub-5-1-pemfaktoran')}
              className="w-full text-left p-2 text-xs bg-slate-50 dark:bg-slate-900/60 hover:bg-indigo-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-700 dark:text-slate-300 transition-colors flex items-start gap-1"
            >
              <CornerDownRight className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
              <span>1. Memfaktorkan</span>
            </button>
            <button
              onClick={() => scrollTo('sub-5-1-kuadrat-sempurna')}
              className="w-full text-left p-2 text-xs bg-slate-50 dark:bg-slate-900/60 hover:bg-indigo-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-700 dark:text-slate-300 transition-colors flex items-start gap-1"
            >
              <CornerDownRight className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
              <span>2. Melengkapkan Kuadrat Sempurna</span>
            </button>
            <button
              onClick={() => scrollTo('sub-5-1-rumus-abc')}
              className="w-full text-left p-2 text-xs bg-slate-50 dark:bg-slate-900/60 hover:bg-indigo-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-700 dark:text-slate-300 transition-colors flex items-start gap-1"
            >
              <CornerDownRight className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
              <span>3. Menggunakan Rumus Alkhawarizmi (Rumus Kecap/ABC)</span>
            </button>
          </div>
        </div>

        {/* Branch 3: Jenis Akar */}
        <div className="flex flex-col">
          <button
            onClick={() => scrollTo('sub-5-2')}
            className="text-left p-3.5 bg-white dark:bg-slate-800 border-2 border-indigo-200 dark:border-indigo-900/60 rounded-xl hover:border-indigo-500 dark:hover:border-indigo-400 transition-all shadow-sm hover:shadow hover:-translate-y-0.5 group"
          >
            <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
              Sub-bab 5.2
            </div>
            <div className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Jenis-jenis Akar Persamaan Kuadrat
            </div>
          </button>
          {/* Sub nodes */}
          <div className="mt-2 space-y-1.5 pl-2 border-l-2 border-indigo-100 dark:border-slate-800">
            <button
              onClick={() => scrollTo('sub-5-2')}
              className="w-full text-left p-2 text-xs bg-slate-50 dark:bg-slate-900/60 hover:bg-indigo-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-700 dark:text-slate-300 transition-colors flex items-start gap-1"
            >
              <CornerDownRight className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
              <span>1. Riil berbeda (<MathView math="D > 0" />)</span>
            </button>
            <button
              onClick={() => scrollTo('sub-5-2')}
              className="w-full text-left p-2 text-xs bg-slate-50 dark:bg-slate-900/60 hover:bg-indigo-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-700 dark:text-slate-300 transition-colors flex items-start gap-1"
            >
              <CornerDownRight className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
              <span>2. Riil kembar (<MathView math="D = 0" />)</span>
            </button>
            <button
              onClick={() => scrollTo('sub-5-2')}
              className="w-full text-left p-2 text-xs bg-slate-50 dark:bg-slate-900/60 hover:bg-indigo-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-700 dark:text-slate-300 transition-colors flex items-start gap-1"
            >
              <CornerDownRight className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
              <span>3. Tidak riil (<MathView math="D < 0" />)</span>
            </button>
          </div>
        </div>

        {/* Branch 4: Jumlah dan Hasil Kali */}
        <div className="flex flex-col">
          <button
            onClick={() => scrollTo('sub-5-3')}
            className="text-left p-3.5 bg-white dark:bg-slate-800 border-2 border-indigo-200 dark:border-indigo-900/60 rounded-xl hover:border-indigo-500 dark:hover:border-indigo-400 transition-all shadow-sm hover:shadow hover:-translate-y-0.5 group"
          >
            <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
              Sub-bab 5.3
            </div>
            <div className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Jumlah dan Hasil Akar Persamaan Kuadrat
            </div>
          </button>
          {/* Sub nodes */}
          <div className="mt-2 space-y-1.5 pl-2 border-l-2 border-indigo-100 dark:border-slate-800">
            <button
              onClick={() => scrollTo('sub-5-3')}
              className="w-full text-left p-2 text-xs bg-slate-50 dark:bg-slate-900/60 hover:bg-indigo-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-700 dark:text-slate-300 transition-colors flex items-start gap-1"
            >
              <CornerDownRight className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
              <span>1. <MathView math="x_1 + x_2 = -b/a" /></span>
            </button>
            <button
              onClick={() => scrollTo('sub-5-3')}
              className="w-full text-left p-2 text-xs bg-slate-50 dark:bg-slate-900/60 hover:bg-indigo-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-700 dark:text-slate-300 transition-colors flex items-start gap-1"
            >
              <CornerDownRight className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
              <span>2. <MathView math="x_1 \cdot x_2 = c/a" /></span>
            </button>
          </div>
        </div>

        {/* Branch 5: Menyusun Persamaan Kuadrat Baru */}
        <div className="flex flex-col">
          <button
            onClick={() => scrollTo('sub-5-4')}
            className="text-left p-3.5 bg-white dark:bg-slate-800 border-2 border-indigo-200 dark:border-indigo-900/60 rounded-xl hover:border-indigo-500 dark:hover:border-indigo-400 transition-all shadow-sm hover:shadow hover:-translate-y-0.5 h-full group"
          >
            <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
              Sub-bab 5.4
            </div>
            <div className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Menyusun Persamaan Kuadrat Baru
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
              (Faktor & Jumlah-Hasil Kali Akar)
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
