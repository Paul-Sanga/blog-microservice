const Blog = require("../model/blog.model")
const User = require("../model/user.model")
const { blogSchema } = require("../utils/validators")


module.exports.createBlog = async(req, res)=>{
    try {
        
        const email = req.user
        const user = await User.findOne({email})
        if(!user) return res.status(404).json({error: 'Invalid user email'})
    
        if(!req.body) return res.status(422).json({error: 'Request body is required'})
        const {title, content} = req.body;
    
        const {error} = blogSchema.validate({title, content, author: email})
        if(error) return res.status(422).json({error: error.message})
    
        const blog = new Blog({title, content, author: user._id})
        await blog.save()
    
        return res.status(201).json({message: 'Blog created'})   
    } catch (error) {
        throw error
    }
}

module.exports.getUserBlogs = async(req, res)=>{
    try {
        
        const email = req.user
        const user = await User.findOne({email})
        if(!user) return res.status(404).json({error: 'Invalid user email'})

        const blogs = await Blog.find().populate('author')
        return res.status(200).json({message: 'Fetch successful', blogs})

    } catch (error) {
        throw error
    }
}