const express = require('express');
const router = express.Router();
const { readData, readRowById, writeData, deleteRowById, updateRowById, deleteAllValues } = require('../networkCalls');
const networkDebugger = require('debug')('app:networkCalls')
const { validateBook } = require('../helper_functions/validate')
const { getBook } = require('../googleBooks')
const { update } = require('../helper_functions/shiftId');
const { sendMail } = require('./controllers')



router.get('/', async (req, res) => {
    const books = await readData();
    res.send(books)
});

router.get('/:id', async (req, res) => {
    try {
        const book = await readRowById(req.params.id)
        console.log('Book retrieved: ', book)
        res.send(book);
    } catch (err) {
        networkDebugger(err)
    }
});


router.post('/', async (req, res) => {
    try {
        networkDebugger("This endpoint was called")
        const { error } = validateBook(req.body);

        if (error) return res.status(400).send(error.details[0].message);
        //networkDebugger("We got this far")
        const books = await readData();

        const booksFromGoogle = await getBook(req.body.title, req.body.quantity)

        //console.log(booksFromGoogle)

        const booksWithIds = await Promise.all(booksFromGoogle
            .map(
                (book, index) => ({ ...book, id: books.length + index }))
            .map(book => update(book)));

        writeData(booksWithIds);
        //console.log({ title: booksWithIds[0][1], summary: booksWithIds[0][4] })
        sendMail("A new book has been added",
            `Title: 
            ${booksWithIds[0][1]}, 
            
            Summary: 
            ${booksWithIds[0][4]}`)

        res.send(booksWithIds)
    } catch (err) {
        networkDebugger(err)
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const book = await deleteRowById(req.params.id)
        res.send(book)
        networkDebugger('The following book was removed: ', book)
    } catch (err) {
        networkDebugger(err)
    }
});

router.delete('/', async (req, res) => {
    const books = await readData();
    const num = await books.length
    const result = await deleteAllValues(num);
    res.send(result);
})

router.put('/:id', async (req, res) => {
    try {

        const { error } = validateBook(req.body);

        if (error) return res.status(400).send(error.details[0].message);

        const book = {
            id: req.params.id,
            title: req.body.title,
            author: req.body.author,
            pages: req.body.pages,
            summary: req.body.summary,
        }
        networkDebugger('Here is the book: ', book)

        const bookArr = Object.values(book)

        await updateRowById([bookArr], req.params.id)
        res.send(book)
        networkDebugger('The following book was udpated: ', book)
    } catch (err) {
        networkDebugger(err)
    }
});


module.exports = router;
