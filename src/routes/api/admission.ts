import { admissionController } from "../../controllers/admissionController";
import { uploadSingle, validateCsv, csvToJson } from "../../middleware/csv";
import express from "express";

const router = express.Router();
const ac = new admissionController();

router.get("/all/:collegeId", ac.getAll);

router.get("/:id", ac.get);

router.post("/", ac.create);

router.post("/bulk", uploadSingle, validateCsv, csvToJson, ac.bulk);

router.put("/:id", ac.update);

router.delete("/:id", ac.delete);

export default router;
