import Image from 'next/image'
import React from 'react'
import {SearchIcon, PlusCircleIcon, UserGroupIcon, HeartIcon, PaperAirplaneIcon, MenuIcon} from '@heroicons/react/outline'
import {HomeIcon} from "@heroicons/react/solid"
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { modalState } from '../atoms/modalAtom'

function Header() {
    const {data: session} = useSession();
    const [open, setOpen] = useRecoilState(modalState);
    const router = useRouter();

  return (
    <div className='bg-white shadow-sm sticky top-0 z-50'>
        <div className='flex justify-between items-center max-w-6xl bg-white px-5 lg:mx-auto'>
            {/* Left */}
            <div onClick={() => router.push('/')} className='relative w-24 h-24 cursor-pointer hidden lg:inline-grid'>
                <Image src="https://links.papareact.com/ocw" fill objectFit='contain'/>
            </div>
            <div onClick={() => router.push('/')} className='relative w-10 h-10 flex-shrink-0 cursor-pointer lg:hidden'>
                <Image src="https://links.papareact.com/jjm" fill objectFit='contain'/>
            </div>

            {/* Middle */}
            <div  className='relative rounded-md p-3'>
                <div className='absolute inset-y-0 pl-3 flex items-center pointer-events-none'>
                    <SearchIcon className='h-5 w-5 text-gray-500'/>
                </div>
                <input className=' bg-gray-50 block w-full pl-10 p-2 border-gray-300 border rounded-md focus:ring-black focus:border-black' type='text' placeholder='Search'/>
            </div>

            {/* Right */}
            <div className='flex items-center justify-end space-x-4'>
                {session ? (
                    <>
                        <HomeIcon onClick={() => router.push('/')} className='navBtn'/>
                        <MenuIcon className='h-6 md:hidden cursor-pointer'/>
                        <div className='relative navBtn'>
                            <PaperAirplaneIcon className='navBtn rotate-45'/>
                            <div className='absolute -top-2 -right-2 text-xs w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white animate-pulse'>3</div>
                        </div>
                        <PlusCircleIcon onClick={() => setOpen(true)} className='navBtn'/>
                        <UserGroupIcon className='navBtn'/>
                        <HeartIcon className='navBtn'/>
                        <img onClick={signOut} src={session.user.image} className='h-10 w-10 object-cover rounded-full cursor-pointer' alt=''/>
                    </>
                    
                ):(
                    <button onClick={signIn}>Sign In</button>
                )
                }
            </div>
            
        </div>
    </div>
    
  )
}

export default Header