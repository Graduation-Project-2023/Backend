import express, { NextFunction, Request, Response } from "express";
import { CourseRepo } from "../../db/courseRepo";
import { CollegeAdminController } from "../controllers/collegeAdminController";

const server = express.Router();
const Course = new CourseRepo();
const controller = new CollegeAdminController(Course);

server.get("/", controller.getAll);

server.get("/:id", controller.get);

server.post("/", controller.create);

server.put("/:id", controller.update);

server.delete("/:id", controller.delete);

export default server;
