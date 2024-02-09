import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  return (
    <>
      <h2>
        Error - Something went wrong - Go {}
        <Link className="btn" to={".."} relative="route">
          Home
        </Link>
      </h2>
      {/* {import.meta.env.MODE === "development" ? ( */}
      <>
        <pre>{error.message}</pre>
        <pre>{error.stack}</pre>
      </>
      {/* ) : undefined} */}
    </>
  );
}
