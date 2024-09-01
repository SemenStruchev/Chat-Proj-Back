import express from "express";
import router from "./routes/index.ts";
import helmetConfig from "./config/helmet.ts";
import corsConfig from "./config/cors.ts";
import { PORT } from "./config/default.ts";
import logger from "./config/logger.ts";

const app = express();

app.use(helmetConfig);
app.use(corsConfig);

app.use(express.json());
app.use("/api", router);

app.listen(PORT, () => logger.info(`Server is running on port ${PORT}`));
