import { NextFunction, Request, Response } from "express";

export const asyncHandler = (fx: any) => {
	return (req: Request, res: Response, next: NextFunction) => {
		return Promise.resolve(fx(req, res, next)).catch(next);
	};
};
