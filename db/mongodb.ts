
import { MongoClient } from "mongodb";
import mongoose, { type Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;
if (!MONGODB_URI) {
    throw new Error("❌ Missing MONGODB_URI");
}

/* ------------------------------------------------------------------
   Global cache types
-------------------------------------------------------------------*/
declare global {
    var mongooseConn: {
        conn: Mongoose | null;
        promise: Promise<Mongoose> | null;
    };

    var mongoClientPromise: Promise<MongoClient> | null;
}

/* ------------------------------------------------------------------
   MONGOOSE (used by Credentials / app logic)
-------------------------------------------------------------------*/
if (!global.mongooseConn) {
    global.mongooseConn = { conn: null, promise: null };
}

export async function dbConnect(): Promise<Mongoose> {
    if (global.mongooseConn.conn) return global.mongooseConn.conn;

    if (!global.mongooseConn.promise) {
        global.mongooseConn.promise = mongoose.connect(MONGODB_URI, {
            bufferCommands: false,
        });
    }

    global.mongooseConn.conn = await global.mongooseConn.promise;
    return global.mongooseConn.conn;
}


