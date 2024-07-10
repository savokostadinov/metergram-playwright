import {expect, Page} from "@playwright/test";
import {StartingPage} from "./StartingPage";
import {chromium} from "playwright";

export class ContactUsPage extends StartingPage {

    async fillAllFields(name: string, email: string, compName: string, number: string, message: string) {
        await this.page.fill('input[id=Your-name]', name);
        await this.page.fill('input[id=Email]', email);
        await this.page.fill('input[id=Company-Name]', compName);
        await this.page.fill('input[id=Phone-number]', number);
        await this.page.fill('textarea[id=message]', message);
    }

    async confirmingIAmNotARobot() {
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => {});
            expect(dialog.message()).toBe('Please confirm you’re not a robot.');
        });
    }

    async submitTheForm(){
        await this.page.click('#get-in-touch-contact');
    }
}


