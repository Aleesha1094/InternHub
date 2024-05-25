export async function Telenor(page) {
    const url = 'https://www.telenor.com.pk/internship-program/'
    await page.goto(url, {waitUntil: 'load', timeout: 0}); 

    const internshipDetails = await page.$eval('article.post-5514', (article) => {
        const heading = article.querySelector('.vc_custom_heading');
        const paragraphs = article.querySelectorAll('p');
        const ulElement = article.querySelector('ul');
        
        return {
            company_title: "Telenor Pakistan",
            url: window.location.href,
            title: heading?.textContent.trim() || '',
            description: paragraphs[0]?.textContent.trim() || '',
            // whatWeAreLookingFor: paragraphs[1]?.textContent.trim() || '',
            // whatWeProvide: paragraphs[2]?.textContent.trim() || '',
            // whatToExpect: paragraphs[3]?.textContent.trim() || '',
            // stipend: paragraphs[4]?.textContent.trim() || '',
            eligibilityCriteria: ulElement?.textContent.trim() || '',
            location: paragraphs[5]?.textContent.trim() || ''
        };
    });

    return internshipDetails;
}
