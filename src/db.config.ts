import mongoose from "mongoose"

const createConnection = () => {
    return mongoose.connect(process.env.DB_CONN_STRING as string);
}

export default createConnection;