import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";
import dotenv from "dotenv";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
dotenv.config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
	testDir: "./tests",
	/* Maximum time one test can run for. */
	timeout: 30 * 1000,
	expect: {
		/**
		 * Maximum time expect() should wait for the condition to be met.
		 * For example in `await expect(locator).toHaveText();`
		 */
		timeout: 20000,
	},
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	// forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	retries: 0,
	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 1 : undefined,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	// reporter: "html",
	reporter: [
		[
			"html",
			{ outputFile: `./playwright-report/report-${new Date().getTime()}` },
		],
	],
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		/* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
		actionTimeout: 0,
		/* Base URL to use in actions like `await page.goto('/')`. */
		baseURL: process.env.TESTING_URL ?? "https://www.wearethemighty.com",

		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: "retain-on-failure",
		screenshot: "only-on-failure",
	},

	/* Configure projects for major browsers */
	projects: [
		{
			name: "Scrape",
			use: {
				...devices["Desktop Chrome"],
			},
			snapshotDir: "./test-data/snapshots/chrome",
			grep: /scrape/,
		},
		{
			name: "Screenshots Safari",
			use: {
				...devices["Desktop Safari"],
			},
			snapshotDir: "./test-data/snapshots/safari",
			grep: /(vis-comp)|(render)/,
		},
		{
			name: "Screenshots Chrome",
			use: {
				...devices["Desktop Chrome"],
			},
			snapshotDir: "./test-data/snapshots/chrome",
			grep: /(vis-comp)|(render)/,
		},
		// {
		// 	name: "firefox",
		// 	use: {
		// 		...devices["Desktop Firefox"],
		// 	},
		// },
		// {
		//   name: 'webkit',
		//   use: {
		//     ...devices['Desktop Safari'],
		//   },
		// },
		/* Test against mobile viewports. */
		{
			name: "Mobile Chrome",
			use: {
				...devices["Pixel 5"],
			},
			grep: /(vis-comp)|(render)/,
		},
		{
			name: "iPad Vertical Render",
			use: {
				...devices["iPad Pro 11"],
			},
			grep: /(vis-comp)|(render)/,
		},
		{
			name: "iPad Landscape Render",
			use: {
				...devices["iPad Pro 11 landscape"],
			},
			grep: /(vis-comp)|(render)/,
		},
		{
			name: "iPhone Render",
			use: {
				...devices["iPhone 13 Pro"],
			},
			grep: /(vis-comp)|(render)/,
		},
	],

	/* Folder for test artifacts such as screenshots, videos, traces, etc. */
	// outputDir: 'test-results/',

	/* Run your local dev server before starting the tests */
	// webServer: {
	//   command: 'npm run start',
	//   port: 3000,
	// },
};

export default config;
