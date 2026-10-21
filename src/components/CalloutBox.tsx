import React from 'react';

interface CalloutBoxProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'formula' | 'definition' | 'summary' | 'plain';
}

export const CalloutBox: React.FC<CalloutBoxProps> = ({
  children,
  className = '',
  variant = 'formula',
}) => {
  const variantStyles = {
    formula: 'border-2 border-slate-700 dark:border-slate-300 bg-white/90 dark:bg-slate-900/90 shadow-sm rounded-lg',
    definition: 'border border-indigo-400 dark:border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30 rounded-lg shadow-sm',
    summary: 'border-2 border-emerald-500/80 dark:border-emerald-500/80 bg-emerald-50/40 dark:bg-emerald-950/20 rounded-lg',
    plain: 'border border-slate-600 dark:border-slate-400 bg-slate-50/80 dark:bg-slate-900/80 rounded-md',
  };

  return (
    <div className={`p-4 md:p-5 my-3 md:my-4 transition-all duration-200 ${variantStyles[variant]} ${className}`}>
      {children}
    </div>
  );
};
