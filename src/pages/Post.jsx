import { Link, useLoaderData } from "react-router-dom";
import { getPost } from "../api/posts";
import { getUser } from "../api/users";

function Post() {
  const { post, user } = useLoaderData();
  return (
    <div className="container">
      <h1 className="page-title">
        {post.title}
        <div className="title-btns">
          <Link className="btn btn-outline" to="Edit">
            Edit
          </Link>
        </div>
      </h1>

      <span className="page-subtitle">
        By: <Link to={`/users/${user.id}`}>{user.name}</Link>
      </span>
      <div>{post.body}</div>
      <br />
      <div className="right">
        <Link className="btn btn-outline" to="..">
          Back
        </Link>
      </div>
    </div>
  );
}

async function loader({ params, request: { signal } }) {
  const post = await getPost(params.postId, { signal });
  const user = getUser(post.userId, { signal });

  return {
    post,
    user: await user,
  };
}

export const PostRoute = {
  loader,
  element: <Post />,
};
