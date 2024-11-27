import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

export default function Header() {
    return (
        <div className='border py-4 px-8'>
            <SignedOut>
                <div className='flex justify-between'>
                    <p>AI Form Builder</p>
                    <SignInButton />
                </div>
            </SignedOut>
            <SignedIn>
                <div className='flex justify-between'>
                    <p>AI Form Builder</p>
                    <UserButton />
                </div>
            </SignedIn>

        </div>
    )
}
