import { test, expect } from '@playwright/test';
import { type TTrack } from '../src/lib/schemas';

const BASE_URL = 'http://localhost:3000';

function getMockTracks(): TTrack[] {
  return [
    {
      id: '1',
      title: 'Track One',
      artist: 'Artist One',
      slug: 'track-one',
      genres: ['rock'],
    },
    {
      id: '2',
      title: 'Track Two',
      artist: 'Artist Two',
      slug: 'track-two',
      genres: ['pop'],
    },
  ];
}

const selectors = {
  trackItem: (id: number) => `li[data-testid="track-item-${id}"]`,
  trackTitle: (id: number) => `[data-testid="track-item-${id}-title"]`,
  trackArtist: (id: number) => `[data-testid="track-item-${id}-artist"]`,
};

test.beforeEach(async ({ page }) => {
  const mockTracks = getMockTracks();

  await page.route('http://localhost:8000/api/tracks**', route => {
    const method = route.request().method();
    const url = route.request().url();

    if (method === 'GET') {
      const search = new URL(url).searchParams.get('search')?.toLowerCase();
      const filtered = search
        ? mockTracks.filter(t =>
            [t.title, t.artist, t.album].some(v => v?.toLowerCase().includes(search)),
          )
        : mockTracks;

      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: filtered,
          meta: { total: filtered.length, page: 1, limit: 10, totalPages: 1 },
        }),
      });
    }
  });

  await page.goto(`${BASE_URL}/tracks`);
  await expect(page.locator('li[data-testid^="track-item-"]')).toHaveCount(2, {
    timeout: 10000,
  });
});

test('Load initial tracks', async ({ page }) => {
  await expect(page.locator('li[data-testid^="track-item-"]')).toHaveCount(2);

  await expect(page.locator(selectors.trackTitle(1))).toContainText('Track One');
  await expect(page.locator(selectors.trackArtist(1))).toContainText('Artist One');

  await expect(page.locator(selectors.trackTitle(2))).toContainText('Track Two');
  await expect(page.locator(selectors.trackArtist(2))).toContainText('Artist Two');
});

test('Open create track form', async ({ page }) => {
  await expect(page.getByTestId('create-track-button')).toBeVisible();

  await page.getByTestId('create-track-button').click();

  await expect(page.getByTestId('create-track-form')).toBeVisible();
});

test('Open filters menu', async ({ page }) => {
  await expect(page.getByTestId('open-filters-button')).toBeVisible();

  await page.getByTestId('open-filters-button').click();

  await expect(page.getByTestId('filters-menu')).toBeVisible();
});

test('Tracks selection', async ({ page }) => {
  await expect(page.getByTestId('select-all')).toBeVisible();
  await page.getByTestId('select-all').click();

  await expect(page.getByTestId('bulk-delete-button')).toBeVisible();
  await expect(page.getByTestId('clear-selection-button')).toBeVisible();

  await page.getByTestId('clear-selection-button').click();
});

test('Search tracks by title', async ({ page }) => {
  const searchInput = page.locator('input[type="search"]');
  await expect(searchInput).toBeVisible();

  await searchInput.fill('one');
  await expect(searchInput).toHaveValue('one');

  await expect(page.locator('li[data-testid^="track-item-"]')).toHaveCount(1, {
    timeout: 10000,
  });

  await expect(page.locator(selectors.trackTitle(1))).toContainText('Track One');
  await expect(page.locator(selectors.trackArtist(1))).toContainText('Artist One');
});
