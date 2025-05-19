const Review = require('../models/Review');
const Book = require('../models/Book');

// POST /api/books/:id/reviews
exports.addReview = async (req, res) => {
  try {
    const bookId = req.params.id;
    const { rating, comment } = req.body;

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const existingReview = await Review.findOne({ book: bookId, user: req.user.userId });
    if (existingReview) return res.status(400).json({ message: 'You already reviewed this book' });

    const review = new Review({
      book: bookId,
      user: req.user.userId,
      rating,
      comment
    });

    await review.save();
    res.status(201).json({ message: 'Review added successfully', review });
  } catch (err) {
    console.error('Add Review Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT /api/reviews/:id
exports.updateReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const { rating, comment } = req.body;

    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    if (review.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to update this review' });
    }

    if (rating) review.rating = rating;
    if (comment) review.comment = comment;

    await review.save();
    res.json({ message: 'Review updated', review });
  } catch (err) {
    console.error('Update Review Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE /api/reviews/:id
exports.deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.id;

    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    if (review.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this review' });
    }

    await review.deleteOne();
    res.json({ message: 'Review deleted successfully' });
  } catch (err) {
    console.error('Delete Review Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
