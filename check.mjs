import { chromium } from "playwright";

const errors = [];
const browser = await chromium.launch();

async function shot(name, viewport) {
  const page = await browser.newPage({ viewport });
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(`[${name}] ${msg.text()}`);
  });
  page.on("pageerror", (err) => errors.push(`[${name}] pageerror: ${err.message}`));
  await page.goto("http://localhost:5173/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `/tmp/shots/${name}-opening.png` });

  // click envelope
  const envelope = page.locator('button[aria-label="open envelope"]');
  await envelope.click();
  await page.waitForTimeout(6500);
  await page.screenshot({ path: `/tmp/shots/${name}-hi.png` });

  const enterBtn = page.locator('button:has-text("come look around")');
  await enterBtn.waitFor({ timeout: 5000 });
  await enterBtn.click();
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `/tmp/shots/${name}-main.png`, fullPage: false });

  // scroll through sections and screenshot a few
  const ids = ["map", "timeline", "notes", "jar", "games", "dates", "coupons", "songs", "surprise", "stats"];
  for (const id of ids) {
    await page.evaluate((id) => {
      document.getElementById(id)?.scrollIntoView({ behavior: "instant", block: "start" });
    }, id);
    await page.waitForTimeout(700);
    await page.screenshot({ path: `/tmp/shots/${name}-${id}.png` });
  }

  await page.close();
}

import { mkdirSync } from "fs";
mkdirSync("/tmp/shots", { recursive: true });

await shot("desktop", { width: 1400, height: 900 });
await shot("mobile", { width: 390, height: 844 });

await browser.close();

console.log("ERRORS:", errors.length);
errors.forEach((e) => console.log(e));
