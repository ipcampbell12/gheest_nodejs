const express = require('express');
const router = express.Router();

require("dotenv").config();

router.get("/", async (req, res) => {
    res.send("welcome to Gmail API with NodeJS")
})