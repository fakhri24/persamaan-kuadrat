import React, { useState, useEffect } from 'react';
import { MathView } from './components/MathView';
import { CalloutBox } from './components/CalloutBox';
import { PetaKonsep } from './components/PetaKonsep';
import { Contoh55Svg } from './components/Contoh55Svg';
import { ExerciseItem } from './components/ExerciseItem';
import { TableOfContents } from './components/TableOfContents';
import { EvaluationSection } from './components/EvaluationSection';
import { RoadmapSection } from './components/RoadmapSection';
import { PaketLatihanSection } from './components/PaketLatihanSection';
import { UhSection } from './components/UhSection';
import {
  latihan51Data,
  latihan52Data,
  latihan53Data,
  latihan54Data,
  latihan55Data,
} from './data/exercisesData';
import { BookOpen, Compass, FileText, Trophy, Sparkles, Sun, Moon, List } from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'materi' | 'roadmap' | 'latihan' | 'uh'>('materi');
  const [isOpenMobileToC, setIsOpenMobileToC] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const tabOrder: Array<'materi' | 'roadmap' | 'latihan' | 'uh'> = [
    'materi',
    'roadmap',
    'latihan',
    'uh',
  ];

  const switchTab = (tab: 'materi' | 'roadmap' | 'latihan' | 'uh') => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const currentIndex = tabOrder.indexOf(activeTab);
    let nextIndex: number | null = null;

    if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % tabOrder.length;
    else if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + tabOrder.length) % tabOrder.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = tabOrder.length - 1;

    if (nextIndex === null) return;

    event.preventDefault();
    const nextTab = tabOrder[nextIndex];
    switchTab(nextTab);
    document.getElementById(`tab-${nextTab}`)?.focus();
  };

  useEffect(() => {
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

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-200 font-sans">
      {/* Floating Table of Contents Sidebar & Drawer */}
      <TableOfContents
        showSidebar={activeTab === 'materi'}
        isOpenMobile={isOpenMobileToC}
        onCloseMobile={() => setIsOpenMobileToC(false)}
        showScrollTopButton={activeTab === 'materi' || activeTab === 'roadmap'}
      />

      {/* Main Container */}
      <main
        className={`w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all overflow-x-hidden ${
          activeTab === 'materi' ? 'xl:ml-80' : ''
        }`}
      >
        {/* Navigation Tabs Bar */}
        <header className="mb-8 p-1.5 sm:p-2 bg-white/90 dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md backdrop-blur-md sticky top-4 z-20 transition-all">
          <div className="flex items-center justify-between gap-2">
            <nav
              role="tablist"
              aria-label="Navigasi bab"
              className="flex-1 flex flex-nowrap items-center gap-1.5 w-full min-w-0 overflow-x-auto scrollbar-none"
            >
              <button
                id="tab-materi"
                role="tab"
                aria-selected={activeTab === 'materi'}
                tabIndex={activeTab === 'materi' ? 0 : -1}
                onClick={() => switchTab('materi')}
                onKeyDown={handleTabKeyDown}
                className={`flex-1 shrink-0 min-w-[120px] min-h-[44px] flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                  activeTab === 'materi'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Materi Supermath</span>
              </button>

              <button
                id="tab-roadmap"
                role="tab"
                aria-selected={activeTab === 'roadmap'}
                tabIndex={activeTab === 'roadmap' ? 0 : -1}
                onClick={() => switchTab('roadmap')}
                onKeyDown={handleTabKeyDown}
                className={`flex-1 shrink-0 min-w-[120px] min-h-[44px] flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                  activeTab === 'roadmap'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Compass className="w-4 h-4" />
                <span>Alur 8 Pertemuan</span>
              </button>

              <button
                id="tab-latihan"
                role="tab"
                aria-selected={activeTab === 'latihan'}
                tabIndex={activeTab === 'latihan' ? 0 : -1}
                onClick={() => switchTab('latihan')}
                onKeyDown={handleTabKeyDown}
                className={`flex-1 shrink-0 min-w-[120px] min-h-[44px] flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                  activeTab === 'latihan'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Paket A & B</span>
              </button>

              <button
                id="tab-uh"
                role="tab"
                aria-selected={activeTab === 'uh'}
                tabIndex={activeTab === 'uh' ? 0 : -1}
                onClick={() => switchTab('uh')}
                onKeyDown={handleTabKeyDown}
                className={`flex-1 shrink-0 min-w-[120px] min-h-[44px] flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                  activeTab === 'uh'
                    ? 'bg-indigo-600 text-white shadow-md ring-2 ring-amber-400'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>Ulangan Harian</span>
              </button>
            </nav>

            {/* Quick Utility Tools: Theme Toggle & ToC Drawer Button on mobile */}
            <div className="flex items-center gap-1.5 ml-auto shrink-0">
              {activeTab === 'materi' && (
                <button
                  onClick={() => setIsOpenMobileToC(true)}
                  aria-label="Buka Daftar Isi Materi"
                  className="xl:hidden min-h-[44px] min-w-[44px] p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/80 hover:bg-indigo-100 dark:hover:bg-indigo-900 flex items-center justify-center transition-all shadow-sm active:scale-95"
                  title="Daftar Isi"
                >
                  <List className="w-5 h-5" />
                </button>
              )}
              <button
                onClick={toggleTheme}
                aria-label="Ganti Mode Gelap atau Terang"
                className="min-h-[44px] min-w-[44px] p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-all shadow-sm active:scale-95"
                title="Ganti Tema"
              >
                {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
              </button>
            </div>
          </div>
        </header>

        {/* Tab 1: Materi Supermath Asli */}
        {activeTab === 'materi' && (
          <div
            className="animate-fadeIn"
            role="tabpanel"
            id="panel-materi"
            aria-labelledby="tab-materi"
          >
            {/* ==========================================================================
                HERO SECTION & PENGANTAR (Halaman 1)
                ========================================================================== */}
        <section id="pengantar" className="mb-12 scroll-mt-20">
          {/* Hero Banner with Real HD Courtyard Garden Image */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-8 group border border-slate-200 dark:border-slate-800">
            <img
              src="./images/courtyard-garden.jpg"
              alt="Halaman dan Taman Rumah Real HD"
              className="w-full h-72 sm:h-96 object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent flex flex-col justify-end p-6 sm:p-10 text-white">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/80 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider mb-3 w-fit">
                <BookOpen className="w-3.5 h-3.5" />
                Matematika Umum Kelas X
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight drop-shadow-md">
                BAB 5 PERSAMAAN KUADRAT
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl line-clamp-2">
                Aplikasi nyata persamaan kuadrat dalam kehidupan sehari-hari: menghitung luas taman rumah, gerak lintasan parabola, hingga optimasi teknologi.
              </p>
            </div>
          </div>

          {/* Verbatim Intro Paragraphs */}
          <div className="space-y-4 text-base sm:text-lg leading-relaxed text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
            <p>
              Apakah kamu memiliki kebun atau taman di halaman rumah? Jika kamu mengetahui luas daerah kebun milikmu, serta diketahui pula hubungan antara panjang dan lebarnya, bisakah kamu mencari ukuran panjang dan lebarnya?
            </p>
            <p>
              Sebuah bola jika dilemparkan ke atas dengan kecepatan tertentu, maka bola tersebut akan membentuk lintasan melengkung yang biasa disebut dengan parabola. Lintasan tersebut terbentuk dari mulai bola dilemparkan ke atas hingga kembali lagi ke tanah. Dari lintasan bola tersebut, apakah kamu dapat menghitung tinggi maksimum yang dicapai bola? Apakah kamu juga dapat menghitung waktu yang dibutuhkan bola untuk sampai ke tanah?
            </p>
            <p>
              Ternyata kita bisa mengetahuinya dengan memanfaatkan konsep dari persamaan kuadrat dan fungsi kuadrat. Selain dua permasalahan tersebut, konsep fungsi kuadrat juga dapat digunakan untuk menentukan biaya produksi minimum, keuntungan maksimum, pengendalian mesin/robot, dan lain-lain.
            </p>
          </div>
        </section>

        {/* Peta Konsep Interaktif */}
        <section id="peta-konsep" className="mb-14 scroll-mt-20">
          <PetaKonsep />
        </section>

        {/* ==========================================================================
            SUB-BAB 5.1: MENCARI AKAR-AKAR PERSAMAAN KUADRAT (Halaman 2 - 9)
            ========================================================================== */}
        <section id="sub-5-1" className="mb-16 scroll-mt-20">
          <div className="border-b border-indigo-200 dark:border-indigo-900/60 pb-3 mb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-3">
              <span className="px-3 py-1 bg-indigo-600 text-white rounded-xl text-lg sm:text-xl">5.1</span>
              <span>Mencari Akar-akar Persamaan Kuadrat</span>
            </h2>
          </div>

          {/* 5.1.1. Pengertian Persamaan Kuadrat */}
          <div id="sub-5-1-1" className="mb-8 scroll-mt-24">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              5.1.1. Pengertian Persamaan Kuadrat
            </h3>
            <p className="leading-relaxed text-slate-700 dark:text-slate-300">
              Persamaan kuadrat adalah suatu persamaan yang memuat variabel yang memiliki pangkat tertinggi (derajat) variabelnya adalah dua.
            </p>
            <p className="mt-2 font-medium text-slate-800 dark:text-slate-200">
              Bentuk umum persamaan kuadrat:
            </p>

            {/* Kotak Bentuk Umum */}
            <CalloutBox variant="formula">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-xl sm:text-2xl font-bold text-center sm:text-left text-indigo-700 dark:text-indigo-400">
                  <MathView math="ax^2 + bx + c = 0" />
                </div>
                <div className="text-sm font-semibold text-slate-700 dark:text-slate-300 border-t sm:border-t-0 sm:border-l sm:pl-4 border-slate-300 dark:border-slate-700 pt-2 sm:pt-0">
                  dengan <MathView math="a \neq 0" /> dan <MathView math="a, b, c \in \mathbb{R}" />
                </div>
              </div>
            </CalloutBox>

            <div className="mt-3 bg-slate-100/70 dark:bg-slate-900/60 p-4 rounded-xl text-sm space-y-1 border border-slate-200 dark:border-slate-800">
              <div className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Keterangan:</div>
              <div><MathView math="x" /> = variabel dari persamaan kuadrat</div>
              <div><MathView math="a" /> = koefisien <MathView math="x^2" /></div>
              <div><MathView math="b" /> = koefisien <MathView math="x" /></div>
              <div><MathView math="c" /> = konstanta</div>
            </div>
          </div>

          {/* 5.1.2. Menyelesaikan Persamaan Kuadrat */}
          <div id="sub-5-1-2" className="mb-8 scroll-mt-24">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              5.1.2. Menyelesaikan Persamaan Kuadrat
            </h3>
            <p className="leading-relaxed text-slate-700 dark:text-slate-300">
              Persamaan kuadrat <MathView math="ax^2 + bx + c = 0" /> memiliki variabel <MathView math="x" />. Menyelesaikan persamaan kuadrat berarti kita mencari nilai dari variabel <MathView math="x" /> yang memenuhi persamaan <MathView math="ax^2 + bx + c = 0" />. Hasil dari penyelesaian persamaan kuadrat berupa nilai variabel <MathView math="x" /> yang disebut dengan akar-akar dari persamaan kuadrat, umumnya dinotasikan dengan <MathView math="x_1" /> dan <MathView math="x_2" />.
            </p>
            <p className="mt-3 leading-relaxed text-slate-700 dark:text-slate-300">
              Untuk menentukan akar-akar dari persamaan kuadrat, ada beberapa cara yang dapat dilakukan, yaitu pemfaktoran, melengkapkan kuadrat sempurna, dan rumus kuadrat (rumus ABC).
            </p>

            {/* Metode 1: Pemfaktoran */}
            <div id="sub-5-1-pemfaktoran" className="mt-6 scroll-mt-24">
              <h4 className="font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100 mb-2">
                1. Pemfaktoran
              </h4>
              <CalloutBox variant="formula">
                <div className="text-center sm:text-left space-y-2">
                  <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    <MathView math="ax^2 + bx + c = 0" /> diuraikan menjadi
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-indigo-700 dark:text-indigo-400">
                    <MathView math="\frac{1}{a}(ax + p)(ax + q) = 0" />
                  </div>
                  <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 pt-2 border-t border-slate-200 dark:border-slate-800">
                    dengan syarat: <MathView math="p \cdot q = a \cdot c" /> dan <MathView math="p + q = b" />
                  </div>
                </div>
              </CalloutBox>
            </div>

            {/* Metode 2: Melengkapkan Kuadrat Sempurna */}
            <div id="sub-5-1-kuadrat-sempurna" className="mt-8 scroll-mt-24">
              <h4 className="font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100 mb-2">
                2. Melengkapkan Kuadrat Sempurna
              </h4>
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300">
                Perhatikan bentuk persamaan kuadrat sempurna berikut:
              </p>
              <div className="my-2 p-3 bg-slate-100 dark:bg-slate-900 rounded-lg text-center font-bold">
                <MathView math="(x - 2)^2 = 9" />
              </div>
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300">
                Untuk persamaan kuadrat yang berbentuk kuadrat sempurna, penyelesaiannya adalah sebagai berikut:
              </p>

              <div className="my-3 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2 text-center text-sm sm:text-base">
                <MathView block math="(x - 2)^2 = 9" />
                <MathView block math="x - 2 = \pm\sqrt{9}" />
                <MathView block math="x = 2 \pm 3" />
                <div className="flex justify-center items-center gap-6 font-semibold text-indigo-600 dark:text-indigo-400">
                  <div><MathView math="x = 2 + 3 \implies x_1 = 5" /></div>
                  <span className="text-slate-400">atau</span>
                  <div><MathView math="x = 2 - 3 \implies x_2 = -1" /></div>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 mt-3">
                Persamaan kuadrat akan lebih mudah diselesaikan jika bentuk <MathView math="ax^2 + bx + c = 0" /> diubah ke dalam bentuk kuadrat sempurna, yaitu <MathView math="(x + p)^2 = q" />.
              </p>

              {/* Tabel Langkah Melengkapkan Kuadrat Sempurna */}
              <div className="mt-4 overflow-hidden border border-slate-300 dark:border-slate-700 rounded-xl shadow-sm">
                <div className="bg-indigo-600 text-white font-bold p-3 text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Langkah Penyelesaian dengan Melengkapkan Kuadrat Sempurna</span>
                </div>
                <div className="p-4 bg-white dark:bg-slate-900 space-y-3 text-sm leading-relaxed">
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</span>
                    <p>Mengubah bentuk <MathView math="ax^2 + bx + c = 0" /> menjadi <MathView math="ax^2 + bx = -c" /></p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</span>
                    <div>
                      <p>Apabila <MathView math="a \neq 1" /> bagilah kedua ruas persamaan dengan <MathView math="a" />, sehingga diperoleh:</p>
                      <MathView block math="x^2 + \frac{b}{a}x = -\frac{c}{a}" />
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</span>
                    <div>
                      <p>Lengkapkan bentuk kuadrat dengan menambahkan kedua ruas dengan <MathView math="\left(\frac{b}{2a}\right)^2" /> sehingga menjadi:</p>
                      <MathView block math="x^2 + \frac{b}{a}x + \left(\frac{b}{2a}\right)^2 = -\frac{c}{a} + \left(\frac{b}{2a}\right)^2" />
                      <MathView block math="\left(x + \frac{b}{2a}\right)^2 = -\frac{c}{a} + \left(\frac{b}{2a}\right)^2" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Metode 3: Rumus Alkhawarizmi / ABC */}
            <div id="sub-5-1-rumus-abc" className="mt-8 scroll-mt-24">
              <h4 className="font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100 mb-2">
                3. Rumus Alkhawarizmi (Rumus Kecap / ABC)
              </h4>
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                Tidak semua bentuk persamaan kuadrat dapat diselesaikan dengan mudah menggunakan cara pemfaktoran. Sehingga untuk persamaan kuadrat yang sulit diselesaikan dengan pemfaktoran maka dapat diselesaikan dengan rumus Alkhawarizmi atau yang biasa disebut dengan rumus kecap (ABC), sebagai berikut:
              </p>
              <CalloutBox variant="formula">
                <div className="text-center py-2">
                  <div className="text-xl sm:text-2xl font-bold text-indigo-700 dark:text-indigo-400">
                    <MathView math="x_{1,2} = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}" />
                  </div>
                </div>
              </CalloutBox>
            </div>
          </div>

          {/* Contoh 5.1.2 (Verbatim Pembahasan Lengkap) */}
          <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl">
            <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-indigo-600 text-white rounded text-xs">Contoh</span>
              <span>Contoh 5.1.2</span>
            </h4>
            <p className="text-sm sm:text-base font-semibold mb-4">
              1. Tentukan akar-akar dari persamaan kuadrat berikut!
            </p>

            <div className="space-y-6 text-sm sm:text-base">
              {/* Soal a */}
              <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="font-bold text-indigo-600 mb-2">a) <MathView math="x^2 - 9 = 0" /></div>
                <div className="space-y-2 text-slate-700 dark:text-slate-300">
                  <p><strong>Cara 1:</strong> Bentuk <MathView math="a^2 - b^2 = (a - b)(a + b)" /></p>
                  <MathView block math="x^2 - 3^2 = 0 \implies (x - 3)(x + 3) = 0" />
                  <p><MathView math="x - 3 = 0" /> atau <MathView math="x + 3 = 0 \implies x_1 = 3" /> atau <MathView math="x_2 = -3" />.</p>
                  <p><strong>Cara 2:</strong></p>
                  <MathView block math="x^2 = 9 \implies x = \pm\sqrt{9} = \pm 3 \implies x_1 = -3 \\text{ atau } x_2 = 3" />
                </div>
              </div>

              {/* Soal b */}
              <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="font-bold text-indigo-600 mb-2">b) <MathView math="x^2 + 6x = 0" /></div>
                <div className="space-y-2 text-slate-700 dark:text-slate-300">
                  <MathView block math="x(x + 6) = 0" />
                  <p>
                    Perkalian antara <MathView math="x" /> dan <MathView math="(x + 6)" /> hasilnya 0, maka salah satunya atau kedua-duanya haruslah bernilai 0, sehingga:
                  </p>
                  <MathView block math="x_1 = 0 \\quad \\text{atau} \\quad x + 6 = 0 \implies x_2 = -6" />
                </div>
              </div>

              {/* Soal c */}
              <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="font-bold text-indigo-600 mb-2">c) <MathView math="x^2 - 5x + 6 = 0" /></div>
                <div className="space-y-2 text-slate-700 dark:text-slate-300">
                  <p>
                    Ingat bentuk umum dari persamaan kuadrat adalah <MathView math="ax^2 + bx + c = 0" />. Ketika difaktorkan akan menjadi:
                  </p>
                  <MathView block math="\frac{1}{a}(ax + p)(ax + q) = 0 \\quad \\text{dengan } p + q = b \\text{ dan } p \cdot q = a \cdot c" />
                  <p>
                    Karena <MathView math="a = 1" />, maka rumusnya menjadi <MathView math="(x + p)(x + q) = 0" /> dengan <MathView math="p + q = -5" /> dan <MathView math="p \cdot q = 6" />.
                  </p>
                  <p>Dipilih <MathView math="p = -2" /> dan <MathView math="q = -3" />, sehingga diperoleh:</p>
                  <MathView block math="(x - 2)(x - 3) = 0 \implies x_1 = 2 \\text{ atau } x_2 = 3" />
                </div>
              </div>

              {/* Soal d */}
              <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="font-bold text-indigo-600 mb-2">d) <MathView math="x^2 - x - 12 = 0" /></div>
                <div className="space-y-2 text-slate-700 dark:text-slate-300">
                  <p>Nilai yang memenuhi <MathView math="p + q = -1" /> dan <MathView math="p \cdot q = -12" /> adalah <MathView math="p = -4" /> dan <MathView math="q = 3" />:</p>
                  <MathView block math="(x - 4)(x + 3) = 0 \implies x_1 = 4 \\text{ atau } x_2 = -3" />
                </div>
              </div>

              {/* Soal e */}
              <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="font-bold text-indigo-600 mb-2">e) <MathView math="2x^2 + 3x - 20 = 0" /></div>
                <div className="space-y-2 text-slate-700 dark:text-slate-300">
                  <p><MathView math="p + q = 3" /> dan <MathView math="p \cdot q = 2(-20) = -40" />. Nilainya adalah <MathView math="p = 8" /> dan <MathView math="q = -5" />:</p>
                  <MathView block math="\frac{1}{2}(2x + 8)(2x - 5) = 0 \implies (x + 4)(2x - 5) = 0" />
                  <MathView block math="x_1 = -4 \\quad \\text{atau} \\quad x_2 = \frac{5}{2}" />
                </div>
              </div>

              {/* Soal f */}
              <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="font-bold text-indigo-600 mb-2">f) <MathView math="6x^2 - 13x + 6 = 0" /></div>
                <div className="space-y-2 text-slate-700 dark:text-slate-300">
                  <p><MathView math="p + q = -13" /> dan <MathView math="p \cdot q = 6 \cdot 6 = 36" />. Nilainya adalah <MathView math="p = -4" /> dan <MathView math="q = -9" />:</p>
                  <MathView block math="\frac{1}{6}(6x - 4)(6x - 9) = 0 \implies \frac{1}{2}(6x - 4) \cdot \frac{1}{3}(6x - 9) = 0" />
                  <MathView block math="(3x - 2)(2x - 3) = 0 \implies x_1 = \frac{2}{3} \\text{ atau } x_2 = \frac{3}{2}" />
                </div>
              </div>

              {/* Soal g */}
              <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="font-bold text-indigo-600 mb-2">g) <MathView math="x^2 - 6x - 1 = 0" /></div>
                <p className="text-xs text-slate-500 mb-2 italic">
                  Persamaan kuadrat ini tidak bisa diselesaikan dengan pemfaktoran, sehingga harus menggunakan metode melengkapkan kuadrat sempurna atau rumus Alkhawarizmi.
                </p>
                <div className="space-y-2 text-slate-700 dark:text-slate-300">
                  <p><strong>Cara 1: Melengkapkan Kuadrat Sempurna</strong></p>
                  <MathView block math="x^2 - 6x = 1 \implies (x - 3)^2 - 3^2 = 1 \implies (x - 3)^2 = 9 + 1 = 10" />
                  <MathView block math="x - 3 = \pm\sqrt{10} \implies x = 3 \pm \sqrt{10}" />
                  <p><strong>Cara 2: Rumus Alkhawarizmi</strong></p>
                  <div className="space-y-1.5 my-2">
                    <MathView block math="x_{1,2} = \frac{-(-6) \pm \sqrt{(-6)^2 - 4(1)(-1)}}{2(1)} = \frac{6 \pm \sqrt{40}}{2}" />
                    <MathView block math="= \frac{6 \pm 2\sqrt{10}}{2} = 3 \pm \sqrt{10}" />
                  </div>
                </div>
              </div>

              {/* Soal h */}
              <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="font-bold text-indigo-600 mb-2">h) <MathView math="2x^2 + 8x + 3 = 0" /></div>
                <div className="space-y-2 text-slate-700 dark:text-slate-300">
                  <p><strong>Cara 1: Melengkapkan Kuadrat Sempurna</strong></p>
                  <p>Bagi kedua ruas dengan 2:</p>
                  <MathView block math="x^2 + 4x + \frac{3}{2} = 0 \implies x^2 + 4x = -\frac{3}{2}" />
                  <MathView block math="(x + 2)^2 - 4 = -\frac{3}{2} \implies (x + 2)^2 = \frac{5}{2}" />
                  <MathView block math="x + 2 = \pm\sqrt{\frac{5}{2}} = \pm\frac{\sqrt{10}}{2} \implies x = -2 \pm \frac{1}{2}\sqrt{10}" />
                  <p><strong>Cara 2: Rumus Alkhawarizmi</strong></p>
                  <div className="space-y-1.5 my-2">
                    <MathView block math="x_{1,2} = \frac{-8 \pm \sqrt{8^2 - 4(2)(3)}}{2(2)} = \frac{-8 \pm \sqrt{40}}{4}" />
                    <MathView block math="= \frac{-8 \pm 2\sqrt{10}}{4} = -2 \pm \frac{1}{2}\sqrt{10}" />
                  </div>
                </div>
              </div>

              {/* Soal 2 Pembahasan */}
              <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="font-bold text-slate-900 dark:text-slate-100 mb-2">
                  2. Diketahui persamaan kuadrat <MathView math="x^2 + 4x - 32 = 0" />. Jika <MathView math="x_1 > 0" /> dan <MathView math="x_2 < 0" />, maka nilai dari <MathView math="2x_1 + x_2 = \dots" />
                </div>
                <div className="space-y-2 text-slate-700 dark:text-slate-300">
                  <p><strong>Pembahasan:</strong></p>
                  <MathView block math="x^2 + 4x - 32 = 0 \implies (x - 4)(x + 8) = 0 \implies x = 4 \\text{ atau } x = -8" />
                  <p>Karena <MathView math="x_1 > 0" /> dan <MathView math="x_2 < 0" />, maka dipilih <MathView math="x_1 = 4" /> dan <MathView math="x_2 = -8" />.</p>
                  <MathView block math="2x_1 + x_2 = 2(4) + (-8) = 8 - 8 = 0" />
                  <p className="font-bold text-indigo-600">Jadi, nilai <MathView math="2x_1 + x_2 = 0" />.</p>
                </div>
              </div>

              {/* Soal 3 Pembahasan */}
              <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="font-bold text-slate-900 dark:text-slate-100 mb-2">
                  3. Jika <MathView math="(x - 1)(x + 3) = \frac{x - 1}{2}" />, maka nilai <MathView math="x" /> adalah...
                </div>
                <div className="space-y-2 text-slate-700 dark:text-slate-300">
                  <p><strong>Pembahasan:</strong></p>
                  <MathView block math="(x - 1)(x + 3) = \frac{x - 1}{2} \implies x^2 + 2x - 3 = \frac{x - 1}{2}" />
                  <MathView block math="2(x^2 + 2x - 3) = x - 1 \implies 2x^2 + 4x - 6 = x - 1 \implies 2x^2 + 3x - 5 = 0" />
                  <p>Lakukan pemfaktoran:</p>
                  <MathView block math="\frac{1}{2}(2x - 2)(2x + 5) = 0 \implies (x - 1)(2x + 5) = 0 \implies x = 1 \\text{ atau } x = -\frac{5}{2}" />
                </div>
              </div>
            </div>
          </div>

          {/* Latihan 5.1 Interactive Items */}
          <div id="latihan-5-1" className="mt-10 scroll-mt-24">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-200 dark:border-slate-800">
              <span className="w-3 h-3 bg-indigo-600 rounded-sm"></span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Latihan 5.1
              </h3>
            </div>
            {latihan51Data.map((item) => (
              <ExerciseItem key={item.id} {...item} />
            ))}
          </div>
        </section>

        {/* ==========================================================================
            SUB-BAB 5.2: JENIS-JENIS AKAR PERSAMAAN KUADRAT (Halaman 10 - 11)
            ========================================================================== */}
        <section id="sub-5-2" className="mb-16 scroll-mt-20">
          <div className="border-b border-indigo-200 dark:border-indigo-900/60 pb-3 mb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-3">
              <span className="px-3 py-1 bg-indigo-600 text-white rounded-xl text-lg sm:text-xl">5.2</span>
              <span>Jenis-jenis Akar-akar Persamaan Kuadrat</span>
            </h2>
          </div>

          <p className="leading-relaxed text-slate-700 dark:text-slate-300">
            Ingat kembali rumus Alkhawarizmi untuk menentukan akar persamaan kuadrat sebagai berikut:
          </p>
          <MathView block math="x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}" />
          <p className="mt-2 leading-relaxed text-slate-700 dark:text-slate-300">
            Nilai di dalam akar, yaitu <MathView math="b^2 - 4ac" /> disebut dengan <strong>diskriminan</strong>, atau ditulis sebagai:
          </p>

          <CalloutBox variant="formula">
            <div className="text-center font-bold text-xl text-indigo-700 dark:text-indigo-400">
              <MathView math="D = b^2 - 4ac" />
            </div>
          </CalloutBox>

          <p className="leading-relaxed text-slate-700 dark:text-slate-300">
            sehingga rumus di atas sebetulnya dapat dituliskan juga sebagai berikut:
          </p>
          <MathView block math="x = \frac{-b \pm \sqrt{D}}{2a}" />

          <p className="mt-3 font-semibold text-slate-900 dark:text-slate-100">
            Dengan demikian jenis-jenis akar bisa ditentukan dari nilai diskriminan sebagai berikut:
          </p>

          <CalloutBox variant="definition">
            <div className="space-y-2 text-sm sm:text-base font-medium">
              <div className="flex items-center gap-3">
                <span className="font-bold text-indigo-600 dark:text-indigo-400">1.</span>
                <div>
                  <MathView math="D > 0" /> <span className="mx-1">→</span> Kedua akarnya real dan berlainan (<MathView math="x_1 \neq x_2" />)
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-indigo-600 dark:text-indigo-400">2.</span>
                <div>
                  <MathView math="D = 0" /> <span className="mx-1">→</span> Kedua akarnya real dan kembar/sama (<MathView math="x_1 = x_2" />)
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-indigo-600 dark:text-indigo-400">3.</span>
                <div>
                  <MathView math="D < 0" /> <span className="mx-1">→</span> Kedua akarnya tidak real (imajiner)
                </div>
              </div>
            </div>
          </CalloutBox>

          {/* Contoh 5.2 */}
          <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-6">
            <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-indigo-600 text-white rounded text-xs">Contoh</span>
              <span>Contoh 5.2:</span>
            </h4>

            {/* Nomor 1 */}
            <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-sm sm:text-base">
              <p className="font-bold mb-2">
                1. Jika persamaan <MathView math="(m + 2)x^2 + 2(m - 2)x + m = 0" /> mempunyai dua akar kembar, tentukan nilai <MathView math="m" /> yang memenuhi...
              </p>
              <div className="space-y-2 text-slate-700 dark:text-slate-300">
                <p><strong>Pembahasan:</strong></p>
                <MathView block math="(m + 2)x^2 + 2(m - 2)x + m = 0 \implies a = m + 2; \quad b = 2(m - 2); \quad c = m" />
                <p>Syarat dua akar kembar: <MathView math="D = 0 \implies b^2 - 4ac = 0" /></p>
                <MathView block math="(2(m - 2))^2 - 4(m + 2)(m) = 0" />
                <div className="space-y-1 my-2">
                  <MathView block math="4m^2 - 16m + 16 - 4m^2 - 8m = 0" />
                  <MathView block math="\implies -24m + 16 = 0 \implies 24m = 16" />
                </div>
                <p className="font-bold text-indigo-600">Jadi, <MathView math="m = \frac{16}{24} = \frac{2}{3}" /></p>
              </div>
            </div>

            {/* Nomor 2 */}
            <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-sm sm:text-base">
              <p className="font-bold mb-2">
                2. Jika persamaan <MathView math="2x^2 - 4x + 2p - 1 = 0" /> tidak mempunyai akar riil, tentukan nilai <MathView math="p" />...
              </p>
              <div className="space-y-2 text-slate-700 dark:text-slate-300">
                <p><strong>Pembahasan:</strong></p>
                <p>Persamaan kuadrat tidak memiliki akar riil jika <MathView math="D < 0" />, sehingga:</p>
                <MathView block math="b^2 - 4ac < 0 \implies (-4)^2 - 4(2)(2p - 1) < 0" />
                <div className="space-y-1 my-2">
                  <MathView block math="16 - 16p + 8 < 0 \implies 24 - 16p < 0" />
                  <MathView block math="\implies -16p < -24 \implies p > \frac{24}{16} \implies p > \frac{3}{2}" />
                </div>
              </div>
            </div>
          </div>

          {/* Latihan 5.2 */}
          <div id="latihan-5-2" className="mt-10 scroll-mt-24">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-200 dark:border-slate-800">
              <span className="w-3 h-3 bg-indigo-600 rounded-sm"></span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Latihan 5.2
              </h3>
            </div>
            {latihan52Data.map((item) => (
              <ExerciseItem key={item.id} {...item} />
            ))}
          </div>
        </section>

        {/* ==========================================================================
            SUB-BAB 5.3: JUMLAH DAN HASIL KALI AKAR-AKAR (Halaman 12 - 14)
            ========================================================================== */}
        <section id="sub-5-3" className="mb-16 scroll-mt-20">
          <div className="border-b border-indigo-200 dark:border-indigo-900/60 pb-3 mb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-3">
              <span className="px-3 py-1 bg-indigo-600 text-white rounded-xl text-lg sm:text-xl">5.3</span>
              <span>Jumlah dan Hasil Kali Akar-akar Persamaan Kuadrat</span>
            </h2>
          </div>

          <p className="leading-relaxed text-slate-700 dark:text-slate-300">
            Misalkan <MathView math="x_1" /> dan <MathView math="x_2" /> adalah akar-akar persamaan kuadrat <MathView math="ax^2 + bx + c = 0" />, maka berlaku:
          </p>

          <CalloutBox variant="formula">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center text-lg sm:text-xl font-bold text-indigo-700 dark:text-indigo-400">
              <div className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/60">
                <MathView math="x_1 + x_2 = -\frac{b}{a}" />
              </div>
              <div className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/60">
                <MathView math="x_1 \times x_2 = \frac{c}{a}" />
              </div>
            </div>
          </CalloutBox>

          {/* Contoh 5.3 */}
          <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-6">
            <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-indigo-600 text-white rounded text-xs">Contoh</span>
              <span>Contoh 5.3:</span>
            </h4>

            {/* Nomor 1 */}
            <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-sm sm:text-base">
              <p className="font-bold mb-2">
                1. Akar-akar persamaan <MathView math="5x^2 - 3x + 25 = 0" /> adalah <MathView math="\alpha" /> dan <MathView math="\beta" />. Nilai <MathView math="\alpha^2\beta + \alpha\beta^2 = \dots" />
              </p>
              <div className="space-y-2 text-slate-700 dark:text-slate-300">
                <p><strong>Pembahasan:</strong></p>
                <p><MathView math="\alpha" /> dan <MathView math="\beta" /> adalah akar-akar persamaan kuadrat <MathView math="5x^2 - 3x + 25 = 0" />, maka berlaku:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-2">
                  <MathView block math="\alpha + \beta = -\frac{b}{a} = -\frac{-3}{5} = \frac{3}{5}" />
                  <MathView block math="\alpha\beta = \frac{c}{a} = \frac{25}{5} = 5" />
                </div>
                <p>Sehingga:</p>
                <MathView block math="\alpha^2\beta + \alpha\beta^2 = (\alpha + \beta)\alpha\beta = \frac{3}{5}(5) = 3" />
              </div>
            </div>

            {/* Nomor 2 */}
            <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-sm sm:text-base">
              <p className="font-bold mb-2">
                2. Jika <MathView math="x_1" /> dan <MathView math="x_2" /> adalah akar-akar persamaan kuadrat <MathView math="3x^2 + 4x - 1 = 0" />, maka hasil dari <MathView math="\frac{1}{x_1} + \frac{1}{x_2} = \dots" />
              </p>
              <div className="space-y-2 text-slate-700 dark:text-slate-300">
                <p><strong>Pembahasan:</strong></p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-2">
                  <MathView block math="x_1 + x_2 = -\frac{b}{a} = -\frac{4}{3}" />
                  <MathView block math="x_1 \cdot x_2 = \frac{c}{a} = \frac{-1}{3}" />
                </div>
                <MathView block math="\frac{1}{x_1} + \frac{1}{x_2} = \frac{x_1 + x_2}{x_1 \cdot x_2} = \frac{-\frac{4}{3}}{-\frac{1}{3}} = -\frac{4}{3} \cdot \frac{3}{-1} = 4" />
              </div>
            </div>
          </div>

          {/* Latihan 5.3 */}
          <div id="latihan-5-3" className="mt-10 scroll-mt-24">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-200 dark:border-slate-800">
              <span className="w-3 h-3 bg-indigo-600 rounded-sm"></span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Latihan 5.3
              </h3>
            </div>
            {latihan53Data.map((item) => (
              <ExerciseItem key={item.id} {...item} />
            ))}
          </div>
        </section>

        {/* ==========================================================================
            SUB-BAB 5.4: MENYUSUN PERSAMAAN KUADRAT BARU (Halaman 15 - 17)
            ========================================================================== */}
        <section id="sub-5-4" className="mb-16 scroll-mt-20">
          <div className="border-b border-indigo-200 dark:border-indigo-900/60 pb-3 mb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-3">
              <span className="px-3 py-1 bg-indigo-600 text-white rounded-xl text-lg sm:text-xl">5.4</span>
              <span>Menyusun Persamaan Kuadrat Baru</span>
            </h2>
          </div>

          <p className="leading-relaxed text-slate-700 dark:text-slate-300">
            Terdapat dua metode untuk Menyusun persamaan kuadrat, yaitu jika diketahui akar-akar persamaan kuadratnya dan jika diketahui jumlah dan hasil kali akar-akar persamaan kuadratnya.
          </p>

          <CalloutBox variant="formula">
            <div className="space-y-4 text-sm sm:text-base">
              <div>
                <div className="font-bold text-indigo-700 dark:text-indigo-400 mb-1">
                  1. Jika diketahui akar-akar persamaan kuadrat:
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-lg text-center font-bold text-lg">
                  <MathView math="(x - x_1)(x - x_2) = 0" />
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Dengan <MathView math="x_1" /> dan <MathView math="x_2" /> adalah akar-akar dari persamaan kuadrat.
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
                <div className="font-bold text-indigo-700 dark:text-indigo-400 mb-1">
                  2. Jika diketahui jumlah dan hasil kali akar-akar persamaan kuadrat:
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-lg text-center font-bold text-lg">
                  <MathView math="x^2 - (x_1 + x_2)x + (x_1 \cdot x_2) = 0" />
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Dengan <MathView math="x_1 + x_2 = -\frac{b}{a}" /> dan <MathView math="x_1 \cdot x_2 = \frac{c}{a}" />.
                </div>
              </div>
            </div>
          </CalloutBox>

          {/* Contoh 5.4 */}
          <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-6">
            <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-indigo-600 text-white rounded text-xs">Contoh</span>
              <span>Contoh 5.4:</span>
            </h4>

            {/* Nomor 1 */}
            <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-sm sm:text-base">
              <p className="font-bold mb-2">
                1. Susunlah persamaan kuadrat baru yang akar-akarnya tiga kali akar persamaan <MathView math="x^2 - 5x + 10 = 0" />
              </p>
              <div className="space-y-2 text-slate-700 dark:text-slate-300">
                <p><strong>Pembahasan:</strong></p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-2">
                  <MathView block math="x_1 + x_2 = -\frac{-5}{1} = 5" />
                  <MathView block math="x_1 \cdot x_2 = \frac{10}{1} = 10" />
                </div>
                <p>Akar baru: <MathView math="\alpha = 3x_1" /> dan <MathView math="\beta = 3x_2" />:</p>
                <MathView block math="x^2 - (3x_1 + 3x_2)x + (3x_1)(3x_2) = 0" />
                <MathView block math="x^2 - 3(x_1 + x_2)x + 9x_1 x_2 = 0 \implies x^2 - 3(5)x + 9(10) = 0" />
                <p className="font-bold text-indigo-600">→ <MathView math="x^2 - 15x + 90 = 0" /></p>
              </div>
            </div>

            {/* Nomor 2 */}
            <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-sm sm:text-base">
              <p className="font-bold mb-2">
                2. Akar-akar persamaan kuadrat <MathView math="x^2 + 2x + 3 = 0" /> adalah <MathView math="\alpha" /> dan <MathView math="\beta" />. Persamaan kuadrat baru yang akar-akarnya <MathView math="(\alpha - 2)" /> dan <MathView math="(\beta - 2)" /> adalah...
              </p>
              <div className="space-y-2 text-slate-700 dark:text-slate-300">
                <p><strong>Pembahasan:</strong></p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-2">
                  <MathView block math="\alpha + \beta = -\frac{2}{1} = -2" />
                  <MathView block math="\alpha\beta = \frac{3}{1} = 3" />
                </div>
                <p>Jumlah baru:</p>
                <MathView block math="x_1 + x_2 = (\alpha - 2) + (\beta - 2) = \alpha + \beta - 4 = -2 - 4 = -6" />
                <p>Hasil kali baru:</p>
                <MathView block math="x_1 \cdot x_2 = (\alpha - 2)(\beta - 2) = \alpha\beta - 2(\alpha + \beta) + 4 = 3 - 2(-2) + 4 = 11" />
                <p>Maka persamaan kuadrat baru menjadi:</p>
                <MathView block math="x^2 - (-6)x + 11 = 0 \implies x^2 + 6x + 11 = 0" />
              </div>
            </div>
          </div>

          {/* Latihan 5.4 */}
          <div id="latihan-5-4" className="mt-10 scroll-mt-24">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-200 dark:border-slate-800">
              <span className="w-3 h-3 bg-indigo-600 rounded-sm"></span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Latihan 5.4
              </h3>
            </div>
            {latihan54Data.map((item) => (
              <ExerciseItem key={item.id} {...item} />
            ))}
          </div>
        </section>

        {/* ==========================================================================
            SUB-BAB 5.5: PENYELESAIAN MASALAH KUADRAT (Halaman 17 - 18)
            ========================================================================== */}
        <section id="sub-5-5" className="mb-16 scroll-mt-20">
          <div className="border-b border-indigo-200 dark:border-indigo-900/60 pb-3 mb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-3">
              <span className="px-3 py-1 bg-indigo-600 text-white rounded-xl text-lg sm:text-xl">5.5</span>
              <span>Penyelesaian Masalah Dengan Permasalahan Kuadrat</span>
            </h2>
          </div>

          <p className="leading-relaxed text-slate-700 dark:text-slate-300">
            Persamaan kuadrat dapat diterapkan untuk menyelesaikan persoalan dalam kehidupan sehari-hari, baik dari permasalahan sederhana seperti mencari ukuran panjang lapangan berbentuk persegi panjang jika diketahui luas dan hubungan antara panjang dan lebarnya, sampai dengan permasalahan rumit seperti pembuatan bangun yang berbentuk melengkung, biasanya para arsitek akan menggunakan rumus persamaan kuadrat dan fungsi kuadrat. Begitupun saat merancang pergerakan robot untuk melompat atau melempar objek, diperlukan persamaan kuadrat dan fungsi kuadrat untuk menghitung posisi dan waktu.
          </p>

          {/* Contoh 5.5 */}
          <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl">
            <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-indigo-600 text-white rounded text-xs">Contoh</span>
              <span>Contoh 5.5:</span>
            </h4>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Sebuah lapangan berbentuk persegi panjang. Diketahui panjangnya dua kali dari lebarnya. Pada tepi sebelah luar tiga sisi lapangan tersebut dibuat jalan yang lebarnya 2 meter (Perhatikan gambar!). Jika luas seluruh jalan (yang tidak diarsir pada gambar) adalah <MathView math="128\text{ m}^2" />, maka luas lapangan tersebut adalah...
            </p>

            {/* High-definition Vector SVG Diagram */}
            <Contoh55Svg />

            {/* Verbatim Solusi Contoh 5.5 */}
            <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-sm sm:text-base space-y-2">
              <div className="font-bold text-slate-900 dark:text-slate-100">Diketahui:</div>
              <MathView block math="L_{ABCD} = (2l + 4)(l + 2) = 2l^2 + 8l + 8" />
              <MathView block math="L_{\text{lapangan}} = 2l \cdot l = 2l^2" />
              <MathView block math="L_{\text{jalan}} = 128\text{ m}^2" />
              <p className="mt-2 text-slate-700 dark:text-slate-300">
                Luas lapangan dapat ditentukan dengan mengurangkan luas ABCD dengan luas jalan:
              </p>
              <MathView block math="L_{\text{lapangan}} = L_{ABCD} - L_{\text{jalan}}" />
              <MathView block math="2l^2 = 2l^2 + 8l + 8 - 128" />
              <MathView block math="2l^2 - 2l^2 = 8l - 120" />
              <MathView block math="8l = 120 \implies l = 15\text{ m}" />
              <MathView block math="L_{\text{lapangan}} = 2l^2 = 2(15)^2 = 450\text{ m}^2" />
              <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 rounded-lg font-bold text-indigo-700 dark:text-indigo-300 text-center mt-3">
                Jadi, luas lapangan tersebut adalah <MathView math="450\text{ m}^2" />
              </div>
            </div>
          </div>

          {/* Latihan 5.5 (Tanpa panah estetika sesuai request) */}
          <div id="latihan-5-5" className="mt-10 scroll-mt-24">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-200 dark:border-slate-800">
              <span className="w-3 h-3 bg-indigo-600 rounded-sm"></span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Latihan 5.5
              </h3>
            </div>
            {latihan55Data.map((item) => (
              <ExerciseItem key={item.id} {...item} />
            ))}
          </div>
        </section>

        {/* ==========================================================================
            RANGKUMAN 5 (Halaman 19)
            ========================================================================== */}
        <section id="rangkuman-5" className="mb-16 scroll-mt-20">
          <div className="p-6 md:p-8 bg-gradient-to-br from-indigo-500/10 via-white to-purple-500/10 dark:from-slate-900 dark:via-slate-900/80 dark:to-slate-950 border-2 border-indigo-300 dark:border-indigo-900/60 rounded-3xl shadow-sm">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              <span>Rangkuman 5</span>
            </h2>

            <div className="space-y-6 text-sm sm:text-base">
              {/* Definisi */}
              <div>
                <div className="font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2">
                  <span className="text-indigo-600">❖</span> Definisi dan Bentuk Umum Persamaan Kuadrat:
                </div>
                <CalloutBox variant="summary">
                  <div className="text-center font-bold text-lg text-indigo-700 dark:text-indigo-400">
                    <MathView math="ax^2 + bx + c = 0 \\quad \\text{dengan } a \neq 0 \\text{ dan } a, b, c \in \mathbb{R}" />
                  </div>
                </CalloutBox>
              </div>

              {/* Menentukan Akar */}
              <div>
                <div className="font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2">
                  <span className="text-indigo-600">❖</span> Menentukan akar-akar persamaan kuadrat:
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
                    <div className="font-bold text-xs uppercase text-indigo-600 mb-1">1. Pemfaktoran</div>
                    <MathView block math="ax^2 + bx + c = 0" />
                    <MathView block math="\frac{1}{a}(ax + p)(ax + q) = 0" />
                    <div className="text-xs text-slate-500 text-center">syarat: <MathView math="pq = ac" />, <MathView math="p+q = b" /></div>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
                    <div className="font-bold text-xs uppercase text-indigo-600 mb-1">2. Kuadrat Sempurna</div>
                    <MathView block math="\left(x + \frac{b}{2a}\right)^2 = -\frac{c}{a} + \left(\frac{b}{2a}\right)^2" />
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
                    <div className="font-bold text-xs uppercase text-indigo-600 mb-1">3. Rumus ABC</div>
                    <MathView block math="x_{1,2} = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}" />
                  </div>
                </div>
              </div>

              {/* Jenis Akar */}
              <div>
                <div className="font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2">
                  <span className="text-indigo-600">❖</span> Menentukan jenis-jenis akar-akar persamaan kuadrat:
                </div>
                <CalloutBox variant="plain">
                  <MathView block math="D = b^2 - 4ac" />
                  <div className="space-y-1.5 mt-2 text-xs sm:text-sm">
                    <div>Jika <MathView math="D > 0 \rightarrow" /> Kedua akarnya real dan berlainan (<MathView math="x_1 \neq x_2" />)</div>
                    <div>Jika <MathView math="D = 0 \rightarrow" /> Kedua akarnya real dan kembar/sama (<MathView math="x_1 = x_2" />)</div>
                    <div>Jika <MathView math="D < 0 \rightarrow" /> Kedua akarnya tidak real (imajiner)</div>
                  </div>
                </CalloutBox>
              </div>

              {/* Jumlah dan Hasil Kali */}
              <div>
                <div className="font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2">
                  <span className="text-indigo-600">❖</span> Jumlah dan hasil kali akar-akar persamaan kuadrat:
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-center">
                    <MathView math="x_1 + x_2 = -\frac{b}{a}" />
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-center">
                    <MathView math="x_1 \times x_2 = \frac{c}{a}" />
                  </div>
                </div>
              </div>

              {/* Menyusun Baru */}
              <div>
                <div className="font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2">
                  <span className="text-indigo-600">❖</span> Menyusun persamaan kuadrat baru:
                </div>
                <div className="space-y-2">
                  <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
                    <div className="text-xs font-bold text-slate-500 mb-1">1. Jika diketahui akar-akar persamaan kuadrat:</div>
                    <MathView block math="(x - x_1)(x - x_2) = 0" />
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
                    <div className="text-xs font-bold text-slate-500 mb-1">2. Jika diketahui jumlah dan hasil kali akar:</div>
                    <MathView block math="x^2 - (x_1 + x_2)x + (x_1 \cdot x_2) = 0" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================================================
            EVALUASI 5 (Halaman 20 - 22) - 17 Soal Interaktif
            ========================================================================== */}
        <section className="mb-20">
          <EvaluationSection />
        </section>
      </div>
    )}

    {/* Tab 2: Roadmap 8 Pertemuan */}
    {activeTab === 'roadmap' && (
      <div role="tabpanel" id="panel-roadmap" aria-labelledby="tab-roadmap">
        <RoadmapSection />
      </div>
    )}

    {/* Tab 3: Paket A & B */}
    {activeTab === 'latihan' && (
      <div role="tabpanel" id="panel-latihan" aria-labelledby="tab-latihan">
        <PaketLatihanSection />
      </div>
    )}

    {/* Tab 4: Ulangan Harian (10 Wajib + 2 Opsional) */}
    {activeTab === 'uh' && (
      <div role="tabpanel" id="panel-uh" aria-labelledby="tab-uh">
        <UhSection />
      </div>
    )}

        {/* Footer */}
        <footer className="pt-8 pb-16 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-400">
          <p>© Bab 5: Persamaan Kuadrat — Materi Pembelajaran Matematika SMA Kelas X</p>
          <p className="mt-1">Zero-Cache Enabled • Responsive Interaktif • KaTeX Typography</p>
        </footer>
      </main>
    </div>
  );
};
