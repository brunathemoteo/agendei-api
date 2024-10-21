import express, { json } from "express";
import cors from "cors";
import router from "./routes.js";
import "dotenv/config";

const app = express();

app.use(cors());
app.use(router);
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log(`servidor is running on port ${PORT}`);
});
