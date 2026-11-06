export interface UHStimulus {
  tag: string;
  title: string;
  text: string;
  source?: string;
}

export interface UHQuestion {
  id: string;
  number: number;
  isOptional: boolean;
  points: number; // 10 untuk wajib, 5 untuk opsional
  cognitiveLevel: 'Dasar' | 'Standar TKA' | 'Standar SNBT' | 'Problem Solving SNBT';
  categoryTag: string;
  stimulus?: UHStimulus;
  diagramType?: 'tangga';
  diagramConfig?: {
    panjangTangga: string;
    tinggiLabel: string;
    jarakLabel: string;
  };
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
 * - Dirender oleh komponen <MathText /> sehingga seluruh rumus memakai KaTeX.
 */

/* ==========================================================================
   ULANGAN HARIAN (10 Wajib @ 10 Poin, 2 Opsional @ 5 Poin Bonus)
   ========================================================================== */
export const uhQuestionsData: UHQuestion[] = [
  {
    id: 'uh-1',
    number: 1,
    isOptional: false,
    points: 10,
    cognitiveLevel: 'Dasar',
    categoryTag: 'Pemfaktoran',
    question: 'Tentukan himpunan penyelesaian dari persamaan kuadrat berikut menggunakan metode pemfaktoran!',
    mathPrompt: 'x^2 - 8x + 12 = 0',
    type: 'text',
    correctAnswer: '2 atau 6',
    acceptedAnswers: [
      '2 atau 6',
      '6 atau 2',
      '2, 6',
      '6, 2',
      '2,6',
      '6,2',
      '{2, 6}',
      '{6, 2}',
      'x = 2 atau x = 6',
      'x=2 atau x=6',
      '2 dan 6',
    ],
    hint: 'Cari dua bilangan yang jika dikalikan menghasilkan $12$ dan jika dijumlahkan menghasilkan $-8$.',
    explanation:
      'Faktorkan menjadi $(x - 2)(x - 6) = 0$. Diperoleh $x - 2 = 0 \\implies x_1 = 2$ atau $x - 6 = 0 \\implies x_2 = 6$. Himpunan penyelesaiannya adalah $\\{2, 6\\}$.',
  },
  {
    id: 'uh-2',
    number: 2,
    isOptional: false,
    points: 10,
    cognitiveLevel: 'Dasar',
    categoryTag: 'Rumus Al-Khawarizmi (ABC)',
    question:
      'Akar-akar dari persamaan kuadrat berikut jika diselesaikan dengan rumus Al-Khawarizmi (Rumus ABC) adalah...',
    mathPrompt: 'x^2 - 4x - 1 = 0',
    type: 'choice',
    options: [
      { key: 'A', text: 'x = -2 ± √5', math: 'x = -2 \\pm \\sqrt{5}' },
      { key: 'B', text: 'x = 4 ± √20', math: 'x = 4 \\pm \\sqrt{20}' },
      { key: 'C', text: 'x = 2 ± √5', math: 'x = 2 \\pm \\sqrt{5}' },
      { key: 'D', text: 'x = 2 ± √3', math: 'x = 2 \\pm \\sqrt{3}' },
    ],
    correctAnswer: 'C',
    acceptedAnswers: ['C', 'c'],
    hint: '$a = 1$, $b = -4$, $c = -1$. Gunakan $x_{1,2} = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$.',
    explanation:
      '$a = 1$, $b = -4$, $c = -1$.\n$$x_{1,2} = \\frac{4 \\pm \\sqrt{(-4)^2 - 4(1)(-1)}}{2}$$\n$$= \\frac{4 \\pm \\sqrt{20}}{2} = \\frac{4 \\pm 2\\sqrt{5}}{2}$$\n$$= 2 \\pm \\sqrt{5}$$\nJawaban yang benar adalah C.',
  },
  {
    id: 'uh-3',
    number: 3,
    isOptional: false,
    points: 10,
    cognitiveLevel: 'Dasar',
    categoryTag: 'Substitusi Solusi Akar',
    question:
      'Diketahui salah satu akar dari persamaan kuadrat berikut adalah $x = 3$. Tentukan nilai konstanta $c$!',
    mathPrompt: '2x^2 - 5x + c = 0',
    type: 'text',
    correctAnswer: '-3',
    acceptedAnswers: ['-3', 'c = -3', 'c=-3', '- 3'],
    hint: 'Substitusikan nilai $x = 3$ langsung ke dalam setiap variabel $x$ pada persamaan.',
    explanation:
      'Substitusi $x = 3$:\n$$2(3)^2 - 5(3) + c = 0$$\n$$\\implies 18 - 15 + c = 0$$\n$$\\implies 3 + c = 0$$\n$$\\implies c = -3$$',
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
    type: 'text',
    correctAnswer: '6',
    acceptedAnswers: ['6', 'p = 6', 'p=6', '6.0'],
    hint: 'Syarat dua akar kembar adalah $D = b^2 - 4ac = 0$.',
    explanation:
      '$a = 1$, $b = -p$, $c = p + 3$.\n$$D = (-p)^2 - 4(1)(p + 3)$$\n$$= p^2 - 4p - 12 = 0$$\n$$(p - 6)(p + 2) = 0$$\n$$\\implies p = 6 \\text{ atau } p = -2$$\nKarena diminta nilai positif, maka $p = 6$.',
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
    type: 'text',
    correctAnswer: '21',
    acceptedAnswers: ['21', '21.0'],
    hint: 'Gunakan $x_1 + x_2 = -\\frac{b}{a}$ dan $x_1x_2 = \\frac{c}{a}$, lalu hitung $4(x_1 + x_2) + 2x_1x_2$.',
    explanation:
      '$x_1 + x_2 = \\frac{8}{2} = 4$ dan $x_1x_2 = \\frac{5}{2}$.\n$$4(x_1 + x_2) + 2x_1x_2 = 4(4) + 2\\left(\\frac{5}{2}\\right)$$\n$$= 16 + 5 = 21$$',
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
    type: 'text',
    correctAnswer: '40',
    acceptedAnswers: ['40', '40.0'],
    hint: 'Gunakan identitas aljabar: $\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 - 2\\alpha\\beta$.',
    explanation:
      'Dari persamaan diperoleh $\\alpha + \\beta = 6$ dan $\\alpha\\beta = -2$.\n$$\\alpha^2 + \\beta^2 = (6)^2 - 2(-2)$$\n$$= 36 + 4 = 40$$',
  },
  {
    id: 'uh-7',
    number: 7,
    isOptional: false,
    points: 10,
    cognitiveLevel: 'Standar TKA',
    categoryTag: 'Stimulus Numerasi: Relasi Selisih Akar',
    stimulus: {
      tag: 'STIMULUS NUMERASI: MISI LOGISTIK DRONE OTONOM',
      title: 'Zona Pantau Waktu Transit Drone Medis',
      text: 'Sebuah drone otonom pengantar bantuan medis diterbangkan melewati jalur perbukitan. Sistem telemetri mendeteksi waktu tempuh $t$ (dalam detik) saat drone melintasi batas ketinggian zona kritis memenuhi persamaan kuadrat $t^2 - mt + 16 = 0$, dengan $m$ adalah parameter daya dorong mesin ($m > 0$). Radar mencatat drone memasuki dan meninggalkan zona tersebut pada waktu $t_1 = p$ dan $t_2 = q$ dengan selisih waktu transit $p - q = 6$ detik.',
      source: 'Telemetri Sistem Navigasi Drone Cepat Tanggap',
    },
    question:
      'Berdasarkan catatan telemetri radar di atas, tentukan nilai parameter daya dorong $m$ (dengan $m > 0$) yang memenuhi persamaan tersebut!',
    mathPrompt: 't^2 - mt + 16 = 0 \\\\ p - q = 6, \\quad m > 0',
    type: 'text',
    correctAnswer: '10',
    acceptedAnswers: ['10', 'm = 10', 'm=10', '10.0'],
    hint: '$p + q = m$ dan $pq = 16$. Gunakan identitas selisih akar: $(p - q)^2 = (p + q)^2 - 4pq$.',
    explanation:
      'Berdasarkan teorema Vieta: $p + q = m$ dan $pq = 16$.\n\n$$(p - q)^2 = (p + q)^2 - 4pq$$\n$$6^2 = m^2 - 4(16)$$\n$$\\implies 36 = m^2 - 64$$\n$$\\implies m^2 = 100$$\n$$\\implies m = \\pm 10$$\nKarena disyaratkan parameter daya dorong $m > 0$, maka $m = 10$.',
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
    ],
    correctAnswer: 'D',
    acceptedAnswers: ['D', 'd'],
    hint: 'Gunakan $(x - x_1)(x - x_2) = 0$ atau $x^2 - (x_1 + x_2)x + x_1x_2 = 0$.',
    explanation:
      '$x_1 + x_2 = -5 + 3 = -2$ dan $x_1x_2 = (-5)(3) = -15$.\n$$x^2 - (-2)x + (-15) = 0$$\n$$\\implies x^2 + 2x - 15 = 0$$\nJawaban: D.',
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
    mathPrompt: 'x^2 - 4x + 2 = 0',
    type: 'choice',
    options: [
      { key: 'A', text: 'x² + 10x + 23 = 0', math: 'x^2 + 10x + 23 = 0' },
      { key: 'B', text: 'x² - 10x + 23 = 0', math: 'x^2 - 10x + 23 = 0' },
      { key: 'C', text: 'x² - 10x - 23 = 0', math: 'x^2 - 10x - 23 = 0' },
      { key: 'D', text: 'x² - 7x + 14 = 0', math: 'x^2 - 7x + 14 = 0' },
    ],
    correctAnswer: 'B',
    acceptedAnswers: ['B', 'b'],
    hint: 'Jumlah akar baru $= (x_1 + x_2) + 6$; hasil kali akar baru $= x_1x_2 + 3(x_1 + x_2) + 9$.',
    explanation:
      '$x_1 + x_2 = 4$ dan $x_1x_2 = 2$. Akar baru $\\alpha = x_1 + 3$ dan $\\beta = x_2 + 3$.\n$$\\alpha + \\beta = 4 + 6 = 10$$\n$$\\alpha\\beta = 2 + 3(4) + 9 = 23$$\n$$x^2 - 10x + 23 = 0$$\nJawaban: B.',
  },
  {
    id: 'uh-10',
    number: 10,
    isOptional: false,
    points: 10,
    cognitiveLevel: 'Standar SNBT',
    categoryTag: 'Stimulus Geometri & K3: Teorema Pythagoras',
    stimulus: {
      tag: 'STIMULUS LITERASI & NUMERASI: KESELAMATAN KONSTRUKSI (K3)',
      title: 'Standar Penempatan Tangga Penyelamatan Gedung',
      text: 'Dalam prosedur simulasi keselamatan darurat gedung, teknisi menyandarkan tangga darurat berjangkauan $20$ meter pada dinding beton vertikal. Agar tumpuan kokoh dan aman dinaiki, ketinggian vertikal ujung atas tangga di dinding ($t$) disyaratkan lebih tinggi $4$ meter dibanding jarak horizontal tapak kaki tangga ke dasar dinding ($x$). Posisi tangga, dinding, dan lantai datar membentuk segitiga siku-siku seperti tampak pada diagram teknis berikut.',
      source: 'Panduan Operasional Teknis K3 & Evakuasi Bangunan',
    },
    diagramType: 'tangga',
    diagramConfig: {
      panjangTangga: '20 m',
      tinggiLabel: 't = x + 4 m',
      jarakLabel: 'x m',
    },
    question:
      'Berdasarkan spesifikasi regulasi dan diagram teknis di atas, hitunglah tinggi tembok yang dicapai oleh ujung tangga tersebut (dalam satuan meter)!',
    mathPrompt: 'x^2 + (x + 4)^2 = 20^2 \\\\ t = x + 4',
    type: 'text',
    correctAnswer: '16',
    acceptedAnswers: ['16', '16 m', '16m', '16 meter', 't = 16', 't=16', '16.0'],
    hint: 'Gunakan dalil Pythagoras: $x^2 + (x + 4)^2 = 20^2$. Sederhanakan ke persamaan kuadrat, cari nilai $x$ positif, lalu hitung $t = x + 4$.',
    explanation:
      'Misalkan jarak tapak kaki tangga ke dinding $= x$ meter. Maka tinggi tembok $= (x + 4)$ meter.\n\nDalil Pythagoras:\n$$x^2 + (x + 4)^2 = 20^2$$\n$$2x^2 + 8x + 16 = 400$$\n$$\\implies 2x^2 + 8x - 384 = 0$$\n$$\\implies x^2 + 4x - 192 = 0$$\n$$(x + 16)(x - 12) = 0$$\nDiperoleh $x = 12$ meter (karena jarak bernilai positif). Maka tinggi tembok yang dijangkau ujung tangga:\n$$t = x + 4 = 12 + 4 = 16 \\text{ meter}$$',
  },
  {
    id: 'uh-11',
    number: 11,
    isOptional: true,
    points: 5,
    cognitiveLevel: 'Problem Solving SNBT',
    categoryTag: 'Pecahan Rasional Kuadrat',
    question:
      '[OPSIONAL/BONUS +5] Tentukan himpunan nilai $x$ bilangan riil yang memenuhi persamaan berikut (syarat $x \\neq 3$)!',
    mathPrompt: '\\frac{4x + 1}{x - 3} = x + \\frac{11}{x - 3}',
    type: 'text',
    correctAnswer: '2 atau 5',
    acceptedAnswers: [
      '2 atau 5',
      '5 atau 2',
      '2, 5',
      '5, 2',
      '2,5',
      '5,2',
      '{2, 5}',
      '{5, 2}',
      'x = 2 atau x = 5',
      '2 dan 5',
      'x=2 atau x=5',
    ],
    hint: 'Pindahkan $\\frac{11}{x - 3}$ ke ruas kiri sehingga pecahan dapat dikurangkan langsung, lalu kalikan kedua ruas dengan $(x - 3)$.',
    explanation:
      '$$\\frac{4x + 1 - 11}{x - 3} = x$$\n$$\\implies \\frac{4x - 10}{x - 3} = x$$\n$$\\implies 4x - 10 = x(x - 3)$$\n$$4x - 10 = x^2 - 3x$$\n$$\\implies x^2 - 7x + 10 = 0$$\n$$\\implies (x - 2)(x - 5) = 0$$\nDiperoleh $x = 2$ atau $x = 5$. Keduanya memenuhi syarat batas $x \\neq 3$.',
  },
  {
    id: 'uh-12',
    number: 12,
    isOptional: true,
    points: 5,
    cognitiveLevel: 'Problem Solving SNBT',
    categoryTag: 'Kecukupan Data SNBT (Data Sufficiency)',
    question:
      '[OPSIONAL/BONUS +5] Diberikan persamaan kuadrat $x^2 + bx + c = 0$ dengan akar-akar bilangan riil $r$ dan $s$. Apakah $r + s > 0$? Putuskan apakah pernyataan (1) dan (2) berikut cukup untuk menjawab pertanyaan:\n(1) $b < 0$\n(2) $c > 0$',
    mathPrompt: 'x^2 + bx + c = 0 \\\\ r + s > 0?',
    type: 'choice',
    options: [
      { key: 'A', text: 'Pernyataan (1) SAJA cukup untuk menjawab pertanyaan, tetapi pernyataan (2) SAJA tidak cukup.' },
      { key: 'B', text: 'Pernyataan (2) SAJA cukup untuk menjawab pertanyaan, tetapi pernyataan (1) SAJA tidak cukup.' },
      { key: 'C', text: 'DUA pernyataan BERSAMA-SAMA cukup untuk menjawab pertanyaan, tetapi SATU pernyataan SAJA tidak cukup.' },
      { key: 'D', text: 'Pernyataan (1) SAJA cukup untuk menjawab pertanyaan dan pernyataan (2) SAJA cukup.' },
      { key: 'E', text: 'Pernyataan (1) dan pernyataan (2) tidak cukup untuk menjawab pertanyaan.' },
    ],
    correctAnswer: 'A',
    acceptedAnswers: ['A', 'a'],
    hint: 'Ingat bahwa jumlah akar $r + s = -\\frac{b}{a} = -b$. Maka pertanyaan "Apakah $r + s > 0$?" setara dengan "Apakah $b < 0$?".',
    explanation:
      'Berdasarkan teorema Vieta, $r + s = -b$. Maka pertanyaan "Apakah $r + s > 0$?" ekuivalen dengan "Apakah $b < 0$?".\n\n- Pernyataan (1) $b < 0$: langsung menjamin $r + s = -b > 0$. Cukup.\n- Pernyataan (2) $c > 0$: hanya memberi $rs > 0$, yaitu kedua akar bertanda sama; jumlahnya bisa positif atau negatif. Tidak cukup.\n\nJawaban yang benar adalah A.',
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
      'Faktorkan persamaan:\n$$x^2 - 11x + 24 = (x - 3)(x - 8) = 0$$\nDiperoleh:\n$$x - 3 = 0 \\implies x_1 = 3$$\n$$x - 8 = 0 \\implies x_2 = 8$$\nJawaban: A.',
  },
  {
    id: 'pa-2',
    number: 2,
    isOptional: false,
    points: 10,
    cognitiveLevel: 'Dasar',
    categoryTag: 'Rumus ABC / Kuadrat Sempurna',
    question:
      'Tentukan akar-akar persamaan kuadrat berikut dengan rumus ABC atau melengkapkan kuadrat!',
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
      'Cara 1 — melengkapkan kuadrat:\n$$x^2 - 6x + 4 = 0 \\implies x^2 - 6x = -4$$\n$$(x - 3)^2 - 9 = -4 \\implies (x - 3)^2 = 5$$\n$$x - 3 = \\pm\\sqrt{5} \\implies x = 3 \\pm \\sqrt{5}$$\n\nCara 2 — rumus ABC:\n$$x_{1,2} = \\frac{6 \\pm \\sqrt{(-6)^2 - 4(1)(4)}}{2} = \\frac{6 \\pm \\sqrt{20}}{2}$$\n$$= \\frac{6 \\pm 2\\sqrt{5}}{2} = 3 \\pm \\sqrt{5}$$\nJawaban: B.',
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
      'Substitusi $x = -1$:\n$$2(-1)^2 + b(-1) + 6 = 0$$\n$$\\implies 2 - b + 6 = 0$$\n$$\\implies b = 8$$\nJawaban: D.',
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
      '$a = 2$, $b = -8$, $c = k$.\n$$D = (-8)^2 - 4(2)(k) = 64 - 8k = 0$$\n$$\\implies k = 8$$\nJawaban: C.',
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
      '$x_1 + x_2 = \\frac{10}{2} = 5$ dan $x_1x_2 = \\frac{3}{2}$.\n$$3(x_1 + x_2) + 2x_1x_2 = 3(5) + 2\\left(\\frac{3}{2}\\right)$$\n$$= 15 + 3 = 18$$\nJawaban: E.',
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
      '$x_1 + x_2 = 7$ dan $x_1x_2 = 3$.\n$$x_1^2 + x_2^2 = (7)^2 - 2(3) = 49 - 6 = 43$$\nJawaban: A.',
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
    mathPrompt: 't^2 - 8t + p = 0 \\\\ |t_1 - t_2| = 2\\text{ detik}',
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
      'Berdasarkan teorema Vieta: $t_1 + t_2 = 8$ dan $t_1t_2 = p$.\n\nHubungan selisih kuadrat akar:\n$$(t_1 - t_2)^2 = (t_1 + t_2)^2 - 4t_1t_2$$\n$$2^2 = 8^2 - 4p$$\n$$\\implies 4 = 64 - 4p$$\n$$\\implies 4p = 60$$\n$$\\implies p = 15$$\nJadi, nilai konstanta energi $p$ adalah $15$. Jawaban: D.',
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
      '$x_1 + x_2 = -2 + 5 = 3$ dan $x_1x_2 = (-2)(5) = -10$.\n$$x^2 - (x_1 + x_2)x + x_1x_2$$\n$$= x^2 - 3x - 10 = 0$$\nJawaban: B.',
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
      '$x_1 + x_2 = 5$ dan $x_1x_2 = 3$.\n\nJumlah akar baru:\n$$(x_1 + 2) + (x_2 + 2) = (x_1 + x_2) + 4$$\n$$= 5 + 4 = 9$$\nHasil kali akar baru:\n$$(x_1 + 2)(x_2 + 2)$$\n$$= x_1x_2 + 2(x_1 + x_2) + 4$$\n$$= 3 + 10 + 4 = 17$$\n$$x^2 - 9x + 17 = 0$$\nJawaban: E.',
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
      tinggiLabel: 't = x + 7 m',
      jarakLabel: 'x m',
    },
    question:
      'Berdasarkan sketsa dan spesifikasi di atas, tentukan tinggi jangkauan ujung tangga pada dinding gedung tersebut (dalam satuan meter)!',
    mathPrompt: 'x^2 + (x + 7)^2 = 17^2 \\\\ t = x + 7',
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
    hint: 'Terapkan teorema Pythagoras: $x^2 + (x + 7)^2 = 17^2$. Sederhanakan ke bentuk umum, cari nilai $x$ positif, lalu hitung $t = x + 7$.',
    explanation:
      'Misalkan jarak tumpuan kaki tangga ke dinding $= x$ meter. Maka tinggi dinding $= (x + 7)$ meter.\n\nDalil Pythagoras:\n$$x^2 + (x + 7)^2 = 17^2$$\n$$x^2 + x^2 + 14x + 49 = 289$$\n$$2x^2 + 14x - 240 = 0$$\n$$\\implies x^2 + 7x - 120 = 0$$\n$$(x + 15)(x - 8) = 0$$\nDiperoleh $x = 8$ meter (karena jarak fisik harus positif).\nMaka tinggi dinding yang dicapai ujung tangga:\n$$t = x + 7 = 8 + 7 = 15 \\text{ meter}$$\nJawaban: C.',
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
      'Faktorkan dengan pengelompokan:\n$$2x^2 - 7x + 3 = 0$$\n$$\\implies 2x^2 - x - 6x + 3 = 0$$\n$$\\implies x(2x - 1) - 3(2x - 1) = 0$$\n$$\\implies (2x - 1)(x - 3) = 0$$\nDiperoleh:\n$$2x - 1 = 0 \\implies x = \\frac{1}{2}$$\n$$x - 3 = 0 \\implies x = 3$$\nJawaban: A.',
  },
  {
    id: 'pb-2',
    number: 2,
    isOptional: false,
    points: 10,
    cognitiveLevel: 'Dasar',
    categoryTag: 'Rumus ABC',
    question:
      'Akar-akar dari persamaan kuadrat berikut jika diselesaikan dengan rumus ABC adalah...',
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
    hint: '$a = 1$, $b = -4$, $c = -3$. Gunakan $x_{1,2} = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$.',
    explanation:
      '$$x_{1,2} = \\frac{4 \\pm \\sqrt{(-4)^2 - 4(1)(-3)}}{2}$$\n$$= \\frac{4 \\pm \\sqrt{28}}{2} = \\frac{4 \\pm 2\\sqrt{7}}{2}$$\n$$= 2 \\pm \\sqrt{7}$$\nJawaban: B.',
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
      'Substitusi $x = -2$:\n$$a(-2)^2 + 5(-2) - 6 = 0$$\n$$\\implies 4a - 10 - 6 = 0$$\n$$\\implies 4a = 16$$\n$$\\implies a = 4$$\nJawaban: C.',
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
      '$a = m$, $b = -2m$, $c = 3$.\n$$D = (-2m)^2 - 4(m)(3) = 4m^2 - 12m = 0$$\n$$4m(m - 3) = 0$$\nKarena $m \\neq 0$, maka $m = 3$.\nJawaban: D.',
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
      '$\\alpha + \\beta = \\frac{9}{3} = 3$ dan $\\alpha\\beta = \\frac{4}{3}$.\n$$2(\\alpha + \\beta) + 3\\alpha\\beta = 2(3) + 3\\left(\\frac{4}{3}\\right)$$\n$$= 6 + 4 = 10$$\nJawaban: E.',
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
      '$p + q = \\frac{8}{2} = 4$ dan $pq = \\frac{3}{2}$.\n$$p^2 + q^2 = (p + q)^2 - 2pq = (4)^2 - 2\\left(\\frac{3}{2}\\right) = 16 - 3 = 13$$\nJawaban: A.',
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
    mathPrompt: 't^2 - 7t + k = 0 \\\\ |t_1 - t_2| = 3\\text{ detik}',
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
      'Berdasarkan teorema Vieta: $t_1 + t_2 = 7$ dan $t_1t_2 = k$.\n\n$$(t_1 - t_2)^2 = (t_1 + t_2)^2 - 4t_1t_2$$\n$$3^2 = 7^2 - 4k$$\n$$\\implies 9 = 49 - 4k$$\n$$\\implies 4k = 40$$\n$$\\implies k = 10$$\nJadi, nilai parameter $k$ adalah $10$. Jawaban: B.',
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
      '$x_1 + x_2 = -4 + 5 = 1$ dan $x_1x_2 = (-4)(5) = -20$.\n$$x^2 - (x_1 + x_2)x + x_1x_2 = 0$$\n$$x^2 - x - 20 = 0$$\nJawaban: C.',
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
      '$x_1 + x_2 = 2$ dan $x_1x_2 = -1$.\n\nJumlah akar baru:\n$$(x_1 - 3) + (x_2 - 3) = (x_1 + x_2) - 6 = 2 - 6 = -4$$\nHasil kali akar baru:\n$$(x_1 - 3)(x_2 - 3) = x_1x_2 - 3(x_1 + x_2) + 9$$\n$$= -1 - 3(2) + 9 = 2$$\nMaka persamaan kuadrat baru:\n$$x^2 - (-4)x + 2 = x^2 + 4x + 2 = 0$$\nJawaban: D.',
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
      'Misalkan lebar lahan $= l$ meter. Maka panjang lahan $= (l + 4)$ meter.\n\nLuas lahan:\n$$l(l + 4) = 96$$\n$$l^2 + 4l - 96 = 0$$\n$$(l + 12)(l - 8) = 0$$\nDiperoleh $l = 8$ meter (karena lebar harus positif).\nMaka panjang lahan:\n$$p = l + 4 = 8 + 4 = 12 \\text{ meter}$$\nJawaban: E.',
  },
];
