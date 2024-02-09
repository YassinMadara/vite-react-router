import { Link, useLoaderData } from "react-router-dom";
import { getUser } from "../api/users";
import { getTodos } from "../api/todos";
import TodoComponent from "../components/TodoComponent";
import PostComponent from "../components/PostComponent";
import { getPosts } from "../api/posts";

function User() {
  const { user, todos, posts } = useLoaderData();
  console.log("user: ", user);
  console.log("todos: ", todos);
  console.log("posts: ", posts);
  return (
    <div className="container">
      <h1 className="page-title">{user.name}</h1>
      <div className="page-subtitle">{user.email}</div>
      <div>
        <b>Company:</b> {user.company.name}
      </div>
      <div>
        <b>Website:</b> {user.website}
      </div>
      <div>
        <b>Address:</b>{" "}
        {`${user.address.street} ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}
      </div>
      <br />
      <div className="right">
        <Link className="btn btn-outline" to="..">
          Back
        </Link>
      </div>
      <br />
      <div className="card-grid">{<PostComponent posts={posts} />}</div>
      {<TodoComponent todos={todos} />}
    </div>
  );
}

async function loader({ params, request: { signal } }) {
  const posts = getPosts({ signal, params: { userId: params.userId } });
  const todos = getTodos({ signal, params: { userId: params.userId } });
  const user = getUser(params.userId, signal);
  return {
    posts: await posts,
    todos: await todos,
    user: await user,
  };
}

export const UserRoute = {
  element: <User />,
  loader,
};
