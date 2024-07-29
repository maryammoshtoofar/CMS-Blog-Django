import { useState, useEffect } from "react";
import api from "../api";
import Post from "../components/post";
import "../styles/home.css";

function Home() {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = () => {
    api
      .get("/api/posts/")
      .then((res) => res.data)
      .then((data) => {
        setPosts(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  const deletePost = (id) => {
    api
      .delete(`/api/posts/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Post was deleted");
        else alert("Failed to delete post");
        getPosts();
      })
      .catch((error) => console.log(error));
  };

  const createPost = (e) => {
    e.preventDefault();
    api
      .post("/api/posts/", { content, title })
      .then((res) => {
        if (res.status === 201) alert("Post was created");
        else alert("Failed to create post");
        getPosts();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <div>
        <h2>Blog Posts</h2>
        {posts.map((post) => (
          <Post post={post} onDelete={deletePost} key={post.id} />
        ))}
      </div>
      <h2>Create a Post</h2>
      <form onSubmit={createPost}>
        <label htmlFor="title">Title:</label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <label htmlFor="content">Content:</label>
        <br />
        <textarea
          id="content"
          name="content"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Home;
