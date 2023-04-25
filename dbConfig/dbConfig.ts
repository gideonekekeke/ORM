import { DataSource } from "typeorm";
import { BookEntity } from "../Models/BookShop";
import { UserEntites } from "../Models/UserModel";
import { profileEntity } from "../Models/userProfile";
import dotenv from "dotenv";

dotenv.config();

// posgresql localhost
// export const dbConfig = new DataSource({
// type: "postgres",
// host: "localhost",
// port: parseInt(process.env.POSTGRES_PORT),
// username: process.env.POSTGRES_USERNAME,
// password: process.env.POSTGRES_PASSWORD,
// database: process.env.POSTGRES_DATABASE,
// synchronize: true,
// logging: false,
// entities: [UserEntites, profileEntity, BookEntity],
// });

export const dbConfig = new DataSource({
	name: "default",
	type: "postgres",
	url: process.env.URL,
	synchronize: false,
	logging: false,
	entities: [UserEntites, BookEntity, profileEntity],
});
