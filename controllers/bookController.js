const Book = require('../models/Book');
const Review = require('../models/Review');

// POST /api/books
exports.addBook = async (req, res) => {
  try {
    const { title, author, genre, description } = req.body;
    const book = new Book({
      title,
      author,
      genre,
      description,
      createdBy: req.user.userId
    });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    console.error('Add Book Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/books
exports.getBooks = async (req, res) => {
  try {
    const { author, genre, page = 1, limit = 5 } = req.query;
    const filter = {};
    if (author) filter.author = new RegExp(author, 'i');
    if (genre) filter.genre = genre;

    const books = await Book.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Book.countDocuments(filter);

    res.json({
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: books
    });
  } catch (err) {
    console.error('Get Books Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/books/:id
exports.getBookById = async (req, res) => {
  try {
    const bookId = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const limit = 3;

    const book = await Book.findById(bookId).lean();
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const reviews = await Review.find({ book: bookId })
      .populate('user', 'name')
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 })
      .lean();

    const totalReviews = await Review.countDocuments({ book: bookId });

    const avg = await Review.aggregate([
      { $match: { book: book._id } },
      { $group: { _id: null, avgRating: { $avg: "$rating" } } }
    ]);

    const averageRating = avg[0]?.avgRating || 0;

    res.json({
      ...book,
      averageRating,
      reviews,
      totalReviews,
      currentPage: page,
      totalPages: Math.ceil(totalReviews / limit)
    });
  } catch (err) {
    console.error('Get Book Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/books/search?query=...
exports.searchBooks = async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const regex = new RegExp(query, 'i');

    const books = await Book.find({
      $or: [
        { title: { $regex: regex } },
        { author: { $regex: regex } }
      ]
    }).sort({ createdAt: -1 });

    res.json({ results: books });
  } catch (err) {
    console.error('Search Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
