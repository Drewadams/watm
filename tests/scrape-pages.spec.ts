import { link, writeFileSync } from "fs";
import { StageTest as it } from "./fixtures/staging";

let linkData: { parent: string; url: string; title: string }[] = [];

it(`Gathers categories`, async ({ page }) => {
	await page.goto("/");
	// const headerLinks = (
	// 	await page.locator("a .MuiButton-disableElevation.css-shcqpl").all()
	// ).map(async (link) => {
	// 	return await link.getAttribute("href");
	// });
	const headerLinks = await Promise.all(
		(
			await page.locator("a.MuiButton-disableElevation.css-shcqpl").all()
		).map(async (link) => {
			const href = await link.getAttribute("href");
			if (href != "http://#") {
				return {
					name: await link.innerText(),
					href,
				};
			}
			await link.hover({ force: true });
			const innerLinks = link.locator("a.css-18kjusl");
			console.log("inner links: ", await innerLinks.all());

			return (await link.locator("a.css-18kjusl").all()).map(
				async (innerLink) => {
					return {
						name: await innerLink.innerText(),
						href: await innerLink.getAttribute("href"),
					};
				}
			);
		})
	);
	console.log(headerLinks);

	// const links = page
	// 	.locator("div.modules-NewsPromoCard-textWrapper")
	// 	.locator("a.elements-Link-link");
	// console.log(`${name} has ${await links.count()} links`);

	// for (const link of await links.all()) {
	// 	linkData.push({
	// 		parent: name,
	// 		url: (await link.getAttribute("href")) as string,
	// 		title: await link
	// 			.locator(".elements-TextStyle-textStyle.modules-NewsPromoCard-title")
	// 			.innerText(),
	// 	});
	// }
	// writeFileSync(
	// 	`./scraper-results/${name}/scraped-data.json`,
	// 	JSON.stringify(linkData, null, 2)
	// );
});

// it.afterAll(() => {});
