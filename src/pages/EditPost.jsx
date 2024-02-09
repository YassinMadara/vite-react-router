import {
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import { getPost, updatePost } from "../api/posts";
import { getUsers } from "../api/users";
import PostForm, { postFormValidator } from "../components/PostForm";

function EditPost() {
  const { users, post, signal } = useLoaderData();
  const errors = useActionData();
  const { state } = useNavigation();
  const isSubmitting = state === "submitting";
  return (
    <div className="container">
      <h1 className="page-title">Edit Post</h1>
      {
        <PostForm
          users={users}
          post={post}
          signal={signal}
          errors={errors}
          isSubmitting={isSubmitting}
          editForm={true}
        />
      }
    </div>
  );
}
async function loader({ params: { postId }, request: { signal } }) {
  return {
    users: await getUsers({ signal }),
    post: await getPost(postId, { signal }),
    signal,
  };
}

async function action({ params: { postId }, request }) {
  const formData = await request.formData();
  const title = formData.get("title");
  const userId = formData.get("userId");
  const body = formData.get("body");

  const errors = postFormValidator({ title, userId, body });
  if (Object.keys(errors).length > 0) {
    return errors;
  }

  const post = await updatePost(
    postId,
    { title, userId, body },
    { signal: request.signal }
  );

  return redirect(`/posts/${post.id}`);
  // return redirect(`/`);
}

export const EditPostRoute = {
  element: <EditPost />,
  loader,
  action,
};
