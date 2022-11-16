import Image from 'next/image'
import React from 'react'

function Story({key, username, avatar}) {
  return (
    <div className='flex-shrink-0 flex flex-col justify-center items-center space-y-1'>
        <img src={avatar} className='h-14 w-14 p-[1.5px] border border-red-500 rounded-full object-contain cursor-pointer hover:scale-110 transition-200 ease-out duration-150'/>

        <p className='text-xs text-ellipsis w-14 truncate'>{username}</p>
    </div>
  )
}

export default Story