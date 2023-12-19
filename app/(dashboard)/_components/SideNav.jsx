"use client";
import { File, Upload } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

const SideNav = () => {
    const menuList = [
        {
            id: 1,
            name: 'Upload',
            icon: Upload,
            path: '/upload'
        },
        {
            id: 2,
            name: 'Files',
            icon: File,
            path: '/upload'
        },
    ];

    const [activeIndex, setActiveIndex] = useState(0)

    return (
        <div className='shadow-sm border-r h-full'>
            <div className='p-5 border-b'>
                <Image src="/logo.png" width={150} height={100} />
            </div>
            <div className='flex flex-col float-left w-full'>
                {menuList.map((item, index) => (
                    <button className={`flex gap-2 p-4 px-6 hover:bg-gray-100 w-full text-gray-500 ${activeIndex === index ? 'bg-gray-100 text-primary' : ''}`} onClick={() => setActiveIndex(index)}>
                        <item.icon />
                        <h2>{item.name}</h2>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default SideNav