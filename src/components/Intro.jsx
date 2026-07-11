import React, { useRef } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import StatCard from './StatCard';

function Intro() {
	const { t } = useLanguage();
	const magneticRef = useRef(null);
	const i = t.intro;

	const stats = [
		{
			value: 27,
			suffix: '+',
			label: i.stats.resources,
			accent: 'border-neon-deep/30 bg-neon/10 dark:border-neon/30 dark:bg-void-panel/80',
		},
		{
			value: 8,
			label: i.stats.steps,
			accent: 'border-cyan-deep/30 bg-cyan/10 dark:border-cyan/30 dark:bg-void-panel/80',
		},
		{
			value: '0$',
			label: i.stats.cost,
			accent: 'border-magenta/30 bg-magenta/10 dark:border-magenta/30 dark:bg-void-panel/80',
		},
		{
			value: '∞',
			label: i.stats.projects,
			accent: 'border-amber/40 bg-amber/10 dark:border-amber/40 dark:bg-void-panel/80',
		},
	];

	const onMagnetic = (e) => {
		const btn = magneticRef.current;
		if (!btn) return;
		const rect = btn.getBoundingClientRect();
		const x = e.clientX - rect.left - rect.width / 2;
		const y = e.clientY - rect.top - rect.height / 2;
		btn.style.transform = `translate(${x * 0.18}px, ${y * 0.22}px)`;
	};

	const resetMagnetic = () => {
		if (magneticRef.current) magneticRef.current.style.transform = 'translate(0, 0)';
	};

	return (
		<section id="top" className="relative pt-28 pb-16 md:pb-24">
			<div className="pointer-events-none absolute -top-10 right-0 w-72 h-72 rounded-full bg-neon/20 blur-3xl animate-pulse-neon" />
			<div className="pointer-events-none absolute top-40 left-0 w-56 h-56 rounded-full bg-magenta/15 blur-3xl animate-float" />
			<div className="pointer-events-none absolute top-24 right-1/3 w-40 h-40 rounded-full bg-amber/20 blur-3xl animate-pulse-neon" style={{ animationDelay: '1s' }} />

			<p className="font-mono text-xs md:text-sm text-neon-deep dark:text-neon tracking-[0.35em] uppercase mb-4 animate-fade-up font-semibold">
				{i.protocol}
			</p>

			<h1
				className="glitch-title font-display text-4xl sm:text-5xl md:text-7xl font-extrabold text-ice-ink dark:text-white leading-[1.05] mb-4 animate-fade-up"
				style={{ animationDelay: '80ms' }}
				data-text={i.title}
			>
				{i.title}
			</h1>

			<p
				className="font-display text-lg md:text-2xl mb-8 max-w-2xl animate-fade-up terminal-cursor shimmer-text"
				style={{ animationDelay: '160ms' }}
			>
				{i.subtitle}
			</p>

			<div
				className="space-y-5 text-base md:text-lg text-ice-muted dark:text-fog max-w-3xl leading-relaxed animate-fade-up"
				style={{ animationDelay: '240ms' }}
			>
				<p>{i.p1}</p>
				<p>{i.p2}</p>
				<p>{i.p3}</p>
				<p>{i.p4}</p>
			</div>

			<div className="mt-10 flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: '320ms' }}>
				<a
					ref={magneticRef}
					href="#recursos"
					onMouseMove={onMagnetic}
					onMouseLeave={resetMagnetic}
					className="cyber-clip-sm inline-flex items-center gap-2 bg-neon text-void font-display font-bold px-6 py-3 text-sm uppercase tracking-wider shadow-neon hover:bg-magenta hover:text-white hover:shadow-magenta transition-colors duration-200"
				>
					{i.ctaResources}
				</a>
				<a
					href="#ruta"
					className="cyber-clip-sm inline-flex items-center gap-2 border-2 border-cyan-deep text-cyan-deep dark:border-cyan dark:text-cyan font-mono text-xs uppercase tracking-widest px-6 py-3 hover:bg-cyan/15 transition-colors"
				>
					{i.ctaRoadmap}
				</a>
				<a
					href="#guia"
					className="cyber-clip-sm inline-flex items-center gap-2 border border-amber/60 text-amber font-mono text-xs uppercase tracking-widest px-6 py-3 hover:bg-amber/15 transition-colors"
				>
					{i.ctaGuide}
				</a>
			</div>

			<div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
				{stats.map((stat, idx) => (
					<StatCard key={stat.label} {...stat} delay={idx * 80} />
				))}
			</div>
		</section>
	);
}

export default Intro;
