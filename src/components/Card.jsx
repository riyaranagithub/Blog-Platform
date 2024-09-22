import React, { useState, useEffect } from 'react';
import dataService from '../appwrite/config';
import { Link } from 'react-router-dom';

function Card({ $id, title, featuredImage }) {
  const [imageUrl, setImageUrl] = useState('fallback-image-url');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        // Await and convert URL object to string
        const url = await dataService.getImagePreview(featuredImage);
        const urlString = url.href; // Convert URL object to string
        // console.log("Fetched URL:", urlString);
        setImageUrl(urlString);
      } catch (error) {
        console.log("Error fetching image preview:", error);
        // Fallback image URL is already set by default
      }
    };

    fetchImage();
  }, [featuredImage]);

  // Log the imageUrl before using it
  // console.log("Image URL:", imageUrl);

  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full bg-gray-100 p-4 rounded-xl'>
        <div className='w-full mb-4 flex justify-center'>
          <img 
            src={imageUrl} 
            alt={title} 
            className='rounded-xl w-96 h-96'

            onError={(e) => { e.target.src = 'fallback-image-url'; }}
          />
        </div>
        <h2 className='text-xl font-bold'>{title}</h2>
        {/* <h2 className='text-xl font-bold'>{featuredImage}</h2> */}
      </div>
    </Link>
  );
}

export default Card;
