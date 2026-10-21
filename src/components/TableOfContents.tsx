import React, { useState, useEffect } from 'react';
import { List, X, ChevronUp, Sun, Moon } from 'lucide-react';

interface ToCItem {
  id: string;
  label: string;
  badge?: string;
}

const items: ToCItem[] = [
  { id: 'pengantar', label: 'Pengantar & Hero' },
  { id: 'peta-konsep', label: 'Peta Konsep' },
  { id: 'sub-5-1', label: '5.1 Mencari Akar Persamaan' },
  { id: 'latihan-5-1', label: 'Latihan 5.1' },
  { id: 'sub-5-2', label: '5.2 Jenis-jenis Akar' },
  { id: 'latihan-5-2', label: 'Latihan 5.2' },
  { id: 'sub-5-3', label: '5.3 Jumlah & Hasil Kali Akar' },
  { id: 'latihan-5-3', label: 'Latihan 5.3' },
  { id: 'sub-5-4', label: '5.4 Menyusun Persamaan Baru' },
  { id: 'latihan-5-4', label: 'Latihan 5.4' },
  { id: 'sub-5-5', label: '5.5 Penyelesaian Masalah' },
  { id: 'latihan-5-5', label: 'Latihan 5.5' },
  { id: 'rangkuman-5', label: 'Rangkuman 5' },
  { id: 'evaluasi-5', label: 'Evaluasi 5 (Uji Mandiri)', badge: '17 Soal' },
];

interface TableOfContentsProps {
  showSidebar?: boolean;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ showSidebar = true }) => {
  const [activeId, setActiveId] = useState<string>('pengantar');
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial dark mode preference
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDark(true);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 180;
      for (let i = items.length - 1; i >= 0; i--) {
        const el = document.getElementById(items[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveId(items[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsOpenMobile(false);
    }
  };

  return (
    <>
      {/* Floating Action Button (Theme Toggle & Mobile Menu) */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <button
          onClick={toggleTheme}
          aria-label="Toggle Mode Gelap/Terang"
          className="p-2.5 rounded-full bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 shadow-md border border-slate-200 dark:border-slate-700 hover:scale-105 active:scale-95 transition-all backdrop-blur-md"
        >
          {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
        </button>

        {/* Mobile menu trigger */}
        {showSidebar && (
          <button
            onClick={() => setIsOpenMobile(!isOpenMobile)}
            aria-label="Buka Daftar Isi"
            className="xl:hidden p-2.5 rounded-full bg-indigo-600 text-white shadow-md hover:bg-indigo-700 active:scale-95 transition-all"
          >
            {isOpenMobile ? <X className="w-5 h-5" /> : <List className="w-5 h-5" />}
          </button>
        )}
      </div>

      {/* Desktop Floating Sidebar (visible xl+) */}
      {showSidebar && (
        <aside className="hidden xl:block fixed top-24 left-8 w-64 max-h-[calc(100vh-8rem)] overflow-y-auto p-4 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl shadow-lg z-30 transition-all">
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <List className="w-3.5 h-3.5 text-indigo-600" />
              Daftar Isi Materi
            </span>
            <span className="text-[10px] font-semibold px-2 py-0.5 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-full">
              Bab 5
            </span>
          </div>
          <nav className="space-y-1">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center justify-between ${
                  activeId === item.id
                    ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                <span className="truncate">{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded font-bold ml-1 shrink-0 ${
                      activeId === item.id
                        ? 'bg-indigo-500 text-white'
                        : 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </aside>
      )}

      {/* Mobile Drawer */}
      {showSidebar && isOpenMobile && (
        <div className="xl:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm flex justify-end">
          <div className="w-72 bg-white dark:bg-slate-900 h-full p-5 overflow-y-auto shadow-2xl flex flex-col animate-slideLeft">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
              <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Navigasi Materi Bab 5
              </span>
              <button
                onClick={() => setIsOpenMobile(false)}
                className="p-1 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="space-y-1 flex-1">
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`w-full text-left px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-between ${
                    activeId === item.id
                      ? 'bg-indigo-600 text-white font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="truncate">{item.label}</span>
                  {item.badge && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Quick Scroll To Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Kembali ke Paling Atas"
        className="fixed bottom-6 right-6 z-30 p-3 rounded-full bg-slate-900/90 dark:bg-white/90 text-white dark:text-slate-900 shadow-xl hover:scale-110 active:scale-95 transition-all backdrop-blur-md opacity-80 hover:opacity-100"
      >
        <ChevronUp className="w-5 h-5" />
      </button>
    </>
  );
};
