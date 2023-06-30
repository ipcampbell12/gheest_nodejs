const express = require('express');
const { sendMail } = require('./controllers')
const router = express.Router();

require("dotenv").config();


router.post('/mail/send', async (req, res) => {

    try {

        const gmail = await sendMail(req.body.subject, req.body.message);
        console.log(gmail)
        res.send(gmail)
    } catch (err) {
        console.log(err.message)
    }

})


module.exports = router;