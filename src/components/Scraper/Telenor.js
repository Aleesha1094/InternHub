export async function Telenor(page) {
    const url = 'https://www.telenor.com.pk/internship-program/';
    await page.goto(url, { waitUntil: 'load', timeout: 0 });

    const internshipDetails = await page.evaluate(() => {
        const article = document.querySelector('article.post-5514');
        const paragraphs = article.querySelectorAll('p');
        const ulElement = article.querySelector('ul');

        let duration = '';

        // Find the paragraph containing 'Stipend' for duration
        paragraphs.forEach((p, index) => {
            if (p.textContent.includes('Stipend')) {
                duration = p.textContent.trim();
            }
        });

        // Extracting other details
        const description = paragraphs[0]?.textContent.trim() || '';
        const eligibilityCriteria = ulElement?.textContent.trim() || '';

        // Extract location from specific paragraph based on its position
        const locationParagraph = paragraphs[paragraphs.length - 1]?.textContent.trim() || '';
        const locationRegex = /Internship Programs run nationwide in (.+)\./;
        const locationMatch = locationParagraph.match(locationRegex);
        const location = locationMatch ? locationMatch[1] : '';

        return {
            company_title: "Telenor Pakistan",
            url: window.location.href,
            title: "Business Internship", // Default title
            description,
            duration: duration || "6 Weeks", // Default duration
            eligibilityCriteria,
            location
        };
    });

    return internshipDetails;
}