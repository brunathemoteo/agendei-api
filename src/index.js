import express, { json } from "express";
import cors from "cors";
import router from "./routes.js";

const app = express();

app.use(cors());
app.use(router);
app.use(express.json());

app.listen(3001, () => {
	console.log("servidor is running");
});
