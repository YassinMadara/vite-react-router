import { useLoaderData } from "react-router-dom";
import { getUsers } from "../api/users";
import SearchForm from "../components/SearchForm";
import UserComponent from "../components/UserComponent";
import { getQuery } from "../router";

function UserList() {
  const { users, query } = useLoaderData();
  return (
    <div className="container">
      <h1 className="page-title">Users - {users.length}</h1>
      {<SearchForm query={query} />}

      <br />
      <div className="card-grid">{<UserComponent users={users} />}</div>
    </div>
  );
}

async function loader({ request: { signal, url } }) {
  const query = getQuery(url, "query");
  return {
    users: await getUsers({ signal, params: { q: query } }),
    query,
  };
}

export const UserListRoute = {
  element: <UserList />,
  loader,
};
