/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		screens: {
			'xs': '380px',
			'sm': '640px',
			'md': '768px',
			'lg': '1024px',
			'xl': '1280px',
			'2xl': '1536px',
		},
		extend: {
			height: {
				'100': '26rem',
				'120': '30rem',
				'128': '32rem',
				'144': '36rem',
				'160': '40rem',
				'192': '48rem',
				'200': '50rem',
			}
		},
		fontFamily: {
			signature: ['Qwitcher Grypen'],
		},
	},
	plugins: [],
}
