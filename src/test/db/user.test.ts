import { UserRepo } from "../../db/userRepo";
import { expect } from "chai";

describe("userRepo crud", () => {
  let userRepo: UserRepo;
  let user: any;
  // should delete all forms after all tests are done
  after(async () => {
    await userRepo.deleteMany();
  });
  it("should be defined", () => {
    userRepo = new UserRepo();
    expect(userRepo).to.be.ok;
  });

  it("should create a user", async () => {
    user = await userRepo.create({
      email: "HamoodAdmin@eng.suez.edu.eg",
      password: "123456789",
      role: "ADMIN",
    });
    expect(user).to.be.ok;
    expect(user.id).to.be.ok;
    expect(user.email).to.equal("HamoodAdmin@eng.suez.edu.eg");
  });

  it("should read a user", async () => {
    const newUser = await userRepo.read({ id: user.id });
    expect(newUser).to.be.ok;
    expect(newUser.id).to.equal(user.id);
    expect(newUser.fullname).to.equal(user.fullname);
  });

  it("should read many users", async () => {
    const users = await userRepo.readMany();
    expect(users).to.be.ok;
    expect(users.length).to.be.greaterThan(0);
  });
});
