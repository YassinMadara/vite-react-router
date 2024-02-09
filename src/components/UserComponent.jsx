import { Link } from "react-router-dom";

export default function UserComponent({ users }) {
  return users.map((u) => (
    <div key={u.id} className="card">
      <div className="card-header">{u.name}</div>
      <div className="card-body">
        <div>Company's Name: {u.company.name}</div>
        <div>Website: {u.website}</div>
        <div>Email: {u.email}</div>
      </div>
      <div className="card-footer">
        <Link className="btn" to={`${u.id}`}>
          View
        </Link>
      </div>
    </div>
  ));
}
