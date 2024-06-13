export async function GadoonInternship(page) {
    const url = 'https://gadoontextile.com/internship-programs-2/';
    await page.goto(url, {waitUntil: 'load', timeout: 0});

    const internshipDetails = await page.evaluate(() => {
        const descriptionElements = document.querySelectorAll('.elementor-element-261f72b p');
        // const applyNowLink = document.querySelector('.elementor-element-5017160 a');

        return {
            company_title: "Gadoon Textile Mills",
            url: window.location.href,
            title: "Textile Internship",
            description: descriptionElements[0]?.textContent.trim() || '',
            eligibilityCriteria: descriptionElements[2]?.textContent.trim() || '',
            duration: "6 Weeks to 3 Months",
            // url: applyNowLink?.href || ''
        };
    });

    return internshipDetails;
}