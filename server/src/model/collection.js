import mongoose from "mongoose";

//schema
//defining schema =  define structure of document : -1)key's values datatype 2)key's values validation
const mernSchema = new mongoose.Schema({
    "name": {
        type: String,
        required: true
    },
    "email": {
        type: String,
        required: true
    },
    "phone": {
        type: Number,
        required: true
    },
    "work": {
        type: String,
        required: true
    },
    "password": {
        type: String,
        required: true
    },
    "cpassword": {
        type: String,
        required: true
    },
    "messages": [
        {
            "name": {
                type: String,
                required: true
            },
            "email": {
                type: String,
                required: true
            },
            "phone": {
                type: Number,
                required: true
            },
            "message": {
                type: String,
                required: true
            }
        }
    ],
    "tokens": [
        {
            "token": {
                type: String,
                required: true
            }
        }
    ]

})

const mernColl = new mongoose.model("mernColl", mernSchema);

export default mernColl;