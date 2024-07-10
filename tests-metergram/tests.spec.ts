import {test, expect} from '@playwright/test';
import {StartingPage} from "../PageObjectModel/StartingPage";
import {HomePage} from "../PageObjectModel/HomePage";
import {ContactUsPage} from "../PageObjectModel/ContactUsPage";
import {EventsPage} from "../PageObjectModel/EventsPage";
import {CareersPage} from "../PageObjectModel/CareersPage";
import {PrivacyPolicyPage} from "../PageObjectModel/PrivacyPolicyPage";

test.describe.parallel('Metergram Tests', () => {

    // test.beforeEach(async ({page}) => {
    //     let homePage = new HomePage(page);
    //     await homePage.navigateURL('/');
    // });

        test(`Test Case 1 - Parameterized`, async ({page}) => {
            const homePage = new HomePage(page);
            const contactUsPage = new ContactUsPage(page);
            const dataForTestCases = [
                {
                    name: 'Savo Kostadinov',
                    email: 'savo.kostadinov@metergram.com',
                    compName: 'TestCompany1',
                    number: '077952936',
                    message: 'This is a text message'
                },
                {
                    name: 'Felipe Massa',
                    email: 'felipemasa@f1.com',
                    compName: 'TestCompany2',
                    number: '077111936',
                    message: 'This is a text message number 2'
                },
                {
                    name: 'Mile Panika',
                    email: 'milepanika@gmail.com',
                    compName: 'TestCompany3',
                    number: '077952936',
                    message: 'This is a text message number 3'
                },
            ];
            for (const {name, email, compName, number, message} of dataForTestCases) {
            await homePage.navigateURL('/');
            await homePage.navigateContactUs();
            await contactUsPage.fillAllFields(name, email, compName, number, message);
            await contactUsPage.confirmingIAmNotARobot();
            await contactUsPage.submitTheForm();
            await homePage.validateFooter('United States');
            }
        });

        test('Test case 2', async ({page})=>{
            const homePage = new HomePage(page);
            const eventsPage = new EventsPage(page);

            await homePage.navigateURL('/');
            await homePage.navigateEvents();
            await page.waitForTimeout(3000);
            await eventsPage.navigateToPastEvents();
            await page.waitForTimeout(3000);
            await eventsPage.getAllEventDetails();
            await homePage.validateFooter('United States');
        });

    test('Test case 3', async ({page, context})=>{
        const homePage = new HomePage(page);
        const careersPage = new CareersPage(page);

        await homePage.navigateURL('/');
        await homePage.navigateCareers();
        await page.waitForTimeout(3000);
        await careersPage.viewOpenPositions();
        await page.waitForTimeout(3000);
        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            careersPage.clickOnDevOpsApply()
        ]);
        await newPage.waitForLoadState('load');
        await expect(newPage).toHaveURL(/linkedin.com/);
        await page.waitForTimeout(3000);
        const noJobMetergram = await newPage.locator('text=We couldn’t find a match for Metergram jobs in North Macedonia').isVisible();
        expect(noJobMetergram).toBeTruthy();
        await homePage.navigateURL('/');
        await homePage.validateFooter('United States');
    });

    test("Test case 4", async ({page})=>{
        const homePage = new HomePage(page);
        const privacyPolicyPage = new PrivacyPolicyPage(page);

        await homePage.navigateURL('/');
        await privacyPolicyPage.scrollToFooter();
        await homePage.navigatePrivacyPolicy();
        await page.waitForTimeout(3000);
        await privacyPolicyPage.printCookiesTexT();
        await homePage.validateFooter('United States');
    });
});