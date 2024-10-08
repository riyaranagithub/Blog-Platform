import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import dataService from "../appwrite/config";
import { Button } from "../components/index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const { slug } = useParams();
    const navigate = useNavigate();
     
    const userData = useSelector((state) => state.auth.userData);
    console.log(post);
    console.log(userData);

    const isAuthor = post && userData ? post.userID === userData.userData.$id : false;
    console.log(isAuthor);

    useEffect(() => {
        let isMounted = true; // Track mounting status

        const fetchImage = async (featuredImage) => {
            try {
                if (featuredImage) {
                    const url = await dataService.getImagePreview(featuredImage);
                    if (isMounted) {
                        setImageUrl(url.href);
                    }
                }
            } catch (error) {
                console.log("Error fetching image preview:", error);
            }
        };

        const fetchPost = async () => {
            if (slug) {
                try {
                    const post = await dataService.getPost(slug);
                    if (isMounted && post) {
                        setPost(post);
                        await fetchImage(post.featuredImage);
                    } else {
                        navigate("/");
                    }
                } catch (error) {
                    console.log("Error fetching post:", error);
                    navigate("/");
                }
            } else {
                navigate("/");
            }
        };

        fetchPost();

        return () => {
            isMounted = false; // Cleanup on component unmount
        };
    }, [slug, navigate]);

    const deletePost = () => {
        dataService.deletePost(post.$id).then((status) => {
            if (status) {
                dataService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8 max-w-2xl mx-auto">
            <div className="w-full flex justify-center mb-6 relative border rounded-xl overflow-hidden shadow-lg">
                <img
                    src={imageUrl}
                    alt={post.title}
                    className="rounded-xl w-72 h-64 object-cover"
                />
                
                {isAuthor && (
                    <div className="absolute right-6 top-6">
                        <Link to={`/edit-post/${post.$id}`}>
                            <Button bgColor="bg-green-500" className="mr-3">
                                Edit
                            </Button>
                        </Link>
                        <Button bgColor="bg-red-500" onClick={deletePost}>
                            Delete
                        </Button>
                    </div>
                )}
            </div>
            <div className="text-center mb-4">
                <h1 className="text-3xl font-bold text-gray-800">{post.title}</h1>
            </div>
            <div className="text-gray-700 leading-relaxed">
                {parse(post.content)}
            </div>
        </div>
    ) : null;
}
