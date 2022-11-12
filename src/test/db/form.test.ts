import { FormRepo } from "../../db/formRepo";
import { expect } from "chai";

describe("FormRepo crud", () => {
  let formRepo: FormRepo;
  let form: any;
  // should delete all forms after all tests are done
  after(async () => {
    await formRepo.deleteMany();
  });
  it("should be defined", () => {
    formRepo = new FormRepo();
    expect(formRepo).to.be.ok;
  });

  it("should create a form", async () => {
    form = await formRepo.create({
      arabicName: "حمود الحمود",
      englishName: "Hammoud Hammoud",
      nationality: "Saudi",
      gender: "MALE",
      religion: "MUSLIM",
      nationalId: "123456789",
      birthDate: new Date("1990-01-01"),
      birthPlace: "Riyadh",
      guardianName: "حمود الحمود",
      address: "Riyadh",
      contactEmail: "HamoodHabiby@gmail.com",
      contactPhone: "123456789",
      city: "Riyadh",
    });
    expect(form).to.be.ok;
    expect(form.id).to.be.ok;
    expect(form.arabicName).to.equal("حمود الحمود");
  });

  it("should read a form", async () => {
    const newForm = await formRepo.read({ id: form.id });
    expect(newForm).to.be.ok;
    expect(newForm.id).to.equal(form.id);
    expect(newForm.fullname).to.equal(form.fullname);
  });

  it("should read many forms", async () => {
    const forms = await formRepo.readMany();
    expect(forms).to.be.ok;
    expect(forms.length).to.be.greaterThan(0);
  });
});
