"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { set } from "mongoose";
import toast from "react-hot-toast";
import { error } from "console";


export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: ""
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);


    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log(`This is my user: ${user.email}, ${user.password}, ${user.username}`);

            router.push("/login");
        } catch(error: any) {
            toast.error(error.message);

        } finally { 
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);    
        }
    }, [user]);


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Procressing" : "Signup"}</h1>
            <br/>

            <label htmlFor="username">username</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4"
                id="username"
                type="text"
                value={user.username}
                onChange={(e) => setUser({...user, username:e.target.value})}
                placeholder="username"
            />
            <label htmlFor="email">email</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4"
                id="email"
                type="text"
                value={user.email}
                onChange={(e) => setUser({...user, email:e.target.value})}
                placeholder="email"
            />
            
            <label htmlFor="password">password</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({...user, password:e.target.value})}
                placeholder="password"
            />

            <button onClick={onSignup}
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none"
            >{buttonDisabled ? "No signup": "Signup"}</button>

            <Link href="/login">Visit Login Page</Link>

        </div>
    )
}