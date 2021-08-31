var express = require('express');
var router = express.Router();

router.get('/', locationController.displayIndex);

module.exports = router;