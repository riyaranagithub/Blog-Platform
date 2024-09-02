import React, {useEffect, useState} from 'react'
import dataService from '../appwrite/config'
import {Container,Card} from '../components/index'

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      dataService.getPosts().then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        }
        setLoading(false);
      }).catch(() => {
        console.error("Failed to fetch posts");
        setLoading(false);
      });
    }, []); // Keep dependency array empty to avoid unnecessary re-renders
    
  
    if (posts.length === 0 && !loading) {
      return (
        <Container>
          <div className="w-full h-full flex flex-wrap ">
            <h1 className="font-bold text-2xl hover:text-gray-500">
              No posts found
            </h1>
          </div>
        </Container>
      );
    }
    return !loading ? (
      <div className="mt-4 w-full h-auto lg:h-screen">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => (
              <div key={post.$id}>
                <Card {...post} />
              </div>
            ))}
          </div>
        </Container>
      </div>
    ) : (
      <Container>
        <div className="w-full flex flex-wrap m-2">
          <h1 className="font-bold text-2xl hover:text-gray-500">Loading...</h1>
        </div>
      </Container>
    );
  }