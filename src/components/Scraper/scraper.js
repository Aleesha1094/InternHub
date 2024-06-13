const puppeteer = require('puppeteer-extra');
import connectDb from '@/utils/dbConnection';
import { NextResponse } from 'next/server';
import Internships from '@/models/Internships';
import Stealth from "puppeteer-extra-plugin-stealth";
import { ScrapeWebsites } from '@/components/Scraper/ScraperModules';

puppeteer.use(Stealth());

export async function scrapeAndSave() {
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