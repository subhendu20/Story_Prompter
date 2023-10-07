import Razorpay from 'razorpay'

interface payment_data{
                    key: string,
                    amount: number;
                    currency:string;
                    name: string,
                    description: string,
                    image:string,

                    
          }

const Reaquset_payment=async(options:payment_data)=>{
          
          const  Payment = new Razorpay(options)
          Payment.open()


}

export default Reaquset_payment
