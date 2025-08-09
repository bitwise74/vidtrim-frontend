import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

export default defineConfig({
        plugins: [sveltekit()],
        resolve: {
                alias: {
                        $styles: new URL('./src/styles', import.meta.url).pathname,
                },
        },
        server: {
		headers: {
		  'Cross-Origin-Opener-Policy': 'same-origin',
		  'Cross-Origin-Embedder-Policy': 'require-corp'
		},
		fs: {
			allow: ['../..']
		}
	  }	
})


