const { Router } = require('express')

const { authorization } = require('../middleware/auth.middleware')
const { createBlog, getUserBlogs } = require('../controller/blogs.controller')

const router = Router()

router.post('/', authorization, createBlog)
router.get('/', authorization, getUserBlogs)

module.exports = router