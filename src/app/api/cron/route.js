import { NextResponse } from "next/server";
import { scrapeAndSave } from "@/components/Scraper/scraper";

export async function GET() {
    try {
        await scrapeAndSave();
        return res.status(200).json({ message: 'Scraping job is complete.' });
    } catch (error) {
        console.error('Error in scrapeAndSave:', error);
        return res.status(500).json({ message: 'An error occurred during scraping.' });
    }
}
