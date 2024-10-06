import React, { useState, useEffect } from "react";
import dataService from "../appwrite/config";
import { Card } from "../components/index";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  return !loading ? (
    <div className="w-full py-8">
      <h1 className="text-center font-poppins text-3xl sm:text-5xl font-bold text-gray-800 mb-8 tracking-wide">
        "Fresh Reads: Dive In!"
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-4 max-w-6xl mx-auto">
        {posts.map((post, index) => {
          // Assign specific styles based on the post's position
          const cardClasses = () => {
            if (index === 0) return "sm:col-span-1 sm:row-span-2"; // First post: 2 rows
            if (index === 1) return "sm:col-span-2 sm:row-span-1"; // Second post: 2 columns
            return "sm:col-span-1 sm:row-span-1"; // Regular posts
          };

          return (
            <div key={post.$id} className={`p-2 ${cardClasses()}`}>
              <Card {...post} />
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <div className="w-full h-full font-bold text-2xl m-2">Loading...</div>
  );
}

export default AllPosts;
