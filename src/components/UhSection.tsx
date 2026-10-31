import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { uhQuestionsData, UHQuestion } from '../data/uhExerciseData';
import { MathView } from './MathView';
import { MathText } from './MathText';
import { TanggaDiagramSvg } from './TanggaDiagramSvg';
import { isAnswerCorrect } from '../lib/answerCheck';
import {
  Trophy,
  Sparkles,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  BookOpen,
  Star,
  ShieldCheck,
} from 'lucide-react';

export const UhSection: React.FC = () => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [checkedState, setCheckedState] = useState<Record<string, { answered: boolean; correct: boolean }>>({});
  const [openExplanations, setOpenExplanations] = useState<Record<string, boolean>>({});
  const [emptyWarnings, setEmptyWarnings] = useState<Record<string, boolean>>({});

  const handleCheckQuestion = (q: UHQuestion) => {
    let correct = false;
    if (q.type === 'choice') {
      const selected = selectedOptions[q.id];
      if (!selected) {
        setEmptyWarnings((prev) => ({ ...prev, [q.id]: true }));
        return;
      }
      correct = selected.toUpperCase() === q.correctAnswer.toUpperCase();
    } else {
      const userText = answers[q.id] || '';
      if (!userText.trim()) {
        setEmptyWarnings((prev) => ({ ...prev, [q.id]: true }));
        return;
      }
      correct = isAnswerCorrect(userText, q.correctAnswer, q.acceptedAnswers);
    }

    setEmptyWarnings((prev) => ({ ...prev, [q.id]: false }));
    setCheckedState((prev) => ({
      ...prev,
      [q.id]: { answered: true, correct },
    }));

    if (correct && q.isOptional) {
      // Little star confetti for answering bonus question correctly!
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.7 },
      });
    }
  };

  const handleResetQuestion = (id: string) => {
    setAnswers((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setSelectedOptions((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setCheckedState((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setOpenExplanations((prev) => ({ ...prev, [id]: false }));
    setEmptyWarnings((prev) => ({ ...prev, [id]: false }));
  };

  const handleResetAll = () => {
    if (window.confirm('Apakah kamu ingin mengosongkan semua jawaban dan mereset nilai Ulangan Harian ini?')) {
      setCheckedState({});
      setAnswers({});
      setSelectedOptions({});
      setOpenExplanations({});
      setEmptyWarnings({});
    }
  };

  // Calculate scores
  const wajibQuestions = uhQuestionsData.filter((q) => !q.isOptional);
  const opsionalQuestions = uhQuestionsData.filter((q) => q.isOptional);

  const wajibScore = wajibQuestions.reduce((acc, q) => {
    return acc + (checkedState[q.id]?.correct ? q.points : 0);
  }, 0);

  const bonusScore = opsionalQuestions.reduce((acc, q) => {
    return acc + (checkedState[q.id]?.correct ? q.points : 0);
  }, 0);

  const totalScore = wajibScore + bonusScore;
  const isPassed = totalScore >= 75;

  const handleCelebration = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const getLevelBadge = (level: UHQuestion['cognitiveLevel']) => {
    switch (level) {
      case 'Dasar':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
            🟢 Dasar
          </span>
        );
      case 'Standar TKA':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 border border-sky-300 dark:border-sky-800">
            🔵 Standar TKA
          </span>
        );
      case 'Standar SNBT':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border border-purple-300 dark:border-purple-800">
            🟣 Standar SNBT
          </span>
        );
      case 'Problem Solving SNBT':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
            🌟 Side Quest Opsional
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white shadow-xl border border-indigo-800/40 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-200 text-xs font-bold uppercase tracking-wider mb-3">
            <Trophy className="w-3.5 h-3.5" />
            Evaluasi Resmi Bab 5
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Ulangan Harian Persamaan Kuadrat
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
            Format resmi evaluasi: <strong>10 Soal Wajib</strong> (maksimal 100 poin) + <strong>2 Soal Opsional</strong> (maksimal +10 bonus poin). Dirancang dengan zona <em>Sweet Spot</em> yang ramah bagi siswa berkemampuan lambat-sedang sekaligus menantang kemampuan <em>problem solving</em> siswa cepat.
          </p>
        </div>

        {/* Live Scorecard Banner */}
        <div className="mt-6 pt-6 border-t border-indigo-800/60 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
            <div className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">Soal Wajib (1-10)</div>
            <div className="text-xl sm:text-2xl font-black text-white mt-1">
              {wajibScore} <span className="text-xs font-normal text-slate-300">/ 100</span>
            </div>
          </div>

          <div className="p-3 bg-amber-500/20 rounded-2xl backdrop-blur-sm border border-amber-500/30">
            <div className="text-[11px] font-semibold text-amber-200 uppercase tracking-wider flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
              Bonus Opsional (11-12)
            </div>
            <div className="text-xl sm:text-2xl font-black text-amber-300 mt-1">
              +{bonusScore} <span className="text-xs font-normal text-amber-200">/ 10</span>
            </div>
          </div>

          <div className="p-3 bg-indigo-500/20 rounded-2xl backdrop-blur-sm border border-indigo-500/30">
            <div className="text-[11px] font-semibold text-indigo-200 uppercase tracking-wider">Total Skor Akhir</div>
            <div className="text-xl sm:text-2xl font-black text-indigo-300 mt-1">
              {totalScore} <span className="text-xs font-normal text-indigo-200">/ 110</span>
            </div>
          </div>

          <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10 flex flex-col justify-center">
            <div className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">Status KKM (75)</div>
            <div className="mt-1">
              {isPassed ? (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-950/70 px-2 py-0.5 rounded-lg border border-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Lulus KKM
                </span>
              ) : (
                <span className="text-xs font-bold text-slate-300">
                  Perlu {75 - totalScore} poin lagi
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Reset All Button */}
        {(totalScore > 0 || Object.keys(checkedState).length > 0) && (
          <div className="mt-4 pt-4 border-t border-indigo-800/40 flex justify-end">
            <button
              onClick={handleResetAll}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-sm border border-white/20 transition-all active:scale-95 min-h-[44px]"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Jawaban Ulangan</span>
            </button>
          </div>
        )}
      </div>

      {/* Rules Notice */}
      <div className="p-5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 flex items-start gap-4">
        <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-indigo-950 dark:text-indigo-200 space-y-1">
          <div className="font-bold text-sm sm:text-base">Ketentuan Pengerjaan Ulangan Harian:</div>
          <p>
            1. Kerjakan <strong>Soal Wajib 1 s.d. 10</strong> terlebih dahulu. Setiap nomor bernilai 10 poin (total 100 poin).
          </p>
          <p>
            2. <strong>Soal 11 & 12 bersifat OPSIONAL</strong> dengan nilai masing-masing +5 poin bonus (total bonus +10 poin). Soal ini dapat menambah nilai portofolio atau mengompensasi kesalahan pada soal wajib.
          </p>
        </div>
      </div>

      {/* Questions List */}
      <h2 className="sr-only">Daftar Soal Ulangan Harian</h2>
      <div className="space-y-6">
        {uhQuestionsData.map((q) => {
          const state = checkedState[q.id];
          const isAnswered = state?.answered || false;
          const isCorrect = state?.correct || false;
          const isExpOpen = openExplanations[q.id] || false;

          return (
            <div
              key={q.id}
              className={`p-6 rounded-2xl border transition-all duration-200 ${
                q.isOptional
                  ? 'bg-amber-50/40 dark:bg-amber-950/20 border-amber-300/80 dark:border-amber-800/80'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
              } shadow-sm hover:border-indigo-300 dark:hover:border-slate-700`}
            >
              {/* Question Top Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-9 h-9 rounded-2xl font-extrabold flex items-center justify-center text-sm shadow-sm ${
                      q.isOptional
                        ? 'bg-amber-600 text-white'
                        : 'bg-indigo-600 text-white'
                    }`}
                  >
                    {q.number}
                  </span>
                  {getLevelBadge(q.cognitiveLevel)}
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {q.categoryTag}
                  </span>
                </div>
                <div
                  className={`text-xs font-bold px-2.5 py-1 rounded-xl ${
                    q.isOptional
                      ? 'bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200'
                      : 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300'
                  }`}
                >
                  {q.isOptional ? `Bonus Maks +${q.points} Poin` : `Bobot: ${q.points} Poin`}
                </div>
              </div>

              {/* Stimulus Context Box if present */}
              {q.stimulus && (
                <div className="my-3.5 p-4 sm:p-5 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/70 text-slate-800 dark:text-slate-200 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-black uppercase tracking-wider bg-indigo-600 text-white shadow-sm">
                      <BookOpen className="w-3.5 h-3.5" />
                      {q.stimulus.tag}
                    </span>
                    {q.stimulus.source && (
                      <span className="text-[11px] font-medium text-indigo-700 dark:text-indigo-300 italic">
                        Sumber: {q.stimulus.source}
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-indigo-950 dark:text-indigo-100 mb-1.5">
                    {q.stimulus.title}
                  </h3>
                  <MathText
                    text={q.stimulus.text}
                    className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300"
                  />
                </div>
              )}

              {/* SVG Diagram if present */}
              {q.diagramType === 'tangga' && q.diagramConfig && (
                <TanggaDiagramSvg
                  panjangTangga={q.diagramConfig.panjangTangga}
                  tinggiLabel={q.diagramConfig.tinggiLabel}
                  jarakLabel={q.diagramConfig.jarakLabel}
                />
              )}

              {/* Question Text */}
              <MathText
                text={q.question}
                className="text-sm sm:text-base leading-relaxed text-slate-800 dark:text-slate-200 font-medium"
              />

              {/* Math Prompt if any */}
              {q.mathPrompt && (
                <div className="my-3 p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-center overflow-x-auto">
                  <MathView block math={q.mathPrompt} />
                </div>
              )}

              {/* Input Area */}
              {q.type === 'choice' && q.options ? (
                <div className="mt-4 space-y-2">
                  {q.options.map((opt) => (
                    <label
                      key={opt.key}
                      className={`flex items-center gap-3 p-3 rounded-xl border text-sm cursor-pointer transition-all ${
                        selectedOptions[q.id] === opt.key
                          ? 'border-indigo-600 bg-indigo-50/80 dark:bg-indigo-950/50 text-indigo-900 dark:text-indigo-200 font-medium'
                          : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`uh-opt-${q.id}`}
                        value={opt.key}
                        aria-label={`Pilihan ${opt.key}: ${opt.text}`}
                        checked={selectedOptions[q.id] === opt.key}
                        onChange={() => {
                          setEmptyWarnings((prev) => ({ ...prev, [q.id]: false }));
                          setSelectedOptions((prev) => ({ ...prev, [q.id]: opt.key }));
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
                <div className="mt-4">
                  <input
                    type="text"
                    value={answers[q.id] || ''}
                    onChange={(e) => {
                      setEmptyWarnings((prev) => ({ ...prev, [q.id]: false }));
                      setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }));
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && handleCheckQuestion(q)}
                    aria-label={`Ketik jawaban akhir untuk soal nomor ${q.number}`}
                    placeholder="Tuliskan jawaban akhirmu di sini..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[44px]"
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-4 flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => handleCheckQuestion(q)}
                  className={`min-h-[44px] px-5 py-2.5 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-sm transition-all active:scale-95 flex items-center justify-center ${
                    q.isOptional
                      ? 'bg-amber-600 hover:bg-amber-700'
                      : 'bg-indigo-600 hover:bg-indigo-700'
                  }`}
                >
                  Periksa Jawaban
                </button>

                <button
                  onClick={() =>
                    setOpenExplanations((prev) => ({ ...prev, [q.id]: !isExpOpen }))
                  }
                  aria-expanded={isExpOpen}
                  className="min-h-[44px] px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ml-0 sm:ml-auto"
                >
                  {isExpOpen ? 'Tutup Pembahasan' : 'Buka Pembahasan'}
                  {isExpOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                {isAnswered && (
                  <button
                    onClick={() => handleResetQuestion(q.id)}
                    aria-label={`Ulangi soal nomor ${q.number}`}
                    title="Ulangi Soal"
                    className="min-h-[44px] min-w-[44px] p-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Empty-input warning */}
              {emptyWarnings[q.id] && (
                <p role="alert" className="mt-3 text-xs sm:text-sm font-medium text-amber-700 dark:text-amber-300">
                  {q.type === 'choice'
                    ? 'Pilih salah satu opsi terlebih dahulu sebelum memeriksa jawaban.'
                    : 'Isi jawabanmu terlebih dahulu sebelum memeriksa.'}
                </p>
              )}

              {/* Feedback Alert */}
              {isAnswered && (
                <div
                  role="status"
                  aria-live="polite"
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
                        <strong>Jawaban Tepat!</strong> {q.isOptional ? `Bonus +${q.points} poin diraih!` : `+${q.points} poin ditambahkan.`}
                      </span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                      <span>
                        <strong>Kurang Tepat.</strong> Kunci yang diharapkan: <strong>{q.correctAnswer}</strong>. Periksa langkahmu melalui tombol pembahasan.
                      </span>
                    </>
                  )}
                </div>
              )}

              {/* Explanation Dropdown */}
              {isExpOpen && (
                <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 animate-fadeIn space-y-2">
                  <div className="font-bold text-indigo-700 dark:text-indigo-400 flex items-center gap-1.5 uppercase text-xs tracking-wider">
                    <BookOpen className="w-4 h-4" />
                    Pembahasan Resmi & Solusi Langkah Demi Langkah
                  </div>
                  <MathText text={q.explanation} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Floating Bottom Card / Final Action */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            Rekap Hasil Ulangan Harian
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Wajib: <strong>{wajibScore}/100</strong> • Bonus: <strong>+{bonusScore}/10</strong> • Total Akhir: <strong>{totalScore}/110</strong>
          </div>
        </div>

        <button
          onClick={handleCelebration}
          className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-800 hover:from-indigo-500 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          <Sparkles className="w-4 h-4" />
          Rayakan Hasil Belajar!
        </button>
      </div>
    </div>
  );
};
