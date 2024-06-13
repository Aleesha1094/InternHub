export async function BankAlfalah(page) {
    const url = 'https://www.bankalfalah.com/careers/career-opportunities/summer-internship-programme/';
    await page.goto(url, {waitUntil: 'load', timeout: 0});

    const title = await page.$eval('.col-sm-8.contentArea h3.colorRed.fontEm17.normalFont.marginTop0', (title) => {
        return title.textContent.trim();
    });

    const internshipDetails = await page.$eval('.wpb_wrapper', (wrapper) => {
        const paragraphs = wrapper.querySelectorAll('p');
        const ulElements = wrapper.querySelectorAll('ul');
        const duration = ulElements[0].querySelector('li').textContent;
        const eligibilityCriteria = ulElements[1].querySelectorAll('li');
        
        return {
            company_title: "Bank Alfalah",
            title: "Bank Internship",
            url: window.location.href,
            // detail: paragraphs[0].textContent.trim() || '',
            description: paragraphs[1].textContent.trim() || '',
            duration: duration.trim() || '8 to 2 Weeks',
            eligibilityCriteria: Array.from(eligibilityCriteria).map(li => li.textContent.trim()).join(', ') || ''
        };
    });
    internshipDetails.title = title;
    return internshipDetails;
}