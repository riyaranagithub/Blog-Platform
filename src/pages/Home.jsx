import React, { useEffect, useState } from 'react';
import dataService from '../appwrite/config';
import { Card } from '../components/index';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    dataService
      .getPosts()
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        }
        setLoading(false);
      })
      .catch(() => {
        console.error('Failed to fetch posts');
        setError('Failed to fetch posts');
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50">
     

      {/* Intro Section */}
     <img src="png.png" alt="image" className='w-full h-auto mb-6 font-poppins' />
      {/* Posts Heading */}
      <h2 className="text-3xl font-bold text-gray-700 mb-6 animate-fadeIn">
        Check Out the Latest Posts
      </h2>

      {/* Error Handling */}
      {error && (
        <div className="w-full h-full flex justify-center items-center">
          <h1 className="font-bold text-2xl text-red-500 hover:text-gray-500 transition-all duration-200 ease-in-out">
            {error}
          </h1>
        </div>
      )}

      {/* No Posts State */}
      {!loading && posts.length === 0 && (
        <div className="w-full h-full flex justify-center items-center">
          <h1 className="font-bold text-2xl text-gray-600 hover:text-gray-500 transition-all duration-200 ease-in-out">
            No posts found
          </h1>
        </div>
      )}

      {/* Posts Display */}
      {!loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {posts.map((post) => (
            <div
              key={post.$id}
              className="transform hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              <Card {...post} />
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center mt-6">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
          <h1 className="font-bold text-2xl text-gray-600 ml-4">Loading...</h1>
        </div>
      )}

      
    </div>
  );
}