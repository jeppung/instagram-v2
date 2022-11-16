import React, { useEffect, useState } from 'react'
import {BookmarkIcon, ChatIcon, DotsHorizontalIcon, EmojiHappyIcon, HeartIcon, PaperAirplaneIcon} from "@heroicons/react/outline"
import {HeartIcon as HeartIconFilled} from "@heroicons/react/solid"
import { signIn, useSession } from 'next-auth/react';
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Moment from 'react-moment';

function Post({id, username, caption, img, userImg}) {

  const {data: session} = useSession();
  const [comment, setComment] = useState([]);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [like, setLike] = useState(false);


  useEffect(() => onSnapshot(query(collection(db, 'posts', id, 'comments'), orderBy('timestamp', 'asc')), 
    snapshot => setComments(snapshot.docs))
  , [db, id])

  useEffect(() => onSnapshot(collection(db, 'posts', id, 'likes'), 
    snapshot => setLikes(snapshot.docs))
  , [db, id])

  useEffect(() => {
    setLike(likes.findIndex(like => like.id === session?.user?.uid) !== -1)
  }, [likes])

  const likePost = async () => {
    setLike(true);
    await setDoc(doc(db, 'posts', id, 'likes', session.user.uid), {
      username: session.user.username,
    });
    console.log('Post liked')
  }

  const unlikePost = async () => {
    setLike(false);
    await deleteDoc(doc(db, 'posts', id, 'likes', session.user.uid));
    console.log('Post unliked')
  }

  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment('');

    await addDoc(collection(db, 'posts', id, 'comments'), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp()
    }); 
  }

  return (
    <div className='bg-white my-7 border rounded-sm'>
        {/* Headers */}
        <div className='flex items-center p-5'>
            <img src={userImg} alt="" className='rounded-full h-12 w-12 border p-1 mr-2'/>
            <p className='flex-1 font-bold'>{username}</p>
            <DotsHorizontalIcon className='h-5'/>
        </div>

        {/* img */}
        <img src={img} className='w-full object-cover'/>

        {/* Buttons */}
        {session && (
          <div className='flex justify-between items-center px-4 pt-4'>
              <div className='flex space-x-4 items-center justify-center'>
                  {
                    like ? (
                      <HeartIconFilled onClick={unlikePost} className='btn text-red-500'/>
                    ):(
                      <HeartIcon 
                      onClick={likePost} 
                      className='btn'/>
                    )
                  }
                  <ChatIcon className='btn'/>
                  <PaperAirplaneIcon className='btn rotate-45'/>
              </div>
              <BookmarkIcon className='btn'/>
          </div>
        )}
        
        {/* Caption */}
        <div className='p-5'>
          {
            likes.length > 0 && (
              <span className='font-bold'>{likes.length} Likes</span>
            )
          }
          <p className='truncate'>
            <span className='font-bold mr-1'>{username} </span>
            {caption}
          </p>
        </div>
       

        {/* Comments */}
        {
          comments.length > 0 && (
            <div className='px-10 h-20 overflow-y-auto scrollbar-thumb-black scrollbar-thin'>
              {
                comments.map(comment => (
                  <div key={comment.id} className='flex items-center space-x-2 mb-3 '>
                    <img src={comment.data().userImage} className='h-7 w-7 rounded-full'/>
                    <p className='text-sm flex-1'>
                      <span className='font-bold'>{comment.data().username} </span>{comment.data().comment}
                    </p>
                    <Moment fromNow className='text-xs'>
                      {comment.data().timestamp?.toDate()}
                    </Moment>
                  </div>
                ))
              }
            </div>
          )
        }

        
        {/* Input box */}
        {
          session && (
            <form className='flex items-center p-5'>
              <EmojiHappyIcon className='h-7'/>
              <input value={comment} onChange={e => setComment(e.target.value)} type='text' placeholder='Add a comment...' className='border-none flex-1 focus:ring-0'/>
              <button className='font-semibold text-blue-400' disabled={!comment} onClick={sendComment}>Post</button>
            </form>
          )
        }
    </div>
  )
}

export default Post