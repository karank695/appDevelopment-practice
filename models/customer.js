const mongoose = require('mongoose');
//creating customer schema
const customerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: { type: String, required: true },
    phone: { type: String },
    password:{type:String,required:true}
});
//creating model for customer
const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;
