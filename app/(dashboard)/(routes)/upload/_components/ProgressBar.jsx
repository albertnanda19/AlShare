import React from 'react'

const ProgressBar = ({ progress = 40 }) => {
    return (
        <div className='bg-gray-400 w-full mt-3 rounded-full h-4 font-bold'>
            <div className='text-[10px] p-0.2 h-4 bg-primary rounded-full text-white' style={{ width: `${progress}%` }}>
                {`${Number(progress).toFixed(0)}%`}
            </div>
        </div>
    )
}

export default ProgressBar