const express = require('express');
const router = express.Router();
const { readData, readRowById, writeData } = require('../networkCalls')
const { networkDebugger } = require('../networkCalls')

router.get('/', async (req, res) => {
    const people = await readData();
    res.send(people)
});

router.get('/:id', async (req, res) => {
    try {
        const person = await readRowById(req.params.id)
        networkDebugger('Person retrieved: ', person)
        res.send(person);
    } catch (err) {
        networkDebugger(err)
    }
});


router.post('/', async (req, res) => {
    try {
        const people = await readData();

        const person = {
            id: people.length + 1,
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            phone: req.body.phone,
        }

        const personArr = Object.values(person)

        writeData([personArr]);
        res.send(person)
    } catch (err) {
        networkDebugger(err)
    }
});

router.delete('/:id', async (req, res) => {
    try {

    } catch (err) {
        networkDebugger(err)
    }
})

// router.put('/:id', async (req, res) => {
//     const person = 
// });

module.exports = router;