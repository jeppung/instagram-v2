import React, { useEffect, useState } from 'react'
import Story from './Story'
import { faker } from '@faker-js/faker';
import { useSession } from 'next-auth/react';

function Stories() {

    const [suggestions, setSuggetions] = useState([]);
    const {data: session} = useSession();

    useEffect(() => {
        const suggestions = [...Array(20)].map((_, i) => ({
            id: i,
            username: faker.internet.userName().toLocaleLowerCase(),
            avatar: faker.image.avatar()
        }));

        setSuggetions(suggestions);
    }, []);
    

  return (
    <div className='flex space-x-2 border scrollbar-thin scrollbar-thumb-black overflow-x-auto p-5 bg-white'>
        {
            session && (
                <Story key={session.user.uid} username={session.user.username} avatar={session.user.image}/>
            )
        }
        {
            suggestions.map(({username, avatar, id}) => (
                <Story key={id} username={username} avatar={avatar}/>
            ))
        }
    </div>
  )
}

export default Stories
