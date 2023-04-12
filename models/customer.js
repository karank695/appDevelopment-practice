const mongoose = require('mongoose');
//creating customer schema
const customerSchema = new mongoose.Schema({
    customer_name: { type: String, required: true },
    customer_email: { type: String, required: true,unique:true},
    customer_phone: { type: String },
    customer_password:{type:String,required:true}
});
//creating model for customer
const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;
