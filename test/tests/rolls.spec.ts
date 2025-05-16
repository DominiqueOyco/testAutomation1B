import { test, expect } from '@playwright/test';
import data from '../../test-data/rolls.json'

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.avery.com/custom-printing/labels/calculator/rolls');
});