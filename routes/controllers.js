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

async function sendMail(req, res) {
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
            ...CONSTANTS.mailoptions,
            text: "The Gmail API with NodeJS worked!"
        };

        const result = await transport.sendMail(mailOptions);
        console.log(result)
        // res.send(result);
    } catch (err) {
        console.log(err.message);
        // res.send(err)
    };
};


module.exports = {
    sendMail: sendMail
}