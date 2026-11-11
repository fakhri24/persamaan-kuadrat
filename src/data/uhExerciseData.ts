export interface UHStimulus {
  tag: string;
  title: string;
  text: string;
  source?: string;
}

export interface PersegiPanjangDiagramConfig {
  selisihLabel: string;
  luasLabel: string;
}

export interface KolamJalanDiagramConfig {
  luasKolamLabel: string;
  selisihLabel: string;
  lebarJalanLabel: string;
}

export interface UHQuestion {
  id: string;
  number: number;
  isOptional: boolean;
  points: number; // 10 untuk wajib, 5 untuk opsional
  cognitiveLevel: 'Dasar' | 'Standar TKA' | 'Standar SNBT' | 'Problem Solving SNBT';
  categoryTag: string;
  stimulus?: UHStimulus;
  diagramType?: 'tangga' | 'persegi-panjang' | 'kolam-jalan';
  diagramConfig?: {
    panjangTangga: string;
    tinggiLabel: string;
    jarakLabel: string;
  };
  persegiPanjangConfig?: PersegiPanjangDiagramConfig;
  kolamJalanConfig?: KolamJalanDiagramConfig;
  question: string;
  mathPrompt?: string;
  type: 'text' | 'choice';
  options?: { key: string; text: string; math?: string }[];
  correctAnswer: string;
  acceptedAnswers: string[];
  hint?: string;
  explanation: string;
}

/*
 * Catatan format:
 * - Semua matematika ditulis dalam delimiter LaTeX: $...$ (inline) atau $$...$$ (blok).
 * - Seluruh langkah pembahasan disusun vertikal sejajar tanda "=" menggunakan \begin{aligned}
 *   tanpa menumpuk dua langkah dalam satu baris.
 */

/* ==========================================================================
   ULANGAN HARIAN (10 Wajib @ 10 Poin, 2 Opsional @ 5 Poin Bonus)
   Semua soal berbentuk Pilihan Ganda 5 Opsi (A, B, C, D, E)
   ========================================================================== */
export const uhQuestionsData: UHQuestion[] = [
  {
    id: 'uh-1',
    number: 1,
    isOptional: false,
    points: 10,
    cognitiveLevel: 'Dasar',
    categoryTag: 'Pemfaktoran',
    question:
      'Tentukan akar-akar dari persamaan kuadrat berikut menggunakan metode pemfaktoran!',
    mathPrompt: 'x^2 - 4x - 12 = 0',
    type: 'choice',
    options: [
      { key: 'A', text: '2 atau -6' },
      { key: 'B', text: '-2 atau 6' },
      { key: 'C', text: '-2 atau -6' },
      { key: 'D', text: '3 atau -4' },
      { key: 'E', text: '-3 atau 4' },
    ],
    correctAnswer: 'B',
    acceptedAnswers: ['B', 'b'],
    hint: 'Cari dua bilangan yang hasil kalinya $-12$ dan jumlahnya $-4$, yaitu $2$ dan $-6$.',
    explanation:
      'Cari dua bilangan dengan hasil kali $-12$ dan jumlah $-4$, yaitu $2$ dan $-6$:\n$$\\begin{aligned}\nx^2 - 4x - 12 &= 0 \\\\\n(x + 2)(x - 6) &= 0\n\\end{aligned}$$\nPembuat nol masing-masing faktor:\n$$\\begin{aligned}\nx + 2 &= 0 \\\\\nx_1 &= -2\n\\end{aligned}$$\natau\n$$\\begin{aligned}\nx - 6 &= 0 \\\\\nx_2 &= 6\n\\end{aligned}$$\nJawaban yang benar adalah B.',
  },
  {
    id: 'uh-2',
    number: 2,
    isOptional: false,
    points: 10,
    cognitiveLevel: 'Dasar',
    categoryTag: 'Rumus ABC / Kuadrat Sempurna',
    question:
      'Tentukan akar-akar dari persamaan kuadrat berikut dengan menggunakan rumus Al-Khawarizmi (ABC) atau melengkapkan kuadrat sempurna!',
    mathPrompt: 'x^2 - 4x - 2 = 0',
    type: 'choice',
    options: [
      { key: 'A', text: 'x = -2 ± √6', math: 'x = -2 \\pm \\sqrt{6}' },
      { key: 'B', text: 'x = 4 ± √24', math: 'x = 4 \\pm \\sqrt{24}' },
      { key: 'C', text: 'x = 2 ± √6', math: 'x = 2 \\pm \\sqrt{6}' },
      { key: 'D', text: 'x = 2 ± √5', math: 'x = 2 \\pm \\sqrt{5}' },
      { key: 'E', text: 'x = -2 ± √5', math: 'x = -2 \\pm \\sqrt{5}' },
    ],
    correctAnswer: 'C',
    acceptedAnswers: ['C', 'c'],
    hint: 'Gunakan $(x - 2)^2 = 6$ atau rumus ABC $x_{1,2} = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$ dengan $a = 1$, $b = -4$, $c = -2$.',
    explanation:
      'Cara 1 — Melengkapkan kuadrat sempurna:\n$$\\begin{aligned}\nx^2 - 4x - 2 &= 0 \\\\\nx^2 - 4x &= 2 \\\\\nx^2 - 4x + (-2)^2 &= 2 + (-2)^2 \\\\\n(x - 2)^2 &= 6 \\\\\nx - 2 &= \\pm\\sqrt{6} \\\\\nx &= 2 \\pm \\sqrt{6}\n\\end{aligned}$$\n\nCara 2 — Rumus Al-Khawarizmi (ABC) dengan $a = 1$, $b = -4$, $c = -2$:\n$$\\begin{aligned}\nx_{1,2} &= \\frac{-(-4) \\pm \\sqrt{(-4)^2 - 4(1)(-2)}}{2(1)} \\\\\n&= \\frac{4 \\pm \\sqrt{16 + 8}}{2} \\\\\n&= \\frac{4 \\pm \\sqrt{24}}{2} \\\\\n&= \\frac{4 \\pm 2\\sqrt{6}}{2} \\\\\n&= 2 \\pm \\sqrt{6}\n\\end{aligned}$$\nJawaban yang benar adalah C.',
  },
  {
    id: 'uh-3',
    number: 3,
    isOptional: false,
    points: 10,
    cognitiveLevel: 'Dasar',
    categoryTag: 'Substitusi Solusi Akar',
    question:
      'Diketahui salah satu akar dari persamaan kuadrat berikut adalah $x = -2$. Tentukan nilai koefisien $b$!',
    mathPrompt: '2x^2 + bx - 10 = 0',
    type: 'choice',
    options: [
      { key: 'A', text: '-1' },
      { key: 'B', text: '1' },
      { key: 'C', text: '-9' },
      { key: 'D', text: '9' },
      { key: 'E', text: '-3' },
    ],
    correctAnswer: 'A',
    acceptedAnswers: ['A', 'a'],
    hint: 'Substitusikan nilai $x = -2$ langsung ke dalam setiap variabel $x$ pada persamaan.',
    explanation:
      'Substitusikan $x = -2$ ke dalam persamaan:\n$$\\begin{aligned}\n2(-2)^2 + b(-2) - 10 &= 0 \\\\\n2(4) - 2b - 10 &= 0 \\\\\n8 - 2b - 10 &= 0 \\\\\n-2b - 2 &= 0 \\\\\n-2b &= 2 \\\\\nb &= -1\n\\end{aligned}$$\nJawaban yang benar adalah A.',
  },
  {
    id: 'uh-4',
    number: 4,
    isOptional: false,
    points: 10,
    cognitiveLevel: 'Standar TKA',
    categoryTag: 'Diskriminan & Akar Kembar',
    question:
      'Tentukan nilai $p$ positif agar persamaan kuadrat berikut mempunyai dua akar riil kembar (sama)!',
    mathPrompt: 'x^2 - px + (p + 3) = 0',
    type: 'choice',
    options: [
      { key: 'A', text: '2' },
      { key: 'B', text: '3' },
      { key: 'C', text: '4' },
      { key: 'D', text: '6' },
      { key: 'E', text: '12' },
    ],
    correctAnswer: 'D',
    acceptedAnswers: ['D', 'd'],
    hint: 'Syarat dua akar kembar adalah $D = b^2 - 4ac = 0$.',
    explanation:
      'Identifikasi koefisien: $a = 1$, $b = -p$, dan $c = p + 3$. Syarat akar kembar ($D = 0$):\n$$\\begin{aligned}\nb^2 - 4ac &= 0 \\\\\n(-p)^2 - 4(1)(p + 3) &= 0 \\\\\np^2 - 4p - 12 &= 0 \\\\\n(p - 6)(p + 2) &= 0\n\\end{aligned}$$\nDiperoleh $p = 6$ atau $p = -2$. Karena diminta nilai positif, maka $p = 6$.\nJawaban yang benar adalah D.',
  },
  {
    id: 'uh-5',
    number: 5,
    isOptional: false,
    points: 10,
    cognitiveLevel: 'Dasar',
    categoryTag: 'Teorema Vieta Dasar',
    question:
      'Jika $x_1$ dan $x_2$ adalah akar-akar dari persamaan kuadrat berikut, tentukan nilai dari $4x_1 + 4x_2 + 2x_1x_2$!',
    mathPrompt: '2x^2 - 8x + 5 = 0',
    type: 'choice',
    options: [
      { key: 'A', text: '13' },
      { key: 'B', text: '16' },
      { key: 'C', text: '18' },
      { key: 'D', text: '21' },
      { key: 'E', text: '26' },
    ],
    correctAnswer: 'D',
    acceptedAnswers: ['D', 'd'],
    hint: 'Gunakan $x_1 + x_2 = -\\frac{b}{a}$ dan $x_1x_2 = \\frac{c}{a}$, lalu hitung $4(x_1 + x_2) + 2x_1x_2$.',
    explanation:
      'Berdasarkan Teorema Vieta:\n$$\\begin{aligned}\nx_1 + x_2 &= -\\frac{-8}{2} \\\\\n&= 4 \\\\\nx_1 x_2 &= \\frac{5}{2}\n\\end{aligned}$$\nSubstitusikan ke bentuk yang ditanyakan:\n$$\\begin{aligned}\n4x_1 + 4x_2 + 2x_1x_2 &= 4(x_1 + x_2) + 2(x_1x_2) \\\\\n&= 4(4) + 2\\left(\\frac{5}{2}\\right) \\\\\n&= 16 + 5 \\\\\n&= 21\n\\end{aligned}$$\nJawaban yang benar adalah D.',
  },
  {
    id: 'uh-6',
    number: 6,
    isOptional: false,
    points: 10,
    cognitiveLevel: 'Standar TKA',
    categoryTag: 'Bentuk Aljabar Simetris',
    question:
      'Persamaan kuadrat berikut mempunyai akar-akar $\\alpha$ dan $\\beta$. Hitunglah nilai dari $\\alpha^2 + \\beta^2$!',
    mathPrompt: 'x^2 - 6x - 2 = 0',
    type: 'choice',
    options: [
      { key: 'A', text: '32' },
      { key: 'B', text: '34' },
      { key: 'C', text: '36' },
      { key: 'D', text: '38' },
      { key: 'E', text: '40' },
    ],
    correctAnswer: 'E',
    acceptedAnswers: ['E', 'e'],
    hint: 'Gunakan identitas aljabar: $\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 - 2\\alpha\\beta$.',
    explanation:
      'Dari persamaan $x^2 - 6x - 2 = 0$, diperoleh:\n$$\\begin{aligned}\n\\alpha + \\beta &= 6 \\\\\n\\alpha\\beta &= -2\n\\end{aligned}$$\nGunakan identitas jumlah kuadrat akar:\n$$\\begin{aligned}\n\\alpha^2 + \\beta^2 &= (\\alpha + \\beta)^2 - 2\\alpha\\beta \\\\\n&= (6)^2 - 2(-2) \\\\\n&= 36 + 4 \\\\\n&= 40\n\\end{aligned}$$\nJawaban yang benar adalah E.',
  },
  {
    id: 'uh-7',
    number: 7,
    isOptional: false,
    points: 10,
    cognitiveLevel: 'Standar TKA',
    categoryTag: 'Stimulus Numerasi: Relasi Selisih Akar',
    stimulus: {
      tag: 'WACANA SOAL',
      title: 'Zona Pantau Waktu Transit Drone Medis',
      text: 'Sebuah drone otonom pengantar bantuan medis diterbangkan melewati jalur perbukitan. Sistem telemetri mendeteksi waktu tempuh $t$ (dalam detik) saat drone melintasi batas ketinggian zona kritis memenuhi persamaan kuadrat $t^2 - mt + 16 = 0$, dengan $m$ adalah parameter daya dorong mesin ($m > 0$). Radar mencatat drone memasuki dan meninggalkan zona tersebut pada waktu $t_1 = p$ dan $t_2 = q$ dengan selisih waktu transit $p - q = 6$ detik.',
      source: 'Telemetri Sistem Navigasi Drone Cepat Tanggap',
    },
    question:
      'Berdasarkan catatan telemetri radar di atas, tentukan nilai parameter daya dorong $m$ (dengan $m > 0$) yang memenuhi persamaan tersebut!',
    mathPrompt: 't^2 - mt + 16 = 0',
    type: 'choice',
    options: [
      { key: 'A', text: '6' },
      { key: 'B', text: '8' },
      { key: 'C', text: '10' },
      { key: 'D', text: '12' },
      { key: 'E', text: '14' },
    ],
    correctAnswer: 'C',
    acceptedAnswers: ['C', 'c'],
    hint: '$p + q = m$ dan $pq = 16$. Gunakan identitas selisih akar: $(p - q)^2 = (p + q)^2 - 4pq$.',
    explanation:
      'Berdasarkan Teorema Vieta pada $t^2 - mt + 16 = 0$:\n$$\\begin{aligned}\np + q &= m \\\\\npq &= 16\n\\end{aligned}$$\nGunakan hubungan kuadrat selisih akar:\n$$\\begin{aligned}\n(p - q)^2 &= (p + q)^2 - 4pq \\\\\n6^2 &= m^2 - 4(16) \\\\\n36 &= m^2 - 64 \\\\\nm^2 &= 36 + 64 \\\\\nm^2 &= 100 \\\\\nm &= \\pm 10\n\\end{aligned}$$\nKarena disyaratkan parameter $m > 0$, maka $m = 10$.\nJawaban yang benar adalah C.',
  },
  {
    id: 'uh-8',
    number: 8,
    isOptional: false,
    points: 10,
    cognitiveLevel: 'Dasar',
    categoryTag: 'Menyusun PK Baru',
    question: 'Persamaan kuadrat yang mempunyai akar-akar berikut adalah...',
    mathPrompt: 'x_1 = -5, \\quad x_2 = 3',
    type: 'choice',
    options: [
      { key: 'A', text: 'x² - 2x - 15 = 0', math: 'x^2 - 2x - 15 = 0' },
      { key: 'B', text: 'x² + 8x - 15 = 0', math: 'x^2 + 8x - 15 = 0' },
      { key: 'C', text: 'x² - 8x + 15 = 0', math: 'x^2 - 8x + 15 = 0' },
      { key: 'D', text: 'x² + 2x - 15 = 0', math: 'x^2 + 2x - 15 = 0' },
      { key: 'E', text: 'x² + 2x + 15 = 0', math: 'x^2 + 2x + 15 = 0' },
    ],
    correctAnswer: 'D',
    acceptedAnswers: ['D', 'd'],
    hint: 'Gunakan $(x - x_1)(x - x_2) = 0$ atau $x^2 - (x_1 + x_2)x + x_1x_2 = 0$.',
    explanation:
      'Hitung jumlah dan hasil kali kedua akar:\n$$\\begin{aligned}\nx_1 + x_2 &= -5 + 3 \\\\\n&= -2 \\\\\nx_1 x_2 &= (-5)(3) \\\\\n&= -15\n\\end{aligned}$$\nSusun persamaan kuadrat baru:\n$$\\begin{aligned}\nx^2 - (x_1 + x_2)x + x_1 x_2 &= 0 \\\\\nx^2 - (-2)x + (-15) &= 0 \\\\\nx^2 + 2x - 15 &= 0\n\\end{aligned}$$\nJawaban yang benar adalah D.',
  },
  {
    id: 'uh-9',
    number: 9,
    isOptional: false,
    points: 10,
    cognitiveLevel: 'Standar TKA',
    categoryTag: 'Menyusun PK Berelasi Linear',
    question:
      'Akar-akar persamaan kuadrat berikut adalah $x_1$ dan $x_2$. Persamaan kuadrat baru yang akar-akarnya $(x_1 + 3)$ dan $(x_2 + 3)$ adalah...',
    mathPrompt: 'x^2 - 4x - 3 = 0',
    type: 'choice',
    options: [
      { key: 'A', text: 'x² + 10x + 18 = 0', math: 'x^2 + 10x + 18 = 0' },
      { key: 'B', text: 'x² - 10x + 18 = 0', math: 'x^2 - 10x + 18 = 0' },
      { key: 'C', text: 'x² - 10x + 24 = 0', math: 'x^2 - 10x + 24 = 0' },
      { key: 'D', text: 'x² - 10x - 18 = 0', math: 'x^2 - 10x - 18 = 0' },
      { key: 'E', text: 'x² - 7x + 9 = 0', math: 'x^2 - 7x + 9 = 0' },
    ],
    correctAnswer: 'B',
    acceptedAnswers: ['B', 'b'],
    hint: 'Jumlah akar baru $= (x_1 + x_2) + 6$; hasil kali akar baru $= x_1x_2 + 3(x_1 + x_2) + 9$.',
    explanation:
      'Dari persamaan awal $x^2 - 4x - 3 = 0$, diperoleh:\n$$\\begin{aligned}\nx_1 + x_2 &= 4 \\\\\nx_1 x_2 &= -3\n\\end{aligned}$$\nMisalkan akar-akar baru adalah $\\alpha = x_1 + 3$ dan $\\beta = x_2 + 3$.\nJumlah akar baru:\n$$\\begin{aligned}\n\\alpha + \\beta &= (x_1 + 3) + (x_2 + 3) \\\\\n&= (x_1 + x_2) + 6 \\\\\n&= 4 + 6 \\\\\n&= 10\n\\end{aligned}$$\nHasil kali akar baru:\n$$\\begin{aligned}\n\\alpha\\beta &= (x_1 + 3)(x_2 + 3) \\\\\n&= x_1 x_2 + 3(x_1 + x_2) + 9 \\\\\n&= -3 + 3(4) + 9 \\\\\n&= -3 + 12 + 9 \\\\\n&= 18\n\\end{aligned}$$\nMaka persamaan kuadrat baru adalah:\n$$\\begin{aligned}\nx^2 - (\\alpha + \\beta)x + \\alpha\\beta &= 0 \\\\\nx^2 - 10x + 18 &= 0\n\\end{aligned}$$\nJawaban yang benar adalah B.',
  },
  {
    id: 'uh-10',
    number: 10,
    isOptional: false,
    points: 10,
    cognitiveLevel: 'Standar SNBT',
    categoryTag: 'Stimulus Geometri & K3: Teorema Pythagoras',
    stimulus: {
      tag: 'WACANA SOAL',
      title: 'Standar Penempatan Tangga Penyelamatan Gedung',
      text: 'Dalam prosedur simulasi keselamatan darurat gedung, teknisi menyandarkan tangga darurat berjangkauan $20$ meter pada dinding beton vertikal. Agar tumpuan kokoh dan aman dinaiki, ketinggian vertikal ujung atas tangga di dinding ($t$) disyaratkan lebih tinggi $4$ meter dibanding jarak horizontal tapak kaki tangga ke dasar dinding ($x$). Posisi tangga, dinding, dan lantai datar membentuk segitiga siku-siku seperti tampak pada diagram teknis berikut.',
      source: 'Panduan Operasional Teknis K3 & Evakuasi Bangunan',
    },
    diagramType: 'tangga',
    diagramConfig: {
      panjangTangga: '20 m',
      tinggiLabel: 't',
      jarakLabel: 'x',
    },
    question:
      'Berdasarkan spesifikasi regulasi dan diagram teknis di atas, hitunglah tinggi tembok ($t$) yang dicapai oleh ujung tangga tersebut!',
    type: 'choice',
    options: [
      { key: 'A', text: '10 m' },
      { key: 'B', text: '12 m' },
      { key: 'C', text: '14 m' },
      { key: 'D', text: '16 m' },
      { key: 'E', text: '18 m' },
    ],
    correctAnswer: 'D',
    acceptedAnswers: ['D', 'd'],
    hint: 'Nyatakan $t = x + 4$, lalu terapkan teorema Pythagoras pada segitiga siku-siku untuk mencari $x$ positif.',
    explanation:
      'Misalkan jarak kaki tangga ke dinding adalah $x$ meter, maka tinggi tembok adalah $t = (x + 4)$ meter.\nBerdasarkan Teorema Pythagoras:\n$$\\begin{aligned}\nx^2 + (x + 4)^2 &= 20^2 \\\\\nx^2 + x^2 + 8x + 16 &= 400 \\\\\n2x^2 + 8x + 16 - 400 &= 0 \\\\\n2x^2 + 8x - 384 &= 0 \\\\\nx^2 + 4x - 192 &= 0 \\\\\n(x + 16)(x - 12) &= 0\n\\end{aligned}$$\nDiperoleh $x = -16$ (tidak memenuhi karena jarak harus positif) atau $x = 12$ meter.\nSubstitusikan $x = 12$ untuk memperoleh tinggi tembok:\n$$\\begin{aligned}\nt &= x + 4 \\\\\n&= 12 + 4 \\\\\n&= 16\\text{ meter}\n\\end{aligned}$$\nJawaban yang benar adalah D.',
  },
  {
    id: 'uh-11',
    number: 11,
    isOptional: true,
    points: 5,
    cognitiveLevel: 'Problem Solving SNBT',
    categoryTag: 'Sintesis Parameter & Akar',
    question:
      '[OPSIONAL/BONUS +5] Diketahui salah satu akar dari persamaan kuadrat berikut adalah $x_1 = 2$. Jika $x_2$ adalah akar lainnya, tentukan nilai dari $m^2 + x_2^2$!',
    mathPrompt: '(m - 1)x^2 - (2m + 4)x + (3m + 3) = 0',
    type: 'choice',
    options: [
      { key: 'A', text: '10' },
      { key: 'B', text: '13' },
      { key: 'C', text: '18' },
      { key: 'D', text: '25' },
      { key: 'E', text: '27' },
    ],
    correctAnswer: 'C',
    acceptedAnswers: ['C', 'c'],
    hint: 'Substitusikan $x = 2$ ke dalam persamaan untuk menemukan nilai $m$, lalu masukkan kembali nilai $m$ guna menentukan akar kedua $x_2$.',
    explanation:
      'Langkah 1 — Substitusikan akar $x_1 = 2$ untuk menentukan nilai parameter $m$:\n$$\\begin{aligned}\n(m - 1)(2)^2 - (2m + 4)(2) + (3m + 3) &= 0 \\\\\n4(m - 1) - 2(2m + 4) + 3m + 3 &= 0 \\\\\n4m - 4 - 4m - 8 + 3m + 3 &= 0 \\\\\n3m - 9 &= 0 \\\\\n3m &= 9 \\\\\nm &= 3\n\\end{aligned}$$\nLangkah 2 — Substitusikan $m = 3$ ke persamaan kuadrat awal:\n$$\\begin{aligned}\n(3 - 1)x^2 - (2(3) + 4)x + (3(3) + 3) &= 0 \\\\\n2x^2 - 10x + 12 &= 0 \\\\\nx^2 - 5x + 6 &= 0 \\\\\n(x - 2)(x - 3) &= 0\n\\end{aligned}$$\nKarena $x_1 = 2$, maka akar lainnya adalah $x_2 = 3$.\nLangkah 3 — Hitung nilai $m^2 + x_2^2$:\n$$\\begin{aligned}\nm^2 + x_2^2 &= 3^2 + 3^2 \\\\\n&= 9 + 9 \\\\\n&= 18\n\\end{aligned}$$\nJawaban yang benar adalah C.',
  },
  {
    id: 'uh-12',
    number: 12,
    isOptional: true,
    points: 5,
    cognitiveLevel: 'Problem Solving SNBT',
    categoryTag: 'Pemodelan Geometri: Kolam & Jalan Setapak',
    stimulus: {
      tag: 'WACANA SOAL',
      title: 'Konstruksi Jalur Pedestrian di Sekeliling Kolam Renang',
      text: 'Sebuah kolam renang berbentuk persegi panjang memiliki luas permukaan air sebesar $140\\text{ m}^2$. Ukuran panjang kolam tersebut dirancang $4\\text{ meter}$ lebih dari lebarnya. Di sekeliling tepi luar kolam renang dibangun jalan setapak bertekstur paving dengan lebar seragam $2\\text{ meter}$ pada keempat sisinya seperti tampak pada gambar skema berikut.',
      source: 'Dokumen Desain Lansekap Fasilitas Olahraga',
    },
    diagramType: 'kolam-jalan',
    kolamJalanConfig: {
      luasKolamLabel: '140 m²',
      selisihLabel: '4 m',
      lebarJalanLabel: '2 m',
    },
    question:
      '[OPSIONAL/BONUS +5] Berdasarkan informasi dan skema di atas, hitunglah luas jalan setapak yang mengelilingi kolam renang tersebut!',
    type: 'choice',
    options: [
      { key: 'A', text: '88 m²', math: '88\\text{ m}^2' },
      { key: 'B', text: '96 m²', math: '96\\text{ m}^2' },
      { key: 'C', text: '104 m²', math: '104\\text{ m}^2' },
      { key: 'D', text: '112 m²', math: '112\\text{ m}^2' },
      { key: 'E', text: '128 m²', math: '128\\text{ m}^2' },
    ],
    correctAnswer: 'D',
    acceptedAnswers: ['D', 'd'],
    hint: 'Misalkan lebar kolam $= l$ dan panjang kolam $= l + 4$. Cari nilai $l$ dan $p$ dari luas kolam $140\\text{ m}^2$, kemudian tambahkan $2 \\times 2\\text{ m}$ pada panjang dan lebar untuk mendapatkan ukuran luar.',
    explanation:
      'Langkah 1 — Misalkan lebar kolam $= l$ meter, maka panjang kolam $= (l + 4)$ meter. Gunakan luas kolam $= 140\\text{ m}^2$:\n$$\\begin{aligned}\nl(l + 4) &= 140 \\\\\nl^2 + 4l - 140 &= 0 \\\\\n(l + 14)(l - 10) &= 0\n\\end{aligned}$$\nKarena ukuran fisik harus bernilai positif, diperoleh lebar kolam $l = 10\\text{ m}$ dan panjang kolam:\n$$\\begin{aligned}\np &= l + 4 \\\\\n&= 10 + 4 \\\\\n&= 14\\text{ m}\n\\end{aligned}$$\nLangkah 2 — Karena jalan setapak selebar $2\\text{ m}$ mengelilingi keempat sisi kolam, ukuran luar total bertambah $2(2)\\text{ m} = 4\\text{ m}$:\n$$\\begin{aligned}\n\\text{Panjang luar} &= 14 + 2(2) \\\\\n&= 18\\text{ m} \\\\\n\\text{Lebar luar} &= 10 + 2(2) \\\\\n&= 14\\text{ m}\n\\end{aligned}$$\nLangkah 3 — Hitung luas jalan setapak:\n$$\\begin{aligned}\n\\text{Luas total luar} &= 18 \\times 14 \\\\\n&= 252\\text{ m}^2 \\\\\n\\text{Luas jalan setapak} &= \\text{Luas total luar} - \\text{Luas kolam} \\\\\n&= 252 - 140 \\\\\n&= 112\\text{ m}^2\n\\end{aligned}$$\nJawaban yang benar adalah D.',
  },
];

/* ==========================================================================
   PAKET A (Dikerjakan Bersama di Kelas - Guided Mode + Hint)
   Angka baru, tipe & tingkat kesulitan setara dengan Paket B.
   ========================================================================== */
export const paketAData: UHQuestion[] = [
  {
    id: 'pa-1',
    number: 1,
    isOptional: false,
    points: 10,
    cognitiveLevel: 'Dasar',
    categoryTag: 'Pemfaktoran',
    question: 'Tentukan akar-akar persamaan kuadrat berikut dengan metode pemfaktoran!',
    mathPrompt: 'x^2 - 11x + 24 = 0',
    type: 'choice',
    options: [
      { key: 'A', text: '3 atau 8' },
      { key: 'B', text: '-3 atau -8' },
      { key: 'C', text: '3 atau -8' },
      { key: 'D', text: '-3 atau 8' },
      { key: 'E', text: '4 atau 6' },
    ],
    correctAnswer: 'A',
    acceptedAnswers: ['A', 'a'],
    hint: 'Cari dua bilangan yang hasil kalinya $24$ dan jumlahnya $-11$, yaitu $-3$ dan $-8$.',
    explanation:
      'Cari dua bilangan dengan hasil kali $24$ dan jumlah $-11$, yaitu $-3$ dan $-8$:\n$$\\begin{aligned}\nx^2 - 11x + 24 &= 0 \\\\\n(x - 3)(x - 8) &= 0\n\\end{aligned}$$\nPembuat nol masing-masing faktor:\n$$\\begin{aligned}\nx - 3 &= 0 \\\\\nx_1 &= 3\n\\end{aligned}$$\natau\n$$\\begin{aligned}\nx - 8 &= 0 \\\\\nx_2 &= 8\n\\end{aligned}$$\nJawaban: A.',
  },
  {
    id: 'pa-2',
    number: 2,
    isOptional: false,
    points: 10,
    cognitiveLevel: 'Dasar',
    categoryTag: 'Rumus ABC / Kuadrat Sempurna',
    question:
      'Tentukan akar-akar dari persamaan kuadrat berikut dengan menggunakan rumus Al-Khawarizmi (ABC) atau melengkapkan kuadrat sempurna!',
    mathPrompt: 'x^2 - 6x + 4 = 0',
    type: 'choice',
    options: [
      { key: 'A', text: 'x = -3 ± √5', math: 'x = -3 \\pm \\sqrt{5}' },
      { key: 'B', text: 'x = 3 ± √5', math: 'x = 3 \\pm \\sqrt{5}' },
      { key: 'C', text: 'x = 6 ± √20', math: 'x = 6 \\pm \\sqrt{20}' },
      { key: 'D', text: 'x = 3 ± √2', math: 'x = 3 \\pm \\sqrt{2}' },
      { key: 'E', text: 'x = 3 ± √13', math: 'x = 3 \\pm \\sqrt{13}' },
    ],
    correctAnswer: 'B',
    acceptedAnswers: ['B', 'b'],
    hint: 'Gunakan $(x - 3)^2 = 5$ atau $x_{1,2} = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$.',
    explanation:
      'Cara 1 — Melengkapkan kuadrat sempurna:\n$$\\begin{aligned}\nx^2 - 6x + 4 &= 0 \\\\\nx^2 - 6x &= -4 \\\\\nx^2 - 6x + (-3)^2 &= -4 + (-3)^2 \\\\\n(x - 3)^2 &= 5 \\\\\nx - 3 &= \\pm\\sqrt{5} \\\\\nx &= 3 \\pm \\sqrt{5}\n\\end{aligned}$$\n\nCara 2 — Rumus Al-Khawarizmi (ABC) dengan $a = 1$, $b = -6$, $c = 4$:\n$$\\begin{aligned}\nx_{1,2} &= \\frac{-(-6) \\pm \\sqrt{(-6)^2 - 4(1)(4)}}{2(1)} \\\\\n&= \\frac{6 \\pm \\sqrt{36 - 16}}{2} \\\\\n&= \\frac{6 \\pm \\sqrt{20}}{2} \\\\\n&= \\frac{6 \\pm 2\\sqrt{5}}{2} \\\\\n&= 3 \\pm \\sqrt{5}\n\\end{aligned}$$\nJawaban: B.',
  },
  {
    id: 'pa-3',
    number: 3,
    isOptional: false,
    points: 10,
    cognitiveLevel: 'Dasar',
    categoryTag: 'Substitusi Solusi Akar',
    question:
      'Jika salah satu akar persamaan kuadrat berikut adalah $x = -1$, tentukan nilai $b$!',
    mathPrompt: '2x^2 + bx + 6 = 0',
    type: 'choice',
    options: [
      { key: 'A', text: '-8' },
      { key: 'B', text: '-4' },
      { key: 'C', text: '4' },
      { key: 'D', text: '8' },
      { key: 'E', text: '14' },
    ],
    correctAnswer: 'D',
    acceptedAnswers: ['D', 'd'],
    hint: 'Substitusikan $x = -1$ ke persamaan: $2(-1)^2 + b(-1) + 6 = 0$.',
    explanation:
      'Substitusikan $x = -1$ ke dalam persamaan:\n$$\\begin{aligned}\n2(-1)^2 + b(-1) + 6 &= 0 \\\\\n2(1) - b + 6 &= 0 \\\\\n8 - b &= 0 \\\\\nb &= 8\n\\end{aligned}$$\nJawaban: D.',
  },
  {
    id: 'pa-4',
    number: 4,
    isOptional: false,
    points: 10,
    cognitiveLevel: 'Standar TKA',
    categoryTag: 'Diskriminan Akar Kembar',
    question: 'Tentukan nilai $k$ agar persamaan kuadrat berikut memiliki akar-akar riil kembar!',
    mathPrompt: '2x^2 - 8x + k = 0',
    type: 'choice',
    options: [
      { key: 'A', text: '2' },
      { key: 'B', text: '4' },
      { key: 'C', text: '8' },
      { key: 'D', text: '16' },
      { key: 'E', text: '32' },
    ],
    correctAnswer: 'C',
    acceptedAnswers: ['C', 'c'],
    hint: 'Syarat akar kembar: $D = b^2 - 4ac = 0$.',
    explanation:
      'Identifikasi koefisien: $a = 2$, $b = -8$, dan $c = k$. Syarat akar kembar ($D = 0$):\n$$\\begin{aligned}\nb^2 - 4ac &= 0 \\\\\n(-8)^2 - 4(2)(k) &= 0 \\\\\n64 - 8k &= 0 \\\\\n8k &= 64 \\\\\nk &= 8\n\\end{aligned}$$\nJawaban: C.',
  },
  {
    id: 'pa-5',
    number: 5,
    isOptional: false,
    points: 10,
    cognitiveLevel: 'Dasar',
    categoryTag: 'Teorema Vieta',
    question:
      'Jika $x_1$ dan $x_2$ adalah akar-akar persamaan kuadrat berikut, tentukan nilai dari $3x_1 + 3x_2 + 2x_1x_2$!',
    mathPrompt: '2x^2 - 10x + 3 = 0',
    type: 'choice',
    options: [
      { key: 'A', text: '12' },
      { key: 'B', text: '15' },
      { key: 'C', text: '21' },
      { key: 'D', text: '24' },
      { key: 'E', text: '18' },
    ],
    correctAnswer: 'E',
    acceptedAnswers: ['E', 'e'],
    hint: '$x_1 + x_2 = \\frac{10}{2} = 5$ dan $x_1x_2 = \\frac{3}{2}$.',
    explanation:
      'Berdasarkan Teorema Vieta:\n$$\\begin{aligned}\nx_1 + x_2 &= -\\frac{-10}{2} \\\\\n&= 5 \\\\\nx_1 x_2 &= \\frac{3}{2}\n\\end{aligned}$$\nSubstitusikan ke bentuk yang ditanyakan:\n$$\\begin{aligned}\n3x_1 + 3x_2 + 2x_1x_2 &= 3(x_1 + x_2) + 2(x_1x_2) \\\\\n&= 3(5) + 2\\left(\\frac{3}{2}\\right) \\\\\n&= 15 + 3 \\\\\n&= 18\n\\end{aligned}$$\nJawaban: E.',
  },
  {
    id: 'pa-6',
    number: 6,
    isOptional: false,
    points: 10,
    cognitiveLevel: 'Standar TKA',
    categoryTag: 'Jumlah Kuadrat Akar',
    question:
      'Persamaan kuadrat berikut memiliki akar-akar $x_1$ dan $x_2$. Tentukan nilai dari $x_1^2 + x_2^2$!',
    mathPrompt: 'x^2 - 7x + 3 = 0',
    type: 'choice',
    options: [
      { key: 'A', text: '43' },
      { key: 'B', text: '37' },
      { key: 'C', text: '40' },
      { key: 'D', text: '46' },
      { key: 'E', text: '55' },
    ],
    correctAnswer: 'A',
    acceptedAnswers: ['A', 'a'],
    hint: 'Gunakan $x_1^2 + x_2^2 = (x_1 + x_2)^2 - 2x_1x_2$.',
    explanation:
      'Dari persamaan $x^2 - 7x + 3 = 0$, diperoleh:\n$$\\begin{aligned}\nx_1 + x_2 &= 7 \\\\\nx_1 x_2 &= 3\n\\end{aligned}$$\nSubstitusikan ke identitas jumlah kuadrat akar:\n$$\\begin{aligned}\nx_1^2 + x_2^2 &= (x_1 + x_2)^2 - 2x_1 x_2 \\\\\n&= (7)^2 - 2(3) \\\\\n&= 49 - 6 \\\\\n&= 43\n\\end{aligned}$$\nJawaban: A.',
  },
  {
    id: 'pa-7',
    number: 7,
    isOptional: false,
    points: 10,
    cognitiveLevel: 'Standar TKA',
    categoryTag: 'Stimulus Numerasi: Relasi Selisih Akar',
    stimulus: {
      tag: 'STIMULUS NUMERASI: RISET AERODINAMIKA ROKET AIR',
      title: 'Deteksi Ambang Ketinggian Sensor Penerbangan',
      text: 'Dalam proyek sains terpadu, sekelompok siswa meluncurkan prototipe roket air vertikal ke udara. Sensor ketinggian mencatat waktu tempuh $t$ (dalam detik) saat roket melintasi ambang batas radar memenuhi persamaan kuadrat $t^2 - 8t + p = 0$, dengan $p$ menyatakan konstanta energi. Sensor mencatat roket berada tepat pada garis ambang batas ketinggian radar pada dua waktu berbeda, $t_1$ dan $t_2$, dengan selisih waktu terukur sebesar $|t_1 - t_2| = 2$ detik.',
      source: 'Modul Praktikum Fisika & Aerodinamika Sekolah',
    },
    question:
      'Berdasarkan data bacaan di atas, hitunglah nilai konstanta energi $p$ yang memenuhi persamaan lintasan tersebut!',
    mathPrompt: 't^2 - 8t + p = 0',
    type: 'choice',
    options: [
      { key: 'A', text: '6' },
      { key: 'B', text: '10' },
      { key: 'C', text: '12' },
      { key: 'D', text: '15' },
      { key: 'E', text: '20' },
    ],
    correctAnswer: 'D',
    acceptedAnswers: ['D', 'd'],
    hint: '$t_1 + t_2 = 8$ dan $t_1t_2 = p$. Gunakan $(t_1 - t_2)^2 = (t_1 + t_2)^2 - 4t_1t_2$.',
    explanation:
      'Berdasarkan Teorema Vieta pada $t^2 - 8t + p = 0$:\n$$\\begin{aligned}\nt_1 + t_2 &= 8 \\\\\nt_1 t_2 &= p\n\\end{aligned}$$\nHubungan kuadrat selisih akar:\n$$\\begin{aligned}\n(t_1 - t_2)^2 &= (t_1 + t_2)^2 - 4t_1 t_2 \\\\\n2^2 &= 8^2 - 4p \\\\\n4 &= 64 - 4p \\\\\n4p &= 64 - 4 \\\\\n4p &= 60 \\\\\np &= 15\n\\end{aligned}$$\nJawaban: D.',
  },
  {
    id: 'pa-8',
    number: 8,
    isOptional: false,
    points: 10,
    cognitiveLevel: 'Dasar',
    categoryTag: 'Menyusun PK Baru',
    question: 'Persamaan kuadrat yang mempunyai akar-akar berikut adalah...',
    mathPrompt: 'x_1 = -2, \\quad x_2 = 5',
    type: 'choice',
    options: [
      { key: 'A', text: 'x² + 3x - 10 = 0', math: 'x^2 + 3x - 10 = 0' },
      { key: 'B', text: 'x² - 3x - 10 = 0', math: 'x^2 - 3x - 10 = 0' },
      { key: 'C', text: 'x² - 3x + 10 = 0', math: 'x^2 - 3x + 10 = 0' },
      { key: 'D', text: 'x² + 7x + 10 = 0', math: 'x^2 + 7x + 10 = 0' },
      { key: 'E', text: 'x² - 7x - 10 = 0', math: 'x^2 - 7x - 10 = 0' },
    ],
    correctAnswer: 'B',
    acceptedAnswers: ['B', 'b'],
    hint: 'Gunakan $(x - x_1)(x - x_2) = 0$ atau $x^2 - (x_1 + x_2)x + x_1x_2 = 0$.',
    explanation:
      'Hitung jumlah dan hasil kali kedua akar:\n$$\\begin{aligned}\nx_1 + x_2 &= -2 + 5 \\\\\n&= 3 \\\\\nx_1 x_2 &= (-2)(5) \\\\\n&= -10\n\\end{aligned}$$\nSusun persamaan kuadrat baru:\n$$\\begin{aligned}\nx^2 - (x_1 + x_2)x + x_1 x_2 &= 0 \\\\\nx^2 - 3x - 10 &= 0\n\\end{aligned}$$\nJawaban: B.',
  },
  {
    id: 'pa-9',
    number: 9,
    isOptional: false,
    points: 10,
    cognitiveLevel: 'Standar TKA',
    categoryTag: 'Menyusun PK Berelasi',
    question:
      'Jika $x_1$ dan $x_2$ adalah akar-akar persamaan kuadrat berikut, maka persamaan kuadrat yang akar-akarnya $(x_1 + 2)$ dan $(x_2 + 2)$ adalah...',
    mathPrompt: 'x^2 - 5x + 3 = 0',
    type: 'choice',
    options: [
      { key: 'A', text: 'x² + 9x + 17 = 0', math: 'x^2 + 9x + 17 = 0' },
      { key: 'B', text: 'x² - 7x + 13 = 0', math: 'x^2 - 7x + 13 = 0' },
      { key: 'C', text: 'x² - 9x - 17 = 0', math: 'x^2 - 9x - 17 = 0' },
      { key: 'D', text: 'x² - 11x + 21 = 0', math: 'x^2 - 11x + 21 = 0' },
      { key: 'E', text: 'x² - 9x + 17 = 0', math: 'x^2 - 9x + 17 = 0' },
    ],
    correctAnswer: 'E',
    acceptedAnswers: ['E', 'e'],
    hint: 'Jumlah akar baru $= (x_1 + x_2) + 4$; hasil kali akar baru $= x_1x_2 + 2(x_1 + x_2) + 4$.',
    explanation:
      'Dari persamaan awal $x^2 - 5x + 3 = 0$, diperoleh:\n$$\\begin{aligned}\nx_1 + x_2 &= 5 \\\\\nx_1 x_2 &= 3\n\\end{aligned}$$\nJumlah akar baru:\n$$\\begin{aligned}\n\\alpha + \\beta &= (x_1 + 2) + (x_2 + 2) \\\\\n&= (x_1 + x_2) + 4 \\\\\n&= 5 + 4 \\\\\n&= 9\n\\end{aligned}$$\nHasil kali akar baru:\n$$\\begin{aligned}\n\\alpha\\beta &= (x_1 + 2)(x_2 + 2) \\\\\n&= x_1 x_2 + 2(x_1 + x_2) + 4 \\\\\n&= 3 + 2(5) + 4 \\\\\n&= 3 + 10 + 4 \\\\\n&= 17\n\\end{aligned}$$\nPersamaan kuadrat baru:\n$$\\begin{aligned}\nx^2 - (\\alpha + \\beta)x + \\alpha\\beta &= 0 \\\\\nx^2 - 9x + 17 &= 0\n\\end{aligned}$$\nJawaban: E.',
  },
  {
    id: 'pa-10',
    number: 10,
    isOptional: false,
    points: 10,
    cognitiveLevel: 'Standar SNBT',
    categoryTag: 'Stimulus Geometri & K3: Teorema Pythagoras',
    stimulus: {
      tag: 'STIMULUS LITERASI & NUMERASI: KESELAMATAN KONSTRUKSI (K3)',
      title: 'Pemasangan Tangga Kerja Perancah Perawatan Gedung',
      text: 'Seorang teknisi pemeliharaan gedung menyandarkan tangga darurat sepanjang $17$ meter ke dinding vertikal untuk menjangkau titik instalasi panel atap. Agar posisi tangga stabil dan mengikuti prosedur keselamatan kerja, ketinggian ujung atas tangga di dinding ($t$) dirancang lebih tinggi $7$ meter dibandingkan jarak tumpuan kaki tangga ke pangkal dinding di lantai ($x$). Posisi tangga, dinding, dan lantai datar membentuk segitiga siku-siku seperti tampak pada diagram.',
      source: 'Buku Saku K3 Teknik Sipil & Arsitektur',
    },
    diagramType: 'tangga',
    diagramConfig: {
      panjangTangga: '17 m',
      tinggiLabel: 't',
      jarakLabel: 'x',
    },
    question:
      'Berdasarkan sketsa dan spesifikasi di atas, tentukan tinggi jangkauan ujung tangga ($t$) pada dinding gedung tersebut!',
    type: 'choice',
    options: [
      { key: 'A', text: '8 m' },
      { key: 'B', text: '10 m' },
      { key: 'C', text: '15 m' },
      { key: 'D', text: '12 m' },
      { key: 'E', text: '17 m' },
    ],
    correctAnswer: 'C',
    acceptedAnswers: ['C', 'c'],
    hint: 'Nyatakan $t = x + 7$, lalu terapkan teorema Pythagoras pada segitiga siku-siku untuk mencari nilai $x$ positif.',
    explanation:
      'Misalkan jarak tumpuan kaki tangga ke dinding adalah $x$ meter, maka tinggi dinding adalah $t = (x + 7)$ meter.\nBerdasarkan Teorema Pythagoras:\n$$\\begin{aligned}\nx^2 + (x + 7)^2 &= 17^2 \\\\\nx^2 + x^2 + 14x + 49 &= 289 \\\\\n2x^2 + 14x + 49 - 289 &= 0 \\\\\n2x^2 + 14x - 240 &= 0 \\\\\nx^2 + 7x - 120 &= 0 \\\\\n(x + 15)(x - 8) &= 0\n\\end{aligned}$$\nDiperoleh $x = -15$ (tidak memenuhi) atau $x = 8$ meter.\nMaka tinggi dinding yang dicapai ujung tangga:\n$$\\begin{aligned}\nt &= x + 7 \\\\\n&= 8 + 7 \\\\\n&= 15\\text{ meter}\n\\end{aligned}$$\nJawaban: C.',
  },
];

/* ==========================================================================
   PAKET B (Belajar Mandiri di Rumah - Auto-check & Kunci Pembahasan)
   ========================================================================== */
export const paketBData: UHQuestion[] = [
  {
    id: 'pb-1',
    number: 1,
    isOptional: false,
    points: 10,
    cognitiveLevel: 'Dasar',
    categoryTag: 'Pemfaktoran',
    question: 'Tentukan akar-akar persamaan kuadrat berikut dengan metode pemfaktoran!',
    mathPrompt: '2x^2 - 7x + 3 = 0',
    type: 'choice',
    options: [
      { key: 'A', text: 'x = 1/2 atau x = 3', math: 'x = \\frac{1}{2} \\text{ atau } x = 3' },
      { key: 'B', text: 'x = -1/2 atau x = -3', math: 'x = -\\frac{1}{2} \\text{ atau } x = -3' },
      { key: 'C', text: 'x = 1/2 atau x = -3', math: 'x = \\frac{1}{2} \\text{ atau } x = -3' },
      { key: 'D', text: 'x = 2 atau x = 3', math: 'x = 2 \\text{ atau } x = 3' },
      { key: 'E', text: 'x = 1/3 atau x = 2', math: 'x = \\frac{1}{3} \\text{ atau } x = 2' },
    ],
    correctAnswer: 'A',
    acceptedAnswers: ['A', 'a'],
    hint: 'Gunakan metode ac: cari dua bilangan yang hasil kalinya $a \\cdot c = 2 \\cdot 3 = 6$ dan jumlahnya $-7$, yaitu $-1$ dan $-6$.',
    explanation:
      'Faktorkan dengan pengelompokan suku tengah ($p = -1$ dan $q = -6$):\n$$\\begin{aligned}\n2x^2 - 7x + 3 &= 0 \\\\\n2x^2 - x - 6x + 3 &= 0 \\\\\nx(2x - 1) - 3(2x - 1) &= 0 \\\\\n(2x - 1)(x - 3) &= 0\n\\end{aligned}$$\nPembuat nol masing-masing faktor:\n$$\\begin{aligned}\n2x - 1 &= 0 \\\\\nx_1 &= \\frac{1}{2}\n\\end{aligned}$$\natau\n$$\\begin{aligned}\nx - 3 &= 0 \\\\\nx_2 &= 3\n\\end{aligned}$$\nJawaban: A.',
  },
  {
    id: 'pb-2',
    number: 2,
    isOptional: false,
    points: 10,
    cognitiveLevel: 'Dasar',
    categoryTag: 'Rumus ABC / Kuadrat Sempurna',
    question:
      'Tentukan akar-akar dari persamaan kuadrat berikut dengan menggunakan rumus Al-Khawarizmi (ABC) atau melengkapkan kuadrat sempurna!',
    mathPrompt: 'x^2 - 4x - 3 = 0',
    type: 'choice',
    options: [
      { key: 'A', text: 'x = -2 ± √7', math: 'x = -2 \\pm \\sqrt{7}' },
      { key: 'B', text: 'x = 2 ± √7', math: 'x = 2 \\pm \\sqrt{7}' },
      { key: 'C', text: 'x = 4 ± √28', math: 'x = 4 \\pm \\sqrt{28}' },
      { key: 'D', text: 'x = 2 ± √10', math: 'x = 2 \\pm \\sqrt{10}' },
      { key: 'E', text: 'x = 2 ± √3', math: 'x = 2 \\pm \\sqrt{3}' },
    ],
    correctAnswer: 'B',
    acceptedAnswers: ['B', 'b'],
    hint: 'Gunakan $(x - 2)^2 = 7$ atau rumus ABC $x_{1,2} = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$ dengan $a = 1$, $b = -4$, $c = -3$.',
    explanation:
      'Cara 1 — Melengkapkan kuadrat sempurna:\n$$\\begin{aligned}\nx^2 - 4x - 3 &= 0 \\\\\nx^2 - 4x &= 3 \\\\\nx^2 - 4x + (-2)^2 &= 3 + (-2)^2 \\\\\n(x - 2)^2 &= 7 \\\\\nx - 2 &= \\pm\\sqrt{7} \\\\\nx &= 2 \\pm \\sqrt{7}\n\\end{aligned}$$\n\nCara 2 — Rumus Al-Khawarizmi (ABC) dengan $a = 1$, $b = -4$, $c = -3$:\n$$\\begin{aligned}\nx_{1,2} &= \\frac{-(-4) \\pm \\sqrt{(-4)^2 - 4(1)(-3)}}{2(1)} \\\\\n&= \\frac{4 \\pm \\sqrt{16 + 12}}{2} \\\\\n&= \\frac{4 \\pm \\sqrt{28}}{2} \\\\\n&= \\frac{4 \\pm 2\\sqrt{7}}{2} \\\\\n&= 2 \\pm \\sqrt{7}\n\\end{aligned}$$\nJawaban: B.',
  },
  {
    id: 'pb-3',
    number: 3,
    isOptional: false,
    points: 10,
    cognitiveLevel: 'Dasar',
    categoryTag: 'Substitusi Solusi Akar',
    question:
      'Jika salah satu akar persamaan kuadrat berikut adalah $x = -2$, tentukan nilai $a$!',
    mathPrompt: 'ax^2 + 5x - 6 = 0',
    type: 'choice',
    options: [
      { key: 'A', text: '2' },
      { key: 'B', text: '3' },
      { key: 'C', text: '4' },
      { key: 'D', text: '5' },
      { key: 'E', text: '6' },
    ],
    correctAnswer: 'C',
    acceptedAnswers: ['C', 'c'],
    hint: 'Substitusikan $x = -2$ ke persamaan: $a(-2)^2 + 5(-2) - 6 = 0$.',
    explanation:
      'Substitusikan $x = -2$ ke dalam persamaan:\n$$\\begin{aligned}\na(-2)^2 + 5(-2) - 6 &= 0 \\\\\n4a - 10 - 6 &= 0 \\\\\n4a - 16 &= 0 \\\\\n4a &= 16 \\\\\na &= 4\n\\end{aligned}$$\nJawaban: C.',
  },
  {
    id: 'pb-4',
    number: 4,
    isOptional: false,
    points: 10,
    cognitiveLevel: 'Standar TKA',
    categoryTag: 'Diskriminan Akar Kembar',
    question:
      'Tentukan nilai $m$ ($m \\neq 0$) agar persamaan kuadrat berikut memiliki akar-akar riil kembar!',
    mathPrompt: 'mx^2 - 2mx + 3 = 0',
    type: 'choice',
    options: [
      { key: 'A', text: '1' },
      { key: 'B', text: '2' },
      { key: 'C', text: '4' },
      { key: 'D', text: '3' },
      { key: 'E', text: '6' },
    ],
    correctAnswer: 'D',
    acceptedAnswers: ['D', 'd'],
    hint: 'Gunakan $D = (-2m)^2 - 4(m)(3) = 0$.',
    explanation:
      'Identifikasi koefisien: $a = m$, $b = -2m$, dan $c = 3$. Syarat akar kembar ($D = 0$):\n$$\\begin{aligned}\nb^2 - 4ac &= 0 \\\\\n(-2m)^2 - 4(m)(3) &= 0 \\\\\n4m^2 - 12m &= 0 \\\\\n4m(m - 3) &= 0\n\\end{aligned}$$\nKarena disyaratkan $m \\neq 0$, maka $m = 3$.\nJawaban: D.',
  },
  {
    id: 'pb-5',
    number: 5,
    isOptional: false,
    points: 10,
    cognitiveLevel: 'Dasar',
    categoryTag: 'Teorema Vieta',
    question:
      'Jika $\\alpha$ dan $\\beta$ adalah akar-akar persamaan kuadrat berikut, tentukan nilai dari $2\\alpha + 2\\beta + 3\\alpha\\beta$!',
    mathPrompt: '3x^2 - 9x + 4 = 0',
    type: 'choice',
    options: [
      { key: 'A', text: '6' },
      { key: 'B', text: '8' },
      { key: 'C', text: '12' },
      { key: 'D', text: '14' },
      { key: 'E', text: '10' },
    ],
    correctAnswer: 'E',
    acceptedAnswers: ['E', 'e'],
    hint: '$\\alpha + \\beta = \\frac{9}{3} = 3$ dan $\\alpha\\beta = \\frac{4}{3}$. Hitung $2(\\alpha + \\beta) + 3(\\alpha\\beta)$.',
    explanation:
      'Berdasarkan Teorema Vieta:\n$$\\begin{aligned}\n\\alpha + \\beta &= -\\frac{-9}{3} \\\\\n&= 3 \\\\\n\\alpha\\beta &= \\frac{4}{3}\n\\end{aligned}$$\nSubstitusikan ke bentuk yang ditanyakan:\n$$\\begin{aligned}\n2\\alpha + 2\\beta + 3\\alpha\\beta &= 2(\\alpha + \\beta) + 3(\\alpha\\beta) \\\\\n&= 2(3) + 3\\left(\\frac{4}{3}\\right) \\\\\n&= 6 + 4 \\\\\n&= 10\n\\end{aligned}$$\nJawaban: E.',
  },
  {
    id: 'pb-6',
    number: 6,
    isOptional: false,
    points: 10,
    cognitiveLevel: 'Standar TKA',
    categoryTag: 'Jumlah Kuadrat Akar',
    question:
      'Persamaan kuadrat berikut memiliki akar-akar $p$ dan $q$. Tentukan nilai dari $p^2 + q^2$!',
    mathPrompt: '2x^2 - 8x + 3 = 0',
    type: 'choice',
    options: [
      { key: 'A', text: '13' },
      { key: 'B', text: '10' },
      { key: 'C', text: '11' },
      { key: 'D', text: '12' },
      { key: 'E', text: '14' },
    ],
    correctAnswer: 'A',
    acceptedAnswers: ['A', 'a'],
    hint: 'Gunakan $p^2 + q^2 = (p + q)^2 - 2pq$. Dari persamaan, $p + q = \\frac{8}{2} = 4$ dan $pq = \\frac{3}{2}$.',
    explanation:
      'Dari persamaan $2x^2 - 8x + 3 = 0$, diperoleh:\n$$\\begin{aligned}\np + q &= \\frac{8}{2} \\\\\n&= 4 \\\\\npq &= \\frac{3}{2}\n\\end{aligned}$$\nSubstitusikan ke identitas jumlah kuadrat akar:\n$$\\begin{aligned}\np^2 + q^2 &= (p + q)^2 - 2pq \\\\\n&= (4)^2 - 2\\left(\\frac{3}{2}\\right) \\\\\n&= 16 - 3 \\\\\n&= 13\n\\end{aligned}$$\nJawaban: A.',
  },
  {
    id: 'pb-7',
    number: 7,
    isOptional: false,
    points: 10,
    cognitiveLevel: 'Standar TKA',
    categoryTag: 'Stimulus Numerasi: Relasi Selisih Akar',
    stimulus: {
      tag: 'STIMULUS NUMERASI: RISET AERODINAMIKA ROKET AIR',
      title: 'Uji Durasi Ketinggian Lontaran Vertikal',
      text: 'Dalam uji balistik vertikal di lapangan terbuka, waktu tempuh $t$ (detik) wahana uji memenuhi persamaan gerak $t^2 - 7t + k = 0$, dengan $k$ menyatakan parameter hambatan udara. Alat pencatat optik merekam wahana melintasi garis batas observasi pada dua waktu berbeda, $t_1$ dan $t_2$, dengan selisih waktu terukur sebesar $|t_1 - t_2| = 3$ detik.',
      source: 'Data Observasi Sensor Optik Balistik Sekolah',
    },
    question:
      'Berdasarkan informasi di atas, tentukan nilai koefisien parameter hambatan $k$ yang memenuhi persamaan tersebut!',
    mathPrompt: 't^2 - 7t + k = 0',
    type: 'choice',
    options: [
      { key: 'A', text: '6' },
      { key: 'B', text: '10' },
      { key: 'C', text: '8' },
      { key: 'D', text: '12' },
      { key: 'E', text: '14' },
    ],
    correctAnswer: 'B',
    acceptedAnswers: ['B', 'b'],
    hint: '$(t_1 - t_2)^2 = (t_1 + t_2)^2 - 4t_1t_2$. Substitusikan $t_1 + t_2 = 7$ dan $t_1t_2 = k$.',
    explanation:
      'Berdasarkan Teorema Vieta pada $t^2 - 7t + k = 0$:\n$$\\begin{aligned}\nt_1 + t_2 &= 7 \\\\\nt_1 t_2 &= k\n\\end{aligned}$$\nHubungan kuadrat selisih akar:\n$$\\begin{aligned}\n(t_1 - t_2)^2 &= (t_1 + t_2)^2 - 4t_1 t_2 \\\\\n3^2 &= 7^2 - 4k \\\\\n9 &= 49 - 4k \\\\\n4k &= 49 - 9 \\\\\n4k &= 40 \\\\\nk &= 10\n\\end{aligned}$$\nJawaban: B.',
  },
  {
    id: 'pb-8',
    number: 8,
    isOptional: false,
    points: 10,
    cognitiveLevel: 'Dasar',
    categoryTag: 'Menyusun PK Baru',
    question: 'Persamaan kuadrat yang mempunyai akar-akar berikut adalah...',
    mathPrompt: 'x_1 = -4, \\quad x_2 = 5',
    type: 'choice',
    options: [
      { key: 'A', text: 'x² + x - 20 = 0', math: 'x^2 + x - 20 = 0' },
      { key: 'B', text: 'x² + 9x - 20 = 0', math: 'x^2 + 9x - 20 = 0' },
      { key: 'C', text: 'x² - x - 20 = 0', math: 'x^2 - x - 20 = 0' },
      { key: 'D', text: 'x² + 9x + 20 = 0', math: 'x^2 + 9x + 20 = 0' },
      { key: 'E', text: 'x² + x + 20 = 0', math: 'x^2 + x + 20 = 0' },
    ],
    correctAnswer: 'C',
    acceptedAnswers: ['C', 'c'],
    hint: 'Gunakan $(x - x_1)(x - x_2) = 0$ atau $x^2 - (x_1 + x_2)x + x_1x_2 = 0$.',
    explanation:
      'Hitung jumlah dan hasil kali kedua akar:\n$$\\begin{aligned}\nx_1 + x_2 &= -4 + 5 \\\\\n&= 1 \\\\\nx_1 x_2 &= (-4)(5) \\\\\n&= -20\n\\end{aligned}$$\nSusun persamaan kuadrat baru:\n$$\\begin{aligned}\nx^2 - (x_1 + x_2)x + x_1 x_2 &= 0 \\\\\nx^2 - x - 20 &= 0\n\\end{aligned}$$\nJawaban: C.',
  },
  {
    id: 'pb-9',
    number: 9,
    isOptional: false,
    points: 10,
    cognitiveLevel: 'Standar TKA',
    categoryTag: 'Menyusun PK Berelasi',
    question:
      'Jika $x_1$ dan $x_2$ adalah akar-akar persamaan kuadrat berikut, maka persamaan kuadrat baru yang akar-akarnya $(x_1 - 3)$ dan $(x_2 - 3)$ adalah...',
    mathPrompt: 'x^2 - 2x - 1 = 0',
    type: 'choice',
    options: [
      { key: 'A', text: 'x² - 4x + 2 = 0', math: 'x^2 - 4x + 2 = 0' },
      { key: 'B', text: 'x² + 4x - 2 = 0', math: 'x^2 + 4x - 2 = 0' },
      { key: 'C', text: 'x² - 8x + 14 = 0', math: 'x^2 - 8x + 14 = 0' },
      { key: 'D', text: 'x² + 4x + 2 = 0', math: 'x^2 + 4x + 2 = 0' },
      { key: 'E', text: 'x² - 4x - 2 = 0', math: 'x^2 - 4x - 2 = 0' },
    ],
    correctAnswer: 'D',
    acceptedAnswers: ['D', 'd'],
    hint: 'Jumlah akar baru $= (x_1 + x_2) - 6$; hasil kali akar baru $= x_1x_2 - 3(x_1 + x_2) + 9$.',
    explanation:
      'Dari persamaan awal $x^2 - 2x - 1 = 0$, diperoleh:\n$$\\begin{aligned}\nx_1 + x_2 &= 2 \\\\\nx_1 x_2 &= -1\n\\end{aligned}$$\nJumlah akar baru:\n$$\\begin{aligned}\n\\alpha + \\beta &= (x_1 - 3) + (x_2 - 3) \\\\\n&= (x_1 + x_2) - 6 \\\\\n&= 2 - 6 \\\\\n&= -4\n\\end{aligned}$$\nHasil kali akar baru:\n$$\\begin{aligned}\n\\alpha\\beta &= (x_1 - 3)(x_2 - 3) \\\\\n&= x_1 x_2 - 3(x_1 + x_2) + 9 \\\\\n&= -1 - 3(2) + 9 \\\\\n&= -1 - 6 + 9 \\\\\n&= 2\n\\end{aligned}$$\nMaka persamaan kuadrat baru:\n$$\\begin{aligned}\nx^2 - (\\alpha + \\beta)x + \\alpha\\beta &= 0 \\\\\nx^2 - (-4)x + 2 &= 0 \\\\\nx^2 + 4x + 2 &= 0\n\\end{aligned}$$\nJawaban: D.',
  },
  {
    id: 'pb-10',
    number: 10,
    isOptional: false,
    points: 10,
    cognitiveLevel: 'Standar SNBT',
    categoryTag: 'Stimulus Numerasi: Pemodelan Luas Persegi Panjang',
    stimulus: {
      tag: 'STIMULUS LITERASI & NUMERASI: PEMODELAN LUAS LAHAN',
      title: 'Taman Baca di Lahan Persegi Panjang',
      text: 'Panitia OSIS merencanakan taman baca di sebidang lahan berbentuk persegi panjang. Panjang lahan tersebut $4$ meter lebih dari lebarnya, sedangkan luas lahan yang tersedia $96\\text{ m}^2$. Sebelum memasang pagar keliling, panitia perlu memastikan ukuran panjang lahan.',
      source: 'Proposal Proyek Taman Baca Sekolah',
    },
    diagramType: 'persegi-panjang',
    persegiPanjangConfig: { selisihLabel: '4 m', luasLabel: '96 m²' },
    question:
      'Berdasarkan informasi di atas, tentukan panjang lahan taman baca tersebut (dalam meter)!',
    type: 'choice',
    options: [
      { key: 'A', text: '8 m' },
      { key: 'B', text: '10 m' },
      { key: 'C', text: '14 m' },
      { key: 'D', text: '16 m' },
      { key: 'E', text: '12 m' },
    ],
    correctAnswer: 'E',
    acceptedAnswers: ['E', 'e'],
    hint: 'Misalkan lebar $= l$ meter. Nyatakan panjang dalam $l$, lalu gunakan rumus luas persegi panjang. Jangan lupa bahwa ukuran harus positif.',
    explanation:
      'Misalkan lebar lahan $= l$ meter, maka panjang lahan $= (l + 4)$ meter.\nBerdasarkan luas persegi panjang:\n$$\\begin{aligned}\nl(l + 4) &= 96 \\\\\nl^2 + 4l - 96 &= 0 \\\\\n(l + 12)(l - 8) &= 0\n\\end{aligned}$$\nDiperoleh $l = -12$ (tidak memenuhi) atau $l = 8$ meter.\nMaka panjang lahan taman baca:\n$$\\begin{aligned}\np &= l + 4 \\\\\n&= 8 + 4 \\\\\n&= 12\\text{ meter}\n\\end{aligned}$$\nJawaban: E.',
  },
];
