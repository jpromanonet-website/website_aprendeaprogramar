import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { interpolate, translations } from './translations';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
	const [lang, setLang] = useState('en');

	useEffect(() => {
		const saved = window.localStorage.getItem('aap-lang');
		if (saved === 'en' || saved === 'es') {
			setLang(saved);
			return;
		}
		const browser = (navigator.language || '').toLowerCase();
		if (browser.startsWith('en')) setLang('en');
	}, []);

	useEffect(() => {
		document.documentElement.lang = lang;
		window.localStorage.setItem('aap-lang', lang);
		const t = translations[lang];
		document.title = t.metaTitle;
		const meta = document.querySelector('meta[name="description"]');
		if (meta) meta.setAttribute('content', t.metaDescription);
	}, [lang]);

	const value = useMemo(() => {
		const t = translations[lang];
		return {
			lang,
			setLang,
			toggleLang: () => setLang((prev) => (prev === 'es' ? 'en' : 'es')),
			t,
			tf: (path, vars) => {
				const parts = path.split('.');
				let cur = t;
				for (const part of parts) {
					cur = cur?.[part];
				}
				if (typeof cur !== 'string') return path;
				return interpolate(cur, vars);
			},
		};
	}, [lang]);

	return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
	const ctx = useContext(LanguageContext);
	if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
	return ctx;
}
