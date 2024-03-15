import adapterStatic from '@sveltejs/adapter-static';
import node from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [vitePreprocess()],
	kit: {
		adapter: process.env.ADAPTER === 'node' ? node() : adapterStatic()
	}
};

export default config;
