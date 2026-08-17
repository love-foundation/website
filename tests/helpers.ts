import type { Page } from '@playwright/test';

/**
 * Navigate and wait until the SvelteKit client has taken over.
 *
 * Every element these specs interact with is server-rendered, so Playwright
 * considers it actionable long before Svelte has attached its event handlers.
 * Clicking in that window is silently dropped and the assertion that follows
 * sees unfiltered content.
 *
 * SvelteKit adds the `#svelte-announcer` live region during client start-up and
 * it is absent from the SSR markup, which makes it a dependable hydration
 * signal.
 */
export async function gotoHydrated(page: Page, path: string) {
	await page.goto(path);
	await page.locator('#svelte-announcer').waitFor({ state: 'attached' });
}
