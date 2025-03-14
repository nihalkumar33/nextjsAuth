import mongoose from "mongoose";

export async function connect() {
    try {
        // ! because I know that this url will always be present
        mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("MongoDB is connected successfully");
        })

    } catch (error) {
        console.log('Something goes wrong!')
    }
}