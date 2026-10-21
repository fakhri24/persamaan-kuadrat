import React, { useState } from 'react';
import { paketAData, paketBData, UHQuestion } from '../data/uhExerciseData';
import { MathView } from './MathView';
import {
  Users,
  Home,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Award,
  BookOpen,
} from 'lucide-react';

interface QuestionCardProps {
  question: UHQuestion;
  mode: 'guided' | 'independent';
  onAnswerChecked?: (id: string, isCorrect: boolean) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, mode, onAnswerChecked }) => {
  const [userInput, setUserInput] = useState('');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const normalize = (str: string) =>
    str.trim().toLowerCase().replace(/\s+/g, '').replace(/,/g, '.');

  const handleCheck = () => {
    let correct = false;
    if (question.type === 'choice' && selectedOption) {
      correct = selectedOption.toUpperCase() === question.correctAnswer.toUpperCase();
    } else {
      const cleanUser = normalize(userInput);
      const targets = [question.correctAnswer, ...question.acceptedAnswers].map(normalize);
      correct = targets.some((t) => t === cleanUser);
    }
    setIsCorrect(correct);
    setIsAnswered(true);
    if (onAnswerChecked) {
      onAnswerChecked(question.id, correct);
    }
  };

  const handleReset = () => {
    setUserInput('');
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setShowHint(false);
    setShowExplanation(false);
    if (onAnswerChecked) {
      onAnswerChecked(question.id, false);
    }
  };

  return (
    <div className="p-5 my-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm hover:border-indigo-300 dark:hover:border-slate-700 transition-all overflow-hidden">
      {/* Top Header of Question */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-extrabold flex items-center justify-center text-sm shadow-sm">
            {question.number}
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-900">
            {question.categoryTag}
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            {question.cognitiveLevel}
          </span>
        </div>
        <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
          Bobot: {question.points} Poin
        </div>
      </div>

      {/* Question Prompt */}
      <div className="text-sm sm:text-base leading-relaxed text-slate-800 dark:text-slate-200">
        {question.question}
      </div>

      {/* Formula Display if present */}
      {question.mathPrompt && (
        <div className="my-3 p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-center overflow-x-auto">
          <MathView block math={question.mathPrompt} />
        </div>
      )}

      {/* Input Options (Multiple Choice or Text Input) */}
      {question.type === 'choice' && question.options ? (
        <div className="mt-4 space-y-2">
          {question.options.map((opt) => (
            <label
              key={opt.key}
              className={`flex items-center gap-3 p-3 rounded-xl border text-sm cursor-pointer transition-all ${
                selectedOption === opt.key
                  ? 'border-indigo-600 bg-indigo-50/80 dark:bg-indigo-950/50 text-indigo-900 dark:text-indigo-200 font-medium'
                  : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
              }`}
            >
              <input
                type="radio"
                name={`opt-${question.id}`}
                value={opt.key}
                checked={selectedOption === opt.key}
                onChange={() => setSelectedOption(opt.key)}
                className="w-4 h-4 text-indigo-600 border-slate-300 focus:ring-indigo-500"
              />
              <span className="font-bold text-indigo-600 dark:text-indigo-400">{opt.key}.</span>
              <span className="flex-1">
                {opt.text}
                {opt.math && <MathView math={opt.math} className="ml-1 inline-block" />}
              </span>
            </label>
          ))}
        </div>
      ) : (
        <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
            placeholder="Ketik jawabanmu di sini..."
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-4 flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={handleCheck}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-sm transition-all"
        >
          Periksa Jawaban
        </button>

        {question.hint && (
          <button
            onClick={() => setShowHint(!showHint)}
            className="px-3 py-2 bg-amber-100 dark:bg-amber-950/60 hover:bg-amber-200 dark:hover:bg-amber-900/60 text-amber-800 dark:text-amber-300 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            {showHint ? 'Tutup Petunjuk' : 'Buka Petunjuk (Hint)'}
          </button>
        )}

        <button
          onClick={() => setShowExplanation(!showExplanation)}
          className="px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ml-auto"
        >
          {showExplanation ? 'Tutup Pembahasan' : mode === 'guided' ? 'Pembahasan Kelas' : 'Lihat Solusi Lengkap'}
          {showExplanation ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {isAnswered && (
          <button
            onClick={handleReset}
            title="Reset Soal"
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Answer Status Feedback */}
      {isAnswered && (
        <div
          className={`mt-4 p-3.5 rounded-xl text-xs sm:text-sm flex items-center gap-2.5 animate-fadeIn ${
            isCorrect
              ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800'
              : 'bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-200 border border-rose-200 dark:border-rose-800'
          }`}
        >
          {isCorrect ? (
            <>
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              <span>
                <strong>Benar Sekali!</strong> Jawabanmu tepat (+{question.points} poin).
              </span>
            </>
          ) : (
            <>
              <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
              <span>
                <strong>Belum Tepat.</strong> Kunci yang diharapkan: <strong>{question.correctAnswer}</strong>. Periksa kembali langkah aljabarmu atau buka petunjuk/pembahasan.
              </span>
            </>
          )}
        </div>
      )}

      {/* Hint Accordion */}
      {showHint && question.hint && (
        <div className="mt-3 p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs sm:text-sm text-amber-900 dark:text-amber-200 animate-fadeIn">
          <div className="font-bold flex items-center gap-1.5 mb-1 text-amber-800 dark:text-amber-300">
            <HelpCircle className="w-4 h-4" />
            Petunjuk Awal (Hint):
          </div>
          <p>{question.hint}</p>
        </div>
      )}

      {/* Full Explanation Accordion */}
      {showExplanation && (
        <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 animate-fadeIn space-y-2">
          <div className="font-bold text-indigo-700 dark:text-indigo-400 flex items-center gap-1.5 uppercase text-xs tracking-wider">
            <BookOpen className="w-4 h-4" />
            Langkah Pembahasan & Kunci Jawaban
          </div>
          <p className="whitespace-pre-line leading-relaxed">{question.explanation}</p>
        </div>
      )}
    </div>
  );
};

export const PaketLatihanSection: React.FC = () => {
  const [activePaket, setActivePaket] = useState<'A' | 'B'>('A');
  const [scores, setScores] = useState<Record<string, boolean>>({});

  const handleScoreUpdate = (id: string, correct: boolean) => {
    setScores((prev) => ({ ...prev, [id]: correct }));
  };

  const currentQuestions = activePaket === 'A' ? paketAData : paketBData;
  const correctCount = currentQuestions.filter((q) => scores[q.id]).length;
  const currentTotalScore = correctCount * 10;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white shadow-xl border border-indigo-800/40 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-200 text-xs font-bold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            Latihan Berpasangan & Setara (Isomorfik)
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Latihan Ulangan Harian: Paket A & Paket B
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
            Dua paket soal dengan kisi-kisi dan tingkat kesulitan yang setara persis. <strong>Paket A</strong> disiapkan untuk dipelajari bersama di kelas dengan bantuan petunjuk bertahap (*guided mode*), sedangkan <strong>Paket B</strong> disiapkan untuk latihan mandiri siswa di rumah (*independent practice*).
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="mt-6 flex flex-wrap items-center gap-3 pt-4 border-t border-indigo-800/60">
          <button
            onClick={() => setActivePaket('A')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
              activePaket === 'A'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 ring-2 ring-indigo-400'
                : 'bg-white/10 hover:bg-white/20 text-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            Paket A (Dikerjakan Bersama di Kelas)
          </button>

          <button
            onClick={() => setActivePaket('B')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
              activePaket === 'B'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 ring-2 ring-indigo-400'
                : 'bg-white/10 hover:bg-white/20 text-slate-200'
            }`}
          >
            <Home className="w-4 h-4" />
            Paket B (Belajar Mandiri di Rumah)
          </button>
        </div>
      </div>

      {/* Mode Information & Score Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 text-sm sm:text-base">
            {activePaket === 'A' ? (
              <>
                <Users className="w-5 h-5 text-indigo-600" />
                <span>Mode Kelas Terpandu (Paket A)</span>
              </>
            ) : (
              <>
                <Home className="w-5 h-5 text-emerald-600" />
                <span>Mode Belajar Mandiri (Paket B)</span>
              </>
            )}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {activePaket === 'A'
              ? 'Gunakan tombol Hint jika mengalami kendala, diskusikan langkah penyelesaian bersama teman/guru.'
              : 'Kerjakan secara mandiri tanpa melihat kunci terlebih dahulu untuk menguji kesiapan sebelum Ulangan Harian.'}
          </p>
        </div>

        {/* Live Score Counter */}
        <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 shrink-0">
          <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <div className="text-xs">
            <div className="text-slate-400">Skor Latihan:</div>
            <div className="text-base font-extrabold text-slate-900 dark:text-slate-100">
              {currentTotalScore} <span className="text-xs font-normal text-slate-500">/ 100</span>
            </div>
          </div>
          <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
            {correctCount} / 10 Benar
          </span>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {currentQuestions.map((q) => (
          <QuestionCard
            key={q.id}
            question={q}
            mode={activePaket === 'A' ? 'guided' : 'independent'}
            onAnswerChecked={handleScoreUpdate}
          />
        ))}
      </div>
    </div>
  );
};
