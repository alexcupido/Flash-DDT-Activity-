# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: airtime_data-driven.spec.ts >> Airtime transfer — data-driven >> AIR-02: spend the whole wallet
- Location: tests\airtime_data-driven.spec.ts:13:10

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('balance')
Expected: "R10.00"
Received: "R0.00"
Timeout:  5000ms

Call log:
  - Expect "toHaveText" getByTestId('balance') with timeout 5000ms
  - waiting for getByTestId('balance')
    14 × locator resolved to <strong data-testid="balance">R0.00</strong>
       - unexpected value "R0.00"

```

```yaml
- strong: R0.00
```
***
Q: What Failed?
The assertion failed because the expected balance of R10.00 did not match the actual balance of R0.00. Playwright checked the balance test ID, but the expected value was not displayed.
Q: Was the Data or the App wrong?
The data was incorrect, the expected amount was wrongly inputted on the test data json file.
***

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | import airtime from "../test_data/airtime-activity.json";
  3  | import type { AirtimeCase } from "./types/airtime";
  4  | 
  5  | const cases = airtime as AirtimeCase[];
  6  | 
  7  | test.describe("Airtime transfer — data-driven", () => {
  8  |     test.beforeEach(async ({page}) => {
  9  |         await page.goto('http://localhost:3001/airtime');
  10 |     });
  11 | 
  12 |  for (const tc of cases) {
  13 |      test(`${tc.caseId}: ${tc.scenario}`, async ({ page }) => {
  14 |     //   await page.getByLabel('Network').selectOption(tc.purchase.network);
  15 |     //  await page.locator(#network).selectOption(value: tc.purchase.network);
  16 |       await page.getByRole('combobox', {name: 'Network'}).selectOption({value :tc.purchase.network});
  17 |       await page.getByRole('textbox', {name: 'Cellphone number'}).fill(tc.purchase.cellphone);
  18 |       await page.getByRole('textbox', {name: 'Airtime amount (R)'}).fill(tc.purchase.amount);
  19 |     //   await page.getByLabel('Amount (ZAR)').fill(tc.purchase.amount);
  20 |       await page.getByRole('button', { name: 'Buy airtime' }).click();
  21 | 
  22 |       const status = page.getByTestId('airtime-result');
  23 |       await expect(status).toHaveAttribute('data-result', tc.expect.outcome);
  24 |       await expect(status).toHaveText(tc.expect.message);
> 25 |       await expect(page.getByTestId('balance')).toHaveText(tc.expect.walletBalance);
     |                                                 ^ Error: expect(locator).toHaveText(expected) failed
  26 |      });
  27 | 
  28 |     }
  29 | });
  30 | 
```