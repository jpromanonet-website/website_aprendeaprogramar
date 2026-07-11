import React from 'react';
import timeline, { localizeTimelineItem } from '../data/timeline';
import { useLanguage } from '../i18n/LanguageContext';
import TimelineItem from './TimelineItem';
import Title from './Title';

function Timeline() {
	const { lang, t } = useLanguage();

	return (
		<section id="ruta" className="py-12 md:py-16">
			<Title>{t.timeline.title}</Title>
			<p className="text-ice-muted dark:text-fog mb-4 max-w-2xl reveal">{t.timeline.intro}</p>
			<p className="font-mono text-[10px] uppercase tracking-widest text-magenta mb-8 reveal">
				{t.timeline.hint}
			</p>
			<div className="relative">
				<div className="absolute left-[15px] md:left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-neon via-cyan via-magenta to-amber" />
				<div className="space-y-0">
					{timeline.map((item, index) => {
						const localized = localizeTimelineItem(item, lang);
						return (
							<TimelineItem
								key={`${localized.step}-${localized.title}`}
								year={localized.step}
								title={localized.title}
								details={localized.details}
								index={index}
							/>
						);
					})}
				</div>
			</div>
		</section>
	);
}

export default Timeline;
