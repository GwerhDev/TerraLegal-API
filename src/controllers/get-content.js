const router = require('express').Router();
const contentSchema = require('../models/Content');

router.get('/', async (req, res) => {
  try {
    const response = await contentSchema.find({ published: true });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

router.get('/lasts', async (req, res) => {
  try {
    const response = await contentSchema.find({ published: true }).sort({ _id: -1 }).limit(2);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await contentSchema.findById(id).populate('contentGallery');
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

module.exports = router;