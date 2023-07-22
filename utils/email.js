const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const oAuth2client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "https://developers.google.com/oauthplayground/"
);
oAuth2client.setCredentials({refresh_token: process.env.REFRESH_TOKEN});

module.exports.sendMailWithGmail = async (data) =>{
    const accessToken = await oAuth2client.getAccessToken();

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: process.env.SENDER_MAIL,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
        }
    })
}










//email send with MailGun 
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);

const mg = mailgun.client({
    username: 'api',
    key: '5b0b37287b6e7fc7b8eb67bcb088be9b-6d8d428c-d1b90390',
});


module.exports.sendMailWithMailGun = async (data) => {
    const result = await mg.messages
        .create("sandbox8149de685be6441bb895cac134662969.mailgun.org", {
            from: "Mailgun Sandbox <postmaster@sandbox8149de685be6441bb895cac134662969.mailgun.org>",
            to: ["robiussani31@gmail.com"],
            subject: "Hello",
            text: "Testing some Mailgun awesomness!",
        })
    return result.id
}

	// .then(msg => console.log(msg)) // logs response data
    // .catch(err => console.log(err)); // logs any error`;
