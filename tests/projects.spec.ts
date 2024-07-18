import { expect, test } from '@playwright/test';

test.describe('Projects Page Functionality', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/projects');
	});

	test('displays the projects page and has an introduction text', async ({ page }) => {
		await expect(
			page.locator('[data-cy=pageTitle]', { hasText: /Projects/ }).first()
		).toBeVisible();
		await expect(
			page
				.locator('[data-cy=pageIntro]', {
					hasText: /Love Foundation is starting and supporting a variety of projects globally\./
				})
				.first()
		).toBeVisible();
	});

	test('shows at least one project item', async ({ page }) => {
		await expect(page.locator('[data-cy=projectTitle]').first()).toBeVisible();
		await expect(
			page.locator('#projectList > :first-child').getByTestId('projectPillar')
		).toBeVisible();
	});

	test('shows the project filters and there is five options', async ({ page }) => {
		await expect(page.locator('[data-cy=projectFilters]')).toBeVisible();
		await expect(page.locator('[data-cy=projectFilter]')).toHaveCount(5);
	});

	test('filters the projects when using one of the filter options', async ({ page }) => {
		await expect(page.locator('[data-cy=projectItem]')).toHaveCount(7);
		await page.locator('[data-cy=projectFilter]').first().click();
		await expect(page.locator('[data-cy=projectItem]')).not.toHaveCount(7);
	});

	test('changes the filter when clicking another category', async ({ page }) => {
		await expect(page.locator('[data-cy=projectItem]')).toHaveCount(7);
		await page
			.locator('[data-cy=projectFilter]')
			.getByText(/Water for all/)
			.first()
			.click();
		page
			.locator('[data-cy=projectFilter]')
			.getByText(/Water for all/)
			.first();
		await expect(page.locator('[data-cy=projectItem]')).toHaveCount(4);
		await expect(page.getByTestId('projectPillar').first()).toHaveClass(/water/);
		await page
			.locator('[data-cy=projectFilter]')
			.getByText(/Community Spirit/)
			.first()
			.click();
		await expect(page.locator('[data-cy=projectItem]')).toHaveCount(2);
		await expect(page.getByTestId('projectPillar')).toHaveClass(/community/);
	});

	test('removes the filter when clicking the same category again', async ({ page }) => {
		await expect(page.locator('[data-cy=projectItem]')).toHaveCount(7);
		await page.locator('[data-cy=projectFilter]').first().click();
		await expect(page.locator('[data-cy=projectItem]')).not.toHaveCount(7);
		await page.locator('[data-cy=projectFilter]').first().click();
	});

	test('filters the projects for water projects', async ({ page }) => {
		await expect(page.locator('[data-cy=projectItem]')).toHaveCount(7);
		await page
			.locator('[data-cy=projectFilter]')
			.getByText(/Water for all/)
			.first()
			.click();
		await expect(page.locator('[data-cy=projectItem]')).toHaveCount(4);
		await expect(
			page.locator('#projectList > :first-child').getByTestId('projectPillar')
		).toHaveClass(/water/);
	});

	test('filters the projects for community projects', async ({ page }) => {
		await expect(page.locator('[data-cy=projectItem]')).toHaveCount(7);
		await page
			.locator('[data-cy=projectFilter]')
			.getByText(/Community Spirit/)
			.first()
			.click();
		await expect(page.locator('[data-cy=projectItem]')).toHaveCount(2);
		await expect(
			page.locator('#projectList > :first-child').getByTestId('projectPillar')
		).toHaveClass(/community/);
	});

	test('filters the projects for sustainability projects', async ({ page }) => {
		await expect(page.locator('[data-cy=projectItem]')).toHaveCount(7);
		await page
			.locator('[data-cy=projectFilter]')
			.getByText(/Shared Sustainability/)
			.first()
			.click();
		await expect(page.locator('[data-cy=projectItem]')).toHaveCount(0);
		await expect(
			page.locator('#projectList > :first-child').getByTestId('projectPillar')
		).toHaveClass(/sustainability/);
	});

	test('filters the projects for joy projects', async ({ page }) => {
		await expect(page.locator('[data-cy=projectItem]')).toHaveCount(7);
		await page
			.locator('[data-cy=projectFilter]')
			.getByText(/Joyful Purpose/)
			.first()
			.click();
		await expect(page.locator('[data-cy=projectItem]')).toHaveCount(1);
		await expect(
			page.locator('#projectList > :first-child').getByTestId('projectPillar')
		).toHaveClass(/joy/);
	});

	test('filters the projects for love projects', async ({ page }) => {
		await expect(page.locator('[data-cy=projectItem]')).toHaveCount(7);
		await page
			.locator('[data-cy=projectFilter]')
			.getByText(/Universal Love/)
			.first()
			.click();
		await expect(page.locator('[data-cy=projectItem]')).toHaveCount(0);
		await expect(
			page.locator('#projectList > :first-child').getByTestId('projectPillar')
		).toHaveClass(/love/);
	});
});
