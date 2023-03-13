import express from "express";
import user from "./users";
import college from "./college";

const router = express.Router();

router.use("/users", user);
router.use("/college", college);

export default router;