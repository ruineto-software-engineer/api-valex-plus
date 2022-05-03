import express, { json } from "express";
import "express-async-errors";
import cors from "cors";
import cardRouter from "./routes/cardRouter.js";
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";

const app = express();

app.use(json());
app.use(cors());
app.use(cardRouter);
app.use(errorHandlerMiddleware);

export default app;
