import supertest from 'supertest';
import app from '../../server';
import { UserRepo } from '../../db/userRepo';

describe('testing auth routes ', () => {
    let userRepo: UserRepo;
    let user: UserRepo;

    before(async () => {
        userRepo = new UserRepo();

        user = await userRepo.create({
            email: 'SalemElhamood@eng.suez.edu.eg',
            password: 'salemHamoooood',
            role: 'ADMIN',
        });
        
    })

    after(async () => {
        await userRepo.deleteMany();
    })

    it('should reject only email', async () => {
        const res = await supertest(app).post('/api/login').send({
            email: 'SalemElhamood@eng.suez.edu.eg'
        }).expect(400);
    })

    it('should reject only password', async () => {
        const res = await supertest(app).post('/api/login').send({
            password: 'salemHamoooood'
        }).expect(400);
    })

    it('should reject wrong credentials (email)', async () => {
        const res = await supertest(app).post('/api/login').send({
            email: 'SalemElhamood1@eng.suez.edu.eg',
            password: 'salemHamoooood'
        }).expect(401);
    })

    it('should reject wrong credentials (password)', async () => {
        const res = await supertest(app).post('/api/login').send({
            email: 'SalemElhamood@eng.suez.edu.eg',
            password: 'salemHamoooood123'
        }).expect(401);
    })

    it('should reject wrong credentials (email and password)', async () => {
        const res = await supertest(app).post('/api/login').send({
            email: 'SalemElhamood1@eng.suez.edu.eg',
            password: 'salemHamoooood123'
        }).expect(401);
    })

    it('should login sucessfully', async () => {
        const res = await supertest(app).post('/api/login').send({
            email: 'SalemElhamood@eng.suez.edu.eg',
            password: 'salemHamoooood'
        }).expect(200);
    })
})