import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import Title from './Title';

function Contact() {
	const { t } = useLanguage();
	const c = t.contact;
	const [focused, setFocused] = useState(null);

	const fieldClass = (name) =>
		`cyber-clip-sm p-3 border transition-all duration-300 focus:outline-none reveal ${
			focused === name
				? 'border-magenta shadow-magenta bg-magenta/5 dark:bg-magenta/10'
				: 'border-neon-deep/25 bg-white dark:bg-void-panel/30 dark:border-neon/25 focus:border-neon-deep dark:focus:border-neon'
		} text-ice-ink dark:text-white placeholder:text-ice-muted/70 dark:placeholder:text-fog-muted`;

	return (
		<section id="contacto" className="py-12 md:py-16 mb-8">
			<form
				action="https://getform.io/f/a8473afa-f5bd-4bc0-b6cd-4f64f617c5fb"
				method="POST"
				className="flex flex-col w-full max-w-xl"
			>
				<Title>{c.title}</Title>
				<p className="text-ice-muted dark:text-fog mb-6 reveal">{c.intro}</p>
				<input
					type="text"
					name="name"
					required
					placeholder={c.name}
					className={fieldClass('name')}
					onFocus={() => setFocused('name')}
					onBlur={() => setFocused(null)}
				/>
				<input
					type="email"
					name="email"
					required
					placeholder={c.email}
					className={`my-3 ${fieldClass('email')}`}
					onFocus={() => setFocused('email')}
					onBlur={() => setFocused(null)}
				/>
				<textarea
					name="message"
					required
					placeholder={c.message}
					rows="8"
					className={`mb-5 ${fieldClass('message')}`}
					onFocus={() => setFocused('message')}
					onBlur={() => setFocused(null)}
				/>
				<button
					type="submit"
					className="cyber-clip-sm text-center inline-block px-8 py-3 w-max font-display font-bold uppercase tracking-wider text-void bg-gradient-to-r from-neon via-cyan to-magenta bg-[length:200%_100%] hover:animate-shimmer shadow-neon hover:shadow-magenta transition-shadow reveal"
				>
					{c.send}
				</button>
			</form>
		</section>
	);
}

export default Contact;
