// /backend/controllers/sweetController.js
const Sweet = require('../models/Sweet');

// @desc    Add a new sweet
// @route   POST /api/sweets
// @access  Protected (Admin only) - Should use admin middleware
exports.addSweet = async (req, res) => {
  try {
    const sweet = await Sweet.create(req.body);
    res.status(201).json(sweet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all sweets (with search/filter)
// @route   GET /api/sweets/search & /api/sweets
// @access  Protected
exports.getSweets = async (req, res) => {
  // Combine search and general list functionality for simplicity
  const { name, category, minPrice, maxPrice } = req.query;
  let filter = {};

  if (name) {
    // Case-insensitive search
    filter.name = { $regex: name, $options: 'i' };
  }
  if (category) {
    filter.category = { $regex: category, $options: 'i' };
  }
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  try {
    const sweets = await Sweet.find(filter);
    res.json(sweets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a sweet's details
// @route   PUT /api/sweets/:id
// @access  Protected (Admin only)
exports.updateSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated document
      runValidators: true,
    });

    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }

    res.json(sweet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a sweet
// @route   DELETE /api/sweets/:id
// @access  Protected (Admin only)
exports.deleteSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findByIdAndDelete(req.params.id);

    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }

    res.json({ message: 'Sweet removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};