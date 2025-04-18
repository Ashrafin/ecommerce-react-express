import express from "express";

const rootRouter = express.Router();

rootRouter.get("/", (req, res) => {
  res.json({
    message: "Welcome to the e-commerce API!"
  });
});

export default rootRouter;