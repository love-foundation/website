import { expect, test } from '@playwright/test';

test.describe('Artist index page behavior', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/artists');
	});

	test('shuffles the artists on each page load', async ({ page }) => {
		const firstArtistName = page.locator('[data-cy=artistName]').first();
		await page.goto('/artists');
		await expect
			.poll(async () => page.locator('[data-cy=artistName]').first())
			.not.toBe(firstArtistName);
	});

	test('shuffles the artists when pressing the shuffle button', async ({ page }) => {
		const firstArtistName = page.locator('[data-cy=artistName]').first();
		await page.locator('[data-cy=shuffleArtists]').click();
		await expect
			.poll(async () => page.locator('[data-cy=artistName]').first())
			.not.toBe(firstArtistName);
	});

	test('filters the artists when searching for a name', async ({ page }) => {
		await page.locator('[data-cy=searchArtists]').fill('Zebra Centauri');
		await expect(
			page.locator('[data-cy=artistName]', { hasText: /Zebra Centauri/ }).first()
		).toBeVisible();
	});

	test('unfilters the artists when removing text from the search field for a name', async ({
		page
	}) => {
		await page.locator('[data-cy=searchArtists]').fill('Zebra Centauri');
		await expect(
			page.locator('[data-cy=artistName]', { hasText: /Zebra Centauri/ }).first()
		).toBeVisible();
		await page.locator('[data-cy=searchArtists]').clear();
		await expect
			.poll(async () => page.locator('[data-cy=artistName]').first())
			.not.toBe('Zebra Centauri');
	});
});
