// import express, { Request, Response } from 'express';
// // import { parse } from 'csv-parse';
// import { StudentRepo } from '../../db/studentRepo';
// import multer from 'multer';
// // import { isAdmin } from '../../utils/passportUtils';
// import fs from 'fs';
// import path from 'path';
// import { Gender, Religion } from '@prisma/client';
// import { nextTick } from 'process';

// const adm_server = express.Router();
// const student = new StudentRepo();
// const rowData: string[] = [];
// let oneTimeCheck = 0
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         // console.log(file)
//         cb(null, 'uploads')
//     },
//         filename : (req, file, cb) => {
//             cb(null, Date.now() + path.extname(file.originalname));
//         },
// });
// const upload = multer({ storage: storage })

// adm_server.post('/csv_upload', upload.single('csv'), (req:Request, res: Response) => {
//     // check if file exist
//     if (!req.file)
//         return res.status(400).json({ error: 'File is required' });
//     // check if file is csv
//     if (req.file?.mimetype !== 'text/csv') 
//         return res.status(400).json({ error: 'File must be a csv' });
//     try{
//         fs.createReadStream(`${req.file?.path}`)
//         .pipe(
//             parse({ 
//                 delimiter: ',',
//             })
//         )
//         .on('data', async (row: string) => {
//             // check if theuploaded csv has the correct order of data
//             if ((row[3] == "englishName" || row[4] == "arabicName" || row[5] == "nationality" || row[6] == "nationalId" || row[7] == "gender" || row[8] == "religion" || row[9] == "birthDate" || row[10] == "birthPlace" || row[11] == "guardianName" || row[12] == "address" || row[13] == "contactPhone" || row[14] == "homePhone") && oneTimeCheck == 0)
//             {
//                 oneTimeCheck = 1;
//                 // kill the process
//                 return res.status(400).json({ error: 'File has incorrect order of data' });
//             }
//             if (!row[6] || row[6].length !== 14) {
//                 // create a scv and write that user to it
//                 rowData.push(row);
//             } else {
                // await student.create({
                //     user: {
                //     create: {
                //         email: "keep.hard.coded@fornow.com",
                //         password: row[1],
                //         role: "STUDENT",
                //     },
                //     },
                //     englishName: row[3],
                //     arabicName: row[4] as string,
                //     nationality: row[5],
                //     nationalId: row[6],
                //     gender: row[7] as Gender,
                //     religion: row[8] as Religion,
                //     birthDate: row[9],
                //     birthPlace: row[10],
                //     guardianName: row[11] as string,
                //     address: row[12],
                //     contactPhone: row[13],
                //     homePhone: row[14],
                // });
//             }
//         })
//         .on('end', () => {
//             return res.status(200).send(rowData)
//         });
//     } catch (err) {
//         res.status(400).json(err);
//     }
// })

// adm_server.get('/csv_upload', (req:Request, res: Response) => {
//     res.status(200).sendFile(__dirname + '/form.html');
// })

// adm_server.post('/create_user', async (req: Request, res: Response) => {
//     const { 
//             englishName,
//             arabicName, 
//             nationality,
//             nationalId,
//             gender, 
//             religion, 
//             birthDate, 
//             birthPlace, 
//             guardianName, 
//             address, 
//             contactPhone, 
//             homePhone
//         } = req.body;
//     if (! nationalId || nationalId.length !== 14)
//         return res.status(400).json({ error: 'missing or invalid nationalId' });
//     try {
//         await student.create({
//             user: {
//             create: {
//                 email: "keep.hard.coded@fornow.com",
//                 password: "dummy",
//                 role: "STUDENT",
//             },
//             },
//             englishName,
//             arabicName,
//             nationality,
//             nationalId,
//             gender,
//             religion,
//             birthDate,
//             birthPlace,
//             guardianName,
//             address,
//             contactPhone,
//             homePhone,
//         });
//         res.send(200).json({ message: 'user created' });
//     } catch (err) {
//         res.status(400).json(err);
//     }
// })

// export default adm_server;