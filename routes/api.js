const router = require('express').Router();

router.use('/dbd',require('./api/conteo'));

module.exports = router;