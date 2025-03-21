"use client";
import axios from "axios";
// import Link from "next/link";
// import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

export default function ProfilePage() {
    const router = useRouter();

    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            router.push("/login")

        } catch (error) {
            console.log(error)
            // toast.error("")
        }
    }


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1> 
            <br />

            <p>Profile Page</p>

            <hr />
            <button
                onClick={logout} 
                className="bg-blue-500 mt-4 hover: bg-blue-700 text-white font-bold py-2 px-4 rounded">Logout</button>
        </div>
    )
}