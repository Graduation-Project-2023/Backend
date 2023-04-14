import { SheetInstanceController } from "../../../controllers/sheetInstanceController";
import express from "express";


const router = express.Router();

const sheetInstance = new SheetInstanceController();

router.get("/:sheetId/all", sheetInstance.getAll);

router.get("/:id", sheetInstance.get);

router.get("/student/:studentId", sheetInstance.getSheetByUser);

router.post("/", sheetInstance.create);

router.post("/assign", sheetInstance.createMany);

router.put("/:id", sheetInstance.update);

router.delete("/:id", sheetInstance.delete);

export default router;
