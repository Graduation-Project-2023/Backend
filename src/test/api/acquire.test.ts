import supertest from "supertest";
import server from "../../server";
import { expect } from "chai";

describe("test acquire credentials route", () => {

    it("returns reset token and email", async () => {
        const response = await supertest(server).post(`${url}/acquire_credentials`).send({
            nationalId: "12985278821235"
        });
        expect(response.status).to.equal(200);

        expect(response.body).to.have.property("email");
        expect(response.body.email).to.equal("Hamood@eng.suez.edu.eg");

        expect(response.body).to.have.property("nationalId");
        expect(response.body.nationalId).to.equal("12985278821235");

        expect(response.body).to.have.property("token");

    });

    it("returns error if nationalId is not provided", async () => {
        const response = await supertest(server).post(`${url}/acquire_credentials`).send({
            nationalId: ""
        });
        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal("National Id is required");
    });

    it("returns error if nationalId is not found", async () => {
        const response = await supertest(server).post(`${url}/acquire_credentials`).send({
            nationalId: "123456789"
        });
        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal("user not found");
    });

    // uncomment this when code goes into production

    // it("returns error if token was obtained before", async () => {
    //     const response = await supertest(server).post(`${url}/acquire_credentials`).send({
    //         nationalId: "12985278821235"
    //     });
    //     expect(response.status).to.equal(400);
    //     expect(response.body.message).to.equal("You have already obtained your credentials");
    // });
});
