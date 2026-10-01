import { test, expect } from "@playwright/test";
import airtime from "../test_data/airtime-activity.json";
import type { AirtimeCase } from "./types/airtime";

const cases = airtime as AirtimeCase[];

test('airtime-activity.json: every case id is unique', () => {
  const ids = cases.map((tc) => tc.caseId);
  expect(new Set(ids).size).toBe(ids.length);
});

test('airtime-activity.json: every case is complete', () => {
  for (const tc of cases) {
    expect(['success', 'error'], `${tc.caseId} status`).toContain(tc.expect.outcome);
    expect(tc.expect.message, `${tc.caseId} message`).toBeTruthy();
    expect(tc.expect.walletBalance, `${tc.caseId} walletBalance`).toMatch(/^R[\d,]+\.\d{2}$/);
  }
});