import { faker } from '@faker-js/faker'
import React, { useEffect, useState } from 'react'

function Suggestions() {

    const [suggestions, setSuggetions] = useState([]);

    useEffect(() => {
        const suggestions = [...Array(5)].map((_, i) => (
            {
                id: i,
                username: faker.internet.userName().toLocaleLowerCase(),
                avatar: faker.image.avatar(),
                company: faker.company.name()
            }
        ));

        setSuggetions(suggestions);
    }, [])

  return (
    <div className='mt-4 ml-10'>
        <div className='flex justify-between items-center'>
            <h3 className='text-sm font-bold text-gray-400'>Suggestions for you</h3>
            <button className='text-gray-600 font-semibold'>See All</button>
        </div>
        {
            suggestions.map(profile => (
                <div key={profile.id} className='flex items-center justify-between mt-3'>
                    <img src={profile.avatar} className='w-10 h-10 rounded-full border p-[2px]'/>
                    <div className='flex-1 mx-4'>
                        <h2 className='font-semibold text-sm'>{profile.username}</h2>
                        <h3 className='text-xs text-gray-400'>Works at {profile.company}</h3>
                    </div>
                    <button className='text-blue-400 font-semibold text-sm'>Follow</button>
                </div>
            ))
        }
    </div>
  )
}

export default Suggestions