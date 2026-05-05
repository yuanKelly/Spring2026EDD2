import { useTheme } from '../../contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className="relative rounded-full transition-colors min-h-0 flex items-center"
      style={{
        width: '54px',
        height: '28px',
        padding: '2px',
        background: isDark
          ? 'linear-gradient(135deg, #1a2242, #253052)'
          : 'linear-gradient(135deg, #dde2ee, #c8d0e0)',
        border: `1px solid ${isDark ? '#374569' : '#a8b2c7'}`,
        boxShadow: isDark
          ? 'inset 0 1px 2px rgba(0,0,0,0.3)'
          : 'inset 0 1px 2px rgba(0,0,0,0.08)',
      }}
    >
      {/* Knob */}
      <div
        className="absolute top-1/2 flex items-center justify-center rounded-full transition-all"
        style={{
          width: '22px',
          height: '22px',
          transform: `translate(${isDark ? '2px' : '26px'}, -50%)`,
          background: isDark
            ? 'linear-gradient(135deg, #fbbf24, #f59e0b)'
            : 'linear-gradient(135deg, #ffffff, #eef1f8)',
          boxShadow: isDark
            ? '0 0 8px rgba(251, 191, 36, 0.5), 0 1px 2px rgba(0,0,0,0.4)'
            : '0 0 6px rgba(13, 148, 136, 0.35), 0 1px 2px rgba(0,0,0,0.15)',
        }}
      >
        {isDark ? (
          /* Moon */
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
              fill="#0b0f24"
            />
          </svg>
        ) : (
          /* Sun */
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            <circle cx="12" cy="12" r="4" fill="#fbbf24" stroke="#b45309" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </svg>
        )}
      </div>
    </button>
  );
}
