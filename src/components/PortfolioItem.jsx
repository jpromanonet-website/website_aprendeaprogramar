import React, { useRef, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

const TAG_COLORS = [
	'border-neon-deep/30 text-neon-deep hover:bg-neon/20 dark:border-neon/30 dark:text-neon',
	'border-cyan-deep/40 text-cyan-deep hover:bg-cyan/15 dark:border-cyan/40 dark:text-cyan',
	'border-magenta/40 text-magenta hover:bg-magenta/10',
	'border-amber/50 text-amber hover:bg-amber/10 dark:text-amber',
	'border-violet/40 text-violet hover:bg-violet/10',
];

function hashColor(str) {
	let h = 0;
	for (let i = 0; i < str.length; i += 1) h = (h + str.charCodeAt(i) * (i + 1)) % TAG_COLORS.length;
	return TAG_COLORS[h];
}

function PortfolioItem({ title, cert, imgUrl, stack, link, index = 0, onTagClick }) {
	const { t } = useLanguage();
	const hasCert = !(cert || '').toLowerCase().includes('sin');
	const certLabel = hasCert ? t.portfolio.withCert : t.portfolio.withoutCert;
	const ref = useRef(null);
	const [tilt, setTilt] = useState({ x: 0, y: 0 });
	const [shine, setShine] = useState({ x: 50, y: 50 });

	const translateStack = (item) => t.stack[item] || item;

	const onMove = (e) => {
		const rect = ref.current.getBoundingClientRect();
		const px = (e.clientX - rect.left) / rect.width;
		const py = (e.clientY - rect.top) / rect.height;
		setTilt({ x: (py - 0.5) * -10, y: (px - 0.5) * 12 });
		setShine({ x: px * 100, y: py * 100 });
	};

	return (
		<a
			ref={ref}
			href={link}
			target="_blank"
			rel="noopener noreferrer"
			onMouseMove={onMove}
			onMouseLeave={() => {
				setTilt({ x: 0, y: 0 });
				setShine({ x: 50, y: 50 });
			}}
			className="group hud-border cyber-clip overflow-hidden surface-card block animate-fade-up will-change-transform"
			style={{
				animationDelay: `${Math.min(index, 12) * 40}ms`,
				transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(0)`,
				transition: 'transform 0.15s ease-out',
			}}
		>
			<div className="relative overflow-hidden">
				<img
					src={imgUrl}
					alt={title}
					className="w-full h-36 md:h-44 object-cover transition-transform duration-500 group-hover:scale-110"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-ice-ink/80 via-transparent to-transparent dark:from-void opacity-80" />
				<div
					className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
					style={{
						background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,0.35), transparent 45%)`,
					}}
				/>
				<span
					className={`absolute top-3 left-3 font-mono text-[10px] uppercase tracking-widest px-2 py-1 cyber-clip-sm ${
						hasCert
							? 'bg-neon text-void'
							: 'bg-ice-ink/80 text-cyan border border-cyan/40 dark:bg-void/80'
					}`}
				>
					{certLabel}
				</span>
			</div>
			<div className="p-4 md:p-5 relative">
				<h3 className="font-display text-lg md:text-xl text-ice-ink dark:text-white font-semibold mb-3 group-hover:text-neon-deep dark:group-hover:text-neon transition-colors">
					{title}
				</h3>
				<p className="flex flex-wrap gap-1.5">
					{stack.map((item) => (
						<button
							key={`${title}-${item}`}
							type="button"
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								onTagClick?.(item);
							}}
							className={`tag-chip ${hashColor(item)}`}
						>
							{translateStack(item)}
						</button>
					))}
				</p>
				<p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-magenta dark:text-cyan opacity-0 group-hover:opacity-100 transition-opacity">
					{t.portfolio.openResource}
				</p>
			</div>
		</a>
	);
}

export default PortfolioItem;
