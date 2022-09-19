import express, { Router } from "express";
import server from "./api/auth";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("api main route working!");
})

router.use("/auth", server);

export default router;