const api = require('../services/api')
const Joi = require('@hapi/joi')

const ideaCreateSchema = {
    name: Joi.string().required().min(3).max(100), 
    description: Joi.string().required().min(3).max(100), 
    type: Joi.string().min(3).max(40), 
    img_url: Joi.string().min(5).max(200)
}

const ideaUpdateSchema = {
    ...ideaCreateSchema, 
    name: Joi.string().min(3).max(100), 
    description: Joi.string().min(3).max(100), 
}

const IdeaCreateModel = Joi.object(ideaCreateSchema).label('Idea Create Model')
const IdeaUpdateModel = Joi.object(ideaUpdateSchema).label('Idea Update Model')

const routes = [
    {
        // Base Route 
        method: 'GET',
        path: '/',
        handler: (req, header) => {
            console.log('Base Route!')
            return { message: `Successfully reached the '/' endpoint. ` }
        }
    },
    {
        // List 
        method: 'GET',
        path: '/idea',
        options: {
            description: 'Get Ideas',
            notes: 'Return all the ideas',
            tags: ['api'],
        },
        handler: async (request, header) => {
            try {
                console.log('List Ideas!')
                const response = await api.get('idea/')
                return response.data
            } catch (error) {
                console.log('error', error)
                return 'Internal Server Error'
            }
        }
    },

    {
        // Show 1 Idea
        method: 'GET',
        path: '/idea/{id}',
        options: {
            description: 'Get Idea',
            notes: 'Return the idea corresponding to the provided ID',
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.string().min(24).max(24)
                })
            },
        },
        handler: async (request, header) => {
            try {
                console.log('Select 1 Idea!')
                const { id } = request.params
                const response = await api.get(`idea/${id}`)
                return response.data

            } catch (error) {
                console.log('error', error)
                return 'Internal Server Error'
            }
        }
    },
    {
        // Create
        method: 'POST',
        path: '/idea',
        options: {
            description: 'Create Idea',
            notes: 'Create a new idea with the provided data',
            tags: ['api'],
            validate:{
                payload: IdeaCreateModel
            }
        },
        handler: async (request, header) => {
            try {
                console.log('Select 1 Idea!')
                const { name, description, type, img_url } = request.payload
                const idea = {
                    name,
                    description,
                    type,
                    img_url
                }
                console.log('idea', idea)
                const response = await api.post(`idea`, idea)
                return response.data
            } catch (error) {
                console.log('error', error)
                return 'Internal Server Error'
            }
        }
    },
    {
        // Create
        method: 'PUT',
        path: '/idea/{id}',
        options:{
            description: 'Update Idea', 
            notes: 'Update one idea with the provided information',
            tags: ['api'],
            validate:{
                payload: IdeaUpdateModel,
                params: Joi.object({
                    id: Joi.string().required().min(24).max(24)
                })
            }
        },
        handler: async (request, header) => {
            try {
                console.log('Select 1 Idea!')
                const { id } = request.params
                const { name, description, type, img_url } = request.payload

                const rawIdea = {
                    name,
                    description,
                    type,
                    img_url
                }
                const idea = JSON.parse(JSON.stringify(rawIdea))

                console.log('idea', idea)
                const response = await api.put(`idea/${id}`, idea)
                return response.data
            } catch (error) {
                console.log('error', error)
                return 'Internal Server Error'
            }
        }
    },
]

module.exports = routes