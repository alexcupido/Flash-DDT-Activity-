import { test, expect } from "@playwright/test";
import airtime from "../test_data/airtime-activity.json";
import type { AirtimeCase } from "./types/airtime";

const cases = airtime as AirtimeCase[];

test.describe("Airtime transfer — data-driven", () => {
    test.beforeEach(async ({page}) => {
        await page.goto('/airtime');
    });

 for (const tc of cases) {
     test(`${tc.caseId}: ${tc.scenario}`, async ({ page }) => {
    //   await page.getByLabel('Network').selectOption(tc.purchase.network);
    //  await page.locator(#network).selectOption(value: tc.purchase.network);
      await page.getByRole('combobox', {name: 'Network'}).selectOption({value :tc.purchase.network});
      await page.getByRole('textbox', {name: 'Cellphone number'}).fill(tc.purchase.cellphone);
      await page.getByRole('textbox', {name: 'Airtime amount (R)'}).fill(tc.purchase.amount);
    //   await page.getByLabel('Amount (ZAR)').fill(tc.purchase.amount);
      await page.getByRole('button', { name: 'Buy airtime' }).click();

      const status = page.getByTestId('airtime-result');
      await expect(status).toHaveAttribute('data-result', tc.expect.outcome);
      await expect(status).toHaveText(tc.expect.message);
      await expect(page.getByTestId('balance')).toHaveText(tc.expect.walletBalance);
     });

    }
});
