import React, { useState } from 'react'
import dataService from '../appwrite/config'
import { Container,Card } from '../components/index'

function AllPosts() {
    const [posts,setPosts]=useState([])
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
        appwriteService
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
        <Container>
            <div className='flex flex-wrap'>
            {posts.map((post)=>(
                <div key={post.$id} className='p-2 w-1'>
                <Card {...post}/>

                </div>
                ))}
            </div>
         
        </Container>
    </div>
  ): (
    <div className="w-full h-full font-bold text-2xl m-2">Loading...</div>
  );
}

export default AllPosts