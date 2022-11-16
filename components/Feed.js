import { useSession } from 'next-auth/react'
import React from 'react'
import MiniProfile from './MiniProfile'
import Posts from './Posts'
import Stories from './Stories'
import Suggestions from './Suggestions'

function Feed() {

  const {data: session} = useSession();
  console.log(session);

  return (
    <main className={`grid grid-cols-1 md:grid-cols-2 md:max-w-3xl ${session && 'xl:grid-cols-3 xl:max-w-6xl mt-10'} mx-auto`}>

        <section className='col-span-2'>
            {
              session && (
                <Stories />
              )
            }
            <Posts />
        </section>
           

        <section className='hidden xl:inline-grid md:col-span-1'>
            <div className='fixed '>
              {
                session && (
                  <>
                    <MiniProfile />
                    <Suggestions />
                  </>
                )
              }
              
            </div>
        </section>
        
    </main>
  )
}

export default Feed