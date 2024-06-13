export async function TechloSetSolutions(page) {
    const url = 'https://www.techloset.com/jobs/internship';
    await page.goto(url, { waitUntil: 'load' });

    const internshipDetails = await page.$eval('.jobForm_childCol__rHH66', (container) => {
        // Initialize variables to store extracted data
        let title = "";
        let description = "";
        let duration = "";
        let location = "";
        let eligibility = "";

        // Attempt to extract data from the container
        const titleElement = container.querySelector('div:nth-child(2) p');
        if (titleElement) {
            title = titleElement.textContent.trim();
        }

        const descriptionElement = container.querySelectorAll('div:nth-child(2) p')[1];
        if (descriptionElement) {
            description = descriptionElement.textContent.trim();
        }

        const detailsElement = container.querySelector('div:nth-child(2) p:last-child');
        if (detailsElement) {
            const detailsText = detailsElement.textContent.trim();

            // Extract duration, location, and eligibility using regex
            const durationMatch = detailsText.match(/Duration:\s*(.*?)\s*\|/);
            if (durationMatch) {
                duration = durationMatch[1].trim();
            }

            const locationMatch = detailsText.match(/\|\s*Location:\s*(.*?)\s*\|/);
            if (locationMatch) {
                location = locationMatch[1].trim();
            }

            const eligibilityMatch = detailsText.match(/\|\s*Eligibility:\s*(.*?)$/);
            if (eligibilityMatch) {
                eligibility = eligibilityMatch[1].trim();
            }
        }

        return {
            company_title: "TechloSet Solutions",
            title: title,
            url: window.location.href,
            description: description,
            duration: duration,
            location: location,
            eligibilityCriteria: eligibility || "Eligibility criteria not specified" // Provide a default value if eligibility is empty
        };
    });

    // Ensure eligibilityCriteria is not empty before saving
    if (!internshipDetails.eligibilityCriteria) {
        throw new Error("Eligibility criteria not found or empty");
    }

    return internshipDetails;
}
