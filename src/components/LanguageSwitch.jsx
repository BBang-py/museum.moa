export default function LanguageSwitch({ language, onLanguageChange, label = '언어 선택' }) {
  return (
    <div className="language-switch" aria-label={label}>
      <svg
        className="globe-icon"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9.25" />
        <path d="M3.25 12h17.5" />
        <path d="M12 2.75c2.35 2.55 3.55 5.65 3.55 9.25S14.35 18.7 12 21.25" />
        <path d="M12 2.75C9.65 5.3 8.45 8.4 8.45 12s1.2 6.7 3.55 9.25" />
        <path d="M5.1 6.1c1.75 1.05 4.05 1.65 6.9 1.65s5.15-.6 6.9-1.65" />
        <path d="M5.1 17.9c1.75-1.05 4.05-1.65 6.9-1.65s5.15.6 6.9 1.65" />
      </svg>
      <div className="language-menu">
        <button
          type="button"
          className={language === 'kor' ? 'active' : ''}
          aria-pressed={language === 'kor'}
          onClick={() => onLanguageChange('kor')}
        >
          KR
        </button>
        <button
          type="button"
          className={language === 'eng' ? 'active' : ''}
          aria-pressed={language === 'eng'}
          onClick={() => onLanguageChange('eng')}
        >
          EN
        </button>
      </div>
    </div>
  );
}
