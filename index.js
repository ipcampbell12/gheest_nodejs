const Joi = require('joi')
const express = require('express')
const cors = require('cors')
const books = require('./routes/books')
const morgan = require('morgan')

const app = express()

app.use(cors())

app.use(express.json());
app.use(morgan('tiny'));
app.use('/api/books', books)

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})