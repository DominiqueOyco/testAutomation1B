import { test, expect } from '@playwright/test';
// Importing data from stickers.json
import data from '../../test-data/stickers.json';

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.avery.com/custom-printing/labels/calculator/stickers');
});

test.describe('Verify default values at stickers page matches required default values', () => {
    test(`Verify default format is ${data.format}`, async ({ page }) => {

        const defaultFormat = page.locator('[data-format="stickers"]'); //use the locator for the stickers button in the format section
        const defaultFormatText = await defaultFormat.textContent(); // Resolve the promise
        const normalizedText = defaultFormatText?.toLowerCase()

        // Compare with the expected value from the JSON file, also converted to lowercase
        const expectedText = `${data.format}`;
        expect(normalizedText).toBe(expectedText); // Ensure the text matches

        // Check if stickers is the default button that is selected when the customer visits the stickers page
        const classAttr = await defaultFormat.getAttribute('class');

        // Check if the class contains the following so that we can confirm that the Stickers button is outlined and selected
        const expectedClasses = [
            'bg-avy-blue-50',
            'border-avy',
            'border-avy-blue-600',
            'outline',
            'outline-2',
            'outline-avy-blue-600',
            '-outline-offset-2'
        ];

        for (const className of expectedClasses) {
            expect(classAttr).toContain(className);
        }
    });

    test(`Verify default shape is ${data.shape}`, async ({ page }) => {
        const defaultShape = page.getByTestId('shape-select-btn');
        const defaultShapeText = await defaultShape.textContent();
        const normalizedText = defaultShapeText?.toLowerCase().trim();

        const expectedText = `${data.shape}`;
        expect(normalizedText).toBe(expectedText);
    });

    test(`Verify default size is ${data.size}`, async ({ page }) => {
        const defaultSize = page.locator('#size_form_select');
        const defaultSizeText = await defaultSize.textContent(); // Resolve the promise
        const normalizedText = defaultSizeText?.toLowerCase().split('"')[0].trim(); // Convert to lowercase, removes the extra values after the size value (.split('"')[0] removes the words after the size value starting from "), and trim whitespace

        const expectedText = `${data.size}`.toLowerCase();
        expect(normalizedText).toBe(expectedText); // Ensure the text matches
    });

    test(`Verify default material is ${data.material}`, async ({ page }) => {
        const defaultMaterial = page.getByTestId('material-select-btn');
        await expect(defaultMaterial).toContainText(`${data.material}`);
    });

    test(`Verify default sticker quantity is ${data['sticker quantity & price']}`, async ({ page }) => {
        // Get the text content of the element
        const defaultStickerQuantityElement = page.getByTestId('Price Tier-select-btn');
        const defaultStickerQuantityText = await defaultStickerQuantityElement.textContent(); // Resolve the promise
        const normalizedText = defaultStickerQuantityText?.toLowerCase().split('$')[0].trim(); // Convert to lowercase, removes the extra values after the stickers (.split('$')[0] removes the words after the word stickers starting from $), and trim whitespace

        // Compare with the expected value from the JSON file, also converted to lowercase
        const expectedText = `${data['sticker quantity & price']}`;
        expect(normalizedText).toBe(expectedText); // Ensure the text matches
    });

    test(`Verify default price is ${data.price}`, async ({ page }) => {
        //checking if the price displayed in the webpage matches the price in the json file
        const defaultPrice = page.getByTestId('calculatorSummaryPrice');
        await expect(defaultPrice).toContainText(`$${data.price}`);
    });
});