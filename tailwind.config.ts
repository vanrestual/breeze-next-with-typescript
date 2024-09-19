import forms from '@tailwindcss/forms'
import type { Config } from 'tailwindcss'

const config: Config = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'media',
    theme: {
        extend: {},
    },
    plugins: [forms],
}

export default config
