import express  from "express";
import { Book } from "../models/bookModel.js";

const router = express();
// Route to add books into database.....
router.post('/', async (req, res) => {

    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({ message: 'All fields are not provided!!' });
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        };

        const book = await Book.create(newBook);

        return res.status(201).json(book);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }

});

//Route to delete books...
router.delete('/:id', async (req,res) => {

    try{
        const id = req.params.id;
        const book = await Book.findByIdAndDelete(id);

        if(!book){
            return res.status(404).json({message: "Book not found!!"})
        }

        return res.status(200).json({message: "Book Deleted!!"});

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }

});

//Route to get all books.....
router.get('/', async (req, res) => {

    try {
        const books = await Book.find({});

        return res.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }

});

//Route to get one book.....
router.get('/:id', async (req, res) => {

    try {
        const { id } = req.params;

        const book = await Book.findById(id);

        return res.status(200).json(book);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }

});

//Route to update a book.....
router.put('/:id', async (req, res) => {

    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({ message: 'All fields are not provided!!' });
        }

        const { id } = req.params;
        const book = await Book.findByIdAndUpdate(id, req.body);

        if(!book){
            return res.status(404).json({message: "Book not found!!"})
        }

        return res.status(200).json({message: "Book updated!!"});
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }

});


export default router;