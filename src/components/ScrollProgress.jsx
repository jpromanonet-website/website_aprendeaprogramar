import React, { useEffect, useState } from 'react';

function ScrollProgress() {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const onScroll = () => {
			const max = document.documentElement.scrollHeight - window.innerHeight;
			setProgress(max > 0 ? window.scrollY / max : 0);
		};
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	return (
		<div
			aria-hidden="true"
			className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-transparent"
		>
			<div
				className="progress-bar h-full bg-gradient-to-r from-neon via-cyan via-magenta to-amber shadow-neon-sm"
				style={{ transform: `scaleX(${progress})` }}
			/>
		</div>
	);
}

export default ScrollProgress;
