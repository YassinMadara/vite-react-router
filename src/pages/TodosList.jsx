import { useLoaderData } from "react-router-dom";
import { getTodos } from "../api/todos";
import SearchForm from "../components/SearchForm";
import TodoComponent from "../components/TodoComponent";
import { getQuery } from "../router";

export default function TodosList() {
  const { todos, query } = useLoaderData();
  return (
    <div className="container">
      <h1 className="page-title">Todos - {todos.length}</h1>
      <SearchForm query={query} />
      <ul>{<TodoComponent todos={todos} />}</ul>
    </div>
  );
}

async function loader({ request: { signal, url } }) {
  const query = getQuery(url, "query");
  const filteredParams = { q: query };
  return {
    todos: await getTodos({ signal, params: filteredParams }),
    query,
  };
}

export const TodoListRoute = {
  element: <TodosList />,
  loader,
};
