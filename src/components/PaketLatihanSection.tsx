import React, { useState } from 'react';
import { paketAData, paketBData, UHQuestion } from '../data/uhExerciseData';
import { MathView } from './MathView';
import { MathText } from './MathText';
import { TanggaDiagramSvg } from './TanggaDiagramSvg';
import { TamanBacaDiagramSvg } from './TamanBacaDiagramSvg';
import { isAnswerCorrect } from '../lib/answerCheck';
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
  Download,
} from 'lucide-react';

interface AnswerState {
  input: string;
  option: string | null;
  answered: boolean;
  correct: boolean;
}

const EMPTY_ANSWER: AnswerState = {
  input: '',
  option: null,
  answered: false,
  correct: false,
};

interface QuestionCardProps {
  question: UHQuestion;
  mode: 'guided' | 'independent';
  answer: AnswerState;
  onChange: (next: AnswerState) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, mode, answer, onChange }) => {
  const [showHint, setShowHint] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [emptyWarning, setEmptyWarning] = useState(false);

  const isChoice = question.type === 'choice';
  const canCheck = isChoice ? Boolean(answer.option) : answer.input.trim().length > 0;

  const handleCheck = () => {
    if (!canCheck) {
      setEmptyWarning(true);
      return;
    }

    const correct = isChoice
      ? (answer.option || '').toUpperCase() === question.correctAnswer.toUpperCase()
      : isAnswerCorrect(answer.input, question.correctAnswer, question.acceptedAnswers);

    setEmptyWarning(false);
    onChange({ ...answer, answered: true, correct });
  };

  const handleReset = () => {
    setEmptyWarning(false);
    setShowHint(false);
    setShowExplanation(false);
    onChange(EMPTY_ANSWER);
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

      {/* Stimulus Context Box if present */}
      {question.stimulus && (
        <div className="my-3.5 p-4 sm:p-5 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/70 text-slate-800 dark:text-slate-200 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-black uppercase tracking-wider bg-indigo-600 text-white shadow-sm">
              <BookOpen className="w-3.5 h-3.5" />
              {question.stimulus.tag}
            </span>
            {question.stimulus.source && (
              <span className="text-[11px] font-medium text-indigo-700 dark:text-indigo-300 italic">
                Sumber: {question.stimulus.source}
              </span>
            )}
          </div>
          <h3 className="font-bold text-sm sm:text-base text-indigo-950 dark:text-indigo-100 mb-1.5">
            {question.stimulus.title}
          </h3>
          <MathText
            text={question.stimulus.text}
            className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300"
          />
        </div>
      )}

      {/* SVG Diagram if present */}
      {question.diagramType === 'tangga' && question.diagramConfig && (
        <TanggaDiagramSvg
          panjangTangga={question.diagramConfig.panjangTangga}
          tinggiLabel={question.diagramConfig.tinggiLabel}
          jarakLabel={question.diagramConfig.jarakLabel}
        />
      )}
      {question.diagramType === 'persegi-panjang' && question.persegiPanjangConfig && (
        <TamanBacaDiagramSvg
          selisihLabel={question.persegiPanjangConfig.selisihLabel}
          luasLabel={question.persegiPanjangConfig.luasLabel}
        />
      )}

      {/* Question Prompt */}
      <MathText
        text={question.question}
        className="text-sm sm:text-base leading-relaxed text-slate-800 dark:text-slate-200 font-medium"
      />

      {/* Formula Display if present */}
      {question.mathPrompt && (
        <div className="my-3 p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-center overflow-x-auto">
          <MathView block math={question.mathPrompt} />
        </div>
      )}

      {/* Input Options (Multiple Choice or Text Input) */}
      {isChoice && question.options ? (
        <div className="mt-4 space-y-2">
          {question.options.map((opt) => (
            <label
              key={opt.key}
              className={`flex items-center gap-3 p-3 rounded-xl border text-sm cursor-pointer transition-all min-h-[44px] ${
                answer.option === opt.key
                  ? 'border-indigo-600 bg-indigo-50/80 dark:bg-indigo-950/50 text-indigo-900 dark:text-indigo-200 font-medium'
                  : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
              }`}
            >
              <input
                type="radio"
                name={`opt-${question.id}`}
                value={opt.key}
                aria-label={`Pilihan ${opt.key}: ${opt.text}`}
                checked={answer.option === opt.key}
                onChange={() => {
                  setEmptyWarning(false);
                  onChange({ ...answer, option: opt.key });
                }}
                className="w-4 h-4 accent-indigo-600 dark:accent-indigo-500 focus:ring-indigo-500"
              />
              <span className="font-bold text-indigo-600 dark:text-indigo-400">{opt.key}.</span>
              <div className="flex-1">
                {opt.math ? (
                  <MathView math={opt.math} className="mx-1" />
                ) : (
                  <MathText text={opt.text} />
                )}
              </div>
            </label>
          ))}
        </div>
      ) : (
        <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <input
            type="text"
            value={answer.input}
            onChange={(e) => {
              setEmptyWarning(false);
              onChange({ ...answer, input: e.target.value });
            }}
            onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
            aria-label={`Ketik jawaban akhir untuk soal nomor ${question.number}`}
            placeholder="Ketik jawabanmu di sini..."
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[44px]"
          />
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-4 flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={handleCheck}
          className="min-h-[44px] px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-sm transition-all flex items-center justify-center"
        >
          Periksa Jawaban
        </button>

        {mode === 'guided' && question.hint && (
          <button
            onClick={() => setShowHint(!showHint)}
            aria-expanded={showHint}
            className="min-h-[44px] px-3.5 py-2.5 bg-amber-100 dark:bg-amber-950/60 hover:bg-amber-200 dark:hover:bg-amber-900/60 text-amber-800 dark:text-amber-300 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            {showHint ? 'Tutup Petunjuk' : 'Buka Petunjuk (Hint)'}
          </button>
        )}

        <button
          onClick={() => setShowExplanation(!showExplanation)}
          aria-expanded={showExplanation}
          className="min-h-[44px] px-3.5 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ml-0 sm:ml-auto"
        >
          {showExplanation ? 'Tutup Pembahasan' : mode === 'guided' ? 'Pembahasan Kelas' : 'Lihat Solusi Lengkap'}
          {showExplanation ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {answer.answered && (
          <button
            onClick={handleReset}
            aria-label={`Ulangi soal nomor ${question.number}`}
            title="Reset Soal"
            className="min-h-[44px] min-w-[44px] p-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Empty-input warning */}
      {emptyWarning && (
        <p
          role="alert"
          className="mt-3 text-xs sm:text-sm font-medium text-amber-700 dark:text-amber-300"
        >
          {isChoice
            ? 'Pilih salah satu opsi terlebih dahulu sebelum memeriksa jawaban.'
            : 'Isi jawabanmu terlebih dahulu sebelum memeriksa.'}
        </p>
      )}

      {/* Answer Status Feedback */}
      {answer.answered && (
        <div
          role="status"
          aria-live="polite"
          className={`mt-4 p-3.5 rounded-xl text-xs sm:text-sm flex items-center gap-2.5 animate-fadeIn ${
            answer.correct
              ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800'
              : 'bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-200 border border-rose-200 dark:border-rose-800'
          }`}
        >
          {answer.correct ? (
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
                <strong>Belum Tepat.</strong> Kunci yang diharapkan:{' '}
                <strong>{question.correctAnswer}</strong>. Periksa kembali langkah aljabarmu atau buka
                petunjuk/pembahasan.
              </span>
            </>
          )}
        </div>
      )}

      {/* Hint Accordion */}
      {showHint && question.hint && mode === 'guided' && (
        <div className="mt-3 p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs sm:text-sm text-amber-900 dark:text-amber-200 animate-fadeIn">
          <div className="font-bold flex items-center gap-1.5 mb-1 text-amber-800 dark:text-amber-300">
            <HelpCircle className="w-4 h-4" />
            Petunjuk Awal (Hint):
          </div>
          <MathText text={question.hint} />
        </div>
      )}

      {/* Full Explanation Accordion */}
      {showExplanation && (
        <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 animate-fadeIn">
          <div className="font-bold text-indigo-700 dark:text-indigo-400 flex items-center gap-1.5 uppercase text-xs tracking-wider mb-2">
            <BookOpen className="w-4 h-4" />
            Langkah Pembahasan & Kunci Jawaban
          </div>
          <MathText text={question.explanation} />
        </div>
      )}
    </div>
  );
};

export const PaketLatihanSection: React.FC = () => {
  const [activePaket, setActivePaket] = useState<'A' | 'B'>('A');
  const [answers, setAnswers] = useState<Record<string, AnswerState>>({});

  const currentQuestions = activePaket === 'A' ? paketAData : paketBData;
  const totalPoints = currentQuestions.reduce((sum, question) => sum + question.points, 0);
  const earnedPoints = currentQuestions.reduce(
    (sum, question) => sum + (answers[question.id]?.correct ? question.points : 0),
    0
  );
  const correctCount = currentQuestions.filter((question) => answers[question.id]?.correct).length;
  const answeredCount = currentQuestions.filter((question) => answers[question.id]?.answered).length;

  const handleChangeAnswer = (id: string, next: AnswerState) => {
    setAnswers((prev) => ({ ...prev, [id]: next }));
  };

  const handleResetCurrentPaket = () => {
    if (
      window.confirm(
        `Apakah kamu ingin mengosongkan semua isian dan mereset skor pada Paket ${activePaket}?`
      )
    ) {
      setAnswers((prev) => {
        const next = { ...prev };
        currentQuestions.forEach((question) => {
          delete next[question.id];
        });
        return next;
      });
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white shadow-xl border border-indigo-800/40 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-200 text-xs font-bold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            Latihan Berpasangan & Setara (Variasi Konteks)
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Latihan Ulangan Harian: Paket A & Paket B
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
            Dua paket soal dengan kisi-kisi dan tingkat kesulitan yang setara. <strong>Paket A</strong>{' '}
            dipelajari bersama di kelas dengan bantuan petunjuk bertahap (<em>guided mode</em>),
            sedangkan <strong>Paket B</strong> untuk latihan mandiri siswa di rumah (
            <em>independent practice</em>). Keduanya berformat pilihan ganda lima opsi; Paket B memakai
            variasi angka dan konteks agar bukan sekadar salinan Paket A.
          </p>
        </div>

        {/* Tab Switcher */}
        <div
          role="group"
          aria-label="Pilih paket latihan"
          className="mt-6 flex flex-wrap items-center gap-3 pt-4 border-t border-indigo-800/60"
        >
          <button
            onClick={() => setActivePaket('A')}
            aria-pressed={activePaket === 'A'}
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
            aria-pressed={activePaket === 'B'}
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
              : 'Kerjakan secara mandiri; petunjuk tidak ditampilkan agar kamu benar-benar menguji kesiapan sebelum Ulangan Harian.'}
          </p>
          <a
            href={`./downloads/paket-${activePaket.toLowerCase()}-soal.pdf`}
            download={`paket-${activePaket.toLowerCase()}-soal.pdf`}
            className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 dark:text-indigo-300 hover:underline"
          >
            <Download className="w-3.5 h-3.5" />
            Unduh soal Paket {activePaket} (PDF, 2 halaman)
          </a>
        </div>

        {/* Live Score Counter & Reset */}
        <div className="flex items-center gap-2">
          <div
            aria-live="polite"
            className="flex items-center gap-3 bg-slate-50 dark:bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 shrink-0"
          >
            <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <div className="text-xs">
              <div className="text-slate-500 dark:text-slate-400">Skor Latihan:</div>
              <div className="text-base font-extrabold text-slate-900 dark:text-slate-100">
                {earnedPoints}{' '}
                <span className="text-xs font-normal text-slate-500">/ {totalPoints}</span>
              </div>
            </div>
            <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
              {correctCount} / {currentQuestions.length} Benar
            </span>
          </div>

          {answeredCount > 0 && (
            <button
              onClick={handleResetCurrentPaket}
              aria-label={`Reset seluruh jawaban Paket ${activePaket}`}
              title={`Reset Latihan Paket ${activePaket}`}
              className="p-2.5 min-h-[44px] min-w-[44px] rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-100 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center justify-center active:scale-95"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Questions List */}
      <h2 className="sr-only">Daftar Soal Paket {activePaket}</h2>
      <div className="space-y-4">
        {currentQuestions.map((question) => (
          <QuestionCard
            key={question.id}
            question={question}
            mode={activePaket === 'A' ? 'guided' : 'independent'}
            answer={answers[question.id] || EMPTY_ANSWER}
            onChange={(next) => handleChangeAnswer(question.id, next)}
          />
        ))}
      </div>
    </div>
  );
};
