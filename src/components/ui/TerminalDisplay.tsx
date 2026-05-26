import { ReactNode } from 'react';

interface TerminalDisplayProps {
  title?: string;
  children: ReactNode;
  scanline?: boolean;
  className?: string;
}

export default function TerminalDisplay({
  title = 'system',
  children,
  scanline = false,
  className = '',
}: TerminalDisplayProps) {
  return (
    <div className={`terminal-container relative overflow-hidden ${className}`}>
      <div className="terminal-bar">
        <span className="terminal-dot bg-red-500/80" />
        <span className="terminal-dot bg-yellow-500/80" />
        <span className="terminal-dot bg-green-500/80" />
        <span className="terminal-label ml-2">{title}</span>
      </div>
      <div className="p-4">
        {children}
      </div>
      {scanline && <div className="scanline-overlay" />}
    </div>
  );
}
