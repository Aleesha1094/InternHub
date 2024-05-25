import React from 'react'

function Footer() {
    const Links = {
        title: 'Useful Link',
        sub: [
            { subheading: 'About Intern Hub' },
            { subheading: 'Contact' },
            { subheading: 'Help Centre' },
            { subheading: 'Privacy Policy' },
        ]
    }

    const category = {
        title: 'Categories',
        sub: [
            { subheading: 'Flutter' },
            { subheading: 'React JS' },
            { subheading: 'React Native' },
            { subheading: 'Cloud Computing' },
            { subheading: 'UI/UX' },
            { subheading: 'Banker' },
        ]
    }
    return (
        <div>
            <div className='bg-[#F3F4FD] md:px-32 flex justify-center md:space-x-60 space-x-20 py-14'>
                <div className='space-y-3'>
                    <p className='text-[20px] text-[#333] font-poppins font-semibold'>{Links.title}</p>
                    {
                        Links.sub.map((links, index) => (
                            <p key={index}><a href="">{links.subheading}</a></p>
                        ))
                    }
                </div>

                <div className='space-y-3'>
                    <p className='text-[20px] text-[#333] font-poppins font-semibold'>{category.title}</p>
                    {
                        category.sub.map((catgry, index) => (
                            <p key={index}><a href="">{catgry.subheading}</a></p>
                        ))
                    }
                </div>
            </div>
            <div className='flex justify-center bg-[#ddd] py-4'>
                <p className='text-16 text-[#1E1E1E99] font-poppins font-[300]'>2024 @ Intern Hub - All rights reserved.</p>
            </div>
        </div>


    )
}

export default Footer
