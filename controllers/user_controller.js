const CustomError = require('../middlewares/error_handler')
const ResponseHelper = require('../helpers/response_helper')
const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { encodePayload } = require('../helpers/jwt')

class UserController {
    static async registerUser(req, res, next) {
        try {
            const userImageApi = 'https://ui-avatars.com/api/'
            const { email, password, full_name } = req.body
            const userImage = full_name.replace(/[^A-Z0-9]/ig, "+")
            const img_url = `${userImageApi}?name=${userImage}`
            const newUser = await User.create({
                email, password, full_name, img_url
            })
            const response = new ResponseHelper('Success create user', {
                id: newUser.id,
                email: newUser.email,
                full_name: newUser.full_name
            })
            
            return res.status(201).json(response)
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({
                where: { email }
            })

            if (!user) throw new CustomError('Unauthorized', 'Invalid username or password')

            const checkPassword = comparePassword(password, user.password)

            if (!checkPassword) throw new CustomError('Unauthorized', 'Invalid username or password')

            const access_token = encodePayload({
                id: user.id,
                email: user.email
            })
            const response = new ResponseHelper('success', { access_token })

            return res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController