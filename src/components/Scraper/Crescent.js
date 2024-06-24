export async function CrescentInternship(page) {
    const url = 'https://www.crescenttextile.com/internship-programs/';
    await page.goto(url, {waitUntil: 'load', timeout: 0});

    const internshipDetails = await page.evaluate(() => {
        const spanElement = document.querySelector('span[style="color: #333333;"]');
        const text = spanElement?.innerHTML || '';
        const lines = text.split('<br>').map(line => line.trim()).filter(line => line !== '');
        const eligibleCriteria = lines[0];
        const steps = lines.slice(1).join('\n');
        const duration = "Semi Annual Basis";

        return {
            company_title: "Crescent Textile Mills",
            url: window.location.href,
            title: "Textile Internship",
            duration: duration,
            eligibilityCriteria: eligibleCriteria,
            description: steps
        };
    });

    return internshipDetails;
}