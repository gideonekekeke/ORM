import { Request, Response } from "express";
import { UserEntites } from "../Models/UserModel";
import { HTTPCode } from "../utils/Definers/HTTP";
import { ErrorDefiner } from "../utils/Handlers/ErrorDefiner";
import { errorHandler } from "../utils/Handlers/ErrorHandler";
import uuid from "uuid";
import { profileEntity } from "../Models/userProfile";
import { BookEntity } from "../Models/BookShop";
export const GetAll = async (req: Request, res: Response) => {
	try {
		const users = await UserEntites.find();
		return res.status(HTTPCode.OK).json({
			message: "successfull",
			data: users,
		});
	} catch (err: any) {
		new ErrorDefiner({
			message: "cannot get all users",
			status: HTTPCode.BAD_REQUEST,
			name: "getting all user",
			isSuccess: false,
		});
	}
};

export const createUser = async (req: Request, res: Response) => {
	try {
		const { userName, email } = req.body;

		const creating = await UserEntites.create({
			userName,
			email,
		}).save();

		return res.status(HTTPCode.OK).json({
			message: "successfully created",
			data: creating,
		});
	} catch (err: any) {
		new ErrorDefiner({
			message: "cannot create user",
			status: HTTPCode.BAD_REQUEST,
			name: "creating user",
			isSuccess: false,
		});
	}
};

export const createUserProfile = async (req: Request, res: Response) => {
	try {
		const { country, phoneNumber, gender } = req.body;
		const userId = req.params.id;

		const options = {
			where: {
				id: userId,
			},
			relations: ["profile"],
		};

		const user = await UserEntites.findOne(options);

		const profile = new profileEntity();
		profile.gender = gender;
		profile.country = country;
		profile.phoneNumber = phoneNumber;

		// profile.user = user.UserEntites.email;
		user.profile = profile;

		//
		await profile.save();
		user.save();

		return res.send({
			message: "success",
			data: profile,
		});
	} catch (err: any) {
		new ErrorDefiner({
			message: "cannot create Profile",
			status: HTTPCode.BAD_REQUEST,
			name: "profile Creating",
			isSuccess: false,
		});
	}
};

export const getOneUser = async (req: Request, res: Response) => {
	try {
		const userId = req.params.id;

		const options = {
			where: {
				id: userId,
			},
			relations: ["profile"],
		};

		const user = await UserEntites.findOne(options);

		return res.send({
			message: "success",
			data: user,
		});
	} catch (err: any) {
		new ErrorDefiner({
			message: "cannot create Profile",
			status: HTTPCode.BAD_REQUEST,
			name: "profile Creating",
			isSuccess: false,
		});
	}
};

export const UpdateUser = async (req: Request, res: Response) => {
	try {
		const userId = req.params.id;
		const { email } = req.body;

		const user = await UserEntites.update(userId, {
			email: email,
		});

		return res.send({
			message: "success",
			data: user,
		});
	} catch (err: any) {
		new ErrorDefiner({
			message: "cannot create Profile",
			status: HTTPCode.BAD_REQUEST,
			name: "profile Creating",
			isSuccess: false,
		});
	}
};
//
// export const DeleteUser = async (req: Request, res: Response) => {
// try {
// const userId = req.params.id;
// const options = {
// where: {
// id: userId,
// },``
// };
//
// const user = await UserEntites.delete(userId);
//
// return res.send({
// message: "success",
// data: user,
// });
// } catch (err: any) {
// new ErrorDefiner({
// message: "cannot create Profile",
// status: HTTPCode.BAD_REQUEST,
// name: "profile Creating",
// isSuccess: false,
// });
// }
// };

export const DeleteUserProfile = async (req: Request, res: Response) => {
	try {
		const userId = req.params.id;
		const profileId = req.params.profileId;

		const options = {
			where: {
				id: userId,
			},
			relations: ["profile"],
		};

		const user = await UserEntites.findOne(options);

		if (user?.profile) {
			user.profile = null;
			await user.save();
			await profileEntity.delete(profileId);
			return res.send({
				message: "success",
				data: user,
			});
		} else {
			return res.send({
				message: "user with profile doesn't exists",
			});
		}
	} catch (err: any) {
		new ErrorDefiner({
			message: "cannot create Profile",
			status: HTTPCode.BAD_REQUEST,
			name: "profile Creating",
			isSuccess: false,
		});
	}
};

// creating a book and map it to a user

export const CreateBook = async (req: Request, res: Response) => {
	try {
		const userId = req.params.id;
		const { title, description } = req.body;

		const options = {
			where: {
				id: userId,
			},
			relations: ["books"],
		};

		const user = await UserEntites.findOne(options);
		console.log(user);

		const creating = BookEntity.create({
			title,
			description,
			author: user,
		});

		await creating.save();
		user.books.push(creating);
		await user.save();

		res.status(HTTPCode.OK).json({
			message: "Book uploaded successfull",
			data: creating,
		});
	} catch (err: any) {
		new ErrorDefiner({
			message: "cannot create Profile",
			status: HTTPCode.BAD_REQUEST,
			name: "profile Creating",
			isSuccess: false,
		});
	}
};
