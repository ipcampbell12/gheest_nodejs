const axios = require('axios');

const apiKey = 'AIzaSyAqGn7oUYS5vvxuRVPvuTSMvVzBRJBWDuk';

const book = 'To Kill a Mockingbird'

const getBook = async () => {
    try {
        const response = await axios.get(
            `https://www.googleapis.com/books/v1/volumes?q=intitle:${book}&${apiKey}`
        );

        const { items } = response.data
        const firstBook = items[0]['volumeInfo']
        const { title, authors, description, pageCount } = firstBook
        const bookInfo = [title, authors, description, pageCount]
        console.log(bookInfo)
    } catch (err) {
        console.error(err)
    }

}

getBook();