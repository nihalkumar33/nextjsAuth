"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";


export default function SignupPage() {
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })

    const onLogin = async () => {

    }


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Login</h1>
            <br/>

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

            <button onClick={onLogin}
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none"
            >Login Here</button>

            <Link href="/signup">Visit Signup Here</Link>

        </div>
    )
}