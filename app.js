import express from "express";
import AppRouter from "./src/app.router.js";
import AppMiddleware from "./src/app.middleware.js";
import AppConfig from "./src/app.config.js";

const app = express();

app.use(AppConfig);
app.use(AppMiddleware);
app.use(AppRouter);

app.get("/", (req, res) => {
  res.send("Makhrit is ready to serve you..");
});

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Makhrit [http] is running on port [${PORT}]`);
});

export default app;
