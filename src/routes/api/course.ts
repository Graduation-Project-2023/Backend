import express from "express";
import { Controller } from "../../controllers/controller";
import prisma from "../../db";

const server = express.Router();
const controller = new Controller(prisma.course);

server.get("/", controller.getAll);

server.get("/:id", controller.get);

server.post("/", controller.create);

server.put("/:id", controller.update);

server.delete("/:id", controller.delete);

export default server;
