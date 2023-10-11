import { Link } from "react-router-dom";

function Button({ to, children, disabled, type, onClick }) {
  const base =
    "inline-block text-sm font-semibold tracking-wide uppercase transition-colors duration-300 bg-yellow-400 rounded-full text-stone-800 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:bg-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed";

  const styles = {
    primary: base + "px-4 py-3 md:px-6 md:py-4",
    small: base + " px-4 py-2 sm:px-5 sm:py-2.5 text-xs",
    secondary:
      "inline-block font-semibold tracking-wide uppercase transition-colors duration-300 rounded-full text-stone-500 hover:bg-stone-300 focus:outline-none focus:ring focus:ring-stone-300 focus:bg-stone-300 focus:ring-offset-2 disabled:cursor-not-allowed border-2 border-stone-300 px-4 py-2 sm:px-5 sm:py-2.5 text-xs",
    round:  base + "px-2.5 py-1 md:px-3.5 md:py-2 text-sm"
  };

  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button onClick={onClick} disabled={disabled} className={styles[type]}>
        {children}
      </button>
    );

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
