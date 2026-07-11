import React, { useEffect, useRef } from 'react';

function CursorGlow({ enabled, theme }) {
	const ref = useRef(null);

	useEffect(() => {
		if (!enabled) return undefined;
		const el = ref.current;
		if (!el) return undefined;

		const onMove = (e) => {
			el.style.transform = `translate(${e.clientX - 140}px, ${e.clientY - 140}px)`;
			el.style.opacity = '1';
		};
		const onLeave = () => {
			el.style.opacity = '0';
		};

		window.addEventListener('pointermove', onMove);
		window.addEventListener('pointerleave', onLeave);
		return () => {
			window.removeEventListener('pointermove', onMove);
			window.removeEventListener('pointerleave', onLeave);
		};
	}, [enabled]);

	if (!enabled) return null;

	const bg =
		theme === 'light'
			? 'radial-gradient(circle, rgba(0,143,91,0.28) 0%, rgba(14,124,128,0.16) 35%, rgba(255,45,122,0.12) 55%, transparent 70%)'
			: 'radial-gradient(circle, rgba(0,255,156,0.22) 0%, rgba(45,226,230,0.12) 35%, rgba(255,45,122,0.08) 55%, transparent 70%)';

	return (
		<div
			ref={ref}
			aria-hidden="true"
			className={`cursor-glow pointer-events-none fixed top-0 left-0 z-[3] h-[280px] w-[280px] rounded-full opacity-0 transition-opacity duration-300 ${
				theme === 'light' ? 'mix-blend-multiply' : 'mix-blend-screen'
			}`}
			style={{ background: bg }}
		/>
	);
}

export default CursorGlow;
