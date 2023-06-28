const axios = require('axios');

const { GOOGLEBOOKS_API_KEY } = require('./helper_functions/config')

const getBook = async (book, quantity) => {
    try {
        const response = await axios.get(
            `https://www.googleapis.com/books/v1/volumes?q=intitle:${book}&${GOOGLEBOOKS_API_KEY}`
        );

        const { items } = response.data
        const initialBooks = items.slice(0, quantity)
        const booksReturned = initialBooks.map(
            ({ volumeInfo: { title, authors, pageCount } }) => { return { title, authors, pageCount } }
        ).map(book => [book.title, book.authors[0], book.pageCount])

        // console.log(booksReturned)
        return booksReturned
    } catch (err) {
        console.error(err)
    }

}

module.exports = {
    getBook: getBook
}
//getBook('To Kill a Mockingbird', 2);

