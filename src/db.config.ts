import mongoose from "mongoose";

const createConnection = () => {
  const dbUrl: string = (
    process.env.NODE_ENV == "development"
      ? process.env.DB_CONN_STRING_LOCAL
      : process.env.DB_CONN_STRING_PROD
  ) as string;

  return mongoose.connect(dbUrl);
};

export default createConnection;
