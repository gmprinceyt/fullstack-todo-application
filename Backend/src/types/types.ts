import { NextFunction, Request, Response } from "express";

// Async Handler Function 

//   Params = Record<string, unknown>,
//   ResBody = unknown,
//   ReqBody = unknown,
//   ReqQuery = Record<string, unknown>
export type ControllerFunction = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<void | Response<any, Record<string, any>> | undefined>