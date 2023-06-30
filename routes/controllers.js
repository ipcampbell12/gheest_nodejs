const axios = require('axios');
const { generateConfig } = require('./utilities');
const nodemailer = require('nodemailer');
const CONSTANTS = require('./constants');
const { google } = require('googleapis');


require("dotenv").config();

const OAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.CLIENT_URI,
);

OAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

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
        res.send(result);
    } catch (err) {
        console.log(err.message);
        res.send(err)
    };
};


sendMail();