import { StartingPage} from "./StartingPage";

export class PrivacyPolicyPage extends StartingPage{

    async scrollToFooter(){
        await this.page.evaluate(() => {
            document.querySelector('.footer')?.scrollIntoView();
        });
    }

    async printCookiesTexT(){
        await this.page.waitForSelector('//h1[text()=\'Privacy Policy\']');

        const cookiesHeader = this.page.locator('text=How do we use cookies?');
        const cookiesContent = await cookiesHeader.locator('(//div[@class=\'privacy-paragraph\'])[8]').textContent();
        const changedContent = cookiesContent?.replace(/•/g, '-');

        if (changedContent) {
            console.log(changedContent.trim());
        } else {
            console.error('Content not found or unable to change dots');
        }

        const listItems = await this.page.locator('(//ul[@class=\'privacy-list\'])[4]/li').allTextContents();
        listItems.forEach(item => {
            console.log('- ' + item.trim());
        });
    }

}