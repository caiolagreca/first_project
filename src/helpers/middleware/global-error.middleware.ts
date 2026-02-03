import { NextFunction } from "express";
import { ExpressRequest, ExpressResponse } from "../../models";
import { HttpResponse } from "..";

export const globalErrorHandler = (
  err: any,
  req: ExpressRequest,
  res: ExpressResponse,
  next: NextFunction,
) => {
  console.error("Global Error:", err);

  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || "Internal Server Error";

  const errorResponse = {
    error: {
      message,
      statusCode,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    },
  };

  HttpResponse.error(err)(req, res);
};
