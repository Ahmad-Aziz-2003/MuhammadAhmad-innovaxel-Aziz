const Url = require("../models/Url");
const generateUniqueShortCode = require("../utils/generateUniqueShortCode");

// Create Short URL
exports.create = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "URL is required" });

    const shortCode = await generateUniqueShortCode();
    const newUrl = await Url.create({ url, shortCode });

    res.status(201).json({
      id: newUrl._id,
      url: newUrl.url,
      shortCode: newUrl.shortCode,
      createdAt: newUrl.createdAt,
      updatedAt: newUrl.updatedAt,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all short URLs
exports.getAll = async (req, res) => {
  try {
    const urls = await Url.find().sort({ createdAt: -1 });
    const formatted = urls.map((u) => ({
      id: u._id,
      url: u.url,
      shortCode: u.shortCode,
      createdAt: u.createdAt,
      updatedAt: u.updatedAt,
    //   accessCount: u.accessCount,
    }));
    res.status(200).json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Get Original URL and increment count
exports.retrieve = async (req, res) => {
  try {
    const urlData = await Url.findOne({ shortCode: req.params.shortCode });
    if (!urlData) return res.status(404).json({ error: "Short URL not found" });

    // Increment accessCount without updating updatedAt
    await Url.updateOne(
      { _id: urlData._id },
      { $inc: { accessCount: 1 } },
      { timestamps: false }
    );
    urlData.accessCount += 1;

    res.status(200).json({
      id: urlData._id,
      url: urlData.url,
      shortCode: urlData.shortCode,
      createdAt: urlData.createdAt,
      updatedAt: urlData.updatedAt, 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update URL
exports.update = async (req, res) => {
  const updated = await Url.findOneAndUpdate(
    { shortCode: req.params.shortCode },
    { url: req.body.url },
    { new: true }
  );

  if (!updated) return res.status(404).json({ error: "Short URL not found" });

  res.status(200).json({
    id: updated._id,
    url: updated.url,
    shortCode: updated.shortCode,
    createdAt: updated.createdAt,
    updatedAt: updated.updatedAt,
  });
};

// Delete URL
exports.remove = async (req, res) => {
  const deleted = await Url.findOneAndDelete({
    shortCode: req.params.shortCode,
  });
  if (!deleted) return res.status(404).json({ error: "Short URL not found" });

  res.status(204).send();
};

// Get stats
exports.stats = async (req, res) => {
  const data = await Url.findOne({ shortCode: req.params.shortCode });
  if (!data) return res.status(404).json({ error: "Short URL not found" });

  res.status(200).json(data);
};
