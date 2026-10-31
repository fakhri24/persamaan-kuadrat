/**
 * Pemeriksa jawaban yang toleran terhadap variasi penulisan siswa.
 *
 * Lapisan pertama: pencocokan string ternormalisasi terhadap kunci + daftar
 * jawaban yang diterima. Lapisan kedua: jika jawaban berupa kumpulan bilangan
 * (mis. "2 atau 5", "2 dan 5", "x = 2 atau x = 5", "2, 5", "{2, 5}", "-1/4"),
 * nilai dibandingkan sebagai himpunan bilangan sehingga variasi format dan
 * tanda minus Unicode tidak menghasilkan false negative.
 */

const normalize = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[\u2212\u2013\u2014]/g, '-')
    .replace(/\s+/g, '')
    .replace(/,/g, '.');

const parseNumber = (value: string): number | null => {
  const token = value
    .replace(/[{}]/g, '')
    .replace(/^[a-z]\s*=\s*/, '')
    .replace(/\s+/g, '')
    .trim();

  if (/^-?\d+(\.\d+)?$/.test(token)) return Number(token);

  const fraction = token.match(/^(-?\d+)\/(-?\d+)$/);
  if (fraction) {
    const numerator = Number(fraction[1]);
    const denominator = Number(fraction[2]);
    if (denominator !== 0) return numerator / denominator;
  }
  return null;
};

const numericSet = (value: string): string | null => {
  const cleaned = value
    .toLowerCase()
    .replace(/[{}]/g, '')
    .replace(/[\u2212\u2013\u2014]/g, '-');

  const tokens = cleaned
    .split(/\s*(?:atau|dan|,|;|\|)\s*/)
    .map((token) => token.trim())
    .filter(Boolean);

  if (tokens.length === 0) return null;

  const numbers = tokens.map(parseNumber);
  if (numbers.some((number) => number === null)) return null;

  return numbers
    .map((number) => number as number)
    .sort((a, b) => a - b)
    .map((number) => (Number.isInteger(number) ? String(number) : String(Math.round(number * 1e6) / 1e6)))
    .join(',');
};

const roundSet = (value: string | null) => value;

export const isAnswerCorrect = (
  userAnswer: string,
  correctAnswer: string,
  acceptedAnswers: string[] = []
): boolean => {
  const normalizedUser = normalize(userAnswer);
  if (!normalizedUser) return false;

  const targets = [correctAnswer, ...acceptedAnswers].map(normalize);
  if (targets.includes(normalizedUser)) return true;

  const userSet = roundSet(numericSet(userAnswer));
  if (userSet === null) return false;

  return targets.some((target) => numericSet(target) === userSet);
};

export const normalizeAnswer = normalize;
