import { app } from "./app";
import { config } from "./config";
import connectDB from "./config/database";
import menuRoutes from "./routes/pos.routes";

(async () => {
    try {
        await connectDB();

        app.use("/api/v1", menuRoutes);

        app.listen(config.PORT, () => {
            console.log(`Server started at http://localhost:${config.PORT}`);
            
        });
    } catch (error) {
        console.error(error);
    }
})();