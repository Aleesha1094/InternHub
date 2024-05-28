import Link from 'next/link'
import React from 'react'

function Footer() {
    const Links = {
        title: ["Useful Links"],
        sub: [
            { subheading: 'Home', url: '/'},
            { subheading: 'Contact Us', url: '/contactus'},
            { subheading: 'About Us',url: '/aboutus' },
            { subheading: 'Privacy Policy',url: '/privacypolicy' },
        ]
    }

    const category = {
        title: 'Available Internships',
        sub: [
            { subheading: 'Mobile Development' },
            { subheading: 'Web Development' },
            { subheading: 'Textile Engineering' },
            // { subheading: 'Cloud Computing' },
            // { subheading: 'UI/UX' },
            { subheading: 'Banking' },
        ]
    }
    return (
        <div>
            <div className='bg-purple-100 md:px-32 flex justify-center md:space-x-60 space-x-20 py-7'>
                <div className='space-y-3'>
                    <p className='text-[#333] font-poppins font-semibold cursor-default'>{Links.title}</p>
                    {
                        Links.sub.map((links, index) => (
                            <p key={index} className='text-sm text-gray-600 hover:underline hover:text-base hover:text-purple-800'><Link href={links.url}>{links.subheading}</Link></p>
                        ))
                    }
                </div>

                <div className='space-y-3'>
                    <p className='text-[#333] font-poppins font-semibold cursor-default'>{category.title}</p>
                    {
                        category.sub.map((catgry, index) => (
                            <p key={index} className='text-sm text-gray-600 cursor-default'>{catgry.subheading}</p>
                        ))
                    }
                </div>
            </div>
            <div className='flex justify-center bg-[#ddd] py-4'>
                <p className='text-16 text-[#1E1E1E99] font-poppins font-[300]'>2024 @ Future Interns - All rights reserved.</p>
            </div>
        </div>
    )
}

export default Footer