import { BankAlfalah } from './BankAlfalah';
import { Telenor } from './Telenor';
import { SBP } from './sbp';
import { CrescentInternship } from './Crescent';
import { GadoonInternship } from './Gadoon';
import { HabibMetro } from "./HabibMetro"
import { TechloSetSolutions } from './Techloset';

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

        const website6 = await HabibMetro(page);
        results.push(website6);

        const website7 = await TechloSetSolutions(page);
        results.push(website7);

        return results;
    } finally {
        await page.close();
    }
}