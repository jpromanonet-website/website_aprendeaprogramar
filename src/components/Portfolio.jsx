import React, { useMemo, useState } from 'react';
import portfolio from '../data/portfolio';
import { interpolate } from '../i18n/translations';
import { useLanguage } from '../i18n/LanguageContext';
import PortfolioItem from './PortfolioItem';
import Title from './Title';

function normalizeCert(cert = '') {
	const lower = cert.toLowerCase();
	if (lower.includes('sin') || lower.includes('no certificate') || lower.includes('without')) return 'sin';
	if (lower.includes('con') || lower.includes('with')) return 'con';
	return 'all';
}

const HOT_TAGS = ['JavaScript', 'Python', 'React JS', 'SQL', 'HTML', 'CSS', 'Git', 'Java', 'C++', 'Django'];

function Portfolio() {
	const { t } = useLanguage();
	const p = t.portfolio;
	const [query, setQuery] = useState('');
	const [filter, setFilter] = useState('all');
	const [shuffleKey, setShuffleKey] = useState(0);

	const filtered = useMemo(() => {
		const q = query.trim().toLowerCase();
		let list = portfolio.filter((item) => {
			const certKey = normalizeCert(item.cert);
			if (filter !== 'all' && certKey !== filter) return false;
			if (!q) return true;
			const haystack = [item.title, item.cert, ...(item.stack || [])].join(' ').toLowerCase();
			return haystack.includes(q);
		});
		if (shuffleKey > 0) {
			list = [...list].sort(() => Math.random() - 0.5);
		}
		return list;
	}, [query, filter, shuffleKey]);

	const filters = [
		{ id: 'all', label: p.filterAll, color: 'neon' },
		{ id: 'con', label: p.filterWith, color: 'magenta' },
		{ id: 'sin', label: p.filterWithout, color: 'cyan' },
	];

	return (
		<section id="recursos" className="py-12 md:py-16">
			<Title>{p.title}</Title>
			<p className="text-ice-muted dark:text-fog mb-6 max-w-2xl reveal">
				{interpolate(p.intro, { count: portfolio.length })}
			</p>

			<div className="flex flex-wrap gap-2 mb-5 reveal">
				{HOT_TAGS.map((tag) => (
					<button
						key={tag}
						type="button"
						onClick={() => setQuery(tag)}
						className={`cyber-clip-sm font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 border transition-all ${
							query === tag
								? 'bg-amber text-void border-amber shadow-[0_0_16px_rgba(255,176,32,0.35)]'
								: 'border-amber/40 text-ice-muted hover:text-amber hover:border-amber dark:text-fog'
						}`}
					>
						#{tag}
					</button>
				))}
			</div>

			<div className="flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between mb-8 reveal">
				<div className="flex flex-wrap gap-2">
					{filters.map((f) => (
						<button
							key={f.id}
							type="button"
							onClick={() => setFilter(f.id)}
							className={`cyber-clip-sm font-mono text-[10px] md:text-xs uppercase tracking-widest px-4 py-2 border transition-all ${
								filter === f.id
									? f.color === 'magenta'
										? 'bg-magenta text-white border-magenta shadow-magenta'
										: f.color === 'cyan'
											? 'bg-cyan text-void border-cyan shadow-cyan'
											: 'bg-neon text-void border-neon shadow-neon-sm'
									: 'border-neon-deep/25 text-ice-muted hover:border-neon-deep hover:text-neon-deep dark:border-neon/30 dark:text-fog dark:hover:text-neon'
							}`}
						>
							{f.label}
						</button>
					))}
					<button
						type="button"
						onClick={() => setShuffleKey((k) => k + 1)}
						className="cyber-clip-sm font-mono text-[10px] md:text-xs uppercase tracking-widest px-4 py-2 border border-violet/40 text-violet hover:bg-violet/15 transition-all"
					>
						{p.shuffle}
					</button>
				</div>
				<label className="relative block w-full lg:w-72">
					<span className="sr-only">{p.searchLabel}</span>
					<input
						type="search"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder={p.searchPlaceholder}
						className="w-full cyber-clip-sm bg-white border border-neon-deep/25 px-4 py-2.5 font-mono text-sm text-ice-ink placeholder:text-ice-muted/70 focus:outline-none focus:border-neon-deep focus:shadow-light-card dark:bg-void-panel/40 dark:border-neon/25 dark:text-white dark:placeholder:text-fog-muted dark:focus:border-neon dark:focus:shadow-neon-sm"
					/>
				</label>
			</div>

			<div className="flex items-center justify-between mb-4 reveal">
				<p className="font-mono text-xs text-neon-deep dark:text-neon/80">
					{filtered.length === 1
						? p.resultOne
						: interpolate(p.resultMany, { count: filtered.length })}
					{query ? interpolate(p.filterLabel, { query }) : ''}
				</p>
				{query && (
					<button
						type="button"
						onClick={() => setQuery('')}
						className="font-mono text-[10px] uppercase tracking-widest text-magenta hover:underline"
					>
						{p.clear}
					</button>
				)}
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
				{filtered.map((project, index) => (
					<PortfolioItem
						key={`${project.title}-${shuffleKey}`}
						imgUrl={project.imgUrl}
						title={project.title}
						cert={project.cert}
						stack={project.stack}
						link={project.link}
						index={index}
						onTagClick={(tag) => {
							setQuery(tag);
							document.getElementById('recursos')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
						}}
					/>
				))}
			</div>

			{filtered.length === 0 && (
				<div className="mt-10 border border-dashed border-magenta/40 p-8 text-center text-ice-muted dark:text-fog">
					{p.empty}{' '}
					<button
						type="button"
						className="text-magenta underline"
						onClick={() => {
							setQuery('');
							setFilter('all');
						}}
					>
						{p.clearFilters}
					</button>
					.
				</div>
			)}
		</section>
	);
}

export default Portfolio;
