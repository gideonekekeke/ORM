import { ErrorBuilder } from "./ErrorBuilder";
import { Request, Response } from "express"
import { ErrorDefiner } from "./ErrorDefiner";

export const errorHandler = (
	err: ErrorDefiner,
	req: Request,
	res: Response,
) => {
	ErrorBuilder(err, res);
};
