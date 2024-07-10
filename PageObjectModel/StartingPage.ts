import {expect, Page} from "@playwright/test";

export class StartingPage{
    readonly page: Page;
    readonly url: string;


    constructor(page: Page) {
        this.page = page;
        this.url = process.env.BASE_URL;
    }

    async navigateURL(path: string) {
        await this.page.goto(path);
    }

    async validateFooter(text: string) {
        const footerUnitedStates = await this.page.waitForSelector('(//div[text()=\'United States\'])[1]');
        expect(footerUnitedStates).toBeDefined();
    }
}