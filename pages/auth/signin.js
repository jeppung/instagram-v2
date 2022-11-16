import React from 'react'
import {getProviders, signIn as SignIntoProvider} from "next-auth/react";
import Header from '../../components/Header';

function signin({providers}) {
  return (
    <>
        <Header />

        <div className='flex flex-col justify-center  h-screen -mt-20 items-center'>
            <img src='https://links.papareact.com/ocw' className='w-80'/>
            <p>This is not a REAL app, it is built for educational purposes only</p>
            <div className='mt-10'>
                {Object.values(providers).map((provider) => (
                    <div key={provider.name}>
                    <button className='p-3 bg-blue-500 rounded-lg text-white' onClick={() => SignIntoProvider(provider.id, {callbackUrl: '/'})}>
                        Sign in with {provider.name}
                    </button>
                    </div>
                ))}
            </div>
        </div>
       
      
    </>
  )
}

export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: {
            providers
        }
    }
}

export default signin