import { BankAlfalah } from './BankAlfalah';
import { Telenor } from './Telenor';
import { SBP } from './sbp';
import { CrescentInternship } from './Crescent';
import { GadoonInternship } from './Gadoon';

export async function ScrapeWebsites(browser) {
    const results = [];
    const page = await browser.newPage();
    page.setDefaultTimeout(100000);

    try {
        const website1 = await BankAlfalah(page);
        results.push(website1);

        const website2 = await SBP(page);
        results.push(website2);

        const website3 = await Telenor(page);
        results.push(website3);

        const website4 = await CrescentInternship(page);
        results.push(website4);

        const website5 = await GadoonInternship(page);
        results.push(website5);

        return results;
    } finally {
        await page.close();
    }
}