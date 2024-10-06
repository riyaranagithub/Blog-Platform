import React, { useEffect, useState } from 'react';
import dataService from '../appwrite/config';
import { useSelector } from 'react-redux';
import { Card } from '../components';

function UserPost() {
    const [posts, setPosts] = useState(null);
    const userData = useSelector((state) => state.auth.userData);
    
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const fetchedPosts = await dataService.getPosts();
                setPosts(fetchedPosts);
                console.log("posts in userPost", fetchedPosts);
            } catch (error) {
                console.log("Error::Fetching Posts", error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <div className="text-center mb-8">
    <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
    "Your Post Collection"
    </h1>
    <p className="text-lg sm:text-xl text-gray-600">
    "Take a look at the posts you’ve written so far. Ready to add another chapter?"
    </p>
</div>

            {posts ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {posts.documents.map((post) => {
                        if (userData?.userData?.$id === post.userID) {
                            return <Card key={post.$id} {...post} />;
                        }
                        return null; // Return null if it doesn't match
                    })}
                </div>
            ) : (
                <p>Loading posts...</p>
            )}
        </div>
    );
}

export default UserPost;
