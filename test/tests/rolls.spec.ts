import { test, expect } from '@playwright/test';
import data from '../../test-data/rolls.json'

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.avery.com/custom-printing/labels/calculator/rolls');
});

test.describe('Verify default values at rolls page matches required default values', () => {
    test(`Verify default format is ${data.format}`, async ({ page }) => {

        const defaultFormat = page.locator(`[data-format="rolls"]`); //use the locator for the stickers button in the format section
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
    })

    test(`Verify default designs is ${data.designs}`, async ({ page }) => {
        const defaultDesigns = page.locator('[data-value="1"]');
        await expect(defaultDesigns).toContainText(`${data.designs}`);
    });

    test(`Verify default price is ${data.price}`, async ({ page }) => {
        //checking if the price displayed in the webpage matches the price in the json file
        const defaultPrice = page.getByTestId('calculatorSummaryPrice');
        await expect(defaultPrice).toContainText(`$${data.price}`);
    });
});