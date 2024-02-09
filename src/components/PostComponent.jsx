import { Link } from "react-router-dom";

export default function PostComponent({ posts }) {
  return posts.map((p) => (
    <div key={p.id} className="card">
      <div className="card-header">{p.title}</div>
      <div className="card-body">
        <div className="card-preview-text">{p.body} </div>
      </div>
      <div className="card-footer">
        <Link className="btn" to={`/posts/${p.id}`}>
          View
        </Link>
      </div>
    </div>
  ));
}
