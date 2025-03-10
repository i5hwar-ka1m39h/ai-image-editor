'use client'

import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Link from 'next/link'
import Image from 'next/image'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { navLinks } from '@/constants'
import { Button } from '../ui/button'


export default function MobileNav() {
  const pathname = usePathname()
  return (
    <header className='header'>
      <Link href={'/'} className=' flex items-center gap-2 md:py-4'>
        <Image src={'/assets/images/logo-text.svg'} alt='logo' width={180} height={28}/>
      </Link>

      <nav className='flex gap-2'>
        <SignedIn>
          <UserButton/>
          <Sheet>
            <SheetTrigger>
              <Image src={'/assets/icons/menu.svg'} alt='menu' width={32} height={32} className=' cursor-pointer ' />
            </SheetTrigger>
            <SheetContent className=' sheet-content sm:w-64'>
              <>
                <Image src={'/assets/images/logo-text.svg'} alt='logo' width={152} height={23}/>

                <ul className='header-nav_elements'>
              {
                navLinks.map((single, i)=>{
                  const isActive = (single.route === pathname)
                  return(
                    <li key={i} className={`${isActive && 'gradient-text'} p-18 flex whitespace-nowrap text-dark-700`}>
                      <Link className="sidebar-link cursor-pointer" href={single.route}>
                      <Image src={single.icon} alt='logo' width={24} height={24} />
                      {single.label}
                      </Link>
                    </li>
                  )
                })
              }
              </ul>
              </>
            </SheetContent>
          </Sheet>

        </SignedIn>

        
        <SignedOut>
            <Button asChild className=' button bg-purple-gradient bg-cover'>
              <Link href={'/sign-in'}>Login</Link>
            </Button>
          </SignedOut>
      </nav>

    </header>
  )
}
