import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Profile() {
    const [ username, setUsername ] = useState('');

    useEffect(() => {
        getUser();
    }, []);

    const getUser = () => {
        axios.get("http://localhost:8080/getUser", { withCredentials: true })
        .then((res) => {
            setUsername(res.data.username);
        }).catch((err) => {
            console.log(err);
        });
    };

    return (
        <div className="flex flex-col gap-6 items-center justify-center text-center">
            <h1 className="text-3xl font-bold uppercase">Home</h1>
            { username ? <h1> Logged in {username} </h1> : <h1> Not logged in </h1> }
        </div>
    )
};