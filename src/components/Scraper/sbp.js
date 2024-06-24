export async function SBP(page) {
    try {
        const url = 'https://www.sbp.org.pk/careers/sumintern.asp';
        await page.goto(url, { waitUntil: 'load', timeout: 0 });

        const internshipDetails = await page.$eval('blockquote', (blockquote) => {
            const paragraphs = blockquote.querySelectorAll('p');

            const description = Array.from(paragraphs).slice(2, 3).map(p => p.textContent.trim()); // Extract description

            // Extract eligibility criteria
            const eligibilityHeaderIndex = Array.from(paragraphs).findIndex(p => p.textContent.includes('Eligibility Criteria'));
            const eligibilityList = blockquote.querySelectorAll('ul')[0]; // Assuming the first <ul> after the eligibility header contains the eligibility criteria
            const eligibilityCriteria = Array.from(eligibilityList.querySelectorAll('li')).map(li => li.textContent.trim());

            // Extract duration (the last paragraph)
            const duration = paragraphs[paragraphs.length - 1].textContent.trim();

            return {
                company_title: "State Bank of Pakistan",
                title: "Bank Internship",
                url: window.location.href,
                description,
                eligibilityCriteria: eligibilityCriteria.join('\n'),
                duration,
            };
        });

        return internshipDetails;
    } catch (error) {
        console.error('Error during scraping:', error);
        return { error: 'Something went wrong during scraping' };
    }
}