const { Router } = require('express')

const { register, login, getAllUsers, updateUser, deleteUser } = require('../controller/user.controller')
const { authorization } = require('../middleware/auth.middleware')

const router = Router()

router.post('/login', login)
router.post('/register', register)
router.get('/', authorization, getAllUsers)
router.put('/:id', authorization, updateUser)
router.delete('/:id', authorization, deleteUser)


module.exports = router