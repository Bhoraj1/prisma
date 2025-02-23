import "dotenv/config";
import express from "express";
import routes from "./routes/index.js";
import prisma from "./DB/db.config.js";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  return res.send("Hi everyone");
});
app.use(routes);

const startServer = async () => {
  try {
    await prisma.$connect();
    console.log("Database connected successfully!");

    app.listen(PORT, () => {
      console.log(`Server is running on PORT ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1); 
  }
};

startServer();
