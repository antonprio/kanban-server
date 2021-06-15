const CustomError = require('../middlewares/error_handler')
const ResponseHelper = require('../helpers/response_helper')
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const faker = require('faker')
const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { encodePayload } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library')

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

    static async googleLogin(req, res, next) {
        try {
            const client = new OAuth2Client(GOOGLE_CLIENT_ID)
            const { google_token } = req.body
            const ticket = await client.verifyIdToken({
                idToken: google_token,
                audience: GOOGLE_CLIENT_ID
            })
            const decoded = ticket.getPayload()
            const user = await User.findOne({
                where: { email: decoded.email }
            })
            let tokenId = null
            let tokenEmail = null

            if (!user) {
                const userImageApi = 'https://ui-avatars.com/api/'            
                const userImage = decoded.name.replace(/[^A-Z0-9]/ig, "+")
                const img_url = `${userImageApi}?name=${userImage}`
                const newUser = await User.create({
                    email: decoded.email,
                    password: faker.internet.password(10),
                    full_name: decoded.name,
                    img_url: img_url
                })
                tokenId = newUser.id
                tokenEmail = newUser.email
            } else {
                tokenEmail = user.email
                tokenId = user.id
            }

            const access_token = encodePayload({
                id: tokenId,
                email: tokenEmail
            })
            const response = new ResponseHelper('success', { access_token })

            return res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController