import { defineConfig } from 'cypress';

export default defineConfig({
	video: false,
	viewportHeight: 1080,
	viewportWidth: 1920,
	retries: {
		runMode: 4,
		openMode: 0
	},
	e2e: {
		baseUrl: 'http://localhost:5173'
	}
});
