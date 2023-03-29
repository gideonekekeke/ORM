import { DataSource } from "typeorm";
import { UserEntites } from "../Models/UserModel";
import { profileEntity } from "../Models/userProfile";

export const dbConfig = new DataSource({
	type: "postgres",
	host: "localhost",
	port: 1378,
	username: "postgres",
	password: "Onyedikachi141",
	database: "postgres",
	synchronize: true,
	logging: false,
	entities: [UserEntites, profileEntity],
});
