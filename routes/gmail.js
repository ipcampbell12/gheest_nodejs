const express = require('express');
const controllers = require('./controllers')
const router = express.Router();

require("dotenv").config();

router.get("/", async (req, res) => {
    res.send("welcome to Gmail API with NodeJS")
});

router.get('/mail/user/:email', controllers.getUser)
router.get('/mail/send', controllers.sendMail)
router.get('/mail/drafts/:email', controllers.getDrafts)
router.get('/mail/read/:messageId', controllers.readMail);

module.exports = router;