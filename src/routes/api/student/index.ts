import express from "express";
import info from "./info";

/**
 * 
 * Student router, handles all student related routes
 * and imports them to the main router to be used and protected
 * by the passport middleware
 *
 */

const router = express.Router();

router.use("/info", info);

export default router;
