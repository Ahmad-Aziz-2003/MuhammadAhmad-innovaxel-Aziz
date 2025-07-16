const Url = require("../models/Url");
const { nanoid } = require("nanoid");

const generateUniqueShortCode = async () => {
  let shortCode;
  let exists = true;

  while (exists) {
    shortCode = nanoid(6);
    exists = await Url.findOne({ shortCode });
  }

  return shortCode;
};

module.exports = generateUniqueShortCode;
