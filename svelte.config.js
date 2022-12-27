import adapterStatic from '@sveltejs/adapter-static';
import node from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true,
			scss: {
				prependData: '@use "src/variables.scss" as *;'
			}
		})
	],
	adapter: process.env.ADAPTER === 'node' ? node() : adapterStatic()
};

export default config;
