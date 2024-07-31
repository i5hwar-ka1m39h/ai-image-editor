'use client'
import { navLinks } from '@/constants'
import { SignedIn, SignedOut, SignIn, UserButton } from '@clerk/nextjs'
import { link } from 'fs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Button } from '../ui/button'

export default function Sidebar() {
  const pathname = usePathname()
  return (
    <aside className='sidebar'>
      <div className=' flex size-full flex-col gap-4'>
        <Link href='/' className='sidebar-logo'>
          <Image src='/assets/images/logo-text.svg' alt='logo image' width={180} height={28}/>
        </Link>

        

        <nav className='sidebar-nav'>
          <SignedIn>
            <ul className='sidebar-nav_elements'>
              {
                navLinks.slice(0,6).map((single, i)=>{
                  const isActive = (single.route === pathname)
                  return(
                    <li key={i} className={`sidebar-nav_element group ${isActive ? 'bg-purple-gradient text-white' : 'text-gray-700'}`}>
                      <Link className="sidebar-link" href={single.route}>
                      <Image src={single.icon} alt='logo' width={24} height={24} className={`${isActive && 'brightness-200'}`}/>
                      {single.label}
                      </Link>
                    </li>
                  )
                })
              }
              </ul>


              <ul className='sidebar-nav_elements'>
              {
                navLinks.slice(6).map((single, i)=>{
                  const isActive = (single.route === pathname)
                  return(
                    <li key={i} className={`sidebar-nav_element group ${isActive ? 'bg-purple-gradient text-white' : 'text-gray-700'}`}>
                      <Link className="sidebar-link" href={single.route}>
                      <Image src={single.icon} alt='logo' width={24} height={24} className={`${isActive && 'brightness-200'}`}/>
                      {single.label}
                      </Link>
                    </li>
                  )
                })
              }
                <li className=' flex-center gap-2 p-4 cursor-pointer'>
                  <UserButton showName afterSwitchSessionUrl=''/>
                </li>
              </ul>
          </SignedIn>

          <SignedOut>
            <Button asChild className=' button bg-purple-gradient bg-cover'>
              <Link href={'/sign-in'}>Login</Link>
            </Button>
          </SignedOut>
        </nav>
      </div>
    </aside>
  )
}
