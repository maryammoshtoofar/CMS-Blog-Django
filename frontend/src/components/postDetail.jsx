import { useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingIndicator from "./loadingIndicator";
import { useState } from "react";
import api from "../api";

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    getPost();
  }, [id]);

  const getPost = () => {
    api
      .get(`/api/posts/${id}`)
      .then((res) => res.data)
      .then((data) => setPost(data))
      .catch((err) => console.log(err));
  };
  if (!post) return <LoadingIndicator />;

  return (
    <div>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
        <p>{new Date(post.created_at).toLocaleDateString("en-US")}</p>
    </div>
  )
}


export default PostDetail