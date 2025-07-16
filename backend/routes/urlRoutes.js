const express = require('express');
const router = express.Router();
const controller = require('../controllers/urlController');

router.post('/shorten', controller.create);
router.get('/shorten/:shortCode', controller.retrieve);


module.exports = router;
