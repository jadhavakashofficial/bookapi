const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

const {
  addReview,
  updateReview,
  deleteReview
} = require('../controllers/reviewController');

// ✅ Add a review
router.post('/books/:id/reviews', auth, addReview);

// ✅ Update your review
router.put('/reviews/:id', auth, updateReview);

// ✅ Delete your review
router.delete('/reviews/:id', auth, deleteReview);

module.exports = router;
