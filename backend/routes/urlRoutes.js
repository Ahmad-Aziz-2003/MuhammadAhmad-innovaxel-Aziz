const express = require("express");
const router = express.Router();
const controller = require("../controllers/urlController");

router.post("/shorten", controller.create);
router.get('/shorten', controller.getAll);
router.get("/shorten/:shortCode", controller.retrieve);
router.put("/shorten/:shortCode", controller.update);
router.delete("/shorten/:shortCode", controller.remove);
router.get("/shorten/:shortCode/stats", controller.stats);

module.exports = router;
