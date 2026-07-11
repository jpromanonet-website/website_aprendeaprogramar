import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';

function Title({ children, id }) {
	const { t } = useLanguage();
	return (
		<div id={id} className="mb-8 reveal">
			<p className="font-mono text-xs uppercase tracking-[0.28em] text-magenta dark:text-neon mb-2">
				{t.title.sector}
			</p>
			<h2 className="font-display text-3xl md:text-4xl font-bold text-ice-ink dark:text-white">
				{children}
				<span className="text-neon-deep dark:text-neon">_</span>
			</h2>
			<div className="mt-3 h-px w-32 bg-gradient-to-r from-neon via-cyan to-magenta" />
		</div>
	);
}

export default Title;
