import { NextFunction, Request, Response } from "express"
import { ControllerFunction } from "../types/types.js";

export const TryCatch =  (fn:ControllerFunction) => {
    return async function (req:Request,res:Response, next:NextFunction){
        try {
           await  fn(req,res, next)
        } catch (error) {
            next(error)
        }
    }
};
