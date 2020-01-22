const Hapi = require('@hapi/hapi')
const PORT = process.env.PORT || 3060
const HOST = process.env.HOST || 'localhost'
const vision = require('@hapi/vision')
const inert = require('@hapi/inert') 
const hapiSwagger = require('hapi-swagger') 

const mainRoutes = require('./routes/main')

const swaggerOptions = {
    info: {
        title: 'Idea API Routing Example', 
        version: '1.0'
    }
}

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

        await this.server.register([
            inert, 
            vision, 
            {
                plugin: hapiSwagger, 
                options: swaggerOptions
            }
        ])
        await this.server.start()
        console.log(`Server running at the port: ${PORT}`)
    }

    _loadRoutes() {
        this.server.route(mainRoutes)
    }
}

module.exports = new App()