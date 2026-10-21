import React, { useState } from 'react';
import { MathView } from './MathView';
import { Award, CheckCircle2, XCircle, RotateCcw, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface EvalQuestion {
  id: number;
  question: React.ReactNode;
  mathFormula?: string;
  type: 'text' | 'options';
  options?: { key: string; text: React.ReactNode }[];
  correctAnswer: string;
  acceptedAnswers: string[];
  explanation: React.ReactNode;
}

const evalQuestions: EvalQuestion[] = [
  {
    id: 1,
    question: '1. Akar-akar persamaan kuadrat:',
    mathFormula: 'x^2 - mx + 8 = 0 \\text{ adalah } p \\text{ dan } q. \\text{ Jika } p - q = 2, \\text{ maka nilai } m = \\dots',
    type: 'text',
    correctAnswer: '6 atau -6',
    acceptedAnswers: ['6', '-6', '6 atau -6', '±6', '+-6', '6, -6', '-6, 6'],
    explanation: (
      <div>
        <p>Dari persamaan <MathView math="x^2 - mx + 8 = 0" />, diperoleh <MathView math="p + q = m" /> dan <MathView math="pq = 8" />.</p>
        <p>Gunakan identitas aljabar: <MathView math="(p - q)^2 = (p + q)^2 - 4pq" /></p>
        <MathView block math="2^2 = m^2 - 4(8) \implies 4 = m^2 - 32 \implies m^2 = 36 \implies m = \pm 6" />
        <p>Jadi, nilai <MathView math="m = 6" /> atau <MathView math="m = -6" />.</p>
      </div>
    ),
  },
  {
    id: 2,
    question: '2. Jika akar-akar persamaan kuadrat',
    mathFormula: '2x^2 - 18x - d = 0 \\text{ adalah } x_1 \\text{ dan } x_2, \\text{ dimana } x_1^2 - x_2^2 = 27, \\text{ maka nilai } d = \\dots',
    type: 'text',
    correctAnswer: '-36',
    acceptedAnswers: ['-36', 'd = -36'],
    explanation: (
      <div>
        <p><MathView math="x_1 + x_2 = -\frac{-18}{2} = 9" /> dan <MathView math="x_1 \cdot x_2 = -\frac{d}{2}" />.</p>
        <p>Diketahui <MathView math="x_1^2 - x_2^2 = (x_1 - x_2)(x_1 + x_2) = 27" />.</p>
        <MathView block math="(x_1 - x_2)(9) = 27 \implies x_1 - x_2 = 3" />
        <p>Dengan eliminasi: <MathView math="x_1 + x_2 = 9" /> dan <MathView math="x_1 - x_2 = 3 \implies 2x_1 = 12 \implies x_1 = 6" />, sehingga <MathView math="x_2 = 3" />.</p>
        <MathView block math="x_1 \cdot x_2 = 6 \cdot 3 = 18 = -\frac{d}{2} \implies d = -36" />
      </div>
    ),
  },
  {
    id: 3,
    question: '3. Persamaan',
    mathFormula: '2x^2 + 8x - 1 = 0 \\text{ memiliki akar-akar } \\alpha \\text{ dan } \\beta. \\text{ Jika } \\alpha < \\beta, \\text{ maka nilai dari } \\frac{3\\alpha}{\\beta} + \\frac{3\\beta}{\\alpha} = \\dots',
    type: 'text',
    correctAnswer: '-102',
    acceptedAnswers: ['-102'],
    explanation: (
      <div>
        <p><MathView math="\alpha + \beta = -\frac{8}{2} = -4" /> dan <MathView math="\alpha\beta = -\frac{1}{2}" />.</p>
        <MathView block math="\frac{3\alpha}{\beta} + \frac{3\beta}{\alpha} = 3\left(\frac{\alpha^2 + \beta^2}{\alpha\beta}\right) = 3\left(\frac{(\alpha+\beta)^2 - 2\alpha\beta}{\alpha\beta}\right)" />
        <MathView block math="= 3\left(\frac{(-4)^2 - 2(-\frac{1}{2})}{-\frac{1}{2}}\right) = 3\left(\frac{16 + 1}{-\frac{1}{2}}\right) = 3(-34) = -102" />
      </div>
    ),
  },
  {
    id: 4,
    question: '4. Jika Persamaan Kuadrat',
    mathFormula: 'x^2 - 2x - 2q = 0 \\text{ mempunyai akar-akar } m \\text{ dan } n \\text{ serta diketahui nilai dari } m^2 + n^2 = 24, \\text{ maka nilai } q = \\dots',
    type: 'text',
    correctAnswer: '5',
    acceptedAnswers: ['5', 'q = 5'],
    explanation: (
      <div>
        <p><MathView math="m + n = 2" /> dan <MathView math="mn = -2q" />.</p>
        <MathView block math="m^2 + n^2 = (m+n)^2 - 2mn = 2^2 - 2(-2q) = 4 + 4q" />
        <MathView block math="4 + 4q = 24 \implies 4q = 20 \implies q = 5" />
      </div>
    ),
  },
  {
    id: 5,
    question: '5. Akar-akar persamaan kuadrat',
    mathFormula: 'x^2 - kx - 2x + 2k = 0 \\text{ adalah } x_1 \\text{ dan } x_2, \\text{ dimana } \\frac{x_1}{x_2} + \\frac{x_2}{x_1} = \\frac{5}{2}, \\text{ maka nilai } k = \\dots',
    type: 'text',
    correctAnswer: '4 atau 1',
    acceptedAnswers: ['4 atau 1', '1 atau 4', '4, 1', '1, 4', '4', '1'],
    explanation: (
      <div>
        <p>Faktorkan persamaan: <MathView math="x^2 - (k+2)x + 2k = (x - k)(x - 2) = 0" />, sehingga akarnya <MathView math="x_1 = k" /> dan <MathView math="x_2 = 2" />.</p>
        <MathView block math="\frac{k}{2} + \frac{2}{k} = \frac{5}{2} \implies \frac{k^2 + 4}{2k} = \frac{5}{2} \implies k^2 + 4 = 5k \implies k^2 - 5k + 4 = 0" />
        <MathView block math="(k - 4)(k - 1) = 0 \implies k = 4 \\text{ atau } k = 1" />
      </div>
    ),
  },
  {
    id: 6,
    question: '6. Diketahui akar-akar persamaan kuadrat',
    mathFormula: '2x^2 - (2 + a)x + 3 + a = 0 \\text{ adalah } x_1 \\text{ dan } x_2, \\text{ dimana } x_1^2 x_2 + x_2^2 x_1 = 5, \\text{ maka nilai dari } a = \\dots',
    type: 'text',
    correctAnswer: '2 atau -7',
    acceptedAnswers: ['2 atau -7', '-7 atau 2', '2, -7', '-7, 2', '2', '-7'],
    explanation: (
      <div>
        <p><MathView math="x_1^2 x_2 + x_2^2 x_1 = x_1 x_2 (x_1 + x_2) = 5" />.</p>
        <p>Dari persamaan: <MathView math="x_1 + x_2 = \frac{2+a}{2}" /> dan <MathView math="x_1 x_2 = \frac{3+a}{2}" />.</p>
        <MathView block math="\left(\frac{3+a}{2}\right)\left(\frac{2+a}{2}\right) = 5 \implies (a+3)(a+2) = 20" />
        <MathView block math="a^2 + 5a + 6 = 20 \implies a^2 + 5a - 14 = 0 \implies (a+7)(a-2) = 0 \implies a = 2 \\text{ atau } a = -7" />
      </div>
    ),
  },
  {
    id: 7,
    question: '7. Akar-akar Persamaan Kuadrat',
    mathFormula: 'x^2 - 2ax - 2x - 8 = 0 \\text{ adalah } x_1 \\text{ dan } x_2. \\text{ Jika nilai dari } x_1^3 x_2 + x_2^3 x_1 = -160, \\text{ maka nilai dari } a = \\dots',
    type: 'text',
    correctAnswer: '0 atau -2',
    acceptedAnswers: ['0 atau -2', '-2 atau 0', '0, -2', '-2, 0', '0', '-2'],
    explanation: (
      <div>
        <p>Persamaan: <MathView math="x^2 - 2(a+1)x - 8 = 0 \implies x_1 + x_2 = 2(a+1)" /> dan <MathView math="x_1 x_2 = -8" />.</p>
        <MathView block math="x_1^3 x_2 + x_2^3 x_1 = x_1 x_2(x_1^2 + x_2^2) = -8[(2(a+1))^2 - 2(-8)] = -160" />
        <MathView block math="4(a+1)^2 + 16 = 20 \implies 4(a+1)^2 = 4 \implies (a+1)^2 = 1 \implies a+1 = \pm 1 \implies a = 0 \\text{ atau } a = -2" />
      </div>
    ),
  },
  {
    id: 8,
    question: '8. Persamaan',
    mathFormula: '2x^2 - 3x - 9 = 0 \\text{ memiliki akar-akar } p \\text{ dan } q. \\text{ Nilai dari } \\frac{8p^2}{q} + \\frac{8q^2}{p} = \\dots',
    type: 'text',
    correctAnswer: '-42',
    acceptedAnswers: ['-42'],
    explanation: (
      <div>
        <p><MathView math="p + q = \frac{3}{2}" /> dan <MathView math="pq = -\frac{9}{2}" />.</p>
        <MathView block math="\frac{8p^2}{q} + \frac{8q^2}{p} = 8\left(\frac{p^3 + q^3}{pq}\right) = 8\left(\frac{(p+q)^3 - 3pq(p+q)}{pq}\right)" />
        <MathView block math="p^3 + q^3 = \left(\frac{3}{2}\right)^3 - 3\left(-\frac{9}{2}\right)\left(\frac{3}{2}\right) = \frac{27}{8} + \frac{81}{4} = \frac{189}{8}" />
        <MathView block math="8 \cdot \frac{189/8}{-9/2} = \frac{189}{-9/2} = 189 \times \left(-\frac{2}{9}\right) = -42" />
      </div>
    ),
  },
  {
    id: 9,
    question: '9. Persamaan kuadrat yang akar-akarnya',
    mathFormula: '\\frac{1}{2+\\sqrt{3}} \\text{ dan } \\frac{1}{2-\\sqrt{3}} \\text{ adalah...}',
    type: 'text',
    correctAnswer: 'x^2 - 4x + 1 = 0',
    acceptedAnswers: ['x^2 - 4x + 1 = 0', 'x^2-4x+1=0'],
    explanation: (
      <div>
        <p>Rasionalkan kedua akar:</p>
        <MathView block math="\frac{1}{2+\sqrt{3}} = 2 - \sqrt{3} \\quad \\text{dan} \\quad \\frac{1}{2-\sqrt{3}} = 2 + \sqrt{3}" />
        <p>Jumlah akar: <MathView math="(2-\sqrt{3}) + (2+\sqrt{3}) = 4" /></p>
        <p>Hasil kali akar: <MathView math="(2-\sqrt{3})(2+\sqrt{3}) = 4 - 3 = 1" /></p>
        <MathView block math="x^2 - (4)x + 1 = 0 \implies x^2 - 4x + 1 = 0" />
      </div>
    ),
  },
  {
    id: 10,
    question: '10. Akar-akar persamaan',
    mathFormula: 'x^2 + 4x - 1 = 0 \\text{ adalah } x_1 \\text{ dan } x_2. \\text{ Persamaan kuadrat baru yang akar-akarnya } (2x_1 + 3) \\text{ dan } (2x_2 + 3) \\text{ adalah...}',
    type: 'text',
    correctAnswer: 'x^2 + 2x - 19 = 0',
    acceptedAnswers: ['x^2 + 2x - 19 = 0', 'x^2+2x-19=0'],
    explanation: (
      <div>
        <p><MathView math="x_1 + x_2 = -4" /> dan <MathView math="x_1 x_2 = -1" />.</p>
        <p>Jumlah baru: <MathView math="(2x_1 + 3) + (2x_2 + 3) = 2(x_1 + x_2) + 6 = 2(-4) + 6 = -2" />.</p>
        <p>Hasil kali baru: <MathView math="(2x_1+3)(2x_2+3) = 4x_1 x_2 + 6(x_1+x_2) + 9 = 4(-1) + 6(-4) + 9 = -19" />.</p>
        <MathView block math="x^2 - (-2)x + (-19) = 0 \implies x^2 + 2x - 19 = 0" />
      </div>
    ),
  },
  {
    id: 11,
    question: '11. Akar-akar persamaan',
    mathFormula: '2x^2 + 4x - 2 = 0 \\text{ adalah } x_1 \\text{ dan } x_2. \\text{ Persamaan kuadrat baru yang akar-akarnya } (3x_1 + 1) \\text{ dan } (3x_2 + 1) \\text{ adalah...}',
    type: 'text',
    correctAnswer: 'x^2 + 4x - 14 = 0',
    acceptedAnswers: ['x^2 + 4x - 14 = 0', 'x^2+4x-14=0', '2x^2 + 8x - 28 = 0'],
    explanation: (
      <div>
        <p>Bagi persamaan dengan 2: <MathView math="x^2 + 2x - 1 = 0 \implies x_1 + x_2 = -2" /> dan <MathView math="x_1 x_2 = -1" />.</p>
        <p>Jumlah baru: <MathView math="3(x_1 + x_2) + 2 = 3(-2) + 2 = -4" />.</p>
        <p>Hasil kali baru: <MathView math="(3x_1+1)(3x_2+1) = 9x_1 x_2 + 3(x_1+x_2) + 1 = 9(-1) + 3(-2) + 1 = -14" />.</p>
        <MathView block math="x^2 - (-4)x - 14 = 0 \implies x^2 + 4x - 14 = 0" />
      </div>
    ),
  },
  {
    id: 12,
    question: '12. Sebuah tangga yang panjangnya 15 m disandarkan ke tembok sebuah rumah. Jika tinggi tembok lebih panjang 3 m dibanding dengan jarak tembok terhadap kaki tangga, maka tinggi tembok rumah tersebut adalah...',
    type: 'text',
    correctAnswer: '12 m',
    acceptedAnswers: ['12', '12 m', '12 meter'],
    explanation: (
      <div>
        <p>Misal jarak kaki tangga ke tembok = <MathView math="x" /> meter. Maka tinggi tembok = <MathView math="x + 3" /> meter.</p>
        <p>Dengan Teorema Pythagoras:</p>
        <MathView block math="x^2 + (x + 3)^2 = 15^2 \implies 2x^2 + 6x + 9 = 225 \implies 2x^2 + 6x - 216 = 0" />
        <MathView block math="x^2 + 3x - 108 = 0 \implies (x + 12)(x - 9) = 0 \implies x = 9\text{ m}" />
        <p>Tinggi tembok rumah = <MathView math="x + 3 = 9 + 3 = 12\text{ m}" />.</p>
      </div>
    ),
  },
  {
    id: 13,
    question: '13. Akar-akar persamaan',
    mathFormula: 'x^2 - 2x - 4 = 0 \\text{ adalah } p \\text{ dan } q. \\text{ Persamaan kuadrat baru yang akar-akarnya } \\left(\\frac{1}{p^2} + \\frac{1}{q^2}\\right) \\text{ dan } (p^3 + q^3) \\text{ adalah...}',
    type: 'text',
    correctAnswer: '4x^2 - 131x + 96 = 0',
    acceptedAnswers: ['4x^2 - 131x + 96 = 0', '4x^2-131x+96=0', 'x^2 - 131/4 x + 24 = 0'],
    explanation: (
      <div>
        <p><MathView math="p + q = 2" /> dan <MathView math="pq = -4" />.</p>
        <p>Akar pertama: <MathView math="\frac{1}{p^2} + \frac{1}{q^2} = \frac{p^2 + q^2}{(pq)^2} = \frac{2^2 - 2(-4)}{(-4)^2} = \frac{12}{16} = \frac{3}{4}" />.</p>
        <p>Akar kedua: <MathView math="p^3 + q^3 = (p+q)^3 - 3pq(p+q) = 2^3 - 3(-4)(2) = 8 + 24 = 32" />.</p>
        <p>Jumlah akar: <MathView math="\frac{3}{4} + 32 = \frac{131}{4}" /> dan Hasil kali: <MathView math="\frac{3}{4} \cdot 32 = 24" />.</p>
        <MathView block math="x^2 - \frac{131}{4}x + 24 = 0 \implies 4x^2 - 131x + 96 = 0" />
      </div>
    ),
  },
  {
    id: 14,
    question: (
      <span>
        14. Di halaman depan rumah Zayn akan dibuat taman dengan luas <MathView math="36\text{ m}^2" />, yang mana di sekelilingnya harus tersedia jalan dengan lebar sama. Jika luas lahan yang tersedia adalah <MathView math="10\text{ m} \times 5\text{ m}" />, maka lebar jalan di sekeliling taman dan ukuran taman yang dapat dibuat adalah...
      </span>
    ),
    type: 'text',
    correctAnswer: '0.5 m dan 9 m x 4 m',
    acceptedAnswers: ['0.5', '0.5 m', '0.5 m dan 9 m x 4 m', 'lebar 0.5 m, taman 9 x 4', '9 x 4', '9x4'],
    explanation: (
      <div>
        <p>Misal lebar jalan = <MathView math="x" /> meter. Maka dimensi taman: panjang <MathView math="10 - 2x" /> dan lebar <MathView math="5 - 2x" />.</p>
        <MathView block math="(10 - 2x)(5 - 2x) = 36 \implies 4x^2 - 30x + 50 = 36 \implies 4x^2 - 30x + 14 = 0" />
        <MathView block math="2x^2 - 15x + 7 = 0 \implies (2x - 1)(x - 7) = 0" />
        <p>Karena <MathView math="x < 2.5" />, maka <MathView math="x = 0.5\text{ m}" />.</p>
        <p>Ukuran taman: panjang <MathView math="10 - 2(0.5) = 9\text{ m}" /> dan lebar <MathView math="5 - 2(0.5) = 4\text{ m}" /> (Luas = <MathView math="9 \times 4 = 36\text{ m}^2" />).</p>
      </div>
    ),
  },
  {
    id: 15,
    question: '15. Di halaman sebuah gedung yang berukuran 80 m x 60 m akan dibuat taman yang luasnya satu per enam kali luas halaman gedung. Di sekeliling taman harus disediakan parkir yang lebarnya sama. Dengan demikian lebar parkir tersebut sama dengan ...',
    type: 'text',
    correctAnswer: '20 m',
    acceptedAnswers: ['20', '20 m', '20 meter'],
    explanation: (
      <div>
        <p>Luas halaman gedung = <MathView math="80 \times 60 = 4800\text{ m}^2" />.</p>
        <p>Luas taman = <MathView math="\frac{1}{6} \times 4800 = 800\text{ m}^2" />.</p>
        <p>Misal lebar area parkir di sekeliling taman = <MathView math="x" /> meter.</p>
        <MathView block math="(80 - 2x)(60 - 2x) = 800 \implies 4x^2 - 280x + 4800 = 800" />
        <MathView block math="4x^2 - 280x + 4000 = 0 \implies x^2 - 70x + 1000 = 0" />
        <MathView block math="(x - 20)(x - 50) = 0" />
        <p>Karena <MathView math="2x < 60 \implies x < 30" />, maka lebar parkir <MathView math="x = 20\text{ m}" />.</p>
      </div>
    ),
  },
  {
    id: 16,
    question: '16. Jika',
    mathFormula: 'x^2 + x - 12 = 0 \\text{ dan } 2xy + y = 18, \\text{ maka nilai dari } x_1 + x_2 + y_1 \\cdot y_2 = \\dots',
    type: 'text',
    correctAnswer: '-373/49',
    acceptedAnswers: ['-373/49', '-373 / 49'],
    explanation: (
      <div>
        <p><MathView math="x^2 + x - 12 = 0 \implies (x + 4)(x - 3) = 0 \implies x_1 = -4, x_2 = 3" />.</p>
        <p>Jumlah akar: <MathView math="x_1 + x_2 = -1" />.</p>
        <p>Dari <MathView math="2xy + y = y(2x + 1) = 18 \implies y = \frac{18}{2x + 1}" />:</p>
        <MathView block math="y_1 = \frac{18}{2(-4)+1} = -\frac{18}{7}, \\quad y_2 = \frac{18}{2(3)+1} = \frac{18}{7}" />
        <MathView block math="y_1 \cdot y_2 = \left(-\frac{18}{7}\right)\left(\frac{18}{7}\right) = -\frac{324}{49}" />
        <MathView block math="x_1 + x_2 + y_1 \cdot y_2 = -1 - \frac{324}{49} = -\frac{373}{49}" />
      </div>
    ),
  },
  {
    id: 17,
    question: (
      <div className="space-y-2">
        <div>17. Jika <MathView math="r" /> dan <MathView math="s" /> adalah akar-akar persamaan <MathView math="x^2 + bx + c = 0" />, apakah <MathView math="rs < 0" />? Putuskan apakah dua pernyataan berikut cukup untuk menjawab pertanyaan!</div>
        <div className="pl-4 space-y-1 text-sm font-medium">
          <div>(1) <MathView math="b < 0" /></div>
          <div>(2) <MathView math="c < 0" /></div>
        </div>
      </div>
    ),
    type: 'options',
    options: [
      { key: 'A', text: 'Pernyataan (1) HANYA sudah cukup untuk menjawab pertanyaan tersebut, namun pernyataan (2) HANYA belum cukup.' },
      { key: 'B', text: 'Pernyataan (2) HANYA sudah cukup untuk menjawab pertanyaan tersebut, namun pernyataan (1) HANYA belum cukup.' },
      { key: 'C', text: 'KEDUA pernyataan tersebut cukup untuk menjawab pertanyaan tersebut.' },
      { key: 'D', text: 'SETIAP pernyataan cukup untuk menjawab pertanyaan.' },
      { key: 'E', text: 'KEDUA pernyataan tidak cukup untuk menjawab pertanyaan tersebut.' },
    ],
    correctAnswer: 'B',
    acceptedAnswers: ['B'],
    explanation: (
      <div>
        <p>Hasil kali akar: <MathView math="rs = \frac{c}{a} = \frac{c}{1} = c" />.</p>
        <p>Pertanyaan "Apakah <MathView math="rs < 0" />?" ekuivalen dengan menanyakan "Apakah <MathView math="c < 0" />?".</p>
        <ul className="list-disc pl-5 space-y-1 mt-1">
          <li><strong>Pernyataan (1):</strong> <MathView math="b < 0" /> hanya memberi tahu <MathView math="r + s = -b > 0" />, tanpa kepastian tanda <MathView math="c" />. (TIDAK CUKUP)</li>
          <li><strong>Pernyataan (2):</strong> <MathView math="c < 0" /> secara langsung memastikan bahwa <MathView math="rs = c < 0" /> (terjawab PASTI YA). (SUDAH CUKUP)</li>
        </ul>
        <p className="mt-2 font-bold text-indigo-700 dark:text-indigo-400">Pilihan yang tepat adalah (B).</p>
      </div>
    ),
  },
];

export const EvaluationSection: React.FC = () => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [showAllExplanations, setShowAllExplanations] = useState(false);
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({});

  const normalize = (str: string) =>
    (str || '').trim().toLowerCase().replace(/\s+/g, '').replace(/,/g, '.');

  const checkAnswer = (q: EvalQuestion, userAns: string) => {
    const cleanUser = normalize(userAns);
    if (!cleanUser) return false;
    const cleanTargets = [q.correctAnswer, ...q.acceptedAnswers].map(normalize);
    return cleanTargets.some((t) => t === cleanUser);
  };

  const calculateScore = () => {
    let correctCount = 0;
    evalQuestions.forEach((q) => {
      if (checkAnswer(q, answers[q.id])) {
        correctCount++;
      }
    });
    return Math.round((correctCount / evalQuestions.length) * 100);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const score = calculateScore();
    if (score >= 70) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setShowAllExplanations(false);
    setOpenItems({});
  };

  const score = calculateScore();
  const correctCount = evalQuestions.filter((q) => checkAnswer(q, answers[q.id])).length;

  return (
    <div id="evaluasi-5" className="my-12 p-6 md:p-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-lg">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800 gap-4">
        <div>
          <div className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            Uji Pemahaman Komprehensif
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
            Evaluasi 5
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Uji pemahamanmu secara menyeluruh dengan menyelesaikan 17 soal evaluasi Bab 5 berikut.
          </p>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={handleSubmit}
            className="flex-1 md:flex-none px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Award className="w-4 h-4" />
            <span>Periksa Jawaban Evaluasi</span>
          </button>
          {submitted && (
            <button
              onClick={handleReset}
              className="p-3 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              title="Reset Semua Jawaban"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Score Summary Card (Visible after submit) */}
      {submitted && (
        <div className="my-8 p-6 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border-2 border-indigo-500/30 dark:border-indigo-500/50 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-2xl bg-indigo-600 text-white flex flex-col items-center justify-center shadow-lg font-bold shrink-0">
              <span className="text-3xl leading-none">{score}</span>
              <span className="text-[10px] uppercase tracking-wider mt-1 opacity-90">/ 100</span>
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                {score >= 85 ? '🌟 Luar Biasa! Penguasaan Sangat Tinggi' : score >= 70 ? '👍 Bagus! Kamu Sudah Memahami Materi' : '💪 Perlu Lebih Banyak Latihan'}
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                Kamu menjawab benar <strong>{correctCount}</strong> dari <strong>{evalQuestions.length}</strong> butir soal.
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowAllExplanations(!showAllExplanations)}
            className="text-xs font-semibold px-4 py-2.5 bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-slate-700 rounded-xl hover:bg-indigo-50 dark:hover:bg-slate-700 transition-all shadow-sm"
          >
            {showAllExplanations ? 'Sembunyikan Semua Pembahasan' : 'Buka Semua Pembahasan'}
          </button>
        </div>
      )}

      {/* Question List */}
      <div className="mt-8 space-y-6">
        {evalQuestions.map((q) => {
          const userAns = answers[q.id] || '';
          const isCorrect = checkAnswer(q, userAns);
          const isOpen = showAllExplanations || openItems[q.id];

          return (
            <div
              key={q.id}
              className={`p-5 rounded-2xl border transition-all ${
                submitted
                  ? isCorrect
                    ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/20 dark:bg-emerald-950/10'
                    : 'border-rose-300 dark:border-rose-800 bg-rose-50/20 dark:bg-rose-950/10'
                  : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="text-sm md:text-base text-slate-800 dark:text-slate-200 font-medium leading-relaxed break-words">
                    {q.question}
                    {q.mathFormula && (
                      <MathView math={q.mathFormula} block className="text-left my-2" />
                    )}
                  </div>

                  {/* Input or Options */}
                  {q.type === 'options' && q.options ? (
                    <div className="mt-3 space-y-2">
                      {q.options.map((opt) => (
                        <label
                          key={opt.key}
                          className={`flex items-start gap-3 p-3 rounded-xl border text-sm cursor-pointer transition-all ${
                            userAns === opt.key
                              ? 'border-indigo-600 bg-indigo-50/80 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 font-semibold'
                              : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name={`eval-opt-${q.id}`}
                            value={opt.key}
                            checked={userAns === opt.key}
                            onChange={() =>
                              setAnswers((prev) => ({ ...prev, [q.id]: opt.key }))
                            }
                            className="mt-0.5 w-4 h-4 text-indigo-600 border-slate-300 focus:ring-indigo-500"
                          />
                          <span>
                            <strong>({opt.key})</strong> {opt.text}
                          </span>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-3 flex items-center gap-2">
                      <input
                        type="text"
                        value={userAns}
                        onChange={(e) =>
                          setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))
                        }
                        placeholder="Ketik jawabanmu di sini..."
                        className="w-full max-w-xs sm:max-w-sm px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-slate-100 font-mono"
                      />
                    </div>
                  )}

                  {/* Submit Feedback */}
                  {submitted && (
                    <div className="mt-3 flex items-center gap-2 text-xs font-semibold">
                      {isCorrect ? (
                        <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="w-4 h-4" /> Jawaban Benar
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400">
                          <XCircle className="w-4 h-4" /> Belum tepat (Kunci: <strong className="font-mono">{q.correctAnswer}</strong>)
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Explanation Toggle */}
                <button
                  onClick={() =>
                    setOpenItems((prev) => ({ ...prev, [q.id]: !prev[q.id] }))
                  }
                  className="p-2 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors shrink-0"
                  title="Lihat Pembahasan"
                >
                  {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
              </div>

              {/* Step by step solution */}
              {isOpen && (
                <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 text-sm text-slate-800 dark:text-slate-200 animate-fadeIn">
                  <div className="font-bold text-xs uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4" />
                    Pembahasan Lengkap:
                  </div>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
