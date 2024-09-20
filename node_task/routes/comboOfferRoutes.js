const express = require('express');
const { getCalculatePrice} = require('../contollers/comboOfferController');

const router = express.Router();

router.post('/calculatePrice', getCalculatePrice);

module.exports = router;
