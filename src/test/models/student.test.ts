import prisma from "../../db";
import { expect } from "chai";

describe("Student Model", () => {
    it("should get all students", async () => {
        const students = await prisma.student.findMany();
        expect(students).to.be.an("array");
    });

    it("should get a student", async () => {



    });

    it("should create a student", async () => {


    });

    it("should create many students", async () => {

    });

    it("should update a student", async () => {
            
        });

    it("should delete a student", async () => {

    })
});



