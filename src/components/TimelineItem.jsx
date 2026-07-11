import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

const ACCENTS = [
	'border-l-neon',
	'border-l-cyan',
	'border-l-magenta',
	'border-l-amber',
	'border-l-violet',
];

function TimelineItem({ year, title, details, index = 0 }) {
	const { t } = useLanguage();
	const [open, setOpen] = useState(index === 0);
	const accent = ACCENTS[index % ACCENTS.length];

	return (
		<article
			className="relative pl-12 md:pl-14 pb-6 last:pb-0 reveal"
			style={{ transitionDelay: `${index * 60}ms` }}
		>
			<button
				type="button"
				aria-expanded={open}
				onClick={() => setOpen((v) => !v)}
				className={`absolute left-1.5 md:left-2.5 top-2 w-5 h-5 border-2 rotate-45 transition-all duration-300 ${
					open
						? 'bg-neon border-neon shadow-neon-sm scale-110'
						: 'bg-ice-soft border-neon-deep dark:bg-void dark:border-neon hover:scale-110'
				}`}
			/>
			<div
				className={`cyber-clip-sm border border-neon-deep/15 dark:border-neon/20 bg-white/90 dark:bg-void-panel/70 border-l-4 ${accent} overflow-hidden transition-shadow hover:shadow-light-card dark:hover:shadow-neon-sm`}
			>
				<button
					type="button"
					onClick={() => setOpen((v) => !v)}
					className="w-full text-left p-4 md:p-5 flex flex-wrap items-center gap-3"
				>
					<span className="font-mono text-xs uppercase tracking-widest bg-neon text-void px-2 py-1 cyber-clip-sm font-bold">
						{year}
					</span>
					<h3 className="font-display text-lg md:text-xl font-semibold text-ice-ink dark:text-white flex-1">
						{title}
					</h3>
					<span className="font-mono text-xs text-magenta dark:text-cyan">
						{open ? t.timeline.collapse : t.timeline.expand}
					</span>
				</button>
				<div
					className={`grid transition-all duration-300 ease-out ${
						open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
					}`}
				>
					<div className="overflow-hidden">
						<p className="px-4 md:px-5 pb-4 md:pb-5 text-sm md:text-base text-ice-muted dark:text-fog leading-relaxed">
							{details}
						</p>
					</div>
				</div>
			</div>
		</article>
	);
}

export default TimelineItem;
