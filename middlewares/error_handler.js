class CustomError extends Error {
    constructor(name, message) {
        super()
        this.name = name
        this.message = message
    }
    
    static generate(err, req, res, next) {        
        let status
        let { name, message } = err
        switch (name) {
            case "SequelizeValidationError":
                status = 400
                break        
            case "NotFound":
                status = 404
                break
            case "Unauthorized":
                status = 401
                break
            default:
                console.error("Uncaught Error", err)
                status = 500
                break
        }

        return res.status(status).json({
            status: "error", 
            error: { name, message }
        })
    }
}

module.exports = CustomError