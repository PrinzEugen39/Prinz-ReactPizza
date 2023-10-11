import { Link, useNavigate } from "react-router-dom";

function LinkButton({ children, to }) {
    const navigate = useNavigate()
    const classname = "text-sm text-blue-500 hover:text-blue-700 hover:underline"
  if (to === "-1")
    return <button className={classname} onClick={() => navigate(-1)}>&larr; Go back</button>;

  return (
    <Link
      to={to}
      className={classname}
    >
      {children}
    </Link>
  );
}

export default LinkButton;
