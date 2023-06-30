const axios = require('axios');
const { generateConfig } = require('./utilities');
const nodemailer = require('nodemailer');
const CONSTANTS = require('./constants');
const { google } = require('googleapis');
const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN } = require('../helper_functions/config')

require("dotenv").config();

const OAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

OAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail(subject, message) {
    try {
        const accessToken = await OAuth2Client.getAccessToken();
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                ...CONSTANTS.auth,
                accessToken: accessToken
            },
        });

        const mailOptions = {
            from: "Ian, <ipcampbell12@gmail.com>",
            to: "ipcampbell12@gmail.com>",
            subject: subject,
            text: message
        };

        const result = await transport.sendMail(mailOptions);
        return result;
    } catch (err) {
        console.log(err.message);

    };
};


module.exports = {
    sendMail: sendMail
}