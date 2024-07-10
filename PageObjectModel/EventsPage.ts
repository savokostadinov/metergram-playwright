import {StartingPage} from "./StartingPage";
import {expect} from "@playwright/test";
import exp = require("node:constants");

interface EventDetails {
    date: string;
    location: string;
    title: string;
    description: string;
}

export class EventsPage extends StartingPage{

    async getEventDetails(): Promise<EventDetails[]> {
        return await this.page.$$eval(`.events-card`, (eventElements) =>
            eventElements.map(event => {
                const date = event.querySelector('.events-card-date-container')?.textContent?.trim() || '';
                const location = event.querySelector('.events-card-location-container')?.textContent?.trim() || '';
                const title = event.querySelector('.events-card-title')?.textContent?.trim() || '';
                const description = event.querySelector('.events-card-description')?.textContent?.trim() || '';
                return {date, location, title, description};
            })
        );
    }

    async getAllEventDetails(): Promise<EventDetails[]> {

        let allEvents: EventDetails[] = [];
        let hasNextPage = true;

        while (hasNextPage) {
            const events = await this.getEventDetails();
            allEvents = allEvents.concat(events);

            const isPastEventsTabActive = await this.page.locator('div[data-w-tab="PAST EVENTS"]').getAttribute('class');
            if (!isPastEventsTabActive?.includes('w--tab-active')) {
                throw new Error('Failed to switch to the "PAST EVENTS" tab.');
            }

            events.forEach(event => {
                console.log(`Date : ${event.date}`);
                console.log(`Location : ${event.location}`);
                console.log(`Title : ${event.title}`);
                console.log(`Description : ${event.description}`);
                console.log('');
            });

            const nextButton = await this.page.$('#next-page-btn-past');
            if (nextButton) {
                await nextButton.click();
                await this.page.waitForLoadState('networkidle');
            } else {
                hasNextPage = false;
                console.error('Next button not found');
            }
        }

        return allEvents;
    }

    async navigateToPastEvents() {
        await this.page.click('text=PAST EVENTS');
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForSelector('//div[text()=\'PAST EVENTS\']/..');
        console.log('Switched to PAST EVENTS tab and waited for content to load.');
    }
}