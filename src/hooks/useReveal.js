import { useEffect } from 'react';

export function useReveal(selector = '.reveal') {
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('is-visible');
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
		);

		const observeAll = () => {
			document.querySelectorAll(selector).forEach((node) => {
				if (!node.classList.contains('is-visible')) observer.observe(node);
			});
		};

		observeAll();
		const mo = new MutationObserver(observeAll);
		mo.observe(document.body, { childList: true, subtree: true });

		return () => {
			observer.disconnect();
			mo.disconnect();
		};
	}, [selector]);
}
