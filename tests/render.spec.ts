import fs from "fs";
import { StageTest as test } from "./fixtures/staging";

const data = [
	"/",
	// "/mighty-survival/10-survival-tips-from-discoverys-naked-and-afraid-that-actually-work/",
	// "/category/history/",
	// "/search/qa/",
];

const viewports = [
	{ width: 1536, height: 1080, size: "xxl" },
	{ width: 1280, height: 1080, size: "xl" },
	{ width: 1024, height: 1080, size: "lg" },
	{ width: 768, height: 1080, size: "md" },
	{ width: 640, height: 1080, size: "sm" },
];

function checkRender() {
	for (const url of data) {
		test(`Check ${url}`, async ({ page }, testInfo) => {
			test.slow();

			// Setup access

			const dir = `./test-data/render-screenshots/${await page.title()}/${
				testInfo.project.name
			}`;
			if (fs.existsSync(dir)) {
				console.log(`Removing: ${dir}`);
				fs.rmSync(dir, { recursive: true, force: true });
			}

			if (
				testInfo.project.name === "Screenshots Safari" ||
				testInfo.project.name === "Screenshots Chrome"
			) {
				for (const { width, height, size } of viewports) {
					await page.setViewportSize({
						width: width,
						height: height,
					});
					await page.goto(url); // Only if not using baseURL
					await screenshot(size);
				}
			} else {
				await page.goto(url);
				await screenshot();
			}

			async function screenshot(viewportSize?: string) {
				await page.keyboard.press("End");
				await page.waitForTimeout(1500);
				await page.keyboard.press("Home");
				const title = (await page.title())
					.replace(/(\-)|( - We Are The Mighty)|(:)|(\|)/g, "")
					.replace(/(\s\s)/g, " ");
				const ssPath = viewportSize
					? `./test-data/render-screenshots/${title}/${testInfo.project.name}/${viewportSize}.png`
					: `./test-data/render-screenshots/${title}/${testInfo.project.name}/${title}.png`;

				await page.screenshot({
					fullPage: true,
					path: ssPath,
				});
				await testInfo.attach("Screenshot", {
					contentType: "image/png",
					path: ssPath,
				});
			}
		});
	}
}

test.describe.parallel("Check render", () => {
	checkRender();
});
