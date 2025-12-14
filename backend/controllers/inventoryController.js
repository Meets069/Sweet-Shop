// /backend/controllers/inventoryController.js
const Sweet = require('../models/Sweet');

// @desc    Purchase a sweet (decrease quantity by 1)
// @route   POST /api/sweets/:id/purchase
// @access  Protected (User)
exports.purchaseSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);

    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }

    if (sweet.quantity < 1) {
      return res.status(400).json({ message: 'Sweet is out of stock' });
    }

    sweet.quantity -= 1;
    await sweet.save();

    res.json({ message: 'Sweet purchased successfully', sweet });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Restock a sweet (increase quantity)
// @route   POST /api/sweets/:id/restock
// @access  Protected (Admin only)
exports.restockSweet = async (req, res) => {
  const { restockQuantity } = req.body;
  if (!restockQuantity || restockQuantity <= 0) {
    return res.status(400).json({ message: 'Invalid restock quantity' });
  }

  try {
    const sweet = await Sweet.findById(req.params.id);

    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }

    sweet.quantity += Number(restockQuantity);
    await sweet.save();

    res.json({ message: 'Sweet restocked successfully', sweet });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};