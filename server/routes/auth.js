import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { auth } from "express-oauth2-jwt-bearer";

const authRouter = express.Router();

// JWT validation middleware
const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_DOMAIN,
  tokenSigningAlg: "RS256"
});

// Protected route that requires a valid JWT
authRouter.get("/", jwtCheck, (req, res) => {
  res.json({
    message: "You are authenticated via the backend!",
    user: req.auth
  });
});

export default authRouter;