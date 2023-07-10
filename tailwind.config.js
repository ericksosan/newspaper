/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
		'./node_modules/tw-elements/dist/js/**/*.js',
	],
	theme: {
		extend: {},
		fontFamily: {
			inter: ['Inter', 'sans-serif'],
		},
	},
	darkMode: 'media',
	plugins: [require('tw-elements/dist/plugin.cjs')],
	safelist: ['animate-[fade-in_1s_ease-in-out]', 'animate-[fade-in-down_1s_ease-in-out]']
};
