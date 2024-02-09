import { Link, useLoaderData } from "react-router-dom";
import { getPosts } from "../api/posts";
import { getUsers } from "../api/users";
import PostComponent from "../components/PostComponent";
import SearchForm from "../components/SearchForm";

function PostList() {
  const { posts, users, query, userId } = useLoaderData();
  return (
    <div className="container">
      <h1 className="page-title">
        Posts - {posts.length}{" "}
        <div className="title-btns">
          <Link className="btn btn-outline" to="new">
            New
          </Link>
        </div>
      </h1>
      <SearchForm
        query={query}
        users={users}
        userId={userId}
        userOptionSearch={true}
      />
      <br />
      <div className="card-grid">
        {<PostComponent posts={posts} userId={userId} users={users} />}
      </div>
    </div>
  );
}

async function loader({ request: { signal, url } }) {
  const searchParams = new URL(url).searchParams;
  const query = searchParams.get("query");
  const userId = searchParams.get("userId");
  const filterParams = { q: query };
  if (userId !== "") filterParams.userId = userId;

  const posts = getPosts({ signal, params: filterParams });
  const users = getUsers({ signal });

  return {
    posts: await posts,
    users: await users,
    query,
    userId,
  };
}

export const PostListRoute = {
  loader,
  element: <PostList />,
};
