import { Link } from "react-router-dom";
import { logout } from "../api/logout";

export default function NavBar() {
    return (
        <div className="flex justify-around bg-zinc-400 h-10 items-center mb-10">
            <Link to="/login" className="uppercase hover:bg-zinc-500">
                <h1> Login </h1>
            </Link>
            <Link to="/register" className="uppercase hover:bg-zinc-500">
                <h1> Register </h1>
            </Link>
            <Link to="/" className="uppercase hover:bg-zinc-500">
                <h1> Profile </h1>
            </Link>
            <button className="uppercase hover:bg-zinc-500" onClick={logout}>
                <h1> Logout </h1>
            </button>
        </div>
    )
};