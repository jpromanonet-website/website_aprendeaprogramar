import React, { useEffect, useRef, useState } from 'react';

function useCountUp(target, active, duration = 1200) {
	const [value, setValue] = useState(0);

	useEffect(() => {
		if (!active || typeof target !== 'number') return undefined;
		let start = null;
		let raf = 0;
		const tick = (ts) => {
			if (start === null) start = ts;
			const p = Math.min(1, (ts - start) / duration);
			const eased = 1 - Math.pow(1 - p, 3);
			setValue(Math.round(target * eased));
			if (p < 1) raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, [active, target, duration]);

	return value;
}

function StatCard({ value, suffix = '', label, accent, delay = 0 }) {
	const ref = useRef(null);
	const [active, setActive] = useState(false);
	const [tilt, setTilt] = useState({ x: 0, y: 0 });
	const numeric = typeof value === 'number';
	const counted = useCountUp(numeric ? value : 0, active);

	useEffect(() => {
		const node = ref.current;
		if (!node) return undefined;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setActive(true);
					observer.disconnect();
				}
			},
			{ threshold: 0.4 }
		);
		observer.observe(node);
		return () => observer.disconnect();
	}, []);

	const onMove = (e) => {
		const rect = ref.current.getBoundingClientRect();
		const px = (e.clientX - rect.left) / rect.width - 0.5;
		const py = (e.clientY - rect.top) / rect.height - 0.5;
		setTilt({ x: py * -8, y: px * 10 });
	};

	return (
		<div
			ref={ref}
			onMouseMove={onMove}
			onMouseLeave={() => setTilt({ x: 0, y: 0 })}
			className={`cyber-clip-sm border px-4 py-5 reveal cursor-default transition-shadow duration-300 hover:shadow-light-card dark:hover:shadow-neon-sm ${accent}`}
			style={{
				transitionDelay: `${delay}ms`,
				transform: `perspective(700px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
			}}
		>
			<div className="font-display text-2xl md:text-3xl font-bold text-neon-deep dark:text-neon">
				{numeric ? counted : value}
				{suffix}
			</div>
			<div className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-ice-muted dark:text-fog-muted mt-1">
				{label}
			</div>
		</div>
	);
}

export default StatCard;
