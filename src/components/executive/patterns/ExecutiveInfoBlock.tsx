import type { ReactNode } from 'react';

type ExecutiveInfoBlockTone =
  | 'light'
  | 'dark'
  | 'accent';

type ExecutiveInfoBlockProps = {
  label: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  tone?: ExecutiveInfoBlockTone;
};

const toneClasses: Record<
  ExecutiveInfoBlockTone,
  {
    container: string;
    label: string;
    content: string;
  }
> = {
  light: {
    container:
      'border-slate-200 bg-white',
    label:
      'text-slate-500',
    content:
      'text-slate-900',
  },

  dark: {
    container:
      'border-slate-800 bg-slate-900',
    label:
      'text-slate-400',
    content:
      'text-slate-200',
  },

  accent: {
    container:
      'border-l-4 border-cyan-500 bg-slate-900',
    label:
      'text-cyan-400',
    content:
      'text-slate-300',
  },
};

export function ExecutiveInfoBlock({
  label,
  children,
  className = '',
  contentClassName = '',
  tone = 'light',
}: ExecutiveInfoBlockProps) {
  return (
    <div
      className={[
        'rounded-xl',
        'border',
        'p-4',
        toneClasses[tone].container,
        className,
      ].join(' ')}
    >
      <p
        className={[
          'text-xs',
          'font-semibold',
          'uppercase',
          'tracking-wide',
          toneClasses[tone].label,
        ].join(' ')}
      >
        {label}
      </p>

      <div
        className={[
          'mt-2',
          'text-sm',
          'leading-6',
          toneClasses[tone].content,
          contentClassName,
        ].join(' ')}
      >
        {children}
      </div>
    </div>
  );
}