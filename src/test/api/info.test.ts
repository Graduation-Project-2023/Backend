// import supertest from "supertest";
// import server from "../../server";
// import { expect } from "chai";

// let  studentId: any;

// describe("test the student info route", () => {

    // login as student
    // it("cc", async () => {
        // // const logout = await supertest(server).post(`${url}/auth/logout`).send({});
        // // console.log(logout.status);
        // const response = await supertest(server).post(`${url}/auth/student_login`).send({
        //     email: "SalemElstudent@student.com",
        //     password: "123456"
        // });
        // studentId = response.body.id;
        // console.log(response.body);
        // expect(response.status).to.equal(200);
        // expect(response.body).to.have.property("id");
        // expect(response.body).to.have.property("role");
        // expect(response.body.role).to.equal("STUDENT");
        // studentId = response.body.id;
        // console.log("studentId", studentId);
    // });
    

    // it("returns error if student id is missing", async () => {
    //     const response = await supertest(server).post(`${url}/student/info`).send({
    //         id: ""
    //     });
    //     // console.log(response);
    //     expect(response.status).to.equal(400);
    //     expect(response.body.message).to.equal("Student Id is required");
    // });

    // it("returns error if student id is not found", async () => {
    //     const response = await supertest(server).post(`${url}/student/info`).send({
    //         id: "123456789"
    //     });
    //     console.log(response.body);
    //     expect(response.status).to.equal(400);
    //     expect(response.body.message).to.equal("student not found");
    // });

    // it("returns student info", async () => {
        
    //     const r = await supertest(server).post(`${url}/auth/student_login`).send({
    //         email: "SalemElstudent@student.com",
    //         password: "123456"
    //     });
    //     console.log(r.body);
    //     const response = await supertest(server).post(`${url}/student/info`).send({
    //         id: studentId
    //     });
    //     console.log(response.body);
    //     console.log("xxxxx", studentId);
    //     expect(response.status).to.equal(200);
        // expect(response.body).to.have.property("id");
        // expect(response.body).to.have.property("name");
        // expect(response.body).to.have.property("email");
        // expect(response.body).to.have.property("nationalId");
        // expect(response.body).to.have.property("collegeId");
        // expect(response.body).to.have.property("collegeName");
        // expect(response.body).to.have.property("departmentId");
        // expect(response.body).to.have.property("departmentName");
        // expect(response.body).to.have.property("majorId");
        // expect(response.body).to.have.property("majorName");
        // expect(response.body).to.have.property("year");
        // expect(response.body).to.have.property("semester");
        // expect(response.body).to.have.property("gpa");
//     });

// });
