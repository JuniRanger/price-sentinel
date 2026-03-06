import "dotenv/config";
import app from "./app";
import { initDB } from "./config/db";
import { startPriceMonitorJob } from "./jobs/price-monitor.job";

const PORT = 3000;

const startServer = async () => {
  try {
    await initDB();
    console.log("Database initialized");

    startPriceMonitorJob();
    console.log("Price monitor cron job started");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
};

startServer();