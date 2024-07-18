import { expect, test } from '@playwright/test';

test.describe('Navigation with the navbar', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('opens the nav menu when clicking the burger', async ({ page }) => {
		await page.locator('[data-cy=toggleNav]').click();
		await expect(page.locator('nav')).toBeVisible();
	});

	test('closes the nav menu when clicking the burger again after it opened', async ({ page }) => {
		await page.locator('[data-cy=toggleNav]').click();
		await expect(page.locator('nav')).toBeVisible();
		await page.locator('[data-cy=toggleNav]').click();
		await expect(page.locator('nav')).not.toBeVisible();
	});

	test('opens the nav and navigates to the about page', async ({ page }) => {
		await page.locator('[data-cy=toggleNav]').click();
		await page.locator('nav').getByText(/About/).first().click();
		await expect(page).toHaveURL(/\/about/);
	});

	test('opens the nav and navigates to the events page', async ({ page }) => {
		await page.locator('[data-cy=toggleNav]').click();
		await page
			.locator('nav')
			.getByText(/Events/)
			.first()
			.click();
		await expect(page).toHaveURL(/\/events/);
		await expect(page.getByText(/Events/).first()).toBeVisible();
	});

	test('opens the nav and navigates to the Artists page', async ({ page }) => {
		await page.locator('[data-cy=toggleNav]').click();
		await page
			.locator('nav')
			.getByText(/Artists/)
			.first()
			.click();
		await expect(page).toHaveURL(/\/artists/);
		await expect(page.getByText(/Artists/).first()).toBeVisible();
	});

	test('opens the nav and navigates to the Lovecasts page', async ({ page }) => {
		await page.locator('[data-cy=toggleNav]').click();
		await page
			.locator('nav')
			.getByText(/Lovecasts/)
			.first()
			.click();
		await expect(page).toHaveURL(/\/lovecasts/);
		await expect(page.getByText(/Lovecasts/).first()).toBeVisible();
	});

	test('opens the nav and navigates to the Projects page', async ({ page }) => {
		await page.locator('[data-cy=toggleNav]').click();
		await page
			.locator('nav')
			.getByText(/Projects/)
			.first()
			.click();
		await expect(page).toHaveURL(/\/projects/);
	});

	test('allows navigating to root when on another page', async ({ page }) => {
		await page.goto('/events');
		await page.locator('[data-cy=toggleNav]').click();
		await page.locator('nav').getByText(/Home/).first().click();
		await expect(page).toHaveURL('http://localhost:5173/');
		await expect(page.getByText(/What is Love Foundation\?/).first()).toBeVisible();
	});
});
