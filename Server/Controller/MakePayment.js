const Razorpay = require('razorpay')
const order = require('../Schema/Orders')

const razorpay = new Razorpay({
          key_id: process.env.R_KEY_ID,
          key_password: process.env.R_KEY_PASSWORD
})

//make payment
const paymentVerify = async (req, res) => {
          const getcookie = await req.cookies.signintoken;
          if (!getcookie) {
                    return res.status(400).send("you are logged out");
          }
          try {
                    const { Order_id, Payment_id, signature } = req.body


                    const body = await Order_id + "|" + Payment_id;

                    const expectedSignature = await crypto.createHmac("sha256", process.env.R_KEY_PASSWORD).update(body.toString()).digest("hex");

                    const isValid = expectedSignature === signature;

                    if (isValid) {
                              const addOrder = await new order({
                                        Order_id, Payment_id, signature


                              })

                              addOrder.save().then(() => {
                                        res.redirect(`http://localhost:3000/paymentsuccess?reference=${Payment_id}`)
                              }).catch(() => {
                                        res.status(400).json({
                                                  success: false

                                        })
                              })
                    }



          } catch (error) {
                    console.error(error);
                    res.status(500).send("Internal Server Error");


          }

















}


module.exports = paymentVerify