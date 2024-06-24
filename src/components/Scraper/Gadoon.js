export async function GadoonInternship(page) {
    const url = 'https://gadoontextile.com/internship-programs-2/';
    await page.goto(url, { waitUntil: 'load', timeout: 0 });

    const internshipDetails = await page.evaluate(() => {
        const descriptionElements = document.querySelectorAll('.elementor-element-261f72b p');
        const description = descriptionElements[0]?.textContent.trim() || '';
        const eligibilityCriteria = descriptionElements[2]?.textContent.trim() || '';

        const durationKeywords = ['period', 'duration'];
        let duration = '';

        for (const element of descriptionElements) {
            const text = element.textContent.trim().toLowerCase();
            if (durationKeywords.some(keyword => text.includes(keyword))) {
                const durationMatch = text.match(/(?:period|duration) of ([^,.]+)/i);
                if (durationMatch) {
                    duration = durationMatch[1].trim();
                    break;
                }
            }
        }

        return {
            company_title: "Gadoon Textile Mills",
            url: window.location.href,
            title: "Textile Internship",
            description,
            eligibilityCriteria,
            duration,
        };
    });

    return internshipDetails;
}