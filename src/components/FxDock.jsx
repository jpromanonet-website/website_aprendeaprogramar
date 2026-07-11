import React, { useEffect, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

function FxDock({ fxEnabled, onToggleFx, theme, onToggleTheme }) {
	const { lang, toggleLang, t } = useLanguage();
	const [showTop, setShowTop] = useState(false);

	useEffect(() => {
		const onScroll = () => setShowTop(window.scrollY > 420);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	const scrollTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	return (
		<div className="fixed z-50 right-3 bottom-3 md:right-4 md:bottom-4 flex flex-col gap-2">
			<button
				type="button"
				onClick={scrollTop}
				aria-label={t.fx.top}
				title={t.fx.top}
				className={`cyber-clip-sm p-2.5 border border-amber/50 bg-amber text-void shadow-[0_0_16px_rgba(255,176,32,0.35)] hover:scale-105 transition-all ${
					showTop ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-3 pointer-events-none'
				}`}
			>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
					<path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
				</svg>
			</button>
			<button
				type="button"
				onClick={toggleLang}
				aria-label={t.fx.lang}
				title={t.fx.lang}
				className="cyber-clip-sm px-3 py-2 border border-cyan-deep/40 bg-white text-cyan-deep font-mono text-[10px] uppercase tracking-widest shadow-light-card dark:bg-void dark:text-cyan dark:border-cyan/40 dark:shadow-neon-sm hover:scale-105 transition-transform"
			>
				{lang === 'es' ? 'EN' : 'ES'}
			</button>
			<button
				type="button"
				onClick={onToggleTheme}
				aria-label={t.fx.theme}
				className="cyber-clip-sm p-2.5 border border-neon-deep/40 bg-white text-neon-deep shadow-light-card dark:bg-void dark:text-neon dark:border-neon/40 dark:shadow-neon-sm hover:scale-105 transition-transform"
			>
				{theme === 'dark' ? (
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
						<path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
					</svg>
				) : (
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
						<path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
					</svg>
				)}
			</button>
			<button
				type="button"
				onClick={onToggleFx}
				aria-pressed={fxEnabled}
				aria-label={fxEnabled ? t.fx.fxOn : t.fx.fxOff}
				className={`cyber-clip-sm px-3 py-2 border font-mono text-[10px] uppercase tracking-widest transition-all hover:scale-105 ${
					fxEnabled
						? 'bg-magenta text-white border-magenta shadow-magenta'
						: 'bg-white text-ice-muted border-neon-deep/30 dark:bg-void dark:text-fog dark:border-neon/30'
				}`}
			>
				FX {fxEnabled ? 'ON' : 'OFF'}
			</button>
		</div>
	);
}

export default FxDock;
