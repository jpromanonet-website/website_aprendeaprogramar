import React, { useEffect, useState } from 'react';
import Contact from './components/Contact';
import CursorGlow from './components/CursorGlow';
import Footer from './components/Footer';
import FxDock from './components/FxDock';
import Guide from './components/Guide';
import Intro from './components/Intro';
import Nav from './components/Nav';
import ParticleField from './components/ParticleField';
import Portfolio from './components/Portfolio';
import ScrollProgress from './components/ScrollProgress';
import Timeline from './components/Timeline';
import { useReveal } from './hooks/useReveal';

function App() {
	const [theme, setTheme] = useState('dark');
	const [fxEnabled, setFxEnabled] = useState(true);

	useEffect(() => {
		const saved = window.localStorage.getItem('aap-theme');
		if (saved === 'light' || saved === 'dark') {
			setTheme(saved);
			return;
		}
		if (window.matchMedia('(prefers-color-scheme: light)').matches) {
			setTheme('light');
		}
	}, []);

	useEffect(() => {
		const savedFx = window.localStorage.getItem('aap-fx');
		if (savedFx === 'off') setFxEnabled(false);
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			setFxEnabled(false);
		}
	}, []);

	useEffect(() => {
		const root = document.documentElement;
		if (theme === 'dark') {
			root.classList.add('dark');
			root.classList.remove('light');
		} else {
			root.classList.remove('dark');
			root.classList.add('light');
		}
		window.localStorage.setItem('aap-theme', theme);
	}, [theme]);

	useEffect(() => {
		const root = document.documentElement;
		if (fxEnabled) root.classList.remove('fx-off');
		else root.classList.add('fx-off');
		window.localStorage.setItem('aap-fx', fxEnabled ? 'on' : 'off');
	}, [fxEnabled]);

	useReveal();

	return (
		<>
			<ScrollProgress />
			<div className="scanlines pointer-events-none" aria-hidden="true" />
			<div
				className="pointer-events-none fixed inset-0 z-[1] opacity-50 dark:opacity-60 bg-grid-fade grid-bg"
				aria-hidden="true"
			/>
			<div
				className="scan-beam pointer-events-none fixed left-0 right-0 h-28 z-[2] bg-gradient-to-b from-neon/15 via-cyan/10 to-transparent animate-scan-y mix-blend-multiply dark:mix-blend-screen"
				aria-hidden="true"
			/>
			<ParticleField enabled={fxEnabled} theme={theme} />
			<CursorGlow enabled={fxEnabled} theme={theme} />

			<FxDock
				theme={theme}
				fxEnabled={fxEnabled}
				onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
				onToggleFx={() => setFxEnabled((v) => !v)}
			/>

			<div className="relative z-10 min-h-screen bg-ice-soft/95 text-ice-ink dark:bg-void dark:text-fog bg-hero-glow">
				<Nav />
				<main className="max-w-6xl w-11/12 mx-auto">
					<Intro />
					<Guide />
					<Portfolio />
					<Timeline />
					<Contact />
					<Footer />
				</main>
			</div>
		</>
	);
}

export default App;
