import React, { useState } from 'react'
import dataService from '../appwrite/config'
import {Card } from '../components/index'

function AllPosts() {
    const [posts,setPosts]=useState([])
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
        dataService
          .getPosts([])
          .then((posts) => {
            if (posts) {
              setPosts(posts.documents);
              console.log("post in AllPost page:", posts);
            }
          })
          .finally(() => {
            setLoading(false);
          });
      }, []);
  return !loading?(
    <div className='w-full py-8'>
      <h1 className='text-center font-poppins text-5xl'>All the posts are here</h1>
            <div className='w-96 flex flex-wrap'>
            {posts.map((post)=>(
                <div key={post.$id} className='p-2 w-full'>
                <Card {...post}/>

                </div>
                ))}
            </div>
         
        
    </div>
  ): (
    <div className="w-full h-full font-bold text-2xl m-2">Loading...</div>
  );
}

export default AllPosts