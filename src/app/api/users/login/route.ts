import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
// import { error } from "console";
// import { trackSynchronousPlatformIOAccessInDev } from "next/dist/server/app-render/dynamic-rendering";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;
        console.log("Route se:", reqBody);

        const user = await User.findOne({email})
        if (!user) {
            return NextResponse.json({error: 'User doesnot exsist'}, {status: 400});

        } 

        // check if password is correct
        const valiedPassword = await bcryptjs.compare(password, user.password);
        if (!valiedPassword) {
            return NextResponse.json({error: 'Invalid password'}, {status: 400});
        }
        
        // create token data
        const tokenData = {
            id: user._id,
            email: user.email
        }

        // create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: '1d'});

        const response = NextResponse.json({
            message: 'Login successfully',
            success: true,
        });

        response.cookies.set('token', token, {
            httpOnly: true,
        });

        return response;
        

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}