import React, { useEffect, useRef } from 'react';

const DARK_PALETTE = ['#00ff9c', '#2de2e6', '#ff2d7a', '#ffb020', '#a855f7'];
const LIGHT_PALETTE = ['#008f5b', '#0e7c80', '#ff2d7a', '#d97706', '#7c3aed'];

function ParticleField({ enabled, theme }) {
	const canvasRef = useRef(null);

	useEffect(() => {
		if (!enabled) return undefined;
		const canvas = canvasRef.current;
		if (!canvas) return undefined;
		const ctx = canvas.getContext('2d');
		let raf = 0;
		let particles = [];
		const dpr = Math.min(window.devicePixelRatio || 1, 2);
		const palette = theme === 'light' ? LIGHT_PALETTE : DARK_PALETTE;

		const resize = () => {
			canvas.width = window.innerWidth * dpr;
			canvas.height = window.innerHeight * dpr;
			canvas.style.width = `${window.innerWidth}px`;
			canvas.style.height = `${window.innerHeight}px`;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			const count = Math.min(70, Math.floor((window.innerWidth * window.innerHeight) / 22000));
			particles = Array.from({ length: count }, () => ({
				x: Math.random() * window.innerWidth,
				y: Math.random() * window.innerHeight,
				vx: (Math.random() - 0.5) * 0.35,
				vy: -0.15 - Math.random() * 0.45,
				r: 1.2 + Math.random() * 2.2,
				color: palette[Math.floor(Math.random() * palette.length)],
				a: theme === 'light' ? 0.35 + Math.random() * 0.4 : 0.25 + Math.random() * 0.45,
			}));
		};

		const draw = () => {
			ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
			particles.forEach((p) => {
				p.x += p.vx;
				p.y += p.vy;
				if (p.y < -10) p.y = window.innerHeight + 10;
				if (p.x < -10) p.x = window.innerWidth + 10;
				if (p.x > window.innerWidth + 10) p.x = -10;
				ctx.beginPath();
				ctx.fillStyle = p.color;
				ctx.globalAlpha = p.a;
				ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
				ctx.fill();
			});
			ctx.globalAlpha = 1;
			raf = requestAnimationFrame(draw);
		};

		resize();
		draw();
		window.addEventListener('resize', resize);
		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener('resize', resize);
		};
	}, [enabled, theme]);

	if (!enabled) return null;

	return (
		<canvas
			ref={canvasRef}
			aria-hidden="true"
			className={`particle-layer pointer-events-none fixed inset-0 z-[2] ${
				theme === 'light' ? 'opacity-80 mix-blend-multiply' : 'opacity-70 mix-blend-screen'
			}`}
		/>
	);
}

export default ParticleField;
