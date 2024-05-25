export async function SBP(page) {
    try {
        const url = 'https://www.sbp.org.pk/careers/sumintern.asp';
        await page.goto(url, {waitUntil: 'load', timeout: 0}); 

        const internshipDetails = await page.$eval('blockquote', (blockquote) => {
            // const strongText = blockquote.querySelector('strong').textContent.trim();
            const paragraphs = blockquote.querySelectorAll('p');
            const description = Array.from(paragraphs).slice(2, 3).map(p => p.textContent.trim()); // Extract paragraphs 3 to 6 for application procedure
            // const selectionDetails = Array.from(paragraphs).slice(6, -1).map(p => p.textContent.trim()); // Extract paragraphs from 7 to second last for selection details
            const duration = Array.from(paragraphs).pop().textContent.trim(); // Extract last paragraph for deadline

            return {
                company_title: "State Bank of Pakistan (SBP)",
                title: "Bank Internship",
                url: window.location.href,
                // description: paragraphs[0].textContent.trim(),
                eligibilityCriteria: Array.from(blockquote.querySelectorAll('ul li')).map(li => li.textContent.trim()),
                description,
                duration,
                // selectionDetails
            };
        });

        return internshipDetails;
    } catch (error) {
        console.error('Error during scraping:', error);
        return { error: 'Something went wrong during scraping' };
    }
}
