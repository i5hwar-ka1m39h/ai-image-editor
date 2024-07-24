'use client'
import { navLinks } from '@/constants'
import { SignedIn, SignedOut, SignIn } from '@clerk/nextjs'
import { link } from 'fs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function Sidebar() {
  const pathname = usePathname()
  return (
    <aside className='sidebar'>
      <div className=' flex size-full flex-col gap-4'>
        <Link href='/' className='sidebar-logo'>
          <Image src='/assets/images/logo-text.svg' alt='logo image' width={180} height={28}/>
        </Link>

        

        <nav className='sidebar-nav'>
          {/* <SignedIn> */}
            <ul className='sidebar-nav_elements'>
              {
                navLinks.map((single, i)=>{
                  const isActive = (single.route === pathname)
                  return(
                    <li key={i} className={`sidebar-nav_element group ${isActive ? 'bg-purple-gradient text-white' : 'text-gray-700'}`}>
                      {single.label}
                    </li>
                  )
                })
              }

            </ul>
          {/* </SignedIn> */}

          <SignedOut>
            
          </SignedOut>
        </nav>
      </div>
    </aside>
  )
}
