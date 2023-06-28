const axios = require('axios');

const apiKey = 'AIzaSyAqGn7oUYS5vvxuRVPvuTSMvVzBRJBWDuk';

const getBook = async (book) => {
    try {
        const response = await axios.get(
            `https://www.googleapis.com/books/v1/volumes?q=intitle:${book}&${apiKey}`
        );

        const { items } = response.data
        const firstFiveBooks = items.slice(0, 5)
        const bookInfo = firstFiveBooks.map(
            ({ volumeInfo: { title, authors, description, pageCount } }) => { return { title, authors, description, pageCount } }
        ).map(book => [book.title, book.authors[0], book.pageCount, book.description])
        console.log(bookInfo[0])
        return bookInfo[0]
    } catch (err) {
        console.error(err)
    }

}

module.exports = {
    getBook: getBook
}
//getBook('To Kill a Mockingbird');

