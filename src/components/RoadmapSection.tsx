import React, { useState } from 'react';
import { roadmapData, MeetingPlan } from '../data/roadmapData';
import { Calendar, Compass, Target, CheckCircle2, Award, Lightbulb, BookOpen, ChevronRight } from 'lucide-react';

export const RoadmapSection: React.FC = () => {
  const [filterTarget, setFilterTarget] = useState<'All' | 'Dasar' | 'TKA' | 'SNBT'>('All');
  const [selectedMeeting, setSelectedMeeting] = useState<number | null>(null);

  const filteredMeetings = filterTarget === 'All'
    ? roadmapData
    : roadmapData.filter((m) => m.standardTarget === filterTarget);

  const getTargetBadge = (target: MeetingPlan['standardTarget']) => {
    switch (target) {
      case 'Dasar':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
            🟢 Standar Dasar (Fondasi)
          </span>
        );
      case 'TKA':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-100 text-sky-800 dark:bg-sky-950/80 dark:text-sky-300 border border-sky-300 dark:border-sky-800">
            🔵 Standar TKA (Nasional)
          </span>
        );
      case 'SNBT':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300 border border-purple-300 dark:border-purple-800">
            🟣 Standar SNBT (Penalaran)
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white shadow-xl border border-indigo-800/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-200 text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5" />
            Panduan Pembelajaran & Kurikulum
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Peta Alur Pembelajaran (8 Pertemuan)
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
            Struktur alur materi berjenjang (<em>scaffolding</em>) dari pemahaman konsep dasar untuk siswa berkemampuan lambat-sedang, hingga pencapaian standar <strong className="text-white font-bold">TKA (Tes Kemampuan Akademik)</strong> dan <strong className="text-white font-bold">SNBT</strong>. Setiap pertemuan dilengkapi pembagian jelas antara <strong className="text-white font-bold">Main Quest</strong> (wajib) dan <strong className="text-white font-bold">Side Quest</strong> (pengayaan cepat).
          </p>
        </div>

        {/* Filter Bar */}
        <div className="mt-6 flex flex-wrap items-center gap-2 pt-4 border-t border-indigo-800/60">
          <span className="text-xs font-semibold text-slate-300 mr-2">Filter Standar:</span>
          {(['All', 'Dasar', 'TKA', 'SNBT'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterTarget(tab)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filterTarget === tab
                  ? 'bg-indigo-500 text-white shadow-md'
                  : 'bg-white/10 hover:bg-white/20 text-slate-200'
              }`}
            >
              {tab === 'All' ? 'Semua Pertemuan (8)' : `Fokus: ${tab}`}
            </button>
          ))}
        </div>
      </div>

      {/* Sweet Spot Guide Alert */}
      <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 flex items-start gap-4">
        <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 shrink-0">
          <Target className="w-5 h-5" />
        </div>
        <div className="text-xs sm:text-sm text-amber-900 dark:text-amber-200 space-y-1">
          <div className="font-bold text-sm sm:text-base">Strategi Pedagogis "Sweet Spot":</div>
          <p>
            • <strong>Siswa Lambat ke Sedang</strong> difasilitasi melalui <em>Main Quest</em> (soal berangka bulat dan terstruktur di pertemuan 1 s.d. 6).
          </p>
          <p>
            • <strong>Siswa Cepat</strong> langsung diberikan <em>Side Quest</em> di sisa waktu kelas agar kemampuan analitis dan fleksibilitas berpikirnya tertantang tanpa menunggu seluruh kelas selesai.
          </p>
        </div>
      </div>

      {/* Timeline Meetings */}
      <div className="space-y-6">
        {filteredMeetings.map((plan) => {
          const isExpanded = selectedMeeting === plan.meetingNumber;
          return (
            <div
              key={plan.meetingNumber}
              className={`p-6 rounded-2xl border transition-all duration-200 ${
                isExpanded
                  ? 'bg-white dark:bg-slate-900 border-indigo-400 dark:border-indigo-600 shadow-lg'
                  : 'bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-slate-700 shadow-sm'
              }`}
            >
              <div
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer"
                onClick={() => setSelectedMeeting(isExpanded ? null : plan.meetingNumber)}
              >
                <div className="flex items-start sm:items-center gap-3">
                  <span className="w-10 h-10 rounded-2xl bg-indigo-600 text-white font-extrabold flex items-center justify-center text-base shrink-0 shadow-sm">
                    P{plan.meetingNumber}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      {getTargetBadge(plan.standardTarget)}
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {plan.duration}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                      {plan.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                    {isExpanded ? 'Tutup Rincian' : 'Buka Rincian'}
                    <ChevronRight className={`w-4 h-4 transform transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                  </span>
                </div>
              </div>

              {/* Focus Summary */}
              <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <strong>Fokus Pembahasan:</strong> {plan.focus}
              </p>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 space-y-6">
                  {/* Goals & Scaffolding */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                      <div className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        Target Capaian Esensial
                      </div>
                      <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                        {plan.essentialGoals.map((goal, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-emerald-500 font-bold">•</span>
                            <span>{goal}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                      <div className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-sky-500" />
                        Tahapan Scaffolding Siswa
                      </div>
                      <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                        {plan.scaffoldingSteps.map((step, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-sky-500 font-bold">{idx + 1}.</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Quest Breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Main Quest */}
                    <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60">
                      <div className="font-bold text-xs uppercase tracking-wider text-emerald-800 dark:text-emerald-300 mb-2 flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4" />
                        🛡️ Main Quest (Wajib Seluruh Siswa)
                      </div>
                      <ul className="space-y-1.5 text-xs text-emerald-900 dark:text-emerald-200">
                        {plan.mainQuests.map((quest, idx) => (
                          <li key={idx} className="font-medium flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                            {quest}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Side Quest */}
                    <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60">
                      <div className="font-bold text-xs uppercase tracking-wider text-amber-800 dark:text-amber-300 mb-2 flex items-center gap-1.5">
                        <Award className="w-4 h-4" />
                        ⚡ Side Quest (Pengayaan Siswa Cepat)
                      </div>
                      <ul className="space-y-1.5 text-xs text-amber-900 dark:text-amber-200">
                        {plan.sideQuests.map((quest, idx) => (
                          <li key={idx} className="font-medium flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                            {quest}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Teacher's Note */}
                  <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                    <div className="text-xs sm:text-sm text-indigo-950 dark:text-indigo-200">
                      <strong>Tips Pedagogis Guru:</strong> {plan.teacherTips}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
