require("dotenv").config();


const auth = {
    type: "OAuth2",
    user: "ipcampbell12@gmail.com",
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN
};

const mailoptions = {
    from: "Ian, <ipcampbell12@gmail.com>",
    to: "ipcampbell12@gmail.com>",
    subject: "Gmail API NodeJS"
};

module.exports = { auth, mailoptions }