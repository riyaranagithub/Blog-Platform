import React from 'react';
import dataService from '../appwrite/config';
import { Link } from 'react-router-dom';

function Card({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full bg-gray-100 p-4 rounded-xl'>
        <div className='w-full mb-4 flex justify-center'>
          <img 
            src={dataService.getImagePreview(featuredImage)} 
            alt={title} 
            className='rounded-xl' 
            onError={(e) => { e.target.src = 'fallback-image-url'; }}
          />
        </div>
        <h2 className='text-xl font-bold'>{title}</h2>
      </div>
    </Link>
  );
}

export default Card;


// Correct Prop Handling: The title, $id, and featuredImage props are correctly destructured.
// Error Handling: The onError handler for the image provides a fallback in case the image fails to load.
// Semantic HTML: The use of h2 for the title is good for accessibility and SEO.

