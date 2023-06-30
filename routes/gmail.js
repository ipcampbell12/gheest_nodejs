const express = require('express');
const { sendMail } = require('./controllers')
const router = express.Router();

require("dotenv").config();


router.get('/mail/send', async (req, res) => {

    try {
        const gmail = await sendMail(req.subject, req.message);
        console.log(gmail)
        res.send(gmail)
    } catch (err) {
        console.log(err.message)
    }

})


module.exports = router;