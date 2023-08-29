import { useState } from "react"
import axios from "axios";
import { Link } from "react-router-dom";

export default function Register() {

    const [registerUsername, setRegisterUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');

    const handleUsernameChange = (e) => {
        setRegisterUsername(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setRegisterPassword(e.target.value);
    }

    const register = () => {
        axios.post("http://localhost:8080/register", {
            username: registerUsername,
            password: registerPassword
        }, { withCredentials: true })
        .then((res) => console.log(res)).catch((err) => console.log(err));
    };

    return (
        <div className="flex flex-col gap-6 items-center justify-center text-center">
            <h1 className="text-3xl font-bold uppercase">Register</h1>
            <input type="text" placeholder="Username" name="username" onChange={ handleUsernameChange } className="border-2 border-yellow-400 rounded-lg p-2.5 text-center"/>
            <input type="password" placeholder="password" name="password" onChange={ handlePasswordChange } className="border-2 border-yellow-400 rounded-lg p-2.5 text-center"/>
            <button 
                className="bg-yellow-300 py-2 rounded-full hover:bg-orange-400 transition-all ease-in-out w-32"
                onClick={ register }
            >
                Register
            </button>
            <Link to ="/login" className='bg-green-300 w-32 py-3 rounded-full hover:bg-green-400 transition-all ease-in-out'>
                Login
            </Link>
        </div>
    )
};