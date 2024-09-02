import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dataService from "../appwrite/config";
import { Container, PostForm } from "../components";

function EditPost() {
  const [post, setPosts] = useState([]);
  const { slug } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (slug) {
      dataService.getPost(slug).then((post) => {
        if (post) {
          setPosts(post);
        } else {
          navigate("/");
        }
      });
    }
  }),
    [slug, navigate];
  return post ? (
    <div>
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
