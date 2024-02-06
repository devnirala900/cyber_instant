const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    project_name: {
        type: String, required: true
    },
    subject: {
        type: String, required: true
    },
    status: {
        type: String, required: true
    },
    assign_to: {
        type: String
    },
    date: {
        type: String
    },
    details: {
        type: String
    },
   
})
const Categories_1 = mongoose.model("Categories_1", userSchema);
module.exports = Categories_1;