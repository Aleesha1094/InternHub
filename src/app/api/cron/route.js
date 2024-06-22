import { NextResponse } from "next/server";
import { SaveAndScrape } from "../puppeteer/route";
export async function GET() {
    // const result = await fetch(
    //   'http://worldtimeapi.org/api/timezone/America/Chicago',
    //   {
    //     cache: 'no-store',
    //   },
    // );
    // const data = await result.json();
    // await fetch('/api/puppeteer')
    // .then(response => response.json())
    // .then(data => console.log(data.message))
    // .catch(error => console.error('Error scheduling scraping job:', error));
    SaveAndScrape();
   
    return NextResponse.json({ body: "HEllo cron" }, { status: 200 });
  }