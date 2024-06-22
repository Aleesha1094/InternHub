// import { scheduleJob } from 'node-schedule';
// import { scrapeAndSave } from './../../../components/Scraper/scraper';
// import { NextResponse } from 'next/server';

// let jobScheduled = false;

// export async function GET(req, res) {
//     if (!jobScheduled) {
//         scheduleJob('0 0 * * *', () => {
//             // console.log('Running scheduled scraping and updating task...');
//             scrapeAndSave().then(() => {
//                 console.log('Scraping and updating task completed.');
//                 res.status(200).json({ message: 'Scraping job is complete.' });
//             }).catch(error => {
//                 console.error('Error in scrapeAndSave:', error);
//                 res.status(500).json({ message: 'An error occurred during scraping.' });
//             });
//         });
//         jobScheduled = true;
//         // console.log('Scraping job scheduled to run every 24 hours.');
//     }
//     return NextResponse.json({ message: 'Scraping job is scheduled.' }, { status: 200 });
// }

const puppeteer = require('puppeteer-extra');
import connectDb from '@/utils/dbConnection';
import { NextResponse } from 'next/server';
import Internships from '@/models/Internships';
import Stealth from "puppeteer-extra-plugin-stealth";
import { ScrapeWebsites } from '@/components/Scraper/ScraperModules';

puppeteer.use(Stealth());
export async function SaveAndScrape() {
    let browser;
    try {
        browser = await puppeteer.launch({
            headless: "new",
            executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
        });
        const results = await ScrapeWebsites(browser);
        
        connectDb();
        await Promise.all(results.map(async (data) => {
            const updateInternship = await Internships.findOne({ company_title: data.company_title });
            const descriptions = Array.isArray(data.description) ? data.description[0] : data.description;

            if (updateInternship) {
                updateInternship.url = data.url;
                updateInternship.eligibilityCriteria = data.eligibilityCriteria;
                updateInternship.description = descriptions;
                updateInternship.title = data.title;
                updateInternship.duration = data.duration;
                updateInternship.location = data.location || "Faisalabad";
                await updateInternship.save();
            } else {
            const internship = new Internships({
                company_title: data.company_title,
                url: data.url,
                description: descriptions,
                title: data.title,
                location: data.location || "Faisalabad",
                eligibilityCriteria: data.eligibilityCriteria,
                duration: data.duration,
            });
            await internship.save();
        }
        }));
            return NextResponse.json(results);
    } catch (error) {
        return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 400 });
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}