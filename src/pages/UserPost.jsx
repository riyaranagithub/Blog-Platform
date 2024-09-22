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
        <div>
            {posts ? (
                posts.documents.map((post) => {
                    if (userData?.userData?.$id === post.userID) {
                        return <Card {...post}/>;
                    }
                    return null; // Return null if it doesn't match
                })
            ) : (
                <p>Loading posts...</p>
            )}
        </div>
    );
}

export default UserPost;
