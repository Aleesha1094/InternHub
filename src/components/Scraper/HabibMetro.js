async function HabibMetro(page) {
    const url = 'https://www.habibmetro.com/careers/internships/#1620089794714-9ea57980-a262';
    await page.goto(url, {waitUntil: 'load'});

    const internshipDetails = await page.evaluate(() => {
        const internshipSections = document.querySelectorAll('.vc_tta-panel');

        const summerInternship = Array.from(internshipSections).find(section =>
            section.querySelector('.vc_tta-title-text').textContent.includes('Summer Internship')
        );

        const yearAroundInternship = Array.from(internshipSections).find(section =>
            section.querySelector('.vc_tta-title-text').textContent.includes('Year-Around Internship')
        );

        const contactInfo = document.querySelector('.wpb_text_column:last-child');

        return {
            summerInternship: {
                title: summerInternship ? summerInternship.querySelector('.vc_tta-title-text').textContent.trim() : '',
                description: summerInternship ? summerInternship.querySelector('.wpb_wrapper p').textContent.trim() : '',
                applyNowLink: summerInternship ? summerInternship.querySelector('.vc_btn3-container a').getAttribute('href') : ''
            },
            yearAroundInternship: {
                title: yearAroundInternship ? yearAroundInternship.querySelector('.vc_tta-title-text').textContent.trim() : '',
                description: yearAroundInternship ? yearAroundInternship.querySelector('.wpb_wrapper p').textContent.trim() : '',
                applyNowLink: yearAroundInternship ? yearAroundInternship.querySelector('.vc_btn3-container a').getAttribute('href') : ''
            },
            contactInfo: contactInfo ? contactInfo.textContent.trim() : '',
            company_title: "Telenor Pakistan",
            url: window.location.href,

        };
    });

    return internshipDetails;
}