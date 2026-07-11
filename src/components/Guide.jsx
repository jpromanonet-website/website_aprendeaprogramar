import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import Title from './Title';

const accents = [
	{ accent: 'from-neon/20 via-transparent to-cyan/10 border-neon-deep/30', chip: 'bg-neon text-void' },
	{ accent: 'from-cyan/20 via-transparent to-violet/10 border-cyan-deep/30', chip: 'bg-cyan text-void' },
	{ accent: 'from-magenta/15 via-transparent to-amber/10 border-magenta/30', chip: 'bg-magenta text-white' },
	{ accent: 'from-amber/20 via-transparent to-neon/10 border-amber/40', chip: 'bg-amber text-void' },
];

function Guide() {
	const { t } = useLanguage();
	const [active, setActive] = useState(0);
	const tips = t.guide.tips;

	return (
		<section id="guia" className="py-16 md:py-20">
			<Title>{t.guide.title}</Title>
			<p className="text-ice-muted dark:text-fog mb-8 max-w-2xl reveal">{t.guide.intro}</p>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{tips.map((tip, i) => {
					const isActive = active === i;
					const style = accents[i];
					return (
						<button
							key={tip.code}
							type="button"
							onClick={() => setActive(i)}
							className={`text-left cyber-clip border bg-gradient-to-br ${style.accent} p-5 md:p-6 reveal transition-all duration-300 ${
								isActive
									? 'scale-[1.02] shadow-light-card dark:shadow-neon ring-1 ring-magenta/40'
									: 'hover:scale-[1.01] opacity-90 hover:opacity-100'
							}`}
							style={{ transitionDelay: `${i * 70}ms` }}
						>
							<span className={`inline-block font-mono text-xs tracking-widest px-2 py-0.5 cyber-clip-sm ${style.chip}`}>
								{tip.code}
							</span>
							<h3 className="font-display text-xl font-semibold text-ice-ink dark:text-white mt-3 mb-2">
								{tip.title}
							</h3>
							<p
								className={`text-sm md:text-base leading-relaxed transition-all ${
									isActive ? 'text-ice-ink dark:text-fog' : 'text-ice-muted dark:text-fog-muted'
								}`}
							>
								{tip.body}
							</p>
							{isActive && (
								<p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-magenta animate-fade-up">
									{t.guide.active}
								</p>
							)}
						</button>
					);
				})}
			</div>
		</section>
	);
}

export default Guide;
