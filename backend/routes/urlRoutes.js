const express = require('express');
const router = express.Router();
const controller = require('../controllers/urlController');

router.post('/shorten', controller.create);
router.get('/shorten/:shortCode', controller.retrieve);
router.put('/shorten/:shortCode', controller.update);
router.delete('/shorten/:shortCode', controller.remove);


module.exports = router;
