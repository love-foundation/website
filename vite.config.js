import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('.', import.meta.url));

const config = defineConfig({
	plugins: [sveltekit()],
	// optimizeDeps: { include: ['lozad'] },
	// Vite 8 defaults the server environment's CSS minifier to lightningcss, which
	// rejects the malformed selector shipped in @beyonk/gdpr-cookie-consent-banner's
	// banner.css. esbuild was the minifier before the Vite 8 upgrade and tolerates it.
	environments: {
		client: { build: { cssMinify: 'esbuild' } },
		ssr: { build: { cssMinify: 'esbuild' } }
	},
	build: {
		cssMinify: 'esbuild',
		rollupOptions: {
			logLevel: 'debug',
			maxParallelFileOps: 40
		}
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: '@use "src/variables.scss" as *;\n',
				// Resolve the `src/...` load above from the project root rather than
				// from each importing file's directory.
				loadPaths: [projectRoot]
			}
		}
	}
});

export default config;
