import express from "express";
import createError from "http-errors";
import cors from "cors";

import rootRouter from "./routes/index.js";
import authRouter from "./routes/auth.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Routes
app.use("/", rootRouter);
app.use("/protected", authRouter);

// Error Handling
app.use((req, res, next) => next(createError(404)));
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: "Invalid token" });
  } else {
    next(err);
  }
});

export default app;