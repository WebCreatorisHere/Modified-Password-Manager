import React from 'react';
import Link from 'next/link';
import { ModeToggle } from './theme-btn';
import { Button } from './ui/button';
import { SignInButton, SignOutButton, UserButton } from '@clerk/nextjs';
import { SignedIn } from '@clerk/nextjs';
import { SignedOut } from '@clerk/nextjs';

const navbar = () => {
  return (
    <nav className='flex px-10 py-2 bg-[#0f763a] text-slate-200 justify-between items-center dark:bg-gray-800 dark:text-white'>
        <div className="logo flex items-center justify-center">
            <img className='w-28 dark:invert' src="imgs/demonslayer.png" alt="Demon Slayer" />
            <h1 className='text-2xl font-bold -ml-5'>Demon's Manager</h1>
        </div>

        <ul className='flex gap-8 text-base font-semibold items-center'>
            <li className='lakdi relative'><Link href="/" className='px-0 py-2 font-semibold cursor-pointer options'>Home</Link></li>
            <li className='lakdi relative'><Link href="/" className='px-0 py-2 font-semibold cursor-pointer options'>About</Link></li>
            <li className='lakdi relative'><Link href="/" className='px-0 py-2 font-semibold cursor-pointer options'>Contact Us</Link></li>
            <li className='lakdi relative'><Link href="/" className='px-0 py-2 font-semibold cursor-pointer options'>Blogs</Link></li>
            <div className='flex items-center gap-3'>
              <SignedIn>
  <UserButton appearance={{
                        elements: {
                            userButtonAvatarBox: "w-10 h-10",
                            userButtonPopoverCard: "bg-gray-800",
                        },
                    }} />      
              </SignedIn>
              <SignedOut>
                <SignInButton className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Sign in</SignInButton>
              </SignedOut>
              <ModeToggle />

              </div>
        </ul>
            
    </nav>
  )
}

export default navbar