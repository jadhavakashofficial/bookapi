const express = require('express');
const router = express.Router();

const { 
  addBook, 
  getBooks, 
  getBookById, 
  searchBooks 
} = require('../controllers/bookController');

const auth = require('../middlewares/auth');

// 🔍 Search must be above :id to avoid conflict
router.get('/books/search', searchBooks);

// 📚 Book routes
router.get('/books', getBooks);
router.get('/books/:id', getBookById);
router.post('/books', auth, addBook);

module.exports = router;
