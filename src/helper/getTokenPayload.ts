import jwt from "jsonwebtoken";

const getTokenPayload = (payload: string, token: string) => {
  return jwt.verify(
    token,
    process.env.SECRETKEY as string,
    (err: any, decodedToken: any) => {
      return decodedToken[payload];
    }
  );
};

export default getTokenPayload;
