import nodemailer from 'nodemailer'

async function sendEmail(email: string, subject: string, title: string, body: string, url: string, urlText: string)
{

    let transporter = nodemailer.createTransport( {
        host: "smtp-mail.outlook.com",
        port: 587,
        auth: {
            user: process.env.MAIL_USER, 
            pass: process.env.MAIL_PASS, 
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: `"Suez Canal University" <${process.env.MAIL_USER}>`, // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        text: `${url}`, // plain text body
        html: `${url}`, // html body
    });

    console.log("Message sent: %s", info.messageId);

}

export default sendEmail;