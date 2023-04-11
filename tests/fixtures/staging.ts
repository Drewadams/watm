// fixtures.ts
import { test as base, type BrowserContext } from "@playwright/test";

export const StageTest = base.extend<{
	context: BrowserContext;
}>({
	context: async ({ browser }, use) => {
		const context = await browser.newContext({
			httpCredentials: {
				username: process.env.STAGE_AUTH_USER as string,
				password: process.env.STAGE_AUTH_PASS as string,
			},
		});
		await use(context);
	},
});
