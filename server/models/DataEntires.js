const mongoose = require("mongoose");


const UserRegister = mongoose.Schema({

    name: {
        type: String
    },
    gmail: {
        type: String
    },
    password: {
        type: String
    }
});


module.exports = mongoose.model("Us" , UserRegister);




// Logic for user Signup



