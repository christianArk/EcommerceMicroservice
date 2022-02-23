import "dotenv/config"


export class PaymentService {
    constructor(){
    }
    makePayment = async (req, res) => {
        try {
            let paymentStatuses = ['PAYMENT_SUCCESSFUL', 'PAYMENT_FAILED']
            let num = Math.floor((Math.random() * 2))
            return new Promise((resolve, reject) => {
                resolve(paymentStatuses[num])
            })
        } catch (error) {
            throw error;
        }
    }
    
}