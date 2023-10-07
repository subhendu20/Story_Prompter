const Razorpay = require('razorpay')
const order = require('../Schema/Orders')

const razorpay = new Razorpay({
          key_id: process.env.R_KEY_ID,
          key_password: process.env.R_KEY_PASSWORD
})


//initiate payment

const create_order = async (req, res) => {

          const getcookie = await req.cookies.signintoken;
          if (!getcookie) {
                    return res.status(400).send("you are logged out");
          }
          try {

                    const options = {
                              amount: Number(req.body.amount * 100),
                              currency: "INR"
                    };
                    const order = await razorpay.orders.create(options)
                    res.status(200).json({ start: true, order })

          } catch (error) {
                    console.error(error);
                    res.status(500).send("Internal Server Error");


          }















}

module.exports = create_order
