const mongoose = require("mongoose")
const Schema = mongoose.Schema

const TodoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("Todo", TodoSchema)