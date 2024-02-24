import "express-async-errors";
import cors from "cors";
import { router } from "./routes";
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";

const app = express();
const port = 7777;
app.use(express.json());
app.use(cors());
app.use("v1", router);
app.use("api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/files", express.static(path.resolve(__dirname, "..", "tmp")));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({
        status: "error",
        message: "Internal server error",
    });
});

app.get("/terms", (req: Request, res: Response) => {
    return res.json({
        message: "Termos de Uso",
    });
});

app.listen(port, () => {
    console.log("Servidor online!");
});
