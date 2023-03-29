import { Response } from "express";
import { HTTPCode } from "../Definers/HTTP";
import { ErrorDefiner } from "./ErrorDefiner";

export const ErrorBuilder = (err: ErrorDefiner, res: Response) => {
	res.status(HTTPCode.INTERNAL_SERVER_ERROR).json({
		name: err.name,
		message: err.message,
		status: err.status,
		stack: err.stack,
		error: err,
	});
};
