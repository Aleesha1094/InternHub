export async function CrescentInternship(page) {
    const url = 'https://www.crescenttextile.com/internship-programs/';
    await page.goto(url, {waitUntil: 'load', timeout: 0});

    const internshipDetails = await page.evaluate(() => {
        // const titleElement = document.querySelector('.kd-section-title h3');
        // const descriptionElements = document.querySelectorAll('.wpb_text_column p');
        const spanElement = document.querySelector('span[style="color: #333333;"]');
        const text = spanElement?.innerHTML || '';
        const lines = text.split('<br>').map(line => line.trim()).filter(line => line !== '');
        const eligibleCriteria = lines[0];
        const steps = lines.slice(1).join('\n');

        return {
            company_title: "Crescent Textile Mills",
            url: window.location.href,
            title: "Textile Internship",
            eligibilityCriteria: eligibleCriteria,
            description: steps
        };
    });

    return internshipDetails;
}