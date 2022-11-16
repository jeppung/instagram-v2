import { faker } from '@faker-js/faker';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import Post from './Post'

const DUMMY_DATA = [
    {
        id: '123',
        username: faker.internet.userName().toLocaleLowerCase(),
        userImg: faker.image.avatar(),
        img: faker.image.food(),
        caption: 'This looks tasty!'
    },
    {
        id: '124',
        username: faker.internet.userName().toLocaleLowerCase(),
        userImg: faker.image.avatar(),
        img: faker.image.food(),
        caption: 'This looks tasty too!'
    },
];

function Posts() {

    const [posts, setPosts] = useState([]);

    useEffect(() => onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), snapshot => {
        setPosts(snapshot.docs);
    }), [db]);

    // console.log(posts[0].id);

  return (
    <div>
        {
            posts.map((post) => (
                <Post key={post.id} id={post.id} username={post.data().username} userImg={post.data().profileImg} img={post.data().image} caption={post.data().caption}/>
            ))
        }
    </div>
  )
}

export default Posts