/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			fontFamily: {
				montserrat: ['Montserrat', 'sans-serif'],
				inter: ['Inter', 'sans-serif']
			},
			colors: {
				'azure-radiance': {
					'50': '#edfaff',
					'100': '#d6f2ff',
					'200': '#b5eaff',
					'300': '#83dfff',
					'400': '#48cbff',
					'500': '#1eacff',
					'600': '#068eff',
					'700': '#007aff',
					'800': '#085dc5',
					'900': '#0d519b',
					'950': '#0e315d',
				}
			}
		},
	},
	darkMode: 'class',
	plugins: [
		require('@tailwindcss/typography'),
		require('tailwind-scrollbar')({ nocompatible: true })
	],
};
