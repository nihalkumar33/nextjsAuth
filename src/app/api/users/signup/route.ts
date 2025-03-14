import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { error } from "console";
import { trackSynchronousPlatformIOAccessInDev } from "next/dist/server/app-render/dynamic-rendering";

connect();
// DB connection ke liye call kiya hai

// yha request woh hai jo main DB pr put krna chata hu
export async function POST(request: NextRequest) {
    // This request is used to send data to server or say DB
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody

        console.log(reqBody)

        const user = await User.findOne({email})

        if (user) {
            return NextResponse.json({error: "User already exsists"}, {status: 400})
        }

        // hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        // create user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser);

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
            
        })

    } catch(error: any) {
        return NextResponse.json({error: error.message}),
        {status: 500}
    }
}