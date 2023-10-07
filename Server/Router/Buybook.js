const express = require('express');
const router = express.Router();
const cors = require('cors');
const user = require('../Schema/Users');
const Story = require('../Schema/Story');
const auth = require('bcryptjs');
const dotenv = require('dotenv').config();
const JWT = require('jsonwebtoken');
const cookie = require('cookie-parser');
const jwtoken = process.env.TOKEN;
const books = require('../Schema/Books')
const cart = require('../Schema/Cart')
const order = require('../Schema/Orders')
const axios = require('axios');

const order_creation = require('../Controller/Payment')
const make_payment = require('../Controller/MakePayment')

const axiosRetry = require('axios-retry');




router.use(cookie());
router.use(cors({
          origin: 'http://127.0.0.1:5173',
          methods: ['POST', 'PUT', 'GET', 'DELETE', 'OPTIONS', 'HEAD', 'PATCH'],
          credentials: true
}));




router.post('/buybook', order_creation);













router.post('/payment', make_payment)





module.exports = router;