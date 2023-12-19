import { UserButton } from '@clerk/nextjs'
import { AlignJustify } from 'lucide-react'
import React from 'react'

const TopHeader = () => {
    return (
        <div className='flex p-5 border-b items-center justify-between md:justify-end'>
            <AlignJustify className='md:hidden' />
            <UserButton />
        </div>
    )
}

export default TopHeader