export async function TechloSetSolutions(page) {

    const url = 'https://www.techloset.com/jobs/internship';
    await page.goto(url, {waitUntil: 'load', timeout: 0});

    const internshipDetails = await page.$eval('.jobForm_childCol__rHH66', (container) => {
        const title = container.querySelector('p').textContent.trim();
        const description = container.querySelector('div:nth-child(2)').textContent.trim();
        const durationAndEligibility = container.querySelector('div:nth-child(3)').textContent.trim();
        
        // Extract duration and eligibility from the string
        const duration = durationAndEligibility.split('|')[0].trim();
        const eligibility = durationAndEligibility.split('|')[1].trim();
        const location = container.querySelector('div:nth-child(3)').textContent.trim().split('|')[1].trim();

        return {
            company_title: "TechloSet Solutions",
            title: title,
            url: window.location.href,
            // detail: "", // You can add more details if needed
            description: description,
            duration: duration,
            location: location,
            eligibilityCriteria: [eligibility] // Convert eligibility to an array
        };
    });

    return internshipDetails;
}