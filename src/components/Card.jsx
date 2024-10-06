import React, { useState, useEffect } from 'react';
import dataService from '../appwrite/config';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Card({ $id, title, featuredImage }) {
  const [imageUrl, setImageUrl] = useState('fallback-image-url');
  const userData =useSelector((state) => state.auth.userData);


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
    <Link to={`/post/${$id}`} className="block transform transition-transform duration-300 hover:scale-105">
  <div className="w-full bg-white shadow-md hover:shadow-lg rounded-xl p-4 transition-shadow duration-300">
    <div className="w-full mb-4 flex justify-center">
      <img 
        src={imageUrl} 
        alt={title} 
        className="rounded-xl w-72 h-64 md:h-72 lg:h-80 object-cover"
        onError={(e) => { e.target.src = 'fallback-image-url'; }}
      />
    </div>
    <h2 className="text-lg md:text-xl font-semibold text-gray-800 line-clamp-2 mb-2">{title}</h2>
  </div>
</Link>

  );
}

export default Card;
