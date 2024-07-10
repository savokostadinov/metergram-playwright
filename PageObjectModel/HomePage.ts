import {expect, Page} from "@playwright/test";
import { StartingPage} from "./StartingPage";

export class HomePage extends StartingPage{

    async navigateContactUs() {
        await this.page.click('text=Contact Us');
    }

    async navigateEvents(){
        await this.page.click('text=Events');
    }

    async navigateCareers(){
        await this.page.click('(//a[@href=\'/careers\'])[1]');
    }

    async navigatePrivacyPolicy() {
        await this.page.click('text=Privacy Policy');
    }
}