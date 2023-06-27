export interface HttpStatusModel {
  [key: string]: {
    code: number;
    message: string;
  };
}

const HttpStatus: HttpStatusModel = {
  OK: {
    code: 200,
    message: "Action Performed Successfully",
  },
  NOT_FOUND: {
    code: 404,
    message: "Not Found",
  },
  DELETED: {
    code: 204,
    message: "Deleted Successfully",
  },
  CREATED: {
    code: 201,
    message: "Created Successfully",
  },
  UPDATED: {
    code: 201,
    message: "Updated Successfully",
  },
  UNAUTHORIZED: {
    code: 401,
    message: "Unauthorized",
  },
  FORBIDDEN: {
    code: 403,
    message: "Forbidden",
  },
  BAD_REQUEST: {
    code: 400,
    message: "Bad Request",
  },
  ROUTE_NOT_FOUND: {
    code: 404,
    message: "Route Not Found",
  },
  INTERNAL_SERVER_ERROR: {
    code: 500,
    message: "Internal Server Error",
  },
};

export default HttpStatus;
