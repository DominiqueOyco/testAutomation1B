import { test, expect } from '@playwright/test';
//TODO: Add test cases for stickers page
import { price } from '../test-data/stickers.json';
import data '../test-data/stickers.json';


test.beforeEach(async ({ page }) => {
    await page.goto('https://www.avery.com/custom-printing/labels/calculator/stickers');
})

test.describe('Verify default values at stickers page matches required default values', () => {
    test('Verify default format is stickers', async ({ page }) => {

    });

    test('Verify default shape is round', async ({ page }) => {

    });

    test('Verify default size is 2', async ({ page }) => {

    });

    test('Verify default material is Matte White Sticker Film', async ({ page }) => {

    });

    test('Verify default sticker quantity & price is 75 stickers', async ({ page }) => {

    });

    test(`Verify default price is ${price}`, async ({ page }) => {
        const defaultPrice = page.getByTestId('CalculatorSummaryPrice')
        await expect(defaultPrice).toHaveText('$' + `${price}`);
    });

});
