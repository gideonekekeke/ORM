import express from "express";
import { dbConfig } from "./dbConfig/dbConfig";
const port = 8980;
import { MiddleWares } from "./Middlewares";
// import userRoutes from "./Routes/UserRoutes";
const app = express();

MiddleWares(app);
// app.use("/user", userRoutes);

// app.get("/", (req, res) => {
// res.send("api is ready for consumption");
// });
//

dbConfig
	.initialize()
	.then(async () => {
		console.log("postgres database connected");
	})
	.catch((err) => {
		console.log(err);
	});

const server = app.listen(port, () => {
	console.log("server listening on port");
});

process.on("uncaughtException", () => {
	console.log("server uncaught exception");
	process.exit(1);
});

process.on("unhandledRejection", (res: any) => {
	console.log(res);
	server.close(() => {
		process.exit(1);
	});
});
