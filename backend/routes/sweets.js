// /backend/routes/sweets.js
const express = require('express');
const { protect, admin } = require('../middleware/auth');
const {
  addSweet, getSweets, updateSweet, deleteSweet,
} = require('../controllers/sweetController');
const {
  purchaseSweet, restockSweet,
} = require('../controllers/inventoryController');

const router = express.Router();

// GET /api/sweets (Protected) & POST /api/sweets (Admin only)
router.route('/')
  .get(protect, getSweets) 
  .post(protect, admin, addSweet); 

// PUT /api/sweets/:id (Admin only) & DELETE /api/sweets/:id (Admin only)
router.route('/:id')
  .put(protect, admin, updateSweet)
  .delete(protect, admin, deleteSweet); 

// POST /api/sweets/:id/purchase (Protected)
router.post('/:id/purchase', protect, purchaseSweet); 

// POST /api/sweets/:id/restock (Admin only)
router.post('/:id/restock', protect, admin, restockSweet); 

module.exports = router;