import { NextResponse } from 'next/server';
const puppeteer = require('puppeteer-extra');
const Stealth = require('puppeteer-extra-plugin-stealth');

puppeteer.use(Stealth());

export async function GET() {
    let browser;
    try {
        browser = await puppeteer.launch({
            headless: true,
            executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
        });
        const page = await browser.newPage();
        // const url = 'https://www.techloset.com/jobs/internship';
        // await page.goto(url);
    
        // const internshipDetails = await page.$eval('.jobForm_childCol__rHH66', (container) => {
        //     const title = container.querySelector('p').textContent.trim();
        //     const description = container.querySelector('div:nth-child(2)').textContent.trim();
        //     const durationAndEligibility = container.querySelector('div:nth-child(3)').textContent.trim();
            
        //     // Extract duration and eligibility from the string
        //     const duration = durationAndEligibility.split('|')[0].trim();
        //     const eligibility = durationAndEligibility.split('|')[1].trim();
        //     const location = container.querySelector('div:nth-child(3)').textContent.trim().split('|')[1].trim();
    
        //     return {
        //         company_title: "TechloSet Solutions",
        //         title: title,
        //         url: window.location.href,
        //         // detail: "", // You can add more details if needed
        //         description: description,
        //         duration: duration,
        //         location: location,
        //         eligibilityCriteria: [eligibility] // Convert eligibility to an array
        //     };
        // });
        const url = 'https://www.habibmetro.com/careers/internships/#1620089794714-9ea57980-a262';
        await page.goto(url, {waitUntil: 'load', timeout: 0});
    
        const internshipDetails = await page.evaluate(() => {
            const summerInternship = document.querySelector('#1620089794706-15dc32e8-87f9');
            const yearAroundInternship = document.querySelector('#1620089794714-9ea57980-a262');
            const contactInfo = document.querySelector('.wpb_text_column:last-child');
    
            return {
                summerInternship: {
                    title: summerInternship.querySelector('.vc_tta-title-text').textContent.trim() || '',
                    description: summerInternship.querySelector('.wpb_wrapper p').textContent.trim() || '',
                    // applyNowLink: summerInternship.querySelector('.vc_btn3-container a').getAttribute('href')
                },
                yearAroundInternship: {
                    title: yearAroundInternship.querySelector('.vc_tta-title-text').textContent.trim() || '',
                    description: yearAroundInternship.querySelector('.wpb_wrapper p').textContent.trim() || '',
                    // applyNowLink: yearAroundInternship.querySelector('.vc_btn3-container a').getAttribute('href')
                },
                company_title: "Telenor Pakistan",
                url: window.location.href,
                location: contactInfo.textContent.trim()
    
            };
        });
        console.log(internshipDetails);
        return NextResponse.json(internshipDetails);
    } catch (error) {
        console.error('Error during scraping:', error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 400 });
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}