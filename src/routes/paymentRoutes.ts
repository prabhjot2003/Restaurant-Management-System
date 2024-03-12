import paymentRotoess from "../services/paymentStripe";



const PaymentRoute = (app: any) => {
    app.post('/Customer', paymentRotoess.createCustomer);
    app.post("/Charge", paymentRotoess.addCharge);


}
export default PaymentRoute;