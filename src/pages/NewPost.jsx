import {
  Navigate,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import { createPost } from "../api/posts";
import { getUsers } from "../api/users";
import PostForm, { postFormValidator } from "../components/PostForm";

function NewPost() {
  const users = useLoaderData();
  const errors = useActionData();
  const { state } = useNavigation();
  const isSubmitting = state === "submitting";

  return (
    <div className="container">
      <h1 className="page-title">New Post</h1>
      {<PostForm users={users} errors={errors} isSubmitting={isSubmitting} />}
    </div>
  );
}

function loader({ request: { signal } }) {
  return getUsers({ signal });
}

async function action({ request }) {
  const formData = await request.formData();
  const title = formData.get("title");
  const userId = formData.get("userId");
  const body = formData.get("body");

  const errors = postFormValidator({ title, userId, body });
  if (Object.keys(errors).length > 0) {
    return errors;
  }

  const post = await createPost(
    { title, body, userId },
    { signal: request.signal }
  );
  return redirect(`/posts/${post.id}`);
  // return redirect(`/`);
  // return <Navigate to={`/posts/${post.id}`} replace={true} />;
}

export const NewPostRoute = {
  element: <NewPost />,
  loader,
  action,
};
