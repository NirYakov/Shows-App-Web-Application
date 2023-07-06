// const makePassword = require('./makePassword');
// const newPassword = makePassword.GetPassword();
const nodeMailer = require("nodemailer");



exports.sendMail = async (userEmail, username, newPassword) => {

    const appEmail = process.env.AppEmail;
    const passwordAppEmail = process.env.AppEmailPassword;

    const html = `
    <h1>Hello, ${appEmail} => ${username}</h1>
    <p>New Password : ${newPassword}</p>
    `

    const transporter = await nodeMailer.createTransport({
        // host: 'mail.openjavascript.info',
        service: "gmail",
        host: 'smtp.gmail.com',
        port: 587,
        secure: true,
        auth: {
            user: appEmail,
            pass: passwordAppEmail
        },
        // tls: {
        //     ciphers: 'SSLv3'
        // }

    });

    console.log("Here? ");


    const info = await transporter.sendMail({
        from: `Nir.y mails <${appEmail}>`,
        to: userEmail,
        subject: 'Shows Web App , New Password (forgot password)',
        html: html,
    });

    console.log("Message sent: " + info.messageId);
    console.log("V ", info.accepted);
    console.log("X ", info.rejected);

    console.log();
    return info.accepted.length;
}