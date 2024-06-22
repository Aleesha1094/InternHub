import { NextResponse } from "next/server";
import { scrapeAndSave } from "@/components/Scraper/scraper";

export async function GET() {
    try {
        await scrapeAndSave();
        return NextResponse.json({ message: 'Scraping job is complete.' }, { status: 200 });
    } catch (error) {
        console.error('Error in scrapeAndSave:', error);
        return NextResponse.json({ message: 'An error occurred during scraping.' }, { status: 500 });
    }
}
