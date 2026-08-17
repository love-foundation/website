// @beyonk/gdpr-cookie-consent-banner ships its Svelte source without type
// declarations, so describe the props CookieBar.svelte actually passes.
declare module '@beyonk/gdpr-cookie-consent-banner' {
	import type { Component } from 'svelte';

	export type CookieChoice = {
		label?: string;
		description?: string;
		value?: boolean;
	};

	const Banner: Component<{
		heading?: string;
		description?: string;
		cookieName?: string;
		choices?: Record<string, CookieChoice | boolean>;
		[key: string]: unknown;
	}>;

	export default Banner;
}

declare module '@beyonk/gdpr-cookie-consent-banner/banner.css';
