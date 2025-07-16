const Url = require('../models/Url');
const generateUniqueShortCode = require('../utils/generateUniqueShortCode');

// Create Short URL
exports.create = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'URL is required' });

    const shortCode = await generateUniqueShortCode();
    const newUrl = await Url.create({ url, shortCode });

    res.status(201).json({
      id: newUrl._id,
      url: newUrl.url,
      shortCode: newUrl.shortCode,
      createdAt: newUrl.createdAt,
      updatedAt: newUrl.updatedAt
    });
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

// Update URL
exports.update = async (req, res) => {
  const updated = await Url.findOneAndUpdate(
    { shortCode: req.params.shortCode },
    { url: req.body.url },
    { new: true }
  );
  if (!updated) return res.status(404).json({ error: 'Short URL not found' });

  res.status(200).json(updated);
};


// Delete URL
exports.remove = async (req, res) => {
  const deleted = await Url.findOneAndDelete({ shortCode: req.params.shortCode });
  if (!deleted) return res.status(404).json({ error: 'Short URL not found' });

  res.status(204).send();
};


// Get stats
exports.stats = async (req, res) => {
  const data = await Url.findOne({ shortCode: req.params.shortCode });
  if (!data) return res.status(404).json({ error: 'Short URL not found' });

  res.status(200).json(data);
};



