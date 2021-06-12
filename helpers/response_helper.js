class ResponseHelper {
    constructor(message, data) {
        this.message = message
        
        if (this.message == 'error') {
            this.error = data
        } else {
            this.data = data
        }
    }
}

module.exports = ResponseHelper