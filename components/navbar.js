'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ModeToggle } from './theme-btn';
import { Button } from './ui/button';
import { SignInButton, SignOutButton, UserButton } from '@clerk/nextjs';
import { SignedIn } from '@clerk/nextjs';
import { SignedOut } from '@clerk/nextjs';
import { Menu, X } from 'lucide-react';

const navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className='flex flex-col lg:flex-row px-4 lg:px-10 py-2 bg-[#0f763a] text-slate-200 justify-between items-start lg:items-center dark:bg-gray-800 dark:text-white'>
        {/* Top section with logo and hamburger */}
        <div className="flex w-full lg:w-auto justify-between items-center">
            <div className="logo flex items-center justify-center">
                <img className='w-20 sm:w-28 dark:invert' src="imgs/demonslayer.png" alt="Demon Slayer" />
                <h1 className='text-lg sm:text-2xl font-bold -ml-3 sm:-ml-5'>Demon's Manager</h1>
            </div>

            {/* Hamburger menu button - only visible on mobile */}
            <button 
                className="lg:hidden p-2 rounded-md hover:bg-[#0a5a2e] dark:hover:bg-gray-700 transition-colors"
                onClick={toggleMenu}
                aria-label="Toggle menu"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
        </div>

        {/* Navigation menu */}
        <div className={`${isOpen ? 'flex' : 'hidden'} lg:flex w-full lg:w-auto flex-col lg:flex-row gap-4 lg:gap-8 mt-4 lg:mt-0 pb-4 lg:pb-0`}>
            <ul className='flex flex-col lg:flex-row gap-4 lg:gap-8 text-base font-semibold items-start lg:items-center w-full lg:w-auto'>
                <li className='lakdi relative w-full lg:w-auto'>
                    <Link href="/" className='block px-0 py-2 font-semibold cursor-pointer options hover:text-gray-300 transition-colors'>
                        Home
                    </Link>
                </li>
                <li className='lakdi relative w-full lg:w-auto'>
                    <Link href="/about" className='block px-0 py-2 font-semibold cursor-pointer options hover:text-gray-300 transition-colors'>
                        About
                    </Link>
                </li>
                <li className='lakdi relative w-full lg:w-auto'>
                    <Link href="/contact" className='block px-0 py-2 font-semibold cursor-pointer options hover:text-gray-300 transition-colors'>
                        Contact Us
                    </Link>
                </li>
                <li className='lakdi relative w-full lg:w-auto'>
                    <Link href="/blogs" className='block px-0 py-2 font-semibold cursor-pointer options hover:text-gray-300 transition-colors'>
                        Blogs
                    </Link>
                </li>
            </ul>

            {/* Auth and theme toggle section */}
            <div className='flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-4 lg:mt-0 w-full lg:w-auto'>
                <SignedIn>
                    <UserButton appearance={{
                        elements: {
                            userButtonAvatarBox: "w-10 h-10",
                            userButtonPopoverCard: "bg-gray-800",
                        },
                    }} />      
                </SignedIn>
                <SignedOut>
                    <SignInButton className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-full sm:w-auto text-center">
                        Sign in
                    </SignInButton>
                </SignedOut>
                <ModeToggle />
            </div>
        </div>
    </nav>
  )
}

export default navbar