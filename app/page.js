
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div >
      <div className='max-w-2xl mx-auto my-24 '>
        <div className='space-y-8'>
          <h2 className='font-bold text-6xl text-center'>Create your forms
            in seconds not hours</h2>
          <p className='text-center'>Generate, publish and share your form right away with AI. Dive into insightful results, charts and analytics.</p>
          <div className='text-center'>
            <Link href='/form' className='bg-purple-500 hover:bg-purple-600 duration px-2 py-2 rounded-md text-white'>+ Create Form</Link>
          </div>
        </div>
      </div>
      <div className='max-w-5xl mx-auto my-24'>
        <div>
          <h2>How It Works</h2>
          <div className='flex justify-between space-x-24'>
            <div className='w-64'>
              <Image src="/one.webp" width={250} height={250} alt='step-one' />
              <p className='text-center'>1. Add a prompt and describe the requirements for your form.</p>
            </div>
            <div className='w-64'>
              <Image src="/two.webp" width={250} height={250} alt='step-two' />
              <p> 2. Generate the form.</p>
            </div>
            <div className='w-64'>
              <Image src="/three.webp" width={250} height={250} alt="step-three" />
              <p className='text-center'>3. Check results, analytics and more.</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
