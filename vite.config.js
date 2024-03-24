import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

const config = defineConfig({
	plugins: [sveltekit()],
	// optimizeDeps: { include: ['lozad'] },
	build: {
		rollupOptions: {
			logLevel: 'debug',
			maxParallelFileOps: 40
		}
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: '@use "src/variables.scss" as *;'
			}
		}
	}
});

export default config;
