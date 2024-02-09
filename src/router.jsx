import { createBrowserRouter, Navigate } from "react-router-dom";
import ParentLayout from "./layouts/ParentLayout";
import { PostListRoute } from "./pages/PostList";
import { UserListRoute } from "./pages/UserList";
import { TodoListRoute } from "./pages/TodosList";

import { PostRoute } from "./pages/Post";
import { UserRoute } from "./pages/User";

import UnvalidURLPage from "./pages/UnvalidURLPage";
import ErrorPage from "./pages/ErrorPage";
import "./styles.css";
import { NewPostRoute } from "./pages/NewPost";
import { EditPostRoute } from "./pages/EditPost";

export function getQuery(url, paramName) {
  const searchParams = new URL(url).searchParams;
  const query = searchParams.get(paramName);
  return query;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ParentLayout />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Navigate to="posts" /> },
          { path: "*", element: <UnvalidURLPage /> },
          {
            path: "posts",
            children: [
              {
                index: true,
                ...PostListRoute,
              },
              {
                path: ":postId",
                children: [
                  {
                    index: true,
                    ...PostRoute,
                  },
                  { path: "edit", ...EditPostRoute },
                ],
              },
              {
                path: "new",
                ...NewPostRoute,
              },
            ],
          },
          {
            path: "users",
            children: [
              {
                index: true,
                ...UserListRoute,
              },
              {
                path: ":userId",
                ...UserRoute,
              },
            ],
          },
          {
            path: "todos",
            ...TodoListRoute,
          },
        ],
      },
    ],
  },
]);
