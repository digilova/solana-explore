import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputPath = join(__dirname, "..", "public", "audit", "tokens-xyz-spacex.png");

async function main() {
  let chromium;
  try {
    ({ chromium } = await import("playwright"));
  } catch {
    throw new Error("Playwright is not installed. Run `npm install -D playwright` or use `npx playwright install chromium` before recapturing.");
  }

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 });

  try {
    await page.goto("https://www.tokens.xyz/spacex", { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForLoadState("networkidle", { timeout: 20000 }).catch(() => {});

    const cookieButton = page
      .getByRole("button", { name: /accept|agree|got it|allow/i })
      .first();
    if (await cookieButton.isVisible().catch(() => false)) {
      await cookieButton.click().catch(() => {});
    }

    await page.waitForTimeout(1500);
    await mkdir(dirname(outputPath), { recursive: true });
    await page.screenshot({ path: outputPath, fullPage: true });
  } finally {
    await browser.close();
  }

  console.log(`Saved ${outputPath}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
