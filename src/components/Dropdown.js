"use client"
import React, {useState} from 'react'
import Link from 'next/link'
import { signOut } from 'next-auth/react';

function Dropdown({name, links}) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
      setIsOpen(false);
    };

    return (
                    <div className="relative inline-block text-left">
                      <div> 
                        <button
                          type="button"
                          className="inline-flex font-bold text-purple-800 hover:border-b-2 hover:border-purple-800 hover:text-black focus:outline-none"
                          id="options-menu"
                          aria-haspopup="true"
                          aria-expanded="true"
                          onClick={toggleDropdown}>{name}
                          <svg className="-mr-1 ml-2 h-5 w-5 text-purple-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.44l3.71-4.21a.75.75 0 011.08 1.04l-4.25 4.82a.75.75 0 01-1.08 0L5.23 8.25a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                      {isOpen && (
                        <div className="origin-top-left absolute my-3 left-0 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                          {links.map((link, index) => (
                            link.signOut ? (
                                <button 
                                    key={index}
                                    onClick={() => { 
                                        signOut();
                                        closeDropdown();
                                    }}
                                    className="block w-full px-4 py-2 text-sm text-black hover:bg-purple-100 hover:text-gray-900"
                                >
                                    {link.title}
                                </button>
                            ) : (
                            <Link
                                key={index}
                                href={link.url}
                                className="block px-4 py-2 text-sm text-black hover:bg-purple-100 hover:text-gray-900"
                                role="menuitem"
                                onClick={closeDropdown}
                            >
                                {link.title}
                            </Link>
                            )
                        ))}
                          </div>
                        </div>
                       )} 
                    </div>
  )}

export default Dropdown;