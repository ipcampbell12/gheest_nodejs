const express = require('express');
const controllers = require('./controllers')
const router = express.Router();

require("dotenv").config();

router.get("/", async (req, res) => {
    res.send("welcome to Gmail API with NodeJS")
});


router.get('/mail/send', controllers.sendMail)


module.exports = router;