import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';

function Nav() {
	const { t } = useLanguage();
	const links = [
		{ href: '#guia', label: t.nav.guide },
		{ href: '#recursos', label: t.nav.resources },
		{ href: '#ruta', label: t.nav.roadmap },
		{ href: '#contacto', label: t.nav.contact },
	];

	return (
		<nav className="fixed top-0 left-0 right-0 z-40 border-b border-neon-deep/20 bg-ice-soft/85 backdrop-blur-md dark:border-neon/20 dark:bg-void/80">
			<div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
				<a href="#top" className="font-display font-bold tracking-wide text-sm md:text-base">
					<span className="text-neon-deep dark:text-neon">APRENDE</span>
					<span className="text-magenta">A</span>
					<span className="text-cyan-deep dark:text-cyan">PROGRAMAR</span>
				</a>
				<div className="hidden sm:flex items-center gap-1 md:gap-3">
					{links.map((link) => (
						<a
							key={link.href}
							href={link.href}
							className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-ice-muted hover:text-magenta dark:text-fog dark:hover:text-neon transition-colors px-2 py-1"
						>
							{link.label}
						</a>
					))}
				</div>
			</div>
		</nav>
	);
}

export default Nav;
