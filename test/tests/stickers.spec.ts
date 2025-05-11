import { test, expect } from '@playwright/test';
// Importing data from stickers.json
import data from '../test-data/stickers.json' assert { type: 'json' };

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.avery.com/custom-printing/labels/calculator/stickers');
});

test.describe('Verify default values at stickers page matches required default values', () => {
    test('Verify default format is stickers', async ({ page }) => {
        const defaultFormat = await page.getByTestId('CalculatorSummaryFormat');
        await expect(defaultFormat).toHaveText(data.defaultFormat); // Accessing data from JSON
    });

    test('Verify default shape is round', async ({ page }) => {
        const defaultShape = await page.getByTestId('CalculatorSummaryShape');
        await expect(defaultShape).toHaveText(data.defaultShape); // Accessing data from JSON
    });

    test('Verify default size is 2', async ({ page }) => {
        const defaultSize = await page.getByTestId('CalculatorSummarySize');
        await expect(defaultSize).toHaveText(data.defaultSize); // Accessing data from JSON
    });

    test('Verify default material is Matte White Sticker Film', async ({ page }) => {
        const defaultMaterial = await page.getByTestId('CalculatorSummaryMaterial');
        await expect(defaultMaterial).toHaveText(data.defaultMaterial); // Accessing data from JSON
    });

    test('Verify default sticker quantity & price is 75 stickers', async ({ page }) => {
        const defaultQuantity = await page.getByTestId('CalculatorSummaryQuantity');
        await expect(defaultQuantity).toHaveText(data.defaultQuantity); // Accessing data from JSON
    });

    test(`Verify default price is ${data.price}`, async ({ page }) => {
        const defaultPrice = await page.getByTestId('CalculatorSummaryPrice');
        await expect(defaultPrice).toHaveText('$' + data.price); // Accessing data from JSON
    });
});