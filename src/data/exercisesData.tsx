import { ExerciseProps } from '../components/ExerciseItem';
import { MathView } from '../components/MathView';

/* ==========================================================================
   LATIHAN 5.1
   ========================================================================== */
export const latihan51Data: ExerciseProps[] = [
  {
    id: 'latihan-5-1-1a',
    questType: 'main',
    numberLabel: '1. a)',
    question: 'Tentukan akar-akar persamaan kuadrat berikut dengan metode pemfaktoran!',
    mathQuestion: 'x^2 - 16 = 0',
    type: 'text',
    correctAnswer: '4 atau -4',
    acceptedAnswers: ['4 atau -4', '-4 atau 4', '4, -4', '-4, 4', '±4', '+-4'],
    explanation: (
      <div>
        <p>Bentuk selisih dua kuadrat <MathView math="a^2 - b^2 = (a - b)(a + b)" />:</p>
        <MathView block math="x^2 - 4^2 = (x - 4)(x + 4) = 0" />
        <p><MathView math="x - 4 = 0 \implies x_1 = 4" /> atau <MathView math="x + 4 = 0 \implies x_2 = -4" />.</p>
      </div>
    ),
  },
  {
    id: 'latihan-5-1-1b',
    questType: 'main',
    numberLabel: '1. b)',
    question: 'Tentukan akar-akar persamaan kuadrat berikut dengan metode pemfaktoran!',
    mathQuestion: 'x^2 - 5x = 0',
    type: 'text',
    correctAnswer: '0 atau 5',
    acceptedAnswers: ['0 atau 5', '5 atau 0', '0, 5', '5, 0'],
    explanation: (
      <div>
        <p>Faktorkan faktor persekutuan <MathView math="x" />:</p>
        <MathView block math="x(x - 5) = 0" />
        <p><MathView math="x_1 = 0" /> atau <MathView math="x - 5 = 0 \implies x_2 = 5" />.</p>
      </div>
    ),
  },
  {
    id: 'latihan-5-1-1c',
    questType: 'main',
    numberLabel: '1. c)',
    question: 'Tentukan akar-akar persamaan kuadrat berikut dengan metode pemfaktoran!',
    mathQuestion: '2x^2 + 8x = 0',
    type: 'text',
    correctAnswer: '0 atau -4',
    acceptedAnswers: ['0 atau -4', '-4 atau 0', '0, -4', '-4, 0'],
    explanation: (
      <div>
        <p>Faktorkan <MathView math="2x" />:</p>
        <MathView block math="2x(x + 4) = 0" />
        <p><MathView math="2x = 0 \implies x_1 = 0" /> atau <MathView math="x + 4 = 0 \implies x_2 = -4" />.</p>
      </div>
    ),
  },
  {
    id: 'latihan-5-1-1d',
    questType: 'side',
    numberLabel: '1. d)',
    question: 'Tentukan akar-akar persamaan kuadrat berikut dengan metode pemfaktoran!',
    mathQuestion: '3x^2 + 6x + 4 = 4 - 3x',
    type: 'text',
    correctAnswer: '0 atau -3',
    acceptedAnswers: ['0 atau -3', '-3 atau 0', '0, -3', '-3, 0'],
    explanation: (
      <div>
        <p>Pindahkan semua suku ke ruas kiri ke dalam bentuk umum:</p>
        <MathView block math="3x^2 + 6x + 4 - 4 + 3x = 0 \implies 3x^2 + 9x = 0" />
        <MathView block math="3x(x + 3) = 0 \implies x_1 = 0 \\text{ atau } x_2 = -3" />
      </div>
    ),
  },
  {
    id: 'latihan-5-1-1e',
    questType: 'main',
    numberLabel: '1. e)',
    question: 'Tentukan akar-akar persamaan kuadrat berikut dengan metode pemfaktoran!',
    mathQuestion: 'x^2 - 7x + 10 = 0',
    type: 'text',
    correctAnswer: '2 atau 5',
    acceptedAnswers: ['2 atau 5', '5 atau 2', '2, 5', '5, 2'],
    explanation: (
      <div>
        <p>Cari bilangan dengan hasil kali 10 dan jumlah -7, yaitu -2 dan -5:</p>
        <MathView block math="(x - 2)(x - 5) = 0 \implies x_1 = 2 \\text{ atau } x_2 = 5" />
      </div>
    ),
  },
  {
    id: 'latihan-5-1-1f',
    questType: 'main',
    numberLabel: '1. f)',
    question: 'Tentukan akar-akar persamaan kuadrat berikut dengan metode pemfaktoran!',
    mathQuestion: 'x^2 - 6x - 16 = 0',
    type: 'text',
    correctAnswer: '8 atau -2',
    acceptedAnswers: ['8 atau -2', '-2 atau 8', '8, -2', '-2, 8'],
    explanation: (
      <div>
        <p>Cari bilangan dengan hasil kali -16 dan jumlah -6, yaitu -8 dan 2:</p>
        <MathView block math="(x - 8)(x + 2) = 0 \implies x_1 = 8 \\text{ atau } x_2 = -2" />
      </div>
    ),
  },
  {
    id: 'latihan-5-1-1g',
    questType: 'main',
    numberLabel: '1. g)',
    question: 'Tentukan akar-akar persamaan kuadrat berikut dengan metode pemfaktoran!',
    mathQuestion: 'x^2 + 10x + 24 = 0',
    type: 'text',
    correctAnswer: '-4 atau -6',
    acceptedAnswers: ['-4 atau -6', '-6 atau -4', '-4, -6', '-6, -4'],
    explanation: (
      <div>
        <p>Cari bilangan dengan hasil kali 24 dan jumlah 10, yaitu 4 dan 6:</p>
        <MathView block math="(x + 4)(x + 6) = 0 \implies x_1 = -4 \\text{ atau } x_2 = -6" />
      </div>
    ),
  },
  {
    id: 'latihan-5-1-1h',
    questType: 'side',
    numberLabel: '1. h)',
    question: 'Tentukan akar-akar persamaan kuadrat berikut dengan metode pemfaktoran!',
    mathQuestion: 'x^2 + 7x - 60 = x + 12',
    type: 'text',
    correctAnswer: '6 atau -12',
    acceptedAnswers: ['6 atau -12', '-12 atau 6', '6, -12', '-12, 6'],
    explanation: (
      <div>
        <p>Bawa ke bentuk umum <MathView math="ax^2 + bx + c = 0" />:</p>
        <MathView block math="x^2 + 7x - 60 - x - 12 = 0 \implies x^2 + 6x - 72 = 0" />
        <MathView block math="(x + 12)(x - 6) = 0 \implies x_1 = 6 \\text{ atau } x_2 = -12" />
      </div>
    ),
  },
  {
    id: 'latihan-5-1-1i',
    questType: 'main',
    numberLabel: '1. i)',
    question: 'Tentukan akar-akar persamaan kuadrat berikut dengan metode pemfaktoran!',
    mathQuestion: '2x^2 + 3x - 5 = 0',
    type: 'text',
    correctAnswer: '1 atau -5/2',
    acceptedAnswers: ['1 atau -5/2', '-5/2 atau 1', '1, -5/2', '-2.5 atau 1', '1 atau -2.5'],
    explanation: (
      <div>
        <p><MathView math="a \cdot c = 2(-5) = -10" /> dan <MathView math="b = 3" />. Bilangannya adalah 5 dan -2:</p>
        <MathView block math="\frac{1}{2}(2x - 2)(2x + 5) = 0 \implies (x - 1)(2x + 5) = 0" />
        <MathView block math="x_1 = 1 \\text{ atau } x_2 = -\frac{5}{2}" />
      </div>
    ),
  },
  {
    id: 'latihan-5-1-1j',
    questType: 'main',
    numberLabel: '1. j)',
    question: 'Tentukan akar-akar persamaan kuadrat berikut dengan metode pemfaktoran!',
    mathQuestion: '3x^2 - 4x - 4 = 0',
    type: 'text',
    correctAnswer: '2 atau -2/3',
    acceptedAnswers: ['2 atau -2/3', '-2/3 atau 2', '2, -2/3', '-2/3, 2'],
    explanation: (
      <div>
        <p><MathView math="a \cdot c = 3(-4) = -12" /> dan <MathView math="b = -4" />. Bilangannya adalah -6 dan 2:</p>
        <MathView block math="\frac{1}{3}(3x - 6)(3x + 2) = 0 \implies (x - 2)(3x + 2) = 0" />
        <MathView block math="x_1 = 2 \\text{ atau } x_2 = -\frac{2}{3}" />
      </div>
    ),
  },
  {
    id: 'latihan-5-1-1k',
    questType: 'side',
    numberLabel: '1. k)',
    question: 'Tentukan akar-akar persamaan kuadrat berikut dengan metode pemfaktoran!',
    mathQuestion: '4x^2 - 3x - 1 = 0',
    type: 'text',
    correctAnswer: '1 atau -1/4',
    acceptedAnswers: ['1 atau -1/4', '-1/4 atau 1', '1, -1/4', '-0.25 atau 1', '1 atau -0.25'],
    explanation: (
      <div>
        <p><MathView math="a \cdot c = 4(-1) = -4" /> dan <MathView math="b = -3" />. Bilangannya adalah -4 dan 1:</p>
        <MathView block math="\frac{1}{4}(4x - 4)(4x + 1) = 0 \implies (x - 1)(4x + 1) = 0" />
        <MathView block math="x_1 = 1 \\text{ atau } x_2 = -\frac{1}{4}" />
      </div>
    ),
  },
  {
    id: 'latihan-5-1-1l',
    questType: 'side',
    numberLabel: '1. l)',
    question: 'Tentukan akar-akar persamaan kuadrat berikut dengan metode pemfaktoran!',
    mathQuestion: '6x^2 - 17x + 12 = 0',
    type: 'text',
    correctAnswer: '4/3 atau 3/2',
    acceptedAnswers: ['4/3 atau 3/2', '3/2 atau 4/3', '4/3, 3/2', '1.5 atau 1.33'],
    explanation: (
      <div>
        <p><MathView math="a \cdot c = 6 \cdot 12 = 72" /> dan <MathView math="b = -17" />. Bilangannya adalah -9 dan -8:</p>
        <MathView block math="\frac{1}{6}(6x - 9)(6x - 8) = 0 \implies \frac{1}{3}(6x - 9) \cdot \frac{1}{2}(6x - 8) = 0" />
        <MathView block math="(2x - 3)(3x - 4) = 0 \implies x_1 = \frac{3}{2} \\text{ atau } x_2 = \frac{4}{3}" />
      </div>
    ),
  },
  {
    id: 'latihan-5-1-2a',
    questType: 'main',
    numberLabel: '2. a)',
    question: 'Tentukan akar-akar persamaan kuadrat berikut dengan menggunakan rumus Al-Khawarizmi (rumus ABC) atau Melengkapkan kuadrat sempurna!',
    mathQuestion: 'x^2 + x - 12 = 0',
    type: 'text',
    correctAnswer: '3 atau -4',
    acceptedAnswers: ['3 atau -4', '-4 atau 3', '3, -4', '-4, 3'],
    explanation: (
      <div>
        <p><MathView math="a = 1, b = 1, c = -12" />:</p>
        <MathView block math="x_{1,2} = \frac{-1 \pm \sqrt{1^2 - 4(1)(-12)}}{2(1)} = \frac{-1 \pm \sqrt{49}}{2} = \frac{-1 \pm 7}{2}" />
        <MathView block math="x_1 = \frac{-1 + 7}{2} = 3 \\quad \\text{atau} \\quad x_2 = \frac{-1 - 7}{2} = -4" />
      </div>
    ),
  },
  {
    id: 'latihan-5-1-2d',
    questType: 'main',
    numberLabel: '2. d)',
    question: 'Tentukan akar-akar persamaan kuadrat berikut dengan menggunakan rumus Al-Khawarizmi atau Melengkapkan kuadrat sempurna!',
    mathQuestion: 'x^2 - 2x - 5 = 0',
    type: 'text',
    correctAnswer: '1 ± √6',
    acceptedAnswers: ['1 +- √6', '1 ± √6', '1 + √6 atau 1 - √6', '1 + akar 6', '1 - akar 6'],
    explanation: (
      <div>
        <p>Dengan melengkapkan kuadrat sempurna:</p>
        <MathView block math="x^2 - 2x = 5 \implies (x - 1)^2 - 1 = 5 \implies (x - 1)^2 = 6" />
        <MathView block math="x - 1 = \pm\sqrt{6} \implies x_{1,2} = 1 \pm \sqrt{6}" />
      </div>
    ),
  },
  {
    id: 'latihan-5-1-3',
    questType: 'side',
    numberLabel: '3.',
    question: 'Dari sebuah toko buku, dijual buku pelajaran Matematika, Biologi, dan Ekonomi masing-masing dengan harga (dalam Rp/buku) (2p + 1), (p + 1), dan (p + 3). Jika Fatimah membeli 3p buku Matematika, (p + 7) buku Biologi, dan (15 - 2p) buku Ekonomi, nyatakan suatu bentuk kuadrat untuk jumlah uang yang harus dibayar Fatimah...',
    type: 'text',
    correctAnswer: '5p^2 + 20p + 52',
    acceptedAnswers: ['5p^2 + 20p + 52', '5p^2+20p+52', '5p^2 + 20p + 52 rupiah'],
    explanation: (
      <div>
        <p>Total biaya = <MathView math="\text{Buku Mat} + \text{Buku Bio} + \text{Buku Eko}" /></p>
        <MathView block math="= 3p(2p + 1) + (p + 7)(p + 1) + (15 - 2p)(p + 3)" />
        <MathView block math="= (6p^2 + 3p) + (p^2 + 8p + 7) + (15p + 45 - 2p^2 - 6p)" />
        <MathView block math="= 6p^2 + 3p + p^2 + 8p + 7 - 2p^2 + 9p + 45" />
        <MathView block math="= (6 + 1 - 2)p^2 + (3 + 8 + 9)p + (7 + 45) = 5p^2 + 20p + 52" />
      </div>
    ),
  },
  {
    id: 'latihan-5-1-4',
    questType: 'side',
    numberLabel: '4.',
    question: 'Jika',
    mathQuestion: '\\frac{4(2x-3)}{x-2} = x + \\frac{9}{x-2}, \\text{ maka nilai } x \\text{ adalah...}',
    type: 'text',
    correctAnswer: '7',
    acceptedAnswers: ['7', 'x = 7'],
    explanation: (
      <div>
        <p>Kalikan kedua ruas dengan <MathView math="(x - 2)" /> dengan syarat <MathView math="x \neq 2" />:</p>
        <MathView block math="4(2x - 3) = x(x - 2) + 9 \implies 8x - 12 = x^2 - 2x + 9" />
        <MathView block math="x^2 - 10x + 21 = 0 \implies (x - 7)(x - 3) = 0 \implies x = 7 \\text{ atau } x = 3" />
        <p>Keduanya memenuhi syarat <MathView math="x \neq 2" />. Maka nilai <MathView math="x" /> adalah 3 atau 7.</p>
      </div>
    ),
  },
  {
    id: 'latihan-5-1-6',
    questType: 'main',
    numberLabel: '6.',
    question: 'Jika salah satu akar persamaan kuadrat',
    mathQuestion: 'ax^2 - 3x + 7 = 0 \\text{ ialah } 2, \\text{ maka nilai } a = \\dots',
    type: 'text',
    correctAnswer: '-1/4',
    acceptedAnswers: ['-1/4', '-0.25', 'a = -1/4'],
    explanation: (
      <div>
        <p>Substitusikan nilai <MathView math="x = 2" /> ke dalam persamaan kuadrat:</p>
        <MathView block math="a(2)^2 - 3(2) + 7 = 0 \implies 4a - 6 + 7 = 0 \implies 4a + 1 = 0 \implies a = -\frac{1}{4}" />
      </div>
    ),
  },
  {
    id: 'latihan-5-1-7',
    questType: 'side',
    numberLabel: '7.',
    question: 'Jika salah satu akar persamaan kuadrat',
    mathQuestion: '(3 - m)x^2 - 2mx + 12 = 0 \\text{ adalah } 1. \\text{ Nilai akar pers. kuadrat yang lain adalah...}',
    type: 'text',
    correctAnswer: '-6',
    acceptedAnswers: ['-6', 'x = -6', '-6/1'],
    explanation: (
      <div>
        <p>Substitusikan <MathView math="x = 1" /> ke dalam persamaan:</p>
        <MathView block math="(3 - m)(1)^2 - 2m(1) + 12 = 0 \implies 3 - m - 2m + 12 = 0 \implies 15 - 3m = 0 \implies m = 5" />
        <p>Persamaan kuadrat menjadi: <MathView math="(3 - 5)x^2 - 2(5)x + 12 = 0 \implies -2x^2 - 10x + 12 = 0" /></p>
        <p>Bagi kedua ruas dengan -2: <MathView math="x^2 + 5x - 6 = 0 \implies (x - 1)(x + 6) = 0" />.</p>
        <p>Karena akar pertama adalah 1, maka nilai akar yang lain adalah <MathView math="x = -6" />.</p>
      </div>
    ),
  },
];

/* ==========================================================================
   LATIHAN 5.2
   ========================================================================== */
export const latihan52Data: ExerciseProps[] = [
  {
    id: 'latihan-5-2-1a',
    questType: 'main',
    numberLabel: '1. a)',
    question: 'Tentukan jenis-jenis akar persamaan kuadrat berikut beserta alasannya!',
    mathQuestion: '2x^2 + 3x - 11 = 0',
    type: 'text',
    correctAnswer: 'Riil berbeda',
    acceptedAnswers: ['riil berbeda', 'real berlainan', 'dua akar riil berbeda', 'D > 0'],
    explanation: (
      <div>
        <p><MathView math="a = 2, b = 3, c = -11" />.</p>
        <MathView block math="D = b^2 - 4ac = 3^2 - 4(2)(-11) = 9 + 88 = 97" />
        <p>Karena <MathView math="D = 97 > 0" />, maka kedua akarnya <strong>riil dan berlainan/berbeda</strong>.</p>
      </div>
    ),
  },
  {
    id: 'latihan-5-2-1b',
    questType: 'main',
    numberLabel: '1. b)',
    question: 'Tentukan jenis-jenis akar persamaan kuadrat berikut beserta alasannya!',
    mathQuestion: '3x^2 + 4x + 4 = 0',
    type: 'text',
    correctAnswer: 'Tidak riil / imajiner',
    acceptedAnswers: ['tidak riil', 'imajiner', 'tidak real', 'D < 0'],
    explanation: (
      <div>
        <p><MathView math="a = 3, b = 4, c = 4" />.</p>
        <MathView block math="D = 4^2 - 4(3)(4) = 16 - 48 = -32" />
        <p>Karena <MathView math="D = -32 < 0" />, maka akar-akarnya <strong>tidak riil (imajiner)</strong>.</p>
      </div>
    ),
  },
  {
    id: 'latihan-5-2-1c',
    questType: 'main',
    numberLabel: '1. c)',
    question: 'Tentukan jenis-jenis akar persamaan kuadrat berikut beserta alasannya!',
    mathQuestion: '4x^2 - 16x + 16 = 0',
    type: 'text',
    correctAnswer: 'Riil kembar',
    acceptedAnswers: ['riil kembar', 'real kembar', 'akar kembar', 'D = 0'],
    explanation: (
      <div>
        <p><MathView math="a = 4, b = -16, c = 16" />.</p>
        <MathView block math="D = (-16)^2 - 4(4)(16) = 256 - 256 = 0" />
        <p>Karena <MathView math="D = 0" />, maka kedua akarnya <strong>riil dan kembar/sama</strong>.</p>
      </div>
    ),
  },
  {
    id: 'latihan-5-2-4',
    questType: 'main',
    numberLabel: '4.',
    question: 'Persamaan kuadrat',
    mathQuestion: 'kx^2 - kx + 3 = 0 \\text{ memiliki akar-akar riil kembar apabila nilai } k = \\dots',
    type: 'text',
    correctAnswer: '12',
    acceptedAnswers: ['12', 'k = 12'],
    explanation: (
      <div>
        <p>Syarat akar kembar: <MathView math="D = 0" /> dan <MathView math="k \neq 0" />.</p>
        <MathView block math="(-k)^2 - 4(k)(3) = 0 \implies k^2 - 12k = 0 \implies k(k - 12) = 0" />
        <p>Karena <MathView math="k \neq 0" /> (sebagai koefisien <MathView math="x^2" />), maka nilai <MathView math="k = 12" />.</p>
      </div>
    ),
  },
  {
    id: 'latihan-5-2-8',
    questType: 'side',
    numberLabel: '8.',
    question: 'Persamaan kuadrat',
    mathQuestion: 'mx^2 + (m - 5)x - 20 = 0 \\text{ akar-akarnya saling berlawanan. Nilai } m = \\dots',
    type: 'text',
    correctAnswer: '5',
    acceptedAnswers: ['5', 'm = 5'],
    explanation: (
      <div>
        <p>Akar-akar saling berlawanan artinya <MathView math="x_1 = -x_2 \implies x_1 + x_2 = 0" />.</p>
        <MathView block math="x_1 + x_2 = -\frac{b}{a} = -\frac{m - 5}{m} = 0 \implies m - 5 = 0 \implies m = 5" />
      </div>
    ),
  },
];

/* ==========================================================================
   LATIHAN 5.3
   ========================================================================== */
export const latihan53Data: ExerciseProps[] = [
  {
    id: 'latihan-5-3-1',
    questType: 'main',
    numberLabel: '1.',
    question: (
      <span>
        Akar-akar Persamaan Kuadrat <MathView math="2x^2 - 7x + 5 = 0" /> adalah <MathView math="x_1" /> dan <MathView math="x_2" />. Jika <MathView math="x_1 < x_2" />, maka nilai dari
      </span>
    ),
    mathQuestion: '3x_1 + 3x_2 + x_1 x_2 = \\dots',
    type: 'text',
    correctAnswer: '13',
    acceptedAnswers: ['13'],
    explanation: (
      <div>
        <p><MathView math="x_1 + x_2 = -\frac{-7}{2} = \frac{7}{2}" /> dan <MathView math="x_1 x_2 = \frac{5}{2}" />.</p>
        <MathView block math="3(x_1 + x_2) + x_1 x_2 = 3\left(\frac{7}{2}\right) + \frac{5}{2} = \frac{21 + 5}{2} = \frac{26}{2} = 13" />
      </div>
    ),
  },
  {
    id: 'latihan-5-3-2',
    questType: 'main',
    numberLabel: '2.',
    question: (
      <span>
        Jika Persamaan Kuadrat <MathView math="ax^2 + 16x - 9 = 0" /> mempunyai akar-akar <MathView math="x_1" /> dan <MathView math="x_2" /> dan nilai <MathView math="x_1 + x_2 = 4" />, maka nilai
      </span>
    ),
    mathQuestion: 'a = \\dots',
    type: 'text',
    correctAnswer: '-4',
    acceptedAnswers: ['-4', 'a = -4'],
    explanation: (
      <div>
        <p><MathView math="x_1 + x_2 = -\frac{b}{a} = -\frac{16}{a} = 4 \implies 4a = -16 \implies a = -4" />.</p>
      </div>
    ),
  },
  {
    id: 'latihan-5-3-9',
    questType: 'side',
    numberLabel: '9.',
    question: (
      <span>
        Akar-akar Persamaan Kuadrat <MathView math="x^2 - 5x + p = 0" /> adalah <MathView math="x_1" /> dan <MathView math="x_2" />. Jika diketahui <MathView math="x_1 - x_2 = 1" />, maka nilai
      </span>
    ),
    mathQuestion: 'p = \\dots',
    type: 'text',
    correctAnswer: '6',
    acceptedAnswers: ['6', 'p = 6'],
    explanation: (
      <div>
        <p><MathView math="x_1 + x_2 = 5" /> dan <MathView math="x_1 - x_2 = 1" />.</p>
        <p>Eliminasi: <MathView math="2x_1 = 6 \implies x_1 = 3" />, sehingga <MathView math="x_2 = 2" />.</p>
        <p>Nilai <MathView math="p = x_1 \cdot x_2 = 3 \cdot 2 = 6" />.</p>
      </div>
    ),
  },
  {
    id: 'latihan-5-3-12',
    questType: 'main',
    numberLabel: '12.',
    question: (
      <span>
        Persamaan <MathView math="x^2 - 8x - 4 = 0" /> memiliki akar-akar <MathView math="x_1" /> dan <MathView math="x_2" />. Jika <MathView math="x_1 < x_2" />, maka nilai dari
      </span>
    ),
    mathQuestion: 'x_1^2 + x_2^2 = \\dots',
    type: 'text',
    correctAnswer: '72',
    acceptedAnswers: ['72'],
    explanation: (
      <div>
        <p><MathView math="x_1 + x_2 = 8" /> dan <MathView math="x_1 x_2 = -4" />.</p>
        <MathView block math="x_1^2 + x_2^2 = (x_1 + x_2)^2 - 2x_1 x_2 = 8^2 - 2(-4) = 64 + 8 = 72" />
      </div>
    ),
  },
];

/* ==========================================================================
   LATIHAN 5.4
   ========================================================================== */
export const latihan54Data: ExerciseProps[] = [
  {
    id: 'latihan-5-4-1',
    questType: 'main',
    numberLabel: '1.',
    question: 'Persamaan kuadrat yang mempunyai akar-akar -3 dan 4 adalah...',
    type: 'text',
    correctAnswer: 'x^2 - x - 12 = 0',
    acceptedAnswers: ['x^2 - x - 12 = 0', 'x^2-x-12=0'],
    explanation: (
      <div>
        <p>Gunakan rumus perkalian faktor: <MathView math="(x - x_1)(x - x_2) = 0" />.</p>
        <MathView block math="(x - (-3))(x - 4) = (x + 3)(x - 4) = x^2 - x - 12 = 0" />
      </div>
    ),
  },
  {
    id: 'latihan-5-4-3',
    questType: 'main',
    numberLabel: '3.',
    question: (
      <span>
        Jika <MathView math="x_1" /> dan <MathView math="x_2" /> adalah akar-akar persamaan kuadrat <MathView math="x^2 - 3x + 1 = 0" /> maka persamaan kuadrat yang akar-akarnya
      </span>
    ),
    mathQuestion: 'x_1 + \\frac{1}{x_1} \\text{ dan } x_2 + \\frac{1}{x_2} \\text{ adalah...}',
    type: 'options',
    options: [
      { key: 'A', text: '', math: 'x^2 + 9x - 6 = 0' },
      { key: 'B', text: '', math: 'x^2 - 6x - 6 = 0' },
      { key: 'C', text: '', math: 'x^2 - 6x + 9 = 0' },
      { key: 'D', text: '', math: 'x^2 + 6x + 9 = 0' },
      { key: 'E', text: '', math: 'x^2 - 6x - 9 = 0' },
    ],
    correctAnswer: 'C',
    acceptedAnswers: ['C'],
    explanation: (
      <div>
        <p>Dari persamaan: <MathView math="x_1 + x_2 = 3" /> dan <MathView math="x_1 x_2 = 1" />.</p>
        <p>Karena <MathView math="x_1 x_2 = 1 \implies \frac{1}{x_1} = x_2" /> dan <MathView math="\frac{1}{x_2} = x_1" />.</p>
        <p>Maka akar pertama: <MathView math="x_1 + x_2 = 3" />, dan akar kedua: <MathView math="x_2 + x_1 = 3" />.</p>
        <p>Persamaan kuadrat dengan akar kembar 3 dan 3:</p>
        <MathView block math="(x - 3)(x - 3) = x^2 - 6x + 9 = 0" />
        <p className="font-semibold text-indigo-600">Pilihan: C</p>
      </div>
    ),
  },
  {
    id: 'latihan-5-4-7',
    questType: 'side',
    numberLabel: '7.',
    question: 'Pernyataan berikut berhubungan dengan persamaan kuadrat. Berilah tanda "✓" pada pernyataan yang benar:',
    type: 'checkboxes',
    checkboxItems: [
      { id: 'c1', text: <span>Jika <MathView math="D > 0" />, maka persamaan kuadrat tidak memiliki akar riil.</span>, isCorrect: false },
      { id: 'c2', text: <span>Persamaan <MathView math="x^2 - 4 = 0" /> memiliki dua akar yang kembar.</span>, isCorrect: false },
      { id: 'c3', text: <span>Hasil kali akar-akar persamaan <MathView math="x^2 - 3x - 2 = 0" /> adalah 2.</span>, isCorrect: false },
      { id: 'c4', text: <span>Akar-akar dari persamaan <MathView math="2x^2 + 3x - 2 = 0" /> adalah -2 dan <MathView math="\frac{1}{2}" />.</span>, isCorrect: true },
      { id: 'c5', text: <span>Jika <MathView math="D = 0" />, maka persamaan kuadrat memiliki dua akar yang sama.</span>, isCorrect: true },
    ],
    explanation: (
      <div>
        <ul className="list-disc pl-5 space-y-1">
          <li>Pernyataan 1: <em>Salah</em> (Jika <MathView math="D > 0" />, akarnya riil berbeda).</li>
          <li>Pernyataan 2: <em>Salah</em> (<MathView math="x^2 - 4 = 0 \implies x = \pm 2" />, bukan kembar).</li>
          <li>Pernyataan 3: <em>Salah</em> (<MathView math="x_1 x_2 = \frac{c}{a} = -2" />, bukan 2).</li>
          <li>Pernyataan 4: <strong>Benar</strong> (<MathView math="(2x - 1)(x + 2) = 0 \implies x = \frac{1}{2}" /> atau <MathView math="x = -2" />).</li>
          <li>Pernyataan 5: <strong>Benar</strong> (Jika <MathView math="D = 0" />, akarnya riil kembar/sama).</li>
        </ul>
      </div>
    ),
  },
];

/* ==========================================================================
   LATIHAN 5.5
   ========================================================================== */
export const latihan55Data: ExerciseProps[] = [
  {
    id: 'latihan-5-5-1',
    questType: 'main',
    numberLabel: '1.',
    question: (
      <span>
        Bintang memiliki sebidang kebun yang berbentuk persegi panjang. Jika lebar kebun <MathView math="3\text{ m}" /> kurangnya dari panjangnya dan luas kebun tersebut <MathView math="28\text{ m}^2" />, maka ukuran panjang kebun tersebut sebenarnya adalah...
      </span>
    ),
    type: 'text',
    correctAnswer: '7 m',
    acceptedAnswers: ['7', '7 m', '7 meter', 'p = 7'],
    explanation: (
      <div>
        <p>Misalkan panjang kebun = <MathView math="p" />. Maka lebar kebun = <MathView math="p - 3" />.</p>
        <MathView block math="p(p - 3) = 28 \implies p^2 - 3p - 28 = 0" />
        <MathView block math="(p - 7)(p + 4) = 0 \implies p = 7 \\text{ atau } p = -4" />
        <p>Karena panjang harus bernilai positif, maka panjang kebun sebenarnya adalah <strong>7 m</strong>.</p>
      </div>
    ),
  },
  {
    id: 'latihan-5-5-2',
    questType: 'main',
    numberLabel: '2.',
    question: 'Sebuah tangga yang panjangnya 13 m disandarkan ke tembok sebuah rumah. Jika tinggi tembok lebih panjang 7 m dibanding dengan jarak tembok terhadap kaki tangga, maka tinggi tembok rumah tersebut adalah...',
    type: 'text',
    correctAnswer: '12 m',
    acceptedAnswers: ['12', '12 m', '12 meter', 'tinggi 12 m'],
    explanation: (
      <div>
        <p>Misalkan jarak kaki tangga ke tembok = <MathView math="x" /> meter. Tinggi tembok = <MathView math="x + 7" /> meter.</p>
        <p>Berdasarkan Teorema Pythagoras:</p>
        <MathView block math="x^2 + (x + 7)^2 = 13^2 \implies x^2 + x^2 + 14x + 49 = 169" />
        <MathView block math="2x^2 + 14x - 120 = 0 \implies x^2 + 7x - 60 = 0" />
        <MathView block math="(x + 12)(x - 5) = 0 \implies x = 5\text{ m}" />
        <p>Tinggi tembok = <MathView math="x + 7 = 5 + 7 = 12\text{ m}" />.</p>
      </div>
    ),
  },
  {
    id: 'latihan-5-5-3',
    questType: 'side',
    numberLabel: '3.',
    question: (
      <span>
        Suatu area berbentuk persegi panjang, ditengahnya terdapat kolam renang berbentuk persegi panjang yang luasnya <MathView math="180\text{ m}^2" />. Selisih panjang dan lebar kolam adalah <MathView math="3\text{ m}" />. Di sekeliling kolam renang dibuat jalan selebar <MathView math="2\text{ m}" />. Maka luas jalan tersebut adalah...
      </span>
    ),
    type: 'text',
    correctAnswer: '124 m²',
    acceptedAnswers: ['124', '124 m2', '124 m²', '124 meter persegi'],
    explanation: (
      <div>
        <p>Misalkan lebar kolam = <MathView math="l" />, maka panjang kolam = <MathView math="l + 3" />.</p>
        <MathView block math="l(l + 3) = 180 \implies l^2 + 3l - 180 = 0 \implies (l + 15)(l - 12) = 0 \implies l = 12\text{ m}" />
        <p>Panjang kolam = <MathView math="12 + 3 = 15\text{ m}" />. Luas kolam = <MathView math="180\text{ m}^2" />.</p>
        <p>Dengan jalan selebar 2 m di sekelilingnya, dimensi luar menjadi:</p>
        <MathView block math="\text{Panjang luar} = 15 + 2(2) = 19\text{ m}, \\quad \\text{Lebar luar} = 12 + 2(2) = 16\text{ m}" />
        <MathView block math="\text{Luas total area} = 19 \times 16 = 304\text{ m}^2" />
        <MathView block math="\text{Luas jalan} = 304 - 180 = 124\text{ m}^2" />
      </div>
    ),
  },
];
