const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize

beforeAll((done) => {
    queryInterface.bulkDelete('Users', null, {})
        .then(function () {
            done()
        })
})

afterAll((done) => {
    queryInterface.bulkDelete('Users', null, {})
        .then(function () {
            done()
        })
})

describe('Test User Register End Point (/api/user/register)', () => {
    it('Should return response status 201 in JSOn format if all field filled properly', (done) => {
        request(app)
            .post('/api/users/register')
            .set('Content-Type', 'application/json')
            .send({
                email: 'test@mail.com',
                password: '1234567',
                full_name: 'test user'
            })
            .then(response => {
                expect(response.status).toBe(201)
                expect(response.body).toHaveProperty('message')
                done()
            })
    })
    it('Should return response status 400 in JSON format if email format is wrong', (done) => {
        request(app)
            .post('/api/users/register')
            .set('Content-Type', 'application/json')
            .send({
                email: 'test@',
                password: '1234567',
                full_name: 'test user'
            })
            .then(response => {
                expect(response.status).toBe(400)
                expect(response.body).toHaveProperty('message', 'error')
                expect(response.body).toHaveProperty('error', expect.any(Object))
                done()
            })
    })
    it('Should return response status 400 in JSON format if one of the field empty', (done) => {
        request(app)
            .post('/api/users/register')
            .set('Content-Type', 'application/json')
            .send({
                email: '',
                password: '1234567',
                full_name: 'test user'
            })
            .then(response => {
                expect(response.status).toBe(400)
                expect(response.body).toHaveProperty('message', 'error')
                expect(response.body).toHaveProperty('error', expect.any(Object))
                done()
            })
    })
})

describe('Test User Login End Point (/api/users/login)', () => {
    it('Should return 200 if username and password match in database', (done) => {
        request(app)
            .post('/api/users/login')
            .set('Content-Type', 'application/json')
            .send({
                email: 'test@mail.com',
                password: '1234567',
                full_name: 'test user'
            })
            .then(response => {
                expect(response.status).toBe(200)
                expect(response.body).toHaveProperty('message', 'success')
                expect(response.body).toHaveProperty('data.access_token', expect.any(String))
                done()
            })
    })
    it('Should return 401 if username and password does not match in database', (done) => {
        request(app)
            .post('/api/users/login')
            .set('Content-Type', 'application/json')
            .send({
                email: 'test@mail.com',
                password: '123456718',
                full_name: 'test user'
            })
            .then(response => {
                expect(response.status).toBe(401)
                expect(response.body).toHaveProperty('message', 'error')
                expect(response.body).toHaveProperty('error.name', 'Unauthorized')
                done()
            })
    })
})