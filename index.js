const Joi = require('joi')
const express = require('express')
const cors = require('cors')
const people = require('./Routes/people')
const morgan = require('morgan')

const app = express()

app.use(cors())

app.use(express.json());
app.use(morgan('tiny'));
app.use('/api/people', people)

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})