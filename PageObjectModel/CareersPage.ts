import {expect, Page} from "@playwright/test";
import {StartingPage} from "./StartingPage";

export class CareersPage extends StartingPage {

    async viewOpenPositions(){
        await this.page.click('text=View Open Positions');
    }

    async clickOnDevOpsApply(){
        await this.page.click('text=Apply now');
        await this.page.waitForTimeout(3000);
    }
}