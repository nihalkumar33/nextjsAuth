"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";


export default function SignupPage() {
    const router = useRouter(); 
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(true);
    const [loading, setLoading] = React.useState(false);


    const onLogin = async () => {
        try {
            setLoading(true);
            console.log(user);
            const response = await axios.post("/api/users/login", user);
            console.log(`This is my user: ${response.data}`);

            router.push("/profile");

        } catch (error: any) {
            console.log("Login fail ho gaya: ", error.message);
            toast.error(error.message);

        } finally {
            setLoading(false);  
        }
    }

    useEffect(() => {  
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {    
            setButtonDisabled(true);
        }
    }, [user]);


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Processing" : "Login"}</h1>
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