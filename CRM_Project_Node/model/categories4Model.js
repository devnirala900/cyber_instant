const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    uid: {
        type: String, required: true
    },
    name: {
        type: String, required: true
    },
    number: {
        type: Number, required: true
    },
    address: {
        type: String, required: true
    },
    field1: {
        type: String
    },
    field2: {
        type: String
    },
    field3: {
        type: String
    },
    field4: {
        type: String
    },
    field5: {
        type: String
    },
    field6: {
        type: String
    },
    field7: {
        type: String
    },
    field8: {
        type: String
    },
    field9: {
        type: String
    },
    field10: {
        type: String
    },
    field11: {
        public_id: {
            type: String,
            // required: true,
        },
        url: {
            type: String,
            // required: true,
        },
    },
    field12: {
        public_id: {
            type: String,
            // required: true,
        },
        url: {
            type: String,
            // required: true,
        },
    },
})
const Categories_4 = mongoose.model("Categories_4", userSchema);
module.exports = Categories_4;