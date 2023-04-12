const mongoose = require('mongoose');
async function main() {
    mongoose.connect('mongodb://localhost:27017/customers_db');
}
main().then(() => {
    console.log('connected successfully');
}).catch((err) => {
    console.log(err);
});