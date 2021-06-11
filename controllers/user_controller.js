const CustomError = require('../middlewares/error_handler')
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
            
            return res.status(201).json({
                status: "Success create user",
                data: {
                    id: newUser.id,
                    email: newUser.email,
                    full_name: newUser.full_name
                }
            })
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

            const token = encodePayload({
                id: user.id,
                email: user.email
            })

            return res.status(200).json({
                status: "success",
                access_token: token
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController