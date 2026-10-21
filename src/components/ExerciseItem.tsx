import React, { useState } from 'react';
import { MathView } from './MathView';
import { CheckCircle2, XCircle, ChevronDown, ChevronUp, HelpCircle, RefreshCw } from 'lucide-react';

export interface ExerciseProps {
  id: string;
  numberLabel: string;
  questType?: 'main' | 'side';
  question: React.ReactNode;
  mathQuestion?: string;
  type?: 'text' | 'options' | 'checkboxes';
  options?: { key: string; text: React.ReactNode; math?: string }[];
  checkboxItems?: { id: string; text: React.ReactNode; math?: string; isCorrect: boolean }[];
  correctAnswer?: string; // e.g. "4", "-3", "A", "m = 5"
  acceptedAnswers?: string[];
  explanation: React.ReactNode;
}

export const ExerciseItem: React.FC<ExerciseProps> = ({
  numberLabel,
  questType,
  question,
  mathQuestion,
  type = 'text',
  options,
  checkboxItems,
  correctAnswer,
  acceptedAnswers = [],
  explanation,
}) => {
  const [userInput, setUserInput] = useState('');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [checkedBoxes, setCheckedBoxes] = useState<Record<string, boolean>>({});
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const normalize = (str: string) =>
    str.trim().toLowerCase().replace(/\s+/g, '').replace(/,/g, '.');

  const handleCheck = () => {
    let correct = false;
    if (type === 'options' && selectedOption) {
      correct = selectedOption.toUpperCase() === (correctAnswer || '').toUpperCase();
    } else if (type === 'checkboxes' && checkboxItems) {
      correct = checkboxItems.every(
        (item) => (checkedBoxes[item.id] || false) === item.isCorrect
      );
    } else {
      const cleanUser = normalize(userInput);
      const targets = [correctAnswer || '', ...acceptedAnswers].map(normalize);
      correct = targets.some((t) => t === cleanUser);
    }
    setIsCorrect(correct);
    setIsAnswered(true);
  };

  const handleReset = () => {
    setUserInput('');
    setSelectedOption(null);
    setCheckedBoxes({});
    setIsAnswered(false);
    setIsCorrect(false);
    setShowExplanation(false);
  };

  return (
    <div className="p-4 md:p-5 my-4 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm hover:border-indigo-300 dark:hover:border-slate-700 transition-all overflow-hidden">
      <div className="flex items-start gap-3">
        <div className="flex flex-col gap-1.5 shrink-0">
          <span className="inline-flex items-center justify-center font-bold px-2.5 py-1 text-sm bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 rounded-lg">
            {numberLabel}
          </span>
          {questType === 'main' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
              🛡️ Main
            </span>
          )}
          {questType === 'side' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
              ⚡ Side
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-slate-800 dark:text-slate-200 text-sm md:text-base leading-relaxed break-words">
            {question}
            {mathQuestion && <MathView math={mathQuestion} className="mx-1" />}
          </div>

          {/* Type: Multiple Choice Options */}
          {type === 'options' && options && (
            <div className="mt-3 space-y-2">
              {options.map((opt) => (
                <label
                  key={opt.key}
                  className={`flex items-center gap-3 p-2.5 rounded-lg border text-sm cursor-pointer transition-all ${
                    selectedOption === opt.key
                      ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name={`opt-${numberLabel}`}
                    value={opt.key}
                    checked={selectedOption === opt.key}
                    onChange={() => setSelectedOption(opt.key)}
                    className="w-4 h-4 text-indigo-600 border-slate-300 focus:ring-indigo-500"
                  />
                  <span className="font-bold">{opt.key}.</span>
                  <span>{opt.text}</span>
                  {opt.math && <MathView math={opt.math} className="ml-1" />}
                </label>
              ))}
            </div>
          )}

          {/* Type: Checkboxes */}
          {type === 'checkboxes' && checkboxItems && (
            <div className="mt-3 space-y-2">
              {checkboxItems.map((item) => (
                <label
                  key={item.id}
                  className={`flex items-start gap-3 p-2.5 rounded-lg border text-sm cursor-pointer transition-all ${
                    checkedBoxes[item.id]
                      ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30 text-indigo-900 dark:text-indigo-200'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checkedBoxes[item.id] || false}
                    onChange={(e) =>
                      setCheckedBoxes((prev) => ({
                        ...prev,
                        [item.id]: e.target.checked,
                      }))
                    }
                    className="mt-0.5 w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                  />
                  <span>
                    {item.text}
                    {item.math && <MathView math={item.math} className="ml-1" />}
                  </span>
                </label>
              ))}
            </div>
          )}

          {/* Type: Short Input */}
          {type === 'text' && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
                placeholder="Ketik jawaban kamu di sini..."
                className="w-full max-w-xs sm:max-w-sm px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-slate-100"
              />
            </div>
          )}

          {/* Action Buttons & Feedback */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button
              onClick={handleCheck}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
            >
              Periksa Jawaban
            </button>

            {isAnswered && (
              <button
                onClick={handleReset}
                title="Coba Lagi"
                className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className="ml-auto inline-flex items-center gap-1 px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-800/80 rounded-lg transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{showExplanation ? 'Tutup Pembahasan' : 'Lihat Pembahasan'}</span>
              {showExplanation ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Result Alert */}
          {isAnswered && (
            <div
              className={`mt-3 p-3 rounded-lg flex items-center gap-2 text-sm ${
                isCorrect
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                  : 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
              }`}
            >
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span><strong>Hebat!</strong> Jawabanmu tepat sekali.</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-amber-600 shrink-0" />
                  <span>
                    Jawabanmu belum tepat. Coba periksa kembali atau klik tombol <em>Lihat Pembahasan</em> di samping!
                  </span>
                </>
              )}
            </div>
          )}

          {/* Step by Step Explanation Box */}
          {showExplanation && (
            <div className="mt-4 p-4 bg-indigo-50/50 dark:bg-slate-800/70 border border-indigo-100 dark:border-slate-700/80 rounded-xl text-sm leading-relaxed text-slate-800 dark:text-slate-200 animate-fadeIn">
              <div className="font-bold text-xs uppercase tracking-wider text-indigo-700 dark:text-indigo-400 mb-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
                Pembahasan Langkah Demi Langkah:
              </div>
              <div className="space-y-1.5">{explanation}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
