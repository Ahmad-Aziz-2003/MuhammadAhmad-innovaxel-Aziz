const Url = require('../models/Url');
const generateUniqueShortCode = require('../utils/generateUniqueShortCode');

// Create Short URL
exports.create = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'URL is required' });

    const shortCode = generateUniqueShortCode();
    const newUrl = await Url.create({ url, shortCode });

    res.status(201).json(newUrl);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Original URL and increment count
exports.retrieve = async (req, res) => {
  const urlData = await Url.findOne({ shortCode: req.params.shortCode });
  if (!urlData) return res.status(404).json({ error: 'Short URL not found' });

  urlData.accessCount += 1;
  await urlData.save();

  res.status(200).json(urlData);
};



