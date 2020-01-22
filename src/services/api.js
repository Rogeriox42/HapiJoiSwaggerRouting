const Axios = require('axios') 

const api = Axios.create({
    baseURL: 'https://api-de-ideias.herokuapp.com/'
})

module.exports = api 