module.exports = {
	content: ['./index.html', './src/**/*.{jsx,js}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				void: {
					DEFAULT: '#05080c',
					soft: '#071018',
					panel: '#0a1219',
					raised: '#0e1a24',
				},
				ice: {
					DEFAULT: '#e8f6ef',
					soft: '#f3fbf7',
					panel: '#ffffff',
					ink: '#062a1f',
					muted: '#3d5c52',
				},
				neon: {
					DEFAULT: '#00ff9c',
					dim: '#00c97a',
					deep: '#008f5b',
					glow: 'rgba(0, 255, 156, 0.45)',
				},
				cyan: {
					DEFAULT: '#2de2e6',
					dim: '#1a9fa3',
					deep: '#0e7c80',
				},
				magenta: {
					DEFAULT: '#ff2d7a',
					soft: '#ff7aa8',
				},
				amber: {
					DEFAULT: '#ffb020',
					soft: '#ffd27a',
				},
				violet: {
					DEFAULT: '#a855f7',
					soft: '#c084fc',
				},
				fog: {
					DEFAULT: '#9fb3c8',
					muted: '#6b7f94',
				},
			},
			fontFamily: {
				display: ['Oxanium', 'ui-sans-serif', 'system-ui', 'sans-serif'],
				body: ['Space Grotesk', 'ui-sans-serif', 'system-ui', 'sans-serif'],
				mono: ['Share Tech Mono', 'ui-monospace', 'monospace'],
			},
			boxShadow: {
				neon: '0 0 20px rgba(0, 255, 156, 0.35), 0 0 40px rgba(0, 255, 156, 0.15)',
				'neon-sm': '0 0 12px rgba(0, 255, 156, 0.25)',
				cyan: '0 0 18px rgba(45, 226, 230, 0.3)',
				magenta: '0 0 18px rgba(255, 45, 122, 0.35)',
				'light-card': '0 10px 30px rgba(0, 143, 91, 0.12), 0 2px 8px rgba(6, 42, 31, 0.06)',
			},
			backgroundImage: {
				'grid-fade':
					'linear-gradient(to bottom, transparent, var(--grid-fade-end)), linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)',
				'hero-glow':
					'radial-gradient(ellipse 80% 50% at 50% -20%, var(--hero-glow-a), transparent 55%), radial-gradient(ellipse 45% 40% at 90% 10%, var(--hero-glow-b), transparent 50%), radial-gradient(ellipse 40% 35% at 10% 30%, var(--hero-glow-c), transparent 50%)',
			},
			keyframes: {
				'scan-y': {
					'0%': { transform: 'translateY(-100%)' },
					'100%': { transform: 'translateY(100vh)' },
				},
				glitch: {
					'0%, 100%': { transform: 'translate(0)' },
					'20%': { transform: 'translate(-2px, 1px)' },
					'40%': { transform: 'translate(2px, -1px)' },
					'60%': { transform: 'translate(-1px, 2px)' },
					'80%': { transform: 'translate(1px, -2px)' },
				},
				'pulse-neon': {
					'0%, 100%': { opacity: '0.55' },
					'50%': { opacity: '1' },
				},
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-8px)' },
				},
				'fade-up': {
					'0%': { opacity: '0', transform: 'translateY(24px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				'border-run': {
					'0%': { backgroundPosition: '0% 50%' },
					'100%': { backgroundPosition: '200% 50%' },
				},
				blink: {
					'0%, 49%': { opacity: '1' },
					'50%, 100%': { opacity: '0' },
				},
				shimmer: {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' },
				},
				'hue-shift': {
					'0%': { filter: 'hue-rotate(0deg)' },
					'100%': { filter: 'hue-rotate(360deg)' },
				},
				wiggle: {
					'0%, 100%': { transform: 'rotate(-1deg)' },
					'50%': { transform: 'rotate(1deg)' },
				},
			},
			animation: {
				'scan-y': 'scan-y 8s linear infinite',
				glitch: 'glitch 2.5s ease-in-out infinite',
				'pulse-neon': 'pulse-neon 2.4s ease-in-out infinite',
				float: 'float 5s ease-in-out infinite',
				'fade-up': 'fade-up 0.7s ease-out both',
				'border-run': 'border-run 3s linear infinite',
				blink: 'blink 1s step-end infinite',
				shimmer: 'shimmer 2.8s linear infinite',
				'hue-shift': 'hue-shift 12s linear infinite',
				wiggle: 'wiggle 0.4s ease-in-out',
			},
		},
	},
	plugins: [],
};
