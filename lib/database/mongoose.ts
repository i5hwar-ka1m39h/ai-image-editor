import mongoose, {Mongoose} from "mongoose";


const MONGODB_URL = process.env.MONGODB_URL

interface MongooseConnection {
    connect: Mongoose | null;
    promise : Promise<Mongoose> | null
}

let cached: MongooseConnection = (global as any).mongoose

if(!cached){
    cached = (global as any).mongoose = {connect: null, promise: null}
}

export const connectDB = async()=>{
    if(cached.connect) return cached.connect

    if(!MONGODB_URL) throw new Error('missing mongoDB url')

    cached.promise = cached.promise || mongoose.connect(MONGODB_URL, {dbName: 'ai_editor', bufferCommands:false})

    cached.connect = await cached.promise

    return cached.connect
}