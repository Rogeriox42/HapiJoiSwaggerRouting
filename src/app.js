const Hapi = require('@hapi/hapi')
const PORT = process.env.PORT || 3060
const HOST = process.env.HOST || 'localhost'

const mainRoutes = require('./routes/main')

class App {
    constructor() {
        this.server = null
        this._createServer()
        this._loadRoutes()
    }

    async _createServer() {
        this.server = Hapi.server({
            port: PORT,
            host: HOST
        })
        await this.server.start()
        console.log(`Server running at the port: ${PORT}`)
    }

    _loadRoutes() {
        this.server.route(mainRoutes)
    }
}

module.exports = new App()