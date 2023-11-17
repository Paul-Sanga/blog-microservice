const { Schema, model } = require('mongoose');

const blogSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title field is required']
    },
    content: {
        type: String,
        required: [true, 'Content field is required']
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Blog = model('Blog', blogSchema)
module.exports = Blog