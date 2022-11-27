import express, { Request, Response } from 'express';
import { parse } from 'csv-parse';
import { StudentRepo } from '../../db/studentRepo';
import multer from 'multer';
// import { isAdmin } from '../../utils/passportUtils';
import fs from 'fs';
import path from 'path';

const adm_server = express.Router();
const student = new StudentRepo();
const rowData: string[] = [];
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(file)
        cb(null, 'uploads')
    },
        filename : (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname));
        },
});
const upload = multer({ storage: storage })

// documentation https://github.com/richardgirges/express-fileupload/tree/master/example#basic-file-upload
adm_server.post('/csv_upload', upload.single('csv'), (req:Request, res: Response) => {
    // check if file exist
    if (!req.file)
        return res.status(400).json({ error: 'File is required' });
    // check if file is csv
    if (req.file?.mimetype !== 'text/csv') 
        return res.status(400).json({ error: 'File must be a csv' });
    try{
        fs.createReadStream(`${req.file?.path}`)
        .pipe(
            parse({ 
                delimiter: ',',
                from_line: 2 
            })
        )
        .on('data', async (row: string) => {
            await student.create({
                user: {
                  create: {
                    email: "rafa@rafa.com",
                    password: row[1],
                    role: "STUDENT",
                  },
                },
                englishName: row[3],
                arabicName: row[4] as string,
                nationality: row[5],
                nationalId: row[6],
                gender: "MALE",
                religion: "MUSLIM",
                birthDate: new Date("1990-01-01"),
                birthPlace: row[10],
                guardianName: row[11] as string,
                address: row[12],
                contactPhone: row[13],
                homePhone: row[14],
              });
        })
        .on('end', () => {
            res.status(200)
        });
    } catch (err) {
        res.status(400).json(err);
    }
    res.sendStatus(200);
})

adm_server.get('/csv_upload', (req:Request, res: Response) => {
    res.status(200).sendFile(__dirname + '/form.html');
})

adm_server.post('/create_user', (req: Request, res: Response) => {
    const {email, password, role} = req.body;
    try{
        // student.create({email, password, role});
        res.status(200);
    } catch (err) {
        res.status(400).json(err);
    }
})

export default adm_server;

