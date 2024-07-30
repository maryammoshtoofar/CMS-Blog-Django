import { Link } from "react-router-dom";
import "../styles/post.css";
function Post({ post, onDelete }) {
  const formattedDate = new Date(post.created_at).toLocaleDateString("en-US");
  return (
    <div className="post-container">
      <Link to={`/posts/${post.id}`}>
        <p className="post-title">{post.title}</p>
      </Link>

      <p className="post-content">{post.content}</p>
      <p className="post-date">{formattedDate}</p>
      <p>Author:{post.author.username}</p>
      <button className="delete-button" onClick={() => onDelete(post.id)}>
        Delete
      </button>
    </div>
  );
}

export default Post;
